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

export function Login(email, password) {
   let url = process.env.VUE_APP_API_URL + "api/user/login";
   var data = {
      email: email,
      password: password,
      communityToken: process.env.VUE_APP_API_KEY_COMMUNITY
   };
   return axios.post(url, data);
}

export function RegisterInvited(user) {
   let url = process.env.VUE_APP_API_URL + "api/user/register/invited";
   var data = {
      email: user.email,
      activation_code: user.activation_code,
      password: user.password,
      communityToken: process.env.VUE_APP_API_KEY_COMMUNITY
   };
   return axios.post(url, data);
}

export function RegisterUser({ email, name, lastName, password, privilege }) {
   let url = process.env.VUE_APP_API_URL + "api/user/register";
   var data = {
      email: email,
      name: name,
      lastName: lastName,
      password: password,
      privilege: privilege,
      communityToken: process.env.VUE_APP_API_KEY_COMMUNITY
   };
   return axios.post(url, data);
}

export function RegisterUser2Flock({ email, password }) {
   let url = process.env.VUE_APP_API_URL + "api/user/login/register";
   var data = {
      email: email,
      password: password,
      communityPrivilege: "miembro",
      communityToken: process.env.VUE_APP_API_KEY_COMMUNITY
   };
   return axios.post(url, data);
}

export function ProfileStructure(data) {
   let url =
      process.env.VUE_APP_API_URL +
      "api/blueprint/profile/" +
      process.env.VUE_APP_API_KEY_COMMUNITY +
      "?userId=" +
      data.id;
   return axios.get(url);
}

export function ProfileUpdate(mainPayload, editPayload, cardNumber) {
   var payload = GetPayload(mainPayload, editPayload, cardNumber);
   console.log(payload);
   //ORIGINAL FUNCTION CODE
   let url = process.env.VUE_APP_API_URL + "api/blueprint/profile/update";
   return axios.post(url, payload);
}

export function ProfileUpdateImage(payload) {
   let url = process.env.VUE_APP_API_URL + "api/blueprint/profile/update";
   return axios.post(url, payload);
}

export function GetPayload(payload, editPayload, cardNumber) {
   if (cardNumber == 0) {
      payload.profile.name = editPayload.profile.name;
      payload.profile.lastName = editPayload.profile.lastName;
      payload.profile.birthdate = editPayload.profile.birthdate;
      payload.profile.email = editPayload.profile.email;
      payload.profile.phone = editPayload.profile.phone;
      payload.profile.genre = editPayload.profile.genre;
      payload.profile.documentType = editPayload.profile.documentType;
      payload.profile.document = editPayload.profile.document;
      payload.profile.country = editPayload.profile.country;
      payload.profile.city = editPayload.profile.city;
      payload.profile.aboutMe = editPayload.profile.aboutMe;
   } else if (cardNumber == 1) {
      payload.work = editPayload.work;
   } else if (cardNumber == 2) {
      payload.academicDetail = editPayload.academicDetail;
   } else if (cardNumber == 3) {
      payload.voluntaryWork = editPayload.voluntaryWork;
   } else if (cardNumber == 4) {
      payload.teaching = editPayload.teaching;
   } else if (cardNumber == 5) {
      payload.achievement = editPayload.achievement;
   } else if (cardNumber == 6) {
      payload.language = editPayload.language;
   } else if (cardNumber == 7) {
      payload.location = editPayload.location;
   } else if (cardNumber == 8) {
      payload.market = editPayload.market;
      if (editPayload.market.sellerString == "Sí") payload.market.seller = true;
      if (editPayload.market.sellerString == "No")
         payload.market.seller = false;
   }

   return payload;
}

export function CreatePassword(data) {
   let url = process.env.VUE_APP_API_URL + "api/user/create_password";
   var body = {
      email: data.email,
      newPassword: data.newPassword,
      url: data.url
   };
   return axios.post(url, body);
}

export function ChangePassword(data) {
   let url = process.env.VUE_APP_API_URL + "api/user/password";
   var body = {
      email: data.email,
      newPassword: data.newPassword,
      password: data.password
   };
   return axios.put(url, body);
}

export function UpdateProfileStructure(data) {
   let url = process.env.VUE_APP_API_URL + "api/blueprint/profile/update";

   return axios.post(url, data);
}

export function GenerateCode(email) {
   let url =
      process.env.VUE_APP_API_URL +
      "api/user/forgotten_password_mail?email=" +
      email;

   return axios.post(url);
}

export function ChangeForgottenPassword(data) {
   let url = process.env.VUE_APP_API_URL + "api/user/change_forgotten_password";
   var body = {
      email: data.email,
      password: data.newPassword,
      activation_code: data.code,
      communityToken: process.env.VUE_APP_API_KEY_COMMUNITY
   };
   return axios.post(url, body);
}
