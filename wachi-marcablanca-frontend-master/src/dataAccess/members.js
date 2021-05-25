import Vue from "vue";
import Vuex from "vuex";
import userStore from "../store/modules/user";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
   modules: { user: userStore },
   plugins: [createPersistedState()]
});

/**
 * This function calls the backend server to do login
 * @param {Object} data The data of the user to send to the server
 */

export function getMembers(data) {
   let url =
      process.env.VUE_APP_API_URL +
      "api/user/list/?page=" +
      data.page +
      "&communityToken=" +
      process.env.VUE_APP_API_KEY_COMMUNITY +
      "&name=" +
      data.name +
      "&lastName=" +
      data.lastName +
      "&per_page=" +
      data.per_page;
   console.log(url);
   return axios.get(url);
}
