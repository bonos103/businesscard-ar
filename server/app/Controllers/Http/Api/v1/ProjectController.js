'use strict'

const differenceBy = require('lodash/differenceBy')

const Project = use('App/Models/Project')

class ProjectController {
  async index({ response, auth }) {
    const user = await auth.getUser()
    const projects = await Project.query().where('user_id', user.id).withImage().fetch()
    // withを使うとitemも結合できる
    // const projects = await Project.query().where('user_id', user.id).withItems().fetch()
    return response.ok(projects.toJSON())
  }

  async store({ response, request, auth }) {
    const user = await auth.getUser()

    const { title, items = [] } = request.only(['title', 'items'])

    const project = await Project.create({
      title,
      user_id: user.id,
    })
    await project.items().createMany(items)
    await project.load('items')

    await project.takeThumbnail({ auth })

    return response.created({
      ...project.toJSON(),
    })
  }

  async show({ response, request, params }) {
    const { id } = params
    const type = request.get('type') || id
    // const user = await auth.getUser()
    const project = await Project.query().where(type, id).withItems().last()

    if (!project) {
      return response.badRequest({
        message: 'プロジェクトが見つかりませんでした。',
        field: 'id',
        validation: 'required',
      })
    }
    // if (project.user_id !== user.id) {
    //   return response.unauthorized({
    //     message: '閲覧権限がありません。',
    //     field: 'id',
    //     validation: 'auth',
    //   })
    // }
    return response.ok(project.toJSON())
  }

  async update({
    response, request, params, auth,
  }) {
    const { id } = params
    const { title, items } = request.only(['title', 'items'])
    const user = await auth.getUser()
    const project = await Project.query().findById(id).withItems().last()
    const projectItems = project.getRelated('items')

    if (!project) {
      return response.badRequest({
        message: 'プロジェクトが見つかりませんでした。',
        field: 'id',
        validation: 'required',
      })
    }
    if (project.user_id !== user.id) {
      return response.unauthorized({
        message: '閲覧権限がありません。',
        field: 'id',
        validation: 'auth',
      })
    }

    project.merge({ title })
    await project.save()

    // TODO itemsのsave
    // removeカラムを抽出して削除、
    const removeItems = differenceBy(projectItems.rows, items, 'id')
    // idなしはcretae
    const createItems = items.filter((item) => !item.id)
    // id持ちはsave
    const updateItems = items.filter((item) => item.id).map((item) => {
      const itm = projectItems.rows.find((row) => row.id == item.id)
      itm.merge(item)
      return itm
    })

    await project.items().whereIn('id', removeItems.map((item) => item.id)).delete()
    const createdItems = await project.items().createMany(createItems)
    await Promise.all(updateItems.map((item) => item.save()))

    projectItems.rows = projectItems.rows.filter((row) => removeItems.findIndex((el) => el.id === row.id) === -1)
    createdItems.forEach((row) => projectItems.addRow(row))

    await project.takeThumbnail({ auth })

    return response.ok(project.toJSON())
  }
}

module.exports = ProjectController
