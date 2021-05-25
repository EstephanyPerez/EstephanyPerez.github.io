import { API } from "./API";

export async function getAllPublicationsBySeller(idSeller) {
   let responseData = [];
   await API.get("/api/publication/findAllBySeller?userId=" + idSeller, {
      params: { token: process.env.VUE_APP_API_KEY_COMMUNITY }
   })
      .then(res => {
         responseData = res.data.body.map(e => {
            return {
               id: e.productService.id,
               sku: e.productService.sku,
               name: e.productService.name,
               stock:
                  e.productService.type === "S" ? "-" : e.productService.stock,
               creationDate: e.productService.creationDate,
               price: e.productService.price,
               category: e.productService.category.name,
               images: "data:image/jpeg;base64," + e.productService.images[0],
               type:
                  e.productService.type === "S"
                     ? "Servicio"
                     : e.productService.type === "P"
                     ? "Producto"
                     : "NoShow",
               description: e.productService.description
            };
         });
         console.log("====");
         console.log("   GetPublications: ", res.data.body);
      })
      .catch(err => console.log(err));
   return responseData;
}

export async function deletePublicationBySeller(idItem) {
   let responseData = "";
   await API.delete("/api/publication/delete?id=" + idItem + "&userId=12")
      .then(res => {
         responseData = res.data.message;
      })
      .catch(err => console.log(err));
   return responseData;
}

export async function visualizeInformationProductService(itemId) {
   let responseData = [];
   await API.get("/api/publication/findById?id=" + itemId)
      .then(res => {
         responseData = {
            id: res.data.body.id,
            productService: res.data.body.productService,
            creationDate: res.data.body.productService.creationDate,
            type: res.data.body.productService.type,
            images: res.data.body.productService.images.map(
               e => "data:image/jpeg;base64," + e
            ),
            promRating: res.data.body.promRating,
            salesQuantity: res.data.body.salesQuantity
         };
      })
      .catch(err => console.log(err));
   return responseData;
}
