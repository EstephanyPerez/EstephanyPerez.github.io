<template>
   <v-card v-if="this.c_editComponent3">
      <v-card-title>
         Personalización componente 3
      </v-card-title>
      <v-card-text>
         <p>Texto del título</p>
         <v-textarea
            solo
            name="input-7-4"
            v-model="imageCardConfig.titleText"
            filled
            rows="3"
            dense
            placeholder="Título"
            @focus="focusSelectItem('c3_title')"
            @blur="leaveSelectedItem('c3_title')"
         ></v-textarea>
      </v-card-text>
   </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
   data() {
      return {
         imgBackground: [],
         flagParts: [],
         editComponent: false
      };
   },
   computed: {
      ...mapState(["generalConfig", "imageCardConfig", "c_editComponent3", "card0", "card1", "card2"])
   },
   methods: {
      ...mapActions([
         "updateComponent1Content",
         "editComponent1",
         "activatePdfButton",
         "activateBasesButton",
         "updateImageCard0",
         "updateImageCard1",
         "updateImageCard2"
      ]),
      previewImage(pos) {
         if (pos == 0) {
            this.updateImageCard0(this.imgBackground[0]);
            let imageCard1 = URL.createObjectURL(this.imgBackground[0]);
            localStorage.setItem("imageCard1", imageCard1);
         } else if (pos == 1) {
            this.updateImageCard1(this.imgBackground[1]);
            let imageCard2 = URL.createObjectURL(this.imgBackground[1]);
            localStorage.setItem("imageCard2", imageCard2);
         } else {
            this.updateImageCard2(this.imgBackground[2]);
            let imageCard3 = URL.createObjectURL(this.imgBackground[2]);
            localStorage.setItem("imageCard3", imageCard3);
         }
      },
      focusSelectItem(itemId) {
         document.getElementById(itemId).style.outline = "3px solid #03989A";
      },
      leaveSelectedItem(itemId) {
         document.getElementById(itemId).style.outline = "0px solid #03989A";
      }
   }
};
</script>
