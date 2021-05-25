import { API } from "./API";

export async function getQuestionsAndAnswersByPublication(idPublication) {
   let responseData = [];
   await API.get("/api/publication/question/findByPublication", {
      params: { id: idPublication }
   })
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               questionText: e.questions[0]["questionText"],
               answerText: e.questions[0]["answerText"],
               dateCreated: e.questions[0]["dateCreated"],
               dateAnswered: e.questions[0]["dateAnswered"],
               idQuestionThread: e.idQuestionThread
            };
         });
      })
      .catch(err => console.log(err));
   return responseData;
}

export async function askAQuestions(idPublication, buyerId, text) {
   var respondeData = {};
   let body = {
      idPublication: parseInt(idPublication),
      buyerId: buyerId,
      text: text
   };
   console.log(body);
   await API.post("/api/publication/question/ask", body)
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

export async function askOneMoreQuestion(idQuestionThread, buyerId, text) {
   var respondeData = {};
   let body = {
      idQuestionThread: parseInt(idQuestionThread),
      buyerId: buyerId,
      text: text
   };
   console.log(body);
   await API.post("/api/publication/question/askOneMore", body)
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

export async function getPendingQuestionsByBuyer(idBuyer) {
   let responseData = [];
   await API.get("/api/publication/question/pendingForBuyer", {
      params: {
         id: idBuyer,
         token: process.env.VUE_APP_API_KEY_COMMUNITY
      }
   })
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               idQuestion: e.idQuestion,
               idQuestionThread: e.idQuestionThread,
               questionText: e.questionText,
               mainImage: "data:image/jpeg;base64," + e.mainImage,
               productName: e.productName,
               productPrice: e.productPrice,
               hasMoreQuestions: e.hasMoreQuestions,
               questionDate: e.questionDate
            };
         });
      })
      .catch(err => console.log(err));
   console.log(responseData);
   return responseData;
}

export async function getAnsweredQuestionsByBuyer(idBuyer) {
   let responseData = [];
   await API.get("/api/publication/question/answeredForBuyer", {
      params: {
         id: idBuyer,
         token: process.env.VUE_APP_API_KEY_COMMUNITY
      }
   })
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               idQuestion: e.idQuestion,
               idQuestionThread: e.idQuestionThread,
               questionText: e.questionText,
               answerText: e.answerText,
               mainImage: "data:image/jpeg;base64," + e.mainImage,
               productName: e.productName,
               productPrice: e.productPrice,
               hasMoreQuestions: e.hasMoreQuestions,
               questionDate: e.questionDate,
               answerDate: e.answerDate
            };
         });
      })
      .catch(err => console.log(err));
   console.log(responseData);
   return responseData;
}

export async function getThreadByIdThread(idQuestionThread) {
   var responseData = [];
   await API.get("/api/publication/question/expandThread", {
      params: { idQuestionThread: idQuestionThread }
   })
      .then(res => {
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}
