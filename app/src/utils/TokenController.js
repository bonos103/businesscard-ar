import Cookies from 'universal-cookie'

export default class {
  constructor() {
    this.Cookies = Cookies
    this.maxAge = 5 // トークンの有効期限
  }

  save(token, refreshToken) {
    if (token) {
      const cookies = new this.Cookies()
      cookies.set('token', token, {
        secure: true,
        // httpOnly: true,
        maxAge: this.maxAge,
      })
    }
    if (refreshToken && localStorage) {
      localStorage.setItem('refresh_token', refreshToken)
    }
  }

  isExist() {
    const cookies = new this.Cookies()
    const token = cookies.get('token')
    return !!token
  }
}
