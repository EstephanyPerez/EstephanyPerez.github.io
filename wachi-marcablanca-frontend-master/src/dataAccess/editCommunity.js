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

export function GetDataCommunity() {
   let url =
      process.env.VUE_APP_API_URL +
      "api/community/" +
      process.env.VUE_APP_API_KEY_COMMUNITY;
   return axios.get(url);
}

export function GetSubscription() {
   let url =
      process.env.VUE_APP_API_URL +
      "api/billing/subscription/" +
      process.env.VUE_APP_API_KEY_COMMUNITY;
   console.log(url);
   return axios.get(url);
}

export function UpdateDataCommunity(data) {
   let url = process.env.VUE_APP_API_URL + "api/community/update";
   return axios.post(url, data);
}

export function updateBlueprints(data) {
   let url = process.env.VUE_APP_API_URL + "api/blueprint/update";
   return axios.post(url, data);
}

export function sendImagesBlueprints(data, token) {
   let url = process.env.VUE_APP_API_URL + "api/blueprint/" + token + "/update";
   return axios.post(url, data);
}

export function getCommunityProfile(data) {
   let url =
      process.env.VUE_APP_API_URL +
      "api/blueprint/profile/community/" +
      process.env.VUE_APP_API_KEY_COMMUNITY;
   return axios.get(url, data);
}
