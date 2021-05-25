<template>
   <v-container ma-0 pa-0 fill-height fluid>
      <v-layout
         :style="{
            backgroundColor: generalConfig.secondaryColor + ' !important'
         }"
      >
         <v-row no-gutters align="center" justify="center">
            <!--Background picture and Text -->
            <v-col md="6" class="hidden-md-and-down pa-0 ma-0">
               <v-img
                  :src="generalConfig.loginImage"
                  max-width="100vw"
                  height="100vh"
               ></v-img>
            </v-col>

            <!--Register -->
            <v-col
               cols="6"
               style="padding-left: 6%; padding-right: 6%; max-height: 100vh"
               class="hidden-md-and-down"
            >
               <v-card
                  class="cardColor"
                  elevation="0"
                  tile
                  :style="{
                     backgroundColor:
                        generalConfig.secondaryColor + ' !important'
                  }"
               >
                  <v-row class="pa-md-4 mt-1 d-flex justify-space-around mb-6">
                     <google-signin-btn
                        label="Google"
                        customClass="my-button"
                        @click="googleCheckSingIn"
                     ></google-signin-btn>
                  </v-row>
                  <v-divider class="pa-md-4 my-6"></v-divider>

                  <v-row class="pa-1">
                     <v-text-field
                        label="Nombres"
                        placeholder="Nombres"
                        v-model="data.name"
                        :rules="rules.nameRules"
                        :disabled="!statusCommunity || !statusPayment"
                     ></v-text-field>
                  </v-row>

                  <v-row class="pa-1">
                     <v-text-field
                        label="Apellido paterno"
                        placeholder="Apellido paterno"
                        v-model="firstlastName"
                        :rules="rules.fnameRules"
                        :disabled="!statusCommunity || !statusPayment"
                     ></v-text-field>
                     <v-col cols="1"></v-col>
                     <v-text-field
                        label="Apellido materno"
                        placeholder="Apellido materno"
                        v-model="secondLastName"
                        :rules="rules.snameRules"
                        :disabled="!statusCommunity || !statusPayment"
                     ></v-text-field>
                  </v-row>

                  <v-row class="pa-1">
                     <v-text-field
                        label="Correo electrónico"
                        placeholder="Correo electrónico"
                        v-model="data.email"
                        :rules="rules.emailRules"
                        :disabled="!statusCommunity || !statusPayment"
                     ></v-text-field>
                  </v-row>

                  <v-row class="pa-1">
                     <v-text-field
                        label="Contraseña"
                        placeholder="Contraseña"
                        type="password"
                        v-model="data.password"
                        :rules="rules.pwRules"
                        :disabled="!statusCommunity || !statusPayment"
                     ></v-text-field>
                     <v-col cols="1"></v-col>
                     <v-text-field
                        label="Confirmar contraseña"
                        placeholder="Confirmar contraseña"
                        type="password"
                        v-model="confirmPassword"
                        :disabled="!statusCommunity || !statusPayment"
                     ></v-text-field>
                  </v-row>

                  <v-row class="py-3">
                     <v-btn
                        class="login-button white--text"
                        block
                        elevation="2"
                        @click="registerNormal()"
                        :style="{
                           backgroundColor:
                              generalConfig.mainColor + ' !important',
                           color: generalConfig.colorText + ' !important',
                           width: '200px'
                        }"
                        :disabled="!statusCommunity || !statusPayment"
                     >
                        Crear cuenta
                     </v-btn>
                  </v-row>
                  <v-row class="py-3">
                     <v-btn
                        class="login-button white--text"
                        block
                        elevation="2"
                        @click="$router.push('/login2flock')"
                        :style="{
                           backgroundColor:
                              generalConfig.mainColor + ' !important',
                           color: generalConfig.colorText + ' !important',
                           width: '200px'
                        }"
                        :disabled="!statusCommunity || !statusPayment"
                     >
                        Registrar con 2Flock
                     </v-btn>
                  </v-row>

                  <v-card
                     class="d-flex justify-space-between mb-6"
                     flat
                     tile
                     :style="{
                        backgroundColor:
                           generalConfig.secondaryColor + ' !important'
                     }"
                  >
                     <div class="mt-4 d-flex justify-space-between">
                        <a href="/login" class="text-decoration-none"
                           >¿Ya tienes una cuenta? Iniciar sesión</a
                        >
                     </div>
                  </v-card>
               </v-card>
            </v-col>
            <!--Mobile -->
            <v-col cols="6" class="hidden-lg-and-up">
               <v-card
                  class="cardColor"
                  elevation="0"
                  tile
                  :style="{
                     backgroundColor:
                        generalConfig.secondaryColor + ' !important'
                  }"
               >
                  <v-row class="pa-md-4 mt-1 d-flex justify-space-around mb-6">
                     <google-signin-btn
                        label="Google"
                        customClass="my-button"
                        @click="googleCheckSingIn"
                     ></google-signin-btn>
                  </v-row>
                  <v-divider class="pa-md-4 my-6"></v-divider>

                  <v-row class="pa-1">
                     <v-text-field
                        label="Nombres"
                        placeholder="Nombres"
                        v-model="data.name"
                        :rules="rules.nameRules"
                        :disabled="!statusCommunity || !statusPayment"
                     ></v-text-field>
                  </v-row>

                  <v-row class="pa-1">
                     <v-text-field
                        label="Apellido paterno"
                        placeholder="Apellido paterno"
                        v-model="firstlastName"
                        :rules="rules.fnameRules"
                        :disabled="!statusCommunity || !statusPayment"
                     ></v-text-field>
                     <v-col cols="1"></v-col>
                     <v-text-field
                        label="Apellido materno"
                        placeholder="Apellido materno"
                        v-model="secondLastName"
                        :rules="rules.snameRules"
                        :disabled="!statusCommunity || !statusPayment"
                     ></v-text-field>
                  </v-row>

                  <v-row class="pa-1">
                     <v-text-field
                        label="Correo electrónico"
                        placeholder="Correo electrónico"
                        v-model="data.email"
                        :rules="rules.emailRules"
                        :disabled="!statusCommunity || !statusPayment"
                     ></v-text-field>
                  </v-row>

                  <v-row class="pa-1">
                     <v-text-field
                        label="Contraseña"
                        placeholder="Contraseña"
                        type="password"
                        v-model="data.password"
                        :rules="rules.pwRules"
                        :disabled="!statusCommunity || !statusPayment"
                     ></v-text-field>
                     <v-col cols="1"></v-col>
                     <v-text-field
                        label="Confirmar contraseña"
                        placeholder="Confirmar contraseña"
                        type="password"
                        v-model="confirmPassword"
                        :disabled="!statusCommunity || !statusPayment"
                     ></v-text-field>
                  </v-row>

                  <v-row class="py-3">
                     <v-btn
                        class="login-button white--text"
                        block
                        elevation="2"
                        @click="registerNormal()"
                        :style="{
                           backgroundColor:
                              generalConfig.mainColor + ' !important',
                           color: generalConfig.colorText + ' !important',
                           width: '200px'
                        }"
                        :disabled="!statusCommunity || !statusPayment"
                     >
                        Crear cuenta
                     </v-btn>
                  </v-row>
                  <v-row class="py-3">
                     <v-btn
                        class="login-button white--text"
                        block
                        elevation="2"
                        @click="$router.push('/login2flock')"
                        :style="{
                           backgroundColor:
                              generalConfig.mainColor + ' !important',
                           color: generalConfig.colorText + ' !important',
                           width: '200px'
                        }"
                        :disabled="!statusCommunity || !statusPayment"
                     >
                        Registrar con 2Flock
                     </v-btn>
                  </v-row>

                  <v-card
                     class="d-flex justify-space-between mb-6"
                     flat
                     tile
                     :style="{
                        backgroundColor:
                           generalConfig.secondaryColor + ' !important'
                     }"
                  >
                     <div class="mt-4 d-flex justify-space-between">
                        <a href="/login" class="text-decoration-none"
                           >¿Ya tienes una cuenta? Iniciar sesión</a
                        >
                     </div>
                  </v-card>
               </v-card>
            </v-col>
         </v-row>
      </v-layout>
   </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as userDA from "../dataAccess/user.js";
import * as communityDA from "../dataAccess/editCommunity";
import * as homepageDA from "@/dataAccess/home-page.js";
import Swal from "sweetalert2";
export default {
   name: "Register",
   data() {
      return {
         show1: false,
         rules: {
            emailRules: [
               v => !!v || "Correo es requerido",
               v =>
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                     v
                  ) || "Correo debe ser válido",
               v =>
                  v.length <= 30 || "Cantidad de caracteres debe ser menor a 30"
            ],
            nameRules: [
               v => !!v || "Nombre es requerido",
               v => /^[a-zA-Z -]+$/.test(v) || "Nombre debe ser válido",
               v =>
                  v.length <= 30 || "Cantidad de caracteres debe ser menor a 30"
            ],
            fnameRules: [
               v => !!v || "Primer Apellido es requerido",
               v =>
                  /^[a-zA-Z -]+$/.test(v) || "Primer Apellido debe ser válido",
               v =>
                  v.length <= 30 || "Cantidad de caracteres debe ser menor a 30"
            ],
            snameRules: [
               v => !!v || "Segundo Apellido es requerido",
               v =>
                  /^[a-zA-Z -]+$/.test(v) || "Segundo Apellido debe ser válido",
               v =>
                  v.length <= 30 || "Cantidad de caracteres debe ser menor a 30"
            ],
            pwRules: [
               v => !!v || "Contraseña es requerida",
               v =>
                  /^(?:[A-Za-z0-9]{8,15})$/.test(v) ||
                  "Contraseña debe ser entre 8 y 15 caracteres"
            ]
         },
         color: "#1976D2FF",
         mask: "!#XXXXXXXX",
         menu: false,
         theme: "bck-theme",
         firstlastName: null,
         secondLastName: null,
         data: {
            email: "",
            name: "",
            lastName: "",
            password: "",
            privilege: "generico",
            communityToken: null
         },
         confirmPassword: null,
         statusCommunity: false,
         statusPayment: false
      };
   },
   created() {
      this.configurateHomepage();
   },
   mounted() {
      this.configurateHomepage();
      this.communityStatus();
   },
   methods: {
      ...mapActions(["completeComponentsConfigurationToUpdate"]),
      ...mapActions(["user/login"]),
      googleCheckSingIn() {
         if (this.statusCommunity && this.statusPayment) {
            this.googleSignIn();
         } else {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "warning",
               html:
                  '<p style="font-family:Roboto;">Por el momento no se puede registrar. Comuníquese con el administrador.</p>'
            });
         }
      },
      googleSignIn() {
         this.$gapi.currentUser().then(user => {
            if (user) {
               /*
               Swal.fire({
                  title: '<p style="font-family:Roboto;">Error</p>',
                  icon: "error",
                  html:
                     '<p style="font-family:Roboto;">Usuario ya ha iniciado sesión</p>'
               });
               this.$router.push("/homepage");
               */
               this.$gapi.signOut().then(() => {
                  console.log("User disconnected.");
               });
            } else {
               this.$gapi
                  .signIn()
                  .then(user => {
                     //Check if user is already registered
                     this.data.password = user.id;
                     this.data.email = user.email;
                     this.data.name = user.name;
                     this.data.lastName = user.lastname;
                     console.log(this.data);
                     userDA
                        .RegisterUser(this.data)
                        .then(res => {
                           if (res.data.status == "CREATED") {
                              //console.log(res.data);
                              Swal.fire({
                                 title:
                                    '<p style="font-family:Roboto;">Usuario Creado</p>',
                                 icon: "success",
                                 html:
                                    '<p style="font-family:Roboto;">Usuario creado de manera correcta.</p>'
                              });
                              console.log("USUARIO REGISTRADO");
                              this.$router.push("/login");
                           } else {
                              console.log("ALERTA!! - ERROR");
                              Swal.fire({
                                 title:
                                    '<p style="font-family:Roboto;">Error</p>',
                                 icon: "error",
                                 html:
                                    '<p style="font-family:Roboto;">Error con la creación del usuario.</p>' //CHECK THE STANDARIZATION OF THINGSS
                              });
                              this.data.email = "";
                              this.data.name = "";
                              this.data.lastName = "";
                              this.data.password = "";
                              this.secondLastName = "";
                              this.firstlastName = "";
                              this.confirmPassword = "";
                           }
                        })
                        .catch(function(error) {
                           console.log(error);
                           Swal.fire({
                              icon: "warning",
                              html:
                                 '<p style="font-family:Roboto;">Usuario ya registrado en la comunidad</p>'
                           });
                           this.data.email = "";
                           this.data.name = "";
                           this.data.lastName = "";
                           this.data.password = "";
                           this.secondLastName = "";
                           this.firstlastName = "";
                           this.confirmPassword = "";
                        });
                     this.$gapi.signOut().then(() => {
                        console.log("User disconnected.");
                     });
                     this.$router.push("/login");
                  })
                  .catch(function(error) {
                     console.log(error);
                     //console.error("Not signed in: %s", err.error);
                  });
            }
         });
      },
      registerNormal() {
         //console.log(this.data.email + " - " + this.data.password);

         this.data.lastName = this.firstlastName + " " + this.secondLastName;
         if (this.firstlastName != null) console.log(this.firstlastName.trim());

         if (this.data.name == null || this.data.name.trim() == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">Ingrese los nombres del usuario</p>'
            });
            this.data.name = "";
            this.data.lastName = "";
            this.secondLastName = "";
            this.firstlastName = "";
         } else if (
            this.data.name.match(/^[a-zA-Z -]+$/) == null ||
            this.data.name.length > 30
         ) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">Ingrese nombres válidos</p>'
            });
            this.data.name = "";
         } else if (
            this.firstlastName == null ||
            this.firstlastName.trim() == ""
         ) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">Ingrese el primer apellido del usuario</p>'
            });
            this.data.lastName = "";
            this.firstlastName = "";
         } else if (
            this.firstlastName.match(/^[a-zA-Z -]+$/) == null ||
            this.firstlastName.length > 30
         ) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">Ingrese un primer apellido válido</p>'
            });

            this.data.lastName = "";

            this.firstlastName = "";
         } else if (
            this.secondLastName == null ||
            this.secondLastName.trim() == ""
         ) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">Ingrese el segundo apellido del usuario</p>'
            });

            this.data.lastName = "";

            this.secondLastName = "";
         } else if (
            this.secondLastName.match(/^[a-zA-Z -]+$/) == null ||
            this.secondLastName.length > 30
         ) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">Ingrese un segundo apellido válido</p>'
            });

            this.data.lastName = "";
            this.secondLastName = "";
         } else if (this.data.email == null || this.data.email.trim() == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">Ingrese el correo electrónico del usuario</p>'
            });
            this.data.email = "";

            this.confirmPassword = "";
         } else if (
            this.data.email.match(
               /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            ) == null ||
            this.data.email.length > 30
         ) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">Ingrese un correo electrónico válido</p>'
            });
            this.data.email = "";
         } else if (this.data.password.length > 15) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">La contraseña debe ser de máximo 15 caracteres.</p>'
            });

            this.data.password = "";

            this.confirmPassword = "";
         } else if (8 > this.data.password.length) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">La contraseña debe ser de mínimo 8 caracteres.</p>'
            });

            this.data.password = "";

            this.confirmPassword = "";
         } else if (this.data.password != this.confirmPassword) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">Las contraseñas no son las mismas.</p>'
            });

            this.data.password = "";

            this.confirmPassword = "";
         } else {
            userDA
               .RegisterUser(this.data)
               .then(res => {
                  if (res.data.status == "CREATED") {
                     //console.log(res.data);
                     Swal.fire({
                        title:
                           '<p style="font-family:Roboto;">Usuario Creado</p>',
                        icon: "success",
                        html:
                           '<p style="font-family:Roboto;">Usuario creado de manera correcta.</p>'
                     });
                     console.log("USUARIO REGISTRADO");
                     this.$router.push("/login");
                  } else {
                     console.log("ALERTA!! - ERROR");
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html:
                           '<p style="font-family:Roboto;">Error con la creación del usuario.</p>' //CHECK THE STANDARIZATION OF THINGSS
                     });
                     this.data.email = "";
                     this.data.name = "";
                     this.data.lastName = "";
                     this.data.password = "";
                     this.secondLastName = "";
                     this.firstlastName = "";
                  }
               })
               .catch(function(error) {
                  console.log(error.response.data.message);
                  if (error.response.status != null) {
                     if (error.response.status == 409) {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html:
                              '<p style="font-family:Roboto;">Ya existe un usuario con ese correo electrónico.</p>' //CHECK THE STANDARIZATION OF THINGSS
                        });
                     } else if (error.response.status == 404) {
                        console.log("ERROR CON COMUNIDAD Y PRIVILEGIOS");

                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html:
                              '<p style="font-family:Roboto;">Error 404: Contacte el administrador.</p>' //CHECK THE STANDARIZATION OF THINGSS
                        });

                        /*
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html:
                              '<p style="font-family:Roboto;">Problema con la existencia de la comunidad o privilegios. Contacte el administrador.</p>' //CHECK THE STANDARIZATION OF THINGSS
                        });*/
                     }
                  } else {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html:
                           '<p style="font-family:Roboto;">Error con la conexión al servidor.</p>' //CHECK THE STANDARIZATION OF THINGSS
                     });
                  }
                  this.data.email = "";
                  this.data.name = "";
                  this.data.lastName = "";
                  this.data.password = "";
                  this.secondLastName = "";
                  this.firstlastName = "";
               });
         }
      },
      configurateHomepage() {
         homepageDA
            .obtainHomepageConfiguration() //entering the idCommunity
            .then(res => {
               console.log("blueprint: ");
               console.log(res.data);
               //console.log(res.data.status);
               //console.log("blueprint: " + res.data.payload.loginImage);
               if (res.data.status == "OK") {
                  console.log("Se obtuvo configuracion");
                  this.completeComponentsConfigurationToUpdate(
                     res.data.payload
                  );
               }
            })
            .catch(function() {
               console.log("error en lista configuracion comunidad");
            });
      },
      communityStatus() {
         communityDA
            .GetDataCommunity()
            .then(res => {
               if (res.data.status == "OK") {
                  console.log("Se obtuvo el estado");
                  let maxUsers = res.data.payload.maxUsers;
                  let curUsers = res.data.payload.currentUsers;
                  if (curUsers >= maxUsers) {
                     this.statusCommunity = false;
                  } else {
                     this.statusCommunity = true;
                  }
                  this.checkSubscription();
               }
            })
            .catch(function(error) {
               console.log("Login error: " + error);
            });
      },
      checkSubscription() {
         communityDA
            .GetSubscription()
            .then(res => {
               console.log(res);
               if (res.data.status.localeCompare("OK") == 0) {
                  let status = res.data.payload.status;
                  console.log(status);
                  if (status.localeCompare("ACTIVE") == 0) {
                     this.statusPayment = true;
                  } else {
                     this.statusPayment = false;
                  }
                  this.showMessageValidation();
               }
            })
            .catch(function(error) {
               console.log("Login error: " + error);
            });
      },
      showMessageValidation() {
         console.log("statusPayment: " + this.statusPayment);
         console.log("statusCommunity: " + this.statusCommunity);
         if (!this.statusCommunity || !this.statusPayment) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "warning",
               html:
                  '<p style="font-family:Roboto;">Por el momento no se puede registrar. Comuníquese con el administrador.</p>'
            });
         }
      }
   },
   watch: {
      data: function(newVal) {
         console.log(newVal);
      },
      firstlastName: function(newVal) {
         console.log(newVal);
      },
      secondLastName: function(newVal) {
         console.log(newVal);
      }
   },
   computed: {
      ...mapState(["generalConfig"]),
      swatchStyle() {
         const { color, menu } = this;
         return {
            backgroundColor: color,
            cursor: "pointer",
            height: "30px",
            width: "30px",
            borderRadius: menu ? "50%" : "4px",
            transition: "border-radius 200ms ease-in-out"
         };
      }
   }
};
</script>

<style scoped>
.my-button {
   background-color: #ffffff;
}
.my-button span.text {
   color: black;
}
.v-application {
   background-color: #f8f9fa;
}
.login-button {
   background-color: #2f4e9d !important;
}
.login-button {
   color: #ffffff;
}
h1 {
   color: black;
   font-family: "balboa", sans-serif;
   font-weight: 600;
   margin: 0;
}
.cardColor {
   background-color: rgba(255, 255, 255, 0.5) !important;
   border-color: white !important;
}
.bck-theme {
   background: #2f4e9d;
}
.html {
   overflow-y: auto;
}
</style>
