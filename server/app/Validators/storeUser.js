'use strict'

class storeUser {
  get rules () {
    return {
      email: 'required|email|unique:users',
      password: 'required',
    }
  }
}

module.exports = storeUser
