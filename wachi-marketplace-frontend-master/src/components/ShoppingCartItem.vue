<template>
   <div>
      <v-card>
         <v-row class="resumen">
            <v-col offset-md="11" offset-sm="10" offset-xs="4" offset="9">
               <v-card-actions class="deleteIcon">
                  <v-icon color="red" @click="deleteItem()"
                     >mdi-close-circle</v-icon
                  >
               </v-card-actions>
            </v-col>
         </v-row>
         <v-row>
            <v-col sm="6" md="4">
               <v-img
                  class="card-image"
                  contain
                  height="180px"
                  :src="productItem.imgURL"
                  :aspect-ratio="16 / 9"
               ></v-img>
            </v-col>
            <v-col sm="6" md="8">
               <v-row>
                  <v-card-title class="productName">{{
                     productItem.name
                  }}</v-card-title>
                  <v-card-text>{{ productItem.description }}</v-card-text>
               </v-row>
               <v-row>
                  <v-col>
                     <v-card-text class="price"
                        >S/ {{ productItem.price.toFixed(2) }}</v-card-text
                     >
                  </v-col>
                  <v-col>
                     <div
                        v-if="
                           productItem.status === 1 &&
                              productItem.stock < productItem.quantity &&
                              productItem.stock !== outOfStock
                        "
                     >
                        <h3
                           style="
                              text-align: center;
                              color: white;
                              background-color: red;
                           "
                        >
                           Reducir cantidad
                        </h3>
                        <h3
                           style="
                              text-align: center;
                              color: white;
                              background-color: red;
                           "
                        >
                           Stock disponible: {{ productItem.stock }}
                        </h3>
                     </div>
                     <div v-if="productItem.status === 0">
                        <h3
                           style="
                              text-align: center;
                              color: white;
                              background-color: #ff5252;
                              margin-right: 10px;
                           "
                        >
                           Agotado
                        </h3>
                     </div>
                     <div
                        v-else-if="
                           productItem.status === 1 &&
                              productItem.stock === outOfStock
                        "
                     >
                        <h3
                           style="
                              text-align: center;
                              color: white;
                              background-color: red;
                              margin-right: 10px;
                           "
                        >
                           Agotado
                        </h3>
                     </div>
                     <div v-else>
                        <v-card-actions class="quantity">
                           <number-input
                              v-model="value"
                              size="small"
                              :min="1"
                              :max="stock"
                              rounded
                              inline
                              center
                              controls
                              @change="modifyItem(productItem, value)"
                           ></number-input>
                        </v-card-actions>
                     </div>
                  </v-col>
               </v-row>
            </v-col>
         </v-row>
         <v-row>
            <v-card-text class="seller"
               >Vendedor: {{ productItem.seller }}</v-card-text
            >
         </v-row>
      </v-card>
   </div>
</template>
<style scoped src="../styles/ShoppingCart.css"></style>
<script>
import Vue from "vue";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import * as listProductDA from "../dataAccess/listProductDA";
import { mapState, mapGetters } from "vuex";
Vue.component(VueNumberInput.name, VueNumberInput);

export default {
   name: "ShoppingCartItem",
   props: ["productItem", "userid"],
   data() {
      return {
         value:
            /*this.productItem.quantity <= this.productItem.stock
               ? this.productItem.quantity
               : this.productItem.stock,*/
            this.productItem.quantity,
         stock: 100,
         outOfStock: 0
      };
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      deleteItem() {
         console.log("antes de delete");

         listProductDA
            .deleteFromCart(this.getUser().data.id, this.productItem.id)
            .then(() => {
               console.log("en el then");
               this.$emit("deleteFromCart", this.getUser().data.id);
            });
      },
      modifyItem(item, count) {
         this.updateStock();
         console.log("update");
         console.log(item.id);
         listProductDA
            .updateCart(this.getUser().data.id, item.id, count)
            .then(() => {
               this.$emit("updateCart", this.value);
            });
         //console.log(this.value);
      },
      updateStock() {
         if (this.productItem.stock !== null) {
            this.stock = this.productItem.stock;
            console.log("producto");
         } else {
            this.stock = 1;
            console.log("servicio");
         }
      }
   },
   mounted() {
      this.updateStock();
   },
   computed: {
      ...mapState(["cart", "idUser"])
   }
};
</script>
