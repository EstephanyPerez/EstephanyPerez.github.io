<template>
   <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <loading :active.sync="loadingUpload" :can-cancel="false" :is-full-page="false" :color="color"></loading>
      <v-row align="center" justify="center">
         <v-col cols="8" style="margin-inline-start: 300px">
            <v-card class="marginTop">
               <v-container v-if="currentEvent !== null">
                  <h1>{{ currentEvent.name }}</h1>
                  <h2 v-if="currentEvent.ongoing">En Curso</h2>
                  <h2 v-else>No En Curso</h2>
                  <v-row>
                     <v-col cols="7">
                        <h4 class="primary--text">Información General</h4>
                        <br />
                        <div style="margin-left: 15px">
                           <p class="list">
                              <b>Descripción:</b>
                              {{ currentEvent.description }}
                           </p>
                           <p class="list">
                              <b>Fecha de Inicio:</b>
                              {{ currentEvent.startDate }}
                           </p>
                           <p class="list">
                              <b>Fecha de Fin:</b>
                              {{ currentEvent.endDate }}
                           </p>
                           <p class="list">
                              <b>Mínimo de Integrantes por Grupo:</b>
                              {{ currentEvent.minPerGroup }}
                           </p>
                           <p class="list">
                              <b>Máximo de Integrantes por Grupo:</b>
                              {{ currentEvent.maxPerGroup }}
                           </p>
                        </div>
                     </v-col>
                     <v-col :style="styleObject" cols="4">
                        <v-img :src="generalConfig.logo"></v-img>
                     </v-col>
                  </v-row>
                  <h4 class="primary--text">Universidades e Instituciones</h4>
                  <v-treeview
                     :items="this.heis"
                     item-children="courses"
                     open-on-click
                     expand-icon="mdi-plus-circle"
                     on-icon="mdi-calendar"
                  ></v-treeview>
                  <v-dialog v-if="this.login.login.privilege === 'coordinador general'" v-model="endEventDialog" persistent max-width="600px">
                     <template v-slot:activator="{ on, attrs }">
                        <v-col cols="3" class="pointer pt-0" v-bind="attrs" v-on="on">
                           <v-btn class="mx-3" large :color="color"> Terminar Evento </v-btn>
                        </v-col>
                     </template>
                     <v-card>
                        <v-card-title>
                           <span class="headline">Terminar Evento</span>
                        </v-card-title>
                        <v-card-text>
                           <v-form>
                              <v-container>
                                 <v-row>
                                    <h3>¿Está seguro que desea terminar el evento {{ currentEvent.name }}?</h3>
                                 </v-row>
                              </v-container>
                           </v-form>
                        </v-card-text>
                        <v-card-actions>
                           <v-row>
                              <v-col cols="2"> </v-col>
                              <v-col cols="2">
                                 <v-btn :color="color" x-large @click="endEventDialog = false">Cancelar</v-btn>
                              </v-col>
                              <v-col cols="3"> </v-col>
                              <v-col cols="2">
                                 <v-btn
                                    :color="color"
                                    x-large
                                    @click="
                                       endEventDialog = false;
                                       endEvent();
                                    "
                                    >Aceptar</v-btn
                                 >
                              </v-col>
                           </v-row>
                        </v-card-actions>
                     </v-card>
                  </v-dialog>
               </v-container>
               <v-container v-else>
                  <h1>No hay evento creado</h1>
               </v-container>
            </v-card>
         </v-col>
      </v-row>
   </div>
</template>
<style scoped src="../styles/Step3NewEvent.css"></style>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import * as EventDA from "@/dataAccess/eventDA.js";
import { mapState, mapActions } from "vuex";
import * as homepageDA from "@/dataAccess/home-page.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
   name: "HomeLogged",
   components: {
      Sidebar,
      Navbar,
      Loading
   },
   data() {
      return {
         styleObject: {
            padding: "1%",
            width: "70em",
            margin: "3% auto"
         },
         currentEvent: null,
         heis: [],
         endEventDialog: false,
         loadingUpload: false,
         color: "FFFF"
      };
   },
   computed: {
      ...mapState(["community", "login", "generalConfig", "style"])
   },
   methods: {
      ...mapActions(["obtainHomepageConfiguration", "completeComponentsConfigurationToUpdate", "resetGeneralConfig"]),
      ...mapActions("style", ["startApplication"]),

      endEvent() {
         this.loadingUpload = true;
         EventDA.endEvent(this.currentEvent.idUEvent)
            .then(resp => {
               this.loadingUpload = false;
               console.log(resp);
               this.$swal.fire("Evento Terminado", "Se cerró el evento con éxito", "success");
               this.loadEvent();
               location.reload();
            })
            .catch(err => {
               this.loadingUpload = false;
               console.log(err);
               this.$swal.fire("Ocurrió un Error", "Ocurrió un error al terminar el evento", "error");
            });
      },
      loadEvent() {
         EventDA.getActiveUEvent(this.community.community.idCommunity)
            .then(response => {
               this.currentEvent = response.data.payload;
               console.log("evento activo: ", response.data.payload);
               if (this.currentEvent !== null) {
                  EventDA.getHeisByEvent(this.currentEvent.idUEvent).then(responseHeis => {
                     let heisPayload = responseHeis.data.payload;
                     for (let i = 0; i < heisPayload.length; i++) {
                        // console.log("hei ", i, heisPayload[i]);
                        this.heis.push({
                           name: heisPayload[i].name,
                           courses: heisPayload[i].idType === 1 ? heisPayload[i].units : heisPayload[i].courses
                        });
                     }
                  });
               }
            })
            .catch(error => {
               console.log("al consultar el servidor + ", error);
            });
      }
   },
   mounted() {
      this.loadEvent();
   },
   beforeMount() {
      this.color = this.style.style.colors.primary;
      this.styleObject.backgroundColor = this.style.style.colors.primary;
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
};
</script>
