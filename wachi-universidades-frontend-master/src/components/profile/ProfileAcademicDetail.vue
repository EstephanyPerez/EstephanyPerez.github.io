<template>
   <div>
      <v-card flat v-for="i in info.length" :key="i">
         <v-card flat :disabled="edit" class="mt-5 mb-10">
            <v-row>
               <v-col :cols="otherProfile != 'yes' ? 10 : 12">
                  <v-row dense no-gutters justify="center">
                     <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
                        <v-text-field
                           label="País"
                           placeholder="País"
                           prepend-icon="mdi-map-marker"
                           offset-y
                           :maxlength="60"
                           counter="60"
                           :rules="rules.countryRules"
                           onkeypress="return /[\sA-Za-zñÑáéíóúÁÉÍÓÚ]/i.test(event.key)"
                           min-width="290px"
                           v-model="info[i - 1].country"
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
                           :rules="rules.cityRules"
                           min-width="290px"
                           v-model="info[i - 1].city"
                        ></v-text-field>
                     </v-col>
                  </v-row>

                  <v-row dense no-gutters justify="center">
                     <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
                        <v-text-field
                           label="Institución Académica"
                           placeholder="Institución"
                           prepend-icon="mdi-warehouse"
                           offset-y
                           :maxlength="30"
                           counter="30"
                           min-width="290px"
                           :rules="rules.institRules"
                           v-model="info[i - 1].studyInstitution"
                        ></v-text-field>
                     </v-col>

                     <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
                        <v-text-field
                           label="Grado o Título"
                           placeholder="Grado o Título"
                           prepend-icon="mdi-clipboard-account"
                           offset-y
                           :maxlength="30"
                           counter="30"
                           :rules="rules.degreeRules"
                           min-width="290px"
                           v-model="info[i - 1].academicDegrees"
                        ></v-text-field>
                     </v-col>
                  </v-row>

                  <v-row dense no-gutters justify="center">
                     <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
                        <v-text-field
                           label="Carrera"
                           placeholder="Carrera"
                           prepend-icon="mdi-clipboard"
                           offset-y
                           :maxlength="30"
                           counter="30"
                           min-width="290px"
                           :rules="rules.careerRules"
                           v-model="info[i - 1].career"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
                        <v-checkbox
                           v-model="info[i - 1].actual"
                           label="¿Estudias actualmente aquí?"
                           @click="setEndDate(info[i - 1].actual, i - 1)"
                        ></v-checkbox>
                     </v-col>
                  </v-row>

                  <v-row dense no-gutters justify="center">
                     <v-col cols="8" sm="4" md="4" style="margin-left:20px">
                        <v-menu close-on-content-click :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                           <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                 v-model="info[i - 1].startDate"
                                 placeholder="Inicio"
                                 label="Fecha de Inicio"
                                 prepend-icon="mdi-calendar"
                                 readonly
                                 :rules="rules.initialDateRules"
                                 v-bind="attrs"
                                 v-on="on"
                              ></v-text-field>
                           </template>
                           <v-date-picker v-model="info[i - 1].startDate"></v-date-picker>
                           <!------------------------------------------------------------------------------>
                        </v-menu>
                     </v-col>

                     <v-col cols="8" sm="4" md="4" style="margin-left:20px" v-if="!info[i - 1].actual">
                        <v-menu close-on-content-click :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                           <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                 v-model="info[i - 1].endDate"
                                 placeholder="Fin"
                                 label="Fecha de Culminación"
                                 prepend-icon="mdi-calendar"
                                 readonly
                                 v-bind="attrs"
                                 v-on="on"
                              ></v-text-field>
                           </template>
                           <v-date-picker v-model="info[i - 1].endDate"></v-date-picker>
                           <!------------------------------------------------------------------------------>
                        </v-menu>
                     </v-col>
                     <v-col cols="8" sm="4" md="4" style="margin-left:20px" v-else></v-col>
                  </v-row>
                  <v-row dense no-gutters justify="center">
                     <v-col cols="8" sm="8" align-md="3" lg="8">
                        <v-textarea
                           v-model="info[i - 1].description"
                           label="Descripción:"
                           placeholder="Descripción"
                           prepend-icon="mdi-pencil"
                           offset-y
                           min-width="290px"
                           rows="3"
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
                     @click="deleteItem('academicDetail', i - 1)"
                  >
                     <v-icon>mdi-delete</v-icon>
                  </v-btn>
               </v-col>
            </v-row>
         </v-card>
         <v-divider></v-divider>
      </v-card>
   </div>
</template>

<script>
import { mapState } from "vuex";
export default {
   name: "ProfileAcademicDetail",
   props: ["edit", "info", "deleteItem", "otherProfile"],
   data() {
      return {
         rules: {
            countryRules: [v => !!v || "Ingrese el país"],
            cityRules: [v => !!v || "Ingrese la ciudad"],
            institRules: [v => !!v || "Ingrese el nombre de la institiución"],
            degreeRules: [v => !!v || "Ingrese el grado o título"],
            careerRules: [v => !!v || "Ingrese el nombre de la carrera"],
            initialDateRules: [v => !!v || "Ingrese la fecha de inicio"]
         }
      };
   },
   methods: {
      setEndDate(actual, key) {
         if (actual) {
            this.info[key].endDate = "";
         }
      }
   },
   created() {},
   computed: {
      ...mapState(["generalConfig"])
   }
};
</script>
