import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import user from './modules/user'
import tushuguanli from './modules/tushuguanli'

import yonghuguanli from './modules/yonghuguanli'

import takephoto from './modules/takephoto'

import routes from './modules/routes';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    user,
    tushuguanli,
    takephoto,
    yonghuguanli,
    routes
  },
  getters
})

export default store
