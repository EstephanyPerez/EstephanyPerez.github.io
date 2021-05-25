import Vue from "vue";
import Vuex from "vuex";
import userStore from "@/store/modules/user";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
   modules: { user: userStore },
   plugins: [createPersistedState()]
});

export function obtainHomepageConfiguration() {
   let url = process.env.VUE_APP_API_URL + "api/blueprint/" + process.env.VUE_APP_API_KEY_COMMUNITY;
   return axios.get(url);
}
