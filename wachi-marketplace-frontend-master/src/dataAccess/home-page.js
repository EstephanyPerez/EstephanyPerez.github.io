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
/*
export function Login(username, password) {
   let url = process.env.VUE_APP_API_URL + "admin/user/login";
   var body = {
      username: username,
      password: password
   };
   return axios.get(url, body);
}

export function RegisterUser(data) {
   let url = process.env.VUE_APP_API_URL + "admin/user/save";
   return axios.get(url, data);
}
*/

export function obtainHomepageConfiguration() {
   let url =
      process.env.VUE_APP_API_URL +
      "api/blueprint/" +
      process.env.VUE_APP_API_KEY_COMMUNITY;
   return axios.get(url);
}

/*
export function Login (data){
    let url=process.env.VUE_APP_API_URL + 'admin/user/login'
    return axios.post(url,data)
 }
*/

/////////////OTROS EJEMPLOS////////////////:
/*
export function getPackageDataByTrackNumber(codigoEnvio){
    let url = process.env.VUE_APP_API_URL + 'api/package/';

    return axios.get(url,{ params:{
            codigoEnvio
        }
    });
}

export function editAirport(idAeropuerto,capacidad){
    let url = process.env.VUE_APP_API_URL + 'api/airport/' + idAeropuerto
    var body ={
        "capacidad" : capacidad
    }
    return axios.put(url,body);
}

export function createSending(idRemitente,idDestinatario,idOri,idDes,nombre,descripcion){
    let url = process.env.VUE_APP_API_URL + 'api/package'
    var body ={
        "nombre": nombre,
        "descripcion": descripcion,
        "idRemitente": idRemitente,
        "idDestinatario": idDestinatario,
        "idOri": idOri,
        "idDes": idDes
    }

    return axios.post(url,body);
}
*/
