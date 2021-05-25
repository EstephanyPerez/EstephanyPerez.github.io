<template>
   <v-container ma-0 pa-0 fill-height fluid>
      <v-layout
         :style="{
            backgroundColor: generalConfig.secondaryColor + ' !important'
         }"
      >
         <v-col class="d-flex justify-center">
            <v-row align="center" justify="center">
               <!--Login -->
               <v-card
                  class="pa-2 cardColor"
                  elevation="0"
                  tile
                  md="6"
                  :style="{
                     backgroundColor:
                        generalConfig.secondaryColor + ' !important'
                  }"
               >
                  <div class="pa-md-10 mx-lg-auto" width="5px">
                     <label class="font-weight-bold"
                        >Cambio de contraseña</label
                     >
                     <v-card
                        flat
                        tile
                        :style="{
                           backgroundColor:
                              generalConfig.secondaryColor + ' !important'
                        }"
                     >
                        <p>Complete los datos</p>
                     </v-card>
                     <v-dialog
                        v-model="sendingCode"
                        persistent
                        max-width="600"
                        height="200px"
                     >
                        <v-card flat tile>
                           <v-card-title>
                              <label class="font-weight-bold"
                                 >Enviar código de validación
                              </label>
                           </v-card-title>
                           <v-card-text style="padding-bottom: 0px">
                              <v-container>
                                 <v-text-field
                                    label="Correo"
                                    placeholder="ejemplo@wachi.com"
                                    v-model="data.email"
                                 ></v-text-field>
                              </v-container>
                           </v-card-text>
                           <v-card-actions class="d-flex justify-space-around">
                              <v-btn
                                 text
                                 @click="generateCode()"
                                 style="margin-left: 3%"
                                 :style="{
                                    backgroundColor:
                                       generalConfig.mainColor + ' !important',
                                    color:
                                       generalConfig.colorText + ' !important'
                                 }"
                              >
                                 Enviar código
                              </v-btn>
                              <v-btn
                                 text
                                 @click="goBack()"
                                 style="margin-left: 3%"
                                 :style="{
                                    backgroundColor:
                                       generalConfig.mainColor + ' !important',
                                    color:
                                       generalConfig.colorText + ' !important'
                                 }"
                              >
                                 Regresar
                              </v-btn>
                           </v-card-actions>
                        </v-card>
                     </v-dialog>

                     <v-row class="pa-1">
                        <v-col>
                           <v-text-field
                              label="Correo"
                              placeholder="ejemplo@wachi.com"
                              v-model="data.email"
                           ></v-text-field>
                        </v-col>
                     </v-row>
                     <v-row class="pa-1">
                        <v-col>
                           <v-text-field
                              label="Nueva contraseña"
                              placeholder="Contraseña"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show1 ? 'text' : 'password'"
                              :rules="[rules.required]"
                              @click:append="show1 = !show1"
                              v-model="data.newPassword"
                           ></v-text-field>
                        </v-col>
                     </v-row>

                     <v-row class="pa-1">
                        <v-col>
                           <v-text-field
                              label="Confirmar nueva contraseña"
                              placeholder="Confirmar Contraseña"
                              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show2 ? 'text' : 'password'"
                              :rules="[rules.required]"
                              @click:append="show2 = !show2"
                              v-model="confirmPassword"
                           ></v-text-field>
                        </v-col>
                     </v-row>

                     <v-row class="pa-1">
                        <v-col>
                           <v-text-field
                              label="Código de validación"
                              placeholder="Código de validación"
                              v-model="data.code"
                           ></v-text-field>
                        </v-col>
                     </v-row>

                     <v-btn
                        class="login-button white--text"
                        block
                        elevation="2"
                        @click="changePassword()"
                        :style="{
                           backgroundColor:
                              generalConfig.mainColor + ' !important',
                           color: generalConfig.colorText + ' !important'
                        }"
                     >
                        Cambiar contraseña
                     </v-btn>
                  </div>
               </v-card>
            </v-row>
         </v-col>
      </v-layout>
   </v-container>
</template>

<script>
import { mapState } from "vuex";
import * as userDA from "../dataAccess/user.js";
import Swal from "sweetalert2";
export default {
   data() {
      return {
         sendingCode: true,
         show1: false,
         show2: false,
         rules: {
            required: value => !!value || "Required.",
            emailMatch: () => "The email and password you entered don't match"
         },
         color: "#1976D2FF",
         menu: false,
         theme: "bck-theme",
         data: {
            email: "",
            code: null,
            newPassword: null
         },
         confirmPassword: null
      };
   },
   name: "Forgot_Password",
   methods: {
      changePassword() {
         if (this.data.email == null || this.data.email.trim() == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese su correo</p>' //CHECK THE STANDARIZATION OF THINGSS
            });
         } else if (
            this.data.email.match(
               /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            ) == null
         ) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">Ingrese un correo válido</p>' //CHECK THE STANDARIZATION OF THINGSS
            });
         } else if (
            this.data.newPassword == null ||
            this.data.newPassword == ""
         ) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese una contraseña</p>' //CHECK THE STANDARIZATION OF THINGSS
            });
         } else if (
            this.confirmPassword == null ||
            this.confirmPassword == ""
         ) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Confirme su contraseña</p>' //CHECK THE STANDARIZATION OF THINGSS
            });
         } else if (this.confirmPassword != this.data.newPassword) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">No coinciden las contraseñas ingresadas</p>' //CHECK THE STANDARIZATION OF THINGSS
            });
         } else if (this.data.code == null || this.data.code == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html:
                  '<p style="font-family:Roboto;">Ingrese un código de validación</p>' //CHECK THE STANDARIZATION OF THINGSS
            });
         } else {
            userDA
               .ChangeForgottenPassword(this.data)
               .then(res => {
                  console.log(res.data);
                  console.log("Se ha actualizado el password correctamente");
                  Swal.fire({
                     icon: "success",
                     html:
                        '<p style="font-family:Roboto;">Contraseña actualizada</p>'
                  });
                  this.$router.push("/login");
               })
               .catch(function(error) {
                  console.log(error);
                  Swal.fire({
                     title: '<p style="font-family:Roboto;">Error</p>',
                     icon: "error",
                     html:
                        '<p style="font-family:Roboto;">No se pudo cambiar la contraseña</p>' //CHECK THE STANDARIZATION OF THINGSS
                  });
               });
         }
      },
      generateCode() {
         userDA
            .GenerateCode(this.data.email)
            .then(res => {
               console.log(res.data);
               console.log("Se ha enviado el código correctamente");
               Swal.fire({
                  icon: "success",
                  html: '<p style="font-family:Roboto;">Código enviado</p>'
               });
               this.sendingCode = false;
            })
            .catch(function(error) {
               console.log(error);
               Swal.fire({
                  icon: "error",
                  html: '<p style="font-family:Roboto;">Correo inválido</p>'
               });
            });
      },
      goBack() {
         this.$router.push("/login");
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
   background-color: rgba(255, 255, 255, 1) !important;
   border-color: white !important;
}
.bck-theme {
   background: #2f4e9d;
}
</style>
