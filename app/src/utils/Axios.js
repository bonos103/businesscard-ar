import axios from 'axios'
import Cookie from 'universal-cookie'

const API_URL = process.env.VUE_APP_API_URL

class Axios {
  constructor(url) {
    this.url = url || `${API_URL}`
    this.client = axios.create({
      baseURL: this.url,
    })
    this.client.interceptors.request.use((config) => {
      const cookies = new Cookie()
      const token = cookies.get('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }, error => Promise.reject(error))
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
