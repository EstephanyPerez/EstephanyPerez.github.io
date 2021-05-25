<template>
   <div>
      <v-card flat v-for="i in info.length" :key="i">
         <v-card flat :disabled="edit" class="mt-5 mb-16">
            <v-row>
               <v-col cols="10">
                  <v-row dense no-gutters justify="center">
                     <v-col cols="8" sm="8" align-md="3" lg="8">
                        <v-text-field
                           v-model="info[i - 1].description"
                           label="Idioma"
                           placeholder="Nombre del idioma"
                           :rules="rules.languageRules"
                           :maxlength="30"
                           counter="30"
                           prepend-icon="mdi-pencil"
                           offset-y
                           min-width="290px"
                        ></v-text-field>
                     </v-col>
                     <v-col
                        cols="12"
                        sm="4"
                        align-md="3"
                        lg="9"
                        style="margin-left:20px"
                     ></v-col>
                  </v-row>

                  <v-row dense no-gutters justify="center">
                     <v-col
                        cols="8"
                        sm="4"
                        align-md="3"
                        lg="4"
                        style="margin-left:20px"
                     >
                        <v-select
                           v-model="info[i - 1].writingLevel"
                           :items="levels"
                           placeholder="Nivel de escritura"
                           label="Nivel de escritura"
                           prepend-icon="mdi-clipboard-account"
                           offset-y
                           min-width="290px"
                        ></v-select>
                     </v-col>

                     <v-col
                        cols="8"
                        sm="4"
                        align-md="3"
                        lg="4"
                        style="margin-left:20px"
                     >
                        <v-select
                           v-model="info[i - 1].readingLevel"
                           :items="levels"
                           label="Nivel de lectura"
                           placeholder="Nivel de lectura"
                           prepend-icon="mdi-clipboard-account"
                           offset-y
                           min-width="290px"
                        ></v-select>
                     </v-col>
                  </v-row>
               </v-col>
               <v-col cols="1" style="padding-right:0px; padding-left:0px">
                  <v-btn
                     :style="{
                        backgroundColor:
                           generalConfig.mainColor + ' !important',
                        color: 'white !important'
                     }"
                     fab
                     small
                     @click="deleteItem('language', i - 1)"
                  >
                     <v-icon>mdi-delete</v-icon>
                  </v-btn>
               </v-col>
            </v-row>
         </v-card>
         <v-divider> </v-divider>
      </v-card>
   </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   name: "ProfileLanguage",
   props: ["edit", "info", "deleteItem"],
   data() {
      return {
         rules: {
            languageRules: [v => !!v || "Ingrese el idioma"]
         },
         levels: ["Básico", "Intermedio", "Avanzado"]
      };
   },
   computed: {
      ...mapState(["generalConfig"])
   }
};
</script>
