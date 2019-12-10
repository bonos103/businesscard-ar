import _get from 'lodash/get'
import axios from 'axios'
import Cookie from 'universal-cookie'
import TokenController from '@/utils/TokenController'

const API_URL = document.location.origin || process.env.VUE_APP_URL
const tokenController = new TokenController()

class Axios {
  constructor(url) {
    this.url = url || `${API_URL}/api/v1`
    this.client = axios.create({
      baseURL: this.url,
    })
    this.client.interceptors.request.use(async (config) => {
      const cookies = new Cookie()
      const token = cookies.get('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }, error => Promise.reject(error))
    this.client.interceptors.response.use(config => config, async (error) => {
      const originalRequest = error.config
      // refreshTokenの再発行が失敗したとき（認証期間が切れたとき）
      if (error.response.status === 401 && originalRequest.url.includes('/user/refresh')) {
        return Promise.reject(error)
      }
      // 認証失敗かつ再リクエストでないとき
      if (error.response.status === 401 && !originalRequest.retry) {
        const refreshToken = window.localStorage.getItem('refresh_token')
        originalRequest.retry = true
        if (refreshToken) {
          const result = await this.client.post('/user/refresh', { refreshToken })
          tokenController.save(_get(result, 'data.token'), _get(result, 'data.refreshToken'))
          return this.client(originalRequest)
        }
      }
      return Promise.reject(error)
    })
  }

  async get(url, config = {}) {
    return this.client.get(url, config)
  }

  async post(url, data = {}, config = {}) {
    return this.client.post(url, data, config)
  }

  async put(url, data = {}, config = {}) {
    return this.client.put(url, data, config)
  }

  async patch(url, data = {}, config = {}) {
    return this.client.patch(url, data, config)
  }

  async delete(url, config = {}) {
    return this.client.delete(url, config)
  }
}

export default Axios
