import Vue from "vue";
import Vuex from "vuex";

import system from "./modules/system";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { hi: "Hi!", authentication: null },
  mutations: {
    SETAUTHENTICATION: (state, value) =>
      value ? (state.authentication = value) : (state.authentication = null)
  },
  getters: {
    hi(state) {
      return state.hi;
    },
    authentication(state) {
      return state.authentication;
    }
  },
  actions: {
    setAuthentication(context, payload) {
      console.log("STORE - system.js - setAuthentication - payload: ", payload);
      context.commit("SETAUTHENTICATION", payload);
    }
  },
  modules: {
    system
  }
});
