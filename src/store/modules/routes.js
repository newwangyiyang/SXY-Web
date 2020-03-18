const state = {
  activePrePath: '',
  activeRoutes: []
}

const mutations = {
  INIT_ACTIVE_PRE_PATH: (state, path) => {
    state.activePrePath = path;
  },
  INIT_ACTIVE_ROUTES: (state, routes) => {
    state.activeRoutes = routes
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
