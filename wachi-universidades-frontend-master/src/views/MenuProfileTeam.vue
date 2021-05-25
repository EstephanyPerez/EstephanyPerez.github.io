<template>
   <div>
      <v-card>
         <v-card-title>Perfil del equipo</v-card-title>
         <v-list>
            <v-list-item>
               <v-row>
                  <v-col cols="2">
                     <v-card-subtitle>Foto del equipo:</v-card-subtitle>
                  </v-col>
                  <v-col cols="6">
                     <v-img
                        :src="team.src ? (team.src.indexOf(`s3.amazonaws.com`) > -1 ? team.src : require(`@/assets/` + team.src)) : null"
                        height="250px"
                        width="250px"
                        style="border-radius: 200px"
                     ></v-img>
                  </v-col>
                  <v-col cols="4">
                     <v-dialog v-model="dialogImg" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                           <div v-bind="attrs" v-on="on">
                              <v-icon>mdi-pencil</v-icon>
                           </div>
                        </template>
                        <v-card>
                           <v-file-input
                              class="pt-5 px-5"
                              outlined
                              label="Editar imagen del reto"
                              prepend-icon="mdi-pencil"
                              accept="image/png, image/jpeg, image/bmp"
                              v-model="logoImage"
                           ></v-file-input>
                           <v-card-actions>
                              <v-row align="center" justify="center">
                                 <v-col cols="3" class="mr-8">
                                    <v-btn color="primary" @click="dialogImg = false" large> Cancelar </v-btn>
                                 </v-col>
                                 <v-col cols="3" class="ml-8">
                                    <v-btn color="primary" @click="editImage()" dark large> Aceptar </v-btn>
                                 </v-col>
                              </v-row>
                           </v-card-actions>
                        </v-card>
                     </v-dialog>
                  </v-col>
                  <v-col cols="2">
                     <v-card-subtitle>Nombre del equipo:</v-card-subtitle>
                  </v-col>
                  <v-col cols="6">
                     <v-card-subtitle>{{ team.name }}</v-card-subtitle>
                  </v-col>
                  <v-col cols="4">
                     <v-dialog v-model="dialogName" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                           <div v-bind="attrs" v-on="on">
                              <v-icon>mdi-pencil</v-icon>
                           </div>
                        </template>
                        <v-card>
                           <v-text-field
                              :maxlength="maxLength"
                              class="pt-5 px-5"
                              label="Nombre de equipo nuevo"
                              outlined
                              color="primary"
                              v-model="newTeamName"
                           ></v-text-field>
                           <v-card-actions>
                              <v-row align="center" justify="center">
                                 <v-col cols="3" class="mr-8">
                                    <v-btn color="primary" @click="cancelEditName()" large> Cancelar </v-btn>
                                 </v-col>
                                 <v-col cols="3" class="ml-8">
                                    <v-btn color="primary" @click="editName()" dark large> Aceptar </v-btn>
                                 </v-col>
                              </v-row>
                           </v-card-actions>
                        </v-card>
                     </v-dialog>
                  </v-col>
               </v-row>
            </v-list-item>
         </v-list>
      </v-card>
   </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as InscribidesDA from "@/dataAccess/inscribidesDA.js";
import * as TeamsDA from "@/dataAccess/teamsDA.js";

export default {
   name: "MenuProfileTeam",
   computed: {
      ...mapState(["user"])
   },
   data() {
      return {
         maxLength: 200,
         team: {
            src: "",
            name: ""
         },
         logoImage: null,
         dialogImg: false,
         dialogName: false,
         newTeamName: ""
      };
   },
   methods: {
      ...mapActions({ saveUser: "user/login" }),
      setImage(response) {
         this.team.src = response.data.payload.logoURL;
         console.log("Imagen :", this.team.src);
      },
      editImage() {
         let logo = {
            idTeam: this.user.user.data.idTeam,
            communityToken: null,
            logo: this.logoImage,
            logoLocalPath: null,
            logoInLocalPath: false
         };
         console.log("Logo", logo);
         InscribidesDA.registryLogo(logo)
            .then(response => {
               this.dialogImg = false;
               this.team.src = response.data.payload.logoURL;
               let userAux = { ...this.user.user.data };
               userAux.teamURL = response.data.payload.logoURL;
               this.saveUser(userAux);
            })
            .catch(error => {
               console.log("Error : ", error.response);
            });
      },
      editName() {
         TeamsDA.editName(this.user.user.data.idTeam, this.newTeamName)
            .then(response => {
               this.dialogName = false;
               this.team.name = this.newTeamName;
               let userAux = { ...this.user.user.data };
               userAux.teamName = this.newTeamName;
               console.log("Antes de save user");
               this.saveUser(userAux);
               console.log("Despues de save user");
               this.newTeamName = "";
               console.log("Response edit :", response);
            })
            .catch(error => {
               console.log("Error : ", error.response);
            });
      },
      cancelEditName() {
         this.dialogName = false;
         this.newTeamName = "";
      }
   },
   mounted() {
      this.team.src = this.user.user.data.teamURL;
      this.team.name = this.user.user.data.teamName;
      this.team.idTeam = this.user.user.data.idTeam;
   }
};
</script>
