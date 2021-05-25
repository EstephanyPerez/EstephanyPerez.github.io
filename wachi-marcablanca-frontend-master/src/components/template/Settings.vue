<template>
   <div>
      <v-row justify="center">
         <v-dialog
            v-model="this.dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            @keydown.esc="showDialog(false)"
         >
            <v-card tile>
               <v-toolbar
                  flat
                  dark
                  :style="{
                     backgroundColor: generalConfig.mainColor,
                     color: generalConfig.colorText
                  }"
               >
                  <v-btn icon dark @click="showDialog(false)">
                     <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title
                     >Personalización de la comunidad</v-toolbar-title
                  >
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                     <v-btn dark text @click="closeDialog()">
                        Save
                     </v-btn>
                  </v-toolbar-items>
               </v-toolbar>
               <v-subheader style="padding:2%"
                  >Caracterícas generales de la comunidad</v-subheader
               >
               <v-container>
                  <v-row>
                     <v-col>
                        <h4 class="ma-2">Color primario</h4>
                        <v-color-picker
                           v-model="mainColor"
                           class="ma-2"
                        ></v-color-picker>
                        <h4 class="ma-2">Color de texto</h4>
                        <v-row class="bcont2">
                           <v-select
                              v-model="color_texto"
                              :items="items"
                              dense
                              style="max-width: 60%; padding-left: 2%"
                           ></v-select>
                        </v-row>
                     </v-col>
                     <v-col>
                        <h4 class="ma-2">Color secundario</h4>
                        <v-color-picker
                           v-model="secondaryColor"
                        ></v-color-picker>
                        <h4 class="ma-2">Logo de la comunidad</h4>
                        <!--<img :src="imageUrl" height="150" v-if="imageUrl" />-->
                        <v-text-field
                           style="max-width: 60%"
                           accept="image/png, image/jpeg, image/bmp"
                           placeholder="Seleccione una imagen"
                           prepend-icon="mdi-camera"
                           dense
                           @click="pickFile"
                           v-model="imageName"
                        ></v-text-field>
                        <input
                           type="file"
                           style="display: none"
                           ref="image"
                           accept="image/*"
                           @change="onFilePicked"
                        />
                     </v-col>
                  </v-row>
               </v-container>
            </v-card>
         </v-dialog>
      </v-row>
   </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
   data() {
      return {
         color_texto: "Negro",
         //mainColor: "",
         //secondaryColor: "",
         items: ["Negro", "Blanco"],
         disabled: false,
         imgBackground: "",
         imageName: "",
         imageUrl: "",
         imageFile: ""
      };
   },
   props: ["changeColors", "mainColor", "secondaryColor"],
   computed: {
      ...mapState([
         "generalConfig",
         "dialog",
         "multiCardConfig",
         "imageCardConfig",
         "contactUsConfig",
         "landingConfig",
         "carosuelProductConfig",
         "searchCategoriesConfig",
         "categoriesListConfig",
         "communityType",
         "logo",
         "urlLogo"
      ])
   },
   methods: {
      ...mapActions([
         "showDialog",
         "changeColorTexto",
         "updateMainColor",
         "updateSecondaryColor",
         "updateImageLogo",
         "updateLogoImageURL"
      ]),
      closeDialog() {
         //this.updateMainColor(this.mainColor);
         //this.updateSecondaryColor(this.secondaryColor);
         console.log(this.mainColor);
         console.log(this.secondaryColor);
         this.$emit("changeColors", this.mainColor, this.secondaryColor);
         if (this.color_texto == "Negro") {
            this.changeColorTexto("black");
         } else {
            this.changeColorTexto("white");
         }
         this.showDialog(false);
      },
      pickFile() {
         this.$refs.image.click();
      },

      onFilePicked(e) {
         const files = e.target.files;
         if (files[0] !== undefined) {
            this.imageName = files[0].name;
            if (this.imageName.lastIndexOf(".") <= 0) {
               return;
            }
            const fr = new FileReader();
            fr.readAsDataURL(files[0]);
            fr.addEventListener("load", () => {
               this.imageUrl = fr.result;
               this.imageFile = files[0]; // this is an image file that can be sent to server...
               //console.log("LOGO1");
               this.updateImageLogo(files[0]);
               this.updateLogoImageURL(this.imageUrl);
               console.log("LOGO UPDATEANDOooooo");
               console.log(files[0]);
               //console.log(this.imageFile);
               //console.log(this.imageUrl);
            });
         } else {
            this.imageName = "";
            this.imageFile = "";
            this.imageUrl = "";
         }
      }
   },
   created() {
      this.mainColor = this.generalConfig.mainColor;
      this.secondaryColor = this.generalConfig.secondaryColor;
      if (this.generalConfig.colorText == "black") {
         this.color_texto = "Negro";
      } else {
         this.color_texto = "Blanco";
      }
   }
};
</script>
