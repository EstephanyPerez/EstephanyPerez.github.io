<template>
   <v-col
      cols="12"
      :sm="12 / nCards - 1"
      align="center"
      justify="center"
      :style="{ margin: '0 15px' }"
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
               <v-img
                  lazy-src="https://picsum.photos/id/11/10/6"
                  :src="dataCard.image"
                  alt="Imagen de la tarjeta"
                  height="220"
                  class="align-center"
                  v-if="dataCard.image != ''"
               />
            </v-card>
         </v-col>
      </v-row>
   </v-col>
</template>
<script>
import { mapState } from "vuex";

export default {
   name: "CardImage",
   props: ["nCards", "dataCard", "cards", "pos"],
   computed: {
      ...mapState(["generalConfig"]),
      style_div_style_focus() {
         return {
            "--div-outline--hover": "0px solid #03989A",
            "--div-outline--focus": "0px solid #03989A",
            "--text-color": this.generalConfig.mainColor
         };
      }
   }
};
</script>
