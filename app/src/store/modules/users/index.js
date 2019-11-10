import _get from 'lodash/get'
import Axios from '@/utils/Axios'
import TokenController from '@/utils/TokenController'
import { USER_CHECK, USER_LOGIN, USER_REGISTER } from './types'

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
      tokenController.save(_get(result, 'data.token'))
      return result
    },
    async [USER_LOGIN](context, data) {
      const result = await axios.post('/user/login', data)
      tokenController.save(_get(result, 'data.token'))
      return result
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
