<template>
   <div
      class="pa-0"
      style="
    margin-bottom: 3%;
"
   >
      <Navbar :flag.sync="flagToUpdate" />
      <v-container class="pa-0">
         <ComponentMarketplaceSearch v-if="searchCategoriesConfig.view" />
         <Component1
            v-if="landingConfig.view"
            :mainColor="generalConfig.mainColor"
            :secondaryColor="generalConfig.secondaryColor"
         ></Component1>
         <CarosuelProduct
            v-if="carosuelProductConfig.view"
            :idPublication="1"
         />
         <ComponentMarketplaceCategories v-if="categoriesListConfig.view" />
         <Component2 v-if="multiCardConfig.view" />
         <University v-if="imageCardConfig.view" />

         <ContactComponent v-if="contactUsConfig.view" />
      </v-container>
      <Footer> </Footer>
   </div>
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
import ComponentMarketplaceSearch from "@/components/main-page/ComponentMarketplaceSearch";
import ComponentMarketplaceCategories from "@/components/main-page/ComponentMarketplaceCategories";
import CarosuelProduct from "@/components/main-page/CarosuelProduct.vue";

export default {
   name: "Homepage",
   props: {},
   components: {
      Navbar,
      Component1,
      ContactComponent,
      Component2,
      Footer,
      University,
      ComponentMarketplaceSearch,
      ComponentMarketplaceCategories,
      CarosuelProduct
   },
   data() {
      return {
         flagToUpdate: false
      };
   },
   created() {
      this.configurateHomepage();
      console.log(this.categoriesListConfig);
   },
   mounted() {
      //this.handleIcon();
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
         "contactUsConfig",
         "carosuelProductConfig",
         "searchCategoriesConfig",
         "categoriesListConfig"
      ])
   },
   methods: {
      ...mapActions([
         "completeComponentsConfigurationToUpdate",
         "resetGeneralConfig"
      ]),

      handleIcon: function() {
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
                  console.log("Se obtuvo configuracion");
                  this.completeComponentsConfigurationToUpdate(
                     res.data.payload
                  );
                  //console.log(this.communityType);
                  //this.completeNavbarOptions(this.communityType);
                  //this.handleIcon();
               }
            })
            .catch(function() {
               console.log("error en lista configuracion comunidad");
            });
      }
   }
};
</script>
