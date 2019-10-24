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

  async show({ response, params }) {
    const { id } = params
    const project = await Project.query().findById(id).withItems().last()
    return response.ok(project.toJSON())
  }
}

module.exports = ProjectController
