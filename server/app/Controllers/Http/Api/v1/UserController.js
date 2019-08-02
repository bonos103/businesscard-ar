'use strict'

const User = use('App/Models/User')

class UserController {
  index() {
    return { hoge: 'hoge' }
  }
  async store({ request, response }) {
    const user = await User.create(request.only(['email', 'password']))
    return response.created(user)
  }
  async auth({ request, response}) {

  }

}

module.exports = UserController
