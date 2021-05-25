<template>
   <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <v-row>
         <v-col cols="3"></v-col>
         <v-col cols="9">
            <h1>Kit Organizador</h1>
            <h1>{{ organizationalKit.hei.name }}</h1>
            <v-row>
               <v-col cols="4">
                  <v-btn :color="color" dark large @click="$router.back()">
                     <v-icon left>
                        mdi-arrow-left
                     </v-icon>
                     Regresar
                  </v-btn>
               </v-col>
            </v-row>
            <v-row>
               <v-col cols="6">
                  <v-card style="padding:1%;">
                     <v-row>
                        <v-col cols="1"></v-col>
                        <v-col cols="5">
                           <h3 class="mt-2">INFORMACIÓN</h3>
                        </v-col>
                        <v-col cols="6">
                           <v-btn :color="color" dark large rounded @click="checkFiles(1)"> VER CARPETA </v-btn>
                        </v-col>
                     </v-row>
                  </v-card>
               </v-col>
            </v-row>
            <v-row>
               <v-col cols="6">
                  <v-card style="padding:1%;">
                     <v-row>
                        <v-col cols="1"></v-col>
                        <v-col cols="5">
                           <h3 class="mt-2">DISEÑO</h3>
                        </v-col>
                        <v-col cols="6">
                           <v-btn :color="color" dark large rounded @click="checkFiles(2)"> VER CARPETA </v-btn>
                        </v-col>
                     </v-row>
                  </v-card>
               </v-col>
            </v-row>
            <v-row>
               <v-col cols="6">
                  <v-card style="padding:1%;">
                     <v-row>
                        <v-col cols="1"></v-col>
                        <v-col cols="5">
                           <h3 class="mt-2">DOCUMENTOS</h3>
                        </v-col>
                        <v-col cols="6">
                           <v-btn :color="color" dark large rounded @click="checkFiles(3)"> VER CARPETA </v-btn>
                        </v-col>
                     </v-row>
                  </v-card>
               </v-col>
            </v-row>
         </v-col>
      </v-row>
   </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import { mapActions, mapState } from "vuex";

export default {
   name: "OrganizationalKitHeiSelected",
   data() {
      return {
         color: "FFFF"
      };
   },
   components: {
      Sidebar,
      Navbar
   },
   computed: {
      ...mapState(["user", "organizationalKit", "style"])
   },
   methods: {
      ...mapActions({
         saveFilesType: "organizationalKit/saveFilesType"
      }),
      checkFiles(type) {
         this.saveFilesType(type);
         this.$router.push("/organizationalKitHeiFiles");
      }
   },
   mounted() {
      this.color = this.style.style.colors.primary;
   }
};
</script>
