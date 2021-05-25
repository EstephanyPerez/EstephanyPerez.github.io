<template>
   <!-- START: BODY-CONTAINER -->
   <v-main>
      <v-card v-if="!loading" id="cardColor" outlined tile color="#F6F6F6">
         <!-- Title -->
         <v-row
            v-if="multiCardConfig.title.text != ''"
            align="center"
            justify="center"
            class="row-margin"
         >
            <v-col
               align="center"
               justify="center"
               cols="8"
               class="div_style_focus"
               :style="style_div_style_focus"
               id="div-titleC2"
            >
               <v-textarea
                  class="centered-input title-input"
                  solo
                  v-model="multiCardConfig.title.text"
                  auto-grow
                  filled
                  dense
                  flat
                  rows="1"
                  background-color="transparent"
                  full-width
                  hide-details="true"
                  readonly
               ></v-textarea>
            </v-col>
         </v-row>

         <!-- Paragraph -->
         <v-row
            align="center"
            v-if="multiCardConfig.description.text != ''"
            justify="center"
            class="row-margin"
         >
            <v-col
               class="div_style_focus"
               id="div-ParagraphC2"
               :style="style_div_style_focus"
               align="center"
               justify="center"
               cols="6"
            >
               <v-textarea
                  class="centered-input paragraph-input"
                  solo
                  v-model="multiCardConfig.description.text"
                  auto-grow
                  filled
                  dense
                  flat
                  background-color="transparent"
                  full-width
                  hide-details="true"
                  readonly
               ></v-textarea>
            </v-col>
         </v-row>

         <!-- Cards -->
         <v-row align="center" justify="center" :style="{ padding: '10px' }">
            <CardItem
               v-for="(card, pos) in multiCardConfig.cards"
               :key="'card' + pos"
               :dataCard="card"
               :nCards="multiCardConfig.cards.length"
               :pos="pos"
               :cards="multiCardConfig.cards"
               :cardName="card.cardName"
            />
         </v-row>
      </v-card>
      <div v-if="loading">
         ...
      </div>
   </v-main>
</template>

<style src="@/styles/Component1.css" scoped></style>

<script>
import { mapState } from "vuex";
import CardItem from "@/components/main-page/CardItem.vue";

export default {
   name: "Component2",
   components: {
      CardItem
   },
   data() {
      return {
         loading: true,
         read_only: true,
         posAnt: 0
      };
   },
   created() {
      this.posAnt = this.multiCardConfig.cards.length;
      this.loading = false;
   },
   computed: {
      ...mapState([
         "multiCardConfig",
         "generalConfig",
         "c_editComponent1",
         "c_editComponent2",
         "c_editComponent3"
      ]),
      style_div_style_focus() {
         return {
            "--text-color": this.generalConfig.mainColor
         };
      }
   }
};
</script>
