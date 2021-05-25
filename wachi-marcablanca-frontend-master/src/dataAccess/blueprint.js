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

export function UploadNewFiles(data) {
   let url =
      process.env.VUE_APP_API_URL +
      "api/blueprint/" +
      process.env.VUE_APP_API_KEY_COMMUNITY +
      "/upload";
   let formData = new FormData();
   formData.append("files", data);
   return axios.post(url, formData);
}

export function UploadFiles(file, url) {
   let path =
      process.env.VUE_APP_API_URL +
      "api/blueprint/" +
      process.env.VUE_APP_API_KEY_COMMUNITY +
      "/upload";
   let formData = new FormData();
   formData.append("file", file);
   formData.append("url", url);
   return axios.put(path, formData);
}

export function UpdateImage(id, imageURL) {
   let url =
      process.env.VUE_APP_API_URL + "api/blueprint/profile/update/profileImage";
   let data = {
      communityToken: process.env.VUE_APP_API_KEY_COMMUNITY,
      profileImage: imageURL,
      id: id
   };
   return axios.post(url, data);
}
