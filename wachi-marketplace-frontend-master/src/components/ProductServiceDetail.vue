<template>
   <v-container>
      <div v-if="loadPage">
         <v-progress-linear indeterminate color="primary"></v-progress-linear>
         <p class="text-center text--disabled mt-3">
            Cargando datos... Por favor, espere
         </p>
      </div>
      <div v-else>
         <div class="row">
            <div class="col-md-6 col-sm-5 col-xs-12">
               <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
            </div>
         </div>
         <div class="row">
            <div class="col-md-6 col-sm-5 col-xs-12">
               <v-carousel show-arrows-on-hover center-active height="400">
                  <v-carousel-item
                     v-for="(item, i) in imageList"
                     :key="i"
                     :src="item"
                     contain
                     reverse-transition="fade-transition"
                     transition="fade-transition"
                  ></v-carousel-item>
               </v-carousel>
            </div>
            <div class="col-md-6 col-sm-7 col-xs-12">
               <div class="pl-6">
                  <v-card-actions class="pa-0 justify-center">
                     <h2 class="name-product-service mb-0">
                        {{ name }}
                     </h2>
                  </v-card-actions>
                  <div class="pt-3" v-if="stock === outOfStock">
                     <v-alert
                        border="top"
                        colored-border
                        type="info"
                        elevation="2"
                     >
                        En este momento este artículo se encuentra sin stock
                        para la venta.
                     </v-alert>
                  </div>
                  <div v-else>
                     <v-card-actions class="pa-0 justify-center">
                        <p class="value-price pt-3">
                           S/ {{ price.toFixed(2) }}
                        </p>
                     </v-card-actions>
                     <v-card-actions class="pa-0 pb-2 justify-center">
                        <v-rating
                           v-model="promRating"
                           half-increments
                           dense
                           color="amber"
                           background-color="amber"
                           readonly
                           size="40"
                        ></v-rating>
                        <h3 class="value-rating ml-2">
                           {{ promRating }}
                        </h3>
                     </v-card-actions>
                     <v-card-actions class="pa-0 pb-2 justify-center mb-3">
                        <span class="body-2 mr-5">
                           {{ ratingsQuantity }} calificaciones</span
                        >
                        <span class="body-2">
                           {{ salesQuantity }} vendidos</span
                        >
                     </v-card-actions>
                     <v-divider></v-divider>
                     <div v-if="type === 'P'">
                        <v-card-actions class="justify-center mt-2">
                           <p class="subtitle-1 mb-1">
                              Stock disponible: {{ stock }}
                           </p>
                        </v-card-actions>
                        <v-card-actions class="justify-center">
                           <h4 class="mr-3">Cantidad:</h4>
                           <number-input
                              v-model="count"
                              size="small"
                              :min="1"
                              :max="stock"
                              rounded
                              inline
                              center
                              controls
                           ></number-input>
                        </v-card-actions>
                     </div>
                     <v-card-actions class="justify-center">
                        <v-btn
                           :style="{
                              backgroundColor:
                                 generalConfig.mainColor + ' !important',
                              color: 'white !important'
                           }"
                           class="mt-3"
                           outlined
                           tile
                           dense
                           color="#1867C0"
                           @click="toBuy()"
                           ><v-icon class="mr-2">mdi-cart</v-icon> AÑADIR</v-btn
                        >
                     </v-card-actions>
                  </div>
               </div>
            </div>
         </div>
         <div class="row">
            <div class="col-sm-12 col-xs-12 col-md-12">
               <v-tabs>
                  <v-tab>Descripción</v-tab>
                  <v-tab>Valoraciones</v-tab>
                  <v-tab-item>
                     <p class="pt-10 subtitle-1 font-weight-normal">
                        {{ description }}
                     </p>
                  </v-tab-item>
                  <v-tab-item>
                     <ProductServiceRating
                        :items="ratings"
                     ></ProductServiceRating>
                  </v-tab-item>
               </v-tabs>
            </div>
         </div>
      </div>

      <!-- Add to Cart -->
      <ToCart
         :idUser="id"
         :id="idParent"
         :name="name"
         :image="imageList[0]"
         :stock="stock"
         :price="price"
         :type="type"
         @back="getQuantity(id)"
      ></ToCart>

      <!-- Login Modal -->
      <!-- <LoginModal view="detail" :params="params"></LoginModal> -->
   </v-container>
</template>

<style scoped src="../styles/ProductServiceDetail.css"></style>

<script>
// import LoginModal from "../components/LoginModal";
import ToCart from "../components/ToCart";
import ProductServiceRating from "@/components/ProductServiceRating.vue";
import * as productRegisterDA from "../dataAccess/productRegisterDA";
import * as productServiceDetailDA from "../dataAccess/productServiceDetailDA";
import { bus } from "../main";
import { mapActions, mapState, mapGetters } from "vuex";
import * as listProductDA from "../dataAccess/listProductDA";
export default {
   name: "ProductServiceDetail",
   props: ["idParent"],
   components: {
      ProductServiceRating,
      ToCart
      // LoginModal
   },

   data: () => ({
      loadPage: false,
      loadingCart: false,
      showAddToCart: false,
      rating: 4.5,
      name: "",
      type: "",
      stock: null,
      description: "",
      price: null,
      salesQuantity: null,
      promRating: null,
      ratingsQuantity: null,
      imageList: [],
      categoryNameSelected: "",
      breadcrums: [
         {
            text: "Inicio",
            disabled: false,
            href: "/home"
         },
         {
            text: "Ropa",
            disabled: false,
            href: "breadcrumbs_clothing"
         }
      ],
      item: 5,
      ratings: [],
      outOfStock: 0,
      count: 1,
      isLogged: false,
      params: "",
      id: null
   }),
   watch: {
      "$route.params.pid": function() {
         window.location.assign(window.location.href);
         this.doStuff(this.idParent);
      }
   },
   created() {
      this.doStuff(this.idParent);
      this.isLogged = this.getUser().session.authenticated;
      // console.log("Autenti", this.getUser().session.authenticated);

      this.params = this.$route.params.pid;
      // console.log("params actual", this.params);
      // this.getQuantity(12);
   },
   mounted() {
      this.doStuff(this.idParent);
      if (this.isLogged) {
         this.getQuantity(this.getUser().data.id);
         this.id = this.getUser().data.id;
      }
   },
   methods: {
      ...mapActions(["getCart"]),
      ...mapGetters("user", ["getUser"]),
      setCount(val) {
         this.value = val;
      },
      doStuff(id) {
         if (id !== -1) {
            this.loadPage = true;
            productRegisterDA.getItemById(id).then(response => {
               if (response !== {}) {
                  this.type = response.body.productService.type;
                  if (response.body.productService.type === "P") {
                     this.addOption = "product";
                     this.stock = response.body.productService.stock;
                  } else {
                     this.addOption = "service";
                     this.stock = response.body.productService.stock;
                  }
                  this.name = response.body.productService.name;
                  this.categorySelected =
                     response.body.productService.category.id;
                  this.categoryNameSelected =
                     response.body.productService.category.name;
                  this.price = response.body.productService.price;
                  this.imageList = response.body.productService.images.map(
                     function(img) {
                        return "data:image/jpeg;base64," + img;
                     }
                  );
                  this.description = response.body.productService.description;
                  this.salesQuantity = response.body.salesQuantity;
                  this.promRating = response.body.promRating;
                  this.ratingsQuantity = response.body.ratingsQuantity;
                  console.log("lista de imagenes:", this.imageList);
                  this.breadcrums[1].text =
                     response.body.productService.category.name;

                  /*console.log(
                     "Vista Detalle con usuario",
                     this.getUser().data.id
                  );*/
                  let nameAux = "ListProduct";
                  if (this.getUser().session.authenticated) {
                     nameAux = "ListProduct-loggued";
                  }

                  this.breadcrums[1].to = {
                     name: nameAux,
                     params: {
                        categorySelected: response.body.productService.category
                     }
                  };
                  /*let nameAux = "ListProduct";
                  if (this.idUser !== 0) {
                     nameAux = "ListProduct-loggued";
                  }
                  this.breadcrums[1].to = {
                     name: nameAux,
                     params: {
                        categorySelected: response.body.productService.category,
                     },
                  };*/
               }

               productServiceDetailDA.getRatingsByPublication(id).then(res => {
                  this.ratings = res;
                  console.log("RATING");
               });

               this.loadPage = false;
               this.$emit("setLoadPage", false);
            });
         }
      },
      toBuy() {
         if (this.isLogged) {
            bus.$emit("previousCount", this.count);
            bus.$emit("dialog", true);
            if (this.type == "S") {
               console.log("soy un servicioooooo");
               listProductDA
                  .isInCart(this.getUser().data.id, this.idParent)
                  .then(res => {
                     if (res != null) {
                        let itemQuantity = res.quantity;
                        // console.log("--- Quantity in cart ", itemQuantity);
                        if (itemQuantity === 0) {
                           listProductDA
                              .addToCart(
                                 this.getUser().data.id,
                                 this.idParent,
                                 1
                              )
                              .then(() => {})
                              .catch(err => console.log(err));
                        } else if (itemQuantity > 0) {
                           listProductDA
                              .updateCart(
                                 this.getUser().data.id,
                                 this.idParent,
                                 1
                              )
                              .then(() => {})
                              .catch(err => console.log(err));
                        }
                     } else {
                        listProductDA
                           .addToCart(this.getUser().data.id, this.idParent, 1)
                           .then(() => {})
                           .catch(err => console.log(err));
                     }
                  });
            }
         } else {
            console.log("NO LOGGED");
            bus.$emit("loginModal", {
               view: "detail",
               params: this.params,
               show: true
            });
         }
      },
      getQuantity(id) {
         this.getCart(id).then(() => {
            let cartItem = this.cart.cart.find(
               item => item.id == this.$route.params.pid
            );
            this.count = cartItem ? cartItem.quantity : 1;
         });
      }
   },
   computed: {
      ...mapState(["cart", "idUser", "generalConfig"])
   }
};
</script>
