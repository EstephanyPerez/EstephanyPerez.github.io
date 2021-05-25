<template>
   <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <loading :active.sync="loadingUpload" :can-cancel="false" :is-full-page="false" :color="color"></loading>
      <v-row>
         <v-col cols="2"> </v-col>
         <v-col cols="10">
            <v-row>
               <v-col cols="12"></v-col>
               <v-col cols="12"></v-col>
               <v-col cols="1"></v-col>
               <v-col cols="9">
                  <v-container>
                     <h1>GESTIÓN DE INSTITUCIONES EDUCATIVAS</h1>
                  </v-container>
               </v-col>
               <v-col cols="2"></v-col>
               <v-col cols="1"></v-col>
               <v-col cols="2">
                  <v-file-input
                     prepend-icon="mdi-plus"
                     :color="color"
                     label="CARGA MASIVA"
                     v-model="fileHeis"
                     @change="getHeisByFile()"
                  ></v-file-input>
               </v-col>
               <v-col cols="9"></v-col>
               <v-col cols="9"></v-col>
               <v-col cols="3" class="pointer">
                  <v-dialog v-model="dialogHei" persistent max-width="600px">
                     <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">
                           <v-btn class="mx-2" fab dark :color="color">
                              <v-icon> mdi-plus </v-icon>
                           </v-btn>
                           <!--Falta añadir estilo-->
                           <span>Nueva institución</span>
                        </div>
                     </template>
                     <v-card>
                        <v-card-title>
                           <span class="headline">Nueva institución de nivel superior</span>
                        </v-card-title>
                        <v-card-text>
                           <v-form>
                              <v-container>
                                 <v-row>
                                    <v-col cols="12">
                                       <v-text-field
                                          label="Nombre de institución"
                                          outlined
                                          :color="color"
                                          v-model="heiName"
                                          :error-messages="this.heiNameErrors"
                                          @input="$v.heiName.$touch()"
                                          @blur="$v.heiName.$touch()"
                                          :maxlength="maxLength"
                                       ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
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
                                    <v-col cols="4">
                                       <h4>Tipo de institución</h4>
                                    </v-col>
                                    <v-col cols="8">
                                       <v-radio-group v-model="heiType" row>
                                          <v-radio label="Universidad" value="Universidad" :color="color"></v-radio>
                                          <v-radio label="Instituto" value="Instituto" :color="color"></v-radio>
                                       </v-radio-group>
                                    </v-col>
                                 </v-row>
                              </v-container>
                           </v-form>
                        </v-card-text>
                        <v-card-actions>
                           <v-row>
                              <v-col cols="2"></v-col>
                              <v-col cols="2">
                                 <v-btn :color="color" @click="dialogHei = false" dark rounded x-large> Cancelar </v-btn>
                              </v-col>
                              <v-col cols="3"></v-col>
                              <v-col cols="2">
                                 <v-btn :color="color" @click="addHei()" dark rounded x-large> Aceptar </v-btn>
                              </v-col>
                           </v-row>
                        </v-card-actions>
                     </v-card>
                  </v-dialog>
               </v-col>
               <v-col cols="1"></v-col>
               <v-col cols="11">
                  <v-expansion-panels multiple>
                     <!--HEI-->
                     <v-expansion-panel v-for="(hei, i) in newEvent.heis" :key="i">
                        <v-expansion-panel-header>
                           <v-row no-gutters>
                              <v-col cols="2">
                                 <h2>{{ hei.name }}</h2></v-col
                              >
                              <v-col cols="4"></v-col>
                              <v-dialog v-if="hei.type == 'Universidad'" v-model="hei.dialogUnit" persistent max-width="600px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-col cols="3" class="pointer" v-bind="attrs" v-on="on">
                                       <v-icon :color="color">mdi-plus-circle </v-icon>
                                       <!--Falta añadir estilo-->
                                       <span class="ml-3">Nueva Facultad</span>
                                    </v-col>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <span class="headline">Nueva Facultad</span>
                                    </v-card-title>
                                    <v-card-text>
                                       <v-form>
                                          <v-container>
                                             <v-row>
                                                <v-col cols="12">
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
                                                <v-col cols="12">
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
                                          </v-container>
                                       </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row>
                                          <v-col cols="2"></v-col>
                                          <v-col cols="2">
                                             <v-btn :color="color" @click="hei.dialogUnit = false" dark rounded x-large> Cancelar </v-btn>
                                          </v-col>
                                          <v-col cols="3"></v-col>
                                          <v-col cols="2">
                                             <v-btn :color="color" @click="addUnit(i)" dark rounded x-large> Aceptar </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                              <v-dialog v-else v-model="hei.dialogUnit" persistent max-width="600px">
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-col cols="3" class="pointer" v-bind="attrs" v-on="on">
                                       <v-icon :color="color">mdi-plus-circle </v-icon>
                                       <!--Falta añadir estilo-->
                                       <span class="ml-3">Nueva Especialidad</span>
                                    </v-col>
                                 </template>
                                 <v-card>
                                    <v-card-title>
                                       <span class="headline">Nueva Especialidad</span>
                                    </v-card-title>
                                    <v-card-text>
                                       <v-form>
                                          <v-container>
                                             <v-row>
                                                <v-col cols="12">
                                                   <v-text-field
                                                      :maxlength="maxLength"
                                                      label="Nombre de especialidad"
                                                      outlined
                                                      :color="color"
                                                      v-model="unitName"
                                                      :error-messages="unitNameErrors"
                                                      @input="$v.unitName.$touch()"
                                                      @blur="$v.unitName.$touch()"
                                                   ></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
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
                                          </v-container>
                                       </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                       <v-row>
                                          <v-col cols="2"></v-col>
                                          <v-col cols="2">
                                             <v-btn :color="color" @click="hei.dialogUnit = false" dark rounded x-large> Cancelar </v-btn>
                                          </v-col>
                                          <v-col cols="3"></v-col>
                                          <v-col cols="2">
                                             <v-btn :color="color" @click="addUnit(i)" dark rounded x-large> Aceptar </v-btn>
                                          </v-col>
                                       </v-row>
                                    </v-card-actions>
                                 </v-card>
                              </v-dialog>
                              <v-col cols="1">
                                 <v-dialog v-model="hei.dialogEdit" persistent max-width="600px">
                                    <template v-slot:activator="{ on, attrs }">
                                       <v-icon v-bind="attrs" v-on="on" @click="saveHeiBefore(i)">mdi-pencil </v-icon>
                                    </template>
                                    <v-card>
                                       <v-card-title>
                                          <span class="headline">Editar Institución de Nivel Superior</span>
                                       </v-card-title>
                                       <v-card-text>
                                          <v-form>
                                             <v-container>
                                                <v-row>
                                                   <v-col cols="12">
                                                      <v-text-field
                                                         :maxlength="maxLength"
                                                         label="Nombre de Institución"
                                                         outlined
                                                         :color="color"
                                                         v-model="hei.name"
                                                      ></v-text-field>
                                                   </v-col>
                                                   <v-col cols="12">
                                                      <v-text-field
                                                         :maxlength="maxLength"
                                                         label="Correo de contacto"
                                                         outlined
                                                         :color="color"
                                                         v-model="hei.contactEmail"
                                                      ></v-text-field>
                                                   </v-col>
                                                </v-row>
                                             </v-container>
                                          </v-form>
                                       </v-card-text>
                                       <v-card-actions>
                                          <v-row>
                                             <v-col cols="2"></v-col>
                                             <v-col cols="2">
                                                <v-btn :color="color" @click="restoreHeiBefore(i)" dark rounded x-large> Cancelar </v-btn>
                                             </v-col>
                                             <v-col cols="3"></v-col>
                                             <v-col cols="2">
                                                <v-btn :color="color" @click="editHei(i)" dark rounded x-large> Aceptar </v-btn>
                                             </v-col>
                                          </v-row>
                                       </v-card-actions>
                                    </v-card>
                                 </v-dialog>
                              </v-col>
                              <v-col cols="2">
                                 <v-dialog v-model="hei.dialogDelete" persistent max-width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                       <v-icon v-bind="attrs" v-on="on">mdi-delete </v-icon>
                                    </template>
                                    <v-card>
                                       <v-card-title class="headline">
                                          ¿Está seguro que desea eliminar
                                          {{ hei.name }}?
                                       </v-card-title>

                                       <v-card-actions>
                                          <v-spacer></v-spacer>
                                          <v-btn :color="color" text @click="hei.dialogDelete = false"> Cancelar </v-btn>
                                          <v-btn :color="color" text @click="deleteHei(i)"> Aceptar </v-btn>
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
                                       <v-col cols="4"></v-col>
                                       <v-dialog v-if="hei.type == 'Universidad'" v-model="unit.dialogCourse" persistent max-width="600px">
                                          <template v-slot:activator="{ on, attrs }">
                                             <v-col cols="3" class="pointer" v-bind="attrs" v-on="on">
                                                <v-icon :color="color">mdi-plus-circle </v-icon>
                                                <!--Falta añadir estilo-->
                                                <span class="ml-3">Nueva Especialidad</span>
                                             </v-col>
                                          </template>
                                          <v-card>
                                             <v-card-title>
                                                <span class="headline">Nueva Especialidad</span>
                                             </v-card-title>
                                             <v-card-text>
                                                <v-form>
                                                   <v-container>
                                                      <v-row>
                                                         <v-col cols="12">
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
                                                         <v-col cols="12">
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
                                                   </v-container>
                                                </v-form>
                                             </v-card-text>
                                             <v-card-actions>
                                                <v-row>
                                                   <v-col cols="2"></v-col>
                                                   <v-col cols="2">
                                                      <v-btn :color="color" @click="unit.dialogCourse = false" dark rounded x-large> Cancelar </v-btn>
                                                   </v-col>
                                                   <v-col cols="3"></v-col>
                                                   <v-col cols="2">
                                                      <v-btn :color="color" @click="addCourse(i, j)" dark rounded x-large> Aceptar </v-btn>
                                                   </v-col>
                                                </v-row>
                                             </v-card-actions>
                                          </v-card>
                                       </v-dialog>
                                       <v-col cols="1" class="ml-2">
                                          <v-dialog v-model="unit.dialogEdit" persistent max-width="600px">
                                             <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-bind="attrs" v-on="on" @click="saveUnitBefore(i, j)">mdi-pencil </v-icon>
                                             </template>
                                             <v-card>
                                                <v-card-title>
                                                   <span class="headline" v-if="hei.type == 'Universidad'">Editar Facultad</span>
                                                   <span class="headline" v-else>Editar Especialidad</span>
                                                </v-card-title>
                                                <v-card-text>
                                                   <v-form>
                                                      <v-container>
                                                         <v-row>
                                                            <v-col cols="12">
                                                               <v-text-field
                                                                  :maxlength="maxLength"
                                                                  label="Nombre de Facultad"
                                                                  outlined
                                                                  :color="color"
                                                                  v-model="unit.name"
                                                               ></v-text-field>
                                                            </v-col>
                                                            <v-col cols="12">
                                                               <v-text-field
                                                                  :maxlength="maxLength"
                                                                  label="Correo de contacto"
                                                                  outlined
                                                                  :color="color"
                                                                  v-model="unit.contactEmail"
                                                               ></v-text-field>
                                                            </v-col>
                                                         </v-row>
                                                      </v-container>
                                                   </v-form>
                                                </v-card-text>
                                                <v-card-actions>
                                                   <v-row>
                                                      <v-col cols="2"></v-col>
                                                      <v-col cols="2">
                                                         <v-btn :color="color" @click="restoreUnitBefore(i, j)" dark rounded x-large>
                                                            Cancelar
                                                         </v-btn>
                                                      </v-col>
                                                      <v-col cols="3"></v-col>
                                                      <v-col cols="2">
                                                         <v-btn
                                                            v-if="hei.type === 'Universidad'"
                                                            :color="color"
                                                            @click="editUnit(i, j)"
                                                            dark
                                                            rounded
                                                            x-large
                                                         >
                                                            Aceptar
                                                         </v-btn>
                                                         <v-btn v-else :color="color" @click="editCourseInstitute(i, j)" dark rounded x-large>
                                                            Aceptar
                                                         </v-btn>
                                                      </v-col>
                                                   </v-row>
                                                </v-card-actions>
                                             </v-card>
                                          </v-dialog>
                                       </v-col>
                                       <v-col cols="1" class="ml-2">
                                          <v-dialog v-model="unit.dialogDelete" persistent max-width="500">
                                             <template v-slot:activator="{ on, attrs }">
                                                <v-icon v-bind="attrs" v-on="on">mdi-delete </v-icon>
                                             </template>
                                             <v-card>
                                                <v-card-title class="headline">
                                                   ¿Está seguro que desea eliminar
                                                   {{ unit.name }}?
                                                </v-card-title>

                                                <v-card-actions>
                                                   <v-spacer></v-spacer>
                                                   <v-btn :color="color" text @click="unit.dialogDelete = false"> Cancelar </v-btn>
                                                   <v-btn :color="color" text v-if="hei.type == 'Universidad'" @click="deleteUnit(i, j)">
                                                      Aceptar
                                                   </v-btn>
                                                   <v-btn :color="color" text v-else @click="deleteCourseInstitute(i, j)"> Aceptar </v-btn>
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
                                                      <v-icon v-bind="attrs" v-on="on" @click="saveCourseBefore(i, j, k)">mdi-pencil </v-icon>
                                                   </template>
                                                   <v-card>
                                                      <v-card-title>
                                                         <span class="headline">Editar Especialidad</span>
                                                      </v-card-title>
                                                      <v-card-text>
                                                         <v-form>
                                                            <v-container>
                                                               <v-row>
                                                                  <v-col cols="12">
                                                                     <v-text-field
                                                                        :maxlength="maxLength"
                                                                        label="Nombre de Especialidad"
                                                                        outlined
                                                                        :color="color"
                                                                        v-model="course.name"
                                                                     ></v-text-field>
                                                                  </v-col>
                                                                  <v-col cols="12">
                                                                     <v-text-field
                                                                        :maxlength="maxLength"
                                                                        label="Correo de contacto"
                                                                        outlined
                                                                        :color="color"
                                                                        v-model="course.contactEmail"
                                                                     ></v-text-field>
                                                                  </v-col>
                                                               </v-row>
                                                            </v-container>
                                                         </v-form>
                                                      </v-card-text>
                                                      <v-card-actions>
                                                         <v-row>
                                                            <v-col cols="2"> </v-col>
                                                            <v-col cols="2">
                                                               <v-btn :color="color" @click="restoreCourseBefore(i, j, k)" dark rounded x-large>
                                                                  Cancelar
                                                               </v-btn>
                                                            </v-col>
                                                            <v-col cols="3"> </v-col>
                                                            <v-col cols="2">
                                                               <v-btn :color="color" @click="editCourse(i, j, k)" dark rounded x-large>
                                                                  Aceptar
                                                               </v-btn>
                                                            </v-col>
                                                         </v-row>
                                                      </v-card-actions>
                                                   </v-card>
                                                </v-dialog>
                                             </v-col>
                                             <v-col cols="2" class="ml-2">
                                                <v-dialog v-model="course.dialogDelete" persistent max-width="500">
                                                   <template v-slot:activator="{ on, attrs }">
                                                      <v-icon v-bind="attrs" v-on="on">mdi-delete </v-icon>
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
               </v-col>
            </v-row>
         </v-col>
      </v-row>
   </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import * as EventDA from "@/dataAccess/eventDA.js";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
   name: "Hei",
   components: {
      Sidebar,
      Navbar,
      Loading,
   },
   data() {
      return {
         color: "FFFF",
         maxLength: 200,
         newEvent: {
            heis: [],
         },
         loadingUpload: false,
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
         idEvent: 0,
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
   computed: {
      ...mapState(["community", "style"]),
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
      verifyHeiDuplicate(heiName) {
         for (let i = 0; i < this.newEvent.heis.length; i++) {
            if (heiName === this.newEvent.heis[i].name) return true;
         }
         return false;
      },
      addHei() {
         let duplicate = this.verifyHeiDuplicate(this.heiName);
         if (duplicate) {
            this.$swal.fire("Ocurrió un error", "El nombre de la institución educativa ya existe", "error");
         } else {
            let hei = {
               name: this.heiName,
               contactEmail: this.heiContactEmail,
               type: this.heiType,
               units: [],
               dialogUnit: false,
               dialogEdit: false,
               dialogDelete: false,
            };
            this.$v.heiName.$touch();
            this.$v.heiContactEmail.$touch();
            if (!this.$v.heiName.$invalid || !this.$v.heiContactEmail.$invalid) {
               EventDA.addHeiInEvent(hei, this.idEvent)
                  .then((response) => {
                     hei.idEvent = response.data.payload.idEvent;
                     this.newEvent.heis.push(hei);
                     this.heiName = "";
                     this.heiType = "";
                     this.heiContactEmail = "";
                     this.dialogHei = false;
                     this.$swal.fire("Registro exitoso", "Se ha registrado la institución educativa con éxito", "success");
                  })
                  .catch((error) => {
                     console.log(error);
                     this.$swal.fire("Ocurrió un error", "No se pudo registrar la institución educativa", "error");
                  });
            }
         }
      },
      addUnit(index) {
         if (this.newEvent.heis[index].type === "Universidad") {
            let unit = {
               name: this.unitName,
               contactEmail: this.unitContactEmail,
               courses: [],
               dialogCourse: false,
               dialogEdit: false,
               dialogDelete: false,
            };
            this.$v.unitName.$touch();
            this.$v.unitContactEmail.$touch();
            if (!this.$v.unitName.$invalid || !this.$v.unitContactEmail.$invalid) {
               EventDA.addUnitInEvent(unit, this.newEvent.heis[index].idHei)
                  .then((response) => {
                     unit.idUnit = response.data.payload.idUnit;
                     this.newEvent.heis[index].units.push(unit);
                     this.unitName = "";
                     this.unitContactEmail = "";
                     this.newEvent.heis[index].dialogUnit = false;
                     this.$swal.fire("Registro exitoso", "Se ha registrado la facultad con éxito", "success");
                  })
                  .catch((error) => {
                     console.log(error);
                     this.$swal.fire("Ocurrió un error", "No se pudo registrar la facultad", "error");
                  });
            }
         } else {
            let course = {
               name: this.unitName,
               contactEmail: this.unitContactEmail,
               courses: [],
               dialogCourse: false,
               dialogEdit: false,
               dialogDelete: false,
            };
            if (!this.$v.unitName.$invalid || !this.$v.unitContactEmail.$invalid) {
               EventDA.addCourseInEvent(course, this.newEvent.heis[index].idHei, 2)
                  .then((response) => {
                     course.idCourse = response.data.payload.idCourse;
                     this.newEvent.heis[index].units.push(course);
                     this.unitName = "";
                     this.unitContactEmail = "";
                     this.newEvent.heis[index].dialogUnit = false;
                     this.$swal.fire("Registro exitoso", "Se ha registrado la especialidad con éxito", "success");
                  })
                  .catch((error) => {
                     console.log(error);
                     this.$swal.fire("Ocurrió un error", "No se pudo registrar la especialidad", "error");
                  });
            }
         }
      },
      addCourse(i, j) {
         let course = {
            name: this.courseName,
            contactEmail: this.courseContactEmail,
            dialogEdit: false,
            dialogDelete: false,
         };
         this.$v.courseName.$touch();
         this.$v.courseContactEmail.$touch();
         if (!this.$v.courseName.$invalid || !this.$v.courseContactEmail.$invalid) {
            EventDA.addCourseInEvent(course, this.newEvent.heis[i].units[j].idUnit, 1)
               .then((response) => {
                  course.idCourse = response.data.payload.idCourse;
                  this.newEvent.heis[i].units[j].courses.push(course);
                  this.courseName = "";
                  this.courseContactEmail = "";
                  this.newEvent.heis[i].units[j].dialogCourse = false;
                  this.$swal.fire("Registro exitoso", "Se ha registrado la especialidad con éxito", "success");
               })
               .catch((error) => {
                  console.log(error.response.data);
                  this.$swal.fire("Ocurrió un error", "No se pudo registrar la especialidad", "error");
               });
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
      },
      editHei(i) {
         EventDA.editHeiInEvent(this.newEvent.heis[i])
            .then((response) => {
               console.log(response);
               this.heiName = "";
               this.heiContactEmail = "";
               this.newEvent.heis[i].dialogEdit = false;
               this.$swal.fire("Modificación con éxito", "Se ha modificado la institución educativa con éxito", "success");
            })
            .catch((error) => {
               console.log(error);
               this.$swal.fire("Ocurrió un error", "No se pudo modificar la institución educativa", "error");
            });
      },
      saveUnitBefore(i, j) {
         this.unitName = this.newEvent.heis[i].units[j].name;
         this.unitContactEmail = this.newEvent.heis[i].units[j].contactEmail;
      },
      restoreUnitBefore(i, j) {
         this.newEvent.heis[i].units[j].name = this.unitName;
         this.newEvent.heis[i].units[j].contactEmail = this.unitContactEmail;
         this.newEvent.heis[i].units[j].dialogEdit = false;
      },
      editUnit(i, j) {
         EventDA.editUnitInEvent(this.newEvent.heis[i].units[j])
            .then((response) => {
               console.log(response);
               this.unitName = "";
               this.unitContactEmail = "";
               this.newEvent.heis[i].units[j].dialogEdit = false;
               this.$swal.fire("Modificación con éxito", "Se ha modificado la facultad con éxito", "success");
            })
            .catch((error) => {
               console.log(error.response.data);
               this.$swal.fire("Ocurrió un error", "No se pudo modificar la facultad", "error");
            });
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
      editCourseInstitute(i, j) {
         EventDA.editCourseInEvent(this.newEvent.heis[i].units[j])
            .then((response) => {
               console.log(response);
               this.unitName = "";
               this.unitContactEmail = "";
               this.newEvent.heis[i].units[j].dialogEdit = false;
               this.$swal.fire("Modificación con éxito", "Se ha modificado la especialidad con éxito", "success");
            })
            .catch((error) => {
               console.log(error);
               this.$swal.fire("Ocurrió un error", "No se pudo modificar la especialidad", "error");
            });
      },
      editCourse(i, j, k) {
         EventDA.editCourseInEvent(this.newEvent.heis[i].units[j].courses[k])
            .then((response) => {
               console.log(response);
               this.courseName = "";
               this.courseContactEmail = "";
               this.newEvent.heis[i].units[j].courses[k].dialogEdit = false;
               this.$swal.fire("Modificación con éxito", "Se ha modificado la especialidad con éxito", "success");
            })
            .catch((error) => {
               console.log(error);
               this.$swal.fire("Ocurrió un error", "No se pudo modificar la especialidad", "error");
            });
      },
      deleteHei(i) {
         EventDA.deleteHeiInEvent(this.newEvent.heis[i].idHei)
            .then((response) => {
               this.newEvent.heis[i].dialogDelete = false;
               this.newEvent.heis.splice(i, 1);
               console.log("eliminar hei", response.data);
               if (response.data.payload) {
                  let listChangeLeader = response.data.payload.listTeamsChangeLeader;
                  let listEliminatedTeams = response.data.payload.listEliminatedTeams;
                  if (listChangeLeader.length > 0) {
                     this.alertChangeLeaders(listChangeLeader);
                  }
                  if (listEliminatedTeams.length > 0) {
                     this.alertEliminatedTeams(listEliminatedTeams);
                  }
                  if (listEliminatedTeams.length === 0 && listChangeLeader.length === 0) {
                     this.$swal.fire("Se ha eliminado con éxito", "Se ha eliminado la institución educativa con éxito", "success");
                  }
               }
            })
            .catch((error) => {
               console.log(error);
               this.$swal.fire("Ocurrió un error", "No se pudo eliminar la institución educativa", "error");
            });
      },
      deleteUnit(i, j) {
         EventDA.deleteUnitInEvent(this.newEvent.heis[i].idHei, this.newEvent.heis[i].units[j].idUnit)
            .then((response) => {
               this.newEvent.heis[i].units[j].dialogDelete = false;
               this.newEvent.heis[i].units.splice(j, 1);
               console.log("eliminar facultad", response);
               if (response.data.payload) {
                  let contChange = 0;
                  let contEliminated = 0;
                  let messageChange = "Los siguientes equipos cambiaron de líder: ";
                  let messageEliminated = "Los siguientes equipos fueron eliminados: ";
                  for (let i = 0; i < response.data.payload.length; i++) {
                     let listChangeLeader = response.data.payload[i].deleteUsersDTO.listTeamsChangeLeader;
                     let listEliminatedTeams = response.data.payload[i].deleteUsersDTO.listEliminatedTeams;
                     if (listChangeLeader.length > 0) {
                        for (let i = 0; i < listChangeLeader.length; i++) {
                           if (contChange != 0) messageChange = messageChange + ", " + listChangeLeader[i].name;
                           else messageChange = messageChange + listChangeLeader[i].name;
                           contChange++;
                        }
                     }
                     if (listEliminatedTeams.length > 0) {
                        for (let i = 0; i < listEliminatedTeams.length; i++) {
                           if (contEliminated != 0) messageEliminated = messageEliminated + ", " + listEliminatedTeams[i].name;
                           else messageEliminated = messageEliminated + listEliminatedTeams[i].name;
                           contEliminated++;
                        }
                     }
                  }
                  if (contChange > 0) {
                     this.$swal.fire("Se ha eliminado con éxito", messageChange, "success");
                  }
                  if (contEliminated > 0) {
                     this.$swal.fire("Se ha eliminado con éxito", messageEliminated, "success");
                  }
                  if (contChange === 0 && contEliminated === 0) {
                     this.$swal.fire("Se ha eliminado con éxito", "Se ha eliminado la facultad con éxito", "success");
                  }
               }
            })
            .catch((error) => {
               console.log(error.response.data);
               this.$swal.fire("Ocurrió un error", "No se pudo eliminar la facultad", "error");
            });
      },
      deleteCourseInstitute(i, j) {
         EventDA.deleteCourseInEvent(this.newEvent.heis[i].idHei, this.newEvent.heis[i].units[j].idCourse)
            .then((response) => {
               this.newEvent.heis[i].units[j].dialogDelete = false;
               this.newEvent.heis[i].units.splice(j, 1);
               console.log(response);
               if (response.data.payload) {
                  let listChangeLeader = response.data.payload.listTeamsChangeLeader;
                  let listEliminatedTeams = response.data.payload.listEliminatedTeams;
                  if (listChangeLeader.length > 0) {
                     this.alertChangeLeaders(listChangeLeader);
                  }
                  if (listEliminatedTeams.length > 0) {
                     this.alertEliminatedTeams(listEliminatedTeams);
                  }
                  if (listEliminatedTeams.length === 0 && listChangeLeader.length === 0) {
                     this.$swal.fire("Se ha eliminado con éxito", "Se ha eliminado la especialidad con éxito", "success");
                  }
               }
            })
            .catch((error) => {
               console.log(error);
               this.$swal.fire("Ocurrió un error", "No se pudo eliminar la especialidad", "error");
            });
      },
      deleteCourse(i, j, k) {
         EventDA.deleteCourseInEvent(this.newEvent.heis[i].idHei, this.newEvent.heis[i].units[j].courses[k].idCourse)
            .then((response) => {
               this.newEvent.heis[i].units[j].courses[k].dialogDelete = false;
               this.newEvent.heis[i].units[j].courses.splice(k, 1);
               if (response.data.payload) {
                  let listChangeLeader = response.data.payload.listTeamsChangeLeader;
                  let listEliminatedTeams = response.data.payload.listEliminatedTeams;
                  if (listChangeLeader.length > 0) {
                     this.alertChangeLeaders(listChangeLeader);
                  }
                  if (listEliminatedTeams.length > 0) {
                     this.alertEliminatedTeams(listEliminatedTeams);
                  }
                  if (listEliminatedTeams.length === 0 && listChangeLeader.length === 0) {
                     this.$swal.fire("Se ha eliminado con éxito", "Se ha eliminado la especialidad con éxito", "success");
                  }
               }
            })
            .catch((error) => {
               console.log(error);
               this.$swal.fire("Ocurrió un error", "No se pudo eliminar la especialidad", "error");
            });
      },
      getHeisByFile() {
         if (this.fileHeis) {
            this.loadingUpload = true;
            EventDA.getHeisByFile(this.fileHeis)
               .then((response) => {
                  let data = response.data.payload;
                  let heisAux = [];
                  for (let i = 0; i < data.length; i++) {
                     let duplicate = this.verifyHeiDuplicate(data[i].name);
                     if (!duplicate) heisAux.push(data[i]);
                  }
                  let eventAux = {
                     idEvent: parseInt(this.idEvent),
                     heis: heisAux,
                  };
                  EventDA.registryHeis(eventAux)
                     .then((responseX) => {
                        console.log("Respuesta de registro", responseX.data);
                        this.loadingUpload = false;
                        this.$swal.fire("Se ha registrado correctamente las instituciones educativas", "Registro exitoso", "success");
                        for (let i = 0; i < heisAux.length; i++) {
                           let type;
                           if (heisAux[i].idType === 1) type = "Universidad";
                           else type = "Instituto";
                           //UNIVERSIDAD
                           this.newEvent.heis.push({
                              name: heisAux[i].name,
                              contactEmail: heisAux[i].contactEmail,
                              type: type,
                              units: [],
                              dialogUnit: false,
                              dialogEdit: false,
                              dialogDelete: false,
                           });
                           let units;
                           if (heisAux[i].idType === 1) units = heisAux[i].units;
                           else units = heisAux[i].courses;
                           for (let j = 0; j < units.length; j++) {
                              this.newEvent.heis[i].units.push({
                                 name: units[j].name,
                                 contactEmail: units[j].contactEmail,
                                 courses: [],
                                 dialogCourse: false,
                                 dialogEdit: false,
                                 dialogDelete: false,
                              });
                              if (heisAux[i].idType === 1) {
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
                     })
                     .catch((errorX) => {
                        console.log(errorX.response.data);
                        this.loadingUpload = false;
                        this.$swal.fire("No se ha registrado correctamente las instituciones educativas", "Registro fallido", "error");
                     });
               })
               .catch((error) => {
                  console.log(error.response.data);
                  this.loadingUpload = false;
                  this.$swal.fire("No se ha registrado correctamente las instituciones educativas", "Registro fallido", "error");
               });
         }
      },
      alertChangeLeaders(listChange) {
         let message = "Los siguientes equipos cambiaron de líder: ";
         for (let i = 0; i < listChange.length; i++) {
            if (i != 0) message = message + ", " + listChange[i].name;
            else message = message + listChange[i].name;
         }
         this.$swal.fire("Se ha eliminado con éxito", message, "success");
      },
      alertEliminatedTeams(listEliminated) {
         let message = "Los siguientes equipos fueron eliminados: ";
         for (let i = 0; i < listEliminated.length; i++) {
            if (i != 0) message = message + ", " + listEliminated[i].name;
            else message = message + listEliminated[i].name;
         }
         this.$swal.fire("Se ha eliminado con éxito", message, "success");
      },
   },
   beforeMount() {
      this.color = this.style.style.colors.primary;
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then((response) => {
            this.idEvent = response.data.payload.idUEvent;
            EventDA.getHeisByEvent(this.idEvent)
               .then((responseX) => {
                  let data = responseX.data.payload;
                  console.log("heis traidos de backend: ", data);
                  for (let i = 0; i < data.length; i++) {
                     //UNIVERSIDAD
                     let type;
                     if (data[i].idType === 1) type = "Universidad";
                     else type = "Institución";
                     this.newEvent.heis.push({
                        name: data[i].name,
                        contactEmail: data[i].contactEmail,
                        type: type,
                        idHei: data[i].idHei,
                        units: [],
                        dialogUnit: false,
                        dialogEdit: false,
                        dialogDelete: false,
                     });
                     let units;
                     if (data[i].idType === 1) units = data[i].units;
                     else units = data[i].courses;
                     for (let j = 0; j < units.length; j++) {
                        if (data[i].idType === 1) {
                           this.newEvent.heis[i].units.push({
                              name: units[j].name,
                              contactEmail: units[j].contactEmail,
                              courses: [],
                              dialogCourse: false,
                              dialogEdit: false,
                              dialogDelete: false,
                              idUnit: units[j].idUnit,
                           });
                        } else {
                           this.newEvent.heis[i].units.push({
                              name: units[j].name,
                              contactEmail: units[j].contactEmail,
                              courses: [],
                              dialogCourse: false,
                              dialogEdit: false,
                              dialogDelete: false,
                              idCourse: units[j].idCourse,
                           });
                        }
                        if (data[i].idType === 1) {
                           let courses = units[j].courses;
                           for (let k = 0; k < courses.length; k++) {
                              this.newEvent.heis[i].units[j].courses.push({
                                 name: courses[k].name,
                                 contactEmail: courses[k].contactEmail,
                                 dialogEdit: false,
                                 dialogDelete: false,
                                 idCourse: courses[k].idCourse,
                              });
                           }
                        }
                     }
                  }
                  console.log(this.newEvent.heis);
               })
               .catch((errorX) => {
                  console.log(errorX);
               });
         })
         .catch((error) => {
            console.log(error);
         });
   },
};
</script>
