import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "../views/Welcome.vue";
import UserRegistration from "../views/auth/UserRegistration.vue";
import UserLogin from "../views/auth/UserLogin.vue";
import store from "../store/index.js";

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
  routes
});

router.beforeEach(function(to, from, next) {
  console.log("[router] Global router beforeEach.");
  console.log("   to: ", to);
  console.log("   from: ", from);
  if (to.meta.requiresAuth && !store.getters.autheticated) {
    next("/login");
  } else if (to.meta.requiresUnAuth && store.getters.autheticated) {
    next("/");
  } else {
    next();
  }
  next();
});

export default router;
