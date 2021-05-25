<template>
   <v-container class="pa-0" fluid grid-list-sm>
      <Navbar2></Navbar2>
      <br />
      <br />
      <v-row justify="center" align="center">
         <v-col cols="10">
            <v-card style="min-width: 80vw; min-height: 65vh;">
               <v-row>
                  <v-col cols="2">
                     <ProfileSideBar
                        v-if="otherProfile !== undefined"
                        :otherProfile="otherProfile"
                        :info="payload.profile"
                        :flagOther="flagOther"
                        :profileImgUrl="payload.profileImgUrl"
                        :editProfile="editProfile"
                        @changeEditImgProfile="changeEditImgProfile"
                        @changeImageProfile="changeEditImgProfile"
                     />
                  </v-col>
                  <v-col cols="10">
                     <v-row justify="center">
                        <v-card flat style="min-width: 65vw; max-width: 80vh; ">
                           <v-tabs v-model="tab" :background-color="generalConfig.mainColor" centered dark icons-and-text>
                              <v-tabs-slider></v-tabs-slider>
                              <v-tab href="#tab-1">
                                 Datos Generales
                                 <v-icon>mdi-account</v-icon>
                              </v-tab>
                           </v-tabs>
                           <v-tabs-items v-model="tab">
                              <v-tab-item v-for="i in 9" :key="i" :value="'tab-' + i">
                                 <v-card flat color="white" v-if="i == 1">
                                    <v-card-title
                                       class="headline"
                                       :style="{
                                          backgroundColor: generalConfig.mainColor + ' !important'
                                       }"
                                    >
                                       <v-row justify="start">
                                          <v-btn
                                             v-if="otherProfile != 'yes'"
                                             icon
                                             small
                                             color="blue lighten-5"
                                             @click="editCard('general', cards.editGeneral)"
                                          >
                                             <v-icon v-if="cards.editGeneral" x-large>mdi-square-edit-outline </v-icon>
                                             <v-icon v-else x-large>mdi-content-save</v-icon>
                                          </v-btn>
                                       </v-row>
                                    </v-card-title>
                                    <ProfileMain :edit="cards.editGeneral" :info="editPayload.profile" />
                                    <v-divider></v-divider>
                                    <br />
                                    <v-row align="end" justify="end">
                                       <v-btn color="primary" class="mx-3" large @click="$router.go(-1)">
                                          Cancelar
                                       </v-btn>
                                    </v-row>
                                    <br />
                                 </v-card>
                              </v-tab-item>
                           </v-tabs-items>
                        </v-card>
                     </v-row>
                  </v-col>
               </v-row>
            </v-card>
         </v-col>
      </v-row>
      <br />
      <br />
      <br />
      <Footer></Footer>
   </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import * as userDA from "../dataAccess/user.js";
import Navbar2 from "@/components/Navbar2";
import Footer from "../components/Footer.vue";
import ProfileMain from "../components/profile/ProfileMain.vue";
import ProfileSideBar from "../components/profile/ProfileSideBar.vue";
import Swal from "sweetalert2";

export default {
   name: "Profile",
   components: {
      Navbar2,
      Footer,
      ProfileMain,
      ProfileSideBar
   },
   data: () => ({
      tab: null,
      /********************** EDIT - JSON ***********************/
      editPayload: {
         communityToken: "",
         userId: 0,
         profileImage: "",
         profile: {
            name: "",
            lastName: "",
            genre: "",
            birthdate: "", //formato del date es aaaa-mm-dd --<  birthdate: "Date",
            email: "",
            phone: "",
            documentType: "",
            document: "",
            country: null,
            city: null,
            aboutMe: ""
         },
         work: {
            visible: true,
            works: []
         },
         academicDetail: {
            visible: true,
            academicDetailInfos: []
         },
         voluntaryWork: {
            visible: true,
            voluntaryWorkInfos: []
         },
         teaching: {
            visible: true,
            teachingInfos: []
         },
         achievement: {
            visible: true,
            achievementInfos: []
         },
         language: {
            visible: true,
            languageInfos: []
         },
         location: {
            visible: true,
            latitude: 0,
            longitude: 0
         },
         market: {
            visible: true,
            company: "",
            legalRepresentant: "",
            ruc: "",
            phone: "",
            businessName: "",
            country: "",
            city: "",
            district: "",
            address: "",
            acceptEULA: "",
            seller: false,
            sellerString: ""
         }
      },

      /********************** START - JSON ***********************/
      payload: {
         communityToken: "",
         userId: 0,
         profileImgUrl: "",
         profileImage: "",
         profile: {
            name: "",
            lastName: "",
            genre: "",
            birthdate: "", //formato del date es aaaa-mm-dd --<  birthdate: "Date",
            email: "",
            phone: "",
            documentType: "",
            document: "",
            country: null,
            city: null,
            aboutMe: ""
         }
      },
      /********************** END - JSON ***********************/
      cards: {
         editGeneral: true,
         editWork: true,
         editAcademic: true,
         editVoluntary: true,
         editTeaching: true,
         editAchievement: true,
         editLanguage: true,
         editLocation: true,
         editMarket: true
      },
      menusTeaching: [],
      dataUser: {
         key: process.env.VUE_APP_API_KEY_COMMUNITY,
         id: ""
      },
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      flagOther: false,
      editProfile: true,
      otherProfile: null
   }),
   methods: {
      /************************************** MÉTODOS **************************************************************/
      ...mapGetters("user", ["getUser"]),
      changeImageProfile(value) {
         this.payload.profileImgUrl = value;
      },
      changeEditImgProfile(value) {
         this.editProfile = value;
      },
      saveAll() {
         userDA
            .ProfileUpdate(this.payload)
            .then(res => {
               console.log(res);
            })
            .catch(function(error) {
               console.log(error);
            });
      },
      editCard(text, editBool) {
         if (this.otherProfile == "yes") return;
         var cardNumber = -1; //-1 means  saveAll mb
         if (text == "general") {
            if (!editBool) {
               //EMAIL
               if (this.editPayload.profile.email.trim() != "") {
                  if (
                     this.editPayload.profile.email.match(
                        /^[0-9a-zA-ZñÑ]+([.-]?[0-9a-zA-ZñÑ]+)*@[0-9a-zA-ZñÑ]+([.-]?[0-9a-zA-ZñÑ]+)*(\.[0-9a-zA-ZñÑ]{2,3})+$/
                     ) == null
                  ) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese un correo electrónico válido</p>'
                     });
                     return;
                  }
               }

               //DOCUMENT TYPE
               if (this.editPayload.profile.documentType != "") {
                  if (this.editPayload.profile.document == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el documento de identificación para el tipo de documento elegido</p>'
                     });
                     return;
                  }
               }

               //NAME VALIDATIONS /^(\D*?)+$/
               if (this.editPayload.profile.name.trim() != "") {
                  if (this.editPayload.profile.name.match(/^(\D*?)+$/) == null) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese nombres válidos</p>'
                     });
                     return;
                  }
               }

               //NAME VALIDATIONS /^(\D*?)+$/
               if (this.editPayload.profile.lastName.trim() != "") {
                  if (this.editPayload.profile.lastName.match(/^(\D*?)+$/) == null) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese apellidos válidos</p>'
                     });
                     return;
                  }
               }
               this.cards.editGeneral = !this.cards.editGeneral;
               cardNumber = 0; //FOR GENERAL
            } else {
               this.cards.editGeneral = !this.cards.editGeneral;
            }
         } else return;

         if (!editBool) {
            userDA
               .ProfileUpdate(this.payload, this.editPayload, cardNumber)
               .then(res => {
                  console.log(res);
                  if (cardNumber == 0) {
                     localStorage.removeItem("userName");
                     localStorage.removeItem("userLastName");
                     localStorage.setItem("userName", this.payload.profile.name);
                     localStorage.setItem("userLastName", this.payload.profile.lastName);
                  }
               })
               .catch(function(error) {
                  console.log(error);
               });
         }
      }
   },
   created() {
      //Getting data Profile Structure
      let user = this.getUser();
      let otherUser = localStorage.getItem("profileId");
      let url = window.location.href;
      let lastPos = url.lastIndexOf("/");
      this.otherProfile = url.slice(lastPos + 1, 100);
      console.log(this.otherProfile);
      if (this.otherProfile == "yes") {
         //other profile
         this.dataUser.id = otherUser;
      } else {
         //my profile
         this.dataUser.id = user.data.id;
      }
      userDA
         .ProfileStructure(this.dataUser)
         .then(async res => {
            if (res.data.status == "OK") {
               console.log(res.data);
               // Set token & set image profile *********************************************************
               this.payload.communityToken = res.data.payload.communityToken;
               this.payload.userId = res.data.payload.userId;
               this.payload.profileImgUrl = res.data.payload.profileImage;
               // Set Profile ***************************************************************************
               if (res.data.payload.profile != null) {
                  //setting PAYLOAD and editPAYLOAD
                  this.payload.profile.name = res.data.payload.profile.name;
                  this.editPayload.profile.name = res.data.payload.profile.name;

                  this.payload.profile.lastName = res.data.payload.profile.lastName;
                  this.editPayload.profile.lastName = res.data.payload.profile.lastName;

                  let birthdate = res.data.payload.profile.birthdate != undefined ? res.data.payload.profile.birthdate : "";

                  this.payload.profile.birthdate = birthdate;
                  this.editPayload.profile.birthdate = birthdate;

                  this.payload.profileImage = res.data.payload.profileImage;
                  this.editPayload.profileImage = res.data.payload.profileImage;

                  this.payload.profile.email = res.data.payload.profile.email;
                  this.editPayload.profile.email = res.data.payload.profile.email;

                  this.payload.profile.phone = res.data.payload.profile.phone;
                  this.editPayload.profile.phone = res.data.payload.profile.phone;

                  let genre = res.data.payload.profile.genre != undefined ? res.data.payload.profile.genre : "";
                  this.payload.profile.genre = genre;
                  this.editPayload.profile.genre = genre;

                  let documentType = res.data.payload.profile.documentType != undefined ? res.data.payload.profile.documentType : "";
                  this.payload.profile.documentType = documentType;
                  this.editPayload.profile.documentType = documentType;

                  let document = res.data.payload.profile.document != undefined ? res.data.payload.profile.document : "";
                  this.payload.profile.document = document;
                  this.editPayload.profile.document = document;

                  let country = res.data.payload.profile.country != undefined ? res.data.payload.profile.country : "";
                  this.payload.profile.country = country;
                  this.editPayload.profile.country = country;

                  let city = res.data.payload.profile.city != undefined ? res.data.payload.profile.city : "";
                  this.payload.profile.city = city;
                  this.editPayload.profile.city = city;

                  this.payload.profile.aboutMe = res.data.payload.profile.aboutMe;
                  this.editPayload.profile.aboutMe = res.data.payload.profile.aboutMe;
               }
            } else {
               console.log("Error al recibir la estructura del perfil.");
            }
         })
         .catch(function(error) {
            console.log(error.response);
         });
   },
   computed: {
      ...mapState(["profile", "generalConfig"])
   }
};
</script>

<style scoped>
.v-card {
   border-top-left-radius: 0;
   border-top-right-radius: 0;
}

.v-card__title {
   color: white !important;
}
</style>
