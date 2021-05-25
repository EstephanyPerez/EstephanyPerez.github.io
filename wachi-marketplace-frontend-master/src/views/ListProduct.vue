<template>
   <v-container>
      <v-row class="mb-10">
         <v-col md="3" sm="3" cols="12">
            <v-card>
               <v-card-title>Categorías</v-card-title>
               <v-divider></v-divider>
               <v-container class="pt-0" fluid>
                  <v-flex v-for="category in limCat" :key="category.id" xs12>
                     <v-checkbox
                        hide-details
                        dense
                        :label="category.name"
                        :value="category.id"
                        v-model="selectedCategories"
                     >
                     </v-checkbox>
                  </v-flex>
                  <br />
                  <a
                     href="javascript:void(0)"
                     class="mt-1"
                     @click="showMoreCats()"
                  >
                     {{ !showMore ? "Mostrar más" : "Ocultar" }}
                  </a>
               </v-container>
               <v-divider></v-divider>
               <v-card-title>Precio</v-card-title>
               <v-divider></v-divider>
               <v-row class="pa-2" dense>
                  <v-col cols="12" sm="5">
                     <v-text-field
                        :value="minPriceAux"
                        v-model="minPriceAux"
                        label="S/ Minimo"
                        type="number"
                        outlined
                        dense
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2">
                     <p class="pt-2 text-center">-</p>
                  </v-col>
                  <v-col cols="12" sm="5">
                     <v-text-field
                        :value="maxPriceAux"
                        v-model="maxPriceAux"
                        label="S/ Máximo"
                        type="number"
                        outlined
                        dense
                     ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="button-row">
                     <v-btn
                        :style="{
                           backgroundColor:
                              generalConfig.mainColor + ' !important',
                           color: 'white !important'
                        }"
                        class="continue-button"
                        @click="filterProdServ()"
                     >
                        Filtrar
                     </v-btn>
                  </v-col>
               </v-row>
            </v-card>
         </v-col>
         <v-col md="9" sm="9" cols="12">
            <v-card>
               <v-row>
                  <v-col cols="12" md="6" sm="12">
                     <v-card-title class="pr-0 ml-1">
                        Lista de productos y servicios
                     </v-card-title>
                  </v-col>
                  <v-col cols="12" md="6" sm="12">
                     <v-text-field
                        v-model="searchAux"
                        append-icon="mdi-magnify"
                        label="Buscar producto o servicio"
                        single-line
                        hide-details
                        color="indigo darken-4"
                        class="mt-0 mr-6 ml-4"
                        v-on:keyup.enter="searchProductService()"
                     ></v-text-field>
                  </v-col>
               </v-row>
               <v-row>
                  <v-col cols="12" md="12" sm="12">
                     <v-layout wrap class="pr-1 pl-1 mr-2 ml-2">
                        <v-card-text v-if="loadingProducts" class="ma-auto">
                           <v-progress-linear
                              indeterminate
                              color="primary"
                           ></v-progress-linear>
                           <p class="text-center text--disabled mt-3">
                              Cargando datos... Por favor, espere
                           </p>
                        </v-card-text>
                        <v-flex
                           v-else
                           class="pr-2 pl-2"
                           xs12
                           sm6
                           md4
                           v-for="productItem in productList"
                           :key="productItem.id"
                        >
                           <ProductItems
                              :productItem="productItem"
                              :isItemCart="isItemCart(productItem.id)"
                              @addToCart="toBuy"
                           />
                        </v-flex>
                     </v-layout>
                  </v-col>
               </v-row>
               <v-row class="justify-center">
                  <v-pagination
                     v-model="page"
                     :length="totalPages"
                     :total-visible="maxVisiblePages"
                  ></v-pagination>
               </v-row>
            </v-card>
         </v-col>
      </v-row>

      <!-- Add to Cart -->
      <ToCart
         :idUser="id"
         :id="itemToCart.id"
         :name="itemToCart.name"
         :image="itemToCart.imgURL"
         :stock="itemToCart.stock"
         :price="itemToCart.price"
         :type="itemToCart.type"
      ></ToCart>

      <!-- Login Modal -->
      <!-- <LoginModal view="list"></LoginModal> -->
   </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
// import LoginModal from "../components/LoginModal";
import * as productRegisterDA from "../dataAccess/productRegisterDA";
import * as listProductDA from "../dataAccess/listProductDA";
import ProductItems from "../components/CardProduct";
import ToCart from "../components/ToCart";
import { bus } from "../main";

export default {
   name: "ListProduct",
   data: () => ({
      limCat: [],
      limit_by: 7,
      showMore: false,
      categories: [],
      selectedCategories: [],
      minPrice: 0,
      maxPrice: 10000,
      minPriceAux: 0,
      maxPriceAux: 10000,
      search: "",
      searchAux: "",
      loadingProducts: false,
      productList: [],
      page: 1,
      totalPages: 0,
      maxVisiblePages: 9, // <- no sirve
      itemToCart: {
         id: -1,
         name: "",
         imgURL: "",
         stock: 0,
         price: 0,
         type: ""
      },
      isLogged: false,
      dataUser: {
         id: ""
      },
      id: null
   }),
   components: {
      ProductItems,
      ToCart
      // LoginModal
   },
   created() {
      //this.retrieveCategories();
      //this.retrieveProducts();
      this.isLogged = this.getUser().session.authenticated;

      if (this.isLogged) {
         this.getCart(this.getUser().data.id);
         console.log("ID DEL USARIO LOGIN", this.getUser().data.id);
      }
   },
   mounted() {
      if (this.isLogged) {
         console.log(
            "vista de producto y soy el usuario:",
            this.getUser().data.id
         );

         this.id = this.getUser().data.id;
         this.dataUser.id = this.getUser().data.id;
      }

      //this.retrieveCategories();
      //this.retrieveProducts();
      if (this.isLogged) this.getCart(this.getUser().data.id);
      //anterior
      productRegisterDA.getAllCategories("P").then(responseData => {
         productRegisterDA.getAllCategories("S").then(responseData2 => {
            this.categories = [...responseData, ...responseData2];
            this.limCat = [...responseData, ...responseData2].slice(
               0,
               this.limit_by
            );
            try {
               this.selectedCategories = [
                  this.$route.params.categorySelected.id
               ];
               let aux = this.categories;
               let index = aux
                  .map(e => e.id)
                  .indexOf(this.selectedCategories[0]);
               let gone = aux.splice(index, 1);
               aux = gone.concat(aux);
               this.categories = aux;
               this.limCat = aux.slice(0, this.limit_by);
               this.filterProdServ();
            } catch (error) {
               try {
                  this.search = this.$route.params.search;
                  this.searchAux = this.$route.params.search;
                  this.searchProductService();
               } catch (error) {
                  this.retrieveAllItems();
                  /*console.log(
                     "vista de producto y soy el usuario:",
                     this.getUser().data.id
                  );*/
               }
            }
         });
      });
   },
   watch: {
      "$route.params": function() {
         window.location.assign(window.location.href);
      },
      page: function(newVal) {
         this.visiblePages2(newVal);
      }
   },
   methods: {
      ...mapActions(["getCart", "updateProductToCart"]),
      ...mapGetters("user", ["getUser"]),
      retrieveProducts() {
         this.loadingProducts = true;
         let dataBody = {};
         if (this.isLogged) dataBody["userId"] = this.getUser().data.id;
         else dataBody["userId"] = -1;
         dataBody["token"] = process.env.VUE_APP_API_KEY_COMMUNITY;
         listProductDA.getPublicationsByPage(0, dataBody).then(res => {
            this.productList = res.data;
            this.totalPages = res.totalPages;
            this.loadingProducts = false;
         });
      },
      retrieveCategories() {
         productRegisterDA.getAllCategories("P").then(responseData => {
            productRegisterDA.getAllCategories("S").then(responseData2 => {
               this.categories = [...responseData, ...responseData2];
               this.limCat = [...responseData, ...responseData2].slice(
                  0,
                  this.limit_by
               );
            });
         });
      },
      showMoreCats() {
         this.showMore = !this.showMore;
         if (this.showMore) {
            this.limCat = this.categories.slice(0, this.categories.length);
         } else {
            this.limCat = this.categories.slice(0, this.limit_by);
         }
      },
      filterProdServ() {
         this.loadingProducts = true;
         this.page = 1;
         let dataBody = {};
         this.minPrice = this.minPriceAux;
         this.maxPrice = this.maxPriceAux;
         if (this.isLogged) dataBody["userId"] = this.getUser().data.id;
         else dataBody["userId"] = -1;
         dataBody["token"] = process.env.VUE_APP_API_KEY_COMMUNITY;
         dataBody["minPrice"] = parseFloat(this.minPrice);
         dataBody["maxPrice"] = parseFloat(this.maxPrice);
         if (this.categories.length !== 0) {
            dataBody["categories"] = this.selectedCategories;
         }
         this.searchAux = "";
         this.search = "";
         listProductDA
            .getPublicationsByPage(this.page - 1, dataBody)
            .then(res => {
               this.productList = res.data;
               this.totalPages = res.totalPages;
               this.loadingProducts = false;
            });
      },
      searchProductService() {
         this.loadingProducts = true;
         this.page = 1;
         let dataBody = {};
         dataBody["token"] = process.env.VUE_APP_API_KEY_COMMUNITY;
         dataBody["minPrice"] = parseFloat(this.minPrice);
         dataBody["maxPrice"] = parseFloat(this.maxPrice);
         if (this.isLogged) dataBody["userId"] = this.getUser().data.id;
         else dataBody["userId"] = -1;
         this.search = this.searchAux;
         dataBody["name"] = this.search;
         if (this.categories.length !== 0) {
            dataBody["categories"] = this.selectedCategories;
         }
         listProductDA
            .getPublicationsByPage(this.page - 1, dataBody)
            .then(res => {
               this.productList = res.data;
               this.totalPages = res.totalPages;
               this.loadingProducts = false;
            });
      },
      isItemCart(idItem) {
         if (this.isLogged) {
            let idx = this.cart.cart.map(e => e.id).indexOf(idItem);
            return idx !== -1;
         } else {
            return false;
         }
      },
      toBuy(item) {
         if (this.isLogged) {
            this.itemToCart = item;
            bus.$emit("dialog", true);

            if (this.itemToCart.type == "S") {
               listProductDA
                  .isInCart(this.getUser().data.id, this.itemToCart.id)
                  .then(res => {
                     if (res != null) {
                        let itemQuantity = res.quantity;
                        if (itemQuantity === 0) {
                           listProductDA
                              .addToCart(
                                 this.getUser().data.id,
                                 this.itemToCart.id,
                                 1
                              )
                              .then(() => {})
                              .catch(err => console.log(err));
                        } else if (itemQuantity > 0) {
                           listProductDA
                              .updateCart(
                                 this.getUser().data.id,
                                 this.itemToCart.id,
                                 1
                              )
                              .then(() => {})
                              .catch(err => console.log(err));
                        }
                     } else {
                        listProductDA
                           .addToCart(
                              this.getUser().data.id,
                              this.itemToCart.id,
                              1
                           )
                           .then(() => {})
                           .catch(err => console.log(err));
                     }
                  });
            }
         } else {
            console.log("NO LOGGED");
            bus.$emit("loginModal", { view: "list", params: "", show: true });
         }
      },
      visiblePages2(newVal) {
         this.loadingProducts = true;
         let dataBody = {};
         dataBody["token"] = process.env.VUE_APP_API_KEY_COMMUNITY;
         dataBody["minPrice"] = parseFloat(this.minPrice);
         dataBody["maxPrice"] = parseFloat(this.maxPrice);
         if (this.isLogged) dataBody["userId"] = this.getUser().data.id;
         else dataBody["userId"] = -1;
         if (this.search !== "") {
            dataBody["name"] = this.search;
         }
         if (this.categories.length !== 0) {
            dataBody["categories"] = this.selectedCategories;
         }
         listProductDA.getPublicationsByPage(newVal - 1, dataBody).then(res => {
            this.productList = res.data;
            this.totalPages = res.totalPages;
            this.loadingProducts = false;
         });
      }
   },
   computed: {
      ...mapState(["cart", "idUser", "user", "generalConfig"])
   }
};
</script>

<style scoped src="../styles/ProductRegistration.css"></style>
