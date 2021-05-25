<template>
   <div>
      <Navbar></Navbar>
      <v-row>
         <v-col cols="3">
            <Sidebar></Sidebar>
         </v-col>
         <v-col cols="8">
            <v-row>
               <v-col cols="12">
                  <h1>EQUIPOS EN EL EVENTO</h1>
               </v-col>

               <v-col cols="3">
                  <download-excel class="btn" :data="teamsFilter" name="Equipos.xls">
                     <v-btn :color="color" large> Descargar Tabla</v-btn></download-excel
                  >
               </v-col>
               <v-col cols="5"></v-col>
               <v-col cols="4" v-if="user.user.data.privilege === 'coordinador general'"
                  >Institución Educativa
                  <v-autocomplete
                     v-model="selectedHei"
                     :items="heis"
                     item-text="nameHei"
                     item-value="idHei"
                     :color="color"
                     :filter="customFilter"
                     @change="filterHeis"
                  ></v-autocomplete>
               </v-col>

               <v-col cols="12">
                  <v-data-table
                     :headers="headers"
                     :items="teamsFilter"
                     item-key="idTeam"
                     class="elevation-1"
                     :color="color"
                     :loading="loadingParticipants"
                     loading-text="Cargando"
                  >
                     <template v-slot:body.prepend>
                        <tr>
                           <td>
                              <v-text-field :color="color" :maxlength="maxLength" v-model="idTeam" type="number" label="Buscar"></v-text-field>
                           </td>
                           <td>
                              <v-text-field :color="color" :maxlength="maxLength" v-model="teamName" type="text" label="Buscar"></v-text-field>
                           </td>
                           <td>
                              <v-text-field :color="color" :maxlength="maxLength" v-model="nameStage" type="text" label="Buscar"></v-text-field>
                           </td>
                           <td>
                              <v-text-field :color="color" :maxlength="maxLength" v-model="nameChallenge" type="text" label="Buscar"></v-text-field>
                           </td>
                           <td>
                              <v-text-field :color="color" :maxlength="maxLength" v-model="nameTeamLeader" type="text" label="Buscar"></v-text-field>
                           </td>
                           <td>
                              <v-text-field :color="color" :maxlength="maxLength" v-model="state" type="text" label="Buscar"></v-text-field>
                           </td>
                           <td colspan="1"></td>
                        </tr>
                     </template>
                     <template v-slot:item.teamName="{ item }">
                        <v-img
                           :src="
                              item.logoURL
                                 ? item.logoURL.indexOf(`s3.amazonaws.com`) > -1
                                    ? item.logoURL
                                    : require(`@/assets/` + item.logoURL)
                                 : null
                           "
                           max-height="50"
                           max-width="50"
                        ></v-img>
                        {{ item.teamName }}
                     </template>
                     <template v-slot:item.nameStage="{ item }">
                        <v-chip :color="getColor(item.nameStage)" label outlined>
                           {{ item.nameStage }}
                        </v-chip>
                     </template>
                     <template v-slot:item.actions="{ item }">
                        <v-menu offset-y>
                           <template v-slot:activator="{ on, attrs }">
                              <v-btn :color="color" icon v-bind="attrs" v-on="on">
                                 <v-icon>mdi-dots-horizontal</v-icon>
                              </v-btn>
                           </template>
                           <v-list>
                              <v-dialog v-model="dialogTeam" width="800px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item @click="getTeamMembers(item)" v-bind="attrs" v-on="on">
                                       <v-list-item-title>Ver Equipo</v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <h2>
                                          {{ item.teamName }}
                                       </h2>
                                    </v-card-title>
                                    <v-spacer></v-spacer>
                                    <v-card-subtitle>
                                       <h2>MIEMBROS DEL EQUIPO</h2>
                                    </v-card-subtitle>
                                    <v-spacer></v-spacer>
                                    <v-card-text>
                                       <v-row align="center" justify="center">
                                          <v-col cols="4"></v-col>
                                          <v-data-table :items="teamMembers" :headers="headersTeam" item-key="idUser"> </v-data-table>
                                          <v-col cols="4"></v-col>
                                       </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8" align="end" justify="end">
                                             <v-btn :color="color" @click="dialogTeam = false" large>
                                                Aceptar
                                             </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>

                              <v-dialog v-model="dialogProgress" width="800px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item @click="getHeiStages(item)" v-bind="attrs" v-on="on">
                                       <v-list-item-title>Asignar Fase</v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <h2>
                                          {{ item.teamName }}
                                       </h2>
                                    </v-card-title>
                                    <v-spacer></v-spacer>
                                    <v-card-subtitle>
                                       <h2>SELECCIONAR ESTADO DE PROGRESO</h2>
                                    </v-card-subtitle>
                                    <v-spacer></v-spacer>
                                    <v-card-text>
                                       <v-row align="center" justify="center">
                                          <v-col cols="4"></v-col>
                                          <v-autocomplete
                                             v-model="selectedStage"
                                             :items="stages"
                                             item-text="phaseName"
                                             :color="color"
                                             :filter="customFilterStage"
                                             return-object
                                          ></v-autocomplete>
                                          <v-col cols="4"></v-col>
                                       </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8" align="end" justify="end">
                                             <v-btn :color="color" @click="dialogProgress = false" large>
                                                Cancelar
                                             </v-btn>
                                          </v-col>
                                          <v-col cols="3" class="ml-8">
                                             <v-btn :color="color" @click="changeProgress(item)" dark large>
                                                Aceptar
                                             </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                              <v-dialog v-if="item.idChallenge == null" v-model="dialogChallenge" width="800px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item v-bind="attrs" v-on="on">
                                       <v-list-item-title>Asignar Reto</v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <h2>
                                          {{ item.teamName }}
                                       </h2>
                                    </v-card-title>
                                    <v-spacer></v-spacer>
                                    <v-card-subtitle>
                                       <h2>SELECCIONAR RETO</h2>
                                    </v-card-subtitle>
                                    <v-spacer></v-spacer>
                                    <v-card-text>
                                       <v-row align="center" justify="center">
                                          <v-col cols="4"></v-col>
                                          <v-autocomplete
                                             v-model="selectedChallenge"
                                             :items="challenges"
                                             item-text="name"
                                             :color="color"
                                             :filter="customFilterChallenge"
                                             return-object
                                          ></v-autocomplete>
                                          <v-col cols="4"></v-col>
                                       </v-row>
                                       <v-card-actions>
                                          <v-row align="center" justify="center">
                                             <v-col cols="4" class="mr-8" align="end" justify="end">
                                                <v-btn :color="color" @click="dialogChallenge = false" large>
                                                   Cancelar
                                                </v-btn>
                                             </v-col>
                                             <v-col cols="4" class="ml-8">
                                                <v-btn :color="color" @click="selectChallenge(item)" dark large>
                                                   Aceptar
                                                </v-btn>
                                             </v-col>
                                          </v-row>
                                       </v-card-actions>
                                    </v-card-text>
                                 </v-card>
                              </v-dialog>
                              <v-dialog v-model="dialogLeader" width="800px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item @click="getTeamMembers(item)" v-bind="attrs" v-on="on">
                                       <v-list-item-title>Modificar Líder</v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <h2>
                                          {{ item.teamName }}
                                       </h2>
                                    </v-card-title>
                                    <v-spacer></v-spacer>
                                    <v-card-subtitle>
                                       <h2>
                                          SELECCIONAR EL NUEVO LÍDER DE EQUIPO
                                       </h2>
                                    </v-card-subtitle>
                                    <v-spacer></v-spacer>
                                    <v-card-text>
                                       <v-row align="center" justify="center">
                                          <v-col cols="4"></v-col>
                                          <v-autocomplete
                                             v-model="selectedLeader"
                                             :items="teamMembers"
                                             :item-text="memberName"
                                             :color="color"
                                             :filter="customFilterMembers"
                                             return-object
                                          ></v-autocomplete>
                                          <v-col cols="4"></v-col>
                                       </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8" align="end" justify="end">
                                             <v-btn :color="color" @click="dialogLeader = false" large>
                                                Cancelar
                                             </v-btn>
                                          </v-col>
                                          <v-col cols="3" class="ml-8">
                                             <v-btn :color="color" @click="changeLeader(item)" dark large>
                                                Aceptar
                                             </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                              <v-dialog v-if="item.state == `Conformado`" v-model="dialogValidate" width="800px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item v-bind="attrs" v-on="on">
                                       <v-list-item-title>Validar Equipo</v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <h2>
                                          {{ item.teamName }}
                                       </h2>
                                    </v-card-title>
                                    <v-spacer></v-spacer>
                                    <v-row align="center" justify="center">
                                       <v-card-subtitle>
                                          <h2>
                                             ¿Está seguro que desea validar el equipo?
                                          </h2>
                                       </v-card-subtitle>
                                    </v-row>
                                    <v-spacer></v-spacer>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="4" class="mr-8" align="end" justify="end">
                                             <v-btn :color="color" @click="dialogValidate = false" large>
                                                Cancelar
                                             </v-btn>
                                          </v-col>
                                          <v-col cols="4" class="ml-8">
                                             <v-btn :color="color" @click="validateTeam(item)" dark large>
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

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import { mapState } from "vuex";
import * as TeamsDA from "@/dataAccess/teamsDA.js";
import * as EventDA from "@/dataAccess/eventDA.js";
import * as ChallengesDA from "@/dataAccess/challengesDA.js";

export default {
   name: "Teams",
   components: {
      Sidebar,
      Navbar
   },
   data() {
      return {
         maxLength: 200,
         loadingParticipants: true,
         dialogTeam: false,
         loadingDialogTeam: false,
         dialogStage: false,
         dialogProgress: false,
         dialogValidate: false,
         dialogChallenge: false,
         dialogLeader: false,
         idUEvent: null,
         selectedStage: "",
         idTeam: null,
         selectedHei: "",
         selectedChallenge: "",
         selectedLeader: "",
         teamName: "",
         nameStage: "",
         nameChallenge: "",
         nameTeamLeader: "",
         state: "",
         newTeamsList: [],
         heis: [],
         teams: [],
         teamsFilter: [],
         challenges: [],
         teamMembers: [],
         stages: [],
         teamStages: []
      };
   },
   methods: {
      memberName(item) {
         return item.name + " " + item.lastName;
      },
      getTeamMembers(item) {
         this.loadingDialogTeam = true;
         console.log("entre a getTeamMembers");
         TeamsDA.getUsersOfTeam(item.idTeam)
            .then(response => {
               console.log("respuesta getUsersOfTeam", response.data);
               this.teamMembers = response.data.payload;
            })
            .catch(error => {
               console.log("error getUsersOfTeam ", error);
            });
      },
      getHeiStages(item) {
         //Filter stages array to only show the ones that matches hei with item's hei
         const newStages = this.stages.filter(stage => stage.idHei === item.idHei);
         this.stages = newStages;
      },
      getColor(nameStage) {
         if (nameStage === "Final") return "green";
         else if (nameStage === "Etapa 1") return "red";
         else if (nameStage === "Semifinal") return "orange";
      },
      customFilter(item, queryText) {
         const textOne = item.heiName.toLowerCase();
         const searchText = queryText.toLowerCase();

         return textOne.indexOf(searchText) > -1;
      },

      filterHeis() {
         const result = this.teams.filter(team => team.idHei === this.selectedHei);
         this.teamsFilter = result;
      },
      customFilterChallenge(item, queryText) {
         const textOne = item.name.toLowerCase();
         const searchText = queryText.toLowerCase();

         return textOne.indexOf(searchText) > -1;
      },
      customFilterMembers(item, queryText) {
         const textOne = item.name.toLowerCase();
         const searchText = queryText.toLowerCase();

         return textOne.indexOf(searchText) > -1;
      },
      customFilterStage(item, queryText) {
         const textOne = item.name.toLowerCase();
         const searchText = queryText.toLowerCase();

         return textOne.indexOf(searchText) > -1;
      },
      changeProgress(item) {
         console.log("item", item);
         console.log("selected stage", this.selectedStage);
         this.dialogProgress = false;
         TeamsDA.changeProgress(item.idTeam, this.selectedStage.idPhase)
            .then(response => {
               console.log("respuesta change progress", response.data);
               //filter teams and teamsFilter
               item.nameStage = this.selectedStage.phaseName;

               //Here goes the swal success alert
               this.dialogProgress = false;
               this.$swal.fire("Progreso Cambiado", "Se ha cambiado el progreso del equipo con éxito", "success");
            })
            .catch(error => {
               console.log("error al change progress ", error.response.data);
               //Here goes the swal error alert
               this.dialogProgress = false;
               this.$swal.fire("Ocurrió un problema", "No se pudo cambiar el progreso del equipo", "error");
            });
      },
      validateTeam(item) {
         console.log("item", item);
         TeamsDA.validateTeam(item.idTeam)
            .then(response => {
               console.log("respuesta validateTeam", response.data);
               //Here goes the swal success alert
               this.dialogValidate = false;
               item.state = "Validado";
               this.$swal.fire("Equipo Validado", "Se ha validado el equipo con éxito", "success");
            })
            .catch(error => {
               console.log("error al seleccionar reto ", error);
               //Here goes the swal error alert
               this.dialogValidate = false;
               this.$swal.fire("Ocurrió un problema", "No se pudo validar el equipo", "error");
            });
      },
      selectChallenge(item) {
         console.log("item", item);
         console.log("selected challenge object", this.selectedChallenge);
         TeamsDA.selectChallenge(item.idTeam, this.selectedChallenge.idChallenge)
            .then(response => {
               console.log("respuesta selectChallenge", response.data);
               //Here goes the swal success alert
               this.dialogChallenge = false;
               item.nameChallenge = this.selectedChallenge.name;
               this.$swal.fire("Reto Asignado", "Se ha asignado el reto con éxito", "success");
            })
            .catch(error => {
               console.log("error al seleccionar reto ", error);
               //Here goes the swal error alert
               this.dialogChallenge = false;
               this.$swal.fire("Ocurrió un problema", "No se pudo asignar el reto para el equipo", "error");
            });
      },
      changeLeader(item) {
         console.log("item", item);
         console.log("selected Leader", this.selectedLeader);
         TeamsDA.changeLeader(item.idTeam, this.selectedLeader.idUser)
            .then(response => {
               item.nameTeamLeader = this.selectedLeader.name + " " + this.selectedLeader.lastName;
               console.log("respuesta changeLeader", response.data);
               //Here goes the swal success alert
               this.dialogLeader = false;
               this.$swal.fire("Líder de Equipo Modificado", "Se ha modificado el líder de equipo con éxito", "success");
            })
            .catch(error => {
               console.log("error changeLeader ", error);
               //Here goes the swal error alert
               this.dialogLeader = false;
               this.$swal.fire("Ocurrió un problema", "No se pudo modificar el líder de equipo", "error");
            });
      }
   },
   computed: {
      ...mapState(["idUser", "loggedUser", "generalConfig", "community", "user", "style"]),
      headers() {
         return [
            {
               text: "ID Equipo",
               align: "start",
               sortable: true,
               value: "idTeam",
               filter: value => {
                  if (!this.idTeam) return true;

                  return value === parseInt(this.idTeam);
               }
            },
            {
               text: "Nombre del equipo",
               align: "start",
               sortable: true,
               value: "teamName",
               filter: value => {
                  if (!this.teamName) return true;
                  return value.toUpperCase().indexOf(this.teamName.toUpperCase()) > -1;
               }
            },
            {
               text: "Fase",
               align: "start",
               sortable: true,
               value: "nameStage",
               filter: value => {
                  if (!this.nameStage) return true;
                  if (value) {
                     return value.toUpperCase().indexOf(this.nameStage.toUpperCase()) > -1;
                  }
               }
            },
            {
               text: "Retos",
               align: "start",
               sortable: true,
               value: "nameChallenge",
               filter: value => {
                  if (!this.nameChallenge) return true;
                  if (value) {
                     return value.toUpperCase().indexOf(this.nameChallenge.toUpperCase()) > -1;
                  }
               }
            },
            {
               text: "Líder de equipo",
               align: "start",
               sortable: true,
               value: "nameTeamLeader",
               filter: value => {
                  if (!this.nameTeamLeader) return true;
                  if (value) {
                     return value.toUpperCase().indexOf(this.nameTeamLeader.toUpperCase()) > -1;
                  }
               }
            },
            {
               text: "Estado",
               align: "start",
               sortable: true,
               value: "state",
               filter: value => {
                  if (!this.state) return true;
                  if (value) {
                     return value.toUpperCase().indexOf(this.state.toUpperCase()) > -1;
                  }
               }
            },
            {
               text: "Acciones",
               value: "actions",
               sortable: false
            }
         ];
      },
      headersTeam() {
         return [
            {
               text: "Nombres",
               sortable: false,
               value: "name"
            },
            {
               text: "Apellidos",
               sortable: false,
               value: "lastName"
            },
            {
               text: "Especialidad",
               sortable: false,
               value: "nameCourse"
            },
            {
               text: "Sede",
               sortable: false,
               value: "nameHei"
            },
            {
               text: "Género",
               sortable: false,
               value: "gender"
            },
            {
               text: "Tipo de inscripción",
               sortable: false,
               value: "state"
            }
         ];
      }
   },

   mounted() {
      this.color = this.style.style.colors.primary;
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then(response => {
            console.log("respuesta evento", response.data);
            this.idUEvent = response.data.payload.idUEvent;

            console.log("idUEvent", this.idUEvent);
            TeamsDA.getTeamList(this.idUEvent)
               .then(response => {
                  console.log("respuesta getTeamList", response.data);
                  console.log("heis", response.data.payload.heis);
                  this.heis = response.data.payload.heis;
                  if (this.user.user.data.privilege === "coordinador general") {
                     this.teams = response.data.payload.teams;
                     this.teamsFilter = response.data.payload.teams;
                  } else {
                     for (let i = 0; i < response.data.payload.teams.length; i++) {
                        if (response.data.payload.teams[i].idHei === this.user.user.data.idHei) {
                           this.teams.push(response.data.payload.teams[i]);
                           this.teamsFilter.push(response.data.payload.teams[i]);
                        }
                     }
                  }
                  this.loadingParticipants = false;
               })
               .catch(error => {
                  console.log("error al obtener team list ", error.response.data);
                  this.loadingParticipants = false;
               });
            TeamsDA.listStages(this.idUEvent)
               .then(response => {
                  console.log("response list stages", response.data);
                  this.stages = response.data.payload.stages;
               })
               .catch(error => {
                  console.log("error al obtener team list ", error);
               });
            ChallengesDA.getChallenges(this.idUEvent)
               .then(response => {
                  console.log("response list challenges", response.data);
                  console.log("size challenges", response.data.payload.length);
                  this.challenges = response.data.payload;
               })
               .catch(error => {
                  console.log("error al list challenges ", error);
               });
         })
         .catch(error => {
            console.log("error al obtener backend event + ", error);
         });
   }
};
</script>
