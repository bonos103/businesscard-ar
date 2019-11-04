'use strict'
const _differenceBy = require('lodash/differenceBy')

const Item = use('App/Models/Item')
const Project = use('App/Models/Project')

class ProjectController {
  async index({ response, auth }) {
    const user = await auth.getUser()
    const projects = await Project.query().where('user_id', user.id).fetch()
    // withを使うとitemも結合できる
    // const projects = await Project.query().where('user_id', user.id).withItems().fetch()
    return response.ok(projects.toJSON())
  }

  async store({ response, request, auth }) {
    const user = await auth.getUser()

    const { title, items } = request.only(['title', 'items'])

    const project = await Project.create({
      title,
      user_id: user.id,
    })
    await project.items().createMany(items)
    await project.load('items')

    return response.created({
      ...project.toJSON(),
    })
  }

  async show({ response, params, auth }) {
    const { id } = params
    const user = await auth.getUser()
    const project = await Project.query().findById(id).withItems().last()

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
    return response.ok(project.toJSON())
  }

  async update({ response, request, params, auth }) {
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
    // project.items.map((item) => {
    //   const updateData = items.find((el) => el.id === item.id)
    //   return item.merge(updateData)
    // })
    await project.save()
    // TODO itemsのsave
    // removeカラムを抽出して削除、
    const removeItems = _differenceBy(projectItems, items, 'id')
    // console.log(removeItems)
    // id持ちはsave
    // idなしはcretae
    const createItems = items.filter((item) => !item.id)
    // console.log(createItems)
    // console.log(projectItems)
    const updateItems = items.filter((item) => item.id).map((item) => {
      const itm = projectItems.rows.find((el) => el.id == item.id)
      itm.merge(item)
      return itm
    })
    // console.log(updateItems)
    // await project.items().createMany(createItems)
    await Promise.all(updateItems.map((item) => item.save()))

    console.log(project.toJSON())
    return  response.ok(project.toJSON())
  }
}

module.exports = ProjectController
