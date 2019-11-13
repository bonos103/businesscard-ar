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
    const jwt = await auth.withRefreshToken().generate(user)
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
      token: jwt.token,
      refreshToken: jwt.refreshToken,
    })
  }

  async auth({ auth, request, response }) {
    const { code } = request.only(['code'])
    const { email, password } = JSON.parse(Encryption.decrypt(code))
    const user = await User.create({ email, password })
    const jwt = await auth.withRefreshToken().generate(user)
    return response.created({
      message: '登録完了しました',
      user,
      token: jwt.token,
      refreshToken: jwt.refreshToken,
    })
  }

  check({ auth, response }) {
    // Logger.info(auth.current)
    return response.accepted(auth.current && auth.current.user)
  }

  async refresh({ auth, request, response }) {
    const { refreshToken } = request.only(['refreshToken'])
    const jwt = await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshToken)

    // 古いrefreshTokenを無効にする
    await auth
      .authenticator('jwt')
      .revokeTokens([refreshToken], true)

    return response.ok(jwt)
  }

  async login({ auth, request, response }) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const jwt = await auth.withRefreshToken().attempt(email, password)
      return response.ok({
        message: 'ログインしました',
        token: jwt.token,
        refreshToken: jwt.refreshToken,
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
