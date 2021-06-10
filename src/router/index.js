import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/catches",
    name: "Home",
    component: Home,
  },
  {
    path: "/newEvent",
    name: "NewEvent",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/NewEvent"),
  },
  {
    path: "/catches/:id",
    name: "EventDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/FullEventCard"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
