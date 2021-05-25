<template>
   <!-- START: BODY-CONTAINER -->
   <div class="pa-0" style="margin-bottom: 3%">
      <Navbar :flag="flagToUpdate" />

      <v-container style="padding: 0">
         <!-- Barra de navegación -->
         <ComponentMarketplaceSearch
            v-if="searchCategoriesConfig.view"
         ></ComponentMarketplaceSearch>
         <Component1 v-if="landingConfig.view"> </Component1>
         <v-card-title class="pb-1">Recientes</v-card-title>
         <CarosuelProduct v-if="carosuelProductConfig.view"></CarosuelProduct>
         <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
            align-self="center"
            class="d-flex justify-end"
         >
            <v-card-actions
               ><a
                  href="javascript:void(0)"
                  class="mt-1"
                  @click="goListProductService()"
                  >Ver todos los productos y servicios
               </a></v-card-actions
            ></v-col
         >
         <ComponentMarketplaceCategories
            v-if="searchCategoriesConfig.view"
            class="pb-10"
         />
         <Component2 v-if="multiCardConfig.view"></Component2>
         <University3 v-if="imageCardConfig.view"></University3>
         <ContactUs v-if="contactUsConfig.view" />
         <Footer> </Footer>
      </v-container>
   </div>
   <!-- FINISH: BODY-CONTAINER -->
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

//Componentes empleados
import Navbar from "@/components/Navbar.vue";
import Component1 from "@/components/main-page/Component1.vue";
import Component2 from "@/components/main-page/Component2.vue";
import University3 from "@/components/main-page/University.vue";
import ContactUs from "@/components/main-page/ContactComponent.vue";
import Footer from "@/components/Footer.vue";
import CarosuelProduct from "@/components/CarosuelProductRecent.vue";
import ComponentMarketplaceSearch from "@/components/main-page/ComponentMarketplaceSearch.vue";
import ComponentMarketplaceCategories from "@/components/main-page/ComponentMarketplaceCategories.vue";
import * as homepageDA from "@/dataAccess/home-page.js";

export default {
   name: "Home",
   components: {
      Navbar,
      Component1,
      Footer,
      Component2,
      University3,
      ContactUs,
      ComponentMarketplaceSearch,
      CarosuelProduct,
      ComponentMarketplaceCategories
   },
   data() {
      return {
         flagToUpdate: false
      };
   },
   created() {
      this.configurateHomepage();
      console.log(localStorage.getItem("avatarURL"));
   },
   mounted() {
      this.handleIcon();
      //console.log("ME RENDERICE NUEVAMENTE MOUNTED");
      this.configurateHomepage();
   },
   computed: {
      ...mapState([
         "generalConfig",
         "communityType",
         "landingConfig",
         "multiCardConfig",
         "imageCardConfig",
         "contactUsConfig",
         "categoriesListConfig",
         "carosuelProductConfig",
         "searchCategoriesConfig"
      ])
   },

   methods: {
      ...mapGetters("user", ["getUser"]),
      ...mapActions([
         "obtainHomepageConfiguration",
         "completeSelectedComponentsData",
         "completeComponentsConfigurationToUpdate"
      ]),

      handleIcon() {
         // accessing the link tag
         const favicon = document.getElementById("favicon");
         favicon.href = this.generalConfig.favicon;
      },

      configurateHomepage() {
         homepageDA
            .obtainHomepageConfiguration() //entering the idCommunity
            .then(res => {
               console.log("blueprint: ");
               console.log(res.data);
               //console.log(res.data.status);
               //console.log("blueprint: " + res.data.payload.loginImage);
               if (res.data.status == "OK") {
                  //console.log("Se obtuvo configuracion");
                  this.completeComponentsConfigurationToUpdate(
                     res.data.payload
                  );
                  this.handleIcon();
               }
            });
      },
      getFechaColapso: function() {
         //EJEMPLO:
         /*userDA.getSimulation().then((res) =>{
                    console.log(res.data);
                    console.log('Se imprimio rpta');
                    this.setFechaColapso(res.data);
                    console.log('Se recibió la fecha de simulacion');
                }).catch(error =>{
                    Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: 'error',
                        html: '<p style="font-family:Roboto;">Error obteniendo la fecha de simulacion</p>'
                    })
                });*/
      },

      pruebaVar: function() {
         let text = "PRUEBA DE INTEGRACIÓN";

         text = text + JSON.stringify(this.generalConfig) + "\n";

         return text;
      },
      goListProductService() {
         if (!this.getUser().session.authenticated) {
            this.$router.push({
               name: "ListProduct"
            });
         } else {
            this.$router.push({
               name: "ListProduct-loggued"
            });
         }
      }
   }
};
</script>
