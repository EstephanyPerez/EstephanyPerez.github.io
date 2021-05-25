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
                  <h1>GESTIÓN DE MENTORES DE SEDE</h1>
               </v-col>
               <v-col cols="8"></v-col>
               <v-col cols="4" v-if="user.user.data.privilege === 'coordinador general'"
                  >Institución Educativa
                  <v-autocomplete
                     v-model="selectedHei"
                     :items="heis"
                     item-text="heiName"
                     item-value="idHei"
                     :filter="customFilter"
                     :color="color"
                     @change="filterHeis"
                  ></v-autocomplete>
               </v-col>
               <v-col cols="12">
                  <v-data-table :items="coordinatorFilter" :headers="headers" :single-select="singleSelect" :loading="loadingParticipants">
                     <template v-slot:body.prepend>
                        <tr>
                           <td colspan="1">
                              <v-text-field :maxlength="maxLength" :color="color" single-line hide-details v-model="namesFilterValue"></v-text-field>
                           </td>
                           <td colspan="1">
                              <v-text-field
                                 :maxlength="maxLength"
                                 :color="color"
                                 single-line
                                 hide-details
                                 v-model="lastNameFilterValue"
                              ></v-text-field>
                           </td>
                           <td colspan="1">
                              <v-text-field :maxlength="maxLength" :color="color" single-line hide-details v-model="emailFilterValue"></v-text-field>
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
                                          <v-icon> mdi-plus </v-icon>
                                       </v-btn>
                                       <span>Nuevo Mentor de Sede</span>
                                    </div>
                                 </template>
                                 <v-card>
                                    <v-card-title class="justify-center">
                                       <h4>NUEVO MENTOR DE SEDE</h4>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                       <v-form>
                                          <br />
                                          <v-row align="center" justify="center">
                                             <v-col cols="10" v-if="user.user.data.privilege === 'coordinador general'">
                                                Institución Educativa
                                                <v-autocomplete
                                                   v-model="selectedHeiAux"
                                                   :items="heisAux"
                                                   :color="color"
                                                   item-text="heiName"
                                                   :filter="customFilterAux"
                                                   @change="changeHei()"
                                                ></v-autocomplete>
                                             </v-col>
                                          </v-row>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field
                                                   :maxlength="maxLength"
                                                   label="Nombres"
                                                   outlined
                                                   :color="color"
                                                   v-model="newCoordinator.name"
                                                   :error-messages="newNameErrors"
                                                   @input="$v.newCoordinator.name.$touch()"
                                                   @blur="$v.newCoordinator.name.$touch()"
                                                ></v-text-field>
                                             </v-col>
                                          </v-row>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field
                                                   :maxlength="maxLength"
                                                   label="Apellidos"
                                                   outlined
                                                   :color="color"
                                                   v-model="newCoordinator.lastName"
                                                   :error-messages="newLastNameErrors"
                                                   @input="$v.newCoordinator.lastName.$touch()"
                                                   @blur="$v.newCoordinator.lastName.$touch()"
                                                ></v-text-field>
                                             </v-col>
                                          </v-row>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field
                                                   :maxlength="maxLength"
                                                   label="Correo electrónico"
                                                   outlined
                                                   :color="color"
                                                   v-model="newCoordinator.email"
                                                   :error-messages="newEmailErrors"
                                                   @input="$v.newCoordinator.email.$touch()"
                                                   @blur="$v.newCoordinator.email.$touch()"
                                                ></v-text-field>
                                             </v-col>
                                          </v-row>
                                       </v-form>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8">
                                             <v-btn :color="color" @click="dialogForm = false" large> Cancelar </v-btn>
                                          </v-col>
                                          <v-col cols="3" class="ml-8">
                                             <v-btn :color="color" @click="registerCoordinator()" large> Aceptar </v-btn>
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
                              <v-dialog v-model="deleteCoordinator" width="800px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item v-bind="attrs" v-on="on">
                                       <v-list-item-title>Eliminar Mentor</v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <h2>Eliminar Mentor de sede</h2>
                                    </v-card-title>
                                    <v-spacer></v-spacer>
                                    <v-card-text>
                                       <v-form>
                                          <v-row align="center" justify="center">
                                             <v-col cols="12">
                                                <div class="text-center">
                                                   <h2>
                                                      ¿Está seguro que desea eliminar el Mentor de sede
                                                      {{ item.name + " " + item.lastName }}?
                                                   </h2>
                                                </div>
                                             </v-col>
                                          </v-row>
                                       </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8">
                                             <v-btn :color="color" @click="deleteCoordinator = false" large> Cancelar </v-btn>
                                          </v-col>
                                          <v-col cols="3" class="ml-8">
                                             <v-btn :color="color" @click="deleteSeletectedCoordinator(item)" large> Aceptar </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                              <v-dialog v-model="modifyCoordinator" width="800px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item v-bind="attrs" v-on="on">
                                       <v-list-item-title>Editar Mentor de Sede</v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <h2>Editar Mentor de Sede</h2>
                                    </v-card-title>
                                    <v-spacer></v-spacer>
                                    <v-card-text>
                                       <v-form>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10" v-if="user.user.data.privilege === 'coordinador general'">
                                                Institución Educativa
                                                <v-autocomplete
                                                   v-model="selectedHeiAux2"
                                                   :items="heisAux2"
                                                   item-text="heiName"
                                                   :color="color"
                                                   :filter="customFilterAux2"
                                                   @change="changeHei2()"
                                                ></v-autocomplete>
                                             </v-col>
                                          </v-row>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field :maxlength="maxLength" label="Nombre" outlined :color="color" v-model="item.name">
                                                </v-text-field>
                                             </v-col>
                                          </v-row>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field
                                                   :maxlength="maxLength"
                                                   label="Apellidos"
                                                   outlined
                                                   :color="color"
                                                   v-model="item.lastName"
                                                ></v-text-field>
                                             </v-col>
                                          </v-row>
                                       </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8">
                                             <v-btn :color="color" @click="modifyCoordinator = false" large> Cancelar </v-btn>
                                          </v-col>
                                          <v-col cols="3" class="ml-8">
                                             <v-btn :color="color" @click="changeCoordinator(item)" large> Aceptar </v-btn>
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
import * as EventDA from "@/dataAccess/eventDA.js";
import * as RolesDA from "@/dataAccess/rolesDA.js";
import { mapState } from "vuex";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
   name: "Mentors",
   components: {
      Sidebar,
      Navbar2,
   },
   data() {
      return {
         loadingParticipants: true,
         color: "FFFF",
         maxLength: 200,
         selectedHeiRegister: {
            idHei: null,
            heiName: "",
         },
         editSelectedHei: {
            idHei: null,
            heiName: "",
         },
         newCoordinator: {
            name: "",
            lastName: "",
            email: "",
            userType: "mentor",
         },
         currentEvent: null,
         selectedHei: "",
         selectedHeiAux: "",
         selectedHeiAux2: "",
         selectedIdHei: null,
         modifyCoordinator: false,
         dialogForm: false,
         deleteCoordinator: false,
         namesFilterValue: "",
         lastNameFilterValue: "",
         emailFilterValue: "",
         heiNameFilterValue: "",
         roleTypeFilterValue: null,
         orderFilterValue: "",
         roleTypeList: [
            { text: "Coordinador de Sede", value: "Coordinador" },
            { text: "Mentor", value: "Mentor" },
         ],
         coordinators: [],
         coordinatorFilter: [],
         heis: [],
         heisAux: [],
         heisAux2: [],
      };
   },
   validations() {
      return {
         newCoordinator: {
            name: {
               required,
               maxLength: maxLength(250),
            },
            email: {
               required,
               email,
               maxLength: maxLength(250),
            },
            lastName: {
               required,
               maxLength: maxLength(250),
            },
         },
      };
   },
   computed: {
      ...mapState(["community", "user", "style"]),
      newNameErrors() {
         const errors = [];
         if (!this.$v.newCoordinator.name.$dirty) return errors;
         !this.$v.newCoordinator.name.required && errors.push("Ingresar el nombre del mentor");
         return errors;
      },
      newEmailErrors() {
         const errors = [];
         if (!this.$v.newCoordinator.email.$dirty) return errors;
         !this.$v.newCoordinator.email.email && errors.push("Ingresar un correo válido");
         !this.$v.newCoordinator.email.required && errors.push("Ingresar el correo del mentor");
         return errors;
      },
      newLastNameErrors() {
         const errors = [];
         if (!this.$v.newCoordinator.lastName.$dirty) return errors;
         !this.$v.newCoordinator.lastName.required && errors.push("Ingresar el apellido del mentor");
         return errors;
      },

      headers() {
         return [
            {
               text: "Nombre",
               value: "name",
               sortable: false,
               filter: this.namesFilter,
            },
            {
               text: "Apellidos",
               value: "lastName",
               sortable: false,
               filter: this.lastNameFilter,
            },
            {
               text: "Correo",
               value: "email",
               sortable: false,
               filter: this.emailFilter,
            },
            {
               text: "Acciones",
               value: "actions",
               sortable: false,
            },
         ];
      },
   },
   methods: {
      deleteSeletectedCoordinator(item) {
         console.log("eliminar coordinador:", item);
         this.deleteCoordinator = false;
         RolesDA.deleteAdmin(item.idUserDomain)
            .then((resp) => {
               console.log(resp);
               this.$swal.fire(
                  "El mentor de sede se ha eliminado  del evento",
                  "Se ha eliminado el mentor de sede " + item.name + " " + item.lastName + " en el evento con éxito",
                  "success"
               );
               let index;
               for (let i = 0; i < this.coordinatorFilter.length; i++) {
                  if (this.coordinatorFilter[i].idRole === item.idRole) {
                     index = i;
                     break;
                  }
               }
               this.coordinatorFilter.splice(index, 1);
               this.coordinators.splice(index, 1);
            })
            .catch((err) => {
               console.log(err.response.data);
            });
      },
      changeHei() {
         for (let i = 0; i < this.heisAux.length; i++) {
            if (this.heisAux[i].heiName === this.selectedHeiAux) {
               this.selectedHeiRegister.heiName = this.heisAux[i].heiName;
               this.selectedHeiRegister.idHei = this.heisAux[i].idHei;
               break;
            }
         }
         console.log("selected hei", this.selectedHeiRegister);
      },
      changeHei2() {
         for (let i = 0; i < this.heisAux2.length; i++) {
            if (this.heisAux2[i].heiName === this.selectedHeiAux2) {
               this.editSelectedHei.heiName = this.heisAux2[i].heiName;
               this.editSelectedHei.idHei = this.heisAux2[i].idHei;
               break;
            }
         }
         console.log("selected hei", this.editSelectedHei);
      },

      registerCoordinator() {
         this.$v.newCoordinator.$touch();
         if (!this.$v.newCoordinator.$invalid) {
            this.dialogForm = false;
            console.log("hei seleccionado", this.selectedHeiRegister);
            console.log("Mentor: ", this.newCoordinator);
            let body = null;
            if (this.user.user.data.privilege === "coordinador general") {
               body = {
                  idHei: this.selectedHeiRegister.idHei,
                  name: this.newCoordinator.name,
                  lastName: this.newCoordinator.lastName,
                  email: this.newCoordinator.email,
                  privilege: "mentor",
               };
            }
            if (this.user.user.data.privilege === "coordinador de sede") {
               body = {
                  idHei: this.user.user.data.idHei,
                  name: this.newCoordinator.name,
                  lastName: this.newCoordinator.lastName,
                  email: this.newCoordinator.email,
                  privilege: "mentor",
               };
            }

            RolesDA.registerNewRole(this.currentEvent.idUEvent, body)
               .then((resp) => {
                  console.log("resp", resp);
                  //validating null password
                  if (resp.data.payload.password) {
                     this.$swal.fire(
                        "Mentor de Sede creado en el evento",
                        "Se ha creado el mentor de sede " + this.newCoordinator.name + " en el evento con éxito " + resp.data.payload.password,
                        "success"
                     );
                  } else {
                     this.$swal.fire(
                        "Mentor de Sede creado en el evento",
                        "Se ha creado el mentor de sede " + this.newCoordinator.name + " en el evento con éxito ",
                        "success"
                     );
                  }
                  this.selectedHeiRegister.idHei = null;
                  this.selectedHeiRegister.heiName = "";
                  this.newCoordinator.name = "";
                  this.newCoordinator.lastName = "";
                  this.newCoordinator.email = "";
                  this.getCampusCoordinator();
               })
               .catch((err) => {
                  this.$swal.fire("Ocurrió un problema", "No se pudo registrar el mentor de sede en el evento", "error");
                  console.log(err.response.data);
               });
         }
      },
      changeCoordinator(item) {
         console.log("Modificando el mentor con id: ", item.idUserDomain);
         let body = null;
         if (this.user.user.data.privilege === "coordinador general") {
            body = {
               idHei: this.editSelectedHei.idHei,
               idUserDomain: item.idUserDomain,
               name: item.name,
               lastName: item.lastName,
               idUEvent: this.currentEvent.idUEvent,
            };
         }
         if (this.user.user.data.privilege === "coordinador de sede") {
            body = {
               idHei: this.user.user.data.idHei,
               idUserDomain: item.idUserDomain,
               name: item.name,
               lastName: item.lastName,
            };
         }

         this.modifyCoordinator = false;
         RolesDA.editAdminRole(body)
            .then((resp) => {
               console.log(resp);
               this.$swal.fire(
                  "Mentor de Sede Modificado",
                  "Se ha modificado el mentor de sede " + item.name + " " + item.lastName + "en el evento con éxito",
                  "success"
               );
            })
            .catch((err) => {
               this.$swal.fire("Ocurrió un problema", "No se pudo modificar el mentor de sede en el evento", "error");
               console.log(err.response);
            });
      },
      namesFilter(value) {
         if (!this.namesFilterValue) {
            return true;
         }
         return value.toLowerCase().includes(this.namesFilterValue.toLowerCase());
      },
      emailFilter(value) {
         if (!this.emailFilterValue) {
            return true;
         }
         return value.toLowerCase().includes(this.emailFilterValue.toLowerCase());
      },
      roleTypeFilter(value) {
         if (!this.roleTypeFilterValue) {
            return true;
         }
         return value === this.roleTypeFilterValue;
      },
      lastNameFilter(value) {
         if (!this.lastNameFilterValue) {
            return true;
         }
         return value.toLowerCase().includes(this.lastNameFilterValue.toLowerCase());
      },
      customFilter(item, queryText) {
         const textOne = item.heiName.toLowerCase();
         const searchText = queryText.toLowerCase();
         return textOne.indexOf(searchText) > -1;
      },
      customFilterAux(item, queryText) {
         const textOne = item.heiName.toLowerCase();
         const searchText = queryText.toLowerCase();
         return textOne.indexOf(searchText) > -1;
      },
      customFilterAux2(item, queryText) {
         const textOne = item.heiName.toLowerCase();
         const searchText = queryText.toLowerCase();
         return textOne.indexOf(searchText) > -1;
      },
      filterHeis() {
         console.log("hola soy un filtro");
         console.log("selectedHei:", this.selectedHei);
         const result = this.coordinators.filter((coordinator) => coordinator.idHei === this.selectedHei);
         this.coordinatorFilter = result;
      },
      getHeis() {
         EventDA.getHeisByEvent(this.currentEvent.idUEvent)
            .then((response) => {
               console.log(response);
               let data = response.data.payload;
               for (let i = 0; i < data.length; i++) {
                  let hei = {
                     idHei: data[i].idHei,
                     heiName: data[i].name,
                  };
                  this.heis.push(hei);
                  this.heisAux.push(hei);
                  this.heisAux2.push(hei);
               }
            })
            .catch((error) => {
               console.log(error);
            });
      },
      getCampusCoordinator() {
         this.coordinators = [];
         this.coordinatorFilter = [];
         RolesDA.getAdminRoles(this.currentEvent.idUEvent)
            .then((resp) => {
               console.log(resp.data.payload);
               console.log(this.user.user);
               if (this.user.user.data.privilege === "coordinador general") {
                  for (let i = 0; i < resp.data.payload.length; i++) {
                     if (resp.data.payload[i].privilege == "mentor") {
                        let auxCoordinator = {
                           idHei: resp.data.payload[i].idHei,
                           heiName: resp.data.payload[i].nameHei,
                           idUserDomain: resp.data.payload[i].idUser,
                           name: resp.data.payload[i].name,
                           lastName: resp.data.payload[i].lastName,
                           email: resp.data.payload[i].email,
                           roleType: resp.data.payload[i].privilege,
                        };
                        this.coordinators.push(auxCoordinator);
                        this.coordinatorFilter.push(auxCoordinator);
                     }
                  }
               }
               if (this.user.user.data.privilege === "coordinador de sede") {
                  for (let i = 0; i < resp.data.payload.length; i++) {
                     if (resp.data.payload[i].privilege == "mentor" && resp.data.payload[i].idHei === this.user.user.data.idHei) {
                        let auxCoordinator = {
                           idHei: resp.data.payload[i].idHei,
                           heiName: resp.data.payload[i].nameHei,
                           idUserDomain: resp.data.payload[i].idUser,
                           name: resp.data.payload[i].name,
                           lastName: resp.data.payload[i].lastName,
                           email: resp.data.payload[i].email,
                           roleType: resp.data.payload[i].privilege,
                        };
                        this.coordinators.push(auxCoordinator);
                        this.coordinatorFilter.push(auxCoordinator);
                     }
                  }
               }
               this.loadingParticipants = false;
            })
            .catch((err) => {
               this.loadingParticipants = false;
               console.log("err", err.response);
            });
      },
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then((resp) => {
            this.currentEvent = resp.data.payload;
            this.getHeis();
            this.getCampusCoordinator();
         })
         .catch((err) => {
            console.log("err", err.response.data);
         });
   },
};
</script>
