import Vue from "vue";
import Vuetify from "vuetify/lib";
import store from "@/store/store";
import es from "vuetify/es5/locale/es";

Vue.use(Vuetify);

const colors = Object.assign({}, store.state.style.style.colors);

/* Vuetify theme config */
export default new Vuetify({
   theme: {
      themes: {
         light: { ...colors }
      }
   },
   lang: {
      locales: { es },
      current: "es"
   }
});
