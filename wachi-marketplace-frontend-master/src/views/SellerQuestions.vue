<template>
   <v-container class="pa-0">
      <v-card class="pa-5">
         <v-card-title class="pl-0 pt-0"> Preguntas </v-card-title>
         <v-tabs left>
            <v-tab>Por responder</v-tab>
            <v-tab>Respondidas</v-tab>
            <v-tab-item>
               <v-card :four-line="true" :avatar="true">
                  <v-list-item-group v-model="items" color="primary">
                     <v-list-item
                        v-if="items.length === 0"
                        style="pointer-events: none"
                     >
                        <v-list-item-content>
                           <p class="text-center text--disabled">
                              Aún no tienes preguntas pendientes para responder
                           </p>
                        </v-list-item-content>
                     </v-list-item>
                     <v-card
                        class="mx-auto ma-3 pl-10"
                        v-for="(item, i) in visiblePages"
                        :key="i"
                        :inactive="true"
                     >
                        <v-col>
                           <v-row>
                              <v-col class="col-4">
                                 <v-row>
                                    <v-img
                                       min-height="10vh"
                                       max-height="10vh"
                                       min-width="10vh"
                                       max-width="10vh"
                                       :src="item.mainImage"
                                    ></v-img>
                                    <v-list-item-content class="pl-2">
                                       <v-list-item-title
                                          class="productName-blue"
                                          v-text="item.productName"
                                       ></v-list-item-title>
                                    </v-list-item-content>
                                 </v-row>
                              </v-col>
                              <v-col class="col-8 pr-12">
                                 <v-list-item-subtitle
                                    class="pt-6 text-right pr-9"
                                    v-html="priceProd(item)"
                                 ></v-list-item-subtitle>
                              </v-col>
                           </v-row>
                           <v-row v-if="item.hasMoreQuestions">
                              <a
                                 @click="
                                    seeMoreQuestions(
                                       item.idQuestion,
                                       item.idQuestionThread,
                                       i
                                    )
                                 "
                                 >{{
                                    seeMoreArray[i] &&
                                    idSelected == item.idQuestion
                                       ? "Ocultar preguntas anteriores"
                                       : "Ver preguntas anteriores"
                                 }}</a
                              >
                           </v-row>
                           <v-row
                              v-if="
                                 idSelected == item.idQuestion &&
                                    questionsThread &&
                                    seeMoreArray[i]
                              "
                           >
                              <v-col>
                                 <v-card
                                    class="mx-auto pl-5"
                                    v-for="(thread, i) in questionsThread"
                                    :key="i"
                                 >
                                    <v-row>
                                       <v-list-item-icon>
                                          <v-icon class="color-icon-question"
                                             >mdi-help-circle</v-icon
                                          >
                                       </v-list-item-icon>
                                       <v-list-item-content>
                                          <v-list-item-subtitle
                                             v-text="thread.dateCreated"
                                          ></v-list-item-subtitle>
                                          <v-list-item-title
                                             class="pt-2"
                                             v-html="subtitleThreadQ(thread)"
                                          ></v-list-item-title>
                                       </v-list-item-content>
                                    </v-row>
                                    <v-row v-if="thread.answerText !== null">
                                       <v-list-item-icon>
                                          <v-icon class="color-icon-question"
                                             >mdi-comment-outline</v-icon
                                          >
                                       </v-list-item-icon>
                                       <v-list-item-content>
                                          <v-list-item-subtitle
                                             v-text="thread.dateAnswered"
                                          ></v-list-item-subtitle>
                                          <v-list-item-title
                                             class="pt-2"
                                             v-html="subtitleThreadA(thread)"
                                          ></v-list-item-title>
                                       </v-list-item-content>
                                    </v-row>
                                 </v-card>
                              </v-col>
                           </v-row>
                           <v-row v-if="item.productName !== null">
                              <v-list-item-icon>
                                 <v-icon class="color-icon-question pl-8"
                                    >mdi-help-circle</v-icon
                                 >
                              </v-list-item-icon>
                              <v-list-item-content>
                                 <v-list-item-subtitle
                                    v-text="item.questionDate"
                                 ></v-list-item-subtitle>
                                 <v-list-item-title
                                    class="pt-2"
                                    v-html="subtitleQ(item)"
                                 ></v-list-item-title>
                              </v-list-item-content>
                           </v-row>
                           <v-row>
                              <v-col md="9" cols="9">
                                 <v-textarea
                                    label="Escribe respuesta"
                                    auto-grow
                                    outlined
                                    v-model="answer[i]"
                                    rows="1"
                                    row-height="20"
                                 >
                                 </v-textarea>
                              </v-col>
                              <div md="2" cols="2">
                                 <v-btn
                                    :style="{
                                       backgroundColor:
                                          generalConfig.mainColor +
                                          ' !important',
                                       color: 'white !important'
                                    }"
                                    class="mt-3"
                                    outlined
                                    tile
                                    dense
                                    color="#1867C0"
                                    center
                                    @click="answerAquestion(item, i)"
                                 >
                                    Responder
                                 </v-btn>
                              </div>
                           </v-row>
                        </v-col>
                     </v-card>
                  </v-list-item-group>
               </v-card>
               <div v-if="items.length !== 0">
                  <v-row justify="center">
                     <v-col cols="9"> </v-col>
                     <v-col cols="2" align-self="center">
                        <p class="mb-0 text-end text-caption">Por Página:</p>
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
            </v-tab-item>
            <!-- empieza segunda sección -->
            <v-tab-item>
               <v-card :four-line="true" :avatar="true">
                  <v-list-item-group
                     v-model="answeredQuestions"
                     color="primary"
                  >
                     <v-list-item
                        v-if="answeredQuestions.length === 0"
                        style="pointer-events: none"
                     >
                        <v-list-item-content>
                           <p class="text-center text--disabled">
                              Aún no tienes preguntas respondidas
                           </p>
                        </v-list-item-content>
                     </v-list-item>
                     <v-card
                        class="mx-auto ma-3 pl-10"
                        v-for="(item, i) in visiblePages2"
                        :key="i"
                        :inactive="true"
                     >
                        <v-col>
                           <v-row>
                              <v-col class="col-4">
                                 <v-row>
                                    <v-img
                                       min-height="10vh"
                                       max-height="10vh"
                                       min-width="10vh"
                                       max-width="10vh"
                                       :src="item.mainImage"
                                    ></v-img>
                                    <v-list-item-content class="pl-2">
                                       <v-list-item-title
                                          class="productName-blue"
                                          v-text="item.productName"
                                       ></v-list-item-title>
                                    </v-list-item-content>
                                 </v-row>
                              </v-col>
                              <v-col class="col-8 pr-12">
                                 <v-list-item-subtitle
                                    class="pt-6 text-right pr-9"
                                    v-html="priceProd(item)"
                                 ></v-list-item-subtitle>
                              </v-col>
                           </v-row>
                           <v-row v-if="item.hasMoreQuestions">
                              <a
                                 @click="
                                    seeMoreQuestions2(
                                       item.idQuestion,
                                       item.idQuestionThread,
                                       i
                                    )
                                 "
                                 >{{
                                    idSelected == item.idQuestion &&
                                    questionsThread2 &&
                                    seeMoreArray2[i]
                                       ? "Ocultar preguntas anteriores"
                                       : "Ver preguntas anteriores"
                                 }}</a
                              >
                           </v-row>
                           <v-row v-if="questionsThread2 && seeMoreArray2[i]">
                              <v-col>
                                 <v-card
                                    class="mx-auto pl-5"
                                    v-for="(thread, i) in questionsThread2"
                                    :key="i"
                                 >
                                    <v-row>
                                       <v-list-item-icon>
                                          <v-icon class="color-icon-question"
                                             >mdi-help-circle</v-icon
                                          >
                                       </v-list-item-icon>
                                       <v-list-item-content>
                                          <v-list-item-subtitle
                                             v-text="thread.dateCreated"
                                          ></v-list-item-subtitle>
                                          <v-list-item-title
                                             class="pt-2"
                                             v-html="subtitleThreadQ(thread)"
                                          ></v-list-item-title>
                                       </v-list-item-content>
                                    </v-row>
                                    <v-row v-if="thread.answerText !== null">
                                       <v-list-item-icon>
                                          <v-icon class="color-icon-question"
                                             >mdi-comment-outline</v-icon
                                          >
                                       </v-list-item-icon>
                                       <v-list-item-content>
                                          <v-list-item-subtitle
                                             v-text="thread.dateAnswered"
                                          ></v-list-item-subtitle>
                                          <v-list-item-title
                                             class="pt-2"
                                             v-html="subtitleThreadA(thread)"
                                          ></v-list-item-title>
                                       </v-list-item-content>
                                    </v-row>
                                 </v-card>
                              </v-col>
                           </v-row>
                           <v-row v-if="item.productName !== null">
                              <v-list-item-icon>
                                 <v-icon class="color-icon-question pl-8"
                                    >mdi-help-circle</v-icon
                                 >
                              </v-list-item-icon>
                              <v-list-item-content>
                                 <v-list-item-subtitle
                                    v-text="item.questionDate"
                                 ></v-list-item-subtitle>
                                 <v-list-item-title
                                    class="pt-2"
                                    v-html="subtitleQ(item)"
                                 ></v-list-item-title>
                              </v-list-item-content>
                           </v-row>
                           <v-row>
                              <v-list-item-icon>
                                 <v-icon class="color-icon-question pl-8"
                                    >mdi-comment-outline</v-icon
                                 >
                              </v-list-item-icon>
                              <v-list-item-content>
                                 <v-list-item-subtitle
                                    v-text="item.answerDate"
                                 ></v-list-item-subtitle>
                                 <v-list-item-title
                                    class="pt-2"
                                    v-html="subtitleA(item)"
                                 ></v-list-item-title>
                              </v-list-item-content>
                           </v-row>
                        </v-col>
                     </v-card>
                  </v-list-item-group>
               </v-card>
               <div v-if="answeredQuestions.length !== 0">
                  <v-row justify="center">
                     <v-col cols="9"> </v-col>
                     <v-col cols="2" align-self="center">
                        <p class="mb-0 text-end text-caption">Por Página:</p>
                     </v-col>
                     <v-col cols="1" align-self="center">
                        <v-select
                           class="text-caption"
                           v-model="perPage2"
                           :items="pages2"
                           menu-props="auto"
                           single-line
                        ></v-select>
                     </v-col>
                  </v-row>
                  <v-pagination
                     v-model="page2"
                     :length="Math.ceil(answeredQuestions.length / perPage2)"
                  ></v-pagination>
               </div>
            </v-tab-item>
         </v-tabs>
      </v-card>
   </v-container>
</template>

<script>
import * as listQuestionDA from "../dataAccess/sellerQuestionsDA";
import * as listQuestionAVentetorDA from "../dataAccess/productServiceQuestions";
import { mapState, mapGetters } from "vuex";

export default {
   name: "SellerQuestions",
   //props: ["idSeller"],
   props: ["idUser"],
   watch: {
      answerQuestion: function() {
         console.log("estas en watch");
         //this.doStuff(this.idSeller);
         this.doStuff(this.getUser().data.id);
         //this.doStuff(12);
      }
   },
   data: () => ({
      page: 1,
      perPage: 3,
      page2: 1,
      perPage2: 3,
      answer: [],
      pages: [3, 5, 10, 15],
      pages2: [3, 5, 10, 15],
      answerQuestion: false,
      idSelected: 0,
      idSelectedForQuestion: 0,
      items: [],
      seeMoreArray: [],
      seeMoreArray2: [],
      questionsThread: null,
      questionsThread2: null,
      answeredQuestions: [],
      iPrev: -1,
      iPrevSeeMore: -1
      /*items: [
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
      ]*/
   }),
   beforeCreate() {},
   created: function() {
      //this.doStuff(this.idSeller);
      this.doStuff(this.getUser().data.id);
      //this.doStuff(12);
      this.retrieveAnsweredQuestions();
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      doStuff(id) {
         this.retrievePendingQuestions();
         this.retrieveAnsweredQuestions();
         console.log("Id publicacion", id);
      },
      retrievePendingQuestions() {
         listQuestionDA
            .getPendingQuestionsBySeller(this.getUser().data.id)
            .then(res => {
               this.items = res;
               this.answer = Array(this.items.length).fill("");
               this.seeMoreArray = Array(this.items.length).fill(false);
               console.log(res);
            });
      },
      retrieveAnsweredQuestions() {
         listQuestionDA
            .getAnsweredQuestionsBySeller(this.getUser().data.id)
            .then(res => {
               this.answeredQuestions = res;
               this.seeMoreArray = Array(this.answeredQuestions.length).fill(
                  false
               );
               console.log(res);
            });
      },
      subtitleQ(item) {
         return (
            "<span class='text--primary'>" + item.questionText + "</span>\n"
         );
      },
      subtitleA(item) {
         return "<span class='text--primary'>" + item.answerText + "</span>\n";
      },
      nameProd(item) {
         return (
            "<span style='color:#1867C0;font-size:25px' >" +
            item.productName +
            "\n"
         );
      },
      priceProd(item) {
         return (
            "<span style='color:#000000;font-size:0.875rem' >S/" +
            item.productPrice +
            "\n"
         );
      },
      subtitleThreadQ(thread) {
         return (
            "<span class='text--primary'>" + thread.questionText + "</span>\n"
         );
      },
      subtitleThreadA(thread) {
         return "<span class='text--primary'>" + thread.answerText + "\n";
      },
      answerAquestion(item, i) {
         /*             console.log("se realiza la siguietne pregutna");
            console.log(this.question); */
         listQuestionDA
            .answerAquestion(item.idQuestion, this.answer[i])
            .then(res => {
               this.body = res;
               this.answerQuestion = !this.answerQuestion;
            });
         console.log(item.idQuestion);
         this.answer[i] = "";
         //location.reload();
      },
      seeMoreQuestions(idItem, idThread, i) {
         console.log(idThread, i);
         if (this.iPrevSeeMore == -1 || this.iPrevSeeMore == i) {
            console.log(this.iPrevSeeMore);
            this.iPrevSeeMore = i;
         } else if (this.iPriPrevSeeMoreev != i) {
            this.seeMoreArray[this.iPrevSeeMore] = false;
            this.questionsThread = null;
            console.log(
               this.iPrevSeeMore,
               this.seeMoreArray[this.iPrevSeeMore]
            );
            this.iPrevSeeMore = i;
         }
         this.idSelected = idItem;
         this.seeMoreArray[i] = !this.seeMoreArray[i];
         this.seeMore = !this.seeMore;
         listQuestionAVentetorDA.getThreadByIdThread(idThread).then(res => {
            console.log(res);
            this.questionsThread = res;
            if (this.questionsThread.length > 0) {
               this.questionsThread.splice(this.questionsThread.length - 1, 1);
            }
         });
      },
      seeMoreQuestions2(idItem, idThread, i) {
         console.log(idThread, i);
         if (this.iPrevSeeMore == -1 || this.iPrevSeeMore == i) {
            console.log(this.iPrevSeeMore);
            this.iPrevSeeMore = i;
         } else if (this.iPriPrevSeeMoreev != i) {
            this.seeMoreArray2[this.iPrevSeeMore] = false;
            this.questionsThread2 = null;
            console.log(
               this.iPrevSeeMore,
               this.seeMoreArray2[this.iPrevSeeMore]
            );
            this.iPrevSeeMore = i;
         }
         this.idSelected = idItem;
         this.seeMoreArray2[i] = !this.seeMoreArray2[i];
         this.seeMore = !this.seeMore;
         listQuestionAVentetorDA.getThreadByIdThread(idThread).then(res => {
            console.log(res);
            this.questionsThread2 = res;
            if (this.questionsThread2.length > 0) {
               this.questionsThread2.splice(
                  this.questionsThread2.length - 1,
                  1
               );
            }
         });
      }
   },
   computed: {
      ...mapState(["cart", "idUser", "generalConfig"]),
      visiblePages() {
         let lista = this.items.slice(
            (this.page - 1) * this.perPage,
            this.page * this.perPage
         );
         return lista;
      },
      visiblePages2() {
         let lista = this.answeredQuestions.slice(
            (this.page2 - 1) * this.perPage2,
            this.page2 * this.perPage2
         );
         return lista;
      }
   },
   mounted() {}
};
</script>
<style scoped src="../styles/CardQuestionAndAnswer.css"></style>
