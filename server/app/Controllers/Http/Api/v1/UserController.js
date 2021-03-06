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
    // Logger.info(JSON.stringify(auth.current.user))
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

  async logout({ auth, response }) {
    const user = await auth.getUser()
    await auth
      .authenticator('jwt')
      .revokeTokensForUser(user)
    return response.ok({
      message: 'ログアウトしました。',
    })
  }

  async loginFacebook({ ally }) {
    try {
      await ally.driver('facebook').redirect()
    } catch (e) {
      Logger.error(e)
    }
  }

  async loginFacebookCallback({ ally, auth, view }) {
    try {
      const fbUser = await ally.driver('facebook').getUser()

      // user details to be saved
      const userDetails = {
        email: fbUser.getEmail(),
        source: 'facebook',
      }

      // search for existing user
      const whereClause = {
        email: fbUser.getEmail(),
        source: 'facebook',
      }

      const user = await User.findOrCreate(whereClause, userDetails)

      const jwtToken = await auth.withRefreshToken().generate(user)
      view.share({
        jwtToken,
        targetOrigin: Env.get('URL'),
      })

      return view.render('user.social-callback')
    } catch (error) {
      Logger.error(error)
      return 'Unable to authenticate. Try again later'
    }
  }

  async loginTwitter({ ally }) {
    try {
      await ally.driver('twitter').redirect()
    } catch (e) {
      Logger.error(e)
    }
  }

  async loginTwitterCallback({ ally, auth, view }) {
    try {
      const fbUser = await ally.driver('twitter').getUser()

      // user details to be saved
      const userDetails = {
        email: fbUser.getEmail(),
        source: 'twitter',
      }
      Logger.info(JSON.stringify(userDetails))

      // search for existing user
      const whereClause = {
        email: fbUser.getEmail(),
        source: 'twitter',
      }
      // Logger.info(JSON.stringify(jwtToken))

      const user = await User.findOrCreate(whereClause, userDetails)
      const jwtToken = await auth.withRefreshToken().generate(user)
      Logger.info(JSON.stringify(jwtToken))

      view.share({
        jwtToken,
        targetOrigin: Env.get('URL'),
      })

      return view.render('user.social-callback')
    } catch (error) {
      Logger.error(error)
      return 'Unable to authenticate. Try again later'
    }
  }

  async destroy({ auth, response }) {
    const user = await auth.getUser()
    await auth
      .authenticator('jwt')
      .revokeTokensForUser(user)

    const result = await user.quit()

    return response.ok(result)
  }
}

module.exports = UserController
