<template>
   <!-- START: BODY-CONTAINER -->
   <v-main>
      <v-card id="cardColor" outlined tile color="#F6F6F6">
         <!-- Title -->
         <v-row align="center" justify="center" class="row-margin">
            <v-col align="center" justify="center" cols="8" class="div_style_focus" :style="style_div_style_focus" id="div-titleC2">
               <v-textarea
                  class="centered-input title-input"
                  solo
                  name="input-7-4"
                  v-model="multiCardConfig.title.text"
                  auto-grow
                  filled
                  dense
                  flat
                  rows="1"
                  background-color="transparent"
                  @focus="focusElement('div-titleC2')"
                  @blur="blurElement('div-titleC2')"
                  full-width
                  hide-details="true"
                  readonly
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

         <!-- Paragraph -->
         <v-row align="center" justify="center" class="row-margin">
            <v-col class="div_style_focus" id="div-ParagraphC2" :style="style_div_style_focus" align="center" justify="center" cols="6">
               <v-textarea
                  class="centered-input paragraph-input"
                  solo
                  v-model="multiCardConfig.description.text"
                  auto-grow
                  filled
                  dense
                  flat
                  background-color="transparent"
                  @focus="focusElement('div-ParagraphC2')"
                  @blur="blurElement('div-ParagraphC2')"
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
               :key="card"
               :dataCard="card"
               :nCards="multiCardConfig.cards.length"
               :pos="pos"
               :deleteCard="deleteCard"
               :addCard="addCard"
               :cards="multiCardConfig.cards"
               :read_only="read_only"
               :cardName="card.cardName"
               :mainColor="mainColor"
               :secondary="secondaryColor"
            />
         </v-row>
      </v-card>
   </v-main>
</template>

<style src="@/styles/component1.css" scoped></style>

<script>
import { mapState, mapActions } from "vuex";
import CardItem from "@/components/main-page/Template/CardItem.vue";

export default {
   name: "Component2",
   props: ["mainColor", "secondaryColor", "dialogBool"],
   components: {
      CardItem
   },
   data() {
      return {
         read_only: true,
         posAnt: 0,
         editResponsive: false
      };
   },
   created() {
      this.posAnt = this.multiCardConfig.cards.length;
   },
   computed: {
      ...mapState(["multiCardConfig", "c_editComponent1", "c_editComponent2", "c_editComponent3"]),
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
      ...mapActions(["deleteCardC2", "editComponent1", "editComponent2", "editComponent3", "addCardC2", "editComponentContactUs"]),
      editComponent() {
         if (this.dialogBool != undefined) {
            this.editResponsive = !this.editResponsive;
            if (this.editResponsive) {
               this.read_only = false;
            } else {
               this.read_only = true;
               return;
            }
            this.editComponent2(true);
            this.dialogBool();
            return;
         }
         //console.log(this.multiCardConfig);
         if (this.c_editComponent2 == true) {
            this.editComponent2(false);
            this.read_only = true;
         } else {
            this.editComponent2(true);
            this.editComponent1(false);
            this.editComponent3(false);
            this.editComponentContactUs(false);
            this.read_only = false;
         }
      },

      deleteCard(nCards, pos) {
         if (nCards == 1) {
            console.log("No puedo tener menos de 1 card");
            return;
         } else {
            this.deleteCardC2(pos);
         }
      },
      addCard(nCards, pos) {
         if (nCards == 3) {
            console.log("ERROR: Maximo 3 cards");
         } else {
            const element = {
               order: pos,
               cardName: "multiCard" + pos,
               image: "",
               title: "",
               text: "",
               align: "center"
            };
            this.multiCardConfig.cards.splice(pos, 0, element);
         }
      },
      blurElement(itemId) {
         document.getElementById(itemId).style.outline = "0px solid #03989A";
      },
      focusElement(itemId) {
         if (!this.read_only) {
            document.getElementById(itemId).style.outline = "3px solid #03989A";
         }
      }
   }
};
</script>
