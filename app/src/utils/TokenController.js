import Cookies from 'universal-cookie'

export default class {
  constructor() {
    this.Cookies = Cookies
    this.maxAge = 540 // トークンの有効期限(s)
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

  logout() {
    const cookies = new this.Cookies()
    cookies.remove('token')
    localStorage.removeItem('refresh_token')
  }
}
