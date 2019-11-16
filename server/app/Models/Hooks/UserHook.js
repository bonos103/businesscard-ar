'use strict'

const Hash = use('Hash')

class UserHook {
  async hashPassword(user) {
    if (user.password) {
      user.password = await Hash.make(user.password)
    }
  }
}

module.exports = UserHook
