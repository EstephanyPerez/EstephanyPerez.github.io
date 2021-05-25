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
                     backgroundColor: generalConfig.secondaryColor + ' !important'
                  }"
               >
                  <div class="pa-md-10 mx-lg-auto" width="5px">
                     <label class="font-weight-bold">Cambiar contraseña</label>
                     <p>
                        Ingresa la nueva contraseña para su usuario.
                     </p>

                     <v-row style="margin-bottom: 0px">
                        <v-col style="padding-bottom: 0px">
                           <v-text-field label="Correo" readonly filled disabled style="padding-bottom: 0px" v-model="data.email"></v-text-field>
                        </v-col>
                     </v-row>

                     <v-row class="pa-1">
                        <v-col>
                           <v-text-field
                              label="Contraseña Actual"
                              placeholder="Contraseña"
                              v-model="data.password"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show1 ? 'text' : 'password'"
                              @click:append="show1 = !show1"
                              :rules="rules.curPwRules"
                           ></v-text-field>
                        </v-col>
                     </v-row>

                     <v-row class="pa-1">
                        <v-col>
                           <v-text-field
                              label="Nueva contraseña"
                              placeholder="Contraseña"
                              v-model="data.newPassword"
                              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show2 ? 'text' : 'password'"
                              @click:append="show2 = !show2"
                              :rules="rules.pwRules"
                           ></v-text-field>
                        </v-col>
                     </v-row>

                     <v-row class="pa-1">
                        <v-col>
                           <v-text-field
                              label="Confirmar nueva contraseña"
                              placeholder="Contraseña"
                              v-model="confirmPassword"
                              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show3 ? 'text' : 'password'"
                              @click:append="show3 = !show3"
                              :rules="rules.confirmPwRules"
                           ></v-text-field>
                        </v-col>
                     </v-row>

                     <v-btn
                        class="login-button white--text"
                        block
                        style="margin-bottom: 20px"
                        elevation="2"
                        @click="returnToPrevious()"
                        :style="{
                           backgroundColor: generalConfig.mainColor + ' !important',
                           color: generalConfig.colorText + ' !important'
                        }"
                     >
                        Regresar
                     </v-btn>

                     <v-btn
                        class="login-button white--text"
                        block
                        elevation="2"
                        @click="registerPassword()"
                        :style="{
                           backgroundColor: generalConfig.mainColor + ' !important',
                           color: generalConfig.colorText + ' !important'
                        }"
                     >
                        Aceptar
                     </v-btn>
                  </div>
               </v-card>
            </v-row>
         </v-col>
      </v-layout>
   </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import * as userDA from "@/dataAccess/user.js";
import Swal from "sweetalert2";

export default {
   data() {
      return {
         show1: false,
         show2: false,
         show3: false,
         rules: {
            curPwRules: [v => !!v || "Contraseña actual es requerida"],
            pwRules: [
               v => !!v || "Nueva contraseña es requerida",
               v => /^(?:[A-Za-z0-9]{8,15})$/.test(v) || "Contraseña debe ser entre 8 y 15 caracteres"
            ],
            confirmPwRules: [v => !!v || "Confirmación de la contraseña es requerida"]
         },
         color: "#1976D2FF",
         mask: "!#XXXXXXXX",
         menu: false,
         theme: "bck-theme",
         data: {
            email: "",
            password: "",
            newPassword: ""
         },
         confirmPassword: ""
      };
   },
   name: "Login",
   methods: {
      ...mapActions(["user/login"]),
      ...mapGetters("user", ["getUser"]),
      registerPassword() {
         if (this.data.newPassword.length > 15) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">La contraseña debe ser de máximo 15 caracteres.</p>'
            });
            return;
         }

         if (8 > this.data.newPassword.length) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">La contraseña debe ser de mínimo 8 caracteres.</p>'
            });
            return;
         }

         if (this.confirmPassword != this.data.newPassword) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Nueva contraseña y su confirmación no son iguales</p>'
            });
            return;
         }
         if (this.data.password == this.data.newPassword) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">La contraseña actual y la nueva contraseña son iguales</p>'
            });
            return;
         }
         userDA
            .ChangePassword(this.data)
            .then(res => {
               console.log(res.data);
               //console.log("Se ha actualizado el password correctamente");
               Swal.fire({
                  icon: "success",
                  html: '<p style="font-family:Roboto;">Contraseña actualizada</p>'
               });

               let url = window.location.href;
               let lastPos = url.lastIndexOf("/");
               var returnAddress = url.slice(lastPos + 1, 100);
               this.$router.push("/" + returnAddress);
            })
            .catch(function(error) {
               console.log(error.response);
               if (error.response.data != undefined && error.response.data.message == "Credenciales incorrectas") {
                  Swal.fire({
                     title: '<p style="font-family:Roboto;">Error</p>',
                     icon: "error",
                     html: '<p style="font-family:Roboto;">La contraseña actual que ha ingresado es incorrecta</p>'
                  });
                  return;
               } else {
                  Swal.fire({
                     title: '<p style="font-family:Roboto;">Error</p>',
                     icon: "error",
                     html: '<p style="font-family:Roboto;">Error con la conexión al servidor</p>'
                  });
               }
            });
      },
      returnToPrevious() {
         let url = window.location.href;
         let lastPos = url.lastIndexOf("/");
         var returnAddress = url.slice(lastPos + 1, 100);

         this.$router.push("/" + returnAddress);
         //this.$router.push("/profile");
      }
   },

   created() {
      let user = this.getUser();
      this.data.email = user.data.email;
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
</style>
