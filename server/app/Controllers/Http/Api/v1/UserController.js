'use strict'

const Encryption = use('Encryption')
const User = use('App/Models/User')

class UserController {
  index() {
    return { hoge: 'hoge' }
  }
  async store({ request, response }) {
    const user = await User.create(request.only(['email', 'password']))
    return response.created(user)
  }
  async auth({ auth, request, response}) {
    const { code } = request.only(['code'])
    const { email, password } = JSON.parse(Encryption.decrypt(code))
    const user = await User.create({ email, password })
    const token = await auth.generate(user)
    return response.created({
      message: '登録完了しました',
      user,
      token: token.token,
    })
  }

}

module.exports = UserController
