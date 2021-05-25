<template>
   <v-main>
      <v-card outlined tile color="#FFFFFF">
         <v-row align="center" justify="center" class="row-margin">
            <v-col
               class="div_style_focus"
               id="c3_title"
               align="center"
               justify="center"
               contenteditable="true"
               :style="style_div_style_focus"
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
               ></v-textarea>
            </v-col>
         </v-row>

         <v-row align="center" justify="center" :style="{ padding: '10px' }">
            <CardImage
               v-for="(card, pos) in imageCardConfig.cards"
               :key="'cardImage' + pos"
               :dataCard="card"
               :nCards="imageCardConfig.cards.length"
               :cards="imageCardConfig.cards"
               :pos="pos"
            />
         </v-row>
      </v-card>
      <v-row style="padding:1%" justify="center">
         <v-btn
            rounded
            :style="{
               backgroundColor: generalConfig.mainColor + ' !important',
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
                  backgroundColor: generalConfig.mainColor + ' !important',
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

<script>
import CardImage from "./CardImage";

import { mapState } from "vuex";
export default {
   name: "University3",
   components: {
      CardImage
   },
   data() {
      return {
         checkboxBases: false,
         checkboxPDF: false
      };
   },
   created() {
      for (let i = 0; i < this.imageCardConfig.buttons.length; i++) {
         if (this.imageCardConfig.buttons[i].text === "preguntas frecuentes") {
            this.checkboxPDF = true;
         } else if (
            this.imageCardConfig.buttons[i].text === "bases de comunidad"
         ) {
            this.checkboxBases = true;
         }
      }
   },
   computed: {
      ...mapState(["generalConfig", "imageCardConfig"]),
      style_div_style_focus() {
         return {
            "--text-color": this.generalConfig.mainColor
         };
      }
   },

   methods: {}
};
</script>
