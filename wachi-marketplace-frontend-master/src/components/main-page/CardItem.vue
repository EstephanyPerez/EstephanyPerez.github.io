<template>
   <v-col
      cols="12"
      :sm="12 / nCards - 1"
      align="center"
      justify="center"
      :style="{ alignSelf: 'flex-start', margin: '0 15px' }"
   >
      <v-row class="row-card">
         <v-col class="col-card" :style="style_div_style_focus" tabindex="1">
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
                     :src="dataCard.image"
                     alt="Imagen de la tarjeta"
                     height="220"
                  />
               </div>

               <!-- Title Card-->
               <v-row
                  align="center"
                  justify="center"
                  :style="{ display: displayTitle }"
               >
                  <v-col
                     class="div_style_focus c2_card_title"
                     :style="style_div_style_focus"
                     align="center"
                     justify="center"
                     cols="8"
                     :id="'title-card-text' + pos"
                  >
                     <v-textarea
                        class="centered-input card_title"
                        solo
                        v-model="dataCard.title"
                        auto-grow
                        filled
                        dense
                        flat="false"
                        rows="1"
                        background-color="transparent"
                        full-width="true"
                        hide-details="true"
                        readonly
                     ></v-textarea>
                  </v-col>
               </v-row>

               <!-- Body Text Card-->
               <v-row
                  align="center"
                  justify="center"
                  :style="{ display: displayText }"
               >
                  <v-col
                     class="div_style_focus c2_card_body_text"
                     align="center"
                     justify="center"
                     :id="'body-card-text' + pos"
                     cols="11"
                  >
                     <v-textarea
                        solo
                        v-model="dataCard.text"
                        auto-grow
                        filled
                        dense
                        flat="false"
                        rows="1"
                        background-color="transparent"
                        full-width="true"
                        hide-details="true"
                        readonly
                        :id="'text-card-text' + pos"
                     ></v-textarea>
                  </v-col>
               </v-row>
            </v-card>
         </v-col>
      </v-row>
   </v-col>
</template>

<script>
import { mapState } from "vuex";
export default {
   name: "CardItem",
   components: {},
   data() {
      return {
         flag_parts: [true, true, true], //[Imagen, titulo, texto]
         displayTitle: "block",
         displayText: "block"
      };
   },
   props: ["pos", "dataCard", "nCards", "cards", "srcImage"],
   mounted() {
      var _text = "text-card-text" + this.pos;
      console.log("_text", _text);
      document.getElementById(_text).style.textAlign = this.dataCard.align;
   },
   computed: {
      ...mapState(["generalConfig"]),
      style_div_style_focus() {
         return {
            "--text-color": this.generalConfig.mainColor
         };
      }
   },
   beforeMount() {
      console.log("dataCard:", this.dataCard);
      if (typeof this.dataCard.text == "undefined") {
         this.displayText = "none";
      } else {
         this.displayText = "block";
      }

      if (typeof this.dataCard.title == "undefined") {
         this.displayTitle = "none";
      } else {
         this.displayTitle = "block";
      }
      console.log("display:", this.displayTitle, " ", this.displayText);
   },
   updated() {
      console.log(this.dataCard);
      console.log("Componente actualizado");
      this.readImage(this.dataCard.image);
   }
};
</script>
