const state = { alo: "Alo!", showLogout: false };

const mutations = {
  SETSHOWLOGOUT: (state, value) =>
    value ? (state.showLogout = value) : (state.showLogout = false)
};

const getters = {
  alo(state) {
    return state.alo;
  },
  showLogout(state) {
    return state.showLogout;
  }
};

const actions = {
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
