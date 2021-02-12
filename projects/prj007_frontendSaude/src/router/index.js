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
    meta: { requiresAuth: false }
  },
  {
    path: "/about:message",
    name: "aboutmsg",
    props: true,
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/about",
    name: "about",
    meta: { requiresAuth: true },
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
  },
  {
    path: "/appointments",
    name: "appointments",
    meta: { requiresAuth: true },
    component: () => import("../views/Appointments.vue")
  },
  {
    path: "/editable",
    name: "editable",
    meta: { requiresAuth: true },
    component: () => import("../views/EditableColsTable.vue")
  }
];

const scrollBehavior = (to, from, savedPosition) => {
  let position = {};
  if (savedPosition) {
    return savedPosition;
  } else {
    position.x = 0;
    position.y = 0;
  }
  return position;
};

const router = new VueRouter({
  mode: "history",
  scrollBehavior,
  routes
});

router.beforeEach(function(to, from, next) {
  console.log("[router] Global router beforeEach.");
  // console.log("Testando store alo: ", store.getters.alo);
  console.log("   to   name: ", to.name, " path: ", to.path);
  console.log("   from name: ", from.name, " path: ", from.path);
  console.log("Verificando tokens: ", store.getters.tokens);
  console.log("verificando to meta requiresAuth: ", to.meta.requiresAuth);
  if (to.meta.requiresAuth && !store.getters.tokens) {
    console.log("Navigation guard > Forçando login");
    next("/login");
  } else if (to.meta.requiresUnAuth && store.getters.tokens) {
    console.log("Navigation guard > Impedindo login, usuário já está logado.");
    next("/");
  } else {
    console.log(
      "Navigation guard > navegando para nome: ",
      to.name,
      " path: ",
      to.path
    );
    next();
  }
  next();
});

export default router;
