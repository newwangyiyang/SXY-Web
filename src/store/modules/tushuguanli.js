const state = {
  // 选中需要编辑的图书
  activeBookForUpdate: {}
}

const mutations = {
  CHANGE_ACTIVE_BOOK(state, data) {
    state.activeBookForUpdate = data;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}
