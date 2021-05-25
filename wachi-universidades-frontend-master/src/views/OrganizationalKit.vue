<template>
   <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <v-row>
         <v-col cols="3"></v-col>
         <v-col cols="9">
            <h1>KIT ORGANIZADOR</h1>
            <v-row>
               <v-col cols="6"></v-col>
               <v-col cols="4" v-if="user.user.data.privilege === 'coordinador general'"
                  >Institución Educativa
                  <v-autocomplete
                     v-model="selectedHei"
                     :items="heisSelectFilter"
                     item-text="name"
                     item-value="name"
                     :color="color"
                     @change="filterHeis"
                  ></v-autocomplete>
               </v-col>
            </v-row>

            <div v-if="user.user.data.privilege === 'coordinador general'">
               <v-row class="my-5" v-for="(hei, i) in heisFilter" :key="i">
                  <v-col cols="10">
                     <v-card style="padding: 1%">
                        <v-row>
                           <v-col cols="1"></v-col>
                           <v-col cols="7">
                              <h2>{{ hei.name }}</h2>
                           </v-col>
                           <v-col cols="4">
                              <v-btn :color="color" dark large rounded @click="heiFiles(hei)"> VER CARPETA </v-btn>
                           </v-col>
                        </v-row>
                     </v-card>
                  </v-col>
               </v-row>
            </div>
            <div v-else>
               <v-row>
                  <v-col cols="6">
                     <v-card style="padding: 1%">
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
                     <v-card style="padding: 1%">
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
                     <v-card style="padding: 1%">
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
            </div>
         </v-col>
      </v-row>
   </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import * as EventDA from "@/dataAccess/eventDA.js";
import { mapState, mapActions } from "vuex";

export default {
   name: "OrganizationalKit",
   components: {
      Sidebar,
      Navbar
   },
   data() {
      return {
         currentEvent: null,
         heis: [],
         heisFilter: [],
         heisSelectFilter: [],
         selectedHei: null,
         color: "FFFF"
      };
   },
   computed: {
      ...mapState(["user", "community", "style"])
   },
   methods: {
      ...mapActions({
         saveHei: "organizationalKit/saveHei"
      }),
      ...mapActions({
         saveFilesType: "organizationalKit/saveFilesType"
      }),
      heiFiles(hei) {
         this.saveHei(hei);
         this.$router.push("/organizationalKitHeiSelected");
      },
      checkFiles(type) {
         this.saveFilesType(type);
         this.$router.push("/organizationalKitHeiFiles");
      },
      getHeis() {
         this.heis = [];
         EventDA.getHeisByEvent(this.currentEvent.idUEvent)
            .then(response => {
               let data = response.data.payload;
               for (let i = 0; i < data.length; i++) {
                  let hei = {
                     idHei: data[i].idHei,
                     name: data[i].name
                  };
                  this.heis.push(hei);
                  this.heisFilter.push(hei);
                  this.heisSelectFilter.push(hei);
               }
               this.heisSelectFilter.unshift({ name: "Todas las Instituciones Educativas" });
            })
            .catch(error => {
               console.log(error);
            });
      },
      filterHeis() {
         console.log("selectedHei", this.selectedHei);
         if (this.selectedHei === "Todas las Instituciones Educativas") {
            this.heisFilter = this.heis;
         } else {
            this.heisFilter = [...this.heis];
            const result = this.heisFilter.filter(hei => hei.name === this.selectedHei);
            this.heisFilter = result;
         }
         console.log("this.heisFilter after filter", this.heisFilter);
      }
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then(resp => {
            this.currentEvent = resp.data.payload;
            if (this.user.user.data.privilege === "coordinador de sede") {
               let hei = {};
               hei.idHei = this.user.user.data.idHei;
               hei.name = this.user.user.data.nameHei;
               this.saveHei(hei);
            }

            if (this.user.user.data.privilege === "coordinador general") {
               this.getHeis();
            }
         })
         .catch(err => {
            console.log("err", err);
         });
   }
};
</script>
