<template>
   <div>
      <Navbar2></Navbar2>
      <loading :active.sync="loadingUpload" :can-cancel="false" :is-full-page="false" :color="color"></loading>
      <v-row>
         <v-col cols="3">
            <Sidebar></Sidebar>
         </v-col>
         <v-col cols="8">
            <v-row>
               <v-col cols="12">
                  <h1>INSCRITOS EN EL EVENTO</h1>
               </v-col>
               <v-col cols="8"></v-col>
               <v-col cols="4" v-if="this.login.login.privilege === `coordinador general`"
                  >Institución Educativa
                  <v-autocomplete
                     :color="color"
                     v-model="selectedHei"
                     :items="heis"
                     item-text="heiName"
                     :filter="heiFilter"
                     @change="filterHeis"
                  ></v-autocomplete>
               </v-col>
               <v-col cols="8"></v-col>
               <v-col cols="4"
                  >Tipo de inscripción
                  <v-autocomplete
                     v-model="selectedType"
                     :items="inscriptionTypes"
                     item-text="inscription"
                     :filter="inscriptionFilter"
                     @change="filterInscriptions"
                     :color="color"
                  ></v-autocomplete>
               </v-col>
               <v-col cols="12">
                  <v-data-table
                     locale="es"
                     :items="inscribidesFiltered"
                     :headers="headers"
                     v-model="selected"
                     show-select
                     :color="color"
                     :single-select="singleSelect"
                     :loading="loadingParticipants"
                     loading-text="Cargando"
                  >
                     <template v-slot:body.prepend>
                        <tr>
                           <td colspan="1"></td>
                           <td colspan="1">
                              <v-text-field :color="color" single-line hide-details v-model="namesFilterValue"></v-text-field>
                           </td>
                           <td colspan="1">
                              <v-select :color="color" class="pt-5 mt-4" :items="gendersList" v-model="genderFilterValue"></v-select>
                           </td>
                           <td colspan="1">
                              <v-text-field :color="color" single-line hide-details v-model="courseFilterValue"></v-text-field>
                           </td>
                           <td colspan="1">
                              <v-text-field :color="color" single-line hide-details v-model="codeFilterValue"></v-text-field>
                           </td>
                           <td colspan="1">
                              <v-text-field :color="color" single-line hide-details v-model="teamFilterValue"></v-text-field>
                           </td>
                           <td colspan="1">
                              <v-select :color="color" class="pt-5 mt-4" :items="statesList" v-model="conditionFilterValue"></v-select>
                           </td>
                        </tr>
                     </template>
                     <template v-slot:top>
                        <v-spacer></v-spacer>
                        <v-row>
                           <v-col cols="6"></v-col>
                           <v-col cols="3">
                              <v-dialog v-model="dialogSuggestion" max-width="900px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-btn :color="color" dark large v-bind="attrs" v-on="on"> SUGERENCIA DE EQUIPO </v-btn>
                                 </template>
                                 <v-card>
                                    <v-card-title class="justify-center">
                                       <h4>SUGERENCIA DE EQUIPO</h4>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                       <v-row v-if="login.login.privilege === 'coordinador general'" justify="space-around">
                                          <v-col cols="6">
                                             <v-subheader>Institución Educativa</v-subheader>
                                             <v-autocomplete
                                                v-model="selectedHeiSuggest"
                                                label="Seleccione una opcion"
                                                :items="heis"
                                                item-text="heiName"
                                                solo
                                                :color="color"
                                                @change="selectHeiSuggest()"
                                             >
                                             </v-autocomplete>
                                          </v-col>
                                       </v-row>
                                       <v-row justify="space-around">
                                          <v-col cols="6">
                                             <v-subheader>Criterio</v-subheader>
                                             <v-autocomplete
                                                v-model="selectedCriteria"
                                                label="Seleccione una opcion"
                                                :items="criteria"
                                                item-text="name"
                                                solo
                                                :color="color"
                                                @change="selectCriteria()"
                                             >
                                             </v-autocomplete>
                                          </v-col>
                                       </v-row>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8">
                                             <v-btn :color="color" @click="suggestTeam()" large> Sugerir equipos</v-btn>
                                          </v-col>
                                       </v-row>
                                       <v-form>
                                          <br />
                                          <v-row>
                                             <v-data-table
                                                :items="suggest"
                                                :headers="headersSuggest"
                                                v-model="selectedSuggest"
                                                show-select
                                                :single-select="false"
                                                :color="color"
                                                item-key="idUser"
                                                :loading="loadingParticipantsSuggest"
                                                loading-text="Cargando"
                                             >
                                             </v-data-table>
                                          </v-row>
                                       </v-form>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8">
                                             <v-btn :color="color" @click="dialogSuggestion = false" large> Cerrar </v-btn>
                                          </v-col>
                                          <v-col cols="3" class="ml-8">
                                             <v-btn :color="color" :disabled="disabledEquipo" @click="createTeamSuggest()" large>
                                                Formar equipo
                                             </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                           </v-col>
                           <v-col cols="3">
                              <v-dialog v-model="dialogForm" max-width="700px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-btn :color="color" dark large v-bind="attrs" v-on="on" @click="SelectLeader()"> FORMAR EQUIPO </v-btn>
                                 </template>
                                 <v-card v-if="invalidCantTeam">
                                    <v-card-title class="justify-center">
                                       <h4>FORMACION DE EQUIPO</h4>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                       <br />
                                       <v-row align="center" justify="center">
                                          <v-col cols="10">
                                             <h3>
                                                La cantidad de participantes para formar un equipo debe de ser mayor a
                                                {{ eventData.minPerGroup - 1 }} y menor a {{ eventData.maxPerGroup + 1 }}.
                                             </h3>
                                          </v-col>
                                       </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="ml-8">
                                             <v-btn :color="color" @click="dialogForm = false" large> Aceptar</v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                                 <v-card v-else>
                                    <v-card-title class="justify-center">
                                       <h4>FORMACION DE EQUIPO</h4>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                       <v-form>
                                          <br />
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field
                                                   label="Nombre de equipo"
                                                   solo
                                                   outlined
                                                   required
                                                   :color="color"
                                                   v-model="teamCreated.name"
                                                   :error-messages="nameErrors"
                                                   @input="$v.teamCreated.name.$touch()"
                                                   @blur="$v.teamCreated.name.$touch()"
                                                ></v-text-field>
                                             </v-col>
                                          </v-row>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-textarea
                                                   label="Criterio de conformacion"
                                                   solo
                                                   outlined
                                                   required
                                                   :color="color"
                                                   v-model="teamCreated.justificacion"
                                                   :error-messages="justificationErrors"
                                                   @input="$v.teamCreated.justificacion.$touch()"
                                                   @blur="$v.teamCreated.justificacion.$touch()"
                                                ></v-textarea>
                                             </v-col>
                                          </v-row>
                                          <v-row>
                                             <v-data-table :items="selected" :headers="headersPopUp">
                                                <template v-slot:item.teamLeader="props">
                                                   <input :color="color" type="checkbox" :checked="props.item.leader" @click="isLeader(props.item)" />
                                                </template>
                                                <template v-slot:item.delete="props">
                                                   <v-btn :color="color" icon @click="dropSelected(props.item)">
                                                      <!--Falata el @Click -->
                                                      <v-icon dark>mdi-delete</v-icon>
                                                   </v-btn>
                                                </template>
                                             </v-data-table>
                                          </v-row>
                                          <v-row>
                                             <p>Logo*</p>
                                          </v-row>
                                          <v-row>
                                             <v-layout v-for="(value, i) in logos" :key="i">
                                                <v-col cols="1">
                                                   <input type="radio" :checked="value.selectedCheck" @click="changeSelectedItem(i)" />
                                                </v-col>
                                                <v-col cols="3">
                                                   <v-avatar tile>
                                                      <img :src="require(`@/assets/${logos[i].logo}`)" alt="img" />
                                                   </v-avatar>
                                                </v-col>
                                             </v-layout>
                                          </v-row>
                                       </v-form>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8">
                                             <v-btn :color="color" @click="dialogForm = false" large> Cancelar</v-btn>
                                          </v-col>
                                          <v-col cols="3" class="ml-8">
                                             <v-btn :color="color" @click="registryTeam()" large> Aceptar</v-btn>
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
                              <v-dialog v-model="dialogTest" width="800px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item v-bind="attrs" v-on="on">
                                       <v-list-item-title>Ver Detalle</v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <h2>Detalle del participante</h2>
                                    </v-card-title>
                                    <v-spacer></v-spacer>
                                    <v-card-subtitle>
                                       <h2>Datos Personales</h2>
                                    </v-card-subtitle>
                                    <v-card-text>
                                       <v-row>
                                          <v-col cols="5" class="text-right">
                                             <h2>Nombres completos:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>{{ item.names }}</h2>
                                          </v-col>
                                          <v-col cols="5" class="text-right">
                                             <h2>DNI:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>{{ item.dni }}</h2>
                                          </v-col>
                                          <v-col cols="5" class="text-right">
                                             <h2>Celular:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>{{ item.phone }}</h2>
                                          </v-col>
                                          <v-col cols="5" class="text-right">
                                             <h2>Correo electrónico:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>{{ item.email }}</h2>
                                          </v-col>
                                          <v-col cols="5" class="text-right">
                                             <h2>Sexo:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>{{ item.gender }}</h2>
                                          </v-col>
                                       </v-row>
                                    </v-card-text>
                                    <v-divider></v-divider>

                                    <v-card-subtitle class="pt-5">
                                       <h2>Datos Académicos</h2>
                                    </v-card-subtitle>
                                    <v-card-text>
                                       <v-row>
                                          <v-col cols="5" class="text-right">
                                             <h2>Institución educativa:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>{{ item.heiName }}</h2>
                                          </v-col>
                                          <v-col cols="5" class="text-right">
                                             <h2>Especialidad:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>{{ item.course }}</h2>
                                          </v-col>
                                          <v-col cols="5" class="text-right">
                                             <h2>Código institucional:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>{{ item.heiCode }}</h2>
                                          </v-col>
                                          <v-col cols="5" class="text-right">
                                             <h2>Ciclo:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>{{ item.semester }}</h2>
                                          </v-col>
                                       </v-row>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-subtitle class="pt-5">
                                       <h2>Datos de inscripción</h2>
                                    </v-card-subtitle>
                                    <v-card-text>
                                       <v-row>
                                          <v-col cols="5" class="text-right">
                                             <h2>Categoría del participante:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>
                                                {{ item.competitorCategory }}
                                             </h2>
                                          </v-col>
                                          <v-col cols="5" class="text-right">
                                             <h2>Tipo de inscripción:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>{{ item.inscriptionType }}</h2>
                                          </v-col>
                                          <v-col cols="5" class="text-right">
                                             <h2>Nombre del equipo:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>{{ item.teamName }}</h2>
                                          </v-col>
                                          <v-col cols="5" class="text-right">
                                             <h2>Estado del participante:</h2>
                                          </v-col>
                                          <v-col cols="7">
                                             <h2>{{ item.condition }}</h2>
                                          </v-col>
                                       </v-row>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-btn :color="color" @click="dialogTest = false" large> Cerrar</v-btn>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                              <v-dialog v-model="asignarEquipo" width="800px" v-if="item.idTeam === null">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item v-bind="attrs" v-on="on">
                                       <v-list-item-title @click="listTeams(item)">Asignar a un equipo existente </v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <h2>Asignar un participante a un equipo</h2>
                                    </v-card-title>
                                    <v-spacer></v-spacer>

                                    <v-card-text>
                                       <v-form>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-col cols="6" offset="6">
                                                   <v-text-field
                                                      v-model="search"
                                                      append-icon="mdi-magnify"
                                                      label="Buscar"
                                                      single-line
                                                      :color="color"
                                                      hide-details
                                                   ></v-text-field>
                                                </v-col>
                                                <v-data-table
                                                   v-model="selectedTeams"
                                                   :headers="headersTeams"
                                                   :single-select="true"
                                                   show-select
                                                   item-key="idTeam"
                                                   :color="color"
                                                   :items="teams"
                                                   :search="search"
                                                >
                                                   <!--template
                                                   v-slot:item.teamSelected="props"
                                                >
                                                   <input
                                                      type="checkbox"
                                                      :checked="
                                                         props.item.teamSelect
                                                      "
                                                      @click="
                                                         isTeamSelect(props.item)
                                                      "
                                                   />
                                                </template-->
                                                </v-data-table>
                                             </v-col>
                                          </v-row>
                                          <!--v-row>
                                             <div class="mr-8">
                                                Notificar conformacion
                                             </div>
                                             <v-switch
                                                v-if="switchTeam"
                                                class="v-input--reverse mt-0 pt-0 mr-4"
                                                v-model="switchTeam"
                                                color="primary"
                                                hide-details
                                                label="Sí"
                                             ></v-switch>
                                             <v-switch
                                                v-else
                                                class="v-input--reverse mt-0 pt-0 mr-4"
                                                v-model="switchTeam"
                                                color="primary"
                                                hide-details
                                                label="No"
                                             ></v-switch>
                                          </v-row-->
                                       </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8">
                                             <v-btn :color="color" @click="asignarEquipo = false" large> Cancelar </v-btn>
                                          </v-col>
                                          <v-col cols="3" class="ml-8">
                                             <v-btn
                                                :color="color"
                                                @click="
                                                   assignToTeam(item);
                                                   asignarEquipo = false;
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

                              <v-dialog v-model="dialogParticipantUnbind" width="800px" v-if="item.idTeam !== null">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item v-bind="attrs" v-on="on">
                                       <v-list-item-title>Desvincular del Equipo</v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card v-if="item.leader !== `isChecked`">
                                    <v-card-title>
                                       <span class="headline">Desvincular Participante</span>
                                    </v-card-title>
                                    <v-card-text>
                                       <v-form>
                                          <v-container>
                                             <v-row>
                                                <v-col cols="12">
                                                   <div class="text-center">
                                                      <h2>
                                                         ¿Está seguro que desea desvincular al participante
                                                         {{ " " + item.names + " " }}
                                                         del equipo
                                                         {{ " " + item.teamName }}
                                                         ?
                                                      </h2>
                                                   </div>
                                                </v-col>
                                             </v-row>
                                          </v-container>
                                       </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row>
                                          <v-col cols="2"></v-col>
                                          <v-col cols="2">
                                             <v-btn :color="color" x-large @click="dialogParticipantUnbind = false"> Cancelar </v-btn>
                                          </v-col>
                                          <v-col cols="3"></v-col>
                                          <v-col cols="2">
                                             <v-btn
                                                :color="color"
                                                x-large
                                                @click="
                                                   deleteFromTeam(item);
                                                   dialogParticipantUnbind = false;
                                                "
                                                >Aceptar
                                             </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                                 <v-card v-else>
                                    <v-card-title>
                                       <span class="headline">Desvincular Participante</span>
                                    </v-card-title>
                                    <v-card-text>
                                       <v-form>
                                          <v-container>
                                             <v-row>
                                                <v-col cols="12">
                                                   <div class="text-center">
                                                      <h2>El participante es lider del equipo</h2>
                                                   </div>
                                                </v-col>
                                             </v-row>
                                          </v-container>
                                       </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row>
                                          <v-col cols="2"></v-col>
                                          <v-col cols="2">
                                             <v-btn :color="color" x-large @click="dialogParticipantUnbind = false"> Cancelar </v-btn>
                                          </v-col>
                                          <v-col cols="3"></v-col>
                                          <v-col cols="2">
                                             <v-btn :color="color" x-large @click="dialogParticipantUnbind = false"> Aceptar </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                              <v-dialog v-model="dialogParticipantDelete" width="800px" v-if="item.condition != `Eliminado`">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-list-item v-bind="attrs" v-on="on">
                                       <v-list-item-title>Eliminar inscrito</v-list-item-title>
                                    </v-list-item>
                                 </template>
                                 <v-card v-if="item.leader === `isChecked`">
                                    <v-card-title>
                                       <span class="headline">Eliminar inscrito</span>
                                    </v-card-title>
                                    <v-card-text>
                                       <v-form>
                                          <v-container>
                                             <v-row>
                                                <v-col cols="12">
                                                   <div class="text-center">
                                                      <h2>El participante es lider de equipo</h2>
                                                   </div>
                                                </v-col>
                                             </v-row>
                                          </v-container>
                                       </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row>
                                          <v-col cols="2"></v-col>
                                          <v-col cols="2">
                                             <v-btn :color="color" x-large @click="dialogParticipantDelete = false"> Cancelar </v-btn>
                                          </v-col>
                                          <v-col cols="3"></v-col>
                                          <v-col cols="2">
                                             <v-btn :color="color" x-large @click="dialogParticipantDelete = false"> Aceptar </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                                 <v-card v-else>
                                    <v-card-title>
                                       <span class="headline">Eliminar inscrito</span>
                                    </v-card-title>
                                    <v-card-text>
                                       <v-form>
                                          <v-container>
                                             <v-row>
                                                <v-col cols="12">
                                                   <div class="text-center">
                                                      <h2>
                                                         ¿Está seguro que desea eliminar al participante
                                                         {{ " " + item.names + " " }}

                                                         ?
                                                      </h2>
                                                   </div>
                                                </v-col>
                                             </v-row>
                                          </v-container>
                                       </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row>
                                          <v-col cols="2"></v-col>
                                          <v-col cols="2">
                                             <v-btn :color="color" x-large @click="dialogParticipantDelete = false"> Cancelar </v-btn>
                                          </v-col>
                                          <v-col cols="3"></v-col>
                                          <v-col cols="2">
                                             <v-btn
                                                :color="color"
                                                x-large
                                                @click="
                                                   deleteParticipant(item.id);
                                                   dialogParticipantDelete = false;
                                                "
                                                >Aceptar
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
               <v-col cols="8"></v-col>
               <v-col cols="4">
                  <download-excel class="btn" :data="inscribidesFiltered" name="Inscritos.xls">
                     <v-btn :color="color" large> Descargar Tabla</v-btn>
                  </download-excel>
               </v-col>
            </v-row>
         </v-col>
      </v-row>
   </div>
</template>

<style scoped src="../styles/Inscribides.css">
</style>

<script>
import Sidebar from "@/components/Sidebar.vue";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import Navbar2 from "@/components/Navbar2.vue";
import * as EventDA from "@/dataAccess/eventDA.js";
import * as InscribidesDA from "@/dataAccess/inscribidesDA.js";
import * as TeamsDA from "@/dataAccess/teamsDA.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
// import Swal from "sweetalert2";

export default {
   name: "Inscribides",
   components: {
      Sidebar,
      Navbar2,
      Loading,
   },
   data() {
      return {
         color: "FFFF",
         loadingUpload: false,
         search: "",
         loadingParticipants: true,
         loadingParticipantsSuggest: false,
         dialogParticipantUnbind: false,
         dialogParticipantDelete: false,
         switchNotification: false,
         switchTeam: false,
         dialogTest: false,
         asignarEquipo: false,
         singleSelect: false,
         singleSelectTeams: true,
         selectedTeams: [],
         selected: [],
         dialogSuggestion: false,
         dialogForm: false,
         namesFilterValue: "",
         courseFilterValue: "",
         codeFilterValue: "",
         teamFilterValue: "",
         selectedHei: "",
         selectedType: "",
         genderFilterValue: null,
         conditionFilterValue: null,
         idUEvent: null,
         heis: [],
         rules: [(v) => !!v || "Campo Obligatorio"],
         inscriptionTypes: [
            {
               idInscription: 1,
               inscription: "Grupal",
            },
            {
               idInscription: 2,
               inscription: "Individual",
            },
         ],
         gendersList: [
            { text: "Masculino", value: "Masculino" },
            { text: "Femenino", value: "Femenino" },
         ],
         statesList: [
            { text: "Inscrito", value: "Inscrito" },
            { text: "Procesado", value: "Procesado" },
         ],
         inscribides: [],
         inscribidesFiltered: [],
         inscribidesByHei: [],
         teams: [],
         logos: [
            {
               selectedCheck: "isChecked",
               logo: "teamLogo1.jpg",
            },
            {
               selectedCheck: "",
               logo: "teamLogo2.jpg",
            },
            {
               selectedCheck: "",
               logo: "teamLogo3.jpg",
            },
            {
               selectedCheck: "",
               logo: "teamLogo4.jpg",
            },
         ],
         //Para las APIs
         teamCreated: {
            name: "",
            justificacion: "",
            idUEvent: this.idUEvent,
            teamMembers: [],
         },
         teamMember: {
            idMember: 0,
            isLeader: false,
         },
         //Para sugeirir equipo
         criteria: [
            {
               name: "Genero",
            },
            {
               name: "Especialidad",
            },
         ],
         selectedCriteria: "",
         suggest: [],
         selectedSuggest: [],
         field: "",
         teamSug: {
            idUser: 0,
            email: "",
            teamName: "",
            state: "",
            name: "",
            lastName: "",
            gender: "",
            nameCourse: "",
            nameHei: "",
         },
         membersSug: {
            idMember: 0,
            isLeader: false,
            email: "",
         },
         membersTeamSug: [],
         selectedHeiSuggest: "",
         heiSuggest: 0,
         buttonSuggest: true,
         disabledEquipo: true,
         eventData: null,
         invalidCantTeam: false,
      };
   },
   validations() {
      return {
         teamCreated: {
            name: {
               required,
               maxLength: maxLength(250),
            },
            justificacion: {
               required,
               maxLength: maxLength(500),
            },
         },
      };
   },
   computed: {
      ...mapState(["idUser", "loggedUser", "generalConfig", "community", "login", "style"]),
      nameErrors() {
         const errors = [];
         if (!this.$v.teamCreated.name.$dirty) return errors;
         !this.$v.teamCreated.name.required && errors.push("Ingresar el nombre del equipo");
         return errors;
      },
      justificationErrors() {
         const errors = [];
         if (!this.$v.teamCreated.justificacion.$dirty) return errors;
         !this.$v.teamCreated.justificacion.required && errors.push("Ingresar la justificacion del equipo");
         return errors;
      },
      headers() {
         return [
            {
               text: "Participante",
               align: "start",
               sortable: false,
               value: "names",
               filter: this.namesFilter,
            },
            {
               text: "Sexo",
               value: "gender",
               filter: this.genderFilter,
            },
            {
               text: "Especialidad",
               value: "course",
               sortable: false,
               filter: this.courseFilter,
            },
            {
               text: "Código Institucional",
               value: "heiCode",
               sortable: false,
               filter: this.codeFilter,
            },
            {
               text: "Nombre del equipo",
               value: "teamName",
               sortable: false,
               filter: this.teamFilter,
            },
            {
               text: "Estado del participante",
               value: "condition",
               sortable: false,
               filter: this.conditionFilter,
            },
            {
               text: "Acciones",
               value: "actions",
               sortable: false,
            },
         ];
      },

      headersPopUp() {
         return [
            {
               text: "Participante",
               align: "start",
               sortable: false,
               value: "names",
            },
            {
               text: "Lider",
               value: "teamLeader",
               sortable: false,
            },
            {
               text: "Código Institucional",
               value: "heiCode",
               sortable: false,
            },
            {
               text: "Especialidad",
               value: "course",
               sortable: false,
               filter: this.courseFilter,
            },
            {
               text: "Eliminar",
               value: "delete",
               sortable: false,
            },
         ];
      },

      headersTeams() {
         return [
            {
               text: "ID Equipo",
               align: "start",
               sortable: false,
               value: "idTeam",
            },
            {
               text: "Nombre de Equipo",
               sortable: false,
               value: "teamName",
            },
            {
               text: "Cantidad de participantes",
               sortable: false,
               value: "quantity",
            },
            {
               text: "Lider de Equipo",
               sortable: false,
               value: "nameTeamLeader",
            },
         ];
      },
      headersSuggest() {
         return [
            {
               text: "Nombre del equipo",
               align: "start",
               sortable: false,
               value: "teamName",
            },
            {
               text: "Tipo de inscripcion",
               sortable: false,
               value: "state",
            },
            {
               text: "Participante Nombres",
               sortable: false,
               value: "name",
            },
            {
               text: "Participante Apellidos",
               sortable: false,
               value: "lastName",
            },
            {
               text: "Genero",
               sortable: false,
               value: "gender",
            },
            {
               text: "Especialidad",
               sortable: false,
               value: "nameCourse",
            },
            {
               text: "Sede",
               sortable: false,
               value: "nameHei",
            },
         ];
      },
   },
   methods: {
      listTeams(item) {
         this.teams = [];
         console.log(item);
         TeamsDA.getTeamList(this.idUEvent)
            .then((response) => {
               console.log("respuesta getTeamList", response.data);
               let auxTeams = response.data.payload.teams;
               for (let i = 0; i < auxTeams.length; i++) {
                  if (auxTeams[i].idHei === item.idHei) {
                     auxTeams[i].quantity = auxTeams[i].listMembers.length;
                     auxTeams[i].teamSelect = "";
                     this.teams.push(auxTeams[i]);
                  }
               }
            })
            .catch((error) => {
               console.log("error al obtener team list ", error.data);
            });
      },
      SelectLeader() {
         if (this.selected.length < this.eventData.minPerGroup || this.selected.length > this.eventData.maxPerGroup) {
            this.invalidCantTeam = true;
            console.log("INVALIDO", this.invalidCantTeam);
            // Swal.fire("Error", "La cantidad de participantes para formar un equipo debe de ser mayor a " + this.eventData.minPerGroup +
            //    " y menor a " + this.eventData.maxPerGroup, "warning").then(() => {
            //    this.dialogForm = false
            //    this.invalidCantTeam = false;
            // });
         } else {
            this.invalidCantTeam = false;
            this.selected[0].leader = "isChecked";
         }
      },
      assignToTeam(item) {
         console.log("asignado a un equipo", item);
         console.log("equipo seleccionado: ", item.idUser, this.selectedTeams);
         InscribidesDA.assignParticipantToTeam(parseInt(item.idUser), parseInt(this.selectedTeams[0].idTeam))
            .then((resp) => {
               console.log(resp);
               item.idTeam = this.selectedTeams[0].idTeam;
               item.teamName = this.selectedTeams[0].teamName;
               item.condition = "Procesado";
               this.$swal.fire(
                  "Participante Asignado",
                  "Se ha asignado al participante" + item.names + "al equipo" + this.selectedTeams[0].teamName + "con éxito",
                  "success"
               );
            })
            .catch((error) => {
               this.$swal.fire("Ocurrió un Problema", "No se pudo asignar al participante al equipo", "error");
               console.log("se produjo el error: ", error.response.data.message);
            });
      },
      deleteFromTeam(item) {
         console.log(item);
         InscribidesDA.deleteParticipantFromTeam(item.idUser, item.idTeam)
            .then((resp) => {
               console.log(resp);
               item.teamName = null;
               item.condition = "Inscrito";
               this.$swal.fire("Participante Desvinculado", "Se ha desvinculado al participante del equipo con éxito", "success");
            })
            .catch((error) => {
               this.$swal.fire("Ocurrió un Problema", "No se pudo desvincular al participante del equipo", "error");
               console.log("se produjo el error: ", error.response.data.message);
            });
      },
      heiFilter(item, queryText) {
         const textOne = item.heiName.toLowerCase();
         const searchText = queryText.toLowerCase();

         return textOne.indexOf(searchText) > -1;
      },
      filterHeis() {
         let resultOne, resultTwo;
         if (this.selectedType !== "") {
            resultOne = this.inscribides.filter((inscribide) => inscribide.inscriptionType === this.selectedType);
            resultTwo = resultOne.filter((inscribide) => inscribide.heiName === this.selectedHei);
         } else {
            resultTwo = this.inscribides.filter((inscribide) => inscribide.heiName === this.selectedHei);
         }
         this.inscribidesFiltered = resultTwo;
      },
      inscriptionFilter(item, queryText) {
         const textOne = item.inscription.toLowerCase();
         const searchText = queryText.toLowerCase();

         return textOne.indexOf(searchText) > -1;
      },
      filterInscriptions() {
         let resultOne, resultTwo;
         if (this.selectedHei !== "") {
            resultOne = this.inscribides.filter((inscribide) => inscribide.heiName === this.selectedHei);
            resultTwo = resultOne.filter((inscribide) => inscribide.inscriptionType === this.selectedType);
         } else {
            resultTwo = this.inscribides.filter((inscribide) => inscribide.inscriptionType === this.selectedType);
         }

         this.inscribidesFiltered = resultTwo;
      },
      namesFilter(value) {
         if (!this.namesFilterValue) {
            return true;
         }
         return value.toLowerCase().includes(this.namesFilterValue.toLowerCase());
      },
      genderFilter(value) {
         if (!this.genderFilterValue) {
            return true;
         }
         return value === this.genderFilterValue;
      },
      courseFilter(value) {
         if (!this.courseFilterValue) {
            return true;
         }
         return value.toLowerCase().includes(this.courseFilterValue.toLowerCase());
      },
      codeFilter(value) {
         if (!this.codeFilterValue) {
            return true;
         }
         return value.toLowerCase().includes(this.codeFilterValue.toLowerCase());
      },
      teamFilter(value) {
         if (!this.teamFilterValue) {
            return true;
         }
         if (value) {
            return value.toLowerCase().includes(this.teamFilterValue.toLowerCase());
         }
      },
      conditionFilter(value) {
         if (!this.conditionFilterValue) {
            return true;
         }
         return value === this.conditionFilterValue;
      },
      changeSelectedItem(i) {
         for (var a = 0; a < 4; a++) {
            if (a == i) {
               this.logos[a].selectedCheck = "isChecked";
               // var canvas = document.createElement("canvas");
               // candevas.width = this.logos[a].logo.width;
               // canvas.height = this.logos[a].logo.height;
               // var ctx = canvas.getContext("2d");
               // ctx.drawImage(this.logos[a].logo, 0, 0);
               // var dataURL = canvas.toDataURL("image/png");
               // let logoImg = dataURL.replace.replace(/^data:image\/(png|jpg);base64,/, "");
               // console.log("Logo: ", logoImg);
            } else {
               this.logos[a].selectedCheck = "";
            }
         }
      },
      getInscribides() {
         InscribidesDA.getInscribidesByEvent(this.idUEvent)
            .then((response) => {
               let auxInscribides = response.data.payload;
               console.log("inscritos: ", auxInscribides);
               for (let i = 0; i < response.data.payload.length; i++) {
                  auxInscribides[i].heiName = auxInscribides[i].hei;
                  delete auxInscribides[i].hei;
                  if (auxInscribides[i].isLeader) {
                     auxInscribides[i].competitorCategory = "Líder de equipo";
                     auxInscribides[i].leader = "isChecked";
                  } else {
                     auxInscribides[i].competitorCategory = "Participante";
                     auxInscribides[i].leader = "";
                  }
                  if (auxInscribides[i].teamName === null) {
                     auxInscribides[i].teamName = "";
                  }
                  auxInscribides[i].names = auxInscribides[i].names + " " + auxInscribides[i].lastnames;
                  delete auxInscribides[i].isLeader;
                  auxInscribides[i].condition = auxInscribides[i].state;
                  delete auxInscribides[i].state;
               }
               //Filter by hei if user is "coordinador de sede" or "mentor"
               if (this.login.login.privilege !== "coordinador general") {
                  auxInscribides.map((inscribide) => {
                     if (this.login.login.idHei === inscribide.idHei) {
                        this.inscribidesByHei.push(inscribide);
                     }
                  });
                  // console.log("this.inscribidesByHei", this.inscribidesByHei);
                  this.inscribides = this.inscribidesByHei;
                  this.inscribidesFiltered = this.inscribidesByHei;
               } else {
                  this.inscribides = auxInscribides;
                  this.inscribidesFiltered = auxInscribides;
               }
               this.loadingParticipants = false;
            })
            .catch((error) => {
               console.log(error.response);
               this.loadingParticipants = false;
            });
      },
      getHeis() {
         EventDA.getHeisByEvent(this.idUEvent)
            .then((response) => {
               let data = response.data.payload;
               for (let i = 0; i < data.length; i++) {
                  let hei = {
                     idHei: data[i].idHei,
                     heiName: data[i].name,
                  };
                  this.heis.push(hei);
               }
            })
            .catch((error) => {
               console.log(error);
            });
      },
      //APIS
      deleteParticipant(idParticipant) {
         InscribidesDA.deleteParticipant(idParticipant, this.idUEvent)
            .then((response) => {
               console.log(response);
               //filter inscribides and inscribidesFiltered
               const newInscribides = this.inscribides.filter((inscribide) => inscribide.id != idParticipant);
               this.inscribides = newInscribides;
               this.inscribidesFiltered = newInscribides;
               this.$swal.fire("Participante Eliminado del Evento", "Se ha eliminado al participante del evento con éxito", "success");
               this.$forceUpdate();
            })
            .catch((error) => {
               this.$swal.fire("Ocurrió un problema", "No se pudo eliminar al participante del evento", "error");
               console.log(error.response.data);
            });
      },
      isLeader(i) {
         console.log("is leader item: ", i);
         console.log("selected: ", this.selected);
         for (var a = 0; a < this.selected.length; a++) {
            if (this.selected[a].id == i.id) {
               this.selected[a].leader = "isChecked";
            } else {
               this.selected[a].leader = "";
            }
         }
      },
      isTeamSelect(i) {
         console.log("is teakm select: ", i);
         console.log("selected: ", this.teams);
         for (var a = 0; a < this.teams.length; a++) {
            if (this.teams[a].idTeam == i.idTeam) {
               console.log("A este check: ", this.teams[a].idTeam);
               this.teams[a].teamSelect = "isChecked";
               console.log(this.teams[a].teamSelect);
            } else {
               console.log("A este no check: ", this.teams[a].idTeam);
               this.teams[a].teamSelect = "";
               console.log(this.teams[a].teamSelect);
            }
         }
      },
      registryTeam() {
         console.log("Team info: ", this.teamCreated);
         this.$v.teamCreated.$touch();
         if (!this.$v.teamCreated.$invalid) {
            this.dialogForm = false;
            for (let i = 0; i < this.selected.length; i++) {
               this.teamMember.idMember = this.selected[i].idUser;
               this.teamMember.email = this.selected[i].email;
               if (this.selected[i].leader === "") this.teamMember.isLeader = false;
               else this.teamMember.isLeader = true;
               this.teamCreated.teamMembers.push({
                  idMember: this.teamMember.idMember,
                  isLeader: this.teamMember.isLeader,
                  email: this.teamMember.email,
               });
            }

            let body = {
               name: this.teamCreated.name,
               justification: this.teamCreated.justificacion,
               idUEvent: this.idUEvent,
               teamMembers: this.teamCreated.teamMembers,
               communityToken: process.env.VUE_APP_API_KEY_COMMUNITY,
            };

            console.log("body para crear team: ", body);
            console.log(process.env.VUE_APP_API_KEY_COMMUNITY);
            InscribidesDA.registryTeam(body)
               .then((response) => {
                  console.log(response);
                  let teamLogo = {
                     idTeam: response.data.payload.idTeam,
                     communityToken: null,
                     logo: null,
                     logoLocalPath: null,
                     logoInLocalPath: true,
                  };
                  console.log(teamLogo);
                  for (let i = 0; i < 4; i++) {
                     if (this.logos[i].selectedCheck === "isChecked") {
                        teamLogo.logoLocalPath = this.logos[i].logo;
                     }
                  }
                  InscribidesDA.registryLogo(teamLogo);
                  this.$swal.fire(
                     "Equipo creado en el evento",
                     "Se ha creado el equipo " + this.teamCreated.name + " en el evento con éxito",
                     "success"
                  );
                  location.reload();
               })
               .catch((error) => {
                  this.$swal.fire("Ocurrió un problema", "No se pudo crear el equipo en el evento", "error");
                  console.log(error.response.data);
               });
         }
      },
      dropSelected(item) {
         console.log("eliminar Seleccion:", item);
         let index;
         for (let a = 1; a < this.selected; a++) {
            if (item.id == this.selected[a].id) {
               index = a;
               break;
            }
         }
         this.selected.splice(index, 1);
      },
      selectCriteria() {
         console.log("Criterio", this.selectedCriteria);
         if (this.selectedCriteria === "Genero") {
            this.field = "gender";
         } else {
            this.field = "course";
         }
         console.log("Field: ", this.field);
         if (this.login.login.privilege !== "coordinador general") {
            this.buttonSuggest = false;
         }
      },
      suggestTeam() {
         this.loadingParticipantsSuggest = true;
         this.suggest = [];
         if (this.login.login.privilege !== "coordinador general") {
            this.heiSuggest = this.login.login.idHei;
         }
         InscribidesDA.suggestTeam(this.idUEvent, this.community.community.idCommunity, this.field, this.heiSuggest)
            .then((response) => {
               console.log("Respuesta de sugerir: ", response);
               this.disabledEquipo = false;
               var teams = response.data.payload;
               for (let i = 0; i < teams.length; i++) {
                  for (let j = 0; j < teams[i].listMembers.length; j++) {
                     this.teamSug.idUser = teams[i].listMembers[j].idUser;
                     this.teamSug.email = teams[i].listMembers[j].email;
                     this.teamSug.teamName = teams[i].teamName;
                     this.teamSug.state = teams[i].listMembers[j].state;
                     this.teamSug.name = teams[i].listMembers[j].name;
                     this.teamSug.lastName = teams[i].listMembers[j].lastName;
                     this.teamSug.gender = teams[i].listMembers[j].gender;
                     this.teamSug.nameCourse = teams[i].listMembers[j].nameCourse;
                     this.teamSug.nameHei = teams[i].listMembers[j].nameHei;
                     this.suggest.push({
                        idUser: this.teamSug.idUser,
                        email: this.teamSug.email,
                        teamName: this.teamSug.teamName,
                        state: this.teamSug.state,
                        name: this.teamSug.name,
                        lastName: this.teamSug.lastName,
                        gender: this.teamSug.gender,
                        nameCourse: this.teamSug.nameCourse,
                        nameHei: this.teamSug.nameHei,
                     });
                  }
               }
               this.loadingParticipantsSuggest = false;
            })
            .catch((error) => {
               this.$swal.fire("Ocurrió un problema", error.response.data.message, "error");
               this.disabledEquipo = true;
            });
      },
      createTeamSuggest() {
         console.log("Select de suggest: ", this.selectedSuggest);
         for (let i = 0; i < this.selectedSuggest.length; i++) {
            this.membersSug.idMember = this.selectedSuggest[i].idUser;
            this.membersSug.email = this.selectedSuggest[i].email;
            if (i === 0) {
               this.membersSug.isLeader = true;
            } else {
               this.membersSug.isLeader = false;
            }
            this.membersTeamSug.push({
               idMember: this.membersSug.idMember,
               isLeader: this.membersSug.isLeader,
               email: this.membersSug.email,
            });
         }
         let body = {
            name: this.selectedSuggest[0].teamName,
            justification: "Equipo sugerido",
            idUEvent: this.idUEvent,
            teamMembers: this.membersTeamSug,
            communityToken: process.env.VUE_APP_API_KEY_COMMUNITY,
         };
         console.log("Body para crear team suggest: ", body);
         InscribidesDA.registryTeam(body)
            .then((response) => {
               console.log(response);
               let teamLogo = {
                  idTeam: response.data.payload.idTeam,
                  communityToken: null,
                  logo: null,
                  logoLocalPath: this.logos[0].logo,
                  logoInLocalPath: true,
               };
               InscribidesDA.registryLogo(teamLogo);
               this.$swal.fire(
                  "Equipo creado en el evento",
                  "Se ha creado el equipo " + this.selectedSuggest[0].teamName + " en el evento con éxito",
                  "success"
               );
               location.reload();
            })
            .catch((error) => {
               this.$swal.fire("Ocurrió un problema", "No se pudo crear el equipo en el evento", "error");
               console.log(error.response.data);
            });
         this.suggest = [];
         this.suggestTeam();
         //this.dialogSuggestion = false;
      },
      selectHeiSuggest() {
         for (let i = 0; i < this.heis.length; i++) {
            if (this.selectedHeiSuggest === this.heis[i].heiName) {
               this.heiSuggest = this.heis[i].idHei;
               break;
            }
         }
      },
   },

   /*beforeMount() {
      EventDA.getActiveEvent()
         .then(response => {
            console.log("response active event", response);
            this.idEvent = response.data.payload.idUEvent;
            this.getInscribides();
            this.getHeis();
         })
         .catch(error => {
            console.log(error);
         });
   },*/
   mounted() {
      this.color = this.style.style.colors.primary;
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then((response) => {
            this.eventData = response.data.payload;
            this.idUEvent = response.data.payload.idUEvent;
            this.getInscribides();
            this.getHeis();
            {
               /*
            TeamsDA.getTeamList(this.idUEvent)
               .then(response => {
                  console.log("respuesta getTeamList", response.data);
                  this.teams = response.data.payload.teams;
                  for (let i = 0; i < this.teams.length; i++) {
                     this.teams[i].quantity = this.teams[i].listMembers.length;
                     this.teams[i].teamSelect = "";
                  }
               })
               .catch(error => {
                  console.log("error al obtener team list ", error.data);
               });*/
            }
         })
         .catch((error) => {
            console.log("error al obtener backend event + ", error);
         });
   },
};
</script>
