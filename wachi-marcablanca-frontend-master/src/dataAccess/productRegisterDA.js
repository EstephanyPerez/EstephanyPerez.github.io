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

export function getAllCategories(type) {
   let url =
      process.env.VUE_APP_API_URL +
      "api/publication/category/findAll?type=" +
      type;
   return axios.get(url);
}

export async function getAllCategoriesWithImg() {
   let url =
      process.env.VUE_APP_API_URL +
      "api/publication/category/findAllWithImages";
   return axios.get(url);
}
