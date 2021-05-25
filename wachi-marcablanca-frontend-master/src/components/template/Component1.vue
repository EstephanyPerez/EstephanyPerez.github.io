<template>
   <v-main>
      <div
         class="d-flex align-items-center"
         :style="{
            background:
               'linear-gradient(to right,' +
               hexToRgbA(mainColor) +
               ',' +
               hexToRgbA(secondaryColor) +
               '), no-repeat, url(' +
               imageURL +
               ') 100% center'
         }"
         style="min-height: 500px; max-height: 500px;"
      >
         <input
            v-if="!read_only"
            class="file-input"
            ref="fileInputLanding"
            type="file"
            @input="onSelectFile"
            :style="{ position: 'absolute' }"
         />

         <v-row>
            <v-col class="col" cols="4" style="align-self:center">
               <v-textarea
                  v-if="
                     landingConfig.landingText.textAlign == 'flex-start' &&
                        landingConfig.landingText.visible
                  "
                  class="title-input"
                  solo
                  auto-grow
                  filled
                  dense
                  flat
                  placeholder="Título"
                  background-color="transparent"
                  full-width
                  v-model="landingConfig.landingText.text"
                  hide-details="true"
                  :readonly="read_only"
                  :style="style_div_style_focus"
               ></v-textarea>
               <v-row style="justify-content:center">
                  <v-btn
                     rounded
                     v-if="
                        landingConfig.landingText.textAlign == 'flex-start' &&
                           landingConfig.landingText.visible
                     "
                     :style="{
                        backgroundColor: mainColor + ' !important',
                        color: generalConfig.colorText + ' !important'
                     }"
                  >
                     {{ landingConfig.landingText.buttonText }}
                  </v-btn>
               </v-row>
            </v-col>
            <v-col cols="4" style="align-self:center">
               <v-textarea
                  v-if="
                     landingConfig.landingText.textAlign == 'center' &&
                        landingConfig.landingText.visible
                  "
                  class="title-input"
                  solo
                  auto-grow
                  filled
                  dense
                  flat
                  placeholder="Título"
                  background-color="transparent"
                  full-width
                  v-model="landingConfig.landingText.text"
                  hide-details="true"
                  :readonly="read_only"
                  :style="style_div_style_focus"
               ></v-textarea>
               <v-row style="justify-content:center">
                  <v-btn
                     v-if="
                        landingConfig.landingText.textAlign == 'center' &&
                           landingConfig.landingText.visible
                     "
                     rounded
                     class="ml-10"
                     :style="{
                        backgroundColor: mainColor + ' !important',
                        color: generalConfig.colorText + ' !important'
                     }"
                     disabled
                  >
                     {{ landingConfig.landingText.buttonText }}
                  </v-btn>
               </v-row>
            </v-col>
            <v-col cols="4" style="align-self:center">
               <v-textarea
                  v-if="
                     landingConfig.landingText.textAlign == 'flex-end' &&
                        landingConfig.landingText.visible
                  "
                  class="title-input"
                  solo
                  auto-grow
                  filled
                  dense
                  flat
                  placeholder="Título"
                  background-color="transparent"
                  full-width
                  v-model="landingConfig.landingText.text"
                  hide-details="true"
                  :readonly="read_only"
                  :style="style_div_style_focus"
               ></v-textarea>
               <v-row style="justify-content:center">
                  <v-btn
                     v-if="
                        landingConfig.landingText.textAlign == 'flex-end' &&
                           landingConfig.landingText.visible
                     "
                     rounded
                     :style="{
                        backgroundColor: mainColor + ' !important',
                        color: generalConfig.colorText + ' !important'
                     }"
                     disabled
                  >
                     {{ landingConfig.landingText.buttonText }}
                  </v-btn>
               </v-row>
            </v-col>

            <v-btn
               :color="!editResponsive ? 'green' : 'orange'"
               fab
               large
               absolute
               dark
               top
               right
               @click="editComponent()"
               :style="{ top: '20px', right: '20px' }"
            >
               <v-icon>mdi-pencil</v-icon>
            </v-btn>
         </v-row>
      </div>
   </v-main>
</template>

<style src="@/styles/Component/Components.css" scoped></style>

<script>
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
   name: "Component1",
   props: ["mainColor", "secondaryColor", "dialogBool"],
   data() {
      return {
         showEdit: true,
         imageFile: "",
         image: "",
         imageURL: "",
         read_only: true,
         alpha: 0.6,
         editResponsive: false,
         visibleTextBool: false
      };
   },
   computed: {
      ...mapState([
         "landingConfig",
         "generalConfig",
         "c_editComponent1",
         "urlLandingImage"
      ]),
      style_div_style_focus() {
         if (this.read_only) {
            return {
               "--div-outline--hover": "0px solid #03989A",
               "--div-outline--focus": "0px solid #03989A",
               "--text-color": this.mainColor
            };
         } else {
            return {
               "--div-outline--hover": "2px solid #03989A",
               "--div-outline--focus": "3px solid #03989A",
               "--text-color": this.mainColor
            };
         }
      }
   },
   created() {
      this.imageURL = this.landingConfig.image;
   },
   methods: {
      ...mapActions([
         "editComponent1",
         "editComponent2",
         "editComponent3",
         "editComponentContactUs",
         "updateLandingImageUrl",
         "updateLandingImage"
      ]),

      chooseImage() {
         if (!this.read_only) {
            this.$refs.fileInputLanding.click();
         }
      },

      onSelectFile() {
         const input = this.$refs.fileInputLanding;
         const files = input.files;
         const fileName = files[0].name;
         let idxDot = fileName.lastIndexOf(".") + 1;
         let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

         var filesize = (files[0].size / 1024 / 1024).toFixed(4); // MB

         if (filesize < 10) {
            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
               if (files && files[0]) {
                  const reader = new FileReader();
                  reader.onload = e => {
                     this.imageFile = files[0];
                     this.imageURL = e.target.result;
                  };
                  reader.readAsDataURL(files[0]);
                  this.$emit("input", files[0]);
                  this.$store.commit("updateLandingImage", files[0]);
                  this.$store.commit("updateLandingImageURL", this.imageURL);
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
                  '<p style="font-family:Roboto;">Tamaño de archivo muy grande! Max. 10MB</p>'
            });
            return;
         }
      },
      editComponent() {
         //responsive case
         if (this.dialogBool != undefined) {
            this.editResponsive = !this.editResponsive;
            if (this.editResponsive) {
               this.read_only = false;
            } else {
               this.read_only = true;
               return;
            }
            this.editComponent1(true);
            this.dialogBool();
            return;
         }

         //normal case
         if (this.visibleTextBool) {
            this.read_only = true;
            this.visibleTextBool = !this.visibleTextBool;
            return;
         }
         if (this.c_editComponent1 == true) {
            this.editComponent1(false);
            this.read_only = true;
         } else {
            this.landingConfig.landingText.visible
               ? this.editComponent1(true)
               : (this.visibleTextBool = !this.visibleTextBool);
            this.editComponent2(false);
            this.editComponent3(false);
            this.editComponentContactUs(false);
            this.read_only = false;
         }
      },
      hexToRgbA(hex) {
         var c;
         if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split("");
            if (c.length == 3) {
               c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = "0x" + c.join("");
            return (
               "rgba(" +
               [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
               "," +
               this.alpha +
               ")"
            );
         }
         throw new Error("Bad Hex");
      }
   }
};
</script>
