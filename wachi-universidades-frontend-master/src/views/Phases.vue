<template>
   <div>
      <Navbar2></Navbar2>
      <v-row>
         <v-col cols="3">
            <Sidebar></Sidebar>
         </v-col>
         <v-col cols="8">
            <v-row>
               <v-col cols="12">
                  <h1>GESTIÓN DE FASES</h1>
               </v-col>
               <v-col cols="8"></v-col>
               <v-col cols="4" v-if="user.user.data.privilege === 'coordinador general'"
                  >Institución Educativa
                  <v-autocomplete
                     v-model="selectedHei"
                     :items="heis"
                     item-text="name"
                     item-value="idHei"
                     :color="color"
                     :filter="customFilter"
                     @change="filterHeis"
                  ></v-autocomplete>
               </v-col>
               <v-col cols="8"></v-col>
               <v-col cols="4" v-if="user.user.data.privilege === 'coordinador general'"
                  >Tipo de institución
                  <v-autocomplete
                     v-model="heiTypeFilterValue"
                     :items="heiTypeList"
                     item-text="name"
                     :color="color"
                     :filter="typeFilter"
                     @change="filterType"
                  ></v-autocomplete>
               </v-col>
               <v-col cols="12">
                  <v-data-table :items="phasesFilter" :headers="headers" :single-select="singleSelect" :color="color">
                     <template v-slot:body.prepend>
                        <tr>
                           <td colspan="1">
                              <v-text-field :color="color" :maxlength="maxLength" single-line hide-details v-model="namesFilterValue"></v-text-field>
                           </td>
                           <td colspan="1">
                              <v-text-field
                                 :color="color"
                                 :maxlength="maxLength"
                                 single-line
                                 hide-details
                                 v-model="descriptionFilterValue"
                              ></v-text-field>
                           </td>
                           <td colspan="1">
                              <v-text-field :color="color" :maxlength="maxLength" single-line hide-details v-model="orderFilterValue"></v-text-field>
                           </td>
                        </tr>
                     </template>
                     <template v-slot:top>
                        <v-spacer></v-spacer>
                        <v-row>
                           <v-col cols="9"></v-col>
                           <v-col cols="3">
                              <v-dialog v-model="dialogForm" max-width="700px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <div v-bind="attrs" v-on="on">
                                       <v-btn class="mx-2" fab dark :color="color">
                                          <v-icon>
                                             mdi-plus
                                          </v-icon>
                                       </v-btn>
                                       <span>Nueva Fase</span>
                                    </div>
                                 </template>
                                 <v-card>
                                    <v-card-title :color="color" class="justify-center">
                                       <h4>NUEVA FASE</h4>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-container>
                                       <v-form>
                                          <br />
                                          <v-row align="center" justify="center" v-if="user.user.data.privilege === 'coordinador general'">
                                             <v-col cols="10">
                                                Institución Educativa
                                                <v-autocomplete
                                                   v-model="selectedHeiAux"
                                                   :items="heisAux"
                                                   :color="color"
                                                   item-text="name"
                                                   :filter="customFilterAux"
                                                   @change="changeHei()"
                                                ></v-autocomplete>
                                             </v-col>
                                          </v-row>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field
                                                   :maxlength="maxLength"
                                                   label="Nombre de fase"
                                                   outlined
                                                   :color="color"
                                                   v-model="newPhase.name"
                                                   :error-messages="newNameErrors"
                                                   @input="$v.newPhase.name.$touch()"
                                                   @blur="$v.newPhase.name.$touch()"
                                                ></v-text-field>
                                             </v-col>
                                          </v-row>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field
                                                   :maxlength="maxLength"
                                                   label="Descripción de fase"
                                                   outlined
                                                   :color="color"
                                                   v-model="newPhase.description"
                                                   :error-messages="newDescriptionErrors"
                                                   @input="$v.newPhase.description.$touch()"
                                                   @blur="$v.newPhase.description.$touch()"
                                                ></v-text-field>
                                             </v-col>
                                          </v-row>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field
                                                   :maxlength="maxLength"
                                                   label="Orden de fase"
                                                   outlined
                                                   :color="color"
                                                   type="number"
                                                   v-model="newPhase.order"
                                                   :error-messages="newOrderErrors"
                                                   @input="$v.newPhase.order.$touch()"
                                                   @blur="$v.newPhase.order.$touch()"
                                                ></v-text-field>
                                             </v-col>
                                          </v-row>
                                       </v-form>
                                    </v-container>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8">
                                             <v-btn :color="color" @click="cancelPhase()" large>
                                                Cancelar
                                             </v-btn>
                                          </v-col>
                                          <v-col cols="3" class="ml-8">
                                             <v-btn :color="color" @click="registerPhase()" large>
                                                Aceptar
                                             </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                           </v-col>
                        </v-row>
                     </template>
                     <template v-slot:item.actions="{ item }">
                        <v-menu offset-y>
                           <template v-slot:activator="{ on, attrs }">
                              <v-btn icon v-bind="attrs" v-on="on">
                                 <v-icon>mdi-menu-down</v-icon>
                              </v-btn>
                           </template>
                           <v-list>
                              <v-dialog v-model="deletePhase" width="800px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item v-bind="attrs" v-on="on">
                                       <v-list-item-title>Eliminar fase</v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <h2>Eliminar Fase</h2>
                                       <h2>{{ item.name }}</h2>
                                    </v-card-title>
                                    <v-spacer></v-spacer>
                                    <v-card-text>
                                       <v-form>
                                          <v-row align="center" justify="center">
                                             <v-col cols="12">
                                                <div class="text-center">
                                                   <h2>
                                                      ¿Está seguro que desea eliminar la actividad
                                                      {{ item.phaseName }}?
                                                   </h2>
                                                </div>
                                             </v-col>
                                          </v-row>
                                       </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8">
                                             <v-btn :color="color" @click="deletePhase = false" large>
                                                Cancelar
                                             </v-btn>
                                          </v-col>
                                          <v-col cols="3" class="ml-8">
                                             <v-btn
                                                :color="color"
                                                @click="
                                                   deleteSeletectedPhase(item);
                                                   deletePhase = false;
                                                "
                                                large
                                             >
                                                Aceptar
                                             </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                              <v-dialog v-model="modifyPhase" width="800px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item v-bind="attrs" v-on="on">
                                       <v-list-item-title>Editar fase</v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <h2>Editar Fase</h2>
                                       <h2>{{ item.name }}</h2>
                                    </v-card-title>
                                    <v-spacer></v-spacer>
                                    <v-card-text>
                                       <v-form>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field
                                                   :maxlength="maxLength"
                                                   label="Nombre de fase"
                                                   outlined
                                                   :color="color"
                                                   v-model="item.phaseName"
                                                ></v-text-field>
                                             </v-col>
                                          </v-row>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-textarea
                                                   :maxlength="maxLength"
                                                   label="Descripción de fase"
                                                   outlined
                                                   :color="color"
                                                   v-model="item.phaseDescription"
                                                ></v-textarea>
                                             </v-col>
                                          </v-row>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field
                                                   :maxlength="maxLength"
                                                   label="Orden de fase"
                                                   outlined
                                                   :color="color"
                                                   type="number"
                                                   v-model="item.order"
                                                ></v-text-field>
                                             </v-col>
                                          </v-row>
                                       </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8">
                                             <v-btn :color="color" @click="modifyPhase = false" large>
                                                Cancelar
                                             </v-btn>
                                          </v-col>
                                          <v-col cols="3" class="ml-8">
                                             <v-btn
                                                :color="color"
                                                @click="
                                                   changePhase(item);
                                                   modifyPhase = false;
                                                "
                                                large
                                             >
                                                Aceptar
                                             </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                           </v-list>
                        </v-menu>
                     </template>
                  </v-data-table>
               </v-col>
            </v-row>
         </v-col>
      </v-row>
   </div>
</template>
<style scoped src="../styles/Inscribides.css"></style>
<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar2 from "@/components/Navbar2.vue";
import * as PhasesDA from "@/dataAccess/phasesDA.js";
import * as EventDA from "@/dataAccess/eventDA.js";
import { mapState } from "vuex";
import { required, maxLength, numeric } from "vuelidate/lib/validators";

export default {
   name: "Phases",
   components: {
      Sidebar,
      Navbar2
   },
   data() {
      return {
         color: "FFFF",
         maxLength: 200,
         selectedHeiRegister: {
            idHei: null,
            heiName: ""
         },
         newPhase: {
            name: "",
            description: "",
            order: ""
         },
         currentEvent: null,
         switchNotification: false,
         selectedHei: "",
         selectedHeiAux: "",
         selectedIdHei: null,
         modifyPhase: false,
         singleSelect: false,
         dialogForm: false,
         namesFilterValue: "",
         descriptionFilterValue: "",
         deletePhase: false,
         orderFilterValue: "",
         heiTypeFilterValue: "",
         heiTypeList: [
            { name: "Universidad", id: 1 },
            { name: "Instituto", id: 2 }
         ],
         phases: [],
         phasesFilter: [],
         heis: [],
         heisAux: []
      };
   },
   validations() {
      return {
         newPhase: {
            name: {
               required,
               maxLength: maxLength(250)
            },
            description: {
               required,
               maxLength: maxLength(500)
            },
            order: {
               required,
               numeric
            }
         },
         item: {
            name: {
               required,
               maxLength: maxLength(250)
            },
            description: {
               required,
               maxLength: maxLength(500)
            },
            order: {
               required,
               numeric
            }
         }
      };
   },
   computed: {
      ...mapState(["community", "user", "style"]),
      newNameErrors() {
         const errors = [];
         if (!this.$v.newPhase.name.$dirty) return errors;
         !this.$v.newPhase.name.required && errors.push("Ingresar el nombre de la fase");
         return errors;
      },
      newDescriptionErrors() {
         const errors = [];
         if (!this.$v.newPhase.description.$dirty) return errors;
         !this.$v.newPhase.description.required && errors.push("Ingresar la descripción de la fase");
         return errors;
      },
      newOrderErrors() {
         const errors = [];
         if (!this.$v.newPhase.description.$dirty) return errors;
         !this.$v.newPhase.description.required && errors.push("Ingresar el orden de la fase");
         !this.$v.newPhase.order.numeric && errors.push("Ingresar campo numérico");
         return errors;
      },
      itemNameErrors() {
         const errors = [];
         if (!this.$v.item.name.$dirty) return errors;
         !this.$v.item.name.required && errors.push("Ingresar el nombre de la fase");
         return errors;
      },
      itemDescriptionErrors() {
         const errors = [];
         if (!this.$v.item.description.$dirty) return errors;
         !this.$v.item.description.required && errors.push("Ingresar la descripción de la fase");
         return errors;
      },
      itemOrderErrors() {
         const errors = [];
         if (!this.$v.item.order.$dirty) return errors;
         !this.$v.item.order.required && errors.push("Ingresar el orden de la fase");
         !this.$v.item.order.numeric && errors.push("Ingresar campo numérico");
         return errors;
      },
      headers() {
         return [
            {
               text: "Fase",
               value: "phaseName",
               sortable: false,
               filter: this.namesFilter
            },
            {
               text: "Descripción",
               value: "phaseDescription",
               sortable: false,
               filter: this.descriptionFilter
            },
            {
               text: "Orden",
               value: "order",
               sortable: false,
               filter: this.orderFilter
            },
            {
               text: "Acciones",
               value: "actions",
               sortable: false
            }
         ];
      }
   },
   methods: {
      deleteSeletectedPhase(item) {
         console.log("eliminar fase:", item);
         PhasesDA.deletePhase(item.idPhase)
            .then(resp => {
               console.log(resp);
               let index;
               for (let i = 0; i < this.phasesFilter.length; i++) {
                  if (this.phasesFilter[i].idPhase === item.idPhase) {
                     index = i;
                     break;
                  }
               }
               this.phasesFilter.splice(index, 1);
               this.phases.splice(index, 1);
               this.$swal.fire("Fase Eliminada", "Se ha eliminado una fase con éxito", "success");
            })
            .catch(err => {
               console.log(err.response.data);
               this.$swal.fire("Ocurrió un problema", "No se pudo eliminar la fase", "error");
            });
      },
      changeHei() {
         for (let i = 0; i < this.heisAux.length; i++) {
            if (this.heisAux[i].name === this.selectedHeiAux) {
               this.selectedHeiRegister.heiName = this.heisAux[i].name;
               this.selectedHeiRegister.idHei = this.heisAux[i].idHei;
               break;
            }
         }
         console.log("selected hei", this.selectedHeiRegister);
      },
      registerPhase() {
         this.$v.newPhase.$touch();
         if (!this.$v.newPhase.$invalid) {
            this.dialogForm = false;
            console.log("hei seleccionado", this.selectedHeiRegister);
            console.log("fase: ", this.newPhase);
            let idHeiAux;
            if (this.user.user.data.privilege === "coordinador de sede") {
               idHeiAux = this.user.user.data.idHei;
            } else {
               idHeiAux = this.selectedHeiRegister.idHei;
            }
            PhasesDA.registerPhase(idHeiAux, this.newPhase, this.currentEvent.idUEvent)
               .then(resp => {
                  console.log(resp);
                  (this.newPhase.phaseName = ""), (this.newPhase.description = ""), (this.newPhase.order = ""), (this.selectedHeiAux = "");
                  this.$swal.fire("Fase Creada", "Se ha agregado una nueva fase con éxito", "success");
                  this.getListPhases();
               })
               .catch(err => {
                  console.log(err);
                  this.$swal.fire("Ocurrió un problema", "No se pudo crear una fase", "error");
               });
         }
         this.newPhase.name = "";
         this.newPhase.description = "";
         this.newPhase.order = "";
      },
      cancelPhase() {
         this.dialogForm = false;
         this.newPhase.name = "";
         this.newPhase.description = "";
         this.newPhase.order = "";
      },
      changePhase(item) {
         console.log("Modificando la fase con id: ", item.idPhase);
         console.log("Fase: ", item);
         PhasesDA.editPhase(item, this.currentEvent.idUEvent)
            .then(resp => {
               console.log(resp);
               this.$swal.fire("Fase Modificada", "Se ha modificado una fase con éxito", "success");
            })
            .catch(err => {
               console.log(err.response.data);
               this.$swal.fire("Ocurrió un problema", "No se pudo modificar la fase", "error");
            });
      },
      namesFilter(value) {
         if (!this.namesFilterValue) {
            return true;
         }
         return value.toLowerCase().includes(this.namesFilterValue.toLowerCase());
      },
      descriptionFilter(value) {
         if (!this.descriptionFilterValue) {
            return true;
         }
         return value.toLowerCase().includes(this.descriptionFilterValue.toLowerCase());
      },
      heiTypeFilter(value) {
         if (!this.heiTypeFilterValue) {
            return true;
         }
         return value === this.heiTypeFilterValue;
      },
      orderFilter(value) {
         if (!this.orderFilterValue) {
            return true;
         }
         return value.toLowerCase().includes(this.orderFilterValue.toLowerCase());
      },
      customFilter(item, queryText) {
         const textOne = item.name.toLowerCase();
         const searchText = queryText.toLowerCase();
         return textOne.indexOf(searchText) > -1;
      },
      customFilterAux(item, queryText) {
         const textOne = item.name.toLowerCase();
         const searchText = queryText.toLowerCase();
         return textOne.indexOf(searchText) > -1;
      },
      typeFilter(item, queryText) {
         const textOne = item.name.toLowerCase();
         const searchText = queryText.toLowerCase();
         return textOne.indexOf(searchText) > -1;
      },
      filterHeis() {
         let resultOne, resultTwo;
         if (this.heiTypeFilterValue !== "") {
            resultOne = this.phases.filter(phase => phase.idHei === this.selectedHei);
            resultTwo = resultOne.filter(inscribide => inscribide.heiType === this.heiTypeFilterValue);
         } else {
            resultTwo = this.phases.filter(phase => phase.idHei === this.selectedHei);
         }
         this.phasesFilter = resultTwo;
      },
      filterType() {
         let resultOne, resultTwo;
         if (this.heiTypeFilterValue !== "") {
            resultOne = this.phases.filter(phase => phase.idHei === this.selectedHei);
            resultTwo = resultOne.filter(inscribide => inscribide.heiType === this.heiTypeFilterValue);
         } else {
            resultTwo = this.phases.filter(phase => phase.idHei === this.selectedHei);
         }
         this.phasesFilter = resultTwo;
      },
      getListPhases() {
         this.heis = [];
         this.heisAux = [];
         this.phases = [];
         this.phasesFilter = [];
         if (this.currentEvent !== null) {
            PhasesDA.getPhases(this.currentEvent.idUEvent)
               .then(response => {
                  console.log(response);
                  if (response.data.payload.heis !== null) {
                     this.heis = response.data.payload.heis;
                     this.heisAux = response.data.payload.heis;
                  }
                  if (response.data.payload.stages !== null) {
                     let stagesAux = response.data.payload.stages;
                     let type = "";

                     for (let i = 0; i < stagesAux.length; i++) {
                        if (stagesAux[i].heiType === 1) {
                           type = "Universidad";
                        } else if (stagesAux[i].heiType === 2) {
                           type = "Instituto";
                        }
                        let auxPhase = {
                           idHei: stagesAux[i].idHei,
                           heiName: stagesAux[i].heiName,
                           heiType: type,
                           idPhase: stagesAux[i].idPhase,
                           phaseName: stagesAux[i].phaseName,
                           phaseDescription: stagesAux[i].phaseDescription,
                           order: stagesAux[i].order
                        };

                        if (this.user.user.data.privilege == "coordinador de sede" && auxPhase.idHei === this.user.user.data.idHei) {
                           console.log("soy coordinador de sede");
                           this.phases.push(auxPhase);
                           this.phasesFilter.push(auxPhase);
                        }
                        if (this.user.user.data.privilege == "coordinador general") {
                           console.log("soy coordinador general");
                           this.phases.push(auxPhase);
                           this.phasesFilter.push(auxPhase);
                        }
                     }
                  }
               })
               .catch(err => {
                  console.log("no se encontraron fases", err);
               });
         }
      }
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then(resp => {
            this.currentEvent = resp.data.payload;
            this.getListPhases();
         })
         .catch(err => {
            console.log("err", err);
         });
   }
};
</script>
