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
               <!--Background picture and Text -->
               <v-img
                  :src="generalConfig.loginImage"
                  max-width="100vw"
                  height="100vh"
               ></v-img>
            </v-col>
            <!--Login -->
            <v-col cols="6" style="padding: 6%">
               <v-row justify="center" class="mb-16">
                  <v-img
                     :src="generalConfig.logo"
                     min-width="100"
                     max-width="15vw"
                     max-height="10vh"
                     v-on:click="redirectToHome"
                  ></v-img
               ></v-row>
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
                  </v-row>
                  <v-divider class="pa-md-4 my-6"></v-divider>
                  <!--label>Correo</label-->
                  <v-row class="pa-1">
                     <v-text-field
                        label="Correo electrónico"
                        placeholder="Correo electrónico"
                        v-model="email"
                        :rules="rules.emailRules"
                        :disabled="!statusPayment"
                     ></v-text-field>
                  </v-row>
                  <!--label>Contraseña</label-->
                  <v-row class="pa-1">
                     <v-text-field
                        label="Contraseña"
                        placeholder="Contraseña"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        :rules="[rules.required]"
                        @click:append="show1 = !show1"
                        v-model="password"
                        :disabled="!statusPayment"
                     ></v-text-field>
                  </v-row>
                  <v-row class="py-3" justify="center">
                     <v-btn
                        class="login-button white--text"
                        block
                        elevation="2"
                        @click="register2Flock()"
                        :style="{
                           backgroundColor:
                              generalConfig.mainColor + ' !important',
                           color: generalConfig.colorText + ' !important'
                        }"
                        :disabled="!statusPayment"
                     >
                        Registrarte con 2Flock
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
                        <a href="/register" class="text-decoration-none"
                           >Registrarte</a
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
import { mapActions, mapState, mapGetters } from "vuex";
import * as userDA from "../dataAccess/user.js";
import * as homepageDA from "@/dataAccess/home-page.js";
import * as communityDA from "@/dataAccess/editCommunity.js";
import Swal from "sweetalert2";

export default {
   name: "Login2Flock",
   data() {
      return {
         show1: false,
         color: "#1976D2FF",
         mask: "!#XXXXXXXX",
         menu: false,
         theme: "bck-theme",
         email: null,
         password: null,
         communityToken: "",
         dataUser: {
            key: process.env.VUE_APP_API_KEY_COMMUNITY, //366a7fe6-6245-440e-a8c2-eb9f97224f54, ec84b565-011c-4ad8-a1c1-403c1b6eac5c
            id: ""
         },
         statusPayment: false,

         rules: {
            emailRules: [
               v => !!v || "Correo es requerido",
               v =>
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                     v
                  ) || "Correo debe ser válido"
            ],
            nameRules: [
               v => !!v || "Nombre es requerido",
               v => /^(\D*?)+$/.test(v) || "Nombre debe ser válido"
            ],
            fnameRules: [
               v => !!v || "Primer Apellido es requerido",
               v => /^(\D*?)+$/.test(v) || "Primer Apellido debe ser válido"
            ],
            snameRules: [
               v => !!v || "Segundo Apellido es requerido",
               v => /^(\D*?)+$/.test(v) || "Segundo Apellido debe ser válido"
            ],
            required: value => !!value || "Requerido."
         }
      };
   },
   components: {},
   created() {
      this.configurateHomepage();
      this.checkSubscription();
   },
   mounted() {
      this.configurateHomepage();
   },
   methods: {
      ...mapActions("user", ["logIn"]),
      ...mapGetters("user", ["getUser"]),
      ...mapActions(["completeComponentsConfigurationToUpdate"]),
      redirectToHome() {
         this.$router.push("/home-logged");
      },
      register2Flock() {
         console.log(this.email + " - " + this.password);
         if (this.email == null || this.email.trim() == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese su correo</p>' //CHECK THE STANDARIZATION OF THINGSS
            });
         } else if (
            this.email.match(
               /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            ) == null
         ) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">Ingrese un correo válido</p>' //CHECK THE STANDARIZATION OF THINGSS
            });
         } else if (this.password == null || this.password == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese una contraseña</p>' //CHECK THE STANDARIZATION OF THINGSS
            });
         } else {
            console.log("Se envia a 2flock");
            console.log(this.email, this.password);
            let dataRegister2Flock = { email: null, password: null };
            dataRegister2Flock.email = this.email;
            dataRegister2Flock.password = this.password;
            userDA
               .RegisterUser2Flock(dataRegister2Flock)
               .then(res => {
                  if (res.data.status == "OK") {
                     console.log("USUARIO");
                     console.log(res.data.payload);
                     Swal.fire({
                        title:
                           '<p style="font-family:Roboto;">Usuario creado</p>',
                        icon: "success",
                        html:
                           '<p style="font-family:Roboto;">Usuario creado correctamente!</p>'
                     });
                     this.$router.push("/login");
                  }
               })
               .catch(error => {
                  console.log(error.response);
                  let status = error.response.status;
                  console.log(status);
                  if (status == 424) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html:
                           '<p style="font-family:Roboto;">Esta cuenta ya se encuentra registrada en la comunidad.</p>'
                     });
                  } /*if (status == 401) */ else {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html:
                           '<p style="font-family:Roboto;">Usuario y/o contraseña incorrectos.</p>'
                     });
                  }
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
                  //console.log(this.communityType);
                  //this.completeNavbarOptions(this.communityType);
               }
            })
            .catch(function() {
               console.log("error en lista configuracion comunidad");
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
                  if (!this.statusPayment) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "warning",
                        html:
                           '<p style="font-family:Roboto;">No puede iniciar sesión por el momento. Contáctese con el administrador de la comunidad.</p>'
                     });
                  }
               }
            })
            .catch(function(error) {
               console.log("Login error: " + error);
            });
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
   padding: 0px;
}
.html {
   overflow-y: auto;
}
</style>
