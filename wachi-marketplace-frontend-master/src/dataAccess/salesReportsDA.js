import { APIORDER } from "./API";

export async function getIncomeReport(idUser, year) {
   var responseData = [];
   await APIORDER.get(
      "/api/order/reports/incomeMonths/" +
         year +
         "?id=" +
         idUser +
         "&token=" +
         process.env.VUE_APP_API_KEY_COMMUNITY
   )
      .then(res => {
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function getSalesQuantityReport(idUser, year) {
   var responseData = [];
   await APIORDER.get(
      "/api/order/reports/salesQuantityMonths/" +
         year +
         "?id=" +
         idUser +
         "&token=" +
         process.env.VUE_APP_API_KEY_COMMUNITY
   )
      .then(res => {
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function getTop15Publicationseport(idUser, year) {
   var responseData = [];
   await APIORDER.get(
      "/api/publication/reports/top15Publications/" +
         year +
         "?userId=" +
         idUser +
         "&token=" +
         process.env.VUE_APP_API_KEY_COMMUNITY
   )
      .then(res => {
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function getAvailableYears(idUser) {
   var responseData = [];
   await APIORDER.get(
      "/api/order/reports/availableYears/?id=" +
         idUser +
         "&token=" +
         process.env.VUE_APP_API_KEY_COMMUNITY
   )
      .then(res => {
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}
