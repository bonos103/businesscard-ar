'use strict'

const differenceBy = require('lodash/differenceBy')

const Database = use('Database')
const Project = use('App/Models/Project')

class ProjectController {
  async index({ response, auth }) {
    const user = await auth.getUser()
    const projects = await Project.query().where('user_id', user.id).andWhereNot('status', 'preview').withImage()
      .fetch()
    // withを使うとitemも結合できる
    // const projects = await Project.query().where('user_id', user.id).withItems().fetch()
    return response.ok(projects.toJSON())
  }

  async store({ response, request, auth }) {
    const trx = await Database.beginTransaction()
    let project
    try {
      const user = await auth.getUser()

      const { title, items = [] } = request.only(['title', 'items'])

      project = await Project.create({
        title,
        user_id: user.id,
      }, trx)
      await project.items().createMany(items, trx)
      await project.load('items')
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }

    await project.takeThumbnail({ auth })

    return response.created({
      ...project.toJSON(),
    })
  }

  async show({ response, request, params }) {
    const { id } = params
    const type = request.get().type || 'id'
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

    const trx = await Database.beginTransaction()
    try {
      project.merge({ title })
      await project.save(trx)

      // removeカラムを抽出して削除、
      const removeItems = differenceBy(projectItems.rows, items, 'id')
      // idなしはcretae
      const createItems = items.filter(item => !item.id)
      // id持ちはsave
      const updateItems = items.filter(item => item.id).map((item) => {
        const itm = projectItems.rows.find(row => row.id === item.id)
        itm.merge(item)
        return itm
      })

      await project.items().whereIn('id', removeItems.map(item => item.id)).delete(trx)
      const createdItems = await project.items().createMany(createItems, trx)
      await Promise.all(updateItems.map(item => item.save(trx)))

      projectItems.rows = projectItems.rows.filter(
        row => removeItems.findIndex(
          el => el.id === row.id,
        ) === -1,
      )
      createdItems.forEach(row => projectItems.addRow(row))

      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }

    await project.takeThumbnail({ auth })
    return response.ok(project.toJSON())
  }

  async storePreview({ response, request, auth }) {
    const user = await auth.getUser()

    const { title, items = [] } = request.only(['title', 'items'])

    // 既に存在するpreview projectを探す
    const previewProject = await Project
      .query()
      .where({
        user_id: user.id,
        status: 'preview',
      })
      .last()

    const trx = await Database.beginTransaction()
    let project
    try {
      // 古いpreviewを削除
      if (previewProject) {
        await Promise.all([
          previewProject.items().delete(trx),
        ])
        await previewProject.delete(trx)
      }

      project = await Project.create({
        title,
        user_id: user.id,
        status: 'preview',
      }, trx)
      await project.items().createMany(items, trx)
      await project.load('items')
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }

    return response.created({
      ...project.toJSON(),
    })
  }
}

module.exports = ProjectController
