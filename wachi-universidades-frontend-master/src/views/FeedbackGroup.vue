<template>
   <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <v-row>
         <v-col cols="3"> </v-col>
         <v-col cols="9">
            <v-row>
               <v-col cols="5">
                  <h1>Actividad: {{ activity ? activity.name : null }}</h1>
               </v-col>
               <v-col cols="3"
                  >Filtrar por Estado
                  <v-autocomplete
                     v-model="selectedState"
                     :items="states"
                     item-text="nameState"
                     item-value="nameState"
                     @change="filterTeams"
                  ></v-autocomplete>
               </v-col>
               <v-col cols="3"
                  >Filtrar por Nombre de Equipo
                  <v-autocomplete
                     v-model="selectedName"
                     :items="teamSelectFilter"
                     item-text="name"
                     item-value="name"
                     @change="filterTeamsName"
                  ></v-autocomplete>
               </v-col>
            </v-row>
            <v-row>
               <v-col cols="4">
                  <v-btn :color="color" dark large @click="$router.back()">
                     <v-icon left> mdi-arrow-left </v-icon>
                     Regresar
                  </v-btn>
               </v-col>
            </v-row>
         </v-col>

         <v-col offset="3" cols="9" v-if="activitiesPost !== null">
            <v-layout class="spacing" v-for="(team, i) in teamsFilter" :key="i">
               <v-flex xs12 sm9 offset-sm0>
                  <v-card>
                     <v-card-title primary-title>
                        <v-col cols="8">
                           <div>
                              <h2>{{ team.name }}</h2>
                           </div>
                           <div>
                              <p class="mb-0">
                                 Estado:
                                 {{ team.deliverable == null ? "Sin entregar" : team.deliverable.feedbacks != null ? "Revisado" : "Entregado" }}
                              </p>
                           </div>
                        </v-col>
                        <v-col cols="4">
                           <div>
                              <v-row class="pt-0" v-if="team.deliverable != null">
                                 <v-btn :color="color" large @click="() => checkTeam(team)"> VER DETALLE </v-btn>
                              </v-row>
                           </div>
                        </v-col>
                     </v-card-title>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-col>
      </v-row>
   </div>
</template>

<style scoped src="../styles/Activities.css"></style>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import * as FeedbackDA from "@/dataAccess/feedbackDA.js";
import { mapState, mapActions } from "vuex";

export default {
   name: "CampusCoordinators",
   components: {
      Sidebar,
      Navbar
   },
   computed: {
      ...mapState(["feedback", "login", "style"])
   },
   data() {
      return {
         color: "FFFF",
         currentEvent: null,
         activitiesx: [],
         activitiesPost: [],
         activity: null,
         teams: [],
         teamsFilter: [],
         teamsAux: [],
         selectedState: null,
         selectedName: null,
         states: ["Mostrar Todos", "Entregado", "Sin entregar", "Revisado"]
      };
   },
   methods: {
      ...mapActions({ saveTeam: "feedback/saveTeam" }),
      checkTeam(team) {
         this.saveTeam(team);
         console.log("LE DI CLICK A: ", team);
         this.$router.push("/feedbackGroupDetail");
      },
      filterTeams() {
         console.log("selectedState", this.selectedState);
         if (this.selectedState === "Mostrar Todos") this.teamsFilter = this.teams;
         else if (this.selectedState === "Entregado") {
            let teamsAux = [];
            this.teams.map(team => {
               if (team.deliverable != null && team.deliverable.feedbacks == null) teamsAux.push(team);
            });
            this.teamsFilter = teamsAux;
         } else if (this.selectedState === "Sin entregar") {
            let teamsAux = [];
            this.teams.map(team => {
               if (team.deliverable == null) teamsAux.push(team);
            });
            this.teamsFilter = teamsAux;
         } else if (this.selectedState === "Revisado") {
            let teamsAux = [];
            this.teams.map(team => {
               if (team.deliverable != null && team.deliverable.feedbacks != null) teamsAux.push(team);
            });
            this.teamsFilter = teamsAux;
         }
      },
      filterTeamsName() {
         console.log("selectedName", this.selectedName);
         if (this.selectedName === "Todos los equipos") {
            this.teamsFilter = this.teams;
         } else {
            const result = this.teamsFilter.filter(team => team.name === this.selectedName);
            this.teamsFilter = result;
            console.log("this.teamsFilter", this.teamsFilter);
         }
      }
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      //Here I list the groups per activity with status
      console.log("activity", this.feedback.feedback.activity.activity);

      this.activity = this.feedback.feedback.activity.activity;
      console.log("idActivity", this.feedback.feedback.activity.activity.idActivity);

      FeedbackDA.getTeamsXActivity(this.activity.idActivity)
         .then(response => {
            console.log("teams x activity", response.data);

            //If user privilege is not "coordinador general", show only teams that belong to it's Hei
            if (this.login.login.privilege !== "coordinador general") {
               response.data.payload.teams.map(team => {
                  if (team.idHei === this.login.login.idHei) this.teamsAux.push(team);
               });
               this.teams = this.teamsAux;
               this.teamsFilter = this.teamsAux;
            } else {
               this.teams = response.data.payload.teams;
               this.teamsFilter = response.data.payload.teams;
            }
            this.teamSelectFilter = [...this.teams];
            this.teamSelectFilter.unshift({ name: "Todos los equipos" });
         })
         .catch(err => {
            console.log(err.response.data);
            console.log("An error ocurred while listing teams x activity", err);
         });
   }
};
</script>
