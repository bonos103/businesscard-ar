'use strict'

const Mail = use('Mail')
const Env = use('Env')
const Encryption = use('Encryption')
const Logger = use('Logger')
const User = use('App/Models/User')

class UserController {
  index() {
    return { hoge: 'hoge' }
  }

  async store({ auth, request, response }) {
    const user = await User.create(request.only(['email', 'password']))
    const token = await auth.generate(user)
    const loginURL = new URL('/login', Env.get('URL'))
    await Mail.send('emails.user.signup', { loginURL: loginURL.href }, (message) => {
      message
        .to(user.email)
        .from(Env.get('MAIL_ADMIN'))
        .subject('会員登録いただきありがとうございます。')
    })
    return response.created({
      message: '会員登録完了しました',
      user,
      token: token.token,
    })
  }

  async auth({ auth, request, response }) {
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

  async login({ auth, request, response }) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const token = await auth.attempt(email, password)
      return response.ok({
        message: 'ログインしました',
        token.token,
      })
    } catch (err) {
      Logger.error(err)
      return response.unauthorized({
        message: 'メールアドレスかパスワードが間違っています。',
        field: 'password',
        validation: 'auth',
      })
    }
  }
}

module.exports = UserController
