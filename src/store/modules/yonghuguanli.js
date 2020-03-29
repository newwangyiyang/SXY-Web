const state = {
  activeUserForUpdate: {}
}

const mutations = {
  CHANGE_ACTIVE_USER(state, data) {
    state.activeUserForUpdate = data;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}
