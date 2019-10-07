// import _get from 'lodash/get'
// import Cookie from 'universal-cookie'
// import Axios from '@/utils/Axios'
import _get from 'lodash/get'
import { NEW_PROJECT, ADD_ITEM, SELECT_ITEM_EID, SET_DATA } from './types'

// const axios = new Axios()

function addItem(items, item) {
  item.eid = items.length
  items.push(Object.assign({}, item))
  return items
}

const defaultItemText = {
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
}

const firstItems = []
addItem(firstItems, defaultItemText)

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
    selectItemEid: undefined,
  },

  actions: {
    [NEW_PROJECT]({ commit }) {
      const project = {
        title: 'はじめてのAR名刺',
        items: [...firstItems],
      }
      commit(NEW_PROJECT, project)
    },
    [ADD_ITEM]({ commit }, type) {
      if (type === 'text') {
        const item = Object.assign({}, defaultItemText)
        commit(ADD_ITEM, item)
      }
    },
    [SELECT_ITEM_EID]({ state, commit }, eid) {
      if (state.project.items.findIndex(i => i.eid === eid) > -1) {
        return commit(SELECT_ITEM_EID, eid)
      }
      return commit(SELECT_ITEM_EID)
    },
    [SET_DATA]({ state, commit }, data) {
      const index = state.project.items.findIndex(i => i.eid === state.selectItemEid)
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
    [ADD_ITEM](state, item) {
      const items = addItem(state.project.items, item)
      state.project.items = items
    },
    [SELECT_ITEM_EID](state, eid) {
      state.selectItemEid = eid
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
    selectItem(state) {
      const items = _get(state, 'project.items')
      if (items && items.length) {
        return items.find(i => i.eid === state.selectItemEid)
      }
      return undefined
    },
    doubleCount(state) {
      return state.count * 2
    },
  },
}
