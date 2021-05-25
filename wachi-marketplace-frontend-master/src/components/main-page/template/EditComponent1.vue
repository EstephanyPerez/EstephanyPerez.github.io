<template>
   <v-card v-if="this.c1_content.editComponent1">
      <v-card-title>
         Personalización
      </v-card-title>
      <v-card-text>
         <p>Texto del título</p>
         <v-textarea
            solo
            outlined
            name="input-7-4"
            v-model="landingConfig.landingText.text"
            auto-grow
            counter="50"
            :maxlength="50"
         ></v-textarea>

         <p>Texto del botón</p>
         <v-text-field
            dense
            outlined
            v-model="landingConfig.landingText.buttonText"
            counter="20"
            :maxlength="20"
         ></v-text-field>
      </v-card-text>
   </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
   data() {
      return {
         c1_content: {
            textTitle: "",
            url: "",
            textButton: "",
            colorButton: "",
            editComponent1: false
         },
         imgBackground: "",
         textAlign: "",
         itemsAlign: ["Izquierda", "Centro", "Derecha"],
         mainColor: "", //Color primario
         secondaryColor: "" //Color secundario,
      };
   },
   computed: {
      ...mapState([
         "landingConfig",
         "generalConfig",
         "c_editComponent1",
         "landingImage"
      ])
   },
   methods: {
      ...mapActions([
         "updateComponent1Content",
         "editComponent1",
         "updateLandingImage"
      ]),
      updateContent() {
         this.updateComponent1Content(this.c1_content);
         this.editComponent1(false);
      },
      setTextAlign() {
         var translate = "";
         if (this.textAlign == "Izquierda") translate = "flex-start";
         if (this.textAlign == "Centro") translate = "center";
         if (this.textAlign == "Derecha") translate = "flex-end";
         this.landingConfig.landingText.textAlign = translate;
      }
   },

   created() {
      this.c1_content.editComponent1 = this.editComponent1;
      this.mainColor = this.generalConfig.mainColor;
      this.secondaryColor = this.generalConfig.secondaryColor;
   }
};
</script>
