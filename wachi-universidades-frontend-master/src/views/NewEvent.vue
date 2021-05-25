<template>
   <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <loading :active.sync="loadingUpload" :can-cancel="false" :is-full-page="false" :color="color"></loading>
      <v-row align="center" justify="center">
         <v-col cols="8" style="margin-inline-start: 300px">
            <v-card class="marginTop">
               <v-card-title class="justify-center" :style="styleColor">NUEVO EVENTO</v-card-title>
               <v-stepper v-model="e1">
                  <v-stepper-header class="mx-auto">
                     <v-stepper-step :complete="e1 > 1" step="1" :color="color"> Información general </v-stepper-step>

                     <v-divider></v-divider>

                     <v-stepper-step :complete="e1 > 2" step="2" :color="color"> Universidades </v-stepper-step>

                     <v-divider></v-divider>

                     <v-stepper-step step="3" :color="color"> Lanzar evento </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items>
                     <v-stepper-content step="1">
                        <Step1NewEvent ref="stepOne"></Step1NewEvent>
                        <br />
                        <br />
                        <v-row align="end" justify="end">
                           <v-btn class="mx-3" large text @click="$router.go(-1)"> Cancel </v-btn>
                           <v-btn class="mx-3" large :color="color" @click="saveChangesStepOne()"> Continuar </v-btn>
                        </v-row>
                     </v-stepper-content>

                     <v-stepper-content step="2">
                        <Step2NewEvent></Step2NewEvent>

                        <br />
                        <br />
                        <v-row align="end" justify="end">
                           <v-btn class="mx-3" large text @click="e1 = 1"> Anterior </v-btn>
                           <v-btn class="mx-3" large :color="color" @click="fooii()"> Siguiente </v-btn>
                        </v-row>
                     </v-stepper-content>

                     <v-stepper-content step="3">
                        <Step3NewEvent ref="foo"></Step3NewEvent>

                        <br />
                        <br />
                        <v-row align="end" justify="end">
                           <v-btn class="mx-3" large text @click="e1 = 2"> Anterior </v-btn>
                           <v-btn class="mx-3" large :color="color" @click="showAlert"> Lanzar Evento </v-btn>
                        </v-row>
                     </v-stepper-content>
                  </v-stepper-items>
               </v-stepper>
            </v-card>
         </v-col>
      </v-row>
   </div>
</template>

<style scoped src="../styles/NewEvent.css"></style>
<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import Step1NewEvent from "@/components/Step1NewEvent.vue";
import Step2NewEvent from "@/components/Step2NewEvent.vue";
import Step3NewEvent from "@/components/Step3NewEvent.vue";
import * as EventDA from "@/dataAccess/eventDA.js";
import "sweetalert2/dist/sweetalert2.min.css";
import { mapActions, mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
   name: "NewEvent",
   components: {
      Sidebar,
      Navbar,
      Step1NewEvent,
      Step2NewEvent,
      Step3NewEvent,
      Loading,
   },
   data() {
      return {
         e1: 1,
         loadingUpload: false,
         color: "FFFF",
         styleColor: {
            color: " FFFF",
         },
      };
   },
   computed: {
      ...mapState(["event"]),
      ...mapState(["community", "style"]),
   },
   beforeMount() {
      this.color = this.style.style.colors.primary;
      this.styleColor.color = this.style.style.colors.primary;
   },
   methods: {
      ...mapActions(["event/saveChangesStepOne"]),
      fooii() {
         this.e1 = 3;
         this.$refs.foo.funcion();
      },
      saveChangesStepOne() {
         let next = this.$refs.stepOne.saveStep1();
         console.log("next = ", next);
         if (next) {
            this.e1 = 2;
         }
      },
      showAlert() {
         // Use sweetalert2
         console.log("se activa el lanzar evento-----------");
         console.log("event", this.event.event);
         let body = {
            name: this.event.event.name,
            description: this.event.event.description,
            startDate: this.event.event.startDate,
            endDate: this.event.event.endDate,
            minPerGroup: parseInt(this.event.event.minPerGroup),
            maxPerGroup: parseInt(this.event.event.maxPerGroup),
            idCommunity: 0,
            communityToken: process.env.VUE_APP_API_KEY_COMMUNITY,
         };
         /*                    const swalWithBootstrapButtons = this.$swal.mixin({
            customClass: {
               confirmButton: "btn btn-success",
               cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
         });  */
         this.$swal({
            title: "¿Está seguro que desea lanzar el evento?",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Aceptar",
            reverseButtons: true,
         }).then((result) => {
            if (result.isConfirmed) {
               this.loadingUpload = true;
               EventDA.createEvent(body)
                  .then((response) => {
                     this.loadingUpload = false;
                     console.log(body);
                     let heisAux = [];
                     for (let i = 0; i < this.event.event.heis.length; i++) {
                        let idType;
                        if (this.event.event.heis[i].type === "Universidad") {
                           idType = 1;
                           heisAux.push({
                              name: this.event.event.heis[i].name,
                              idType: idType,
                              contactEmail: this.event.event.heis[i].contactEmail,
                              units: [],
                           });
                        } else {
                           idType = 2;
                           heisAux.push({
                              name: this.event.event.heis[i].name,
                              idType: idType,
                              contactEmail: this.event.event.heis[i].contactEmail,
                              courses: [],
                           });
                        }
                        let units = this.event.event.heis[i].units;
                        for (let j = 0; j < units.length; j++) {
                           if (idType === 1) {
                              //UNIVERSIDAD
                              heisAux[i].units.push({
                                 name: units[j].name,
                                 contactEmail: units[j].contactEmail,
                                 courses: [],
                              });
                              let courses = units[j].courses;
                              for (let k = 0; k < courses.length; k++) {
                                 heisAux[i].units[j].courses.push({
                                    name: courses[k].name,
                                    contactEmail: courses[k].contactEmail,
                                 });
                              }
                           } else {
                              //INSTITUCIONES
                              heisAux[i].courses.push({
                                 name: units[j].name,
                                 contactEmail: units[j].contactEmail,
                              });
                           }
                        }
                     }

                     let eventAux = {
                        idEvent: parseInt(response.data.payload.idUEvent),
                        heis: heisAux,
                     };

                     console.log("antes de enviar archivos ", this.event.event);
                     EventDA.loadProgramBases(this.event.event.fileProgramBases, eventAux.idEvent);
                     EventDA.loadFrequentQuestions(this.event.event.fileFrequentQuestions, eventAux.idEvent);

                     console.log("antes de consultar el api: ", eventAux);
                     EventDA.registryHeis(eventAux)
                        .then((resp) => {
                           //todo
                           console.log(resp);
                        })
                        .catch((err) => {
                           console.log("error: ", err);
                        });
                     this.$swal.fire("Lanzado!", "El evento se ha lanzado con éxito", "success");
                     location.reload();
                  })
                  .catch((error) => {
                     this.loadingUpload = false;
                     this.$swal.fire("Error al crear el evento", error.response.data.message, "error");
                     console.log("al consultar el servidor + ", error.response.data);
                  });
            }
         });
      },
   },
};
</script>
