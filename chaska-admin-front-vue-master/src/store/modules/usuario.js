const state = {
  info: { avatar: 'https://media.giphy.com/media/4iqMzLtBO9KSY/giphy.gif' },
  permisos: { accesses: [] }
}

const mutations = {
  llenarInfo(state, info) {
    state.info = info
  },
  llenarPermisos(state, permisos) {
    state.permisos = permisos
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
