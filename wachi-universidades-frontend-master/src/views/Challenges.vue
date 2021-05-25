<template>
   <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <loading :active.sync="loadingUpload" :can-cancel="false" :is-full-page="false" :color="color"></loading>
      <v-row>
         <v-col cols="2"> </v-col>
         <v-col cols="10">
            <v-row>
               <v-col cols="12"></v-col>
               <v-col cols="12"></v-col>
               <v-col cols="12">
                  <v-row>
                     <v-col cols="9">
                        <v-container>
                           <h1>GESTIÓN DE RETOS</h1>
                        </v-container>
                     </v-col>
                     <v-col cols="3" align="center">
                        <v-dialog v-model="dialogNewChallenge" persistent max-width="600px">
                           <template v-slot:activator="{ on, attrs }">
                              <div v-bind="attrs" v-on="on">
                                 <v-btn class="mx-2" fab dark :color="color">
                                    <v-icon> mdi-plus </v-icon>
                                 </v-btn>
                                 <span>Nuevo Reto</span>
                              </div>
                           </template>
                           <v-card>
                              <v-card-title>
                                 <span class="headline">Nuevo Reto</span>
                              </v-card-title>
                              <v-card-text>
                                 <v-form>
                                    <v-container>
                                       <v-row>
                                          <v-col cols="12">
                                             <v-text-field
                                                :maxlength="maxLength"
                                                label="Nombre *"
                                                outlined
                                                :color="color"
                                                v-model="newChallenge.name"
                                                :error-messages="nameErrors"
                                                @input="$v.newChallenge.name.$touch()"
                                                @blur="$v.newChallenge.name.$touch()"
                                             ></v-text-field>
                                          </v-col>
                                          <v-col cols="12">
                                             <v-textarea
                                                :maxlength="maxLength"
                                                label="Descripción*"
                                                outlined
                                                :color="color"
                                                v-model="newChallenge.description"
                                                :error-messages="descriptionErrors"
                                                @input="$v.newChallenge.description.$touch()"
                                                @blur="$v.newChallenge.description.$touch()"
                                             ></v-textarea>
                                          </v-col>
                                          <v-col cols="12">
                                             <v-file-input
                                                outlined
                                                prepend-icon="mdi-camera"
                                                label="Subir logo del reto"
                                                :color="color"
                                                accept="image/png, image/jpeg, image/bmp"
                                                v-model="logoImage"
                                                @change="onLogoChange"
                                             ></v-file-input>
                                          </v-col>
                                          <v-col cols="12">
                                             <v-file-input
                                                outlined
                                                prepend-icon="mdi-camera"
                                                label="Subir imagen del reto"
                                                :color="color"
                                                accept="image/png, image/jpeg, image/bmp"
                                                v-model="fileImage"
                                                @change="onFileChange"
                                             ></v-file-input>
                                          </v-col>
                                       </v-row>
                                    </v-container>
                                 </v-form>
                              </v-card-text>
                              <v-card-actions>
                                 <v-row>
                                    <v-col cols="2"></v-col>
                                    <v-col cols="2">
                                       <v-btn :color="color" @click="dialogNewChallenge = false" dark rounded x-large> Cancelar </v-btn>
                                    </v-col>
                                    <v-col cols="3"></v-col>
                                    <v-col cols="2">
                                       <v-btn :color="color" @click="addChallenge()" dark rounded x-large> Aceptar </v-btn>
                                    </v-col>
                                 </v-row>
                              </v-card-actions>
                           </v-card>
                        </v-dialog>
                     </v-col>
                     <v-col cols="12" class="pointer">
                        <v-carousel hide-delimiters height="auto" class="carousel" v-if="challenges !== null">
                           <v-carousel-item v-for="i in numPages" :key="i" class="carousel-item">
                              <v-row>
                                 <v-col v-for="j in 3" :key="j">
                                    <ChallengeCard
                                       :i="i"
                                       :j="j"
                                       :numPages="numPages"
                                       :numChallenges="numChallenges"
                                       :challenge="challengesOriginal[(i - 1) * 3 + j - 1]"
                                       :challenges="challenges"
                                       v-on:delete-challenge="deleteThisRow()"
                                    />
                                 </v-col>
                              </v-row>
                           </v-carousel-item>
                        </v-carousel>
                     </v-col>
                  </v-row>
               </v-col>
            </v-row>
         </v-col>
      </v-row>
   </div>
</template>

<style scoped src="../styles/Challenges.css"></style>
<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import ChallengeCard from "@/components/ChallengeCard.vue";
import { mapState, mapActions } from "vuex";
import * as ChallengeDA from "@/dataAccess/challengesDA.js";
import * as EventDA from "@/dataAccess/eventDA.js";
import { required, maxLength } from "vuelidate/lib/validators";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
   name: "Challenges",
   components: {
      Sidebar: Sidebar,
      ChallengeCard: ChallengeCard,
      Navbar,
      Loading,
   },
   data() {
      return {
         color: "FFFF",
         loadingUpload: false,
         maxLength: 200,
         numChallenges: "",
         numPages: "",
         challenges: [],
         challengesOriginal: [],
         newChallenge: {
            name: "",
            description: "",
            fileImage: null,
            logoImage: null,
         },
         dialogNewChallenge: false,
         challengesPost: [],
         currentEvent: null,
         fileImage: null,
         fileImageAux: null,
         logoImage: null,
      };
   },
   validations() {
      return {
         newChallenge: {
            name: {
               required,
               maxLength: maxLength(250),
            },
            description: {
               required,
               maxLength: maxLength(500),
            },
         },
      };
   },
   computed: {
      ...mapState(["community", "style"]),
      nameErrors() {
         const errors = [];
         if (!this.$v.newChallenge.name.$dirty) return errors;
         !this.$v.newChallenge.name.required && errors.push("Ingresar el nombre del reto");
         return errors;
      },
      descriptionErrors() {
         const errors = [];
         if (!this.$v.newChallenge.description.$dirty) return errors;
         !this.$v.newChallenge.description.required && errors.push("Ingresar la descripción del reto");
         return errors;
      },
   },
   methods: {
      ...mapActions({ saveChallenges: "challenges/saveChallenges" }),
      ...mapActions({ dropChallenges: "challenges/dropChallenges" }),
      ...mapActions({ addChallenge: "challenges/addChallenge" }),
      deleteThisRow: function () {
         console.log("Eliminando reto");
         this.challengesOriginal = [];
         EventDA.getActiveUEvent(this.community.community.idCommunity)
            .then((resp) => {
               this.currentEvent = resp.data.payload;
               //console.log(this.currentEvent);
               if (this.currentEvent != null) {
                  ChallengeDA.getChallenges(this.currentEvent.idUEvent)
                     .then((response) => {
                        console.log("servicio de listado", response.data);
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
                              dialogEdit: false,
                           });
                        }
                        this.numChallenges = this.challengesOriginal.length; //sets the number of comunities received
                        this.numPages = Math.ceil(this.numChallenges / 3); //sets the number of pages rendered (10 or less cards per page)
                     })
                     .catch((err) => {
                        console.log("no se encontraron retos", err.response.data);
                     });
               }
            })
            .catch((err) => {
               console.log("ocurrió un error al obtener un evento", err.response.data);
            });
      },
      addChallenge() {
         this.newChallenge.fileImage = this.fileImageAux;
         this.newChallenge.logoImage = this.logoImageAux;
         let body = {
            name: this.newChallenge.name,
            description: this.newChallenge.description,
         };
         this.$v.newChallenge.$touch();
         this.loadingUpload = true;
         if (!this.$v.newChallenge.$invalid) {
            ChallengeDA.registerChallenge(this.currentEvent.idUEvent, body)
               .then((respond) => {
                  this.loadingUpload = false;
                  console.log(respond.data);
                  this.$swal.fire("Reto Creado", "Se ha creado un nuevo reto con éxito", "success");
                  let challengeAux = respond.data.payload;
                  if (this.newChallenge.logoImage) {
                     ChallengeDA.registerLogo(challengeAux.idChallenge, this.logoImage)
                        .then((respond1) => {
                           console.log("Respuesta logo : ", respond1.data.payload);
                        })
                        .catch((err) => {
                           console.log(err.response.data);
                           console.log("Hubo un error al registrar la imagen del reto con id: ", challengeAux.idChallenge);
                        });
                  }
                  if (this.newChallenge.fileImage) {
                     console.log("Si hay imagen");
                     ChallengeDA.registerImage(challengeAux.idChallenge, this.fileImage)
                        .then((respond2) => {
                           console.log(respond2.data);
                           console.log("Éxito en el registro del logo del reto con id: ", challengeAux.idChallenge);
                        })
                        .catch((err) => {
                           console.log(err.response.data);
                           console.log("Hubo un error al registrar la imagen del reto con id: ", challengeAux.idChallenge);
                        });
                  }
                  console.log("retos nuevos: ", this.challengesOriginal);
                  this.newChallenge.name = "";
                  this.newChallenge.description = "";
                  this.newChallenge.fileImage = null;
                  this.newChallenge.logoImage = null;
                  this.dialogNewChallenge = false;
                  this.fileImage = null;
                  this.fileImageAux = null;
                  this.logoImage = null;
                  this.logoImageAux = null;

                  this.challengesOriginal = [];

                  if (this.currentEvent != null) {
                     ChallengeDA.getChallenges(this.currentEvent.idUEvent)
                        .then((response3) => {
                           console.log("servicio de listado", response3.data);
                           this.challenges = response3.data.payload;
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
                                 dialogEdit: false,
                              });
                           }
                           this.numChallenges = this.challengesOriginal.length; //sets the number of comunities received
                           this.numPages = Math.ceil(this.numChallenges / 3); //sets the number of pages rendered (10 or less cards per page)
                        })
                        .catch((err) => {
                           console.log("no se encontraron retos", err.response.data);
                        });
                  }
               })
               .catch((err) => {
                  this.loadingUpload = false;
                  console.log("Ocurrio un error: ", err.response.data);
               });
         }
      },
      onFileChange() {
         const reader = new FileReader();
         reader.readAsDataURL(this.fileImage);
         reader.onload = (e) => {
            this.fileImageAux = e.target.result;
            //console.log(this.fileImageAux);
         };
      },
      onLogoChange() {
         const reader = new FileReader();
         reader.readAsDataURL(this.logoImage);
         reader.onload = (e) => {
            this.logoImageAux = e.target.result;
            //console.log(this.logoImageAux);
         };
      },
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then((resp) => {
            this.currentEvent = resp.data.payload;
            //console.log(this.currentEvent);
            if (this.currentEvent !== null) {
               ChallengeDA.getChallenges(this.currentEvent.idUEvent)
                  .then((response) => {
                     //console.log("servicio de listado",response.data);
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
                           dialogEdit: false,
                        });
                     }
                     this.numChallenges = this.challengesOriginal.length; //sets the number of comunities received
                     console.log(this.numChallenges);
                     this.numPages = Math.ceil(this.numChallenges / 3); //sets the number of pages rendered (10 or less cards per page)
                  })
                  .catch((err) => {
                     console.log("no se encontraron retos", err.response.data);
                  });
            }
         })
         .catch((err) => {
            console.log("ocurrió un error al obtener un evento", err.response.data);
         });
   },
};
</script>
