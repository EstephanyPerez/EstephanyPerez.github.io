<template>
   <div>
      <v-container>
         <div class="row">
            <div class="col-md-9 col-sm-9 col-xs-12">
               <v-card>
                  <v-card-title>Mi carrito</v-card-title>
                  <v-row>
                     <v-layout
                        row
                        justify-space-between
                        class="pr-2 pl-2 mr-2 ml-2"
                     >
                        <v-card-text v-if="loadingCart" class="ma-auto">
                           <v-progress-linear
                              indeterminate
                              color="primary"
                           ></v-progress-linear>
                           <p class="text-center text--disabled mt-3">
                              Cargando carrito... Por favor, espere
                           </p>
                        </v-card-text>
                        <v-container v-if="productList.length !== 0">
                           <v-alert
                              type="error"
                              v-model="alert"
                              dismissible
                              v-if="showError"
                              >Debe eliminar del carrito de compras aquellos
                              productos/servicios que se encuentren agotados
                              para continuar con el pago.</v-alert
                           >
                           <v-col
                              cols="12"
                              sm="12"
                              md="12"
                              xs="12"
                              lg="12"
                              xl="12"
                              v-for="productItem in productList"
                              :key="productItem.id"
                           >
                              <ShoppingCartItem
                                 @updateCart="updateCart"
                                 @deleteFromCart="deleteFromCart"
                                 :productItem="productItem"
                                 :userid="userid"
                              ></ShoppingCartItem>
                           </v-col>
                        </v-container>
                        <v-container v-else-if="loadingCart == false">
                           <v-card-title class="justify-center">
                              <v-img
                                 src="https://thumbs.dreamstime.com/b/isolated-empty-shopping-cart-8982127.jpg"
                                 max-width="200px"
                              ></v-img>
                           </v-card-title>

                           <v-card-title class="justify-center">
                              Tu carrito de compras está vacío
                           </v-card-title>

                           <v-card-actions class="justify-center">
                              <v-btn
                                 :style="{
                                    backgroundColor:
                                       generalConfig.mainColor + ' !important',
                                    color: 'white !important'
                                 }"
                                 @click="goToHome()"
                              >
                                 ¡Empieza a comprar ahora!
                              </v-btn>
                           </v-card-actions>
                        </v-container>
                     </v-layout>
                  </v-row>
               </v-card>
            </div>
            <div class="col-md-3 col-sm-9 col-xs-12 pb-5 mb-5">
               <v-card>
                  <v-card-title class="resumen">Resumen</v-card-title>

                  <v-row>
                     <v-col sm="6" md="6" class="subtotalCol1">
                        <v-card-text class="subtotal">
                           Precio original
                        </v-card-text>
                     </v-col>
                     <v-col sm="6" md="6" class="subtotalCol2">
                        <v-card-text align="right" class="subtotal">
                           S/ {{ this.total.toFixed(2) }}
                        </v-card-text>
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col class="items">
                        <v-card-text class="subtotal">
                           ({{ itemsCount }} items)
                        </v-card-text>
                     </v-col>
                  </v-row>

                  <v-divider></v-divider>
                  <v-row>
                     <v-col sm="6" md="6" class="subtotalCol1">
                        <v-card-text align="left" class="total">
                           TOTAL
                        </v-card-text>
                     </v-col>
                     <v-col sm="6" md="6" class="subtotalCol2">
                        <v-card-text align="right" class="total">
                           S/ {{ this.total.toFixed(2) }}
                        </v-card-text>
                     </v-col>
                  </v-row>
                  <v-card-actions class="justify-center">
                     <v-btn
                        :style="{
                           backgroundColor:
                              generalConfig.mainColor + ' !important',
                           color: 'white'
                        }"
                        class="mt-3 center"
                        tile
                        dense
                        @click="buyAllItems()"
                        :disabled="productList.length === 0"
                        ><img src="../assets/buyIcon.svg" class="buyIcon" />
                        Comprar</v-btn
                     >
                  </v-card-actions>
               </v-card>
            </div>
         </div>
      </v-container>
   </div>
</template>
<style scoped src="../styles/ShoppingCart.css"></style>
<script>
import ShoppingCartItem from "@/components/ShoppingCartItem.vue";
import * as listProductDA from "../dataAccess/listProductDA";
import { mapGetters, mapState } from "vuex";
export default {
   name: "ShoppingCart",
   components: {
      ShoppingCartItem
   },
   data() {
      return {
         productList: [],
         purchaseDetail: [],
         total: 0.0,
         userid: 0,
         itemsCount: 0,
         outOfStock: 0,
         showError: false,
         toBuy: false,
         alert: false,
         loadingCart: true
      };
   },
   created() {
      try {
         let urlParams = "?" + atob(this.$route.params.userid);
         let regex = /[?&]([^=#]+)=([^&#]*)/g;
         let objParams = {};
         let match;
         while((match = regex.exec(urlParams))) {
            objParams[match[1]] = match[2];
         }

         this.userid = objParams.user;
      } catch (error) {
         console.log("Error Decode: ", error);
      } finally {
         if(this.userid != this.getUser().data.id) {
            this.$router.push("/myShoppingCart/" + btoa("user=" + this.getUser().data.id));
         }
      }
   },
   watch: {
      "$route.params": function () {
         this.$router.go(0);
      },
      productList: function() {
         this.loadingCart = true;
         this.updateItemsCount(this.productList);
         this.loadingCart = false;
      }
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      retrieveAllItems() {
         listProductDA.getCart(this.userid).then(res => {
            this.productList = res[0];
            this.total = 0;
            res[0]
               .filter(e => e.stock > this.outOfStock)
               .forEach(element => {
                  this.total = this.total + element.price * element.quantity;
               });
            //this.total = res[1];
            /* console.log(this.productList);
            console.log(this.userid); */
            this.checkStatusAndStock(res[0]);
            if (!this.showError) {
               if (this.toBuy) {
                  console.log("a comprar ");
                  this.toBuy = false;
                  this.$router.push({
                     name: "Payment",
                     params: {
                        userid: this.userid
                     }
                  });
                  /*purchaseDA.buyShoppingCart(this.userid).then((res) => {
                     this.toBuy = false;
                     this.purchaseDetail = res;
                     console.log(
                        "soy el id de la compra realizada",
                        this.purchaseDetail.id
                     );
                     console.log("compra efectuada");
                     this.$router.push({
                        name: "Payment",
                        params: {
                           userid: this.userid
                        }
                     });
                  });
                  /* console.log(this.productList);
                  console.log(this.userid); */
               }
            } else {
               this.toBuy = false;
            }
         });
      },
      updateCart(count) {
         console.log("me voy a ", count);
         this.retrieveAllItems();
      },
      deleteFromCart(userid) {
         console.log("fusilar", userid);
         this.retrieveAllItems();
      },
      buyAllItems() {
         console.log("aprete el boton");
         this.toBuy = true;
         // Aquí va una lógica para mostrar el msj genérico
         // ACTUALIZACIÓN: Se van a la toronja
         this.retrieveAllItems();
         //location.reload();
         /*this.$router.push({
            name: "Payment",
            params: {
               userid: this.userid
            }
         });
         purchaseDA.buyShoppingCart(this.userid).then(res => {
            if (res === null){
               location.reload();
            }
            this.purchaseDetail = res;
            console.log(
               "soy el id de la compra realizada",
               this.purchaseDetail.id
            );
            console.log("compra efectuada");
         });*/

         /* console.log(this.productList);
            console.log(this.userid); */
      },
      updateItemsCount(itemsList) {
         let count = 0;
         itemsList
            .filter(e => e.stock > this.outOfStock)
            .forEach(element => {
               count = count + element.quantity;
               console.log("items count", element.quantity, count);
            });
         this.itemsCount = count;
         console.log(this.itemsCount);
      },
      checkStatusAndStock(productList) {
         let showError = false;
         let arr = productList.filter(e => e.status === 1);
         showError = productList.length !== arr.length;
         if (showError) {
            this.showError = showError;
            this.alert = showError;
         } else {
            arr = productList.filter(e => e.stock > this.outOfStock);
            showError = productList.length !== arr.length;
            if (showError) {
               this.showError = showError;
               this.alert = showError;
            } else {
               arr = productList.filter(e => e.stock >= e.quantity);
               showError = productList.length !== arr.length;
               this.showError = showError;
               this.alert = showError;
            }
         }
      },
      goToHome() {
         this.$router.push({
            name: "home"
         });
      }
   },
   mounted() {
      this.retrieveAllItems();
   },
   computed: {
      ...mapState(["generalConfig"])
   }
};
</script>
