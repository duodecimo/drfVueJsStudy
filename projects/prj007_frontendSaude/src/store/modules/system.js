const state = {
  alo: "Alo!",
  user_name: null,
  authentication: null,
  show_logout: false,
  active_meeting: false,
  tokens: null
};

const mutations = {
  SET_USER_NAME: (state, value) =>
    value ? (state.user_name = value) : (state.user_name = null),
  SET_AUTHENTICATION: (state, value) =>
    value ? (state.authentication = value) : (state.authentication = null),
  SET_ACTIVE_MEETING: (state, value) =>
    value ? (state.active_meeting = value) : (state.active_meeting = null),
  SET_SHOW_LOGOUT: (state, value) =>
    value ? (state.show_logout = value) : (state.show_logout = false),
  SET_TOKENS: (state, value) =>
    value ? (state.tokens = value) : (state.tokens = null)
};

const getters = {
  user_name(state) {
    return state.user_name;
  },
  authentication(state) {
    return state.authentication;
  },
  active_meeting(state) {
    return state.active_meeting;
  },
  alo(state) {
    return state.alo;
  },
  show_logout(state) {
    return state.show_logout;
  },
  tokens(state) {
    return state.tokens;
  }
};

const actions = {
  set_user_name(context, payload) {
    console.log("STORE - system.js - set_user_name - payload: ", payload);
    context.commit("SET_USER_NAME", payload);
  },
  set_authentication(context, payload) {
    console.log("STORE - system.js - set_authentication - payload: ", payload);
    context.commit("SET_AUTHENTICATION", payload);
  },
  set_active_meeting(context, payload) {
    console.log("STORE - system.js - set_active_meeting - payload: ", payload);
    context.commit("SET_ACTIVE_MEETING", payload);
  },
  set_show_logout(context, payload) {
    console.log("STORE - system.js - set_show_logout - payload: ", payload);
    context.commit("SET_SHOW_LOGOUT", payload);
  },
  set_tokens(context, payload) {
    console.log("STORE - system.js - set_tokens - payload: ", payload);
    context.commit("SET_TOKENS", payload);
  }
};

// exportar
export default {
  state,
  mutations,
  getters,
  actions
};
