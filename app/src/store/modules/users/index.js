import Axios from '@/utils/Axios'
import { USER_LOGIN, USER_REGISTER } from './types'

const axios = new Axios()

export default {
  namespaced: true,

  state: { count: 0 },

  actions: {
    async [USER_REGISTER](context, data) {
      const result = await axios.post('/user', data)
      return result
    },
    async [USER_LOGIN](context, data) {
      const result = await axios.post('/user/login', data)
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
