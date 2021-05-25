import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import VueGoogleApi from "vue-google-api";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import Vuelidate from "vuelidate/src";
import "vue-material-design-icons/styles.css";
import JsonExcel from "vue-json-excel";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const config = {
   apiKey: process.env.VUE_APP_API_KEY_GOOGLE,
   clientId: process.env.VUE_APP_API_CLIENT_ID_GOOGLE
};
Vue.component("downloadExcel", JsonExcel);
Vue.config.productionTip = false;
Vue.use(VueGoogleApi, config);
Vue.use(VueSweetalert2);
Vue.use(Vuelidate);

new Vue({
   router,
   store,
   vuetify,
   render: h => h(App)
}).$mount("#app");
