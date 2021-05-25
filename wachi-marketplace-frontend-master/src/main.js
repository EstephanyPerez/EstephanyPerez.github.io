import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import VueGoogleApi from "vue-google-api";
// import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import Vuelidate from "vuelidate/src";
import VueExcelXlsx from "vue-excel-xlsx";

// axios.defaults.baseURL = process.env.VUE_APP_API_URL;
import { API } from "./dataAccess/API";
Vue.prototype.$http = API;

const config = {
   apiKey: process.env.VUE_APP_API_KEY_GOOGLE,
   clientId: process.env.VUE_APP_API_CLIENT_ID_GOOGLE
};

Vue.config.productionTip = false;
Vue.use(VueGoogleApi, config);
Vue.use(VueSweetalert2);
Vue.use(Vuelidate);
Vue.use(VueExcelXlsx);

import VueNumberInput from "@chenfengyuan/vue-number-input";
Vue.component(VueNumberInput.name, VueNumberInput);

export const bus = new Vue();

new Vue({
   router,
   store,
   vuetify,
   render: h => h(App)
}).$mount("#app");
