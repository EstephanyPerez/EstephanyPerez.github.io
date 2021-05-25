<template>
   <v-col
      cols="12"
      :sm="12 / nCards - 1"
      align="center"
      justify="center"
      :style="{ alignSelf: 'flex-start', margin: '0 15px' }"
   >
      <v-row class="row-card">
         <v-col
            class="div_style_focus c2_card_body_text"
            :style="style_div_style_focus"
            align="center"
            justify="center"
            :id="'body-card-C3' + pos"
         >
            <v-card
               class="mx-auto my-v-card"
               color="transparent"
               max-width="400"
               elevation="0"
            >
               <div
                  class="div_style_img_hover"
                  :id="'image-card-text' + pos"
                  :style="style_div_style_focus"
               >
                  <v-img
                     lazy-src="https://picsum.photos/id/11/10/6"
                     :src="imageURL"
                     alt="Imagen de la tarjeta"
                     height="220"
                  >
                     <input
                        v-if="!read_only"
                        class="file-input"
                        type="file"
                        :ref="'ImageCard' + cardName"
                        @input="onSelectFile(nCards, pos)"
                     />
                  </v-img>
               </div>
            </v-card>
         </v-col>
      </v-row>
   </v-col>
</template>
<style src="@/styles/Component1.css" scoped></style>
<script>
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
   name: "CardImage",
   components: {},
   data() {
      return {
         imageURL: ""
      };
   },
   props: ["nCards", "read_only", "cards", "pos", "dataCard"],
   methods: {
      ...mapActions([
         "updateImageCard0",
         "updateImageCard1",
         "updateImageCard2"
      ]),
      blurElement(itemId) {
         document.getElementById(itemId).style.outline = "0px solid #03989A";
      },
      focusElement(itemId) {
         if (!this.read_only) {
            document.getElementById(itemId).style.outline = "3px solid #03989A";
         }
      },
      onSelectFile(nCards, pos) {
         if (!this.read_only) {
            const input = this.$refs["ImageCard" + this.cardName];
            console.log(input);
            const files = input.files;

            console.log(files);
            const fileName = files[0].name;
            let idxDot = fileName.lastIndexOf(".") + 1;
            let extFile = fileName
               .substr(idxDot, fileName.length)
               .toLowerCase();
            var filesize = (files[0].size / 1024 / 1024).toFixed(4); // MB
            console.log(filesize);
            if (filesize < 10) {
               if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
                  if (files && files[0]) {
                     const reader = new FileReader();
                     reader.onload = e => {
                        this.imageURL = e.target.result;
                     };
                     reader.readAsDataURL(files[0]);
                     this.$emit("input", files[0]);
                     console.log("FILES[0]");
                     console.log(files[0]);
                  }
                  if (nCards == 3) {
                     if (pos == 0) {
                        this.updateImageCard0(files[0]);
                     } else if (pos == 1) {
                        this.updateImageCard1(files[0]);
                     } else if (pos == 2) {
                        this.updateImageCard2(files[0]);
                     }
                  } else {
                     if (nCards == 2) {
                        if (pos == 0) {
                           this.updateImageCard0(files[0]);
                        } else if (pos == 1) {
                           this.updateImageCard1(files[0]);
                        }
                     } else {
                        if (nCards == 1) {
                           if (pos == 0) {
                              this.updateImageCard0(files[0]);
                           }
                        }
                     }
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
         }
      }
   },
   created() {
      if (this.nCards == 3) {
         if (this.pos == 0) {
            this.imageURL = this.imageCardConfig.cards[0].image;
         } else if (this.pos == 1) {
            this.imageURL = this.imageCardConfig.cards[1].image;
         } else if (this.pos == 2) {
            this.imageURL = this.imageCardConfig.cards[2].image;
         }
      } else {
         if (this.nCards == 2) {
            if (this.pos == 0) {
               this.imageURL = this.imageCardConfig.cards[0].image;
            } else if (this.pos == 1) {
               this.imageURL = this.imageCardConfig.cards[1].image;
            }
         } else {
            if (this.nCards == 1) {
               if (this.pos == 0) {
                  this.imageURL = this.imageCardConfig.cards[0].image;
               }
            }
         }
      }
   },
   computed: {
      ...mapState(["generalConfig", "imageCardConfig"]),
      style_div_style_focus() {
         if (this.read_only) {
            return {
               "--div-outline--hover": "0px solid #03989A",
               "--div-outline--focus": "0px solid #03989A",
               "--text-color": this.generalConfig.mainColor
            };
         } else {
            return {
               "--div-outline--hover": "2px solid #03989A",
               "--div-outline--focus": "3px solid #03989A",
               "--text-color": this.generalConfig.mainColor
            };
         }
      },

      style_display_toolbar() {
         if (this.read_only) {
            return {
               "--display": "none"
            };
         } else {
            return {
               "--display": "block"
            };
         }
      }
   }
};
</script>
