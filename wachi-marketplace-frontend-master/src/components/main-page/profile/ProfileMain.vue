<template>
   <div>
      <v-card flat :disabled="edit" class="mt-5">
         <v-row dense no-gutters justify="center">
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  label="Nombres"
                  placeholder="Nombre"
                  prepend-icon="mdi-clipboard-text"
                  offset-y
                  min-width="290px"
                  :maxlength="50"
                  counter="50"
                  v-model="info.name"
                  :rules="rules.nameRules"
               ></v-text-field>
            </v-col>

            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  label="Apellidos"
                  placeholder="Apellidos"
                  prepend-icon="mdi-clipboard-text"
                  offset-y
                  min-width="290px"
                  :maxlength="150"
                  counter="150"
                  v-model="info.lastName"
                  :rules="rules.nameRules"
               ></v-text-field>
            </v-col>
         </v-row>

         <v-row dense no-gutters justify="center">
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-select
                  label="Sexo"
                  placeholder="Sexo"
                  v-model="info.genre"
                  :items="sex"
                  prepend-icon="mdi-account"
               ></v-select>
            </v-col>
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
               >
                  <template v-slot:activator="{ on, attrs }">
                     <v-text-field
                        v-model="info.birthdate"
                        placeholder="Cumpleaños"
                        label="Fecha de Nacimiento"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                     ></v-text-field>
                  </template>
                  <v-date-picker
                     dark
                     v-model="info.birthdate"
                     @input="menu2 = false"
                     :max="getEndDate"
                  ></v-date-picker>
               </v-menu>
            </v-col>
         </v-row>

         <v-row dense no-gutters justify="center">
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-model="info.email"
                  label="Correo"
                  placeholder="Correo"
                  prepend-icon="mdi-at"
                  disabled
                  offset-y
                  min-width="290px"
                  :maxlength="50"
                  counter="50"
                  :rules="rules.emailRules"
               ></v-text-field>
            </v-col>

            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-model="info.phone"
                  label="Telefono"
                  placeholder="Telefono"
                  prepend-icon="mdi-phone"
                  offset-y
                  type="number"
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
               <v-select
                  label="Tipo de documento"
                  placeholder="Tipo"
                  v-model="info.documentType"
                  :items="docs"
                  prepend-icon="mdi-view-list"
               ></v-select>
            </v-col>

            <v-col
               v-if="info.documentType == ''"
               cols="8"
               sm="4"
               align-md="3"
               lg="4"
               style="margin-left:20px"
            >
               <v-text-field
                  disabled
                  v-model="info.document"
                  label="Documento de Identificación"
                  placeholder="Documento"
                  prepend-icon="mdi-card"
                  offset-y
                  min-width="290px"
                  :maxlength="12"
                  counter="12"
                  :rules="rules.documentNoRules"
                  onkeypress="return /^([a-zA-Z0-9]){0,12}$/i.test(event.key)"
               ></v-text-field>
            </v-col>

            <v-col
               v-else
               cols="8"
               sm="4"
               align-md="3"
               lg="4"
               style="margin-left:20px"
            >
               <v-text-field
                  v-if="info.documentType === 'Pasaporte'"
                  v-model="info.document"
                  label="Documento de Identificación"
                  placeholder="Documento"
                  prepend-icon="mdi-card"
                  offset-y
                  min-width="290px"
                  :maxlength="12"
                  counter="12"
                  :rules="rules.documentNoRules"
                  onkeypress="return /^([a-zA-Z0-9]){0,11}$/i.test(event.key)"
               ></v-text-field>

               <v-text-field
                  v-else
                  v-model="info.document"
                  label="Documento de Identificación"
                  placeholder="Documento"
                  prepend-icon="mdi-card"
                  offset-y
                  min-width="290px"
                  type="number"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  :maxlength="11"
                  counter="12"
                  :rules="rules.documentNoRules"
               ></v-text-field>
            </v-col>
         </v-row>

         <v-row dense no-gutters justify="center">
            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-model="info.country"
                  label="País"
                  placeholder="País"
                  onkeypress="return /[\sA-Za-zñÑáéíóúÁÉÍÓÚ]/i.test(event.key)"
                  prepend-icon="mdi-earth"
                  :maxlength="60"
                  counter="60"
                  offset-y
                  min-width="290px"
               ></v-text-field>
            </v-col>

            <v-col cols="8" sm="4" align-md="3" lg="4" style="margin-left:20px">
               <v-text-field
                  v-model="info.city"
                  label="Ciudad"
                  placeholder="Ciudad"
                  prepend-icon="mdi-city"
                  offset-y
                  :maxlength="90"
                  counter="90"
                  min-width="290px"
               ></v-text-field>
            </v-col>
         </v-row>

         <v-row dense no-gutters justify="center" style="padding-bottom: 50px">
            <v-col cols="8" sm="8" align-md="3" lg="8">
               <v-textarea
                  v-model="info.aboutMe"
                  label="Sobre mi:"
                  placeholder="Sobre mí"
                  :maxlength="300"
                  counter="300"
                  prepend-icon="mdi-pencil"
                  offset-y
                  min-width="290px"
                  rows="3"
               ></v-textarea>
            </v-col>
         </v-row>
      </v-card>
   </div>
</template>

<script>
export default {
   name: "ProfileMain",
   props: ["edit", "info"],
   data() {
      return {
         menu2: false,
         validDoc: {
            dni: false,
            ruc: false,
            carnet: false
         },
         sex: ["Hombre", "Mujer"],
         docs: ["DNI", "Pasaporte", "RUC"],
         rules: {
            emailRules: [
               v =>
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                     v
                  ) || "Correo debe ser válido"
            ],
            nameRules: [
               v => /^(\D*?)+$/.test(v) || "Nombre y/o apellido debe ser válido"
            ],
            telephoneRules: [
               v => /^\d{0,15}$/.test(v) || "Número de teléfono debe ser válido"
            ],
            documentNoRules: [
               v =>
                  /^([a-zA-Z0-9]){0,12}$/.test(v) ||
                  "Número de documento debe ser válido"
            ],
            pwRules: [
               v => !!v || "Contraseña es requerida",
               v =>
                  /^(?:[A-Za-z0-9]{8,15})$/.test(v) ||
                  "Contraseña debe ser entre 8 y 15 caracteres"
            ]
         },
         date: new Date()
      };
   },
   computed: {
      getEndDate() {
         var endDate = new Date(
            this.date.getFullYear(),
            this.date.getMonth(),
            this.date.getDate()
         );
         return endDate.toISOString().slice(0, 10);
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
