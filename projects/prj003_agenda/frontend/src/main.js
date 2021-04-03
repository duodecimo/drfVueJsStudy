import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueResource from "vue-resource";
import "@/plugins/vuetify-mask.js";

import "bootstrap/dist/css/bootstrap.min.css";

import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

Vue.config.productionTip = false;

Vue.use(Vuetify);
export default new Vuetify({});

Vue.use(VueResource);

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount("#app");
