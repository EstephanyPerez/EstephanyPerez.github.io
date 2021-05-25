<template>
   <div>
      <v-container class="pb-5 mb-5">
         <v-row>
            <v-col md="3" lg="2" xl="2" class="d-none d-md-flex pl-0 pr-0">
               <SideBar />
            </v-col>
            <v-col xs="12" sm="12" md="9" lg="10" xl="10">
               <router-view></router-view>
            </v-col>
         </v-row>
      </v-container>
   </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
export default {
   name: "HomeSidebar",
   components: {
      SideBar
   }
};
</script>
