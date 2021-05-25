<template>
   <div>
      <v-card flat v-for="i in info.length" :key="i">
         <v-card flat :disabled="edit" class="mt-5 mb-16">
            <v-row>
               <v-col :cols="otherProfile != 'yes' ? 10 : 12">
                  <v-row dense no-gutters justify="center">
                     <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
                        <v-text-field
                           label="País"
                           placeholder="País"
                           prepend-icon="mdi-map-marker"
                           onkeypress="return /[\sA-Za-zñÑáéíóúÁÉÍÓÚ]/i.test(event.key)"
                           offset-y
                           min-width="290px"
                           :maxlength="60"
                           counter="60"
                           v-model="info[i - 1].country"
                           :rules="rules.countryRules"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
                        <v-text-field
                           label="Ciudad"
                           placeholder="Ciudad"
                           prepend-icon="mdi-city"
                           offset-y
                           :maxlength="90"
                           counter="90"
                           min-width="290px"
                           v-model="info[i - 1].city"
                           :rules="rules.cityRules"
                        ></v-text-field>
                     </v-col>
                  </v-row>
                  <v-row dense no-gutters justify="center">
                     <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
                        <v-text-field
                           v-model="info[i - 1].awardName"
                           label="Premio"
                           placeholder="Premio"
                           prepend-icon="mdi-license"
                           offset-y
                           :maxlength="30"
                           counter="30"
                           :rules="rules.achievementRules"
                           min-width="290px"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="8" sm="4" md="4" style="margin-left:20px">
                        <v-menu close-on-content-click :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                           <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                 v-model="info[i - 1].date"
                                 placeholder="Inicio"
                                 label="Fecha de Inicio"
                                 prepend-icon="mdi-calendar"
                                 readonly
                                 :rules="rules.initialDateRules"
                                 v-bind="attrs"
                                 v-on="on"
                              ></v-text-field>
                           </template>
                           <v-date-picker v-model="info[i - 1].date"></v-date-picker>
                           <!------------------------------------------------------------------------------>
                        </v-menu>
                     </v-col>
                  </v-row>

                  <v-row dense no-gutters justify="center">
                     <v-col cols="8" sm="8" align-md="3" lg="8">
                        <v-textarea
                           v-model="info[i - 1].description"
                           label="Descripción:"
                           placeholder="Descripción"
                           prepend-icon="mdi-pencil"
                           offset-y
                           :maxlength="300"
                           counter="300"
                           min-width="290px"
                           rows="2"
                        ></v-textarea>
                     </v-col>
                  </v-row>
               </v-col>
               <v-col cols="1" style="padding-right:0px; padding-left:0px" v-if="otherProfile != 'yes'">
                  <v-btn
                     :style="{
                        backgroundColor: generalConfig.mainColor + ' !important',
                        color: 'white !important'
                     }"
                     fab
                     small
                     @click="deleteItem('achievement', i - 1)"
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
   name: "ProfileAchievement",
   props: ["edit", "info", "deleteItem", "otherProfile"],
   data() {
      return {
         rules: {
            countryRules: [v => !!v || "Ingrese el país"],
            cityRules: [v => !!v || "Ingrese la ciudad"],
            achievementRules: [v => !!v || "Ingrese el nombre de la empresa"],
            initialDateRules: [v => !!v || "Ingrese la fecha de inicio"]
         }
      };
   },
   created() {},
   computed: {
      ...mapState(["generalConfig"])
   }
};
</script>
