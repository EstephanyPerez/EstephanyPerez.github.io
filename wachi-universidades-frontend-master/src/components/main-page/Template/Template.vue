<template>
   <div>
      <v-row class="hidden-lg-and-up mb-5">
         <v-container style="text-align:center">
            <v-btn
               :style="{
                  backgroundColor: generalConfig.mainColor + ' !important',
                  color: generalConfig.colorText + ' !important'
               }"
               class="ma-2"
               dark
               @click="openDialog()"
            >
               Ajustes de la comunidad</v-btn
            >
            <Settings v-if="this.dialog" @changeColors="changeColors" :mainColor="mainColorDad" :secondaryColor="secondaryColorDad"></Settings>
         </v-container>
      </v-row>
      <v-row>
         <!-- Normal size -->
         <v-col cols="9" class="hidden-md-and-down">
            <v-flex
               :style="{
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  height: '100vh'
               }"
            >
               <Navbar :flag.sync="flagToUpdate" />
               <Component1 v-if="landingConfig.view" :mainColor="mainColorDad" :secondaryColor="secondaryColorDad"></Component1>
               <Component2 v-if="multiCardConfig.view" :mainColor="mainColorDad" :secondaryColor="secondaryColorDad"></Component2>
               <University v-if="imageCardConfig.view" :mainColor="mainColorDad" :secondaryColor="secondaryColorDad"></University>
               <ContactUs v-if="contactUsConfig.view" :mainColor="mainColorDad" :secondaryColor="secondaryColorDad" />
            </v-flex>
         </v-col>
         <v-col cols="3" class="hidden-md-and-down">
            <v-container style="text-align:center">
               <v-btn
                  :style="{
                     backgroundColor: generalConfig.mainColor + ' !important',
                     color: generalConfig.colorText + ' !important'
                  }"
                  class="ma-2"
                  dark
                  @click="openDialog()"
               >
                  Ajustes de la comunidad</v-btn
               >
               <Settings v-if="this.dialog" @changeColors="changeColors" :mainColor="mainColorDad" :secondaryColor="secondaryColorDad"></Settings>
            </v-container>
            <EditComponent1 v-if="c_editComponent1" />
            <EditComponent2 v-if="c_editComponent2" />
            <EditComponent3 v-if="c_editComponent3" :pdfSelected="pdf" v-on="$listeners" />
         </v-col>

         <!-- Tablet/Laptop size -->
         <v-col cols="12" class="hidden-lg-and-up">
            <v-flex
               :style="{
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  height: '100vh'
               }"
            >
               <Navbar :flag.sync="flagToUpdate" />
               <Component1
                  v-if="landingConfig.view"
                  :mainColor="mainColorDad"
                  :secondaryColor="secondaryColorDad"
                  :dialogBool="component1Dialog"
               ></Component1>
               <Component2
                  v-if="multiCardConfig.view"
                  :mainColor="mainColorDad"
                  :secondaryColor="secondaryColorDad"
                  :dialogBool="component2Dialog"
               ></Component2>
               <University
                  v-if="imageCardConfig.view"
                  :mainColor="mainColorDad"
                  :secondaryColor="secondaryColorDad"
                  :dialogBool="component3Dialog"
               ></University>
               <ContactUs v-if="contactUsConfig.view" :mainColor="mainColorDad" :secondaryColor="secondaryColorDad" />
            </v-flex>
         </v-col>
         <div id="dialogs" class="hidden-lg-and-up">
            <v-dialog v-model="component1DialogBool" v-if="landingConfig.landingText.visible">
               <EditComponent1 />
            </v-dialog>
            <v-dialog v-model="component2DialogBool">
               <EditComponent2 />
            </v-dialog>
            <v-dialog v-model="component3DialogBool">
               <EditComponent3 :pdfSelected="pdf" v-on="$listeners" />
            </v-dialog>
         </div>
      </v-row>
      <v-row justify="center" class="pa-3">
         <v-btn
            x-large
            depressed
            :style="{
               backgroundColor: generalConfig.mainColor + ' !important',
               color: generalConfig.colorText + ' !important'
            }"
            @click="updateMB"
         >
            Guardar cambios
         </v-btn>
      </v-row>
   </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Component1 from "@/components/main-page/Template/Component1.vue";
import Component2 from "@/components/main-page/Template/Component2.vue";
import University from "@/components/main-page/Template/University.vue";
import ContactUs from "@/components/main-page/Template/Contactanos.vue";
import EditComponent1 from "@/components/main-page/Template/EditComponent1";
import EditComponent2 from "@/components/main-page/Template/EditComponent2";
import EditComponent3 from "@/components/main-page/Template/EditComponent3";
import Settings from "@/components/main-page/Template/Settings";
import * as blueprintDA from "@/dataAccess/editCommunity.js";
import * as homepageDA from "@/dataAccess/home-page.js";
import Swal from "sweetalert2";

export default {
   name: "Template",
   components: {
      Navbar,
      Component1,
      Component2,
      University,
      EditComponent1,
      EditComponent2,
      EditComponent3,
      Settings,
      ContactUs
   },
   data() {
      return {
         flagToUpdate: true,
         secondaryColorDad: "",
         mainColorDad: "",

         //dialogs for responsive view
         component1DialogBool: false,
         component2DialogBool: false,
         component3DialogBool: false
      };
   },
   created() {
      this.getBluePrintDataCommunity();
      this.mainColorDad = this.generalConfig.mainColor;
      this.secondaryColorDad = this.generalConfig.secondaryColor;
   },
   computed: {
      ...mapState([
         "generalConfig",
         "c_editComponent1",
         "c_editComponent2",
         "c_editComponent3",
         "c_editComponentContactUs",
         "dialog",
         "multiCardConfig",
         "imageCardConfig",
         "contactUsConfig",
         "landingConfig",
         "searchCategoriesConfig",
         "categoriesListConfig",
         "communityOrganization",
         "generalImage",
         "landingImage",
         "contactImage",
         "card0",
         "card1",
         "card2",
         "multicard0",
         "multicard1",
         "multicard2",
         "communityPrivacy",
         "communityName",
         "communityAcronym",
         "communityType",
         "communityDescription",
         "profile",
         "communityPlan",
         "communityDominio",
         "logo",
         "carosuelProductConfig"
      ])
   },
   methods: {
      ...mapActions([
         "updateComponent1Content",
         "editComponent1",
         "showDialog",
         "completeNavbarOptions",
         "updateComponenteLogin",
         "updateCommunity",
         "updateCommunityPlan",
         "updateCommunityDominio",
         "updateLonginImageGlobal",
         "updateLogoImageURL",
         "obtainHomepageConfiguration",
         "completeComponentsConfigurationToUpdate",
         "updateMainColor",
         "updateSecondaryColor"
      ]),
      component1Dialog() {
         this.component1DialogBool = true;
      },
      component2Dialog() {
         this.component2DialogBool = true;
      },
      component3Dialog() {
         this.component3DialogBool = true;
      },
      openDialog() {
         this.showDialog(true);
      },
      updateMB() {
         this.updateMainColor(this.mainColorDad);
         this.updateSecondaryColor(this.secondaryColorDad);
         try {
            this.createBlueprintJson();
            Swal.fire({
               icon: "success",
               title: '<p style="font-family:Roboto;">Home-Page Actualizado</p>',
               html: '<p style="font-family:Roboto;">Se actualizo la comunidad satisfactoriamente</p>',
               showConfirmButton: true
            });
         } catch (e) {
            console.log(e);
            Swal.fire({
               icon: "error",
               title: '<p style="font-family:Roboto;">Error</p>',
               html: '<p style="font-family:Roboto;">No se pudo actualizar la comunidad correctamente</p>'
            });
         }
      },
      createBlueprintJson() {
         let data = this.generalConfig;
         let components = [];
         for (let i = 0; i < this.imageCardConfig.cards.length; i++) {
            this.imageCardConfig.cards[i].order = i + 1;
            this.imageCardConfig.cards[i].cardName = "imageCard" + (i + 1);
         }
         for (let i = 0; i < this.multiCardConfig.cards.length; i++) {
            this.multiCardConfig.cards[i].order = i + 1;
            this.multiCardConfig.cards[i].cardName = "multiCard" + (i + 1);
         }
         components.push(
            this.landingConfig,
            this.contactUsConfig,
            this.imageCardConfig,
            this.multiCardConfig,
            this.searchCategoriesConfig,
            this.carosuelProductConfig,
            this.categoriesListConfig
         );
         let cant = 0;
         let cant2 = 0;

         if (this.imageCardConfig.view) {
            cant = this.imageCardConfig.cards.length;
         }
         if (this.multiCardConfig.view) {
            cant2 = this.multiCardConfig.cards.length;
         }

         let list = [];
         let list2 = [];
         let formData = new FormData();

         if (this.logo != null && this.logo != "" && this.logo.size > 0) {
            list.push(this.logo);
            list2.push("logo");
         }

         if (this.landingImage != null && this.landingImage != "" && this.landingImage.size > 0) {
            list.push(this.landingImage);
            list2.push("landing");
         }
         if (this.contactImage != null && this.contactImage != "" && this.contactImage.size > 0) {
            list.push(this.contactImage);
            list2.push("contactUs");
         }
         if (cant == 3) {
            if (this.card0 != null && this.card0 != "" && this.card0.size > 0) {
               list.push(this.card0);
               list2.push("imageCard1");
            }
            if (this.card1 != null && this.card1 != "" && this.card1.size > 0) {
               list.push(this.card1);
               list2.push("imageCard2");
            }
            if (this.card2 != null && this.card2 != "" && this.card2.size > 0) {
               list.push(this.card2);
               list2.push("imageCard3");
            }
         } else {
            if (cant == 2) {
               if (this.card0 != null && this.card0 != "" && this.card0.size > 0) {
                  list.push(this.card0);
                  list2.push("imageCard1");
               }
               if (this.card1 != null && this.card1 != "" && this.card1.size > 0) {
                  list.push(this.card1);
                  list2.push("imageCard2");
               }
            } else {
               if (cant == 1) {
                  if (this.card0 != null && this.card0 != "" && this.card0.size > 0) {
                     list.push(this.card0);
                     list2.push("imageCard1");
                  }
               }
            }
         }
         if (cant2 == 3) {
            if (this.multicard0 != null && this.multicard0 != "" && this.multicard0.size > 0) {
               list.push(this.multicard0);
               list2.push("multiCard1");
            }

            if (this.multicard1 != null && this.multicard1 != "" && this.multicard1.size > 0) {
               list.push(this.multicard1);
               list2.push("multiCard2");
            }

            if (this.multicard2 != null && this.multicard2 != "" && this.multicard2.size > 0) {
               list.push(this.multicard2);
               list2.push("multiCard3");
            }
         } else {
            if (cant2 == 2) {
               if (this.multicard0 != null && this.multicard0 != "" && this.multicard0.size > 0) {
                  list.push(this.multicard0);
                  list2.push("multiCard1");
               }
               if (this.multicard1 != null && this.multicard1 != "" && this.multicard1.size > 0) {
                  list.push(this.multicard1);
                  list2.push("multiCard2");
               }
            } else {
               if (cant2 == 1) {
                  if (this.multicard0 != null && this.multicard0 != "" && this.multicard0.size > 0) {
                     list.push(this.multicard0);
                     list2.push("multiCard1");
                  }
               }
            }
         }

         for (let i in list) {
            formData.append("files", list[i]);
         }
         for (let j in list2) {
            formData.append("fileNames", list2[j]);
         }

         data.components = components;

         data.communityToken = process.env.VUE_APP_API_KEY_COMMUNITY;
         delete data["communityId"];

         blueprintDA
            .updateBlueprints(data)
            .then(res => {
               console.log(res.status);
               if (res.status === 200) {
                  console.log(data);
                  console.log(formData);
                  console.log(list);
                  console.log(list2);
                  if (list != []) {
                     blueprintDA.sendImagesBlueprints(formData, data.communityToken).then(res => {
                        console.log(res.status);
                        this.$router.push("/home");
                     });
                  }
               }
            })
            .catch(function() {
               if (status == "401") {
                  Swal.fire({
                     icon: "error",
                     title: '<p style="font-family:Roboto;">Error</p>',
                     html: '<p style="font-family:Roboto;">Ya existe este diseño</p>'
                  });
               } else {
                  Swal.fire({
                     icon: "error",
                     title: '<p style="font-family:Roboto;">Error</p>',
                     html: '<p style="font-family:Roboto;">Error al enviar los datos del diseño de la comunidad</p>'
                  });
               }
            });
      },
      getBluePrintDataCommunity() {
         homepageDA
            .obtainHomepageConfiguration()
            .then(res => {
               console.log(res.data);
               if (res.data.status == "OK") {
                  this.completeComponentsConfigurationToUpdate(res.data.payload);
                  this.$forceUpdate();
               }
            })
            .catch(function(error) {
               console.log(error);
            });
      },
      changeColors(mainColor, secondaryColor) {
         this.mainColorDad = mainColor;
         this.secondaryColorDad = secondaryColor;
      }
   },
   mounted() {
      this.getBluePrintDataCommunity();
      console.log(this.flagToUpdate);
   }
};
</script>
