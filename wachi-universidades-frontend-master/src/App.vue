<template>
   <v-app>
      <router-view></router-view>
   </v-app>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Cairo&display=swap");

.v-application {
   font-family: "Cairo", sans-serif !important;
}
.swal2-popup {
   font-family: "Cairo", sans-serif !important;
}
</style>

<script>
import { mapState, mapActions } from "vuex";
import * as homepageDA from "@/dataAccess/home-page.js";
export default {
   name: "App",
   methods: {
      ...mapActions(["obtainHomepageConfiguration", "completeComponentsConfigurationToUpdate", "resetGeneralConfig"]),
      ...mapActions("style", ["startApplication"])
   },
   computed: {
      ...mapState(["generalConfig"]),
      style_div_style_focus() {
         return {
            "--div-outline--hover": "0px solid #03989A",
            "--div-outline--focus": "0px solid #03989A",
            "--text-color": this.generalConfig.mainColor
         };
      }
      /*configurateHomepage() {
         homepageDA
            .obtainHomepageConfiguration() //entering the idCommunity
            .then(res => {
               if (res.data.status == "OK") {
                  this.completeComponentsConfigurationToUpdate(res.data.payload);
                  this.startApplication(res.data.payload);
               }
            })
            .catch(function() {
               console.log("error en lista configuracion comunidad");
            });
      }*/
   },
   mounted() {
      homepageDA
         .obtainHomepageConfiguration() //entering the idCommunity
         .then(res => {
            if (res.data.status == "OK") {
               this.completeComponentsConfigurationToUpdate(res.data.payload);
               this.startApplication(res.data.payload);
               console.log("Set colores");
            }
         })
         .catch(function() {
            console.log("error en lista configuracion comunidad");
         });
   }
};
</script>
