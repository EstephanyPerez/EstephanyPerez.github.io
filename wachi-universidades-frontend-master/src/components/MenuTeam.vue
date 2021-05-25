<template>
   <v-card class="justify-left" width="300">
      <v-list>
         <v-list-item link to="/myTeam/profile">
            <v-list-item-icon>
               <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Perfil del equipo</v-list-item-title>
         </v-list-item>

         <v-list-item link to="/myTeam/members">
            <v-list-item-icon>
               <v-icon>mdi-account-supervisor</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Miembros del equipo</v-list-item-title>
         </v-list-item>

         <v-list-item link to="/myTeam/challenges">
            <v-list-item-icon>
               <v-icon>mdi-brain</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Retos</v-list-item-title>
         </v-list-item>

         <v-list-group :value="true" prepend-icon="mdi-terrain">
            <template v-slot:activator>
               <v-list-item-title>Actividades</v-list-item-title>
            </template>

            <v-list-item v-for="(activity, i) in activities" :key="i" link :to="activity.route" @click="setActivity(activity)">
               <v-list-item-title v-text="activity.defaultName"></v-list-item-title>
            </v-list-item>
         </v-list-group>
      </v-list>
   </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import * as EventDA from "@/dataAccess/eventDA.js";
import * as ActivityDA from "@/dataAccess/activityDA.js";
export default {
   name: "MenuTeam",
   components: {},
   data: () => ({
      activities: []
   }),
   methods: {
      ...mapActions({ saveActivity: "activityParticipant/addActivityData" }),
      getActivities(idEvent) {
         ActivityDA.listActivities(idEvent)
            .then(resp => {
               console.log(resp.data);
               let activities = resp.data.payload;
               for (let i = 0; i < activities.length; i++) {
                  let activity = activities[i];
                  let j = i + 1;
                  activity.defaultName = "Actividad " + j;
                  activity.route = "/myTeam/activity/" + j;
                  this.activities.push(activity);
               }
            })
            .catch(error => {
               console.log(error);
            });
      },
      setActivity(activity) {
         console.log(activity);
         this.saveActivity(activity);
         // this.$router.push(activity.route).catch(() => {});
      }
   },
   beforeMount() {
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then(resp => {
            this.getActivities(resp.data.payload.idUEvent);
         })
         .catch(error => {
            console.log(error);
         });
   },
   computed: {
      ...mapState(["community"])
   }
};
</script>
