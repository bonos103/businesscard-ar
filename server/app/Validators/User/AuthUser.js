'use strict'

const Antl = use('Antl')

class UsersStoreUser {
  static get rules() {
    return {
      code: 'validAuthCode|timeoutCode',
    }
  }

  static get validateAll() {
    return true
  }

  static get messages() {
    return {
      'code.validAuthCode': Antl.formatMessage('validations.validAuthCode'),
      'code.timeoutCode': Antl.formatMessage('validations.timeoutCode'),
    }
  }

  static async fails(errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = UsersStoreUser
