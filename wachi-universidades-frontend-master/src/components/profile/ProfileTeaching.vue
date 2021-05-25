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
                           offset-y
                           min-width="290px"
                           v-model="info[i - 1].country"
                           :rules="rules.countryRules"
                           onkeypress="return /[\sA-Za-zñÑáéíóúÁÉÍÓÚ]/i.test(event.key)"
                           :maxlength="60"
                           counter="60"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
                        <v-text-field
                           label="Ciudad"
                           placeholder="Ciudad"
                           prepend-icon="mdi-city"
                           offset-y
                           min-width="290px"
                           :rules="rules.cityRules"
                           :maxlength="90"
                           counter="90"
                           v-model="info[i - 1].city"
                        ></v-text-field>
                     </v-col>
                  </v-row>
                  <v-row dense no-gutters justify="center">
                     <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
                        <v-text-field
                           v-model="info[i - 1].teachInstitution"
                           label="Institución educativa"
                           placeholder="Institución educativa"
                           prepend-icon="mdi-warehouse"
                           offset-y
                           :rules="rules.institRules"
                           min-width="290px"
                           :maxlength="30"
                           counter="30"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
                        <v-text-field
                           v-model="info[i - 1].knowledge"
                           label="Área de conocimiento"
                           placeholder="Conocimiento"
                           prepend-icon="mdi-brain"
                           :rules="rules.knowRules"
                           offset-y
                           min-width="290px"
                           :maxlength="30"
                           counter="30"
                        ></v-text-field>
                     </v-col>
                  </v-row>

                  <v-row dense no-gutters justify="center">
                     <v-col cols="8" sm="4" md="4" style="margin-left:20px">
                        <v-menu :close-on-content-click="true" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                           <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                 v-model="info[i - 1].startDate"
                                 placeholder="Inicio"
                                 label="Fecha de Inicio"
                                 prepend-icon="mdi-calendar"
                                 :rules="rules.initialDateRules"
                                 readonly
                                 v-bind="attrs"
                                 v-on="on"
                              ></v-text-field>
                           </template>
                           <v-date-picker v-model="info[i - 1].startDate"></v-date-picker>
                           <!------------------------------------------------------------------------------>
                        </v-menu>
                     </v-col>

                     <v-col cols="8" sm="4" md="4" style="margin-left:20px" v-if="!info[i - 1].actual">
                        <v-menu :close-on-content-click="true" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
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
                     <v-col cols="8" sm="4" align-md="3" style="margin-left:20px">
                        <v-checkbox
                           v-model="info[i - 1].actual"
                           label="¿Enseñas actualmente aquí?"
                           @click="setEndDate(info[i - 1].actual, i - 1)"
                        ></v-checkbox>
                     </v-col>
                     <v-col cols="8" sm="4" align-md="3" style="margin-left:20px">
                        <label v-if="otherProfile != 'yes'">
                           Agregar cursos:
                        </label>

                        <v-btn
                           v-if="otherProfile != 'yes'"
                           class="ml-3"
                           :style="{
                              backgroundColor: generalConfig.mainColor + ' !important',
                              color: 'white !important'
                           }"
                           fab
                           dark
                           light
                           small
                           @click="clickAdd(i - 1)"
                        >
                           <v-icon>mdi-plus</v-icon>
                        </v-btn>
                     </v-col>
                  </v-row>
                  <v-container dense no-gutters v-for="j in info[i - 1].courses.length" :key="j">
                     <v-divider></v-divider>
                     <v-row justify="center">
                        <v-col cols="7" sm="4" align-md="3" style="margin-left:20px">
                           <v-menu :close-on-content-click="true" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                              <template v-slot:activator="{ on, attrs }">
                                 <v-text-field
                                    v-model="info[i - 1].courses[j - 1].startDate"
                                    placeholder="Inicio"
                                    label="Fecha de Inicio"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    :rules="rules.initialDateRules"
                                    v-bind="attrs"
                                    v-on="on"
                                 ></v-text-field>
                              </template>
                              <v-date-picker v-model="info[i - 1].courses[j - 1].startDate"></v-date-picker>
                              <!------------------------------------------------------------------------------>
                           </v-menu>
                        </v-col>
                        <v-col cols="7" sm="4" align-md="3" style="margin-left:20px">
                           <v-menu :close-on-content-click="true" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                              <template v-slot:activator="{ on, attrs }">
                                 <v-text-field
                                    v-model="info[i - 1].courses[j - 1].endDate"
                                    placeholder="Fin"
                                    label="Fecha de Culminación"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                 ></v-text-field>
                              </template>
                              <v-date-picker v-model="info[i - 1].courses[j - 1].endDate"></v-date-picker>
                           </v-menu>
                        </v-col>
                     </v-row>

                     <v-row justify="center">
                        <v-col cols="7" sm="4" align-md="3" style="margin-left:20px">
                           <v-text-field
                              label="Nombre del curso"
                              placeholder="Curso"
                              prepend-icon="mdi-bookshelf"
                              offset-y
                              :maxlength="30"
                              counter="30"
                              :rules="rules.courseRules"
                              min-width="290px"
                              v-model="info[i - 1].courses[j - 1].schoolSubject"
                           ></v-text-field>
                        </v-col>
                        <v-col cols="7" sm="4" align-md="3" style="margin-left:20px" justify="center">
                           <div style="width: fit-content; margin: auto">
                              <v-btn
                                 v-if="otherProfile != 'yes'"
                                 class="ml-2"
                                 :style="{
                                    backgroundColor: generalConfig.mainColor + ' !important',
                                    color: 'white !important'
                                 }"
                                 fab
                                 dark
                                 light
                                 small
                                 @click="clickDelete(i - 1, j - 1)"
                              >
                                 <v-icon>mdi-delete</v-icon>
                              </v-btn>
                           </div>
                        </v-col>
                     </v-row>
                  </v-container>
               </v-col>
               <v-col cols="1" style="padding-right:0px; padding-left:0px" v-if="otherProfile != 'yes'">
                  <v-btn
                     :style="{
                        backgroundColor: generalConfig.mainColor + ' !important',
                        color: 'white !important'
                     }"
                     fab
                     small
                     @click="deleteItem('teaching', i - 1)"
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
   name: "ProfileTeaching",
   props: ["edit", "info", "deleteItem", "otherProfile"],
   data() {
      return {
         rules: {
            countryRules: [v => !!v || "Ingrese el país"],
            cityRules: [v => !!v || "Ingrese la ciudad"],
            courseRules: [v => !!v || "Ingrese el nombre del curso"],
            institRules: [v => !!v || "Ingrese el nombre de la institución"],
            knowRules: [v => !!v || "Ingrese el área del área de conocimiento"],
            initialDateRules: [v => !!v || "Ingrese la fecha de inicio"]
         }
      };
   },
   methods: {
      setEndDate(actual, key) {
         if (actual) {
            this.info[key].endDate = "";
         }
      },
      clickAdd(key) {
         if (this.info[key].courses.length < 10) {
            this.info[key].courses.push({
               schoolSubject: "",
               startDate: "",
               endDate: ""
            });
         }
      },
      clickDelete(key, key2) {
         if (this.info[key].courses.length > 0) this.info[key].courses.splice(key2, 1);
      }
   },
   mounted() {},
   computed: {
      ...mapState(["generalConfig"])
   }
};
</script>
