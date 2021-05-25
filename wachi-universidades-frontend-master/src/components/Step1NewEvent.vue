<template>
   <v-form>
      <br />
      <v-row align="center" justify="center">
         <v-col style="max-width: 80%">
            <v-text-field
               :maxlength="maxLength"
               label="Nombre del Evento *"
               outlined
               :color="color"
               v-model="newEvent.name"
               :error-messages="this.nameErrors"
               @input="$v.newEvent.name.$touch()"
               @blur="$v.newEvent.name.$touch()"
               required
            ></v-text-field>
         </v-col>
      </v-row>
      <v-row align="center" justify="center">
         <v-col style="max-width: 80%">
            <v-textarea
               :maxlength="maxLength"
               name="descripcion"
               label="Descripción *"
               outlined
               :color="color"
               v-model="newEvent.description"
               required
               :error-messages="this.descriptionErrors"
               @input="$v.newEvent.description.$touch()"
               @blur="$v.newEvent.description.$touch()"
            ></v-textarea>
         </v-col>
      </v-row>
      <v-row justify="space-around">
         <div>
            <div :style="styleColor">Fecha de inicio de evento *</div>
            <br />
            <v-date-picker
               :color="color"
               v-model="newEvent.startDate"
               :min="new Date().toISOString().substr(0, 10)"
               :rules="[(v) => !!v || 'Ingresar la fecha de inicio del evento']"
            ></v-date-picker>
         </div>
         <div>
            <div :style="styleColor">Fecha de fin de evento *</div>
            <br />
            <v-date-picker :color="color" v-model="newEvent.endDate" :min="newEvent.startDate" :readonly="!newEvent.startDate"></v-date-picker>
         </div>
      </v-row>
      <v-row justify="space-around">
         <v-col cols="3">
            <div :style="styleColor">Mínimo de integrantes por grupo *</div>
            <br />
            <v-text-field :color="color" :maxlength="maxLength" outlined type="number" :rules="rules" v-model="newEvent.minPerGroup" />
         </v-col>
         <v-col cols="3">
            <div :style="styleColor">Máximo de integrantes por grupo *</div>
            <br />
            <v-text-field :color="color" :maxlength="maxLength" outlined type="number" :rules="rules" v-model="newEvent.maxPerGroup" />
         </v-col>
      </v-row>
      <v-row justify="space-around">
         <v-col cols="3">
            <div :style="styleColor">Bases Del Programa</div>
            <br />
            <v-file-input :color="color" outlined label="Bases del programa" v-model="newEvent.fileProgramBases"></v-file-input>
         </v-col>
         <v-col cols="3">
            <div :style="styleColor">Preguntas Frecuentes</div>
            <br />
            <v-file-input :color="color" outlined label="Preguntas Frecuentes" v-model="newEvent.fileFrequentQuestions"></v-file-input>
         </v-col>
      </v-row>
   </v-form>
</template>

<style scoped src="../styles/Step1NewEvent.css"></style>
<style scoped src="../styles/MainStyles.css"></style>
<script>
import { mapActions, mapState } from "vuex";
import { required, maxLength, numeric } from "vuelidate/lib/validators";
export default {
   data() {
      return {
         styleColor: {
            color: " FFFF",
         },
         color: "FFFF",
         maxLength: 200,
         newEvent: {
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            minPerGroup: "",
            maxPerGroup: "",
            fileProgramBases: null,
            fileFrequentQuestions: null,
         },
         rules: [(v) => !!v || "Campo Obligatorio", (v) => v >= 1 || "El mínimo de integrantes es 1"],
      };
   },
   validations() {
      return {
         newEvent: {
            name: {
               required,
               maxLength: maxLength(250),
            },
            description: {
               required,
               maxLength: maxLength(500),
            },
            minPerGroup: {
               required,
               numeric,
            },
            maxPerGroup: {
               required,
               numeric,
            },
         },
      };
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      this.styleColor.color = this.style.style.colors.primary;
   },
   methods: {
      ...mapActions("event", ["saveChangesStepOne"]),
      saveStep1() {
         let next = false;
         console.log("this.newEvent", this.newEvent);
         //aca ejecutar las validaciones
         this.saveChangesStepOne(this.newEvent);
         let self = this;
         self.$v.newEvent.$touch();

         if (self.$v.$error) {
            console.log("something failed in new event");
            //NO PERMITIR AVANZAR
         } else {
            next = true;
            console.log("entre a registerEvent");
         }
         return next;
      },
   },
   computed: {
      ...mapState(["style"]),
      nameErrors() {
         const errors = [];
         if (!this.$v.newEvent.name.$dirty) return errors;
         !this.$v.newEvent.name.required && errors.push("Ingresar el nombre del evento");
         !this.$v.newEvent.name.maxLength && errors.push("Ingrese un nombre de evento menor a 250 caracteres.");
         return errors;
      },
      descriptionErrors() {
         const errors = [];
         if (!this.$v.newEvent.description.$dirty) return errors;
         !this.$v.newEvent.description.required && errors.push("Ingresar la descripción del evento");
         !this.$v.newEvent.description.maxLength && errors.push("Ingrese un nombre de evento menor a 500 caracteres.");
         return errors;
      },
      minPerGroupErrors() {
         const errors = [];
         if (!this.$v.newEvent.minPerGroup.$dirty) return errors;
         !this.$v.newEvent.minPerGroup.required && errors.push("Ingresar la cantidad mínima por grupo del evento");
         return errors;
      },
      maxPerGroupErrors() {
         const errors = [];
         if (!this.$v.newEvent.maxPerGroup.$dirty) return errors;
         !this.$v.newEvent.maxPerGroup.required && errors.push("Ingresar la cantidad máxima por grupo del evento");
         return errors;
      },
   },
};
</script>
