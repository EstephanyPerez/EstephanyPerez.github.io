<template>
   <div>
      <v-card width="100%" style="margin-bottom: 15px" light elevation="10" class="card">
         <v-card-text style="padding: 10px">
            <v-row>
               <v-col cols="12" sm="2">
                  <v-avatar style="max-heigth: 100; max-width: 100" width="100%" height="100%" class="pa-ml-4 mx-lg-auto">
                     <img
                        v-if="dataGroup.logoURL"
                        alt="logo-team"
                        :src="
                           dataGroup
                              ? dataGroup.logoURL.indexOf(`s3.amazonaws.com`) > -1
                                 ? dataGroup.logoURL
                                 : require(`@/assets/` + dataGroup.logoURL)
                              : null
                        "
                        id="image"
                        name="image"
                     />
                  </v-avatar>
               </v-col>
               <v-col cols="12" sm="10">
                  <v-app-bar flat color="rgba(0, 0, 0, 0)" height="50px !important;">
                     <v-card-title class="font-weight pl-0">
                        {{ dataGroup.teamName }}
                     </v-card-title>
                  </v-app-bar>

                  <div class="text-start pl-2">
                     <v-dialog v-model="modal" width="800">
                        <template v-slot:activator="{ on, attrs }">
                           <v-btn class="ma-2" small elevation="2" :color="color" v-bind="attrs" v-on="on"> Ver Grupo </v-btn>
                        </template>

                        <v-card>
                           <v-card-title class="headline grey lighten-2"> Información del Grupo </v-card-title>
                           <v-divider></v-divider>
                           <v-col cols="9">
                              <p class="mb-0">Nombre del equipo: {{ dataGroup.teamName }}</p>
                              <p class="mb-0">Centro de Estudios: {{ dataGroup.heiName }}</p>
                              <p class="mb-0" v-if="dataGroup.nameStage != null">Fase del equipo: {{ dataGroup.nameStage }}</p>
                              <p class="mb-0" v-if="dataGroup.nameStage == null">Fase del equipo: {{ "Sin fase asignada" }}</p>
                              <p class="mb-0" v-if="dataGroup.nameChallenge != null">Reto del equipo: {{ dataGroup.nameChallenge }}</p>
                              <p class="mb-0" v-if="dataGroup.nameChallenge == null">Reto del equipo: {{ "Sin reto asignado" }}</p>
                              <p class="mb-0">Integrantes del equipo:</p>
                              <v-data-table locale="es" :items="team" :headers="headers"> </v-data-table>
                           </v-col>
                           <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn :color="color" text @click="modal = false"> Cerrar </v-btn>
                           </v-card-actions>
                        </v-card>
                     </v-dialog>
                  </div>
               </v-col>
            </v-row>
         </v-card-text>
      </v-card>
   </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   name: "cardGroup",
   props: ["dataGroup", "arrayLength", "index"],
   data() {
      return {
         color: "FFFF",
         modal: false,
         team: [],
      };
   },
   computed: {
      ...mapState(["generalConfig", "style"]),
      headers() {
         return [
            {
               text: "Participante",
               align: "start",
               sortable: false,
               value: "concanateName",
            },
            {
               text: "Email",
               value: "email",
            },
            {
               text: "Tipo de participante",
               value: "participantType",
            },
         ];
      },
   },
   created() {
      //document.getElementById("image").src = imgPick();
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      this.team = this.dataGroup.listMembers;
      for (let j = 0; j < this.team.length; j++) {
         this.team[j].concanateName = this.team[j].name + " " + this.team[j].lastName;
         if (this.dataGroup.idTeamLeader === this.team[j].idUser) {
            this.team[j].participantType = "Líder";
         } else {
            this.team[j].participantType = "Participante";
         }
      }
   },
   methods: {},
};
</script>
