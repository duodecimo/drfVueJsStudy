const state = {
  authentication: null
};

const mutations = {
  SETAUTHENTICATION: (state, value) =>
    value ? (state.authentication = value) : (state.authentication = null)
};

const getters = {
  authentication(state) {
    return state.authentication;
  }
};

const actions = {};

// exportar
export default {
  state,
  mutations,
  getters,
  actions
};
