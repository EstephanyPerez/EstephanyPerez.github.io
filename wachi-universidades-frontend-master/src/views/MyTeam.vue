<template>
   <v-container>
      <Navbar> </Navbar>
      <!-- START: BODY-CONTAINER -->
      <v-container
         style="
            max-height: 935px! important; max-width: 1024px!important; width: calc(100% - 40px)!important;"
      >
         <v-row>
            <v-col :cols="12" md="12" lg="12">
               <HeaderTeam></HeaderTeam>
            </v-col>
            <v-col :cols="12" md="3" lg="3">
               <MenuTeam></MenuTeam>
            </v-col>
            <v-col :cols="12" md="9" lg="9">
               <router-view></router-view>
            </v-col>
         </v-row>
      </v-container>
      <!-- FINISH: BODY-CONTAINER -->
      <Footer> </Footer>
   </v-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import HeaderTeam from "@/components/HeaderTeam";
import MenuTeam from "@/components/MenuTeam";

export default {
   name: "Teams",
   components: {
      Navbar,
      Footer,
      HeaderTeam,
      MenuTeam
   },
   data() {
      return {
         numGroups: 2
      };
   },
   computed: {},
   mounted() {},
   methods: {}
};
</script>
