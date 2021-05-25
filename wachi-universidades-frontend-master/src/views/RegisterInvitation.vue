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
               <v-img :src="generalConfig.loginImage" height="100vh" max-width="100vw"></v-img>
            </v-col>
            <v-col cols="6" style="padding: 6%">
               <v-card
                  class="cardColor"
                  elevation="0"
                  tile
                  :style="{
                     backgroundColor: generalConfig.secondaryColor + ' !important'
                  }"
               >
                  <v-text-field
                     label="Correo electrónico"
                     placeholder="Correo electrónico"
                     v-model="data.email"
                     readonly
                     :rules="rules.emailRules"
                     :disabled="!statusPayment"
                  ></v-text-field>
                  <v-text-field
                     label="Contraseña"
                     placeholder="Contraseña"
                     :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                     :type="show1 ? 'text' : 'password'"
                     :rules="[rules.required]"
                     @click:append="show1 = !show1"
                     v-model="data.password"
                     :disabled="!statusPayment"
                  ></v-text-field>
                  <v-text-field
                     label="Confirmar contraseña"
                     placeholder="Confirmar contraseña"
                     :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                     :type="show2 ? 'text' : 'password'"
                     :rules="[rules.required]"
                     @click:append="show2 = !show2"
                     v-model="data.passwordRepeat"
                     :disabled="!statusPayment"
                  ></v-text-field>
                  <v-text-field
                     label="Código de activación"
                     placeholder="Código de activación"
                     readonly
                     :rules="[rules.required]"
                     v-model="data.activation_code"
                     :disabled="!statusPayment"
                  ></v-text-field>
                  <v-btn
                     class="login-button white--text"
                     block
                     elevation="2"
                     @click="register()"
                     :style="{
                        backgroundColor: generalConfig.mainColor + ' !important',
                        color: generalConfig.colorText + ' !important'
                     }"
                     :disabled="!statusPayment"
                  >
                     Únete
                  </v-btn>
               </v-card>
            </v-col>
         </v-row>
      </v-layout>
   </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as userDA from "@/dataAccess/user.js";
import * as homepageDA from "@/dataAccess/home-page.js";
import * as communityDA from "@/dataAccess/editCommunity.js";
import Swal from "sweetalert2";

export default {
   name: "RegisterInvitation",
   data() {
      return {
         show1: false,
         show2: false,
         color: "#1976D2FF",
         menu: false,
         data: {
            email: "",
            password: "",
            passwordRepeat: "",
            activation_code: ""
         },
         statusPayment: false,

         rules: {
            emailRules: [
               v => !!v || "Correo es requerido",
               v => /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(v) || "Correo debe ser válido"
            ],
            required: value => !!value || "Requerido."
         }
      };
   },
   created() {
      this.configurateHomepage();
      this.checkSubscription();
   },
   mounted() {
      this.configurateHomepage();
      this.setParameters();
   },
   methods: {
      ...mapActions(["completeComponentsConfigurationToUpdate"]),
      register() {
         if (this.data.email == null || this.data.email.trim() == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese su correo</p>' //CHECK THE STANDARIZATION OF THINGSS
            });
         } else if (
            this.data.email.match(/^[0-9a-zA-ZñÑ]+([.-]?[0-9a-zA-ZñÑ]+)*@[0-9a-zA-ZñÑ]+([.-]?[0-9a-zA-ZñÑ]+)*(\.[0-9a-zA-ZñÑ]{2,3})+$/) == null
         ) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese un correo válido</p>'
            });
         } else if (this.data.password == null || this.data.password == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese su contraseña</p>'
            });
         } else if (this.data.passwordRepeat == null || this.data.passwordRepeat == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Confirme su contraseña</p>'
            });
         } else if (this.data.password != this.data.passwordRepeat) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Las contraseñas no son las mismas.</p>'
            });
         } else {
            userDA
               .RegisterInvited(this.data)
               .then(res => {
                  if (res.data.status == "CREATED") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Usuario Registrado</p>',
                        icon: "success",
                        html: '<p style="font-family:Roboto;">Usuario registrado de manera correcta.</p>'
                     });
                     this.$router.push("/login");
                     this.data.email = "";
                     this.data.password = "";
                     this.data.passwordRepeat = "";
                     this.data.activation_code = "";
                  } else {
                     console.log("ALERTA!! - ERROR");
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Error con el registro del usuario.</p>'
                     });
                  }
               })
               .catch(err => {
                  Swal.fire({
                     icon: "error",
                     title: '<p style="font-family:Roboto;">Error</p>',
                     html:
                        '<p style="font-family:Roboto;">' + err.response.status === 500 ? err.response.data.error : err.response.data.message + "</p>"
                  });
               });
         }
      },
      configurateHomepage() {
         homepageDA
            .obtainHomepageConfiguration()
            .then(res => {
               console.log("blueprint: ");
               console.log(res.data);
               if (res.data.status == "OK") {
                  console.log("Se obtuvo configuracion");
                  this.completeComponentsConfigurationToUpdate(res.data.payload);
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
      },
      setParameters() {
         let info = window.location.href.split("?")[1].split("&");
         this.data.email = info[0].split("=")[1];
         this.data.email = decodeURIComponent(this.data.email);
         this.data.activation_code = info[1].split("=")[1];
         this.data.activation_code = decodeURIComponent(this.data.activation_code);
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
