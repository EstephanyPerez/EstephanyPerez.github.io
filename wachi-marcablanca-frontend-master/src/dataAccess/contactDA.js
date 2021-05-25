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

export function getHeis() {
   let url =
      process.env.VUE_APP_API_URL +
      "api/unievent/getActiveHeiDataFromActiveEventByCommunity?communityToken=" +
      process.env.VUE_APP_API_KEY_COMMUNITY;
   return axios.get(url);
}
