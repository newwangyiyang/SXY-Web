import {
  login,
  logout,
  getInfo
} from '@/api/user';
import {
  getToken,
  removeToken
} from '@/utils/auth';
import {
  resetRouter
} from '@/router';
import s from 'store2';
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    org_name: '',
    avatar: '',
    roles: []
  };
};

const getStateByStore = (user) => {
  return {
    token: user.token,
    name: user.nickname,
    org_name: user.org_name,
    avatar: user.org_logo,
    roles: []
  }
}

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_STATE_BY_TOKEN: (state, user) => {
    Object.assign(state, getStateByStore(user));
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ORG_NAME: (state, orgName) => {
    state.org_name = orgName;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo;
    return new Promise((resolve, reject) => {
      login({
          username: username.trim(),
          password: password
        })
        .then((data) => {
          commit('SET_TOKEN', data.token);
          commit('SET_NAME', data.nickname);
          commit('SET_ORG_NAME', data.org_name);
          commit('SET_AVATAR', data.org_logo);
          s('user', data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const {
            data
          } = response;

          if (!data) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('Verification failed, please Login again.');
          }

          const {
            roles,
            name,
            avatar
          } = data;
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('getInfo: roles must be a non-null array!');
          }

          commit('SET_ROLES', roles);
          commit('SET_NAME', name);
          commit('SET_AVATAR', avatar);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          s(false); // must remove  token  first
          resetRouter();
          commit('RESET_STATE');
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
