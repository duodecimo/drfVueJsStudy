import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "../views/Welcome.vue";
import UserRegistration from "../views/auth/UserRegistration.vue";
import UserLogin from "../views/auth/UserLogin.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    meta: { requiresAuth: true }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/register",
    name: "register",
    component: UserRegistration,
    meta: { requiresUnAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: UserLogin,
    meta: { requiresUnAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach(function(to, from, next) {
  console.log("[router] Global router beforeEach.");
  console.log("Testando store hi: ", store.state.hi, " - ", store.getters.hi);
  console.log("   to: ", to);
  console.log("   from: ", from);
  console.log("Verificando authentication: ", store.getters.authentication);
  console.log(
    "verificando to: ",
    to.name,
    ", requiresAuth: ",
    to.meta.requiresAuth
  );
  if (to.meta.requiresAuth && !store.getters.authentication) {
    console.log("Navigation guard > Forçando login");
    next("/login");
  } else if (to.meta.requiresUnAuth && store.getters.authentication) {
    console.log("Navigation guard > Impedindo login, usuário já está logado.");
    next("/");
  } else {
    console.log("Navigation guard > navegando para ", to);
    next();
  }
  next();
});

export default router;
