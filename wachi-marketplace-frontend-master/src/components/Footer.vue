<template>
   <v-container>
      <!--<router-view></router-view>-->
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
import { mapState, mapActions } from "vuex";

export default {
   name: "Footer",

   computed: {
      ...mapState([
         "nav_imgLogo",
         "nav_menuItems",
         "nav_login",
         "generalConfig"
      ])
   },

   data() {
      return {};
   },

   methods: {
      ...mapActions(["completeSelectedComponentsData"])
   }
};
</script>
