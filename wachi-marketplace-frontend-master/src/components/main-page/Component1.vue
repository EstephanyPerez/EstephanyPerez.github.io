<template>
   <v-main>
      <div
         class="d-flex align-items-center"
         :style="{
            background:
               'linear-gradient(to right,' +
               hexToRgbA(this.generalConfig.mainColor) +
               ',' +
               hexToRgbA(this.generalConfig.secondaryColor) +
               '), no-repeat, url(' +
               landingConfig.image +
               ') 100% center'
         }"
         style="min-height: 500px; max-height: 500px;"
      >
         <v-row>
            <v-col cols="4" style="align-self:center">
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
                  background-color="transparent"
                  full-width
                  v-model="landingConfig.landingText.text"
                  hide-details="true"
                  readonly
                  :style="style_div_style_focus"
               ></v-textarea>
               <v-row style="justify-content:center">
                  <v-btn
                     rounded
                     @click="signUp"
                     v-if="
                        landingConfig.landingText.textAlign == 'flex-start' &&
                           landingConfig.landingText.visible
                     "
                     :style="{
                        backgroundColor:
                           generalConfig.mainColor + ' !important',
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
                  background-color="transparent"
                  full-width
                  v-model="landingConfig.landingText.text"
                  hide-details="true"
                  :readonly="read_only"
                  :style="style_div_style_focus"
               ></v-textarea>
               <v-row style="justify-content:center">
                  <v-btn
                     @click="signUp"
                     v-if="
                        landingConfig.landingText.textAlign == 'center' &&
                           landingConfig.landingText.visible
                     "
                     rounded
                     :style="{
                        backgroundColor:
                           generalConfig.mainColor + ' !important',
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
                     landingConfig.landingText.textAlign == 'flex-end' &&
                        landingConfig.landingText.visible
                  "
                  class="title-input"
                  solo
                  auto-grow
                  filled
                  dense
                  flat
                  background-color="transparent"
                  full-width
                  v-model="landingConfig.landingText.text"
                  hide-details="true"
                  :readonly="read_only"
                  :style="style_div_style_focus"
               ></v-textarea>
               <v-row style="justify-content:center">
                  <v-btn
                     @click="signUp"
                     v-if="
                        landingConfig.landingText.textAlign == 'flex-end' &&
                           landingConfig.landingText.visible
                     "
                     rounded
                     class="ml-10"
                     :style="{
                        backgroundColor:
                           generalConfig.mainColor + ' !important',
                        color: generalConfig.colorText + ' !important'
                     }"
                  >
                     {{ landingConfig.landingText.buttonText }}
                  </v-btn>
               </v-row>
            </v-col>
         </v-row>
      </div>
   </v-main>
</template>

<style src="@/styles/Component1.css" scoped></style>

<script>
import { mapState, mapActions } from "vuex";

export default {
   name: "Component1",
   data() {
      return {
         showEdit: true,
         read_only: true
      };
   },
   props: ["flagHomePage"],
   computed: {
      ...mapState([
         "landingConfig",
         "c1_porcentageAplha",
         "generalConfig",
         "c_editComponent1"
      ]),
      style_div_style_focus() {
         return {
            "--div-outline--hover": "0px solid #03989A",
            "--div-outline--focus": "0px solid #03989A",
            "--text-color": this.generalConfig.mainColor
         };
      }
   },

   methods: {
      ...mapActions(["completeSelectedComponentsData"]),
      signUp() {
         this.$router.push("/login");
      },
      onSelectFile() {
         //if (!this.read_only) {
         const input = this.$refs.fileInputLanding;
         const files = input.files;

         console.log(files);
         if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
               this.imageFile = files[0];
               this.imageURL = e.target.result;
            };
            reader.readAsDataURL(files[0]);
            this.$emit("input", files[0]);
            this.updateLandingImage(files[0]);
            this.updateLandingImageURL(this.imageURL);
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
               this.c1_porcentageAplha +
               ")"
            );
         }
         throw new Error("Bad Hex");
      }
   }
};
</script>
