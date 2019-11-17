import _get from 'lodash/get'
import Axios from '@/utils/Axios'
import TokenController from '@/utils/TokenController'
import {
  USER_CHECK,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_SOCIAL,
} from './types'

const axios = new Axios()
const tokenController = new TokenController()

export default {
  namespaced: true,

  state: { count: 0 },

  actions: {
    async [USER_CHECK]() {
      const result = await axios.get('/user/check')
      return result
    },
    async [USER_REGISTER](context, data) {
      const result = await axios.post('/user', data)
      tokenController.save(_get(result, 'data.token'), _get(result, 'data.refreshToken'))
      return result
    },
    async [USER_LOGIN](context, data) {
      const result = await axios.post('/user/login', data)
      tokenController.save(_get(result, 'data.token'), _get(result, 'data.refreshToken'))
      return result
    },
    async [USER_LOGOUT]() {
      const refreshToken = localStorage.getItem('refresh_token')
      const result = await axios.post('/user/logout', { refreshToken })
      tokenController.logout()
      return result
    },
    [USER_SOCIAL](context, source) {
      return new Promise((resolve) => {
        window.open(`${process.env.VUE_APP_API_URL}/api/v1/user/login/${source}`, '_blank', 'width=800,height=600')
        window.addEventListener('message', (e) => {
          if (e.origin === process.env.VUE_APP_API_URL && _get(e, 'data.token')) {
            console.log(e)
            tokenController.save(_get(e, 'data.token'), _get(e, 'data.refreshToken'))
            resolve(e)
          }
        })
      })
    },
  },

  mutations: {
    increment(state) {
      // `state` はモジュールのローカルステート
      state.count += 1
    },
  },

  getters: {
    doubleCount(state) {
      return state.count * 2
    },
  },
}
