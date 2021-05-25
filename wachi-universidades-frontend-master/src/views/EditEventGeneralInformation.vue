<template>
   <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <v-row align="center" justify="center">
         <v-col cols="8" style="margin-inline-start: 300px">
            <v-card class="marginTop pa-5">
               <v-card-title class="justify-center" :style="styleObject2"> Editar información general del evento </v-card-title>
               <v-container>
                  <v-divider></v-divider>
                  <br />
                  <v-row justify="end">
                     <div class="mr-3">¿Inscripciones abiertas?</div>
                     <v-switch
                        v-if="switchInscriptions"
                        class="v-input--reverse mt-0 pt-0 mr-4"
                        v-model="switchInscriptions"
                        :value="newEvent.openEnrollment"
                        :color="color"
                        hide-details
                        label="Sí"
                     ></v-switch>
                     <v-switch
                        v-else
                        class="v-input--reverse mt-0 pt-0 mr-4"
                        v-model="switchInscriptions"
                        color="primary"
                        hide-details
                        label="No"
                     ></v-switch>
                  </v-row>
                  <br />
                  <v-form>
                     <v-row justify="center" align="center">
                        <v-col cols="2" align-self="start">
                           <h4 :style="styleObject2">Nombre del evento:</h4>
                        </v-col>
                        <v-col cols="8">
                           <v-text-field :maxlength="maxLength" outlined v-model="newEvent.name" :color="color"></v-text-field>
                        </v-col>
                     </v-row>
                     <v-row justify="center" align="center">
                        <v-col cols="2" align-self="start">
                           <h4 :style="styleObject2" :color="color">Descripción :</h4>
                        </v-col>
                        <v-col cols="8">
                           <v-textarea :maxlength="maxLength" name="descripcion" :color="color" outlined v-model="newEvent.description"></v-textarea>
                        </v-col>
                     </v-row>
                     <br />
                     <v-row justify="space-around">
                        <div>
                           <div :style="styleObject2">Fecha de inicio de evento *</div>
                           <br />
                           <v-date-picker
                              :value="eventBackend.startDate"
                              :color="color"
                              v-model="newEvent.startDate"
                              :min="new Date().toISOString().substr(0, 10)"
                           ></v-date-picker>
                        </div>
                        <div>
                           <div :style="styleObject2">Fecha de fin de evento *</div>
                           <br />
                           <v-date-picker
                              v-model="newEvent.endDate"
                              :color="color"
                              :min="newEvent.startDate"
                              :readonly="!newEvent.startDate"
                           ></v-date-picker>
                        </div>
                     </v-row>
                     <v-row justify="space-around">
                        <v-col cols="3">
                           <div :style="styleObject2">Mínimo de integrantes por grupo *</div>
                           <br />
                           <v-text-field :maxlength="maxLength" :color="color" outlined type="number" v-model="newEvent.minPerGroup" />
                        </v-col>
                        <v-col cols="3">
                           <div :style="styleObject2">Máximo de integrantes por grupo *</div>
                           <br />
                           <v-text-field :maxlength="maxLength" :color="color" outlined type="number" v-model="newEvent.maxPerGroup" />
                        </v-col>
                     </v-row>
                     <v-row justify="space-around">
                        <v-col cols="3">
                           <div :style="styleObject2">Bases Del Programa</div>
                           <br />
                           <v-file-input
                              outlined
                              :colo="color"
                              label="Bases del programa"
                              v-model="newEvent.termsFilename"
                              :value="termsFilenameAux"
                           ></v-file-input>
                        </v-col>
                        <v-col cols="3">
                           <div :style="styleObject2">Preguntas Frecuentes</div>
                           <br />
                           <v-file-input outlined label="Preguntas Frecuentes" v-model="newEvent.faqFilename" :value="faqFilenameAux"></v-file-input>
                        </v-col>
                     </v-row>
                     <v-row justify="space-around">
                        <v-col cols="4">
                           <div :style="styleObject2">Descargar Bases del Programa</div>
                           <v-btn v-if="eventBackend.termsFilename" :color="color" dark large text @click="onClickDownloadTerms()">
                              {{ this.eventBackend.termsFilename.length > 30 ? "Bases del Programa" : this.eventBackend.termsFilename }}
                           </v-btn>
                           <br />
                        </v-col>
                        <v-col cols="4">
                           <div :style="styleObject2">Descargar Preguntas Frecuentes</div>
                           <v-btn v-if="eventBackend.faqFilename" :color="color" text @click="onClickDownloadFAQ()">
                              {{ this.eventBackend.faqFilename.length > 30 ? "Preguntas Frecuentes" : this.eventBackend.faqFilename }}
                           </v-btn>
                           <br />
                        </v-col>
                     </v-row>
                     <br />
                     <v-row justify="end" class="mr-5">
                        <v-btn class="mx-3" large text @click="$router.go(-1)"> Cancelar </v-btn>
                        <v-btn :color="color" dark large @click="onClickSaveEventGeneralInformation()"> Guardar </v-btn>
                     </v-row>
                  </v-form>
               </v-container>
            </v-card>
         </v-col>
      </v-row>
   </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import { mapActions, mapState } from "vuex";
import * as EventDA from "@/dataAccess/eventDA.js";
import { maxLength, numeric, required, minValue } from "vuelidate/lib/validators";

export default {
   name: "EditEventGeneralInformation",
   components: {
      Sidebar,
      Navbar,
   },
   data() {
      return {
         styleObject: {
            backgroundColor: "FFFF",
         },
         styleObject2: {
            color: "FFFF",
         },
         maxLength: 200,
         color: "FFFF",
         switchInscriptions: false,
         eventBackend: {
            name: "",
            description: "",
            startDate: null,
            endDate: null,
            termsFilename: null,
            faqFilename: null,
         },
         newEvent: {
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            minPerGroup: "",
            maxPerGroup: "",
         },
         faqFilenameAux: null,
         termsFilenameAux: null,
         existTermsFile: false,
         existFAQFile: false,
      };
   },
   validations() {
      return {
         newEvent: {
            name: {
               maxLength: maxLength(250),
            },
            description: {
               maxLength: maxLength(500),
            },
            minPerGroup: {
               numeric,
               minValue: minValue(1),
               required,
            },
            maxPerGroup: {
               numeric,
               minValue: minValue(this.newEvent.minPerGroup),
               required,
            },
            startDate: {
               required,
            },
            endDate: {
               required,
            },
         },
      };
   },
   methods: {
      ...mapActions("event", ["saveChangesStepOne"]),
      saveStep1() {
         console.log("this.newEvent", this.newEvent);
         this.saveChangesStepOne(this.newEvent);
      },
      onClickSaveEventGeneralInformation() {
         //validaciones
         let self = this;
         self.$v.newEvent.$touch();
         if (self.$v.$error) {
            console.log("something failed in edit event general information");
            this.$swal("Completar datos!", "Por favor, completar todos los datos obligatorios", "error");
         } else {
            console.log("entered edit event general information");
            console.log(this.newEvent);
            //Calling modify event general information service
            EventDA.editEventGeneralInformation(this.eventBackend, this.newEvent)
               .then((response) => {
                  console.log("respuesta", response.data);
                  this.$swal("Cambios guardados!", "Se guardaron los cambios correctamente", "success");
               })
               .catch((error) => {
                  console.log(error.response.data);
                  this.$swal("Error al guardar los cambios", "Ocurrió un error al momento de guardar los cambios", "error");
               });

            EventDA.loadProgramBases(this.newEvent.termsFilename, this.eventBackend.idUEvent)
               .then((resp) => {
                  console.log("response de bases", resp.data);
               })
               .catch((err) => {
                  console.log(err.response.data);
               });
            EventDA.loadFrequentQuestions(this.newEvent.faqFilename, this.eventBackend.idUEvent)
               .then((resp) => {
                  console.log("response de faq", resp.data);
               })
               .catch((err) => {
                  console.log(err.response.data);
               });

            if (this.switchInscriptions === true) {
               //Calling enable enrollment service only if switch is true
               console.log("sending this to service: ", this.eventBackend.idUEvent);
               EventDA.enableEnrollment(this.eventBackend.idUEvent)
                  .then((response) => {
                     console.log("Enabling enrollment", response.data);
                  })
                  .catch((error) => {
                     console.log("error while enabling enrollment", error);
                  });
            } else {
               //disable enrollment
               EventDA.disableEnrollment(this.eventBackend.idUEvent)
                  .then((response) => {
                     console.log("Disabling enrollment", response.data);
                  })
                  .catch((error) => {
                     console.log("error while enabling enrollment", error.response.data);
                  });
            }
         }
      },
      onClickDownloadTerms() {
         var fileLink = document.createElement("a");
         fileLink.href = this.eventBackend.termsURL;
         fileLink.target = "_blank";
         fileLink.setAttribute("download", this.eventBackend.termsFilename);
         document.body.appendChild(fileLink);

         fileLink.click();
      },
      onClickDownloadFAQ() {
         var fileLink = document.createElement("a");
         fileLink.href = this.eventBackend.faqURL;
         fileLink.target = "_blank";
         fileLink.setAttribute("download", this.eventBackend.termsFilename);
         document.body.appendChild(fileLink);

         fileLink.click();
      },
      uploadFileBasesPrograma(e) {
         var files = e.target.files;
         this.newEvent.termsFilename = files[0];
      },
      uploadFilePreguntasFrecuentes(e) {
         var files = e.target.files;
         this.newEvent.faqFilename = files[0];
      },
   },
   computed: {
      ...mapState(["community", "style"]),
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
   mounted() {
      this.color = this.style.style.colors.primary;
      this.styleObject.backgroundColor = this.style.style.colors.primary;
      this.styleObject2.color = this.style.style.colors.primary;
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then((response) => {
            console.log(response.data);
            this.eventBackend = response.data.payload;
            this.newEvent = { ...this.eventBackend };
            this.switchInscriptions = response.data.payload.openEnrollment;
            this.faqFilenameAux = new File(["foo"], this.eventBackend.faqFilename, {
               type: "application/pdf",
            });
            this.termsFilenameAux = new File(["foo"], this.eventBackend.termsFilename);
         })
         .catch((error) => {
            console.log("error al obtener backend event + ", error);
         });
   },
};
</script>

<style scoped src="../styles/MainStyles.css"></style>
