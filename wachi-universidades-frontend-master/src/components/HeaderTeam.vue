<template>
   <v-row dense>
      <v-col :cols="12">
         <v-card>
            <v-img :src="team.src" class="white--text" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
               <v-container>
                  <v-row>
                     <v-col :cols="12" sm="1" md="1" lg="1"></v-col>
                     <v-col cols="12"></v-col>
                     <v-col :cols="12" sm="5" md="6" lg="5">
                        <v-card-title v-text="team.nameTeam" class="headline"></v-card-title>
                        <!--aquí debe estar la fase del equipo, no el state, problema de back-->
                        <v-card-subtitle class="white--text">Fase del equipo: {{ team.phase }}</v-card-subtitle>
                        <v-card-text class="white--text pb-0">Reto seleccionado: {{ team.challenge }}</v-card-text>
                     </v-col>
                  </v-row>
               </v-container>
            </v-img>
         </v-card>
      </v-col>
   </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
   name: "HeaderTeam",
   data: () => ({
      team: {
         src: "https://i2.wp.com/www.moreorganised.com/wp-content/uploads/2017/10/More_Organised_in_the_office.jpg?resize=3200%2C1245&ssl=1",
         nameTeam: "",
         phase: "",
         lastUpdate: "Última actualización: " + "30 de septiembre de 2020"
      }
   }),
   computed: {
      ...mapState(["user"])
   },
   mounted() {
      this.team.nameTeam = this.user.user.data.teamName;
      this.team.phase = this.user.user.data.teamPhase;
      this.team.challenge = this.user.user.data.teamChallenge;
      console.log("user: ", this.user.user);
   }
};
</script>

<style scoped>
.header-team {
   text-align: center;
   font-family: Roboto;
   background: #cccccc;
}
</style>
