<template>
   <v-main>
      <v-card outlined tile color="#FFFFFF">
         <v-row align="center" justify="center" class="row-margin">
            <v-col
               class="div_style_focus"
               id="c3_title"
               :style="style_div_style_focus"
               align="center"
               justify="center"
               contenteditable="true"
               cols="8"
            >
               <v-textarea
                  class="centered-input title-input"
                  solo
                  auto-grow
                  filled
                  dense
                  flat
                  rows="1"
                  background-color="transparent"
                  full-width
                  hide-details="true"
                  readonly
                  v-model="imageCardConfig.titleText"
                  @focus="focusElement('c3_title')"
                  @blur="blurElement('c3_title')"
               ></v-textarea>
            </v-col>
            <v-btn
               :color="!editResponsive ? 'green' : 'orange'"
               fab
               absolute
               large
               dark
               top
               right
               @click="editComponent"
               :style="{ top: '20px', right: '20px' }"
            >
               <v-icon>mdi-pencil</v-icon>
            </v-btn>
         </v-row>

         <v-row align="center" justify="center" :style="{ padding: '10px' }">
            <CardImage
               v-for="(card, pos) in imageCardConfig.cards"
               :key="card"
               :dataCard="card"
               :nCards="imageCardConfig.cards.length"
               :deleteCard="deleteCard"
               :addCard="addCard"
               :cards="imageCardConfig.cards"
               :read_only="read_only"
               :pos="pos"
            />
         </v-row>
      </v-card>
      <v-row style="padding:1%" justify="center">
         <v-btn
            rounded
            :style="{
               backgroundColor: mainColor + ' !important',
               color: generalConfig.colorText + ' !important',
               width: '220px'
            }"
            v-if="this.checkboxBases"
            >Bases comunidad
         </v-btn>
         <div style="padding-left: 2%">
            <v-btn
               rounded
               :style="{
                  backgroundColor: mainColor + ' !important',
                  color: generalConfig.colorText + ' !important',
                  width: '220px'
               }"
               v-if="this.checkboxPDF"
               >Preguntas Frecuentes</v-btn
            >
         </div>
      </v-row>
   </v-main>
</template>

<style src="@/styles/component2.css" scoped></style>
<script>
import CardImage from "./CardImage";

import { mapState, mapActions } from "vuex";
export default {
   name: "University3",
   components: {
      CardImage
   },
   props: ["mainColor", "secondaryColor", "dialogBool"],
   data() {
      return {
         read_only: true,
         editResponsive: false
      };
   },
   mounted() {
      console.log(this.imageCardConfig);
   },
   computed: {
      ...mapState(["c_editComponent1", "c_editComponent2", "c_editComponent3", "generalConfig", "checkboxPDF", "checkboxBases", "imageCardConfig"]),
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

   methods: {
      ...mapActions(["editComponent3", "editComponent1", "editComponent2", "deleteCardImageCardConfig", "editComponentContactUs"]),
      editComponent() {
         if (this.dialogBool != undefined) {
            this.editResponsive = !this.editResponsive;
            if (this.editResponsive) {
               this.read_only = false;
            } else {
               this.read_only = true;
               return;
            }
            this.editComponent3(true);
            this.dialogBool();
            return;
         }
         if (this.c_editComponent3 == true) {
            this.editComponent3(false);
            this.read_only = true;
         } else {
            this.editComponent3(true);
            this.editComponent1(false);
            this.editComponent2(false);
            this.editComponentContactUs(false);
            this.read_only = false;
         }
      },
      blurElement(itemId) {
         document.getElementById(itemId).style.outline = "0px solid #03989A";
      },
      focusElement(itemId) {
         if (!this.read_only) {
            document.getElementById(itemId).style.outline = "3px solid #03989A";
         }
      },
      deleteCard(nCards, pos) {
         console.log("Borrar card " + pos);
         console.log(nCards);
         if (nCards == 1) {
            console.log("No puedo tener menos de 1 card");
            return;
         } else {
            this.deleteCardImageCardConfig(pos);
         }
      },
      addCard(nCards, pos) {
         console.log("Agregando una nueva card");
         if (nCards == 3) {
            console.log("ERROR: Maximo 3 cards");
         } else {
            console.log("POS ADD");
            console.log(pos);
            console.log(nCards);
            const element = {
               order: pos,
               cardName: "imageCard" + pos,
               image: ""
            };
            this.imageCardConfig.cards.splice(pos, 0, element);
         }
      }
   }
};
</script>
