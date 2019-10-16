'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async store({ response, request, auth }) {
    const user = await auth.getUser()

    const project = await Project.create({
      ...request.only(['title']),
      user_id: user.id,
    })
    return response.created(project)
  }
}

module.exports = ProjectController
