<template>
   <!-- START: BODY-CONTAINER -->
   <div>
      <Navbar :flag.sync="flagToUpdate" />
      <!-- Barra de navegación -->

      <Component1 v-if="landingConfig.view"> </Component1>

      <Component2 v-if="multiCardConfig.view"> </Component2>

      <University v-if="imageCardConfig.view"></University>
      <ContactComponent v-if="contactUsConfig.view"> </ContactComponent>
      <br />
      <Footer> </Footer>
   </div>

   <!-- FINISH: BODY-CONTAINER -->
</template>

<script>
import { mapState, mapActions } from "vuex";
//Componentes empleados
import Navbar from "../components/Navbar.vue";
import Component1 from "../components/main-page/Component1.vue";
import ContactComponent from "../components/main-page/ContactComponent.vue";
import Component2 from "../components/main-page/Component2.vue";
import University from "../components/main-page/University.vue";
import Footer from "../components/Footer.vue";
import * as homepageDA from "@/dataAccess/home-page.js";

export default {
   name: "Homepage",
   props: {},
   components: {
      Navbar,
      Component1,
      ContactComponent,
      Component2,
      Footer,
      University
   },
   data() {
      return {
         flagToUpdate: false
      };
   },
   created() {
      this.configurateHomepage();
   },
   mounted() {
      this.configurateHomepage();
   },
   computed: {
      ...mapState([
         "selectedComponents",
         "colorTitle",
         "colorBody",
         "generalConfig",
         "communityType",
         "landingConfig",
         "multiCardConfig",
         "imageCardConfig",
         "contactUsConfig"
      ])
   },
   methods: {
      ...mapActions(["obtainHomepageConfiguration", "completeComponentsConfigurationToUpdate", "resetGeneralConfig"]),
      ...mapActions("style", ["startApplication"]),

      configurateHomepage() {
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
      }
   }
};
</script>
