'use strict'

const Antl = use('Antl')

class UsersStoreUser {
  static get rules() {
    return {
      email: 'required|email|unique:users,email',
      password: 'required',
    }
  }

  static get validateAll() {
    return true
  }

  static get messages() {
    const email = Antl.formatMessage('User.email')
    const password = Antl.formatMessage('User.password')
    return {
      'email.required': Antl.formatMessage('validations.required', { field: email }),
      'email.email': Antl.formatMessage('validations.email', { field: email }),
      'email.unique': Antl.formatMessage('validations.unique', { field: email }),
      'password.required': Antl.formatMessage('validations.required', { field: password }),
    }
  }

  static async fails(errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = UsersStoreUser
