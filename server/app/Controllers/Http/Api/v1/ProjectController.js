'use strict'

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
}

module.exports = ProjectController
