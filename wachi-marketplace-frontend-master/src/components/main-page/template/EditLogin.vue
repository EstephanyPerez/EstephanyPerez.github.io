<template>
   <v-main>
      <v-row class="hidden-lg-and-up mb-5">
         <v-container style="text-align: center">
            <v-btn
               :style="{
                  backgroundColor: generalConfig.mainColor,
                  color: generalConfig.colorText
               }"
               dark
               @click="openDialog()"
            >
               Ajustes de comunidad</v-btn
            >
            <Settings
               v-if="this.dialog"
               @changeColors="changeColors"
               :mainColor="mainColorDad"
               :secondaryColor="secondaryColorDad"
            ></Settings>
         </v-container>
      </v-row>

      <v-row no-gutters>
         <!-- Normal size -->
         <v-col cols="5" style="height: 90vh" class="hidden-md-and-down">
            <v-img
               lazy-src="https://picsum.photos/id/11/10/6"
               :src="url"
               height="100%"
               alt="Imagen de la tarjeta"
               :style="{ maxHeight: '90vh' }"
            >
               <input
                  v-if="!read_only"
                  class="file-input"
                  ref="fileInputNormalSize"
                  type="file"
                  accept="image/*"
                  @input="onSelectFile"
                  :style="{ position: 'absolute' }"
               />
               <!--<v-row justify="center">
                  <v-col md="6" style="text-align:center; margin-top:45vh">
                     <h1
                        :style="{
                           color: generalConfig.colorText
                        }"
                     >
                        {{ datos.inicio_registro.texto }}
                     </h1>
                  </v-col>
               </v-row>-->
            </v-img>
         </v-col>
         <v-col cols="4" style="height: 90vh;" class="hidden-md-and-down">
            <v-card
               elevation="0"
               outlined
               height="100%"
               tile
               :style="{ backgroundColor: secondaryColorDad }"
            >
               <div style="text-align-last:end">
                  <v-btn
                     color="green"
                     fab
                     large
                     dark
                     top
                     right
                     class="mr-5"
                     @click="editComponent()"
                     :style="{ top: '2vh', marginRigth: '3%' }"
                  >
                     <v-icon>mdi-pencil</v-icon>
                  </v-btn>
               </div>
               <v-col class="mt-10" style="text-align:center">
                  <google-signin-btn
                     label="Google"
                     customClass="my-button"
                  ></google-signin-btn>
               </v-col>
               <div style="padding:6%">
                  <v-divider class="pa-md-4"></v-divider>
                  <h4 :style="{ color: generalConfig.colorText }">
                     Correo
                  </h4>
                  <v-text-field
                     disabled
                     label="example@email.com"
                     single-line
                     solo
                  ></v-text-field>
                  <h4 :style="{ color: generalConfig.colorText }">
                     Contraseña
                  </h4>
                  <v-text-field
                     disabled
                     label="Password"
                     single-line
                     solo
                     append-icon="mdi-eye-off"
                  ></v-text-field>
                  <v-btn
                     class="login-button white--text"
                     block
                     elevation="2"
                     :color="mainColorDad"
                  >
                     Iniciar Sesión
                  </v-btn>
                  <v-row class="pa-md-4 mt-1  justify-space-between">
                     <!--<a>¿Olvidaste tu contraseña?</a>-->
                     <a>Registrarte</a>
                  </v-row>
               </div>
            </v-card>
         </v-col>
         <v-col cols="2" md="3" class="hidden-md-and-down">
            <v-container style="text-align: center">
               <v-btn
                  :style="{
                     backgroundColor: generalConfig.mainColor,
                     color: generalConfig.colorText
                  }"
                  dark
                  @click="openDialog()"
               >
                  Ajustes de la comunidad</v-btn
               >
               <Settings
                  v-if="this.dialog"
                  @changeColors="changeColors"
                  :mainColor="mainColorDad"
                  :secondaryColor="secondaryColorDad"
               ></Settings>
            </v-container>
         </v-col>

         <!-- Tablet/Laptop size -->
         <v-col
            cols="6"
            style="height: 90vh"
            class="hidden-lg-and-up hidden-xs-only"
         >
            <v-img
               lazy-src="https://picsum.photos/id/11/10/6"
               :src="url"
               height="100%"
               alt="Imagen de la tarjeta"
               :style="{ maxHeight: '90vh' }"
            >
               <input
                  v-if="!read_only"
                  class="file-input"
                  ref="fileInputTabletSize"
                  type="file"
                  accept="image/*"
                  @input="onSelectFile"
                  :style="{ position: 'absolute' }"
               />
            </v-img>
         </v-col>
         <v-col
            cols="6"
            style="height: 90vh;"
            class="hidden-lg-and-up hidden-xs-only"
         >
            <v-card
               elevation="0"
               outlined
               height="100%"
               tile
               :style="{ backgroundColor: secondaryColorDad }"
            >
               <div style="text-align-last:end">
                  <v-btn
                     color="green"
                     fab
                     large
                     dark
                     top
                     right
                     @click="editComponent()"
                     :style="{ top: '2vh', marginRigth: '3%' }"
                  >
                     <v-icon>mdi-pencil</v-icon>
                  </v-btn>
               </div>
               <v-col class="mt-10" style="text-align:center">
                  <google-signin-btn
                     label="Google"
                     customClass="my-button"
                  ></google-signin-btn>
               </v-col>
               <div style="padding:6%">
                  <v-divider class="pa-md-4"></v-divider>
                  <h4 :style="{ color: generalConfig.colorText }">
                     Correo
                  </h4>
                  <v-text-field
                     disabled
                     label="example@email.com"
                     single-line
                     solo
                  ></v-text-field>
                  <h4 :style="{ color: generalConfig.colorText }">
                     Contraseña
                  </h4>
                  <v-text-field
                     disabled
                     label="Password"
                     single-line
                     solo
                     append-icon="mdi-eye-off"
                  ></v-text-field>
                  <v-btn
                     class="login-button white--text"
                     block
                     elevation="2"
                     :color="mainColorDad"
                  >
                     Iniciar Sesión
                  </v-btn>
                  <v-row justify="center">
                     <!--<a>¿Olvidaste tu contraseña?</a>-->
                     <a>Registrarte</a>
                  </v-row>
               </div>
            </v-card>
         </v-col>

         <!-- Cellphone size-->
         <v-col cols="12" style="height: 79vh;" class="hidden-sm-and-up">
            <v-card
               elevation="0"
               outlined
               height="100%"
               tile
               :style="{ backgroundColor: secondaryColorDad }"
            >
               <input
                  v-if="!read_only"
                  class="file-input"
                  ref="fileInputCellphoneSize"
                  type="file"
                  @input="onSelectFile"
                  :style="{ position: 'absolute' }"
               />
               <div style="text-align-last:end">
                  <v-btn
                     color="green"
                     fab
                     large
                     dark
                     top
                     right
                     @click="editComponent()"
                     class="mr-5"
                     :style="{ top: '2vh', marginRigth: '3%' }"
                  >
                     <v-icon>mdi-pencil</v-icon>
                  </v-btn>
               </div>
               <v-col class="mt-10" style="text-align:center">
                  <google-signin-btn
                     label="Google"
                     customClass="my-button"
                  ></google-signin-btn>
               </v-col>
               <div style="padding:6%">
                  <v-divider class="pa-md-4"></v-divider>
                  <h4 :style="{ color: generalConfig.colorText }">
                     Correo
                  </h4>
                  <v-text-field
                     disabled
                     label="example@email.com"
                     single-line
                     solo
                  ></v-text-field>
                  <h4 :style="{ color: generalConfig.colorText }">
                     Contraseña
                  </h4>
                  <v-text-field
                     disabled
                     label="Password"
                     single-line
                     solo
                     append-icon="mdi-eye-off"
                  ></v-text-field>
                  <v-btn
                     class="login-button white--text"
                     block
                     elevation="2"
                     :color="mainColorDad"
                  >
                     Iniciar Sesión
                  </v-btn>
                  <v-row justify="center">
                     <a>Registrarte</a>
                  </v-row>
               </div>
            </v-card>
         </v-col>
      </v-row>

      <v-row justify="center" pa="3" class="mb-5 mt-10">
         <v-dialog v-model="dialog_login" persistent max-width="490">
            <template v-slot:activator="{ on, attrs }">
               <v-btn
                  x-large
                  depressed
                  :style="{
                     backgroundColor: generalConfig.mainColor,
                     color: generalConfig.colorText
                  }"
                  v-bind="attrs"
                  v-on="on"
               >
                  Guardar cambios
               </v-btn>
            </template>
            <v-card>
               <v-card-title>
                  ¿Deseas actualizar los datos de la comunidad?
               </v-card-title>
               <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                     color="red darken-1"
                     text
                     @click="dialog_login = false"
                  >
                     Cancelar
                  </v-btn>
                  <v-btn
                     color="green darken-1"
                     text
                     @click="[(dialog_login = false), updateMB()]"
                  >
                     Aceptar
                  </v-btn>
               </v-card-actions>
            </v-card>
         </v-dialog>
      </v-row>
   </v-main>
</template>

<script>
import Settings from "@/components/main-page/template/Settings";
import { mapState, mapActions } from "vuex";
import * as blueprintDA from "@/dataAccess/editCommunity.js";
import * as homepageDA from "@/dataAccess/home-page.js";
import Swal from "sweetalert2";

export default {
   props: ["datos", "flagToUpdate"],
   components: {
      Settings
   },
   data() {
      return {
         seleccion: false,
         url: null,
         valid: false,
         color_texto: "Negro",
         items: ["Negro", "Blanco"],
         read_only: true,
         imgLogin: null,
         dialog_login: false,
         secondaryColorDad: "",
         mainColorDad: ""
      };
   },

   name: "EditLogin",
   computed: {
      ...mapState([
         "generalConfig",
         "multiCardConfig",
         "imageCardConfig",
         "contactUsConfig",
         "landingConfig",
         "generalImage",
         "landingImage",
         "contactImage",
         "card0",
         "card1",
         "card2",
         "multicard0",
         "multicard1",
         "multicard2",
         "dialog",
         "carosuelProductConfig",
         "searchCategoriesConfig",
         "categoriesListConfig"
      ])
   },
   created() {
      this.getBluePrintDataCommunity();
      this.mainColorDad = this.generalConfig.mainColor;
      this.secondaryColorDad = this.generalConfig.secondaryColor;
      this.color_texto = this.generalConfig.colorText;
      this.url = this.generalConfig.loginImage;
   },
   methods: {
      ...mapActions([
         "showDialog",
         "updateComponenteLogin",
         "updateCommunity",
         "completeNavbarOptions",
         "updateLonginImageGlobal",
         "obtainHomepageConfiguration",
         "completeComponentsConfigurationToUpdate",
         "updateMainColor",
         "updateSecondaryColor"
      ]),
      editComponent() {
         if (this.valid == true) {
            this.valid = false;
            this.read_only = true;
         } else {
            this.valid = true;
            this.read_only = false;
         }
      },

      onSelectFile() {
         let input = this.$refs.fileInputCellphoneSize;

         if (input.files.length == 0) {
            input = this.$refs.fileInputTabletSize;
         }
         if (input.files.length == 0) {
            input = this.$refs.fileInputNormalSize;
         }

         const files = input.files;
         const fileName = files[0].name;
         let idxDot = fileName.lastIndexOf(".") + 1;
         let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
         var filesize = (files[0].size / 1024 / 1024).toFixed(4); // MB
         if (filesize < 2) {
            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
               if (files && files[0]) {
                  const reader = new FileReader();
                  reader.onload = e => {
                     this.datos.inicio_registro.imagen = files[0];
                     this.imgLogin = files[0];
                     this.url = e.target.result;
                  };
                  reader.readAsDataURL(files[0]);
                  this.$emit("input", files[0]);
               }
            } else {
               Swal.fire({
                  icon: "error",
                  title: '<p style="font-family:Roboto;">Error</p>',
                  html:
                     '<p style="font-family:Roboto;">Solo archivos tipo jpg/jpeg y png son permitidos!</p>'
               });
               return;
            }
         } else {
            Swal.fire({
               icon: "error",
               title: '<p style="font-family:Roboto;">Error</p>',
               html:
                  '<p style="font-family:Roboto;">Tamaño de archivo muy grande! Max. 2MB</p>'
            });
            return;
         }
      },
      openDialog() {
         this.showDialog(true);
      },
      updateMB() {
         this.updateMainColor(this.mainColorDad);
         this.updateSecondaryColor(this.secondaryColorDad);
         this.createBlueprintJson();
      },
      createBlueprintJson() {
         let data = this.generalConfig;
         let components = [];
         components.push(
            this.landingConfig,
            this.contactUsConfig,
            this.imageCardConfig,
            this.multiCardConfig,
            this.searchCategoriesConfig,
            this.carosuelProductConfig,
            this.categoriesListConfig
         );

         let list = [];
         let list2 = [];

         let formData = new FormData();

         if (
            this.imgLogin != null &&
            this.imgLogin != "" &&
            this.imgLogin != "imagen" &&
            this.imgLogin.size > 0
         ) {
            list.push(this.imgLogin);
            list2.push("loginImage");
         }
         if (this.logo != null && this.logo != "" && this.logo.size > 0) {
            list.push(this.logo);
            list2.push("logo");
         }

         for (let i in list) {
            formData.append("files", list[i]);
         }
         for (let j in list2) {
            formData.append("fileNames", list2[j]);
         }

         data.components = components;

         data.communityToken = process.env.VUE_APP_API_KEY_COMMUNITY;

         blueprintDA
            .updateBlueprints(data)
            .then(res => {
               if (res.status === 200) {
                  blueprintDA
                     .sendImagesBlueprints(formData, data.communityToken)
                     .then(res => {
                        if (res.status == 200) {
                           this.updateLonginImageGlobal();
                           Swal.fire({
                              icon: "success",
                              title:
                                 '<p style="font-family:Roboto;">Login actualizado</p>',
                              html:
                                 '<p style="font-family:Roboto;">Se actualizo el login</p>'
                           });
                        }
                     });
               }
            })
            .catch(function() {
               if (status == "401") {
                  Swal.fire({
                     icon: "error",
                     title: '<p style="font-family:Roboto;">Error</p>',
                     html:
                        '<p style="font-family:Roboto;">Ya existe este diseño</p>'
                  });
               } else {
                  Swal.fire({
                     icon: "error",
                     title: '<p style="font-family:Roboto;">Error</p>',
                     html:
                        '<p style="font-family:Roboto;">Error al enviar los datos del diseño de la comunidad</p>'
                  });
               }
            });
      },
      getBluePrintDataCommunity() {
         homepageDA
            .obtainHomepageConfiguration()
            .then(res => {
               if (res.data.status == "OK") {
                  this.completeComponentsConfigurationToUpdate(
                     res.data.payload
                  );
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
   }
};
</script>
