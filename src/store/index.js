import router from "@/router";
import { createStore } from "vuex";

export default createStore({
  state: {},
  getters: {},
  mutations: {
    redirectTo(state, payload) {
      router.push({ name: payload });
    },
  },
  actions: {
    redirectTo({ commit }, payload) {
      commit("redirectTo", payload.val);
    },
  },
  modules: {},
});
