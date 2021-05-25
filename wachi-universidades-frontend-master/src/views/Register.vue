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
               <v-img :src="generalConfig.loginImage" height="100vh"></v-img>
            </v-col>

            <!--Register -->
            <v-col cols="6" style="padding-left: 6%; padding-right: 6%" class="hidden-md-and-down">
               <v-card
                  class="cardColor"
                  elevation="0"
                  tile
                  :style="{
                     backgroundColor: generalConfig.secondaryColor + ' !important'
                  }"
               >
                  <v-row class="pa-md-4 mt-1 d-flex justify-space-around mb-6">
                     <google-signin-btn label="Google" customClass="my-button" @click="googleCheckSingIn"></google-signin-btn>
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
                           backgroundColor: generalConfig.mainColor + ' !important',
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
                           backgroundColor: generalConfig.mainColor + ' !important',
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
                        backgroundColor: generalConfig.secondaryColor + ' !important'
                     }"
                  >
                     <div class="mt-4 d-flex justify-space-between">
                        <a href="/login" class="text-decoration-none">¿Ya tienes una cuenta? Iniciar sesión</a>
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
import * as homepageDA from "@/dataAccess/home-page.js";
import * as communityDA from "../dataAccess/editCommunity";
import Swal from "sweetalert2";

export default {
   name: "Register",
   data() {
      return {
         maxLength: 200,
         show1: false,
         rules: {
            emailRules: [
               v => !!v || "Correo es requerido",
               v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || "Correo debe ser válido"
            ],
            nameRules: [v => !!v || "Nombre es requerido", v => /^(\D*?)+$/.test(v) || "Nombre debe ser válido"],
            fnameRules: [v => !!v || "Primer Apellido es requerido", v => /^(\D*?)+$/.test(v) || "Primer Apellido debe ser válido"],
            snameRules: [v => !!v || "Segundo Apellido es requerido", v => /^(\D*?)+$/.test(v) || "Segundo Apellido debe ser válido"],
            pwRules: [v => !!v || "Contraseña es requerida", v => /^(?:[A-Za-z0-9]{8,15})$/.test(v) || "Contraseña debe ser entre 8 y 15 caracteres"]
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
      ...mapActions(["user/login", "completeComponentsConfigurationToUpdate"]),
      googleCheckSingIn() {
         if (this.statusCommunity && this.statusPayment) {
            this.googleSignIn();
         } else {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "warning",
               html: '<p style="font-family:Roboto;">Por el momento no se puede registrar. Comuníquese con el administrador.</p>'
            });
         }
      },
      googleSignIn() {
         this.$gapi.currentUser().then(user => {
            if (user) {
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
                                 title: '<p style="font-family:Roboto;">Usuario Creado</p>',
                                 icon: "success",
                                 html: '<p style="font-family:Roboto;">Usuario creado de manera correcta.</p>'
                              });
                              console.log("USUARIO REGISTRADO");
                              this.$router.push("/login");
                           } else {
                              console.log("ALERTA!! - ERROR");
                              Swal.fire({
                                 title: '<p style="font-family:Roboto;">Error</p>',
                                 icon: "error",
                                 html: '<p style="font-family:Roboto;">Error con la creación del usuario.</p>' //CHECK THE STANDARIZATION OF THINGSS
                              });
                           }
                        })
                        .catch(function(error) {
                           console.log(error);
                           Swal.fire({
                              icon: "warning",
                              html: '<p style="font-family:Roboto;">Usuario ya registrado en la comunidad</p>'
                           });
                        });
                     this.$gapi.signOut().then(() => {
                        console.log("User disconnected.");
                     });
                     this.$router.push("/login");
                  })
                  .catch(function(error) {
                     console.log(error);
                     //console.error("Not signed in: %s", err.error);
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Error en la creación del usuario</p>' //CHECK THE STANDARIZATION OF THINGSS
                     });
                  });
            }
         });
      },
      registerNormal() {
         //console.log(this.data.email + " - " + this.data.password);
         this.data.lastName = this.firstlastName + " " + this.secondLastName;
         this.data.privilege = "generico";
         if (this.firstlastName != null) console.log(this.firstlastName.trim());
         if (this.data.name == null || this.data.name.trim() == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese los nombres del usuario</p>'
            });
         } else if (this.data.name.match(/^(\D*?)+$/) == null) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese nombres válidos</p>'
            });
         } else if (this.firstlastName == null || this.firstlastName.trim() == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese el primer apellido del usuario</p>'
            });
         } else if (this.firstlastName.match(/^(\D*?)+$/) == null) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese un primer apellido válido</p>'
            });
         } else if (this.secondLastName == null || this.secondLastName.trim() == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese el segundo apellido del usuario</p>'
            });
         } else if (this.secondLastName.match(/^(\D*?)+$/) == null) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese un segundo apellido válido</p>'
            });
         } else if (this.data.email == null || this.data.email.trim() == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese el correo electrónico del usuario</p>'
            });
         } else if (this.data.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) == null) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese un correo electrónico válido</p>'
            });
         } else if (this.data.password.length > 15) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">La contraseña debe ser de máximo 15 caracteres.</p>'
            });
         } else if (8 > this.data.password.length) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">La contraseña debe ser de mínimo 8 caracteres.</p>'
            });
         } else if (this.data.password != this.confirmPassword) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Las contraseñas no son las mismas.</p>'
            });
         } else {
            userDA
               .RegisterUser(this.data)
               .then(res => {
                  if (res.data.status == "CREATED") {
                     //console.log(res.data);
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Usuario Creado</p>',
                        icon: "success",
                        html: '<p style="font-family:Roboto;">Usuario creado de manera correcta.</p>'
                     });
                     console.log("USUARIO REGISTRADO");
                     this.$router.push("/login");
                  } else {
                     console.log("ALERTA!! - ERROR");
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Error con la creación del usuario.</p>' //CHECK THE STANDARIZATION OF THINGSS
                     });
                  }
               })
               .catch(function(error) {
                  console.log(error.response.data);
                  if (error.response.status != null) {
                     if (error.response.status == 409) {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html: '<p style="font-family:Roboto;">Ya existe un usuario con ese correo electrónico.</p>' //CHECK THE STANDARIZATION OF THINGSS
                        });
                     } else if (error.response.data.message == "El usuario ya se encuentra registrado en la comunidad") {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html: '<p style="font-family:Roboto;">Ya existe un usuario con ese correo electrónico.</p>' //CHECK THE STANDARIZATION OF THINGSS
                        });
                     } else if (error.response.status == 404) {
                        console.log("ERROR CON COMUNIDAD Y PRIVILEGIOS");

                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html: '<p style="font-family:Roboto;">Error 404: Contacte el administrador.</p>' //CHECK THE STANDARIZATION OF THINGSS
                        });

                        /*
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html:
                              '<p style="font-family:Roboto;">Problema con la existencia de la comunidad o privilegios. Contacte el administrador.</p>' //CHECK THE STANDARIZATION OF THINGSS
                        });*/
                     } else {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html: '<p style="font-family:Roboto;">Ocurrió un problema. Por favor, inténtalo de nuevo.</p>' //CHECK THE STANDARIZATION OF THINGSS
                        });
                     }
                  } else {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Error con la conexión al servidor.</p>' //CHECK THE STANDARIZATION OF THINGSS
                     });
                  }
               });
         }
      },
      myRegisterUser() {
         this.data.lastName = this.firstlastName + " " + this.secondLastName;
         this.data.privilege = "generico";
         console.log("usuario", this.data);
         userDA
            .univRegisterUser(this.data)
            .then(() => {
               Swal.fire("Registro exitoso", "El usuario fue registrado correctamente", "success");
               this.$router.push("/login");
            })
            .catch(reason => {
               Swal.fire("Error", reason.response.data.message, "error");
            });
      },

      configurateHomepage() {
         homepageDA
            .obtainHomepageConfiguration() //entering the idCommunity
            .then(res => {
               if (res.data.status == "OK") {
                  this.completeComponentsConfigurationToUpdate(res.data.payload);
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
               html: '<p style="font-family:Roboto;">Por el momento no se puede registrar. Comuníquese con el administrador.</p>'
            });
         }
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

.or-separator {
   margin: 20px 0 10px;
   text-align: center;
   border-top: 1px solid #ccc;
}
.or-separator i {
   padding: 0 10px;
   background: #fff;
   position: relative;
   top: -11px;
   z-index: 1;
}
</style>
