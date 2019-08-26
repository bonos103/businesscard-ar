export default {
  state: { count: 0 },
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
