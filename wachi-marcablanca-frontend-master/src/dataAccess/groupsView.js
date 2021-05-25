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

export function getActiveUEvent(communityToken) {
   let url =
      process.env.VUE_APP_API_URL +
      "api/unievent/getActiveUEvent?communityToken=" +
      communityToken.toString();
   return axios.get(url);
}

export function getTeamList(idUEvent) {
   console.log("recibo idUEvent", idUEvent);
   let url =
      process.env.VUE_APP_API_URL + "api/unievent/team/list-all-teams-of-event";
   let body = {
      idUEvent: idUEvent
   };
   return axios.post(url, body);
}

export function getActiveUEventEntre(communityToken) {
   let headers = {
      token: communityToken
   };
   let url = process.env.VUE_APP_API_URL + "api/entevent/getCurrentIdEvent";
   return axios.post(url, headers);
}

export function getTeamListEntre(idUEvent) {
   console.log("recibo idUEvent - EMPRENDIMIENTOS", idUEvent);
   let url = process.env.VUE_APP_API_URL + "api/entrepreneurship/listTeams?";
   axios.defaults.headers.common["event"] = idUEvent;

   return axios.get(url);
}

export function getAllCategoriesWithImg() {
   let url =
      process.env.VUE_APP_API_URL_MARKETPLACE +
      "/api/publication/category/findAllWithImages";
   return axios.get(url);
}
