<template>
   <v-container>
      <v-row>
         <Navbar :flag.sync="flagToUpdate" />

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

         <Footer> </Footer>
      </v-row>
      <h1>
         {{ userModel.session.authenticated }}
      </h1>
   </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "../components/Navbar.vue";
import Component1 from "../components/main-page/Component1.vue";
import ContactComponent from "../components/main-page/ContactComponent.vue";
import Component2 from "../components/main-page/Component2.vue";
import University from "../components/main-page/University.vue";
import Footer from "../components/Footer.vue";
import ComponentMarketplaceSearch from "@/components/main-page/ComponentMarketplaceSearch";
import ComponentMarketplaceCategories from "@/components/main-page/ComponentMarketplaceCategories";

export default {
   name: "HomeLogged",
   components: {
      Navbar,
      Component1,
      ContactComponent,
      Component2,
      Footer,
      University,
      ComponentMarketplaceSearch,
      ComponentMarketplaceCategories
   },
   computed: {
      ...mapGetters({
         userModel: "user/getUser"
      })
   }
};
</script>
