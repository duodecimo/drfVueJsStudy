const state = { alo: "Alo!", authentication: null, showLogout: false };

const mutations = {
  SETAUTHENTICATION: (state, value) =>
    value ? (state.authentication = value) : (state.authentication = null),
  SETSHOWLOGOUT: (state, value) =>
    value ? (state.showLogout = value) : (state.showLogout = false)
};

const getters = {
  alo(state) {
    return state.alo;
  },
  authentication(state) {
    return state.authentication;
  },
  showLogout(state) {
    return state.showLogout;
  }
};

const actions = {
  setAuthentication(context, payload) {
    console.log("STORE - system.js - setAuthentication - payload: ", payload);
    context.commit("SETAUTHENTICATION", payload);
  },
  setShowLogout(context, payload) {
    console.log("STORE - system.js - setShowLogout - payload: ", payload);
    context.commit("SETSHOWLOGOUT", payload);
  }
};

// exportar
export default {
  state,
  mutations,
  getters,
  actions
};
