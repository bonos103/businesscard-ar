'use strict'

const Hash = use('Hash')

class UserHook {
  static async hashPassword(user) {
    user.password = await Hash.make(user.password)
  }
}

module.exports = UserHook
