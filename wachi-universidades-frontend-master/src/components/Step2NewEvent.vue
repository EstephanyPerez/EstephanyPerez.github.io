<template>
   <div>
      <loading :active.sync="loadingUpload" :can-cancel="false" :is-full-page="false" :color="color"></loading>
      <v-row>
         <v-col cols="6">
            <v-file-input
               prepend-icon="mdi-plus"
               outlined
               :color="color"
               label="Carga masiva de instituciones"
               v-model="fileHeis"
               @change="getHeisByFile()"
            ></v-file-input>
         </v-col>
      </v-row>
      <v-row>
         <v-col cols="5" class="pointer">
            <v-dialog v-model="dialogHei" persistent max-width="600px">
               <template v-slot:activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on">
                     <v-icon :color="color">mdi-plus-circle</v-icon>
                     <!--Falta añadir estilo-->
                     <span class="ml-3">Nueva institución</span>
                  </div>
               </template>
               <v-card>
                  <v-card-title class="justify-center" :style="styleColor">
                     <h4>Nueva institución de nivel superior</h4>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                     <v-form>
                        <br />
                        <v-row align="center" justify="center">
                           <v-col cols="10">
                              <v-text-field
                                 :maxlength="maxLength"
                                 label="Nombre de institución"
                                 outlined
                                 :color="color"
                                 v-model="heiName"
                                 :error-messages="this.heiNameErrors"
                                 @input="$v.heiName.$touch()"
                                 @blur="$v.heiName.$touch()"
                              ></v-text-field>
                           </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                           <v-col cols="10">
                              <v-text-field
                                 :maxlength="maxLength"
                                 label="Correo de contacto"
                                 outlined
                                 :color="color"
                                 v-model="heiContactEmail"
                                 :error-messages="this.heiContactEmailErrors"
                                 @input="$v.heiContactEmail.$touch()"
                                 @blur="$v.heiContactEmail.$touch()"
                              ></v-text-field>
                           </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                           <v-col cols="4" align-self="start">
                              <h4>Tipo de institución :</h4>
                           </v-col>
                           <v-col cols="6">
                              <v-radio-group v-model="heiType" row>
                                 <v-radio label="Universidad" value="Universidad" :color="color"></v-radio>
                                 <v-radio label="Instituto" value="Instituto" :color="color"></v-radio>
                              </v-radio-group>
                           </v-col>
                        </v-row>
                     </v-form>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                     <v-row align="center" justify="center">
                        <v-col cols="3" class="mr-8">
                           <v-btn :color="color" @click="dialogHei = false" large> Cancelar </v-btn>
                        </v-col>
                        <v-col cols="3" class="ml-8">
                           <v-btn :color="color" @click="addHei()" dark large> Aceptar </v-btn>
                        </v-col>
                     </v-row>
                  </v-card-actions>
               </v-card>
            </v-dialog>
         </v-col>
      </v-row>
      <v-expansion-panels multiple>
         <!--HEI-->
         <v-expansion-panel v-for="(hei, i) in newEvent.heis" :key="i">
            <v-expansion-panel-header>
               <v-row no-gutters>
                  <v-col cols="2">
                     <h2>{{ hei.name }}</h2></v-col
                  >
                  <v-col cols="4"> </v-col>
                  <v-dialog v-if="hei.type === 'Universidad'" v-model="hei.dialogUnit" persistent max-width="600px">
                     <template v-slot:activator="{ on, attrs }">
                        <v-col cols="3" class="pointer" v-bind="attrs" v-on="on">
                           <v-icon :color="color">mdi-plus-circle</v-icon>
                           <!--Falta añadir estilo-->
                           <span class="ml-3">Nueva Facultad</span>
                        </v-col>
                     </template>
                     <v-card>
                        <v-card-title class="justify-center" :style="styleColor">
                           <h4>Nueva Facultad</h4>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                           <v-form>
                              <br />
                              <v-row align="center" justify="center">
                                 <v-col cols="10">
                                    <v-text-field
                                       :maxlength="maxLength"
                                       label="Nombre de facultad"
                                       outlined
                                       :color="color"
                                       v-model="unitName"
                                       :error-messages="unitNameErrors"
                                       @input="$v.unitName.$touch()"
                                       @blur="$v.unitName.$touch()"
                                    ></v-text-field>
                                 </v-col>
                              </v-row>
                              <v-row align="center" justify="center">
                                 <v-col cols="10">
                                    <v-text-field
                                       :maxlength="maxLength"
                                       label="Correo de contacto"
                                       outlined
                                       :color="color"
                                       v-model="unitContactEmail"
                                       :error-messages="unitContactEmailErrors"
                                       @input="$v.unitContactEmail.$touch()"
                                       @blur="$v.unitContactEmail.$touch()"
                                    ></v-text-field>
                                 </v-col>
                              </v-row>
                           </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                           <v-row align="center" justify="center">
                              <v-col cols="3" class="mr-8">
                                 <v-btn :color="color" @click="hei.dialogUnit = false" large> Cancelar </v-btn>
                              </v-col>
                              <v-col cols="3" class="ml-8">
                                 <v-btn :color="color" @click="addUnit(i)" large> Aceptar </v-btn>
                              </v-col>
                           </v-row>
                        </v-card-actions>
                     </v-card>
                  </v-dialog>
                  <v-dialog v-else v-model="hei.dialogUnit" persistent max-width="600px">
                     <template v-slot:activator="{ on, attrs }">
                        <v-col cols="3" class="pointer" v-bind="attrs" v-on="on">
                           <v-icon :color="color">mdi-plus-circle</v-icon>
                           <!--Falta añadir estilo-->
                           <span class="ml-3">Nueva Especialidad</span>
                        </v-col>
                     </template>
                     <v-card>
                        <v-card-title class="justify-center" :style="styleColor">
                           <h4>Nueva Especialidad</h4>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                           <v-form>
                              <br />
                              <v-row align="center" justify="center">
                                 <v-col cols="10">
                                    <v-text-field
                                       :maxlength="maxLength"
                                       label="Nombre de la especialidad"
                                       outlined
                                       :color="color"
                                       v-model="unitName"
                                       :error-messages="unitNameErrors"
                                       @input="$v.unitName.$touch()"
                                       @blur="$v.unitName.$touch()"
                                    ></v-text-field>
                                 </v-col>
                              </v-row>
                              <v-row align="center" justify="center">
                                 <v-col cols="10">
                                    <v-text-field
                                       :maxlength="maxLength"
                                       label="Correo de contacto"
                                       outlined
                                       :color="color"
                                       v-model="unitContactEmail"
                                       :error-messages="unitContactEmailErrors"
                                       @input="$v.unitContactEmail.$touch()"
                                       @blur="$v.unitContactEmail.$touch()"
                                    ></v-text-field>
                                 </v-col>
                              </v-row>
                           </v-form>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                           <v-row align="center" justify="center">
                              <v-col cols="3" class="mr-8">
                                 <v-btn :color="color" @click="hei.dialogUnit = false" large> Cancelar </v-btn>
                              </v-col>
                              <v-col cols="3" class="ml-8">
                                 <v-btn :color="color" @click="addUnit(i)" large> Aceptar </v-btn>
                              </v-col>
                           </v-row>
                        </v-card-actions>
                     </v-card>
                  </v-dialog>
                  <v-col cols="1">
                     <v-dialog v-model="hei.dialogEdit" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                           <v-icon v-bind="attrs" v-on="on" @click="saveHeiBefore(i)">mdi-pencil</v-icon>
                        </template>
                        <v-card>
                           <v-card-title class="justify-center" :style="styleColor">
                              <h4>Editar Institución de Nivel Superior</h4>
                           </v-card-title>
                           <v-divider></v-divider>
                           <v-card-text>
                              <v-form>
                                 <v-row align="center" justify="center">
                                    <v-col cols="10">
                                       <v-text-field
                                          :maxlength="maxLength"
                                          label="Nombre de Institución"
                                          outlined
                                          :color="color"
                                          v-model="hei.name"
                                       ></v-text-field>
                                    </v-col>
                                 </v-row>
                                 <v-row align="center" justify="center">
                                    <v-col cols="10">
                                       <v-text-field
                                          :maxlength="maxLength"
                                          label="Correo de contacto"
                                          outlined
                                          :color="color"
                                          v-model="hei.contactEmail"
                                       ></v-text-field>
                                    </v-col>
                                 </v-row>
                              </v-form>
                           </v-card-text>
                           <v-divider></v-divider>
                           <v-card-actions>
                              <v-row align="center" justify="center">
                                 <v-col cols="3" class="mr-8">
                                    <v-btn :color="color" @click="restoreHeiBefore(i)" large> Cancelar </v-btn>
                                 </v-col>
                                 <v-col cols="3" class="ml-8">
                                    <v-btn :color="color" @click="editHei(i)" large> Aceptar </v-btn>
                                 </v-col>
                              </v-row>
                           </v-card-actions>
                        </v-card>
                     </v-dialog>
                  </v-col>
                  <v-col cols="2">
                     <v-dialog v-model="hei.dialogDelete" persistent max-width="500">
                        <template v-slot:activator="{ on, attrs }">
                           <v-icon v-bind="attrs" v-on="on">mdi-delete</v-icon>
                        </template>
                        <v-card>
                           <v-card-title class="justify-center"> ¿Está seguro que desea eliminar {{ hei.name }}? </v-card-title>
                           <v-divider></v-divider>
                           <v-card-actions>
                              <v-row align="center" justify="center">
                                 <v-col cols="3" class="mr-8">
                                    <v-btn :color="color" large @click="hei.dialogDelete = false"> Cancelar </v-btn>
                                 </v-col>
                                 <v-col cols="3" class="ml-8">
                                    <v-btn :color="color" large @click="deleteHei(i)"> Aceptar </v-btn>
                                 </v-col>
                              </v-row>
                           </v-card-actions>
                        </v-card>
                     </v-dialog>
                  </v-col>
               </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
               <!--Facultades-->
               <v-expansion-panels multiple :accordion="accordion" v-for="(unit, j) in hei.units" :key="j">
                  <v-expansion-panel>
                     <v-expansion-panel-header>
                        <v-row no-gutters>
                           <v-col cols="2">
                              <h2>{{ unit.name }}</h2></v-col
                           >
                           <v-col cols="4"> </v-col>
                           <v-dialog v-if="hei.type === 'Universidad'" v-model="unit.dialogCourse" persistent max-width="600px">
                              <template v-slot:activator="{ on, attrs }">
                                 <v-col cols="3" class="pointer" v-bind="attrs" v-on="on">
                                    <v-icon :color="color">mdi-plus-circle</v-icon>
                                    <!--Falta añadir estilo-->
                                    <span class="ml-3">Nueva Especialidad</span>
                                 </v-col>
                              </template>
                              <v-card>
                                 <v-card-title class="justify-center" :style="styleColor">
                                    <h4>Nueva Especialidad</h4>
                                 </v-card-title>
                                 <v-divider></v-divider>
                                 <v-card-text>
                                    <v-form>
                                       <br />
                                       <v-row align="center" justify="center">
                                          <v-col cols="10">
                                             <v-text-field
                                                :maxlength="maxLength"
                                                label="Nombre de especialidad"
                                                outlined
                                                :color="color"
                                                v-model="courseName"
                                                :error-messages="courseNameErrors"
                                                @input="$v.courseName.$touch()"
                                                @blur="$v.courseName.$touch()"
                                             ></v-text-field>
                                          </v-col>
                                       </v-row>
                                       <v-row align="center" justify="center">
                                          <v-col cols="10">
                                             <v-text-field
                                                :maxlength="maxLength"
                                                label="Correo de contacto"
                                                outlined
                                                :color="color"
                                                v-model="courseContactEmail"
                                                :error-messages="courseContactEmailErrors"
                                                @input="$v.courseContactEmail.$touch()"
                                                @blur="$v.courseContactEmail.$touch()"
                                             ></v-text-field>
                                          </v-col>
                                       </v-row>
                                    </v-form>
                                 </v-card-text>
                                 <v-card-actions>
                                    <v-row align="center" justify="center">
                                       <v-col cols="3" class="mr-8">
                                          <v-btn :color="color" @click="unit.dialogCourse = false" large> Cancelar </v-btn>
                                       </v-col>
                                       <v-col cols="3" class="ml-8">
                                          <v-btn :color="color" @click="addCourse(i, j)" large> Aceptar </v-btn>
                                       </v-col>
                                    </v-row>
                                 </v-card-actions>
                              </v-card>
                           </v-dialog>
                           <v-col cols="1" class="ml-2">
                              <v-dialog v-model="unit.dialogEdit" persistent max-width="600px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" @click="saveUnitBefore(i, j)">mdi-pencil</v-icon>
                                 </template>
                                 <v-card>
                                    <v-card-title class="justify-center" :style="styleColor">
                                       <h4 v-if="hei.type === 'Universidad'">Editar Facultad</h4>
                                       <span class="headline" v-else>Editar Especialidad</span>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                       <v-form>
                                          <br />
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field
                                                   :maxlength="maxLength"
                                                   label="Nombre de Facultad"
                                                   outlined
                                                   :color="color"
                                                   v-model="unit.name"
                                                ></v-text-field>
                                             </v-col>
                                          </v-row>
                                          <v-row align="center" justify="center">
                                             <v-col cols="10">
                                                <v-text-field
                                                   :maxlength="maxLength"
                                                   label="Correo de contacto"
                                                   outlined
                                                   :color="color"
                                                   v-model="unit.contactEmail"
                                                ></v-text-field>
                                             </v-col>
                                          </v-row>
                                       </v-form>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                       <v-row align="center" justify="center">
                                          <v-col cols="3" class="mr-8">
                                             <v-btn :color="color" @click="restoreUnitBefore(i, j)" large> Cancelar </v-btn>
                                          </v-col>
                                          <v-col cols="3" class="ml-8">
                                             <v-btn :color="color" @click="editUnit(i, j)" large> Aceptar </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                           </v-col>
                           <v-col cols="1" class="ml-2">
                              <v-dialog v-model="unit.dialogDelete" persistent max-width="500">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on">mdi-delete</v-icon>
                                 </template>
                                 <v-card>
                                    <v-card-title class="headline">
                                       ¿Está seguro que desea eliminar
                                       {{ unit.name }}?
                                    </v-card-title>

                                    <v-card-actions>
                                       <v-spacer></v-spacer>
                                       <v-btn :color="color" text @click="unit.dialogDelete = false"> Cancelar </v-btn>
                                       <v-btn :color="color" text @click="deleteUnit(i, j)"> Aceptar </v-btn>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                           </v-col>
                        </v-row>
                     </v-expansion-panel-header>
                     <!--Especialidades-->
                     <v-expansion-panel-content>
                        <v-row v-for="(course, k) in unit.courses" :key="k">
                           <v-col cols="8">
                              <h2>{{ course.name }}</h2>
                           </v-col>
                           <v-col cols="4">
                              <v-row>
                                 <v-col cols="1"></v-col>
                                 <v-col cols="3" class="ml-5">
                                    <v-dialog v-model="course.dialogEdit" persistent max-width="600px">
                                       <template v-slot:activator="{ on, attrs }">
                                          <v-icon v-bind="attrs" v-on="on" @click="saveCourseBefore(i, j, k)">mdi-pencil</v-icon>
                                       </template>
                                       <v-card>
                                          <v-card-title class="justify-center" :style="styleColor">
                                             <h4>Editar Especialidad</h4>
                                          </v-card-title>
                                          <v-divider></v-divider>
                                          <v-card-text>
                                             <v-form>
                                                <br />
                                                <v-row align="center" justify="center">
                                                   <v-col cols="10">
                                                      <v-text-field
                                                         :maxlength="maxLength"
                                                         label="Nombre de Especialidad"
                                                         outlined
                                                         :color="color"
                                                         v-model="course.name"
                                                      ></v-text-field>
                                                   </v-col>
                                                </v-row>
                                                <v-row align="center" justify="center">
                                                   <v-col cols="10">
                                                      <v-text-field
                                                         :maxlength="maxLength"
                                                         label="Correo de contacto"
                                                         outlined
                                                         :color="color"
                                                         v-model="course.contactEmail"
                                                      ></v-text-field>
                                                   </v-col>
                                                </v-row>
                                             </v-form>
                                          </v-card-text>
                                          <v-divider></v-divider>
                                          <v-card-actions>
                                             <v-row align="center" justify="center">
                                                <v-col cols="3" class="mr-8">
                                                   <v-btn :color="color" @click="restoreCourseBefore(i, j, k)" large> Cancelar </v-btn>
                                                </v-col>
                                                <v-col cols="3" class="ml-8">
                                                   <v-btn :color="color" @click="editCourse(i, j, k)" large> Aceptar </v-btn>
                                                </v-col>
                                             </v-row>
                                          </v-card-actions>
                                       </v-card>
                                    </v-dialog>
                                 </v-col>
                                 <v-col cols="2" class="ml-2">
                                    <v-dialog v-model="course.dialogDelete" persistent max-width="500">
                                       <template v-slot:activator="{ on, attrs }">
                                          <v-icon v-bind="attrs" v-on="on">mdi-delete</v-icon>
                                       </template>
                                       <v-card>
                                          <v-card-title class="headline">
                                             ¿Está seguro que desea eliminar
                                             {{ course.name }}?
                                          </v-card-title>

                                          <v-card-actions>
                                             <v-spacer></v-spacer>
                                             <v-btn :color="color" text @click="course.dialogDelete = false"> Cancelar </v-btn>
                                             <v-btn :color="color" text @click="deleteCourse(i, j, k)"> Aceptar </v-btn>
                                          </v-card-actions>
                                       </v-card>
                                    </v-dialog>
                                 </v-col>
                              </v-row>
                           </v-col>
                        </v-row>
                     </v-expansion-panel-content>
                  </v-expansion-panel>
               </v-expansion-panels>
            </v-expansion-panel-content>
         </v-expansion-panel>
      </v-expansion-panels>
   </div>
</template>

<style scoped src="../styles/Step2NewEvent.css"></style>
<script>
import { mapActions } from "vuex";
import * as EventDA from "@/dataAccess/eventDA.js";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Loading from "vue-loading-overlay";
import { mapState } from "vuex";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
   components: {
      Loading,
   },
   data() {
      return {
         styleColor: {
            color: " FFFF",
         },
         color: "FFFF",
         maxLength: 200,
         newEvent: {
            heis: [],
         },
         accordion: false,
         dialogHei: false,
         row: null,
         heiName: "",
         heiContactEmail: "",
         heiType: "",
         unitName: "",
         unitContactEmail: "",
         courseName: "",
         courseContactEmail: "",
         fileHeis: null,
         loadingUpload: false,
      };
   },
   validations() {
      return {
         heiName: {
            required,
            maxLength: maxLength(250),
         },
         heiContactEmail: {
            required,
            email,
         },
         unitName: {
            required,
            maxLength: maxLength(250),
         },
         unitContactEmail: {
            required,
            email,
         },
         courseName: {
            required,
            maxLength: maxLength(250),
         },
         courseContactEmail: {
            required,
            email,
         },
      };
   },
   beforeMount() {
      this.color = this.style.style.colors.primary;
      this.styleColor.color = this.style.style.colors.primary;
   },
   computed: {
      ...mapState(["style"]),
      heiNameErrors() {
         const errors = [];
         if (!this.$v.heiName.$dirty) return errors;
         !this.$v.heiName.required && errors.push("Ingresar el nombre de la institución educativa");
         return errors;
      },
      heiContactEmailErrors() {
         const errors = [];
         if (!this.$v.heiContactEmail.$dirty) return errors;
         !this.$v.heiContactEmail.required && errors.push("Ingrese el correo de contacto");
         !this.$v.heiContactEmail.email && errors.push("Ingrese un correo válido");
         return errors;
      },
      unitNameErrors() {
         const errors = [];
         if (!this.$v.unitName.$dirty) return errors;
         !this.$v.unitName.required && errors.push("Ingresar el nombre ");
         return errors;
      },
      unitContactEmailErrors() {
         const errors = [];
         if (!this.$v.unitContactEmail.$dirty) return errors;
         !this.$v.unitContactEmail.required && errors.push("Ingrese el correo de contacto de la facultad");
         !this.$v.unitContactEmail.email && errors.push("Ingrese un correo válido");
         return errors;
      },
      courseNameErrors() {
         const errors = [];
         if (!this.$v.courseName.$dirty) return errors;
         !this.$v.courseName.required && errors.push("Ingresar el nombre de la especialidad");
         return errors;
      },
      courseContactEmailErrors() {
         const errors = [];
         if (!this.$v.courseContactEmail.$dirty) return errors;
         !this.$v.courseContactEmail.required && errors.push("Ingrese el correo de contacto de la especialidad");
         !this.$v.courseContactEmail.email && errors.push("Ingrese un correo válido");
         return errors;
      },
   },
   methods: {
      ...mapActions("event", ["saveChangesStepTwo"]),
      verifyHeiDuplicate(heiName) {
         for (let i = 0; i < this.newEvent.heis.length; i++) {
            if (heiName === this.newEvent.heis[i].name) return true;
         }
         return false;
      },
      addHei() {
         this.$v.heiName.$touch();
         this.$v.heiContactEmail.$touch();
         let duplicate = this.verifyHeiDuplicate(this.heiName);
         if (duplicate) {
            this.$swal("Ocurrió un error", "El nombre de la institución educativa ya existe", "error");
         } else {
            if (!this.$v.heiName.$invalid || !this.$v.heiContactEmail.$invalid) {
               this.newEvent.heis.push({
                  name: this.heiName,
                  contactEmail: this.heiContactEmail,
                  type: this.heiType,
                  units: [],
                  dialogUnit: false,
                  dialogEdit: false,
                  dialogDelete: false,
               });
               this.heiName = "";
               this.heiType = "";
               this.heiContactEmail = "";
               this.dialogHei = false;
               this.saveChangesStepTwo(this.newEvent);
            }
         }
      },
      addUnit(index) {
         this.$v.unitName.$touch();
         this.$v.unitContactEmail.$touch();
         if (!this.$v.unitName.$invalid || !this.$v.unitContactEmail.$invalid) {
            this.newEvent.heis[index].units.push({
               name: this.unitName,
               contactEmail: this.unitContactEmail,
               courses: [],
               dialogCourse: false,
               dialogEdit: false,
               dialogDelete: false,
            });
            this.unitName = "";
            this.unitContactEmail = "";
            this.newEvent.heis[index].dialogUnit = false;
            this.saveChangesStepTwo(this.newEvent);
         }
      },
      addCourse(i, j) {
         this.$v.courseName.$touch();
         this.$v.courseContactEmail.$touch();
         if (!this.$v.courseName.$invalid || !this.$v.courseContactEmail.$invalid) {
            this.newEvent.heis[i].units[j].courses.push({
               name: this.courseName,
               contactEmail: this.courseContactEmail,
               dialogEdit: false,
               dialogDelete: false,
            });
            this.courseName = "";
            this.courseContactEmail = "";
            this.newEvent.heis[i].units[j].dialogCourse = false;
            this.saveChangesStepTwo(this.newEvent);
         }
      },
      updateHeiType(type) {
         switch (type) {
            case 1:
               this.heiType = "Universidad";
               break;
            case 2:
               this.heiType = "Institución";
               break;
         }
      },
      saveHeiBefore(i) {
         this.heiName = this.newEvent.heis[i].name;
         this.heiContactEmail = this.newEvent.heis[i].contactEmail;
      },
      restoreHeiBefore(i) {
         this.newEvent.heis[i].name = this.heiName;
         this.newEvent.heis[i].contactEmail = this.heiContactEmail;
         this.newEvent.heis[i].dialogEdit = false;
         this.heiName = "";
         this.heiContactEmail = "";
      },
      editHei(i) {
         this.heiName = "";
         this.heiContactEmail = "";
         this.newEvent.heis[i].dialogEdit = false;
      },
      saveUnitBefore(i, j) {
         this.unitName = this.newEvent.heis[i].units[j].name;
         this.unitContactEmail = this.newEvent.heis[i].units[j].contactEmail;
      },
      restoreUnitBefore(i, j) {
         this.newEvent.heis[i].units[j].name = this.unitName;
         this.newEvent.heis[i].units[j].contactEmail = this.unitContactEmail;
         this.newEvent.heis[i].units[j].dialogEdit = false;
         this.unitName = "";
         this.unitContactEmail = "";
      },
      editUnit(i, j) {
         this.unitName = "";
         this.unitContactEmail = "";
         this.newEvent.heis[i].units[j].dialogEdit = false;
      },
      saveCourseBefore(i, j, k) {
         this.courseName = this.newEvent.heis[i].units[j].courses[k].name;
         this.courseContactEmail = this.newEvent.heis[i].units[j].courses[k].contactEmail;
      },
      restoreCourseBefore(i, j, k) {
         this.newEvent.heis[i].units[j].courses[k].name = this.courseName;
         this.newEvent.heis[i].units[j].courses[k].contactEmail = this.courseContactEmail;
         this.newEvent.heis[i].units[j].courses[k].dialogEdit = false;
      },
      editCourse(i, j, k) {
         this.courseName = "";
         this.courseContactEmail = "";
         this.newEvent.heis[i].units[j].courses[k].dialogEdit = false;
      },
      deleteHei(i) {
         this.newEvent.heis[i].dialogDelete = false;
         this.newEvent.heis.splice(i, 1);
      },
      deleteUnit(i, j) {
         this.newEvent.heis[i].units.splice(j, 1);
      },
      deleteCourse(i, j, k) {
         this.newEvent.heis[i].units[j].courses.splice(k, 1);
      },
      getHeisByFile() {
         if (this.fileHeis) {
            this.loadingUpload = true;
            EventDA.getHeisByFile(this.fileHeis)
               .then((response) => {
                  this.loadingUpload = false;
                  let data = response.data.payload;
                  for (let i = 0; i < data.length; i++) {
                     let duplicate = this.verifyHeiDuplicate(data[i].name);
                     if (!duplicate) {
                        let type;
                        console.log("data[i]", data[i]);
                        if (data[i].idType === 1) type = "Universidad";
                        else type = "Instituto";
                        //UNIVERSIDAD
                        this.newEvent.heis.push({
                           name: data[i].name,
                           contactEmail: data[i].contactEmail,
                           type: type,
                           units: [],
                           dialogUnit: false,
                           dialogEdit: false,
                           dialogDelete: false,
                        });
                        let units;
                        if (data[i].idType === 1) units = data[i].units;
                        else units = data[i].courses;
                        console.log("units", units);
                        for (let j = 0; j < units.length; j++) {
                           this.newEvent.heis[i].units.push({
                              name: units[j].name,
                              contactEmail: units[j].contactEmail,
                              courses: [],
                              dialogCourse: false,
                              dialogEdit: false,
                              dialogDelete: false,
                           });
                           if (data[i].idType === 1) {
                              let courses = units[j].courses;
                              for (let k = 0; k < courses.length; k++) {
                                 this.newEvent.heis[i].units[j].courses.push({
                                    name: courses[k].name,
                                    contactEmail: courses[k].contactEmail,
                                    dialogEdit: false,
                                    dialogDelete: false,
                                 });
                              }
                           }
                        }
                     }
                  }
                  this.saveChangesStepTwo(this.newEvent);
               })
               .catch((error) => {
                  this.loadingUpload = false;
                  console.log(error);
               });
         }
      },
   },
};
</script>
