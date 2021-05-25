<template>
   <div>
      <Navbar></Navbar>
      <v-row>
         <v-col cols="3">
            <Sidebar></Sidebar>
         </v-col>
         <v-row>
            <v-col cols="7">
               <h1>GESTIÓN DE FEEDBACK</h1>
            </v-col>
         </v-row>
         <v-col offset="3" cols="9" v-if="activitiesPost !== null">
            <v-layout class="spacing" v-for="(activity, i) in activitiesx" :key="i">
               <v-flex xs12 sm9 offset-sm0>
                  <v-card>
                     <v-card-title primary-title>
                        <v-col cols="8">
                           <div>
                              <h2>{{ activity.activity.name }}</h2>
                           </div>
                           <div>
                              <p class="mb-0">
                                 {{ activity.activity.description }}
                              </p>
                           </div>
                        </v-col>
                        <v-col cols="4">
                           <div>
                              <p v-if="activity.obligatory">
                                 Obligatorio
                              </p>
                              <p v-else>Opcional</p>

                              <v-row class="pt-0">
                                 <v-btn :color="color" large @click="() => goToFeedbackGroup(activity)">
                                    VER GRUPOS
                                 </v-btn>
                              </v-row>
                           </div>
                        </v-col>
                     </v-card-title>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-col>
         <v-col v-else cols="9">
            <h1>No hay Actividades</h1>
         </v-col>
      </v-row>
   </div>
</template>

<style scoped src="../styles/Activities.css"></style>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import * as ActivityDA from "@/dataAccess/activityDA.js";
import * as EventDA from "@/dataAccess/eventDA.js";
import { mapState, mapActions } from "vuex";

export default {
   name: "CampusCoordinators",
   components: {
      Sidebar,
      Navbar
   },
   data() {
      return {
         currentEvent: null,
         activitiesx: [],
         activitiesPost: [],
         color: "FFFF"
      };
   },
   computed: {
      ...mapState(["activities", "style"]),
      ...mapState(["community"])
   },
   methods: {
      ...mapActions({ saveActivity: "feedback/saveActivity" }),
      goToFeedbackGroup(activity) {
         //Here i have to send activity info
         this.saveActivity(activity);
         this.$router.push("/feedbackGroup");
      }
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then(resp => {
            console.log("response", resp);
            this.currentEvent = resp.data.payload;
            if (this.currentEvent) {
               ActivityDA.listActivities(this.currentEvent.idUEvent)
                  .then(response => {
                     console.log("servicio de listado", response.data);
                     if (Object.keys(response.data).indexOf("payload") !== -1) {
                        this.activitiesPost = response.data.payload;
                        this.activitiesPost.forEach(activity => {
                           this.activitiesx.push({
                              activity: activity,
                              dialogActivityEdit: false,
                              dialogActivityDelete: false
                           });
                           console.log("se imprime actividad: ", activity);
                        });
                     }
                  })
                  .catch(err => {
                     console.log("ocurrió un error al listar las actividades", err);
                  });
            }
         })
         .catch(err => {
            console.log("ocurrió un error al listar las actividades", err);
         });
   }
};
</script>
