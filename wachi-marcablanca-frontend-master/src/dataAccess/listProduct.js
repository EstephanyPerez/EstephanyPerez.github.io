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

export async function getRelatedPublicationsByPublicationID(id) {
   var responseData = {};
   let url = process.env.VUE_APP_API_URL + "api/publication/related?id=" + id;

   await axios
      .get(url)
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               id: e.productService.id,
               name: e.productService.name,
               price: e.productService.price,
               imgURL: "data:image/jpeg;base64," + e.productService.images[0]
            };
         });
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function getRecentPublications(userId) {
   var responseData = {};
   let params = {};
   params.token = "70fc0f97-fc90-440e-b95e-f69b6150366b";
   params.userId = userId;
   let url = process.env.VUE_APP_API_URL + "api/publication/recent";
   await axios
      .get(url, { params: params })
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               id: e.productService.id,
               name: e.productService.name,
               price: e.productService.price,
               imgURL: "data:image/jpeg;base64," + e.productService.images[0],
               stock: e.productService.stock
            };
         });
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}
