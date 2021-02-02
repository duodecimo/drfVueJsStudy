import Vue from "vue";
import Vuex from "vuex";

import system from "./modules/system";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { hi: "Hi!" },
  mutations: {},
  getters: {
    hi(state) {
      return state.hi;
    }
  },
  actions: {},
  modules: {
    system
  }
});
