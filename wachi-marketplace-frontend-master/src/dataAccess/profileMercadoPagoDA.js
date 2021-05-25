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

 // pls

export function getCredentialsSeller(idUser) {
    let commToken = process.env.VUE_APP_API_KEY_COMMUNITY;
    console.log(idUser);
    let url =
       process.env.VUE_APP_API_URL +
       "api/billing/marketplace/estadoUsuario/vendedor/" +
       idUser +
       "/" +
       commToken;
    console.log(url);
    return axios.get(url);
 }

 
export function asociateSeller(idUser) {
    let commToken = process.env.VUE_APP_API_KEY_COMMUNITY;
    let url = process.env.VUE_APP_API_URL + "api/billing/marketplace/asociarVendedor/" + idUser + "/" + commToken;
    console.log(url);
    return axios.post(url);
 }
 
 export function getVinculationLink() {
    let url = process.env.VUE_APP_API_URL + "api/billing/marketplace/credenciales/link";
    console.log(url);
    return axios.get(url);
 }
 