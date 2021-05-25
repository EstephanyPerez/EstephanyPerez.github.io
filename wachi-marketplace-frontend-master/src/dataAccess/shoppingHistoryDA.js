import { API, APIORDER } from "./API";

export async function listShoppingHistory(idUser) {
   let responseData = [];
   await APIORDER.get("/api/order/purchaseList?idUser=" + idUser, {
      params: { token: process.env.VUE_APP_API_KEY_COMMUNITY }
   })
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               id: e.id,
               code: e.code,
               date: e.date,
               cantItems: e.cantItems,
               totalAmount: e.totalAmount.toFixed(2),
               status: e.status
            };
         });
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function getOrderDetail(idOrder) {
   let responseData = {};
   await APIORDER.get("/api/order/purchaseDetail?id=" + idOrder)
      .then(res => {
         console.log("orderDetail: ", res.data.body);
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}
export async function saveRating(data) {
   let responseData = {};
   await API.post("/api/publication/rating/save", data)
      .then(res => {
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}
