<template>
   <v-container :style="styleObject">
      <v-dialog v-model="activePopUp" persistent max-width="600px">
         <v-card>
            <v-card-title>
               <span class="headline">Postular al evento</span>
            </v-card-title>
            <v-card-text>
               <v-form>
                  <v-row align="center" justify="center">
                     <v-col cols="10" class="mr-8">
                        <h2>No se tienen ningun evento activo</h2>
                        <h2>Por favor intentar en otro momento</h2>
                     </v-col>
                  </v-row>
               </v-form>
            </v-card-text>
            <v-card-actions>
               <v-row align="center" justify="center">
                  <v-col cols="3" class="mr-8">
                     <v-btn :color="color" @click="activePopUp = false" dark rounded x-large> Aceptar</v-btn>
                  </v-col>
               </v-row>
            </v-card-actions>
         </v-card>
      </v-dialog>
      <v-dialog v-model="enrollmentPopUp" persistent max-width="600px">
         <v-card>
            <v-card-title>
               <span class="headline">Postular al evento</span>
            </v-card-title>
            <v-card-text>
               <v-form>
                  <v-row align="center" justify="center">
                     <v-col cols="10" class="mr-8">
                        <h2>Las inscripciones al evento aún no estan activas</h2>
                        <h2>Por favor intentar en otro momento</h2>
                     </v-col>
                  </v-row>
               </v-form>
            </v-card-text>
            <v-card-actions>
               <v-row align="center" justify="center">
                  <v-col cols="3" class="mr-8">
                     <v-btn :color="color" @click="enrollmentPopUp = false" dark rounded x-large> Aceptar</v-btn>
                  </v-col>
               </v-row>
            </v-card-actions>
         </v-card>
      </v-dialog>
      <v-card>
         <v-card-title class="justify-center">
            <h2 :style="styleColor">Desafia tu creatividad y postula</h2>
         </v-card-title>
         <v-divider></v-divider>
         <v-card-text>
            <v-row v-if="!enrollment" justify="space-around">
               <v-col cols="10">
                  <h3 style="color: red">*Aún no puedes inscribirte al evento</h3>
               </v-col>
            </v-row>
            <v-row justify="space-around">
               <v-col cols="5">
                  <v-subheader>Nombre Completo*</v-subheader>
                  <v-text-field label="" v-model="login.login.name" single-line solo disabled></v-text-field>
               </v-col>
               <v-col cols="5">
                  <v-subheader>Apellidos*</v-subheader>
                  <v-text-field label="" v-model="login.login.lastName" single-line solo disabled></v-text-field>
               </v-col>
            </v-row>
            <v-row justify="space-around">
               <v-col cols="4">
                  <v-subheader>Correo electronico</v-subheader>
                  <v-text-field label="" v-model="login.login.email" single-line solo disabled></v-text-field>
               </v-col>
               <v-col cols="4">
                  <v-subheader>Celular</v-subheader>
                  <v-text-field
                     label=""
                     single-line
                     solo
                     type="number"
                     v-model="participantCreated.phone"
                     :disabled="!enrollment || hasPhone === true"
                     required
                     :error-messages="phoneErrors"
                     @input="$v.participantCreated.phone.$touch()"
                     @blur="$v.participantCreated.phone.$touch()"
                  ></v-text-field>
               </v-col>
               <v-col cols="4">
                  <v-subheader>DNI</v-subheader>
                  <v-text-field
                     label=""
                     single-line
                     solo
                     type="number"
                     v-model="participantCreated.dni"
                     :disabled="!enrollment || hasDNI === true"
                     required
                     :error-messages="dniErrors"
                     @input="$v.participantCreated.dni.$touch()"
                     @blur="$v.participantCreated.dni.$touch()"
                  ></v-text-field>
               </v-col>
               <v-col cols="4">
                  <v-subheader>Código institucional</v-subheader>
                  <v-text-field
                     label=""
                     single-line
                     solo
                     v-model="participantCreated.institutionalCode"
                     :disabled="!enrollment"
                     required
                     :error-messages="institutionalCodeErrors"
                     @input="$v.participantCreated.institutionalCode.$touch()"
                     @blur="$v.participantCreated.institutionalCode.$touch()"
                  ></v-text-field>
               </v-col>
               <v-col cols="4">
                  <v-subheader>Ciclo</v-subheader>
                  <v-text-field
                     label=""
                     single-line
                     solo
                     type="number"
                     v-model="participantCreated.semester"
                     :disabled="!enrollment"
                     required
                     :error-messages="semesterErrors"
                     @input="$v.participantCreated.semester.$touch()"
                     @blur="$v.participantCreated.semester.$touch()"
                  ></v-text-field>
               </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row justify="space-around">
               <v-col cols="5" class="py-0">
                  <v-subheader>Condición institucional</v-subheader>
                  <v-autocomplete
                     v-model="participantCreated.institutionalCondition"
                     label="Seleccione una opcion"
                     :items="condition"
                     item-text="name"
                     :disabled="!enrollment"
                     solo
                     @change="selectCondition()"
                  >
                  </v-autocomplete>
                  <p v-if="errorCondition" :style="{ color: 'red', marginTop: '-5%' }">*Debe seleccionar una condicion institucional</p>
               </v-col>
               <v-col cols="5" class="py-0">
                  <v-subheader>Género</v-subheader>
                  <v-autocomplete
                     v-model="participantCreated.gender"
                     label="Seleccione una opción"
                     :items="gender"
                     item-text="name"
                     :disabled="!enrollment"
                     solo
                     @change="selectGender()"
                  >
                  </v-autocomplete>
                  <p v-if="errorGender" :style="{ color: 'red', marginTop: '-5%' }">*Debe seleccionar un genero</p>
               </v-col>
            </v-row>
            <v-row justify="space-around">
               <v-col cols="5" class="py-0">
                  <v-subheader>Institución educativa</v-subheader>
                  <v-autocomplete
                     v-model="selectedInstitution"
                     label="Seleccione una opcion"
                     :items="institutionObj"
                     item-text="name"
                     :disabled="!enrollment"
                     solo
                     @change="selectInstitution()"
                  >
                  </v-autocomplete>
                  <p v-if="errorInstitution" :style="{ color: 'red', marginTop: '-5%' }">*Debe seleccionar una institucion</p>
               </v-col>
               <v-col cols="5" class="py-0" v-if="hasFaculty === true">
                  <v-subheader>Facultad</v-subheader>
                  <v-autocomplete
                     v-model="selectedFaculty"
                     label="Seleccione una opcion"
                     :items="facultyObj"
                     item-text="name"
                     solo
                     @change="selectFaculty()"
                  >
                  </v-autocomplete>
                  <p v-if="errorFaculty" :style="{ color: 'red', marginTop: '-5%' }">*Debe seleccionar una facultad</p>
               </v-col>
               <v-col cols="5" class="py-0" v-else></v-col>
            </v-row>
            <v-row justify="space-around">
               <v-col cols="5" class="py-0">
                  <v-subheader>Especialidad</v-subheader>
                  <v-autocomplete
                     v-model="selectedSpeciality"
                     label="Seleccione una opcion"
                     :items="specialityObj"
                     item-text="name"
                     :disabled="!enrollment"
                     solo
                     @change="selectCourse()"
                  >
                  </v-autocomplete>
                  <p v-if="errorSpeciality" :style="{ color: 'red', marginTop: '-5%' }">*Debe seleccionar una especialidad</p>
               </v-col>
               <v-col cols="5" class="py-0"></v-col>
            </v-row>
            <v-row justify="space-around">
               <v-col cols="4">
                  <v-subheader>¿Tienes equipo?</v-subheader>
                  <v-radio-group v-model="hasTeam" row>
                     <v-radio label="Sí" value="Si" :color="color" :disabled="!enrollment" @click="teamYes()"></v-radio>
                     <v-radio label="No" value="No" :color="color" :disabled="!enrollment" @click="teamNo()"></v-radio>
                  </v-radio-group>
               </v-col>

               <v-col cols="6" v-if="hasTeam === 'Si'">
                  <v-subheader>Nombre del equipo</v-subheader>
                  <v-text-field label="" single-line solo v-model="participantCreated.teamName"></v-text-field>
               </v-col>
               <v-col v-else cols="5"></v-col>
            </v-row>
            <v-row justify="space-around">
               <v-col cols="10">
                  <v-checkbox
                     v-model="acceptTerms"
                     label="*Al postular acepto los términos y condiciones del uso de mi
                     información según la ley de protección de datos personales."
                     :color="color"
                     :disabled="!enrollment"
                  ></v-checkbox>
                  <v-dialog v-model="terms" max-width="700p">
                     <template v-slot:activator="{ on, attrs }">
                        <v-btn :color="color" dark large v-bind="attrs" v-on="on"> VISUALIZAR TERMINOS Y CONDICIONES </v-btn>
                     </template>
                     <v-card>
                        <v-card-title class="justify-center">
                           <h4>TERMINOS Y CONDICIONES</h4>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                           <v-row align="center" justify="center">
                              <v-col cols="10">
                                 1. ACEPTACIÓN En el presente documento (en adelante, el “Contrato”) se establecen los términos y condiciones de
                                 Robert Half Internacional Empresa de Servicios Transitorios Limitada, con domicilio en Avenida Isidora Goyenechea
                                 2800 Piso 15. Torre Titanium 7550-647 Las Condes, que serán de aplicación al acceso y uso por parte del Usuario de
                                 esta página web (el “Sitio Web”). Les rogamos lean atentamente el presente Contrato. Al acceder, consultar o utilizar
                                 el Sitio Web, los Usuarios (“Vd.”, “usted”, “Usuario”, o “usuario”) aceptan cumplir los términos y condiciones
                                 establecidos en este Contrato. En caso de que usted no acepte quedar vinculado por los presentes términos y
                                 condiciones, no podrá acceder a, ni utilizar, el Sitio Web. Robert Half Internacional Empresa de Servicios
                                 Transitorios Limitada y sus respectivas empresas afiliadas (en conjunto, “RH”) se reservan el derecho de actualizar
                                 el presente Contrato siempre que lo consideren oportuno. En consecuencia, recomendamos al Usuario revisar
                                 periódicamente las modificaciones efectuadas al Contrato. El presente Sitio Web está dirigido exclusivamente a
                                 personas residentes en Chile. Los Usuarios residentes o domiciliados en otro país que deseen acceder y utilizar el
                                 Sitio Web, lo harán bajo su propio riesgo y responsabilidad, por lo que deberán asegurarse de que dichos accesos y/o
                                 usos cumplen con la legislación aplicable en su país. 2. REQUISITOS RELATIVOS AL USUARIO El Sitio Web y los servicios
                                 relacionados con el mismo se ofrecen a los Usuarios que tengan capacidad legal para otorgar contratos legalmente
                                 vinculantes según la legislación aplicable. Los menores no están autorizados para utilizar el Sitio Web. Si usted es
                                 menor de edad, por favor, no utilice esta web. 3. LICENCIA En este acto, RH otorga al Usuario una licencia limitada,
                                 no exclusiva, intransferible, no susceptible de cesión y revocable; para consultar y descargar, de forma temporal,
                                 una copia del contenido ofrecido en el Sitio Web, únicamente para uso personal del Usuario o dentro de su empresa, y
                                 nunca con fines comerciales. Todo el material mostrado u ofrecido en el Sitio Web, entre otros ejemplos, el material
                                 gráfico, los documentos, textos, imágenes, sonido, video, audio, las ilustraciones, el software y el código HTML (en
                                 conjunto, el “Contenido”), es de exclusiva propiedad de RH o de las empresas que facilitan dicho material. El
                                 Contenido está protegido por las leyes de copyright chilenas, estadounidenses e internacionales, así como por las
                                 demás leyes, reglamentos y normas aplicables a los derechos de propiedad intelectual. Salvo disposición expresa en
                                 contrario en el presente contrato, y/o salvo que por imperativo legal ello esté expresamente permitido por leyes
                                 derogatorias de las actualmente vigentes, el Usuario no podrá (i) utilizar, copiar, modificar, mostrar, eliminar,
                                 distribuir, descargar, almacenar, reproducir, transmitir, publicar, vender, revender, adaptar, invertir el proceso de
                                 creación o crear productos derivados a partir de, el Contenido. Tampoco podrá (ii) utilizar el Contenido en otras
                                 páginas Web o en cualquier medio de comunicación como, por ejemplo, en un entorno de red, sin la previa autorización
                                 por escrito en este sentido de RH. Todas las marcas comerciales, las marcas de servicio y los logos (en adelante, las
                                 “Marcas”) mostrados en el Sitio Web son propiedad exclusiva de RH y de sus respectivos propietarios. El Usuario no
                                 podrá utilizar las Marcas en modo alguno sin la previa autorización por escrito para ello de RH y los respectivos
                                 propietarios. 4. INFORMACIÓN FACILITADA POR EL USUARIO El Sitio Web ofrece al Usuario un foro de obtención de empleo
                                 e información profesional. Al facilitar o introducir la información en el Sitio Web (“Información del Usuario”), el
                                 Usuario otorga a RH licencia y derecho permanente, no exclusivo, irrevocable, libre de royalties, durante el tiempo
                                 máximo permitido por la legislación aplicable, pero no le impone obligación de, utilizar, copiar, modificar, mostrar,
                                 distribuir, descargar, almacenar, reproducir, transmitir, publicar, vender, revender, adaptar ni crear productos
                                 derivados en todo o en parte a partir de, la Información del Usuario, en ningún modo o manera. El Usuario reconoce y
                                 acepta que RH es solamente un foro pasivo a través del cual los usuarios pueden conseguir empleo o informarse a nivel
                                 profesional. RH no comprueba ni controla la Información del Usuario. En consecuencia, RH no asume garantía alguna en
                                 cuanto a la fiabilidad, precisión, integridad, validez o veracidad de la Información remitida por los usuarios. RH se
                                 reserva el derecho de, a su libre JUICIO, eliminar, retirar, negarse a reflejar o bloquear toda Información del
                                 Usuario que RH considere como inaceptable. En caso de que RH reciba alguna notificación sobre la inaceptabilidad de
                                 determinada información facilitada por los usuarios, RH podrá, con total discrecionalidad, investigar dicha
                                 información. El Usuario asume y acepta que RH podrá conservar copia de la Información del Usuario, y revelar dicha
                                 información a terceros si lo considera necesario para: (i) proteger la integridad del Sitio Web; (ii) proteger los
                                 derechos de RH; (iii) cumplir una orden judicial; (iv) cumplir cualquier trámite legal; (v) hacer valer los derechos
                                 y acciones que asisten a RH a tenor de este Contrato; y (vi) satisfacer cualquier petición relativa a la infracción
                                 de derechos de terceros.
                              </v-col>
                           </v-row>
                        </v-card-text>
                        <v-card-actions>
                           <v-row align="center" justify="center">
                              <v-col cols="1" class="mr-8">
                                 <v-btn :color="color" @click="terms = false" large> Aceptar</v-btn>
                              </v-col>
                           </v-row>
                        </v-card-actions>
                     </v-card>
                  </v-dialog>
               </v-col>
            </v-row>
            <v-divider></v-divider>
            <br />
            <v-row align="end" justify="end">
               <v-btn class="mx-3" large text @click="$router.go(-1)"> Cancelar</v-btn>
               <v-btn class="mx-3" large :color="color" :disabled="!acceptTerms" @click="apply()"> Postular</v-btn>
            </v-row>
         </v-card-text>
      </v-card>
   </v-container>
</template>

<script>
import * as EventDA from "@/dataAccess/eventDA.js";
import * as FormDA from "@/dataAccess/formParticipantDA.js";
import { mapGetters, mapState } from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";
import Template from "../components/main-page/Template/Template.vue";

export default {
   data() {
      return {
         hasDNI: false,
         hasPhone: false,
         color: "FFFF",
         Template,
         styleColor: {
            color: " FFFF",
         },
         styleObject: {
            padding: "1%",
            width: "70em",
            margin: "3% auto",
         },
         terms: false,
         hasTeam: false,
         acceptTerms: false,
         gender: null,
         selectedGender: "",
         errorGender: true,
         condition: null,
         selectedCondition: "",
         errorCondition: true,
         institution: [],
         institutionObj: null,
         selectedInstitution: "",
         errorInstitution: true,
         faculty: [],
         facultyObj: null,
         selectedFaculty: "",
         errorFaculty: true,
         speciality: [],
         specialityObj: null,
         selectedSpeciality: "",
         errorSpeciality: true,
         checkSi: "",
         checkNo: "isChecked",
         idEvent: 0,
         value: true,
         enrollment: true,
         enrollmentPopUp: false,
         activePopUp: false,
         hasFaculty: false,
         participantCreated: {
            gender: "",
            phone: "",
            dni: "",
            institutionalCode: "",
            institutionalCondition: "",
            semester: 0,
            idUEvent: 0,
            idHei: 0,
            idUnit: 0,
            idCourse: 0,
            id: 0,
            communityToken: "",
            type: "",
            teamName: "",
         },
      };
   },
   validations() {
      return {
         participantCreated: {
            phone: {
               required,
               maxLength: maxLength(9),
            },
            dni: {
               required,
               maxLength: maxLength(8),
            },
            institutionalCode: {
               required,
               maxLength: maxLength(8),
            },
            semester: {
               required,
               maxLength: maxLength(2),
            },
         },
      };
   },
   computed: {
      ...mapGetters({ login: "login/getLogin" }),
      ...mapState(["login", "style"]),
      ...mapState(["community"]),
      ...mapGetters({ getUser: "user/getUser" }),
      phoneErrors() {
         const errors = [];
         if (!this.$v.participantCreated.phone.$dirty) return errors;
         !this.$v.participantCreated.phone.required && errors.push("Ingresar el numero de telefono del participante");
         return errors;
      },
      dniErrors() {
         const errors = [];
         if (!this.$v.participantCreated.dni.$dirty) return errors;
         !this.$v.participantCreated.dni.required && errors.push("Ingresar el numero de dni del participante");
         return errors;
      },
      institutionalCodeErrors() {
         const errors = [];
         if (!this.$v.participantCreated.institutionalCode.$dirty) return errors;
         !this.$v.participantCreated.institutionalCode.required && errors.push("Ingresar el codigo institucional del participante");
         return errors;
      },
      semesterErrors() {
         const errors = [];
         if (!this.$v.participantCreated.semester.$dirty) return errors;
         !this.$v.participantCreated.semester.required && errors.push("Ingresar el ciclo del participante");
         return errors;
      },
   },
   created() {},
   methods: {
      teamYes() {
         this.participantCreated.type = "Grupal";
         this.checkSi = "isChecked";
         this.checkNo = "";
      },
      teamNo() {
         this.participantCreated.type = "Individual";
         this.checkNo = "isChecked";
         this.checkSi = "";
      },
      selectCondition() {
         this.errorCondition = false;
      },
      selectGender() {
         this.errorGender = false;
      },
      selectInstitution() {
         console.log("Institucion seleccionada: ", this.selectedInstitution);
         //console.log("Institucion Obj: ",this.institutionObj);
         this.specialityObj = null;
         this.errorSpeciality = true;
         this.selectedSpeciality = "";
         this.facultyObj = null;
         this.errorFaculty = true;
         this.selectedFaculty = "";
         for (let i = 0; i < this.institutionObj.length; i++) {
            if (this.institutionObj[i].name === this.selectedInstitution) {
               //console.log("Institucion seleccionada: ",this.selectedInstitution)
               //console.log("Nombre Institucion: ",this.institutionObj[i].name)
               //console.log("Tipo: ",this.institutionObj[i].idType)
               console.log("HEI: ", this.institutionObj[i].idHei);
               this.participantCreated.idHei = this.institutionObj[i].idHei;
               if (this.institutionObj[i].idType === 2) {
                  this.specialityObj = this.institutionObj[i].courses;
                  this.hasFaculty = false;
                  break;
               } else {
                  this.facultyObj = this.institutionObj[i].units; /* Cambiar por el nombre del atributo de facultades */
                  this.hasFaculty = true;
                  break;
               }
            }
         }
         this.errorInstitution = false;
         console.log("Especialidades: ", this.specialityObj);
      },
      selectFaculty() {
         console.log("Facultad seleccionada: ", this.selectedFaculty);
         for (let i = 0; i < this.facultyObj.length; i++) {
            if (this.facultyObj[i].name === this.selectedFaculty) {
               console.log("Faculty: ", this.facultyObj[i]);
               this.participantCreated.idUnit = this.facultyObj[i].idUnit;
               this.specialityObj = this.facultyObj[i].courses;
               break;
            }
         }
         this.errorFaculty = false;
      },
      selectCourse() {
         console.log("Course seleccionado: ", this.selectedSpeciality);
         for (let i = 0; i < this.specialityObj.length; i++) {
            if (this.specialityObj[i].name === this.selectedSpeciality) {
               this.participantCreated.idCourse = this.specialityObj[i].idCourse;
            }
         }
         this.errorSpeciality = false;
      },
      apply() {
         this.$v.participantCreated.$touch();
         if (!this.$v.participantCreated.$invalid && !this.errorGender && !this.errorCondition && !this.errorInstitution && !this.errorSpeciality) {
            this.participantCreated.semester = parseInt(this.participantCreated.semester);
            console.log("Apply: ", this.participantCreated);
            FormDA.EnrollIn(this.participantCreated)
               .then((resp) => {
                  console.log("Respuesta EnrollIn: ", resp);
                  this.$swal.fire("Registro Exitoso", "Su inscripción al evento ha sido exitosa", "success");
                  this.$router.push("/");
               })
               .catch((error) => {
                  this.$swal.fire("Ocurrió un Problema", "No se pudo completar su inscripción al evento", "error");
                  console.log("Error ErollIn: ", error.response);
               });
         }
      },
   },
   beforeMount() {
      this.color = this.style.style.colors.primary;
      this.styleObject.backgroundColor = this.style.style.colors.primary;
      this.styleColor.color = this.style.style.colors.primary;

      let userData = this.login.login;
      console.log(this.login.login);
      this.participantCreated.id = userData.id;
      this.participantCreated.communityToken = this.community.community.idCommunity;
      // coloca valores en phone y dni si estos vienen de backend
      this.participantCreated.phone = userData.phone === undefined ? "" : userData.phone;
      this.participantCreated.dni = userData.dni === undefined ? "" : userData.dni;

      if (this.participantCreated.phone !== "") {
         this.hasPhone = true;
      }
      if (this.participantCreated.dni !== "") {
         this.hasDNI = true;
      }

      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then((response) => {
            this.enrollment = response.data.payload.openEnrollment;
            this.enrollmentPopUp = !this.enrollment;
            this.idEvent = response.data.payload.idUEvent;
            this.participantCreated.idUEvent = response.data.payload.idUEvent;
            EventDA.getHeisByEvent(this.idEvent).then((responseX) => {
               let data = responseX.data.payload;
               this.institutionObj = data;
               for (let i = 0; i < data.length; i++) {
                  this.institution.push(data[i].name);
               }
            });
         })
         .catch((error) => {
            console.log("Error: ", error);
            this.activePopUp = true;
            this.enrollment = false;
         });
      FormDA.getGenderList().then((response) => {
         // console.log("Generos: ", response.data.payload);
         this.gender = response.data.payload;
      });
      FormDA.getInstitutionalConditionList().then((response) => {
         // console.log("Codigo institucional: ", response.data.payload);
         this.condition = response.data.payload;
      });
   },
};
</script>
