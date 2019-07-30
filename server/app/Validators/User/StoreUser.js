'use strict'

class UsersStoreUser {
  get rules () {
    return {
      email: 'required|email|unique:users',
      password: 'required',
    }
  }
  get validateAll () {
    return true
  }
}

module.exports = UsersStoreUser
