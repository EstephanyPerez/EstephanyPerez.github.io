<template>
   <div>
      <v-card>
         <v-card-title>Miembros del equipo</v-card-title>
         <v-list>
            <v-list-item v-for="(member, i) in members" :key="i">
               <v-list-item-avatar v-if="member.avatar">
                  <v-img :src="member.avatar"></v-img>
               </v-list-item-avatar>
               <v-list-item-avatar v-else>
                  <v-img src="https://www.w3schools.com/howto/img_avatar2.png"></v-img>
               </v-list-item-avatar>

               <v-list-item-content>
                  <v-list-item-title>{{ member.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ member.email }}</v-list-item-subtitle>
               </v-list-item-content>
            </v-list-item>
         </v-list>
      </v-card>
   </div>
</template>

<script>
import * as TeamsDA from "@/dataAccess/teamsDA.js";
import { mapState } from "vuex";
export default {
   name: "MenuMembersTeam",
   data() {
      return {
         members: []
      };
   },
   computed: {
      ...mapState(["user"])
   },
   methods: {
      getTeamMembers() {
         TeamsDA.getUsersOfTeam(this.user.user.data.idTeam)
            .then(response => {
               console.log("respuesta getUsersOfTeam", response.data.payload);
               let users = response.data.payload;
               for (let i = 0; i < users.length; i++) {
                  let member = {
                     avatar: users[i].imageUrl,
                     name: users[i].name + " " + users[i].lastName,
                     email: users[i].email
                  };
                  this.members.push(member);
               }
            })
            .catch(error => {
               console.log("error getUsersOfTeam ", error);
            });
      }
   },
   mounted() {
      this.getTeamMembers();
   }
};
</script>
