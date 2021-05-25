<template>
   <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <v-row>
         <v-col cols="3"> </v-col>
         <v-row>
            <v-col cols="7">
               <h1>GESTIÓN ACTIVIDADES</h1>
            </v-col>
            <v-col v-if="currentEvent !== null" cols="3">
               <!--Si le pongo el activity.dialgActivityNew no carga nada la pagina, si lo cambio de variable si pero no se puede cerrar-->
               <v-dialog v-model="dialgActivityNew" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                     <div v-bind="attrs" v-on="on">
                        <v-btn class="mx-2" fab dark :color="color">
                           <v-icon> mdi-plus </v-icon>
                        </v-btn>
                        <span>Nueva actividad</span>
                     </div>
                  </template>
                  <v-card>
                     <v-card-title>
                        <span class="headline">Nueva actividad</span>
                     </v-card-title>
                     <v-card-text>
                        <v-form>
                           <v-container>
                              <v-row>
                                 <v-col cols="12">
                                    <v-row>
                                       <v-text-field
                                          :maxlength="maxLengthNameActivity"
                                          label="Nombre de Actividad *"
                                          solo
                                          v-model="newActivity.name"
                                          required
                                          :color="color"
                                          :error-messages="nameErrors"
                                          @input="$v.newActivity.name.$touch()"
                                          @blur="$v.newActivity.name.$touch()"
                                       ></v-text-field>
                                    </v-row>
                                    <v-row>
                                       <v-textarea
                                          :maxlength="maxLength"
                                          name="descripcion"
                                          label="Descripción *"
                                          solo
                                          v-model="newActivity.description"
                                          required
                                          :color="color"
                                          :error-messages="descriptionErrors"
                                          @input="$v.newActivity.description.$touch()"
                                          @blur="$v.newActivity.description.$touch()"
                                       ></v-textarea>
                                    </v-row>
                                    <v-row>
                                       <v-col>
                                          <p>¿La actividad es obligatoria? *</p>
                                          <v-switch
                                             v-if="newActivity.obligatory"
                                             class="v-input--reverse mt-0 pt-0"
                                             v-model="newActivity.obligatory"
                                             :color="color"
                                             hide-details
                                             label="Sí"
                                          ></v-switch>
                                          <v-switch
                                             v-else
                                             class="v-input--reverse mt-0 pt-0"
                                             v-model="newActivity.obligatory"
                                             :color="color"
                                             hide-details
                                             label="No"
                                          ></v-switch>
                                       </v-col>
                                    </v-row>
                                 </v-col>
                              </v-row>
                           </v-container>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-row>
                           <v-col cols="2"></v-col>
                           <v-col cols="2">
                              <v-btn :color="color" x-large @click="dialgActivityNew = false">Cancelar</v-btn>
                           </v-col>
                           <v-col cols="3"></v-col>
                           <v-col cols="2">
                              <v-btn :color="color" x-large @click="registryActivity()">Aceptar</v-btn>
                           </v-col>
                        </v-row>
                     </v-card-actions>
                  </v-card>
               </v-dialog>
            </v-col>
            <v-col v-else cols="3"></v-col>
         </v-row>
         <v-col offset="3" cols="9" v-if="activitiesPost !== null">
            <v-layout class="spacing" v-for="(activity, i) in activitiesx" :key="i">
               <v-flex xs12 sm9 offset-sm0>
                  <v-card>
                     <v-card-title primary-title>
                        <v-col cols="8">
                           <div>
                              <h2>{{ activity.activity.name }}</h2>
                           </div>
                           <div>
                              <p class="mb-0">
                                 {{ activity.activity.description }}
                              </p>
                           </div>
                        </v-col>
                        <v-col cols="4">
                           <div>
                              <p v-if="activity.activity.obligatory">Obligatorio</p>
                              <p v-else>Opcional</p>

                              <v-row class="pt-0">
                                 <v-dialog v-model="activity.dialogActivityEdit" persistent max-width="600px">
                                    <template v-slot:activator="{ on, attrs }">
                                       <v-col cols="3" class="pointer pt-0" v-bind="attrs" v-on="on">
                                          <v-icon color="gray" class="pr-5 pt-0" @click="handlerEdit(activity.activity)">mdi-pencil</v-icon>
                                          <!--Falta añadir estilo-->
                                       </v-col>
                                    </template>
                                    <v-card>
                                       <v-card-title>
                                          <span class="headline">Editar Actividad</span>
                                       </v-card-title>
                                       <v-card-text>
                                          <v-form>
                                             <v-container>
                                                <v-row>
                                                   <v-col cols="12">
                                                      <v-row>
                                                         <v-text-field
                                                            :maxlength="maxLengthNameActivity"
                                                            label="Nombre de Actividad *"
                                                            solo
                                                            v-model="editingActivity.name"
                                                            required
                                                            :color="color"
                                                            :error-messages="nameErrors2"
                                                            @input="$v.editingActivity.name.$touch()"
                                                            @blur="$v.editingActivity.name.$touch()"
                                                         ></v-text-field>
                                                      </v-row>
                                                      <v-row>
                                                         <v-textarea
                                                            name="descripcion"
                                                            label="Descripción *"
                                                            :maxlength="maxLength"
                                                            solo
                                                            v-model="editingActivity.description"
                                                            required
                                                            :color="color"
                                                            :error-messages="descriptionErrors2"
                                                            @input="$v.editingActivity.description.$touch()"
                                                            @blur="$v.editingActivity.description.$touch()"
                                                         ></v-textarea>
                                                      </v-row>
                                                      <v-row>
                                                         <v-col>
                                                            <p>¿La actividad es obligatoria? *</p>
                                                            <v-switch
                                                               v-if="editingActivity.obligatory"
                                                               class="v-input--reverse mt-0 pt-0"
                                                               v-model="editingActivity.obligatory"
                                                               :color="color"
                                                               hide-details
                                                               label="Sí"
                                                            ></v-switch>
                                                            <v-switch
                                                               v-else
                                                               class="v-input--reverse mt-0 pt-0"
                                                               v-model="editingActivity.obligatory"
                                                               :color="color"
                                                               hide-details
                                                               label="No"
                                                            ></v-switch>
                                                         </v-col>
                                                      </v-row>
                                                   </v-col>
                                                </v-row>
                                             </v-container>
                                          </v-form>
                                       </v-card-text>
                                       <v-card-actions>
                                          <v-row>
                                             <v-col cols="2"> </v-col>
                                             <v-col cols="2">
                                                <v-btn :color="color" x-large @click="activity.dialogActivityEdit = false">Cancelar</v-btn>
                                             </v-col>
                                             <v-col cols="3"> </v-col>
                                             <v-col cols="2">
                                                <v-btn :color="color" x-large @click="editActivity(i)">Aceptar</v-btn>
                                             </v-col>
                                          </v-row>
                                       </v-card-actions>
                                    </v-card>
                                 </v-dialog>
                                 <v-dialog v-model="activity.dialogActivityDelete" persistent max-width="600px">
                                    <template v-slot:activator="{ on, attrs }">
                                       <v-col cols="3" class="pointer pt-0" v-bind="attrs" v-on="on">
                                          <v-icon color="gray" class="pr-5 pt-0">mdi-delete</v-icon>
                                          <!--Falta añadir estilo-->
                                       </v-col>
                                    </template>
                                    <v-card>
                                       <v-card-title>
                                          <span class="headline">Eliminar Actividad</span>
                                       </v-card-title>
                                       <v-card-text>
                                          <v-form>
                                             <v-container>
                                                <v-row>
                                                   <v-col cols="12">
                                                      <div class="text-center">
                                                         <h2>
                                                            ¿Está seguro que desea eliminar la actividad
                                                            {{ activity.activity.name }}?
                                                         </h2>
                                                      </div>
                                                   </v-col>
                                                </v-row>
                                             </v-container>
                                          </v-form>
                                       </v-card-text>
                                       <v-card-actions>
                                          <v-row>
                                             <v-col cols="2"> </v-col>
                                             <v-col cols="2">
                                                <v-btn :color="color" x-large @click="activity.dialogActivityDelete = false">Cancelar</v-btn>
                                             </v-col>
                                             <v-col cols="3"> </v-col>
                                             <v-col cols="2">
                                                <v-btn
                                                   :color="color"
                                                   x-large
                                                   @click="
                                                      deleteActivity(i, activity.activity.idActivity);
                                                      activity.dialogActivityDelete = false;
                                                   "
                                                   >Aceptar</v-btn
                                                >
                                             </v-col>
                                          </v-row>
                                       </v-card-actions>
                                    </v-card>
                                 </v-dialog>
                              </v-row>
                           </div>
                        </v-col>
                     </v-card-title>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-col>
         <v-col v-else cols="9">
            <h1>No hay Actividades</h1>
         </v-col>
      </v-row>
   </div>
</template>

<style scoped src="../styles/Activities.css"></style>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import { required, maxLength } from "vuelidate/lib/validators";
import "sweetalert2/dist/sweetalert2.min.css";
import * as ActivityDA from "@/dataAccess/activityDA.js";
import * as EventDA from "@/dataAccess/eventDA.js";
import { mapState, mapActions } from "vuex";
export default {
   name: "Activities",
   components: {
      Sidebar,
      Navbar
   },
   computed: {
      ...mapState(["activities", "style"]),
      ...mapState(["community"]),
      nameErrors2() {
         const errors = [];
         if (!this.$v.editingActivity.name.$dirty) return errors;
         !this.$v.editingActivity.name.required && errors.push("Ingresar el nombre de la actividad");
         return errors;
      },
      descriptionErrors2() {
         const errors = [];
         if (!this.$v.editingActivity.description.$dirty) return errors;
         !this.$v.editingActivity.description.required && errors.push("Ingresar la descripción de la actividad");
         return errors;
      },
      nameErrors() {
         const errors = [];
         if (!this.$v.newActivity.name.$dirty) return errors;
         !this.$v.newActivity.name.required && errors.push("Ingresar el nombre de la actividad");
         return errors;
      },
      descriptionErrors() {
         const errors = [];
         if (!this.$v.newActivity.description.$dirty) return errors;
         !this.$v.newActivity.description.required && errors.push("Ingresar la descripción de la actividad");
         return errors;
      }
   },
   methods: {
      ...mapActions({ saveActivities: "activities/saveActivities" }),
      ...mapActions({ dropActivities: "activities/dropActivities" }),
      ...mapActions({ addActivity: "activities/addActivity" }),
      handlerEdit(activity) {
         this.editingActivity.name = activity.name;
         this.editingActivity.date = activity.date;
         this.editingActivity.obligatory = activity.obligatory;
         this.editingActivity.description = activity.description;
         console.log("se llega a setear la actividad a editar", this.editingActivity);
      },
      registryActivity() {
         this.$v.newActivity.$touch();
         if (!this.$v.newActivity.$invalid) {
            this.dialgActivityNew = false;
            let body = {
               idUEvent: parseInt(this.currentEvent.idUEvent),
               name: this.newActivity.name,
               description: this.newActivity.description,
               date: this.newActivity.date,
               obligatory: this.newActivity.obligatory
            };
            console.log("se va a crear: ", body);
            ActivityDA.registryActivity(body)
               .then(response => {
                  console.log(response);
                  this.$swal.fire("Actividad Creada", "Se ha creada una nueva actividad con éxito", "success");
                  EventDA.getActiveUEvent(this.community.community.idCommunity).then(resp => {
                     this.currentEvent = resp.data.payload;
                     if (this.currentEvent !== null) {
                        ActivityDA.listActivities(this.currentEvent.idUEvent)
                           .then(response => {
                              console.log("servicio de listado", response.data);
                              this.activitiesPost = response.data.payload;
                              this.activitiesx = [];
                              this.activitiesPost.forEach(activity => {
                                 this.activitiesx.push({
                                    activity: activity,
                                    dialogActivityEdit: false,
                                    dialogActivityDelete: false
                                 });
                                 console.log("se imprime actividad: ", activity);
                              });
                           })
                           .catch(err => {
                              console.log("ocurrió un error al listar las actividades", err);
                           });

                        //limpiar objeto de nueva actividad
                        this.newActivity.name = "";
                        this.newActivity.date = "";
                        this.newActivity.obligatory = false;
                        this.newActivity.description = "";
                     }
                  });
               })
               .catch(err => {
                  console.log("ocurrió un error al crear una actividad", err);
               });
         }
      },
      editActivity(i) {
         this.$v.editingActivity.$touch();
         if (!this.$v.editingActivity.$invalid) {
            this.activitiesx[i].activity.name = this.editingActivity.name;
            this.activitiesx[i].activity.description = this.editingActivity.description;
            this.activitiesx[i].activity.obligatory = this.editingActivity.obligatory;
            ActivityDA.editActivity(this.activitiesx[i].activity)
               .then(response => {
                  console.log(response);
                  this.$swal.fire("Actividad Modificada", "Se ha modificado la actividad con éxito", "success");
                  this.activitiesx[i].dialogActivityEdit = false;
               })
               .catch(error => {
                  console.log(error);
               });
            this.dropActivities();
            this.activitiesx.forEach(activity => {
               this.addActivity(activity.activity);
            });
         }
         //llamado a back
      },
      deleteActivity(index, id) {
         console.log(id);

         ActivityDA.deleteActivity(id)
            .then(response => {
               console.log(response);
            })
            .catch(error => {
               console.log(error);
            });
         this.activitiesx.splice(index, 1);
         this.dropActivities();
         this.activitiesx.forEach(activity => {
            this.addActivity(activity.activity);
         });
      }
   },
   data() {
      return {
         color: "FFFF",
         maxLength: 200,
         maxLengthNameActivity: 45,
         dialogActivities: [],
         activitiesx: [],
         id: 1,
         editingActivity: {
            idActvidad: 1,
            name: "",
            date: "",
            obligatory: false,
            description: ""
         },
         newActivity: {
            name: "",
            date: "",
            obligatory: false,
            description: ""
         },
         rules: [v => !!v || "Campo Obligatorio"],
         dialgActivityNew: false,
         activitiesPost: [],
         currentEvent: null
      };
   },

   validations() {
      return {
         editingActivity: {
            name: {
               required,
               maxLength: maxLength(250)
            },
            description: {
               required,
               maxLength: maxLength(500)
            }
         },
         newActivity: {
            name: {
               required,
               maxLength: maxLength(250)
            },
            description: {
               required,
               maxLength: maxLength(500)
            }
         }
      };
   },

   beforeMount() {
      this.color = this.style.style.colors.primary;
      /*ActivityDA.listActivities(this.id)
      .then((response) => {
         console.log(response)
         this.saveActivities(response)
      })
      .catch(error =>{
            console.log(error)
      })*/
   },

   mounted() {
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then(resp => {
            this.currentEvent = resp.data.payload;
            if (this.currentEvent !== null) {
               ActivityDA.listActivities(this.currentEvent.idUEvent)
                  .then(response => {
                     console.log("servicio de listado", response.data);
                     if (Object.keys(response.data).indexOf("payload") !== -1) {
                        this.activitiesPost = response.data.payload;
                        this.activitiesPost.forEach(activity => {
                           this.activitiesx.push({
                              activity: activity,
                              dialogActivityEdit: false,
                              dialogActivityDelete: false
                           });
                           console.log("se imprime actividad: ", activity);
                        });
                     }
                  })
                  .catch(err => {
                     console.log("ocurrió un error al listar las actividades", err);
                  });
            }
         })
         .catch(error => {
            console.log("al consultar el servidor + ", error);
         });

      /* for(let i=0;i<this.activities.activities.length;i++){
         this.dialogActivities.push(false)
      } */
   }
};
</script>
