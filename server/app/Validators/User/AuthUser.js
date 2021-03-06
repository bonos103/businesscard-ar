'use strict'

const Antl = use('Antl')

class UsersStoreUser {
  get rules() {
    return {
      code: 'validAuthCode|timeoutCode',
    }
  }

  get validateAll() {
    return true
  }

  get messages() {
    return {
      'code.validAuthCode': Antl.formatMessage('validations.validAuthCode'),
      'code.timeoutCode': Antl.formatMessage('validations.timeoutCode'),
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = UsersStoreUser
