// import _get from 'lodash/get'
// import Cookie from 'universal-cookie'
// import Axios from '@/utils/Axios'
import { NEW_PROJECT, SELECT_ITEM_ID, SET_DATA } from './types'

// const axios = new Axios()
const firstItems = [
  {
    id: 2,
    type: 'text',
    value: 'hogehoge',
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    x: 0,
    y: 1,
    z: 0,
    fontSize: 18,
    color: '#FF6F61',
    width: 3,
    height: 2,
  },
]

export default {
  namespaced: true,

  state: {
    projects: [
      {
        title: 'はじめてのAR名刺',
        items: [...firstItems],
      },
    ],
    project: {},
    selectItemId: undefined,
  },

  actions: {
    [NEW_PROJECT]({ commit }) {
      const project = {
        title: 'はじめてのAR名刺',
        items: [...firstItems],
      }
      commit(NEW_PROJECT, project)
    },
    [SELECT_ITEM_ID]({ state, commit }, id) {
      if (state.project.items.findIndex(i => i.id === id) > -1) {
        return commit(SELECT_ITEM_ID, id)
      }
      return commit(SELECT_ITEM_ID)
    },
    [SET_DATA]({ state, commit }, data) {
      const index = state.project.items.findIndex(i => i.id === state.selectItemId)
      console.log(state.selectItemId)
      if (index > -1) {
        const items = [...[], ...state.project.items]
        items[index] = { ...items[index], ...data }
        commit(SET_DATA, items)
      }
    },
  },

  mutations: {
    [NEW_PROJECT](state, project) {
      state.project = Object.assign({}, project)
    },
    [SELECT_ITEM_ID](state, id) {
      state.selectItemId = id
    },
    [SET_DATA](state, items) {
      state.project = { ...state.project, items }
    },
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
