import _get from 'lodash/get'
import Cookie from 'universal-cookie'
import Axios from '@/utils/Axios'
import { USER_CHECK, USER_LOGIN, USER_REGISTER } from './types'

const axios = new Axios()

const saveToken = (token) => {
  if (token) {
    const cookies = new Cookie()
    cookies.set('token', token, {
      secure: true,
      httpOnly: true,
    })
  }
  }
}

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
      saveToken(_get(result, 'data.token'))
      return result
    },
    async [USER_LOGIN](context, data) {
      const result = await axios.post('/user/login', data)
      saveToken(_get(result, 'data.token'))
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
