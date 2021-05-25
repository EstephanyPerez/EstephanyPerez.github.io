import { APIORDER } from "./API";

export async function getAllOrderBySeller(idSeller) {
   let responseData;
   await APIORDER.get("/api/order/listForSeller?id=" + idSeller, {
      params: { token: process.env.VUE_APP_API_KEY_COMMUNITY }
   })
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               id: "Product_" + e.idProduct + "_Purchase_" + e.idPurchase,
               idProduct: e.idProduct,
               idPurchase: e.idPurchase,
               sku: e.sku,
               name: e.name,
               quantity: e.type === "S" ? "-" : e.quantity,
               date: e.date,
               price: e.unitPrice,
               images: "data:image/jpeg;base64," + e.images[0],
               type:
                  e.type === "S"
                     ? "Servicio"
                     : e.type === "P"
                     ? "Producto"
                     : "No identificado",
               purchaseCode: e.purchaseCode,
               state: e.status === "En_curso" ? "En curso" : e.status,
               total: e.subtotal,
               username: e.buyerName ? e.buyerName : "Juan Perez",
               email: e.buyerEMail ? e.buyerEMail : "juan.perez@pucp.pe"
            };
         });
         console.log("====   GetOrders: ", res.data.body);
      })
      .catch(err => {
         console.log(err);
         // responseData = [
         //    {
         //       date: "2020-11-26",
         //       id: "Product_1_Purchase_1",
         //       idProduct: 1,
         //       idPurchase: 1,
         //       images: "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAACcU",
         //       name: "producto 1",
         //       price: 15.99,
         //       purchaseCode: "P936236",
         //       quantity: 1,
         //       sku: "P111111",
         //       state: "Procesado",
         //       total: 15.99,
         //       type: "Producto"
         //    }
         // ]
      });

   return responseData;
}

export async function getProductStates() {
   let responseData;
   await APIORDER.get("/api/order/statusList/product")
      .then(res => {
         responseData = res.data.body;
         console.log("==== GetProductStates: ", res.data.body);
      })
      .catch(err => console.log(err));

   // responseData = ["Pediente", "En_curso", "Enviado", "Entregado", "Devuelto"];
   // console.log("==== RRRRProductStates: ", responseData);
   return responseData;
}

export async function getServiceStates() {
   let responseData;
   await APIORDER.get("/api/order/statusList/service")
      .then(res => {
         responseData = res.data.body;
         console.log("==== GetServiceStates: ", res.data.body);
      })
      .catch(err => console.log(err));

   // responseData = ["Pediente", "En_curso", "Realizado"];
   // console.log("==== RRRRServiceStates: ", responseData);
   return responseData;
}

export async function updateState(idItem, idPurchase, status) {
   let responseData;
   // console.log(idItem, " x ", idPurchase, " x ", status)
   await APIORDER.post("/api/order/detailUpdate", {
      idProduct: idItem,
      idPurchase: idPurchase,
      status: status
   })
      .then(res => {
         responseData = res.data.body;
         console.log("====   UpdateState: ", res.data);
      })
      .catch(err => console.log(err));

   return responseData;
}
