<template>
   <div>
      <v-card>
         <v-card-title>Retos</v-card-title>
         <v-list>
            <v-list-item v-for="(challenge, i) in challenges" :key="i">
               <v-list-item-avatar>
                  <v-img
                     :src="
                        challenge.imageURL
                           ? challenge.imageURL.indexOf(`s3.amazonaws.com`) > -1
                              ? challenge.imageURL
                              : require(`@/assets/` + challenge.imageURL)
                           : null
                     "
                  ></v-img>
               </v-list-item-avatar>

               <v-list-item-content>
                  <v-list-item-title>{{ challenge.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ challenge.description }}</v-list-item-subtitle>
               </v-list-item-content>
            </v-list-item>
         </v-list>
      </v-card>
   </div>
</template>

<script>
import { mapState } from "vuex";
import * as ChallengeDA from "@/dataAccess/challengesDA.js";
import * as EventDA from "@/dataAccess/eventDA.js";
export default {
   name: "MenuChallengesTeam",
   data() {
      return {
         challenges: []
      };
   },
   methods: {
      getEvent() {
         EventDA.getActiveUEvent(this.community.community.idCommunity)
            .then(response => {
               this.getChallenges(response.data.payload.idUEvent);
            })
            .catch(error => {
               console.log(error.response);
            });
      },
      getChallenges(idEvent) {
         ChallengeDA.getChallenges(idEvent)
            .then(response => {
               this.challenges = response.data.payload;
            })
            .catch(error => {
               console.log(error.response);
            });
      }
   },
   computed: {
      ...mapState(["community"])
   },
   mounted() {
      this.getEvent();
   }
};
</script>
