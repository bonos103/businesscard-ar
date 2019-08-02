'use strict'

const Mail = use('Mail')
const Env = use('Env')
const Encryption = use('Encryption')
const User = use('App/Models/User')

class UserController {
  index() {
    return { hoge: 'hoge' }
  }
  async store({ request, response }) {
    const user = await User.create(request.only(['email', 'password']))
    await Mail.send('emails.user.signup', user.toJSON(), (message) => {
      message
        .to(user.email)
        .from(Env.get('MAIL_ADMIN'))
        .subject('会員登録いただきありがとうございます。')
    })
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
