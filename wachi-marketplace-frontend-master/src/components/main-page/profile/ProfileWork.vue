<template>
   <div>
      <v-card flat v-for="i in info.length" :key="i">
         <v-card flat :disabled="edit" class="mt-5 mb-16">
            <v-row>
               <v-col :cols="otherProfile != 'yes' ? 10 : 12">
                  <v-row dense no-gutters justify="center">
                     <v-col
                        cols="8"
                        sm="4"
                        align-md="3"
                        lg="4"
                        style="margin-left:20px"
                     >
                        <v-text-field
                           label="País"
                           placeholder="País"
                           prepend-icon="mdi-map-marker"
                           offset-y
                           :maxlength="60"
                           counter="60"
                           min-width="290px"
                           :rules="rules.countryRules"
                           onkeypress="return /[\sA-Za-zñÑáéíóúÁÉÍÓÚ]/i.test(event.key)"
                           v-model="info[i - 1].country"
                        ></v-text-field>
                     </v-col>
                     <v-col
                        cols="8"
                        sm="4"
                        align-md="3"
                        lg="4"
                        style="margin-left:20px"
                     >
                        <v-text-field
                           label="Ciudad"
                           placeholder="Ciudad"
                           :maxlength="90"
                           counter="90"
                           prepend-icon="mdi-city"
                           offset-y
                           min-width="290px"
                           :rules="rules.cityRules"
                           v-model="info[i - 1].city"
                        ></v-text-field>
                     </v-col>
                  </v-row>

                  <v-row dense no-gutters justify="center">
                     <v-col
                        cols="8"
                        sm="4"
                        align-md="3"
                        lg="4"
                        style="margin-left:20px"
                     >
                        <v-text-field
                           label="Nombre de la empresa"
                           placeholder="Empresa"
                           prepend-icon="mdi-clipboard"
                           offset-y
                           :maxlength="30"
                           counter="30"
                           min-width="290px"
                           :rules="rules.companyRules"
                           v-model="info[i - 1].company"
                        ></v-text-field>
                     </v-col>

                     <v-col
                        cols="8"
                        sm="4"
                        align-md="3"
                        lg="4"
                        style="margin-left:20px"
                     >
                        <v-text-field
                           label="Área de la empresa"
                           placeholder="Área"
                           prepend-icon="mdi-clipboard-account"
                           offset-y
                           :maxlength="30"
                           counter="30"
                           min-width="290px"
                           v-model="info[i - 1].companyArea"
                           :rules="rules.areaRules"
                        ></v-text-field>
                     </v-col>
                  </v-row>

                  <v-row dense no-gutters justify="center">
                     <v-col
                        cols="8"
                        sm="4"
                        align-md="3"
                        lg="4"
                        style="margin-left:20px"
                     >
                        <v-text-field
                           label="Cargo Ocupacional"
                           placeholder="Cargo"
                           prepend-icon="mdi-bell-alert"
                           offset-y
                           min-width="290px"
                           :maxlength="30"
                           counter="30"
                           v-model="info[i - 1].occupation"
                           :rules="rules.positionRules"
                        ></v-text-field>
                     </v-col>
                     <v-col
                        cols="8"
                        sm="4"
                        align-md="3"
                        lg="4"
                        style="margin-left:20px"
                     >
                        <v-checkbox
                           v-model="info[i - 1].actual"
                           label="¿Trabajas actualmente aquí?"
                           @click="setEndDate(info[i - 1].actual, i - 1)"
                        ></v-checkbox>
                     </v-col>
                  </v-row>
                  <v-row dense no-gutters justify="center">
                     <v-col cols="8" sm="4" md="4" style="margin-left:20px">
                        <v-menu
                           :close-on-content-click="false"
                           :nudge-right="40"
                           transition="scale-transition"
                           offset-y
                           min-width="290px"
                        >
                           <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                 v-model="info[i - 1].startDate"
                                 placeholder="Inicio"
                                 label="Fecha de Inicio"
                                 prepend-icon="mdi-calendar"
                                 readonly
                                 v-bind="attrs"
                                 v-on="on"
                                 :rules="rules.initialDateRules"
                              ></v-text-field>
                           </template>
                           <v-date-picker
                              :max="getEndDate"
                              dark
                              v-model="info[i - 1].startDate"
                              @input="menu2 = false"
                           ></v-date-picker>
                        </v-menu>
                     </v-col>

                     <v-col
                        cols="8"
                        sm="4"
                        md="4"
                        style="margin-left:20px"
                        v-if="!info[i - 1].actual"
                     >
                        <v-menu
                           :close-on-content-click="false"
                           :nudge-right="40"
                           transition="scale-transition"
                           offset-y
                           min-width="290px"
                        >
                           <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                 v-model="info[i - 1].endDate"
                                 placeholder="Fin"
                                 label="Fecha de Culminación"
                                 prepend-icon="mdi-calendar"
                                 readonly
                                 v-bind="attrs"
                                 v-on="on"
                                 :rules="rules.initialDateRules"
                              ></v-text-field>
                           </template>
                           <v-date-picker
                              dark
                              v-model="info[i - 1].endDate"
                              @input="menu = false"
                              :max="getMinDate"
                           ></v-date-picker>
                        </v-menu>
                     </v-col>
                     <v-col
                        cols="6"
                        sm="4"
                        md="4"
                        style="margin-left:20px"
                        v-else
                     ></v-col>
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
                           :maxlength="300"
                           counter="300"
                           rows="3"
                        ></v-textarea>
                     </v-col>
                  </v-row>
               </v-col>
               <v-col
                  cols="1"
                  style="padding-right:0px; padding-left:0px"
                  v-if="otherProfile != 'yes'"
               >
                  <v-btn
                     :style="{
                        backgroundColor:
                           generalConfig.mainColor + ' !important',
                        color: 'white !important'
                     }"
                     style="margin-right:10px"
                     fab
                     small
                     @click="deleteItem('work', i - 1)"
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
   name: "ProfileWork",
   props: ["edit", "info", "deleteItem", "otherProfile"],
   data() {
      return {
         menu: false,
         menu2: false,
         datesStart: [],
         datesEnd: [],
         menusStart: [],
         menusEnd: [],

         rules: {
            countryRules: [v => !!v || "Ingrese el país"],
            cityRules: [v => !!v || "Ingrese la ciudad"],
            companyRules: [v => !!v || "Ingrese el nombre de la empresa"],
            areaRules: [v => !!v || "Ingrese el área de la empresa"],
            positionRules: [v => !!v || "Ingrese el cargo ocupacional"],
            initialDateRules: [v => !!v || "Ingrese la fecha de inicio"]
         },
         dateYear: new Date()
      };
   },
   methods: {
      setEndDate(active, key) {
         if (active) {
            this.info[key].endDate = null;
         }
      }
   },
   created() {
      for (let i = 0; i < this.info.length; i++) {
         this.menusStart.push(false);
         this.menusEnd.push(false);
         this.datesStart.push(new Date().toISOString().substr(0, 10));
         this.datesEnd.push(new Date().toISOString().substr(0, 10));
      }
   },
   computed: {
      ...mapState(["generalConfig"]),
      getEndDate() {
         var endDate = new Date(this.dateYear.getFullYear(), 12, 0);
         return endDate.toISOString().slice(0, 10);
      },
      getMinDate() {
         var endDate = new Date(
            this.dateYear.getFullYear(),
            this.dateYear.getMonth(),
            this.dateYear.getDate()
         );
         return endDate.toISOString().slice(0, 10);
      }
   }
};
</script>
