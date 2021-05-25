import { API } from "./API";

export async function getPendingQuestionsBySeller(idSeller) {
   let responseData = [];
   await API.get("/api/publication/question/pending?id=" + idSeller, {
      params: { token: process.env.VUE_APP_API_KEY_COMMUNITY }
   })
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               idQuestion: e.idQuestion,
               questionText: e.questionText,
               mainImage: "data:image/jpeg;base64," + e.mainImage,
               productName: e.productName,
               productPrice: e.productPrice,
               questionDate: e.questionDate,
               idQuestionThread: e.idQuestionThread,
               hasMoreQuestions: e.hasMoreQuestions
            };
         });
         console.log("pending questions: ", res.data.body);
      })
      .catch(err => console.log(err));
   return responseData;
}

export async function getAnsweredQuestionsBySeller(idSeller) {
   let responseData = [];
   await API.get("/api/publication/question/answered?id=" + idSeller, {
      params: { token: process.env.VUE_APP_API_KEY_COMMUNITY }
   })
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               idQuestion: e.idQuestion,
               questionText: e.questionText,
               answerDate: e.answerDate,
               answerText: e.answerText,
               mainImage: "data:image/jpeg;base64," + e.mainImage,
               productName: e.productName,
               productPrice: e.productPrice,
               questionDate: e.questionDate,
               idQuestionThread: e.idQuestionThread,
               hasMoreQuestions: e.hasMoreQuestions
            };
         });
         console.log("answered questions: ", res.data.body);
      })
      .catch(err => console.log(err));
   return responseData;
}

export async function answerAquestion(idQuestion, text) {
   var respondeData = {};
   let body = {
      idQuestion: parseInt(idQuestion),
      text: text
   };
   console.log(body);
   await API.post("/api/publication/question/answer", body)
      .then(response => {
         /*             console.log(response); */
         respondeData = response.data;
         /*             console.log(respondeData); */
      })
      .catch(error => {
         console.log(error);
      });
   return respondeData;
}
