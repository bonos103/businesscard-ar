'use strict'

const Antl = use('Antl')

class ProjectStoreProject {
  get rules() {
    return {
      title: 'required|max:255',
    }
  }

  get validateAll() {
    return true
  }

  get messages() {
    const title = Antl.formatMessage('Project.title')
    return {
      'title.required': Antl.formatMessage('validations.required', { field: title }),
      'title.max': (field, validation, args) => Antl.formatMessage('validations.max', { field: title, args }),
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = ProjectStoreProject
