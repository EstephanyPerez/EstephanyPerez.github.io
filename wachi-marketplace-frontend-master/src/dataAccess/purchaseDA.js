import { APIORDER } from "./API";

export async function buyShoppingCart(userid) {
   let responseData = {};
   //console.log("Body:", body);
   await APIORDER.post(
      "/api/order/buy/" + userid + "/" + process.env.VUE_APP_API_KEY_COMMUNITY
   )
      .then(res => {
         console.log("pase el post");
         responseData = res.data.body;
         console.log("soy la rpta de la compra", responseData);
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function getNumberPayments(userid) {
   let responseData = {};
   await APIORDER.get(
      "/api/order/shoppingCart/" +
         userid +
         "/" +
         process.env.VUE_APP_API_KEY_COMMUNITY +
         "/numberPayments"
   )
      .then(res => {
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function getPurchaseSummary(purchaseid) {
   let responseData = {};
   console.log("llegue antes del get", purchaseid);
   await APIORDER.get("/api/order/purchaseDetail?id=" + purchaseid)
      .then(res => {
         console.log("pase el get");
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function createPayment(body) {
   let responseData = {};
   console.log("Body:", body);
   await APIORDER.post("/api/order/payment", body)
      .then(res => {
         console.log("pase el post");
         responseData = res.data;
         console.log("body payment", body);
         console.log("soy la rpta de payment", responseData);
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}
