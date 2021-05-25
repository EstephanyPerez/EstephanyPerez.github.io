<template>
   <div>
      <Navbar />
      <router-view></router-view>
      <Footer />
   </div>
</template>

<script>
//import { mapState, mapActions } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
   name: "HomeMarketplace",
   props: {},
   components: {
      Navbar,
      Footer
   },
   data() {
      return {};
   }
};
</script>
