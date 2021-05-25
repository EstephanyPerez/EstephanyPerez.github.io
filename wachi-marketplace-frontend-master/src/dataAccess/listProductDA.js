import { API, APIORDER } from "./API";

export async function getAllPublications() {
   let responseData = [];
   await API.get("/api/publication/findAll", {
      params: { token: process.env.VUE_APP_API_KEY_COMMUNITY }
   })
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               id: e.productService.id,
               name: e.productService.name,
               promRating: e.promRating,
               price: e.productService.price,
               salesQuantity: e.salesQuantity,
               imgURL: "data:image/jpeg;base64," + e.productService.images[0],
               category: e.productService.category
            };
         });
      })
      .catch(err => console.log(err));
   return responseData;
}
export async function getPublicationsByPage(page, dataBody) {
   let responseData = [];
   let json = {};
   await API.post(
      "/api/publication/filter?page=" + page,
      /*{
            params: { token: process.env.VUE_APP_API_KEY_COMMUNITY }
         },*/ dataBody
   )
      .then(res => {
         console.log("publication/filter: ", res.data.body);
         responseData = res.data.body.listPublication.map(e => {
            return {
               id: e.productService.id,
               stock: e.productService.stock,
               type: e.productService.type,
               name: e.productService.name,
               promRating: e.promRating,
               price: e.productService.price,
               salesQuantity: e.salesQuantity,
               imgURL: "data:image/jpeg;base64," + e.productService.images[0],
               category: e.productService.category
            };
         });
         json = {
            data: responseData,
            totalPages: res.data.body.totalPages
         };
      })
      .catch(err => console.log(err));
   return json;
}

export async function getAllPublicationsBySearch(wordToSearch) {
   let responseData = [];

   await API.post("/api/publication/findAllByQuery", {
      token: process.env.VUE_APP_API_KEY_COMMUNITY,
      queryString: wordToSearch
   })
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               id: e.productService.id,
               name: e.productService.name,
               promRating: e.promRating,
               price: e.productService.price,
               salesQuantity: e.salesQuantity,
               imgURL: "data:image/jpeg;base64," + e.productService.images[0]
            };
         });
         console.log("api search", responseData);
      })
      .catch(err => console.log(err));
   return responseData;
}

export async function getRelatedPublicationsByPublicationID(id, userId) {
   var responseData = {};
   await API.get("/api/publication/related", {
      params: { id: id, userId: userId }
   })
      .then(res => {
         //console.log("publication/related : ", res.data.body);
         responseData = res.data.body.map(e => {
            return {
               id: e.productService.id,
               name: e.productService.name,
               price: e.productService.price,
               imgURL: "data:image/jpeg;base64," + e.productService.images[0],
               stock: e.productService.stock
            };
         });
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function isInCart(idUser, idItem) {
   var responseData = { quantity: 0 };
   await APIORDER.get("/api/order/shoppingCart/" + idUser + "/item/" + idItem)
      .then(res => {
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function addToCart(idUser, idItem, count) {
   let responseData = {};
   let body = {
      productId: idItem,
      quantity: count
   };
   await APIORDER.post(
      "/api/order/shoppingCart/" +
         idUser +
         "/" +
         process.env.VUE_APP_API_KEY_COMMUNITY +
         "/item",
      body
   )
      .then(res => {
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function updateCart(idUser, idItem, count) {
   var responseData = {};
   await APIORDER.put("/api/order/shoppingCart/" + idUser + "/item/" + idItem, {
      quantity: count
   })
      .then(res => {
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function getCart(idUser) {
   var responseData = [];
   await APIORDER.get(
      "/api/order/shoppingCart/" +
         idUser +
         "/" +
         process.env.VUE_APP_API_KEY_COMMUNITY
   )
      .then(res => {
         responseData[0] = res.data.body.detail.map(e => {
            return {
               id: e.productId,
               name: e.productName,
               description: e.productDescription,
               price: e.productCost,
               quantity: e.quantity,
               seller: e.seller,
               imgURL: "data:image/jpeg;base64," + e.images[0],
               subtotal: e.subtotal,
               stock: e.stock,
               type: e.type,
               status: e.status
            };
         });
         responseData[1] = res.data.body.total;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function deleteFromCart(idUser, idItem) {
   var responseData = {};
   await APIORDER.delete(
      "/api/order/shoppingCart/" + idUser + "/item/" + idItem
   )
      .then(res => {
         responseData = res.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}

export async function getRecentPublications(userId) {
   var responseData = {};
   await API.get("/api/publication/recent", {
      params: { token: process.env.VUE_APP_API_KEY_COMMUNITY, userId: userId }
   })
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               id: e.productService.id,
               name: e.productService.name,
               price: e.productService.price,
               imgURL: "data:image/jpeg;base64," + e.productService.images[0],
               stock: e.productService.stock
            };
         });
      })
      .catch(error => {
         console.log(error);
      });
   return responseData;
}
