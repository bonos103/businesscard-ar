'use strict'

const Project = use('App/Models/Project')

class ProjectController {
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
}

module.exports = ProjectController
