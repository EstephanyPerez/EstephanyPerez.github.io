<template>
   <div>
      <v-card flat :disabled="edit" class="mt-5 ">
         <v-row dense no-gutters justify="center">
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-select
                  v-if="sellerBD"
                  :items="items"
                  disabled
                  label="¿Deseas ser vendedor?"
                  outlined
                  v-model="info.sellerString"
               ></v-select>
               <v-select
                  v-else
                  :items="items"
                  label="¿Deseas ser vendedor?"
                  outlined
                  v-model="info.sellerString"
                  @input="updateOtherFields"
               ></v-select>
            </v-col>

            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-if="info.sellerString == 'No'"
                  disabled
                  v-model="info.businessName"
                  label="Nombre del negocio"
                  placeholder="Nombre"
                  prepend-icon="mdi-star"
                  offset-y
                  min-width="290px"
                  :maxlength="50"
                  counter="50"
               ></v-text-field>

               <v-text-field
                  v-else
                  v-model="info.businessName"
                  label="Nombre del negocio"
                  placeholder="Nombre"
                  prepend-icon="mdi-star"
                  offset-y
                  min-width="290px"
                  :maxlength="50"
                  counter="50"
                  :rules="rules.companyRules"
               ></v-text-field>
            </v-col>
         </v-row>
         <v-row dense no-gutters justify="center">
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-if="info.sellerString == 'No'"
                  disabled
                  v-model="info.company"
                  label="Organización"
                  placeholder="Organización"
                  prepend-icon="mdi-warehouse"
                  offset-y
                  min-width="290px"
                  :maxlength="30"
                  counter="30"
               ></v-text-field>

               <v-text-field
                  v-else
                  v-model="info.company"
                  label="Organización"
                  placeholder="Organización"
                  prepend-icon="mdi-warehouse"
                  offset-y
                  min-width="290px"
                  :maxlength="30"
                  counter="30"
               ></v-text-field>
            </v-col>
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-if="info.sellerString == 'No'"
                  disabled
                  v-model="info.legalRepresentant"
                  label="Representante legal"
                  placeholder="Representante"
                  prepend-icon="mdi-gavel"
                  offset-y
                  min-width="290px"
                  :maxlength="30"
                  counter="30"
               ></v-text-field>

               <v-text-field
                  v-else
                  v-model="info.legalRepresentant"
                  label="Representante legal"
                  placeholder="Representante"
                  prepend-icon="mdi-gavel"
                  offset-y
                  min-width="290px"
                  :maxlength="30"
                  counter="30"
               ></v-text-field>
            </v-col>
         </v-row>

         <v-row dense no-gutters justify="center">
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-if="info.sellerString == 'No'"
                  v-model="info.ruc"
                  disabled
                  label="RUC"
                  placeholder="RUC"
                  pattern="\d*"
                  prepend-icon="mdi-card"
                  offset-y
                  min-width="290px"
                  :maxlength="11"
                  counter="11"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  type="number"
               ></v-text-field>
               <v-text-field
                  v-else
                  v-model="info.ruc"
                  label="RUC"
                  placeholder="RUC"
                  pattern="\d*"
                  prepend-icon="mdi-card"
                  offset-y
                  min-width="290px"
                  :maxlength="11"
                  counter="11"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  type="number"
               ></v-text-field>
            </v-col>
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-if="info.sellerString == 'No'"
                  v-model="info.phone"
                  disabled
                  label="Número telefónico"
                  placeholder="Teléfono"
                  type="number"
                  prepend-icon="mdi-phone"
                  offset-y
                  min-width="290px"
                  :maxlength="15"
                  counter="15"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
               ></v-text-field>
               <v-text-field
                  v-else
                  v-model="info.phone"
                  label="Número telefónico"
                  placeholder="Teléfono"
                  type="number"
                  prepend-icon="mdi-phone"
                  offset-y
                  min-width="290px"
                  :maxlength="15"
                  counter="15"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
               ></v-text-field>
            </v-col>
         </v-row>

         <v-row dense no-gutters justify="center">
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-if="info.sellerString == 'No'"
                  disabled
                  label="País"
                  placeholder="País"
                  prepend-icon="mdi-earth"
                  offset-y
                  min-width="290px"
                  v-model="info.country"
                  :maxlength="60"
                  counter="60"
                  type="text"
                  onkeypress="return /[\sA-Za-zñÑáéíóúÁÉÍÓÚ]/i.test(event.key)"
               ></v-text-field>

               <v-text-field
                  v-else
                  type="text"
                  label="País"
                  placeholder="País"
                  prepend-icon="mdi-earth"
                  offset-y
                  min-width="290px"
                  v-model="info.country"
                  :maxlength="60"
                  counter="60"
                  onkeypress="return /[\sA-Za-zñÑáéíóúÁÉÍÓÚ]/i.test(event.key)"
               ></v-text-field>
            </v-col>
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-if="info.sellerString == 'No'"
                  disabled
                  label="Ciudad"
                  placeholder="Ciudad"
                  prepend-icon="mdi-city"
                  offset-y
                  min-width="290px"
                  :maxlength="90"
                  counter="90"
                  v-model="info.city"
               ></v-text-field>
               <v-text-field
                  v-else
                  label="Ciudad"
                  placeholder="Ciudad"
                  prepend-icon="mdi-city"
                  offset-y
                  min-width="290px"
                  :maxlength="90"
                  counter="90"
                  v-model="info.city"
               ></v-text-field>
            </v-col>
         </v-row>

         <v-row dense no-gutters justify="center">
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-if="info.sellerString == 'No'"
                  disabled
                  label="Distrito"
                  placeholder="Distrito"
                  prepend-icon="mdi-map-marker"
                  offset-y
                  :maxlength="90"
                  counter="90"
                  min-width="290px"
                  v-model="info.district"
               ></v-text-field>

               <v-text-field
                  v-else
                  label="Distrito"
                  placeholder="Distrito"
                  prepend-icon="mdi-map-marker"
                  offset-y
                  :maxlength="90"
                  counter="90"
                  min-width="290px"
                  v-model="info.district"
               ></v-text-field>
            </v-col>
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-if="info.sellerString == 'No'"
                  disabled
                  label="Dirección"
                  placeholder="Dirección"
                  prepend-icon="mdi-pencil"
                  offset-y
                  :maxlength="100"
                  counter="100"
                  min-width="290px"
                  v-model="info.address"
               ></v-text-field>

               <v-text-field
                  v-else
                  label="Dirección"
                  placeholder="Dirección"
                  prepend-icon="mdi-pencil"
                  offset-y
                  :maxlength="100"
                  counter="100"
                  min-width="290px"
                  v-model="info.address"
               ></v-text-field>
            </v-col>
         </v-row>
         <v-row dense no-gutters justify="center" style="padding-bottom: 50px">
            <v-col cols="8" sm="4" align-md="3" lg="8" style="padding-top:0px">
               <v-checkbox
                  v-model="info.acceptEULA"
                  v-if="!sellerBD && info.sellerString == 'Sí'"
                  ><template v-slot:label>
                     <div>
                        Aceptas los
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on }">
                              <a
                                 target="_blank"
                                 href="http://vuetifyjs.com"
                                 @click.stop
                                 v-on="on"
                              >
                                 términos de uso
                              </a>
                           </template>
                           Abre nueva ventana
                        </v-tooltip>
                        y
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on }">
                              <a
                                 target="_blank"
                                 href="http://vuetifyjs.com"
                                 @click.stop
                                 v-on="on"
                              >
                                 política de privacidad
                              </a>
                           </template>
                           Abre nueva ventana
                        </v-tooltip>
                        de usar el marketplace?
                     </div>
                  </template>
               </v-checkbox>

               <v-checkbox
                  v-model="info.acceptEULA"
                  v-if="!sellerBD && info.sellerString == 'No'"
                  disabled
                  :value="false"
                  ><template v-slot:label>
                     <div>
                        Aceptas los
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on }">
                              <a
                                 target="_blank"
                                 href="http://vuetifyjs.com"
                                 @click.stop
                                 v-on="on"
                              >
                                 términos de uso
                              </a>
                           </template>
                           Abre nueva ventana
                        </v-tooltip>
                        y
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on }">
                              <a
                                 target="_blank"
                                 href="http://vuetifyjs.com"
                                 @click.stop
                                 v-on="on"
                              >
                                 política de privacidad
                              </a>
                           </template>
                           Abre nueva ventana
                        </v-tooltip>
                        de usar el marketplace?
                     </div>
                  </template>
               </v-checkbox>
            </v-col>
         </v-row>
      </v-card>
   </div>
</template>

<script>
export default {
   name: "ProfileMarket",
   props: ["edit", "info"],
   data() {
      return {
         rules: {
            //countryRules: [v => !!v || "Ingrese el país"],
            //cityRules: [v => !!v || "Ingrese la ciudad"],
            //districtRules: [v => !!v || "Ingrese el distrito"],
            //addressRules: [v => !!v || "Ingrese la dirección"],

            companyRules: [v => !!v || "Ingrese el nombre del negocio"]
            //orgRules: [v => !!v || "Ingrese el área de la organización"],
            //repRules: [v => !!v || "Ingrese el nombre del representante legal"],
            //rucRules: [v => !!v || "Ingrese el RUC"],
            //teleRules: [v => !!v || "Ingrese el teléfono del negocio"]
         },
         items: ["Sí", "No"],
         sellerBD: false
      };
   },
   created() {
      if (this.info.sellerString == "Sí") {
         this.sellerBD = true;
      }
   },
   methods: {
      updateOtherFields() {
         if (this.info.sellerString == "No") {
            this.info.businessName = "";
            this.info.company = "";
            this.info.legalRepresentant = "";
            this.info.ruc = "";
            this.info.phone = "";
            this.info.country = "";
            this.info.city = "";
            this.info.district = "";
            this.info.address = "";
            this.info.acceptEULA = false;
         }
      }
   }
};
</script>
<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
   -webkit-appearance: none;
   margin: 0;
}
</style>
