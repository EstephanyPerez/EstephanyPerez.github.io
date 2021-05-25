<template>
   <div>
      <v-card light elevation="12" v-if="i < numPages || (i == numPages && 2 * (i - 1) + j <= numChallenges)" class="card">
         <v-card-title
            ><strong>Reto N°{{ index }}</strong></v-card-title
         >
         <v-card-title primary-title>
            <v-col cols="2">
               <v-avatar class=".v-avatar-outlined" rounded>
                  <v-img :src="challenge.logoImage"> </v-img>
               </v-avatar>
            </v-col>
            <v-col cols="10">
               {{ challenge.name }}
            </v-col>
         </v-card-title>
         <v-img height="250" width="407" :src="challenge.fileImage"></v-img>
         <v-divider class="mx-4"></v-divider>
         <v-card-text style="font-size: 1.2em">
            <div class="v-card-align-justify"><strong>Descripción:</strong> {{ challenge.description }}</div>
         </v-card-text>
         <v-row>
            <v-col cols="6" align="right"> </v-col>
            <v-col cols="5" align="right"> </v-col>
         </v-row>
      </v-card>
   </div>
</template>
<style src="@/styles/ChallengeCard.css" scoped></style>
<script>
import * as ChallengeDA from "@/dataAccess/challengesDA.js";
import * as EventDA from "@/dataAccess/eventDA.js";
import { mapState } from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
   props: ["i", "j", "numPages", "numChallenges", "challenge", "challenges"],
   data() {
      return {
         index: 0,
         editingAux: {
            name: "",
            description: "",
            fileImage: null,
            logoImage: null,
            dialogEdit: false,
            dialogDelete: false
         },
         editingChallenge: {
            idChallenge: "",
            name: "",
            description: "",
            fileImage: null,
            logoImage: null,
            dialogEdit: false,
            dialogDelete: false
         },
         fileImage: null,
         fileImageAux: null,
         logoImage: null,
         logoImageAux: null,
         idUEvent: null
      };
   },
   validations() {
      return {
         editingChallenge: {
            name: {
               required,
               maxLength: maxLength(250)
            },
            description: {
               required,
               maxLength: maxLength(500)
            }
         }
      };
   },

   methods: {
      editChallenge() {
         this.$v.editingChallenge.$touch();
         if (!this.$v.editingChallenge.$invalid) {
            this.editingChallenge.dialogEdit = false;

            ChallengeDA.editChallenge(this.editingChallenge, this.idUEvent)
               .then(respond => {
                  this.challenge.name = this.editingChallenge.name;
                  this.challenge.description = this.editingChallenge.description;
                  console.log("la respuesta: ", respond.data.payload);
                  console.log(this.editingChallenge);
                  if (this.logoImageAux) {
                     this.challenge.logoImage = this.logoImageAux;
                     console.log(this.logoImage);
                     ChallengeDA.registerLogo(this.editingChallenge.idChallenge, this.logoImage)
                        .then(respond => {
                           console.log(respond.data);
                           console.log("Éxito en la edición del logo del reto con id: ", this.editingChallenge.idChallenge);
                        })
                        .catch(err => {
                           console.log(err.response.data);
                           console.log("Hubo un error al editar el logo del reto con id: ", this.editingChallenge.idChallenge);
                        });
                  }
                  if (this.fileImageAux) {
                     this.challenge.fileImage = this.fileImageAux;
                     console.log(this.fileImage);
                     console.log("Si hay imagen");
                     ChallengeDA.registerImage(this.editingChallenge.idChallenge, this.fileImage)
                        .then(respond => {
                           console.log(respond.data);
                           console.log("Éxito en el registro de la imagen del reto con id: ", this.editingChallenge.idChallenge);
                        })
                        .catch(err => {
                           console.log(err.response.data);
                           console.log("Hubo un error al registrar la imagen del reto con id: ", this.editingChallenge.idChallenge);
                        });
                  }
               })
               .catch(err => {
                  console.log(err.response.data);
               });
         }
      },
      deleteChallenge() {
         console.log(this.index, this.challenge);
         this.challenge.dialogDelete = false;
         ChallengeDA.deleteChallenge(this.challenge.idChallenge)
            .then(response => {
               console.log(response.data);
            })
            .catch(err => {
               console.log("No se pudo eliminar el reto");
               console.log(err.response.data);
            });
      },
      restoreChallengeBefore(i) {
         console.log(i);
         this.editingChallenge.dialogEdit = false;
      },
      onFileChange() {
         const reader = new FileReader();
         reader.readAsDataURL(this.fileImage);
         reader.onload = e => {
            this.fileImageAux = e.target.result;
            //console.log(this.fileImageAux);
         };
      },
      onLogoChange() {
         const reader = new FileReader();
         reader.readAsDataURL(this.logoImage);
         reader.onload = e => {
            this.logoImageAux = e.target.result;
            //console.log(this.logoImageAux);
         };
      },
      onClickDownloadLogo() {
         ChallengeDA.getChallengeImageOrLogo(this.challenge.filenameLogo).then(response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", this.challenge.filenameLogo);
            document.body.appendChild(fileLink);
            fileLink.click();
         });
      },
      onClickDownloadImage() {
         ChallengeDA.getChallengeImageOrLogo(this.challenge.filenameImage).then(response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", this.challenge.filenameImage);
            document.body.appendChild(fileLink);
            fileLink.click();
         });
      }
   },
   mounted() {
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then(resp => {
            this.idUEvent = resp.data.payload.idUEvent;
         })
         .catch(err => {
            console.log(err);
         });
      this.index = (this.i - 1) * 2 + this.j;
      console.log("reto n°:", this.index, this.challenge);
      this.logoImage = this.challenge.logoImage;
      this.fileImage = this.challenge.fileImage;
      this.logoImageAux = this.challenge.logoImage;
      this.fileImageAux = this.challenge.fileImage;
      this.editingChallenge.idChallenge = this.challenge.idChallenge;
      this.editingChallenge.name = this.challenge.name;
      this.editingChallenge.description = this.challenge.description;
      this.editingChallenge.fileImage = this.challenge.fileImage;
      this.editingChallenge.logoImage = this.challenge.logoImage;

      this.editingAux.name = this.challenge.name;
      this.editingAux.description = this.challenge.description;
      this.editingAux.fileImage = this.challenge.fileImage;
      this.editingAux.logoImage = this.challenge.logoImage;
   },
   computed: {
      ...mapState(["community"]),
      nameErrors() {
         const errors = [];
         if (!this.$v.editingChallenge.name.$dirty) return errors;
         !this.$v.editingChallenge.name.required && errors.push("Ingresar el nombre del reto");
         return errors;
      },
      descriptionErrors() {
         const errors = [];
         if (!this.$v.editingChallenge.description.$dirty) return errors;
         !this.$v.editingChallenge.description.required && errors.push("Ingresar la descripción del reto");
         return errors;
      }
   }
};
</script>
