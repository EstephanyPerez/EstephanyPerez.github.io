<template>
   <v-container>
      <v-list :four-line="true" :avatar="true">
         <v-list-item-group v-model="items" color="primary">
            <v-list-item
               v-if="items.length === 0"
               style="pointer-events: none;"
            >
               <v-list-item-content>
                  <p class="text-center text--disabled">
                     Aún no se han realizado preguntas sobre el
                     producto/servicio
                  </p>
               </v-list-item-content>
            </v-list-item>
            <v-card-text v-if="loadingQuestion" class="ma-auto">
               <v-progress-linear
                  indeterminate
                  color="primary"
               ></v-progress-linear>
               <p class="text-center text--disabled mt-3">
                  Cargando Preguntas... Por favor, espere
               </p>
            </v-card-text>
            <div v-if="!loadingQuestion">
               <v-list-item
                  v-for="(item, i) in visiblePages"
                  :key="i"
                  :inactive="true"
                  style="pointer-events: none;"
               >
                  <v-col>
                     <v-row>
                        <v-list-item-icon>
                           <v-icon class="color-icon-question"
                              >mdi-help-circle</v-icon
                           >
                        </v-list-item-icon>
                        <v-list-item-content>
                           <v-list-item-subtitle
                              v-text="item.dateCreated"
                           ></v-list-item-subtitle>
                           <v-list-item-title
                              v-html="subtitleQ(item)"
                           ></v-list-item-title>
                        </v-list-item-content>
                     </v-row>
                     <v-row v-if="item.answerText !== null">
                        <v-list-item-icon>
                           <v-icon class="color-icon-question"
                              >mdi-comment-outline</v-icon
                           >
                        </v-list-item-icon>
                        <v-list-item-content>
                           <v-list-item-subtitle
                              v-text="item.dateAnswered"
                           ></v-list-item-subtitle>
                           <v-list-item-title
                              v-html="subtitleA(item)"
                           ></v-list-item-title>
                        </v-list-item-content>
                     </v-row>
                  </v-col>
               </v-list-item>
            </div>
         </v-list-item-group>
      </v-list>
      <div v-if="items.length !== 0">
         <v-row justify="center">
            <v-col cols="9"> </v-col>
            <v-col cols="2" align-self="center">
               <p class="mb-0 text-end text-caption">
                  Por Página:
               </p>
            </v-col>
            <v-col cols="1" align-self="center">
               <v-select
                  class="text-caption"
                  v-model="perPage"
                  :items="pages"
                  menu-props="auto"
                  single-line
               ></v-select>
            </v-col>
         </v-row>
         <v-pagination
            v-model="page"
            :length="Math.ceil(items.length / perPage)"
         ></v-pagination>
      </div>
   </v-container>
</template>
<script>
import * as listQuestionDA from "../dataAccess/productServiceQuestions";
import { bus } from "../main";
export default {
   name: "CardQuestionAndAnswer",
   props: ["idPublication"],
   watch: {
      "$route.params.pid": function() {
         console.log("estas en watch");
         this.doStuff(this.idPublication);
      }
   },
   data: () => ({
      page: 1,
      perPage: 3,
      pages: [3, 5, 10, 15],
      items: [],
      loadingQuestion: false
      /* items: [
         {
            id: 1,
            buyerId: 1,
            questionText: "Una rebajita p, mano",
            answerText: "Nola papu, safa no mas",
            dateCreated: "10/11/2020",
            dataAnswered: "10/11/2020"
        },
        {
            id: 2,
            buyerId: 1,
            questionText: "Una rebajita p, mano",
            answerText: "Nola papu, safa no mas",
            dateCreated: "10/11/2020",
            dataAnswered: "10/11/2020"
        },
        {
            id: 3,
            buyerId: 1,
            questionText: "Una rebajita p, mano",
            answerText: "Nola papu, safa no mas",
            dateCreated: "10/11/2020",
            dataAnswered: "10/11/2020"
        },
        {
            id: 4,
            buyerId: 1,
            questionText: "Una rebajita p, mano",
            answerText: null,
            dateCreated: "10/11/2020",
            dataAnswered: "10/11/2020"
        } 
      ] */
   }),
   beforeCreate() {
      // console.log("before create: idpublicacion", this.idPublication);
      // listQuestionDA
      //    .getQuestionsAndAnswersByPublication(this.idPublication)
      //    .then(res => {
      //       //aqui cambie
      //       this.items = res;
      //       //console.log(this.idPublication);
      //    });
   },
   created: function() {
      this.doStuff(this.idPublication);
      bus.$on("Pregunta", () => {
         this.retrieveQuestionsPublications();
      });
   },
   methods: {
      doStuff(id) {
         this.retrieveQuestionsPublications();
         console.log("Id publicacion", id);
      },
      retrieveQuestionsPublications() {
         this.loadingQuestion = true;
         listQuestionDA
            .getQuestionsAndAnswersByPublication(this.idPublication)
            .then(res => ((this.items = res), (this.loadingQuestion = false)));
      },
      subtitleQ(item) {
         return (
            "<span class='text--primary'>" + item.questionText + "</span>\n"
         );
      },
      subtitleA(item) {
         return "<span class='text--primary'>" + item.answerText + "\n";
      }
   },
   computed: {
      visiblePages() {
         let lista = this.items.slice(
            (this.page - 1) * this.perPage,
            this.page * this.perPage
         );
         return lista;
      }
   },
   mounted() {}
};
</script>
<style scoped src="../styles/CardQuestionAndAnswer.css"></style>
