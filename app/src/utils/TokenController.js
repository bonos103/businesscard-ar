import Cookies from 'universal-cookie'

export default class {
  constructor() {
    this.Cookies = Cookies
    this.maxAge = 5 // トークンの有効期限
  }

  save(token) {
    if (token) {
      const cookies = new this.Cookies()
      cookies.set('token', token, {
        secure: true,
        // httpOnly: true,
        maxAge: this.maxAge,
      })
    }
  }

  isExist() {
    const cookies = new this.Cookies()
    const token = cookies.get('token')
    return !!token
  }
}
