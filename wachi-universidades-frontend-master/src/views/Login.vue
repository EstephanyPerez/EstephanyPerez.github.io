<template>
   <v-container ma-0 pa-0 fill-height fluid>
      <v-layout
         :style="{
            backgroundColor: generalConfig.secondaryColor + ' !important',
         }"
      >
         <v-row no-gutters align="center" justify="center">
            <!--Background picture and Text -->
            <v-col md="6" class="hidden-md-and-down pa-0 ma-0">
               <!--Background picture and Text -->
               <v-img :src="generalConfig.loginImage" height="100%" max-height="100vh"></v-img>
            </v-col>

            <!--Login -->
            <v-col cols="6" style="padding-left: 6%; padding-right: 6%" class="hidden-md-and-down">
               <v-row justify="center" class="mb-16">
                  <v-img :src="generalConfig.logo" min-width="100" max-width="15vw" max-height="10vh" v-on:click="redirectToHome"></v-img
               ></v-row>
               <v-card
                  class="cardColor"
                  elevation="0"
                  tile
                  :style="{
                     backgroundColor: generalConfig.secondaryColor + ' !important',
                  }"
               >
                  <v-row class="pa-md-4 mt-1 d-flex justify-space-around mb-6">
                     <google-signin-btn label="Google" customClass="my-button" @click="googleCheckSingIn()"></google-signin-btn>
                  </v-row>
                  <v-divider class="pa-md-4 my-6"></v-divider>
                  <!--label>Correo</label-->
                  <v-text-field
                     label="Correo electrónico"
                     placeholder="Correo electrónico"
                     v-model="email"
                     :rules="rules.emailRules"
                     :disabled="!statusPayment"
                  ></v-text-field>
                  <!--label>Contraseña</label-->
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

                  <v-row class="py-3">
                     <v-btn
                        class="login-button white--text"
                        block
                        elevation="2"
                        @click="loginRoles()"
                        :style="{
                           backgroundColor: generalConfig.mainColor + ' !important',
                           color: generalConfig.colorText + ' !important',
                        }"
                        :disabled="!statusPayment"
                     >
                        Iniciar Sesión
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
                        }"
                        :disabled="!statusPayment"
                     >
                        Ingresar con 2Flock
                     </v-btn>
                  </v-row>

                  <v-card
                     class="d-flex justify-space-between mb-6"
                     flat
                     tile
                     :style="{
                        backgroundColor: generalConfig.secondaryColor + ' !important',
                     }"
                  >
                     <div class="mt-4 d-flex justify-space-between">
                        <a href="/register" class="text-decoration-none">Registrarte</a>
                     </div>
                     <div class="mt-4 d-flex justify-space-between">
                        <a href="/forgot-password" class="text-decoration-none">¿Olvidaste tu contraseña?</a>
                     </div>
                  </v-card>
               </v-card>
            </v-col>
            <v-col cols="6" class="hidden-lg-and-up">
               <v-row justify="center" class="mb-16">
                  <v-img :src="generalConfig.logo" min-width="100" max-width="15vw" max-height="10vh" v-on:click="redirectToHome"></v-img
               ></v-row>
               <v-card
                  class="cardColor"
                  elevation="0"
                  tile
                  :style="{
                     backgroundColor: generalConfig.secondaryColor + ' !important',
                  }"
               >
                  <v-row class="pa-md-4 mt-1 d-flex justify-space-around mb-6">
                     <google-signin-btn label="Google" customClass="my-button" @click="googleCheckSingIn()"></google-signin-btn>
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

                  <v-row class="py-3">
                     <v-btn
                        class="login-button white--text"
                        block
                        elevation="2"
                        @click="loginNormal()"
                        :style="{
                           backgroundColor: generalConfig.mainColor + ' !important',
                           color: generalConfig.colorText + ' !important',
                           width: '200px',
                        }"
                        :disabled="!statusPayment"
                     >
                        Iniciar Sesión
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
                           width: '200px',
                        }"
                        :disabled="!statusPayment"
                     >
                        Ingresar con 2Flock
                     </v-btn>
                  </v-row>

                  <v-card
                     class="d-flex justify-space-between mb-6"
                     flat
                     tile
                     :style="{
                        backgroundColor: generalConfig.secondaryColor + ' !important',
                     }"
                  >
                     <div class="mt-4 d-flex justify-space-between">
                        <a href="/register" class="text-decoration-none">Registrarte</a>
                     </div>
                     <div class="mt-4 d-flex justify-space-between">
                        <a href="/forgot-password" class="text-decoration-none">¿Olvidaste tu contraseña?</a>
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
import * as EventDA from "@/dataAccess/eventDA.js";
import * as homepageDA from "@/dataAccess/home-page.js";
import * as communityDA from "@/dataAccess/editCommunity.js";
import Swal from "sweetalert2";
import privileges from "@/util/privilegeConst";

export default {
   name: "Login",
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
            id: "",
         },
         statusPayment: false,

         rules: {
            emailRules: [
               (v) => !!v || "Correo es requerido",
               (v) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || "Correo debe ser válido",
            ],
            nameRules: [(v) => !!v || "Nombre es requerido", (v) => /^(\D*?)+$/.test(v) || "Nombre debe ser válido"],
            fnameRules: [(v) => !!v || "Primer Apellido es requerido", (v) => /^(\D*?)+$/.test(v) || "Primer Apellido debe ser válido"],
            snameRules: [(v) => !!v || "Segundo Apellido es requerido", (v) => /^(\D*?)+$/.test(v) || "Segundo Apellido debe ser válido"],
            required: (value) => !!value || "Requerido.",
         },
      };
   },
   created() {
      this.configurateHomepage();
      this.checkSubscription();
   },
   methods: {
      ...mapActions(["completeComponentsConfigurationToUpdate"]),
      ...mapActions("login", ["addLoginData"]),
      ...mapGetters("user", ["getUser"]),
      ...mapActions("user", ["logIn"]),
      redirectToHome() {
         this.$router.push("/home-logged");
      },
      googleCheckSingIn() {
         if (this.statusPayment) {
            this.googleSignIn();
         } else {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "warning",
               html: '<p style="font-family:Roboto;">No puede iniciar sesión por el momento. Contáctese con el administrador de la comunidad.</p>',
            });
         }
      },
      googleSignIn() {
         this.$gapi.currentUser().then((user) => {
            if (user) {
               this.$gapi.signOut().then(() => {
                  console.log("User disconnected.");
               });
            } else {
               this.$gapi
                  .signIn()
                  .then((user) => {
                     this.email = user.email;
                     this.password = user.id;
                     userDA
                        .Login2(this.email, this.password, this.idUEvent)
                        .then((res) => {
                           let login = res.data.payload;
                           // console.log("RESPUESTA LOGIN: ", res.data.payload);
                           login.password = this.password;

                           this.addLoginData(login);
                           const privilegeOfUser = res.data.payload.privilege;
                           userDA
                              .ProfileStructure(login)
                              .then((res) => {
                                 if (res.data.status == "OK") {
                                    localStorage.setItem("userName", res.data.payload.profile.name);
                                    localStorage.setItem("userLastName", res.data.payload.profile.lastName);
                                    if (res.data.payload.profileImage != null) {
                                       localStorage.setItem("avatarURL", res.data.payload.profileImage);
                                    } else {
                                       userDA
                                          .UpdateImage(
                                             login.id,
                                             "https://assets-2flock.s3.amazonaws.com/ec84b565-011c-4ad8-a1c1-403c1b6eac5c/1606695642121.png"
                                          )
                                          .then((res) => {
                                             console.log(res);
                                          });
                                       localStorage.setItem(
                                          "avatarURL",
                                          "https://assets-2flock.s3.amazonaws.com/ec84b565-011c-4ad8-a1c1-403c1b6eac5c/1606695642121.png"
                                       );
                                    }
                                 } else {
                                    Swal.fire({
                                       title: '<p style="font-family:Roboto;">Error</p>',
                                       icon: "error",
                                       html: '<p style="font-family:Roboto;">Error con la creación de perfil</p>',
                                    });
                                 }
                              })
                              .catch(function () {
                                 Swal.fire({
                                    title: '<p style="font-family:Roboto;">Error</p>',
                                    icon: "error",
                                    html: '<p style="font-family:Roboto;">Error con la creación de perfil</p>',
                                 });
                              });
                           if (privilegeOfUser.localeCompare(privileges.GENERIC_PRIVILEGE) === 0) this.$router.push("/apply");
                           else if (privilegeOfUser.localeCompare(privileges.PARTICIPANT_PRIVILEGE) === 0) {
                              this.logIn(res.data.payload);
                              this.$router.push("/homeParticipantLogged");
                           } else {
                              this.logIn(res.data.payload);
                              this.$router.push("/home-logged");
                           }
                        })
                        .catch(function () {
                           Swal.fire("Error", "Usuario y/o contraseña incorrecto", "error");
                        });
                  })
                  .catch((err) => {
                     //console.log(err);
                     console.error("Not signed in: %s", err.error);
                  });
            }
         });
      },
      loginNormal() {
         console.log(this.email + " - " + this.password);
         if (this.email == null || this.email.trim() == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese su correo</p>', //CHECK THE STANDARIZATION OF THINGSS
            });
         } else if (this.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) == null) {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese un correo válido</p>', //CHECK THE STANDARIZATION OF THINGSS
            });
         } else if (this.password == null || this.password == "") {
            Swal.fire({
               title: '<p style="font-family:Roboto;">Error</p>',
               icon: "error",
               html: '<p style="font-family:Roboto;">Ingrese una contraseña</p>', //CHECK THE STANDARIZATION OF THINGSS
            });
         } else {
            userDA
               .Login(this.email, this.password)
               .then((res) => {
                  if (res.data.status == "OK") {
                     console.log("USUARIO");
                     console.log(res.data.payload);
                     this.logIn(res.data.payload);

                     let user = this.getUser();
                     this.dataUser.id = user.data.id;

                     userDA
                        .ProfileStructure(this.dataUser)
                        .then((res) => {
                           if (res.data.status == "OK") {
                              localStorage.setItem("userName", res.data.payload.profile.name);
                              localStorage.setItem("userLastName", res.data.payload.profile.lastName);
                              if (res.data.payload.profileImage != null) {
                                 localStorage.setItem("avatarURL", res.data.payload.profileImage);
                              } else {
                                 userDA
                                    .UpdateImage(
                                       user.data.id,
                                       "https://assets-2flock.s3.amazonaws.com/ec84b565-011c-4ad8-a1c1-403c1b6eac5c/1606695642121.png"
                                    )
                                    .then((res) => {
                                       console.log(res);
                                    });
                                 localStorage.setItem(
                                    "avatarURL",
                                    "https://assets-2flock.s3.amazonaws.com/ec84b565-011c-4ad8-a1c1-403c1b6eac5c/1606695642121.png"
                                 );
                              }
                              this.$router.push("/home-logged");
                           } else {
                              Swal.fire({
                                 title: '<p style="font-family:Roboto;">Error</p>',
                                 icon: "error",
                                 html: '<p style="font-family:Roboto;">Error con la creación de perfil</p>',
                              });
                           }
                        })
                        .catch(function () {
                           Swal.fire({
                              title: '<p style="font-family:Roboto;">Error</p>',
                              icon: "error",
                              html: '<p style="font-family:Roboto;">Error con la creación de perfil</p>',
                           });
                        });
                  } else {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Usuario y/o contraseña incorrectos</p>',
                     });
                  }
               })
               .catch(function () {
                  Swal.fire({
                     title: '<p style="font-family:Roboto;">Error</p>',
                     icon: "error",
                     html: '<p style="font-family:Roboto;">Error al iniciar sesión</p>',
                  });
               });
         }
      },
      configurateHomepage() {
         homepageDA
            .obtainHomepageConfiguration()
            .then(async (res) => {
               if (res.data.status === "OK") {
                  await this.completeComponentsConfigurationToUpdate(res.data.payload);
               }
            })
            .catch(function () {
               console.log("error en lista configuracion comunidad");
            });
      },
      checkSubscription() {
         communityDA
            .GetSubscription()
            .then((res) => {
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
                           '<p style="font-family:Roboto;">No puede iniciar sesión por el momento. Contáctese con el administrador de la comunidad.</p>',
                     });
                  }
               }
            })
            .catch(function (error) {
               console.log("Login error: " + error);
            });
      },
      loginRoles() {
         userDA
            .Login2(this.email, this.password, this.idUEvent)
            .then((res) => {
               let login = res.data.payload;
               console.log("RESPUESTA LOGIN: ", res.data.payload);
               login.password = this.password;

               this.addLoginData(login);
               const privilegeOfUser = res.data.payload.privilege;

               userDA
                  .ProfileStructure(login)
                  .then((res) => {
                     if (res.data.status == "OK") {
                        localStorage.setItem("userName", res.data.payload.profile.name);
                        localStorage.setItem("userLastName", res.data.payload.profile.lastName);
                        if (res.data.payload.profileImage != null) {
                           localStorage.setItem("avatarURL", res.data.payload.profileImage);
                        } else {
                           userDA
                              .UpdateImage(login.id, "https://assets-2flock.s3.amazonaws.com/ec84b565-011c-4ad8-a1c1-403c1b6eac5c/1606695642121.png")
                              .then((res) => {
                                 console.log(res);
                              });
                           localStorage.setItem(
                              "avatarURL",
                              "https://assets-2flock.s3.amazonaws.com/ec84b565-011c-4ad8-a1c1-403c1b6eac5c/1606695642121.png"
                           );
                        }
                     } else {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html: '<p style="font-family:Roboto;">Error con la creación de perfil</p>',
                        });
                     }
                  })
                  .catch(function () {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Error con la creación de perfil</p>',
                     });
                  });

               if (privilegeOfUser.localeCompare(privileges.GENERIC_PRIVILEGE) === 0) this.$router.push("/apply");
               else if (privilegeOfUser.localeCompare(privileges.PARTICIPANT_PRIVILEGE) === 0) {
                  this.logIn(res.data.payload);
                  this.$router.push("/homeParticipantLogged");
               } else if (privilegeOfUser.localeCompare(privileges.ADMINISTRATOR) === 0) {
                  this.logIn(res.data.payload);
                  this.$router.push("/");
               } else if (
                  privilegeOfUser.localeCompare(privileges.MENTOR_PRIVILEGE) === 0 ||
                  privilegeOfUser.localeCompare(privileges.CAMPUS_COORDINATOR_PRIVILEGE) === 0 ||
                  privilegeOfUser.localeCompare(privileges.GENERAL_COORDINATOR_PRIVILEGE) === 0
               ) {
                  this.logIn(res.data.payload);
                  this.$router.push("/home-logged");
               }
            })
            .catch(function () {
               Swal.fire("Error", "Usuario y/o contraseña incorrecto", "error");
            });
      },
   },
   mounted() {
      console.log("ESTOY ACTUALIZADO-------------------------------------------------------");
      EventDA.getActiveUEvent(process.env.VUE_APP_API_KEY_COMMUNITY)
         .then((resp) => {
            this.idUEvent = resp.data.payload.idUEvent;
         })
         .catch((err) => {
            console.log(err.response);
         });
   },
   computed: {
      ...mapState(["idUser", "loggedUser", "generalConfig", "community"]),
   },
};
</script>

<style scoped>
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
.v-text-field {
   font-size: 1.25rem;
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
