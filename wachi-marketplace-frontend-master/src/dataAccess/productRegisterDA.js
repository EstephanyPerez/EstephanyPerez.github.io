import axios from "axios";
import { API } from "./API";
const url = "";
export async function registerProduct(
   name,
   description,
   category,
   price,
   stock,
   userId,
   imageList
) {
   var respondeData = {};
   let body = {
      name: name,
      description: description,
      idCategory: category,
      price: price,
      stock: stock,
      type: "producto",
      status: "",
      userId: userId,
      images: imageList
   };
   axios.defaults.headers.post["Content-Type"] = "application/json";
   axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
   await axios
      .post(url + "/api/publications/create", body)
      .then(response => {
         console.log(response);
         respondeData = response.data;
      })
      .catch(error => {
         console.log(error);
      });
   return respondeData;
}
export async function getAllCategories(type) {
   var respondeData = [];
   await API.get("/api/publication/category/findAll?type=" + type)
      .then(response => {
         //console.log(response.data.body);
         respondeData = response.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return respondeData;
}

export async function getAllCategoriesWithImg() {
   var respondeData = [];
   await API.get("/api/publication/category/findAllWithImages")
      .then(response => {
         //console.log(response.data.body);
         respondeData = response.data.body;
      })
      .catch(error => {
         console.log(error);
      });
   return respondeData;
}
export async function getItemById(id) {
   var respondeData = {};
   await API.get("/api/publication/findById?id=" + id)
      .then(response => {
         respondeData = response.data;
      })
      .catch(error => {
         console.log(error);
      });
   return respondeData;
}
export async function createOrEditProdServ(data, idUser) {
   var jsonBack = {};
   let typeAux = "P";
   let stockAux = data.parentStock;
   let idAux = null;
   let userIdAux = idUser;
   let idProdServAux = null;
   if (data.parentId !== -1) {
      idAux = data.parentId;
      idProdServAux = data.prodServId;
   }

   if (data.parentAddOption !== "product") {
      typeAux = "S";
      jsonBack = {
         communityToken: process.env.VUE_APP_API_KEY_COMMUNITY,
         id: idAux,
         userId: userIdAux, //como saco el userId xd
         productService: {
            id: idProdServAux,
            name: data.parentName,
            description: data.parentDescription,
            stock: data.stockService ? 1 : 0,
            price: parseFloat(data.parentPrice),
            category: {
               id: data.parentCategory
            },
            type: typeAux,
            images: data.parentImageList
         }
      };
   } else {
      jsonBack = {
         communityToken: process.env.VUE_APP_API_KEY_COMMUNITY,
         id: idAux,
         userId: userIdAux,
         productService: {
            id: idProdServAux,
            name: data.parentName,
            description: data.parentDescription,
            stock: parseInt(stockAux),
            price: parseFloat(data.parentPrice),
            category: {
               id: data.parentCategory
            },
            type: typeAux,
            images: data.parentImageList
         }
      };
   }
   console.log("Lo que se manda a back: ", jsonBack);
   //console.log("data: ", data);
   if (data.parentId !== -1) {
      //editar
      await API.post("/api/publication/edit", jsonBack)
         .then(response => {
            console.log(response.data);
         })
         .catch(error => {
            console.log(error);
         });
   } else {
      await API.post(
         "/api/publication/create",
         /*{
            params: { communityToken: process.env.VUE_APP_API_KEY_COMMUNITY }
         },*/
         jsonBack
      )
         .then(response => {
            console.log(response.data);
         })
         .catch(error => {
            console.log(error);
         });
   }
   return "Creado o modificado";
}
