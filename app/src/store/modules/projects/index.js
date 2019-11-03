// import _get from 'lodash/get'
// import Cookie from 'universal-cookie'
import _get from 'lodash/get'
import Axios from '@/utils/Axios'
import twitterIcon from '@/assets/images/project/sns/twitter.png'
import facebookIcon from '@/assets/images/project/sns/facebook.png'
import instagramIcon from '@/assets/images/project/sns/instagram.png'
import {
  GET_PROJECTS,
  GET_PROJECT,
  NEW_PROJECT,
  POST_PROJECT,
  ADD_ITEM,
  SELECT_ITEM_EID,
  SET_DATA,
} from './types'

const axios = new Axios()

function addItem(items, item) {
  item.eid = items.length
  items.push(Object.assign({}, item))
  return items
}
function setEid(items) {
  return items.map((item, index) => {
    item.eid = index
    return item
  })
}

const defaultItemText = {
  type: 'text',
  value: 'hogehoge',
  scale_x: 1,
  scale_y: 1,
  scale_z: 1,
  x: 0,
  y: 1,
  z: 0,
  font_size: 18,
  color: '#FF6F61',
  width: 3,
  height: 2,
}
const defaultItemSocial = {
  twitter: {
    type: 'social',
    image: twitterIcon,
    scale_x: 1,
    scale_y: 1,
    scale_z: 1,
    x: -0.75,
    y: -1,
    z: 0,
    width: 0.5,
    height: 0.5,
  },
  facebook: {
    type: 'social',
    image: facebookIcon,
    scale_x: 1,
    scale_y: 1,
    scale_z: 1,
    x: 0,
    y: -1,
    z: 0,
    width: 0.5,
    height: 0.5,
  },
  instagram: {
    type: 'social',
    image: instagramIcon,
    scale_x: 1,
    scale_y: 1,
    scale_z: 1,
    x: 0.75,
    y: -1,
    z: 0,
    width: 0.5,
    height: 0.5,
  },
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
    async [GET_PROJECTS]({ commit }) {
      const result = await axios.get('/project')
      if (result.data) {
        commit(GET_PROJECTS, result.data)
      }
    },
    async [GET_PROJECT]({ commit }, id) {
      const result = await axios.get(`/project/${id}`)
      if (result.data) {
        const project = result.data
        const items = setEid(project.items || [])
        project.items = setEid(items)
        commit(GET_PROJECT, project)
      }
    },
    [NEW_PROJECT]({ commit }) {
      const project = {
        title: 'はじめてのAR名刺',
        items: [...firstItems],
      }
      commit(NEW_PROJECT, project)
    },
    async [POST_PROJECT]({ commit, state }) {
      const data = Object.assign({}, state.project)
      data.items.forEach(item => delete item.eid)
      const result = await axios.post('/project', data)
      return result
    },
    [ADD_ITEM]({ commit }, { type, value }) {
      if (type === 'text') {
        const item = Object.assign({}, defaultItemText)
        commit(ADD_ITEM, item)
      } else if (type === 'social') {
        const item = Object.assign({}, defaultItemSocial[value])
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
    [GET_PROJECTS](state, projects) {
      state.projects = projects
    },
    [GET_PROJECT](state, project) {
      state.project = { ...project }
    },
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
