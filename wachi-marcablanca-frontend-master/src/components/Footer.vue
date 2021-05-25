<template>
   <v-container>
      <router-view></router-view>

      <!-- START: FOOTER 
      <v-footer padless flat absolute elevate-on-scroll>
         <v-row justify="center" no-gutters>
            <v-col
               class="primary text-center white--text"
               cols="12"
               :style="{
                  backgroundColor: generalConfig.secondaryColor + ' !important'
               }"
            >
               <strong>Wachi</strong> © {{ new Date().getFullYear() }} — Todos
               los derechos reservados
            </v-col>
         </v-row>
      </v-footer>
       FINISH: FOOTER -->

      <v-footer
         padless
         flat
         absolute
         elevate-on-scroll
         :style="{
            backgroundColor: generalConfig.mainColor + ' !important'
         }"
      >
         <v-row justify="center" no-gutters>
            <v-col class="py-4 text-center" cols="12">
               <strong>2FLOCK</strong> © {{ new Date().getFullYear() }} — Todos
               los derechos reservados
            </v-col>
         </v-row>
      </v-footer>
   </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
   name: "Footer",

   computed: {
      ...mapState([
         "nav_imgLogo",
         "nav_menuItems",
         "nav_login",
         "loggedUser",
         "generalConfig"
      ])
   },

   data() {
      return {};
   },

   methods: {}
};
</script>
