<template>
   <v-main>
      <v-container class="pa-0" fluid grid-list-sm>
         <Navbar
            v-if="otherProfile != null"
            :otherProfile="otherProfile"
            :profileBool="true"
            :flagOther="flagOther"
            :profileImgUrl="payload.profileImgUrl"
            :editProfile="editProfile"
            :u="editProfile"
            @changeEditImgProfile="changeEditImgProfile"
            @changeImageProfile="changeEditImgProfile"
            ref="navbar"
         >
         </Navbar>
         <v-card :color="generalConfig.secondaryColor" flat style="min-width: 80vw; min-height: 90vh;">
            <v-row>
               <v-col cols="2" class="hidden-md-and-down">
                  <ProfileSideBar
                     v-if="otherProfile != undefined"
                     :otherProfile="otherProfile"
                     :info="payload.profile"
                     :flagOther="flagOther"
                     :profileImgUrl="payload.profileImgUrl"
                     :editProfile="editProfile"
                     @changeEditImgProfile="changeEditImgProfile"
                     @changeImageProfile="changeEditImgProfile"
                  />
               </v-col>
               <v-col cols="10" style="width: fit-content; margin: auto; margin-top: 0px">
                  <!----------------------------------------- CARDS ------------------------------------------------------------->
                  <v-col d-flex style="max-width:100%; padding-top: 0px" child-flex>
                     <v-row justify="center">
                        <v-card style="min-width: 80vw; max-width: 80vh;margin-bottom: 30px; margin-left: 8px; margin-right: 8px; ">
                           <v-tabs ref="tabs" v-model="tab" :background-color="generalConfig.mainColor" centered dark icons-and-text>
                              <v-tabs-slider></v-tabs-slider>
                              <v-tab href="#tab-1">
                                 Datos Generales
                                 <v-icon>mdi-account</v-icon>
                              </v-tab>
                              <v-tab href="#tab-2" v-if="payload.work.visible">
                                 Experiencia Laboral
                                 <v-icon>mdi-book-open-variant</v-icon>
                              </v-tab>
                              <v-tab href="#tab-3" v-if="payload.academicDetail.visible">
                                 Datos Academicos
                                 <v-icon>mdi-school</v-icon>
                              </v-tab>
                              <v-tab href="#tab-4" v-if="payload.voluntaryWork.visible">
                                 Voluntariado
                                 <v-icon>mdi-account-group</v-icon>
                              </v-tab>
                              <v-tab href="#tab-5" v-if="payload.teaching.visible">
                                 Experiencia Docente
                                 <v-icon>mdi-warehouse</v-icon>
                              </v-tab>
                              <v-tab href="#tab-6" v-if="payload.achievement.visible">
                                 Premios y distinciones
                                 <v-icon>mdi-seal</v-icon>
                              </v-tab>
                              <v-tab href="#tab-7" v-if="payload.language.visible">
                                 Idiomas
                                 <v-icon>mdi-earth</v-icon>
                              </v-tab>
                              <v-tab href="#tab-8" v-if="payload.location.visible">
                                 Ubicación
                                 <v-icon>mdi-map-marker</v-icon>
                              </v-tab>
                              <v-tab href="#tab-9" v-if="payload.market.visible">
                                 Market
                                 <v-icon>mdi-cart</v-icon>
                              </v-tab>
                           </v-tabs>
                           <v-tabs-items v-model="tab">
                              <v-tab-item v-for="i in 9" :key="i" :value="'tab-' + i">
                                 <!---------------------------------------- CARD: DATOS GENERALES --------------------------------------------->
                                 <v-card color="white" v-if="i == 1">
                                    <div class="justify-space-between">
                                       <v-card-title
                                          class="headline"
                                          :style="{
                                             backgroundColor: generalConfig.mainColor + ' !important'
                                          }"
                                          >Datos Generales
                                          <v-row justify="end">
                                             <v-btn
                                                v-if="otherProfile != 'yes'"
                                                class="mx-2"
                                                icon
                                                small
                                                color="blue lighten-5"
                                                @click="editCard('general', cards.editGeneral)"
                                             >
                                                <v-icon v-if="cards.editGeneral" x-large>mdi-square-edit-outline</v-icon>
                                                <v-icon v-else x-large>mdi-content-save</v-icon>
                                             </v-btn>
                                          </v-row>
                                       </v-card-title>
                                       <ProfileMain :edit="cards.editGeneral" :info="editPayload.profile" />
                                    </div>
                                 </v-card>

                                 <!---------------------------------------- CARD: Experiencia laboral ------------------------------------------->
                                 <v-card color="white" v-if="i == 2 && payload.work.visible">
                                    <v-card-title
                                       :style="{
                                          backgroundColor: generalConfig.mainColor + ' !important'
                                       }"
                                       >Experiencia Laboral
                                       <v-row justify="end">
                                          <v-btn
                                             v-if="otherProfile != 'yes'"
                                             class="mx-2"
                                             icon
                                             small
                                             color="blue lighten-5"
                                             @click="editCard('work', cards.editWork)"
                                          >
                                             <v-icon v-if="cards.editWork" x-large>mdi-square-edit-outline</v-icon>
                                             <v-icon v-else x-large>mdi-content-save</v-icon>
                                          </v-btn>
                                       </v-row>
                                    </v-card-title>
                                    <ProfileWork
                                       :edit="cards.editWork"
                                       :info="editPayload.work.works"
                                       :deleteItem="clickDelete"
                                       :otherProfile="otherProfile"
                                    />
                                    <v-card-actions v-if="!cards.editWork">
                                       <v-spacer></v-spacer>
                                       <v-btn
                                          :style="{
                                             backgroundColor: generalConfig.mainColor + ' !important',
                                             color: 'white !important'
                                          }"
                                          fab
                                          small
                                          @click="clickAdd('work')"
                                       >
                                          <v-icon>mdi-plus</v-icon>
                                       </v-btn>
                                       <v-spacer></v-spacer>
                                    </v-card-actions>
                                 </v-card>
                                 <!---------------------------------------- CARD: Datos académicos --------------------------------------------------->
                                 <v-card color="white" v-if="i == 3 && payload.academicDetail.visible">
                                    <v-card-title
                                       :style="{
                                          backgroundColor: generalConfig.mainColor + ' !important'
                                       }"
                                       >Datos Academicos
                                       <v-row justify="end">
                                          <v-btn
                                             v-if="otherProfile != 'yes'"
                                             class="mx-2"
                                             icon
                                             small
                                             color="blue lighten-5"
                                             @click="editCard('academic', cards.editAcademic)"
                                          >
                                             <v-icon v-if="cards.editAcademic" x-large>mdi-square-edit-outline</v-icon>
                                             <v-icon v-else x-large>mdi-content-save</v-icon>
                                          </v-btn>
                                       </v-row>
                                    </v-card-title>
                                    <ProfileAcademicDetail
                                       :edit="cards.editAcademic"
                                       :info="editPayload.academicDetail.academicDetailInfos"
                                       :deleteItem="clickDelete"
                                       :otherProfile="otherProfile"
                                    />
                                    <v-card-actions v-if="!cards.editAcademic">
                                       <v-spacer></v-spacer>
                                       <v-btn
                                          :style="{
                                             backgroundColor: generalConfig.mainColor + ' !important',
                                             color: 'white !important'
                                          }"
                                          fab
                                          small
                                          @click="clickAdd('academicDetail')"
                                       >
                                          <v-icon>mdi-plus</v-icon>
                                       </v-btn>
                                       <v-spacer></v-spacer>
                                    </v-card-actions>
                                 </v-card>
                                 <!---------------------------------------- CARD: Voluntariado ----------------------------------------------------------->
                                 <v-card color="white" v-if="i == 4 && payload.voluntaryWork.visible">
                                    <v-card-title
                                       :style="{
                                          backgroundColor: generalConfig.mainColor + ' !important'
                                       }"
                                       >Voluntariado
                                       <v-row justify="end">
                                          <v-btn
                                             v-if="otherProfile != 'yes'"
                                             class="mx-2"
                                             icon
                                             small
                                             color="blue lighten-5"
                                             @click="editCard('voluntary', cards.editVoluntary)"
                                          >
                                             <v-icon v-if="cards.editVoluntary" x-large>mdi-square-edit-outline</v-icon>
                                             <v-icon v-else x-large>mdi-content-save</v-icon>
                                          </v-btn>
                                       </v-row>
                                    </v-card-title>
                                    <ProfileVoluntaryWork
                                       :edit="cards.editVoluntary"
                                       :info="editPayload.voluntaryWork.voluntaryWorkInfos"
                                       :deleteItem="clickDelete"
                                       :otherProfile="otherProfile"
                                    />
                                    <v-card-actions v-if="!cards.editVoluntary">
                                       <v-spacer></v-spacer>
                                       <v-btn
                                          :style="{
                                             backgroundColor: generalConfig.mainColor + ' !important',
                                             color: 'white !important'
                                          }"
                                          fab
                                          small
                                          @click="clickAdd('voluntaryWork')"
                                       >
                                          <v-icon>mdi-plus</v-icon>
                                       </v-btn>
                                       <v-spacer></v-spacer>
                                    </v-card-actions>
                                 </v-card>
                                 <!---------------------------------------- CARD: Experiencia Docente ------------------------------------------------------>
                                 <v-card color="white" v-if="i == 5 && payload.teaching.visible">
                                    <v-card-title
                                       :style="{
                                          backgroundColor: generalConfig.mainColor + ' !important'
                                       }"
                                       >Experiencia Docente
                                       <v-row justify="end">
                                          <v-btn
                                             v-if="otherProfile != 'yes'"
                                             class="mx-2"
                                             icon
                                             small
                                             color="blue lighten-5"
                                             @click="editCard('teaching', cards.editTeaching)"
                                          >
                                             <v-icon v-if="cards.editTeaching" x-large>mdi-square-edit-outline</v-icon>
                                             <v-icon v-else x-large>mdi-content-save</v-icon>
                                          </v-btn>
                                       </v-row>
                                    </v-card-title>
                                    <ProfileTeaching
                                       :edit="cards.editTeaching"
                                       :info="editPayload.teaching.teachingInfos"
                                       :deleteItem="clickDelete"
                                       :otherProfile="otherProfile"
                                    />
                                    <v-card-actions v-if="!cards.editTeaching">
                                       <v-spacer></v-spacer>
                                       <v-btn
                                          :style="{
                                             backgroundColor: generalConfig.mainColor + ' !important',
                                             color: 'white !important'
                                          }"
                                          fab
                                          small
                                          @click="clickAdd('teaching')"
                                       >
                                          <v-icon>mdi-plus</v-icon>
                                       </v-btn>
                                       <v-spacer></v-spacer>
                                    </v-card-actions>
                                 </v-card>
                                 <!---------------------------------------- CARD: Premios y distinciones ------------------------------------------------------>
                                 <v-card color="white" v-if="i == 6 && payload.achievement.visible">
                                    <v-card-title
                                       :style="{
                                          backgroundColor: generalConfig.mainColor + ' !important'
                                       }"
                                       >Premios y distinciones
                                       <v-row justify="end">
                                          <v-btn
                                             v-if="otherProfile != 'yes'"
                                             class="mx-2"
                                             icon
                                             small
                                             color="blue lighten-5"
                                             @click="editCard('achieve', cards.editAchievement)"
                                          >
                                             <v-icon v-if="cards.editAchievement" x-large>mdi-square-edit-outline</v-icon>
                                             <v-icon v-else x-large>mdi-content-save</v-icon>
                                          </v-btn>
                                       </v-row>
                                    </v-card-title>
                                    <ProfileAchievement
                                       :edit="cards.editAchievement"
                                       :info="editPayload.achievement.achievementInfos"
                                       :deleteItem="clickDelete"
                                       :otherProfile="otherProfile"
                                    />
                                    <v-card-actions v-if="!cards.editAchievement">
                                       <v-spacer></v-spacer>
                                       <v-btn
                                          :style="{
                                             backgroundColor: generalConfig.mainColor + ' !important',
                                             color: 'white !important'
                                          }"
                                          fab
                                          small
                                          @click="clickAdd('achievement')"
                                       >
                                          <v-icon>mdi-plus</v-icon>
                                       </v-btn>

                                       <v-spacer></v-spacer>
                                    </v-card-actions>
                                 </v-card>
                                 <!---------------------------------------- CARD: Idiomas ------------------------------------------------------------------------>
                                 <v-card color="white" v-if="i == 7 && payload.language.visible">
                                    <v-card-title
                                       :style="{
                                          backgroundColor: generalConfig.mainColor + ' !important'
                                       }"
                                       >Idiomas
                                       <v-row justify="end">
                                          <v-btn
                                             v-if="otherProfile != 'yes'"
                                             class="mx-2"
                                             icon
                                             small
                                             color="blue lighten-5"
                                             @click="editCard('language', cards.editLanguage)"
                                          >
                                             <v-icon v-if="cards.editLanguage" x-large>mdi-square-edit-outline</v-icon>
                                             <v-icon v-else x-large>mdi-content-save</v-icon>
                                          </v-btn>
                                       </v-row>
                                    </v-card-title>
                                    <ProfileLanguage
                                       :edit="cards.editLanguage"
                                       :info="editPayload.language.languageInfos"
                                       :deleteItem="clickDelete"
                                       :otherProfile="otherProfile"
                                    />
                                    <v-card-actions v-if="!cards.editLanguage">
                                       <v-spacer></v-spacer>
                                       <v-btn
                                          :style="{
                                             backgroundColor: generalConfig.mainColor + ' !important',
                                             color: 'white !important'
                                          }"
                                          fab
                                          small
                                          @click="clickAdd('language')"
                                       >
                                          <v-icon>mdi-plus</v-icon>
                                       </v-btn>
                                       <v-spacer></v-spacer>
                                    </v-card-actions>
                                 </v-card>
                                 <!---------------------------------------- CARD: Ubicación ------------------------------------------------------------------------->
                                 <v-card color="white" v-if="i == 8 && payload.location.visible">
                                    <v-card-title
                                       :style="{
                                          backgroundColor: generalConfig.mainColor + ' !important'
                                       }"
                                       >Ubicación
                                       <v-row justify="end">
                                          <v-btn
                                             v-if="otherProfile != 'yes'"
                                             class="mx-2"
                                             icon
                                             small
                                             color="blue lighten-5"
                                             @click="editCard('location', cards.editLocation)"
                                          >
                                             <v-icon v-if="cards.editLocation" x-large>mdi-square-edit-outline</v-icon>
                                             <v-icon v-else x-large>mdi-content-save</v-icon>
                                          </v-btn>
                                       </v-row>
                                    </v-card-title>
                                    <ProfileLocation :edit="cards.editLocation" :info="editPayload.location" />
                                 </v-card>
                                 <!---------------------------------------- CARD: MarketPlace ---------------------------------------------------------->
                                 <v-card color="white" v-if="i == 9 && payload.market.visible">
                                    <v-card-title
                                       :style="{
                                          backgroundColor: generalConfig.mainColor + ' !important'
                                       }"
                                       >Market
                                       <v-row justify="end">
                                          <v-btn
                                             v-if="otherProfile != 'yes'"
                                             class="mx-2"
                                             icon
                                             small
                                             color="blue lighten-5"
                                             @click="editCard('market', cards.editMarket)"
                                          >
                                             <v-icon v-if="cards.editMarket" x-large>mdi-square-edit-outline</v-icon>
                                             <v-icon v-else x-large>mdi-content-save</v-icon>
                                          </v-btn>
                                       </v-row>
                                    </v-card-title>
                                    <ProfileMarket :edit="cards.editMarket" :info="editPayload.market" />
                                 </v-card>
                              </v-tab-item>
                           </v-tabs-items>
                        </v-card>
                     </v-row>
                  </v-col>
               </v-col>
            </v-row>
         </v-card>
      </v-container>
      <Footer> </Footer>
   </v-main>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import * as userDA from "../dataAccess/user.js";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import ProfileLanguage from "../components/profile/ProfileLanguage.vue";
import ProfileLocation from "../components/profile/ProfileLocation.vue";
import ProfileAchievement from "../components/profile/ProfileAchievement.vue";
import ProfileTeaching from "../components/profile/ProfileTeaching.vue";
import ProfileVoluntaryWork from "../components/profile/ProfileVoluntaryWork.vue";
import ProfileAcademicDetail from "../components/profile/ProfileAcademicDetail.vue";
import ProfileWork from "../components/profile/ProfileWork.vue";
import ProfileMain from "../components/profile/ProfileMain.vue";
import ProfileMarket from "../components/profile/ProfileMarket.vue";
import ProfileSideBar from "../components/profile/ProfileSideBar.vue";
import Swal from "sweetalert2";

export default {
   name: "Profile",
   components: {
      Navbar,
      Footer,
      ProfileLanguage,
      ProfileLocation,
      ProfileAchievement,
      ProfileTeaching,
      ProfileVoluntaryWork,
      ProfileAcademicDetail,
      ProfileWork,
      ProfileMain,
      ProfileMarket,
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
            seller: false
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
         key: process.env.VUE_APP_API_KEY_COMMUNITY, //366a7fe6-6245-440e-a8c2-eb9f97224f54, ec84b565-011c-4ad8-a1c1-403c1b6eac5c
         id: ""
      },
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      flagOther: false,
      editProfile: true,
      otherProfile: null
   }),

   updated() {
      this.$refs.tabs.onResize();
   },
   methods: {
      /************************************** MÉTODOS **************************************************************/
      ...mapGetters("user", ["getUser"]),
      changeImageProfile(value) {
         this.payload.profileImgUrl = value;
      },
      changeEditImgProfile(value) {
         this.editProfile = value;
      },
      clickAdd(text) {
         if (text == "work" && this.editPayload.work.works.length < 10) {
            this.editPayload.work.works.push({
               country: "",
               city: "",
               occupation: "",
               company: "",
               companyArea: "",
               actual: false,
               startDate: "",
               endDate: "",
               description: ""
            });
         } else if (text == "academicDetail" && this.editPayload.academicDetail.academicDetailInfos.length < 10) {
            this.editPayload.academicDetail.academicDetailInfos.push({
               country: "",
               city: "",
               studyInstitution: "",
               academicDegrees: "",
               career: "",
               actual: false,
               startDate: "",
               endDate: "",
               description: ""
            });
         } else if (text == "voluntaryWork" && this.editPayload.voluntaryWork.voluntaryWorkInfos.length < 10) {
            this.editPayload.voluntaryWork.voluntaryWorkInfos.push({
               country: "",
               city: "",
               organization: "",
               rol: "",
               goodwillCause: "",
               actual: false,
               startDate: "",
               endDate: "",
               description: ""
            });
         } else if (text == "teaching" && this.editPayload.teaching.teachingInfos.length < 10) {
            this.editPayload.teaching.teachingInfos.push({
               country: "",
               city: "",
               teachInstitution: "",
               knowledge: "",
               actual: false,
               startDate: "",
               endDate: "",
               courses: []
            });
         } else if (text == "achievement" && this.editPayload.achievement.achievementInfos.length < 10) {
            this.editPayload.achievement.achievementInfos.push({
               country: "",
               city: "",
               awardName: "",
               date: "",
               description: ""
            });
         } else if (text == "language" && this.editPayload.language.languageInfos.length < 10) {
            this.editPayload.language.languageInfos.push({
               description: "",
               writingLevel: "",
               readingLevel: ""
            });
         }
      },
      clickDelete(text, key) {
         if (text == "work" && this.editPayload.work.works.length > 0) {
            this.editPayload.work.works.splice(key, 1);
         } else if (text == "academicDetail" && this.editPayload.academicDetail.academicDetailInfos.length > 0) {
            this.editPayload.academicDetail.academicDetailInfos.splice(key, 1);
         } else if (text == "voluntaryWork" && this.editPayload.voluntaryWork.voluntaryWorkInfos.length > 0) {
            this.editPayload.voluntaryWork.voluntaryWorkInfos.splice(key, 1);
         } else if (text == "teaching" && this.editPayload.teaching.teachingInfos.length > 0) {
            this.editPayload.teaching.teachingInfos.splice(key, 1);
         } else if (text == "achievement" && this.editPayload.achievement.achievementInfos.length > 0) {
            this.editPayload.achievement.achievementInfos.splice(key, 1);
         } else if (text == "language" && this.editPayload.language.languageInfos.length > 0) {
            this.editPayload.language.languageInfos.splice(key, 1);
         }
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

               /*if (
                  this.editPayload.profile.phone != "" &&
                  this.editPayload.profile.phone.length > 15
               ) {
                  //CUMPLEAÑOS LUEGO DE LA FECHA ACTUAL

                  Swal.fire({
                     title: '<p style="font-family:Roboto;">Error</p>',
                     icon: "error",
                     html:
                        '<p style="font-family:Roboto;">Número de teléfono muy largo</p>'
                  });
                  return;
               }*/

               //BIRTHDAY
               if (this.editPayload.profile.birthdate != "" && new Date() <= new Date(this.editPayload.profile.birthdate)) {
                  //CUMPLEAÑOS LUEGO DE LA FECHA ACTUAL

                  Swal.fire({
                     title: '<p style="font-family:Roboto;">Error</p>',
                     icon: "error",
                     html: '<p style="font-family:Roboto;">Ingrese una fecha de nacimiento válida</p>'
                  });
                  return;
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
         } else if (text == "work") {
            if (!editBool) {
               for (let i = 0; i < this.editPayload.work.works.length; i++) {
                  //DATES
                  var currWork = this.editPayload.work.works[i];
                  if (currWork.startDate == null || currWork.startDate == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de inicio</p>'
                     });
                     return;
                  }

                  if (currWork.startDate != null && currWork.startDate != "" && new Date() <= new Date(currWork.startDate)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de inicio válida</p>'
                     });
                     return;
                  }

                  if (!currWork.actual && (currWork.endDate == null || currWork.endDate == "")) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de culminación</p>'
                     });
                     return;
                  }

                  if (!currWork.actual && new Date() <= new Date(currWork.endDate)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de culminación válida</p>'
                     });
                     return;
                  }

                  if (!currWork.actual && new Date(currWork.startDate) > new Date(currWork.endDate)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese fechas de inicio y de culminación válidas</p>'
                     });
                     return;
                  }

                  //COUNTRY

                  if (currWork.country == null || currWork.country == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el país en el cual laboró</p>'
                     });
                     return;
                  }

                  if (currWork.city == null || currWork.city == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese la ciudad en el cual laboró</p>'
                     });
                     return;
                  }

                  //COMPANY

                  if (currWork.company == null || currWork.company == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el nombre de la empresa en el cual laboró</p>'
                     });
                     return;
                  }

                  if (currWork.companyArea == null || currWork.companyArea == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el nombre del área en el cual laboró</p>'
                     });
                     return;
                  }

                  if (currWork.occupation == null || currWork.occupation == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el nombre del cargo que ocupó</p>'
                     });
                     return;
                  }
               }
               cardNumber = 1;
               this.cards.editWork = !this.cards.editWork;
            } else {
               this.cards.editWork = !this.cards.editWork;
            }
         } else if (text == "academic") {
            if (!editBool) {
               for (let i = 0; i < this.editPayload.academicDetail.academicDetailInfos.length; i++) {
                  //DATES
                  var currAcadElement = this.editPayload.academicDetail.academicDetailInfos[i];

                  if (currAcadElement.startDate == null || currAcadElement.startDate == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de inicio</p>'
                     });
                     return;
                  }

                  if (currAcadElement.startDate != null && currAcadElement.startDate != "" && new Date() <= new Date(currAcadElement.startDate)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de inicio válida</p>'
                     });
                     return;
                  }

                  if (!currAcadElement.actual && (currAcadElement.endDate == null || currAcadElement.endDate == "")) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de culminación</p>'
                     });
                     return;
                  }

                  if (!currAcadElement.actual && new Date() <= new Date(currAcadElement.endDate)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de culminación válida</p>'
                     });
                     return;
                  }

                  if (!currAcadElement.actual && new Date(currAcadElement.startDate) > new Date(currAcadElement.endDate)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese fechas de inicio y de culminación válidas</p>'
                     });
                     return;
                  }

                  //COUNTRY

                  if (currAcadElement.country == null || currAcadElement.country == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el país en el cual estudió</p>'
                     });
                     return;
                  }

                  if (currAcadElement.city == null || currAcadElement.city == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese la ciudad en el cual estudió</p>'
                     });
                     return;
                  }

                  //ELSE

                  if (currAcadElement.studyInstitution == null || currAcadElement.studyInstitution == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el nombre de la institución</p>'
                     });
                     return;
                  }

                  if (currAcadElement.academicDegrees == null || currAcadElement.academicDegrees == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el grado o título</p>'
                     });
                     return;
                  }

                  if (currAcadElement.career == null || currAcadElement.career == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el nombre de la carrera</p>'
                     });
                     return;
                  }

                  /*

                  if (this.editPayload.work.lastName.trim() != "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html:
                           '<p style="font-family:Roboto;">Ingrese apellidos válidos</p>'
                     });
                     return;
                  }*/
               }

               cardNumber = 2;
               this.cards.editAcademic = !this.cards.editAcademic;
            } else {
               this.cards.editAcademic = !this.cards.editAcademic;
            }
         } else if (text == "voluntary") {
            if (!editBool) {
               for (let i = 0; i < this.editPayload.voluntaryWork.voluntaryWorkInfos.length; i++) {
                  //DATES
                  var currVolElement = this.editPayload.voluntaryWork.voluntaryWorkInfos[i];

                  if (currVolElement.startDate == null || currVolElement.startDate == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de inicio</p>'
                     });
                     return;
                  }

                  if (currVolElement.startDate != null && currVolElement.startDate != "" && new Date() <= new Date(currVolElement.startDate)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de inicio válida</p>'
                     });
                     return;
                  }

                  if (!currVolElement.actual && (currVolElement.endDate == null || currVolElement.endDate == "")) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de culminación</p>'
                     });
                     return;
                  }

                  if (!currVolElement.actual && new Date() <= new Date(currVolElement.endDate)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de culminación válida</p>'
                     });
                     return;
                  }

                  if (!currVolElement.actual && new Date(currVolElement.startDate) > new Date(currVolElement.endDate)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese fechas de inicio y de culminación válidas</p>'
                     });
                     return;
                  }

                  //COUNTRY

                  if (currVolElement.country == null || currVolElement.country == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el país en el cual realizó el voluntariado</p>'
                     });
                     return;
                  }

                  if (currVolElement.city == null || currVolElement.city == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese la ciudad en el cual realizó el voluntariado</p>'
                     });
                     return;
                  }

                  //ELSE

                  if (currVolElement.organization == null || currVolElement.organization == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el nombre de la organización</p>'
                     });
                     return;
                  }

                  if (currVolElement.goodwillCause == null || currVolElement.goodwillCause == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese la causa benéfica</p>'
                     });
                     return;
                  }

                  if (currVolElement.rol == null || currVolElement.rol == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese nombre del rol que ocupó</p>'
                     });
                     return;
                  }
               }

               cardNumber = 3;
               this.cards.editVoluntary = !this.cards.editVoluntary;
            } else {
               this.cards.editVoluntary = !this.cards.editVoluntary;
            }
         } else if (text == "teaching") {
            if (!editBool) {
               for (let i = 0; i < this.editPayload.teaching.teachingInfos.length; i++) {
                  //********************************************TEACHING***********************************************
                  //DATES
                  var currTeachElement = this.editPayload.teaching.teachingInfos[i];

                  if (currTeachElement.startDate == null || currTeachElement.startDate == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de inicio</p>'
                     });
                     return;
                  }

                  if (currTeachElement.startDate != null && currTeachElement.startDate != "" && new Date() <= new Date(currTeachElement.startDate)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de inicio válida</p>'
                     });
                     return;
                  }

                  if (!currTeachElement.actual && (currTeachElement.endDate == null || currTeachElement.endDate == "")) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de culminación</p>'
                     });
                     return;
                  }

                  if (!currTeachElement.actual && new Date() <= new Date(currTeachElement.endDate)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha de culminación válida</p>'
                     });
                     return;
                  }

                  if (!currTeachElement.actual && new Date(currTeachElement.startDate) > new Date(currTeachElement.endDate)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese fechas de inicio y de culminación válidas</p>'
                     });
                     return;
                  }

                  //COUNTRY

                  if (currTeachElement.country == null || currTeachElement.country == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el país en el cual realizó su experiencia de docente</p>'
                     });
                     return;
                  }

                  if (currTeachElement.city == null || currTeachElement.city == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese la ciudad en el cual realizó su experiencia de docente</p>'
                     });
                     return;
                  }

                  //ELSE

                  if (currTeachElement.knowledge == null || currTeachElement.knowledge == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el área de conocimiento</p>'
                     });
                     return;
                  }

                  if (currTeachElement.teachInstitution == null || currTeachElement.teachInstitution == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese nombre de la institución educativa</p>'
                     });
                     return;
                  }

                  //COURSES

                  for (let j = 0; j < currTeachElement.courses.length; j++) {
                     if (currTeachElement.courses[j].schoolSubject == null || currTeachElement.courses[j].schoolSubject == "") {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html: '<p style="font-family:Roboto;">Ingrese el nombre de todos los cursos</p>'
                        });
                        return;
                     }

                     if (currTeachElement.courses[j].startDate == null || currTeachElement.courses[j].startDate == "") {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html: '<p style="font-family:Roboto;">Ingrese una fecha de inicio para los cursos</p>'
                        });
                        return;
                     }

                     if (
                        currTeachElement.courses[j].startDate != null &&
                        currTeachElement.courses[j].startDate != "" &&
                        new Date() <= new Date(currTeachElement.courses[j].startDate)
                     ) {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html: '<p style="font-family:Roboto;">Ingrese una fecha de inicio válida para los cursos</p>'
                        });
                        return;
                     }

                     if (
                        currTeachElement.courses[j].startDate != null &&
                        currTeachElement.courses[j].startDate != "" &&
                        new Date(currTeachElement.startDate) > new Date(currTeachElement.courses[j].startDate)
                     ) {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html:
                              '<p style="font-family:Roboto;">La fecha de inicio de los cursos son antes de lo indicado en la fecha de inicio de la experiencia docente</p>'
                        });
                        return;
                     }

                     if (!currTeachElement.actual && (currTeachElement.courses[j].endDate == null || currTeachElement.courses[j].endDate == "")) {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html: '<p style="font-family:Roboto;">Ingrese una fecha de culminación para los cursos</p>'
                        });
                        return;
                     }

                     if (!currTeachElement.actual && new Date() <= new Date(currTeachElement.courses[j].endDate)) {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html: '<p style="font-family:Roboto;">Ingrese una fecha de culminación válida para los cursos</p>'
                        });
                        return;
                     }

                     if (!currTeachElement.actual && new Date(currTeachElement.endDate) < new Date(currTeachElement.courses[j].endDate)) {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html:
                              '<p style="font-family:Roboto;">Fecha de culminación de los cursos después de la fecha de culminación de la experiencia.</p>'
                        });
                        return;
                     }

                     if (
                        !currTeachElement.actual &&
                        new Date(currTeachElement.courses[j].startDate) > new Date(currTeachElement.courses[j].endDate)
                     ) {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html: '<p style="font-family:Roboto;">Ingrese fechas de inicio y de culminación válidas para los cursos</p>'
                        });
                        return;
                     }
                     if (
                        !currTeachElement.actual &&
                        new Date(currTeachElement.courses[j].startDate) > new Date(currTeachElement.courses[j].endDate)
                     ) {
                        Swal.fire({
                           title: '<p style="font-family:Roboto;">Error</p>',
                           icon: "error",
                           html: '<p style="font-family:Roboto;">Ingrese fechas de inicio y de culminación válidas para los cursos</p>'
                        });
                        return;
                     }
                  }
               }

               cardNumber = 4;
               this.cards.editTeaching = !this.cards.editTeaching;
            } else {
               this.cards.editTeaching = !this.cards.editTeaching;
            }
         } else if (text == "achieve") {
            if (!editBool) {
               for (let i = 0; i < this.editPayload.achievement.achievementInfos.length; i++) {
                  //DATES
                  var currAchieveElement = this.editPayload.achievement.achievementInfos[i];

                  if (currAchieveElement.date == null || currAchieveElement.date == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese la fecha en el cual recibió el premio o la distinción</p>'
                     });
                     return;
                  }

                  if (currAchieveElement.date != null && currAchieveElement.date != "" && new Date() <= new Date(currAchieveElement.date)) {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese una fecha válida</p>'
                     });
                     return;
                  }

                  //COUNTRY

                  if (currAchieveElement.country == null || currAchieveElement.country == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el país en el cual realizó el voluntariado</p>'
                     });
                     return;
                  }

                  if (currAchieveElement.city == null || currAchieveElement.city == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese la ciudad en el cual realizó el voluntariado</p>'
                     });
                     return;
                  }

                  //ELSE

                  if (currAchieveElement.awardName == null || currAchieveElement.awardName == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el nombre del premio o distinción</p>'
                     });
                     return;
                  }
               }

               cardNumber = 5;
               this.cards.editAchievement = !this.cards.editAchievement;
            } else {
               this.cards.editAchievement = !this.cards.editAchievement;
            }
         } else if (text == "language") {
            if (!editBool) {
               for (let i = 0; i < this.editPayload.language.languageInfos.length; i++) {
                  var currLangElement = this.editPayload.language.languageInfos[i];

                  //LVLS

                  if (currLangElement.readingLevel == null || currLangElement.readingLevel == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el nivel de lectura</p>'
                     });
                     return;
                  }

                  if (currLangElement.writingLevel == null || currLangElement.writingLevel == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el nivel de escritura</p>'
                     });
                     return;
                  }

                  //ELSE

                  if (currLangElement.description == null || currLangElement.description == "") {
                     Swal.fire({
                        title: '<p style="font-family:Roboto;">Error</p>',
                        icon: "error",
                        html: '<p style="font-family:Roboto;">Ingrese el nombre del idioma</p>'
                     });
                     return;
                  }
               }

               cardNumber = 6;
               this.cards.editLanguage = !this.cards.editLanguage;
            } else {
               this.cards.editLanguage = !this.cards.editLanguage;
            }
         } else if (text == "location") {
            if (!editBool) {
               if (this.editPayload.location.latitude != "" && this.editPayload.location.latitude.length > 7) {
                  //CUMPLEAÑOS LUEGO DE LA FECHA ACTUAL

                  Swal.fire({
                     title: '<p style="font-family:Roboto;">Error</p>',
                     icon: "error",
                     html: '<p style="font-family:Roboto;">Latitude muy larga</p>'
                  });
                  return;
               }

               if (this.editPayload.location.longitude != "" && this.editPayload.location.longitude.length > 7) {
                  //CUMPLEAÑOS LUEGO DE LA FECHA ACTUAL

                  Swal.fire({
                     title: '<p style="font-family:Roboto;">Error</p>',
                     icon: "error",
                     html: '<p style="font-family:Roboto;">Longitude muy larga</p>'
                  });
                  return;
               }

               this.cards.editLocation = !this.cards.editLocation;
               cardNumber = 7;
            } else {
               this.cards.editLocation = !this.cards.editLocation;
            }
            this.cards.editT;
         } else if (text == "market") {
            if (!editBool) {
               //COUNTRY

               if (
                  this.editPayload.market.sellerString == "Sí" &&
                  (this.editPayload.market.businessName == null || this.editPayload.market.businessName == "")
               ) {
                  Swal.fire({
                     title: '<p style="font-family:Roboto;">Error</p>',
                     icon: "error",
                     html: '<p style="font-family:Roboto;">Ingrese el nombre del negocio</p>'
                  });
                  return;
               }

               if (this.editPayload.market.sellerString == "") {
                  Swal.fire({
                     title: '<p style="font-family:Roboto;">Error</p>',
                     icon: "error",
                     html: '<p style="font-family:Roboto;">Elija si es comprador o no</p>'
                  });
                  return;
               }

               if (this.editPayload.market.sellerString == "Sí" && !this.editPayload.market.acceptEULA) {
                  Swal.fire({
                     title: '<p style="font-family:Roboto;">Error</p>',
                     icon: "error",
                     html: '<p style="font-family:Roboto;">Debe aceptar los términos de uso y política de privacidad</p>'
                  });
                  return;
               }

               if (this.editPayload.market.sellerString == "No") this.editPayload.market.acceptEULA = false;

               this.cards.editMarket = !this.cards.editMarket;
               cardNumber = 8; //FOR GENERAL
            } else {
               this.cards.editMarket = !this.cards.editMarket;
            }
         } else return;

         if (!editBool) {
            //this.cards.editGeneral = !this.cards.editGeneral;
            userDA
               .ProfileUpdate(this.payload, this.editPayload, cardNumber)
               .then(res => {
                  console.log(res);
                  if (cardNumber == 0) {
                     localStorage.removeItem("userName");
                     localStorage.removeItem("userLastName");
                     localStorage.setItem("userName", this.payload.profile.name);
                     localStorage.setItem("userLastName", this.payload.profile.lastName);
                     this.$refs.navbar.changeName();
                  } else if (cardNumber == 8) {
                     location.reload();
                  }
               })
               .catch(function(error) {
                  console.log(error);
               });
         }
      }
   },
   mounted: function() {},
   created() {
      /*************************************** CREATED *****************************************/
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
         .then(res => {
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
                  //let documentType = res.data.payload.profile.documentType!=null ? res.data.payload.profile.documentType : "";
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
               // Set Work *****************************************************************************
               this.payload.work.visible = res.data.payload.work.visible;
               if (res.data.payload.work.works != undefined) {
                  //PAYLOAD
                  for (let i = 0; i < res.data.payload.work.works.length; i++) {
                     this.payload.work.works.push({
                        country: res.data.payload.work.works[i].country,
                        city: res.data.payload.work.works[i].city,
                        occupation: res.data.payload.work.works[i].occupation,
                        company: res.data.payload.work.works[i].company,
                        companyArea: res.data.payload.work.works[i].companyArea,
                        actual: res.data.payload.work.works[i].actual,
                        startDate: res.data.payload.work.works[i].startDate,
                        endDate: res.data.payload.work.works[i].endDate,
                        description: res.data.payload.work.works[i].description
                     });
                  }

                  //EDITPAYLOAD
                  for (let i = 0; i < res.data.payload.work.works.length; i++) {
                     this.editPayload.work.works.push({
                        country: res.data.payload.work.works[i].country,
                        city: res.data.payload.work.works[i].city,
                        occupation: res.data.payload.work.works[i].occupation,
                        company: res.data.payload.work.works[i].company,
                        companyArea: res.data.payload.work.works[i].companyArea,
                        actual: res.data.payload.work.works[i].actual,
                        startDate: res.data.payload.work.works[i].startDate,
                        endDate: res.data.payload.work.works[i].endDate,
                        description: res.data.payload.work.works[i].description
                     });
                  }
               }
               // Set Academic Detail *****************************************************************************
               this.payload.academicDetail.visible = res.data.payload.academicDetail.visible;
               if (res.data.payload.academicDetail.academicDetailInfos != undefined) {
                  for (let i = 0; i < res.data.payload.academicDetail.academicDetailInfos.length; i++) {
                     this.payload.academicDetail.academicDetailInfos.push({
                        country: res.data.payload.academicDetail.academicDetailInfos[i].country,
                        city: res.data.payload.academicDetail.academicDetailInfos[i].city,
                        studyInstitution: res.data.payload.academicDetail.academicDetailInfos[i].studyInstitution,
                        academicDegrees: res.data.payload.academicDetail.academicDetailInfos[i].academicDegrees,
                        career: res.data.payload.academicDetail.academicDetailInfos[i].career,
                        actual: res.data.payload.academicDetail.academicDetailInfos[i].actual,
                        startDate: res.data.payload.academicDetail.academicDetailInfos[i].startDate,
                        endDate: res.data.payload.academicDetail.academicDetailInfos[i].endDate,
                        description: res.data.payload.academicDetail.academicDetailInfos[i].description
                     });
                  }

                  for (let i = 0; i < res.data.payload.academicDetail.academicDetailInfos.length; i++) {
                     this.editPayload.academicDetail.academicDetailInfos.push({
                        country: res.data.payload.academicDetail.academicDetailInfos[i].country,
                        city: res.data.payload.academicDetail.academicDetailInfos[i].city,
                        studyInstitution: res.data.payload.academicDetail.academicDetailInfos[i].studyInstitution,
                        academicDegrees: res.data.payload.academicDetail.academicDetailInfos[i].academicDegrees,
                        career: res.data.payload.academicDetail.academicDetailInfos[i].career,
                        actual: res.data.payload.academicDetail.academicDetailInfos[i].actual,
                        startDate: res.data.payload.academicDetail.academicDetailInfos[i].startDate,
                        endDate: res.data.payload.academicDetail.academicDetailInfos[i].endDate,
                        description: res.data.payload.academicDetail.academicDetailInfos[i].description
                     });
                  }
               }
               // Set Voluntary Work *****************************************************************************
               this.payload.voluntaryWork.visible = res.data.payload.voluntaryWork.visible;
               if (res.data.payload.voluntaryWork.voluntaryWorkInfos != undefined) {
                  for (let i = 0; i < res.data.payload.voluntaryWork.voluntaryWorkInfos.length; i++) {
                     this.payload.voluntaryWork.voluntaryWorkInfos.push({
                        country: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].country,
                        city: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].city,
                        organization: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].organization,
                        rol: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].rol,
                        goodwillCause: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].goodwillCause,
                        actual: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].actual,
                        startDate: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].startDate,
                        endDate: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].endDate,
                        description: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].description
                     });
                  }

                  for (let i = 0; i < res.data.payload.voluntaryWork.voluntaryWorkInfos.length; i++) {
                     this.editPayload.voluntaryWork.voluntaryWorkInfos.push({
                        country: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].country,
                        city: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].city,
                        organization: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].organization,
                        rol: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].rol,
                        goodwillCause: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].goodwillCause,
                        actual: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].actual,
                        startDate: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].startDate,
                        endDate: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].endDate,
                        description: res.data.payload.voluntaryWork.voluntaryWorkInfos[i].description
                     });
                  }
               }
               // Set Teaching *****************************************************************************
               this.payload.teaching.visible = res.data.payload.teaching.visible;
               if (res.data.payload.teaching.teachingInfos != undefined) {
                  for (let i = 0; i < res.data.payload.teaching.teachingInfos.length; i++) {
                     var coursesTemp = [];
                     var menusTemp = [];
                     this.menusTeaching.push(menusTemp);
                     for (let j = 0; j < res.data.payload.teaching.teachingInfos[i].courses.length; j++) {
                        coursesTemp.push({
                           schoolSubject: res.data.payload.teaching.teachingInfos[i].courses[j].schoolSubject,
                           startDate: res.data.payload.teaching.teachingInfos[i].courses[j].startDate,
                           endDate: res.data.payload.teaching.teachingInfos[i].courses[j].endDate
                        });
                        this.menusTeaching[i].push(false);
                     }
                     this.payload.teaching.teachingInfos.push({
                        country: res.data.payload.teaching.teachingInfos[i].country,
                        city: res.data.payload.teaching.teachingInfos[i].city,
                        teachInstitution: res.data.payload.teaching.teachingInfos[i].teachInstitution,
                        knowledge: res.data.payload.teaching.teachingInfos[i].knowledge,
                        actual: res.data.payload.teaching.teachingInfos[i].actual,
                        startDate: res.data.payload.teaching.teachingInfos[i].startDate,
                        endDate: res.data.payload.teaching.teachingInfos[i].endDate,
                        courses: coursesTemp
                     });
                  }

                  for (let i = 0; i < res.data.payload.teaching.teachingInfos.length; i++) {
                     var coursesTemp2 = [];
                     var menusTemp2 = [];
                     this.menusTeaching.push(menusTemp2);
                     for (let j = 0; j < res.data.payload.teaching.teachingInfos[i].courses.length; j++) {
                        coursesTemp2.push({
                           schoolSubject: res.data.payload.teaching.teachingInfos[i].courses[j].schoolSubject,
                           startDate: res.data.payload.teaching.teachingInfos[i].courses[j].startDate,
                           endDate: res.data.payload.teaching.teachingInfos[i].courses[j].endDate
                        });
                        this.menusTeaching[i].push(false);
                     }
                     this.editPayload.teaching.teachingInfos.push({
                        country: res.data.payload.teaching.teachingInfos[i].country,
                        city: res.data.payload.teaching.teachingInfos[i].city,
                        teachInstitution: res.data.payload.teaching.teachingInfos[i].teachInstitution,
                        knowledge: res.data.payload.teaching.teachingInfos[i].knowledge,
                        actual: res.data.payload.teaching.teachingInfos[i].actual,
                        startDate: res.data.payload.teaching.teachingInfos[i].startDate,
                        endDate: res.data.payload.teaching.teachingInfos[i].endDate,
                        courses: coursesTemp2
                     });
                  }
               }
               // Set Achievements *****************************************************************************
               this.payload.achievement.visible = res.data.payload.achievement.visible;
               if (res.data.payload.achievement.achievementInfos != undefined) {
                  for (let i = 0; i < res.data.payload.achievement.achievementInfos.length; i++) {
                     this.payload.achievement.achievementInfos.push({
                        country: res.data.payload.achievement.achievementInfos[i].country,
                        city: res.data.payload.achievement.achievementInfos[i].city,
                        awardName: res.data.payload.achievement.achievementInfos[i].awardName,
                        date: res.data.payload.achievement.achievementInfos[i].date,
                        description: res.data.payload.achievement.achievementInfos[i].description
                     });
                  }

                  for (let i = 0; i < res.data.payload.achievement.achievementInfos.length; i++) {
                     this.editPayload.achievement.achievementInfos.push({
                        country: res.data.payload.achievement.achievementInfos[i].country,
                        city: res.data.payload.achievement.achievementInfos[i].city,
                        awardName: res.data.payload.achievement.achievementInfos[i].awardName,
                        date: res.data.payload.achievement.achievementInfos[i].date,
                        description: res.data.payload.achievement.achievementInfos[i].description
                     });
                  }
               }
               // Set Language *****************************************************************************
               this.payload.language.visible = res.data.payload.language.visible;
               if (res.data.payload.language.languageInfos != undefined) {
                  for (let i = 0; i < res.data.payload.language.languageInfos.length; i++) {
                     this.payload.language.languageInfos.push({
                        description: res.data.payload.language.languageInfos[i].description,
                        writingLevel: res.data.payload.language.languageInfos[i].writingLevel,
                        readingLevel: res.data.payload.language.languageInfos[i].readingLevel
                     });
                  }
               }

               if (res.data.payload.language.languageInfos != undefined) {
                  for (let i = 0; i < res.data.payload.language.languageInfos.length; i++) {
                     this.editPayload.language.languageInfos.push({
                        description: res.data.payload.language.languageInfos[i].description,
                        writingLevel: res.data.payload.language.languageInfos[i].writingLevel,
                        readingLevel: res.data.payload.language.languageInfos[i].readingLevel
                     });
                  }
               }
               // Set Location *****************************************************************************
               this.payload.location.visible = res.data.payload.location.visible;
               if (res.data.payload.location.latitude != undefined) this.payload.location.latitude = res.data.payload.location.latitude;
               if (res.data.payload.location.longitude != undefined) this.payload.location.longitude = res.data.payload.location.longitude;

               this.editPayload.location.visible = res.data.payload.location.visible;
               if (res.data.payload.location.latitude != undefined) this.editPayload.location.latitude = res.data.payload.location.latitude;
               if (res.data.payload.location.longitude != undefined) this.editPayload.location.longitude = res.data.payload.location.longitude;

               // Set Market *****************************************************************************
               if (res.data.payload.market.visible != null) this.payload.market.visible = res.data.payload.market.visible;
               if (res.data.payload.market.company != null) this.payload.market.company = res.data.payload.market.company;
               if (res.data.payload.market.legalRepresentant != null)
                  this.payload.market.legalRepresentant = res.data.payload.market.legalRepresentant;
               if (res.data.payload.market.ruc != undefined) this.payload.market.ruc = res.data.payload.market.ruc; // campo opcional
               if (res.data.payload.market.phone != undefined) this.payload.market.phone = res.data.payload.market.phone; // campo opcional
               if (res.data.payload.market.businessName != null) this.payload.market.businessName = res.data.payload.market.businessName;
               if (res.data.payload.market.country != null) this.payload.market.country = res.data.payload.market.country;
               if (res.data.payload.market.city != null) this.payload.market.city = res.data.payload.market.city;
               if (res.data.payload.market.district != null) this.payload.market.district = res.data.payload.market.district;
               if (res.data.payload.market.address != null) this.payload.market.address = res.data.payload.market.address;

               if (res.data.payload.market.visible != null) this.editPayload.market.visible = res.data.payload.market.visible;
               if (res.data.payload.market.company != null) this.editPayload.market.company = res.data.payload.market.company;
               if (res.data.payload.market.legalRepresentant != null)
                  this.editPayload.market.legalRepresentant = res.data.payload.market.legalRepresentant;
               if (res.data.payload.market.ruc != undefined) this.editPayload.market.ruc = res.data.payload.market.ruc; // campo opcional
               if (res.data.payload.market.phone != undefined) this.editPayload.market.phone = res.data.payload.market.phone; // campo opcional
               if (res.data.payload.market.businessName != null) this.editPayload.market.businessName = res.data.payload.market.businessName;
               if (res.data.payload.market.country != null) this.editPayload.market.country = res.data.payload.market.country;
               if (res.data.payload.market.city != null) this.editPayload.market.city = res.data.payload.market.city;
               if (res.data.payload.market.district != null) this.editPayload.market.district = res.data.payload.market.district;
               if (res.data.payload.market.address != null) this.editPayload.market.address = res.data.payload.market.address;

               if (res.data.payload.market.seller != null) {
                  this.payload.market.seller = res.data.payload.market.seller;
               }

               if (res.data.payload.market.acceptEULA != null) {
                  this.payload.market.acceptEULA = res.data.payload.market.acceptEULA;
                  this.editPayload.market.acceptEULA = res.data.payload.market.acceptEULA;
               }

               if (res.data.payload.market.seller != null && res.data.payload.market.seller == false) {
                  this.editPayload.market.seller = false;
                  this.editPayload.market.sellerString = "No";
               }

               if (res.data.payload.market.seller == undefined) {
                  this.editPayload.market.seller = false;
                  this.editPayload.market.sellerString = "No";
               }

               if (res.data.payload.market.seller != null && res.data.payload.market.seller) {
                  this.editPayload.market.seller = true;
                  this.editPayload.market.sellerString = "Sí";
               }
            } else {
               console.log("Error al recibir la estructura del perfil.");
            }
         })
         .catch(function(error) {
            console.log(error);
         });
   },
   computed: {
      ...mapState(["profile", "generalConfig"])
   }
};
</script>

<style scoped>
.v-card__title {
   color: white !important;
}
</style>
