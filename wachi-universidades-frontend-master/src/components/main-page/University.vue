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
      <v-row style="padding: 1%" justify="center">
         <v-btn
            rounded
            @click="onClickDownloadTerms()"
            :style="{
               backgroundColor: generalConfig.mainColor + ' !important',
               color: generalConfig.colorText + ' !important',
               width: '220px',
            }"
            v-if="this.checkboxBases"
            >Bases del Programa
         </v-btn>
         <div style="padding-left: 2%">
            <v-btn
               rounded
               @click="onClickDownloadFAQ()"
               :style="{
                  backgroundColor: generalConfig.mainColor + ' !important',
                  color: generalConfig.colorText + ' !important',
                  width: '220px',
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
import * as EventDA from "@/dataAccess/eventDA.js";
import { mapState, mapActions } from "vuex";
export default {
   name: "University",
   components: {
      CardImage,
   },
   data() {
      return {
         maxLength: 200,
         checkboxBases: false,
         checkboxPDF: false,
         href: "",
         event: null,
      };
   },
   created() {
      for (let i = 0; i < this.imageCardConfig.buttons.length; i++) {
         if (this.imageCardConfig.buttons[i].text === "preguntas frecuentes") {
            this.checkboxPDF = true;
            this.href = this.imageCardConfig.buttons[i].href;
         } else if (this.imageCardConfig.buttons[i].text === "bases comunidad") {
            this.checkboxBases = true;
         }
      }
   },
   computed: {
      ...mapState(["generalConfig", "nCardsImage", "imageCardConfig"]),
      ...mapState(["community"]),
      style_div_style_focus() {
         return {
            "--div-outline--hover": "0px solid #03989A",
            "--div-outline--focus": "0px solid #03989A",
            "--text-color": this.generalConfig.mainColor,
         };
      },
   },
   mounted() {
      console.log(this.checkboxBases);
      console.log(this.checkboxPDF);
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then((response) => {
            console.log("event", response.data);
            this.event = response.data.payload;
         })
         .catch((error) => {
            console.log("error al obtener backend event + ", error);
         });
   },
   methods: {
      ...mapActions(["updateComponenteUniversity", "editComponent3", "editComponent1", "editComponent2", "deleteCardImageCardConfig"]),
      onClickDownloadTerms() {
         var fileLink = document.createElement("a");
         fileLink.href = this.event.termsURL;
         fileLink.target = "_blank";
         fileLink.setAttribute("download", this.event.termsFilename);
         document.body.appendChild(fileLink);

         fileLink.click();
      },
      onClickDownloadFAQ() {
         var fileLink = document.createElement("a");
         fileLink.href = this.event.faqURL;
         fileLink.target = "_blank";
         fileLink.setAttribute("download", this.event.faqFilename);
         document.body.appendChild(fileLink);

         fileLink.click();
      },
   },
};
</script>
