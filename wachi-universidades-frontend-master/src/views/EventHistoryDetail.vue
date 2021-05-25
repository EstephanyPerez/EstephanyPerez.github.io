<template>
   <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <v-row align="center" justify="center">
         <v-col cols="8" style="margin-inline-start: 300px">
            <v-card class="marginTop">
               <v-container v-if="eventHistory !== null">
                  <h1>{{ eventHistory.name }}</h1>
                  <h2 v-if="eventHistory.ongoing">En Curso</h2>
                  <h2 v-else>No En Curso</h2>
                  <v-row>
                     <v-col cols="7">
                        <h4 class="primary--text">Información General</h4>
                        <br />
                        <div style="margin-left: 15px">
                           <p class="list">
                              <b>Descripción:</b>
                              {{ eventHistory.description }}
                           </p>
                           <p class="list">
                              <b>Fecha de Inicio:</b>
                              {{ eventHistory.startDate }}
                           </p>
                           <p class="list">
                              <b>Fecha de Fin:</b>
                              {{ eventHistory.endDate }}
                           </p>
                           <p class="list">
                              <b>Mínimo de Integrantes por Grupo:</b>
                              {{ eventHistory.minPerGroup }}
                           </p>
                           <p class="list">
                              <b>Máximo de Integrantes por Grupo:</b>
                              {{ eventHistory.maxPerGroup }}
                           </p>
                        </div>
                     </v-col>
                     <v-col :style="styleObject" cols="4">
                        <v-img :src="generalConfig.logo"></v-img>
                     </v-col>
                  </v-row>
                  <h4 class="primary--text">Retos</h4>
                  <v-col cols="12" class="pointer" v-if="challenges !== null">
                     <v-carousel hide-delimiters height="auto" class="carousel" v-if="challenges !== null">
                        <v-carousel-item v-for="i in numPages" :key="i" class="carousel-item">
                           <v-row>
                              <v-col v-for="j in 2" :key="j">
                                 <ChallengeCard
                                    :i="i"
                                    :j="j"
                                    :numPages="numPages"
                                    :numChallenges="numChallenges"
                                    :challenge="challengesOriginal[(i - 1) * 2 + j - 1]"
                                    :challenges="challenges"
                                 />
                              </v-col>
                           </v-row>
                        </v-carousel-item>
                     </v-carousel>
                  </v-col>
                  <v-col v-else cols="9">
                     <h2>No hubo Retos Registrados</h2>
                  </v-col>
                  <h4 class="primary--text">Actividades</h4>
                  <v-col cols="9" v-if="activities !== null">
                     <v-layout class="pt-5" v-for="(activity, i) in activities" :key="i">
                        <v-flex xs12 sm9 offset-sm0>
                           <v-card class="cards">
                              <v-card-title primary-title>
                                 <v-col cols="8">
                                    <div>
                                       <h2>{{ activity.name }}</h2>
                                    </div>
                                    <div>
                                       <p class="mb-0">
                                          {{ activity.description }}
                                       </p>
                                    </div>
                                 </v-col>
                                 <v-col cols="4">
                                    <div>
                                       <p v-if="activity.obligatory">Obligatorio</p>
                                       <p v-else>Opcional</p>
                                    </div>
                                 </v-col>
                              </v-card-title>
                           </v-card>
                        </v-flex>
                     </v-layout>
                  </v-col>
                  <v-col v-else cols="9">
                     <h2>No hubo Actividades Registradas</h2>
                  </v-col>
                  <h4 class="primary--text">Universidades e Instituciones</h4>
                  <v-treeview
                     :items="this.heis"
                     item-children="courses"
                     open-on-click
                     expand-icon="mdi-plus-circle"
                     on-icon="mdi-calendar"
                  ></v-treeview>
               </v-container>
               <v-container v-else>
                  <h1>No hay evento creado</h1>
               </v-container>
            </v-card>
         </v-col>
      </v-row>
   </div>
</template>
<style scoped src="../styles/Challenges.css"></style>
<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import ChallengeCard from "@/components/ChallengeCardShow.vue";
import * as EventDA from "@/dataAccess/eventDA.js";
import * as ActivityDA from "@/dataAccess/activityDA.js";
import * as ChallengeDA from "@/dataAccess/challengesDA.js";
import { mapState, mapActions } from "vuex";
export default {
   name: "EventHistoryDetail",
   components: {
      Sidebar,
      Navbar,
      ChallengeCard
   },
   data() {
      return {
         styleObject: {
            padding: "1%",
            width: "70em",
            margin: "3% auto"
         },
         eventHistory: null,
         heis: [],
         activities: null,
         challenges: null,
         challengesOriginal: [],
         numChallenges: "",
         numPages: "",
         colo: "FFFF"
      };
   },
   methods: {
      ...mapActions({
         saveHistoryEventInformation: "event/saveHistoryEventInformation"
      }),
      eventDetail(event) {
         console.log("se dio doblre click a", event.name);
         this.saveHistoryEventInformation(event);
      }
   },
   computed: {
      ...mapState(["community", "style"]),
      ...mapState(["event", "generalConfig"])
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      this.styleObject.backgroundColor = this.style.style.colors.primary;
      this.eventHistory = this.event.eventHistory;
      console.log("evento: ", this.eventHistory);
      if (this.eventHistory !== null) {
         EventDA.getHeisByEvent(this.eventHistory.idUEvent).then(responseHeis => {
            let heisPayload = responseHeis.data.payload;
            for (let i = 0; i < heisPayload.length; i++) {
               console.log("hei ", i, heisPayload[i]);
               this.heis.push({
                  name: heisPayload[i].name,
                  courses: heisPayload[i].idType === 1 ? heisPayload[i].units : heisPayload[i].courses
               });
            }
         });
         ActivityDA.listActivities(this.eventHistory.idUEvent)
            .then(response => {
               console.log("servicio de listado", response.data);
               if (Object.keys(response.data).indexOf("payload") !== -1) {
                  this.activities = response.data.payload;
               }
            })
            .catch(err => {
               console.log("ocurrió un error al listar las actividades", err.response.data);
            });
         ChallengeDA.getChallenges(this.eventHistory.idUEvent)
            .then(response => {
               //console.log("servicio de listado",response.data);
               if (Object.keys(response.data).indexOf("payload") !== -1) {
                  this.challenges = response.data.payload;
                  for (let i = 0; i < this.challenges.length; i++) {
                     this.challengesOriginal.push({
                        idChallenge: this.challenges[i].idChallenge,
                        name: this.challenges[i].name,
                        description: this.challenges[i].description,
                        fileImage: this.challenges[i].imageURL,
                        filenameImage: this.challenges[i].imageFilename,
                        logoImage: this.challenges[i].logoURL,
                        filenameLogo: this.challenges[i].logoFilename,
                        dialogDelete: false,
                        dialogEdit: false
                     });
                  }
                  this.numChallenges = this.challengesOriginal.length; //sets the number of comunities received
                  console.log(this.numChallenges);
                  this.numPages = Math.ceil(this.numChallenges / 2); //sets the number of pages rendered (10 or less cards per page)
               }
            })
            .catch(err => {
               console.log("no se encontraron retos", err.response.data);
            });
      }
   }
};
</script>
