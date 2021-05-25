<template>
   <v-container>
      <v-row>
         <v-col> ¿Qué deseas saber? </v-col>
      </v-row>
      <v-row>
         <v-col class="askButton">
            <v-btn
               :style="{
                  backgroundColor: generalConfig.mainColor + ' !important',
                  color: 'white !important'
               }"
               class="mt-3"
               outlined
               tile
               dense
               color="#1867C0"
               @click="toconsult()"
            >
               MEDIOS DE PAGO
            </v-btn>
         </v-col>
      </v-row>
      <v-row>
         <v-col> O pregúntale al vendedor </v-col>
      </v-row>
      <v-row ref="form">
         <v-col md="10" cols="10">
            <v-textarea
               ref="question"
               label="Escribe tu pregunta"
               auto-grow
               outlined
               v-model="question"
               rows="1"
               row-height="20"
               :rules="[rules.required]"
            >
            </v-textarea>
         </v-col>
         <v-col md="2" cols="12" class="askButton">
            <v-btn
               :style="{
                  backgroundColor: generalConfig.mainColor + ' !important',
                  color: 'white !important'
               }"
               class="mt-3"
               outlined
               tile
               dense
               color="#1867C0"
               @click="askQuestion()"
            >
               Preguntar
            </v-btn>
         </v-col>
      </v-row>
      <!-- To consult -->
      <v-dialog
         v-model="showPayment"
         persistent
         max-width="500"
         max-heigth="500"
         ><v-container class="pa-0">
            <v-card>
               <v-row align="center" justify="center">
                  <v-col
                     md="10"
                     cols="10"
                     align-self="center"
                     class="py-0 px-auto d-flex"
                  >
                     <v-card-text> Medios de pago </v-card-text>
                  </v-col>
                  <v-col
                     md="2"
                     cols="2"
                     align-self="center"
                     class="py-0 px-auto d-flex"
                  >
                     <v-icon @click="toclose()">
                        mdi-close-circle-outline
                     </v-icon>
                  </v-col>
               </v-row>
               <v-row align="center" justify="center">
                  <v-col
                     md="12"
                     cols="12"
                     align-self="center"
                     class="py-0 px-auto d-flex justify-center"
                  >
                     <v-img
                        width="490"
                        heigth="490"
                        contain
                        :aspect-ratio="16 / 9"
                        src="@/assets/medio_de_pago.png"
                     ></v-img>
                  </v-col>
               </v-row>
            </v-card>
         </v-container>
      </v-dialog>
      <!-- Login Modal -->
      <!-- <LoginModal></LoginModal> -->
   </v-container>
</template>
<style scoped src="../styles/ProductServiceDetail.css"></style>

<script>
//import img from "@/assets/medio_de_pago.png";
// import LoginModal from "../components/LoginModal";
import * as AskQuestionDA from "../dataAccess/productServiceQuestions";
import { mapState, mapGetters } from "vuex";
import { bus } from "../main";
export default {
   name: "AskAQuestion",
   props: ["idPublication"],
   data: () => ({
      showPayment: false,
      question: "",
      //buyerId: 1,
      body: [],
      isLogged: false,
      params: "",
      rules: {
         required: value => !!value || "Requerido."
      }
   }),
   components: {
      // LoginModal,
   },
   created() {
      //this.retrieveCategories();
      //this.retrieveProducts();
      this.params = this.$route.params.pid;
      this.isLogged = this.getUser().session.authenticated;
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      toconsult() {
         this.showPayment = true;
      },
      toclose() {
         this.showPayment = false;
      },
      askQuestion() {
         /*             console.log("se realiza la siguietne pregutna");
            console.log(this.question); */

         if (this.isLogged) {
            console.log("soy la pregunta", this.question);
            Object.keys(this.form).forEach(f => {
               this.$refs[f].validate(true);
            });
            if (this.question != "") {
               AskQuestionDA.askAQuestions(
                  this.idPublication,
                  this.getUser().data.id,
                  this.question
               ).then(res => {
                  this.body = res;
                  bus.$emit("Pregunta", this.question);
               });
               Object.keys(this.form).forEach(f => {
                  this.$refs[f].reset();
               });
               this.question = "";
            }
         } else {
            console.log("NO LOGGED");
            bus.$emit("loginModal", {
               view: "askAQuestion",
               params: this.params,
               show: true
            });
         }
      }
   },
   computed: {
      ...mapState(["cart", "idUser", "generalConfig"]),
      form() {
         return {
            question: this.question
         };
      }
   }
};
</script>
