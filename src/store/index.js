import Vue from "vue";
import Vuex from "vuex";
import fishCatch from "./modules/fish_catch/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    fishCatch,
  },
});
