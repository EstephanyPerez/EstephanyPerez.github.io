<template>
   <v-container>
      <v-dialog v-model="showModal" persistent max-width="500">
         <div class="text-center" v-if="loadingCart">
            <v-card color="primary" dark>
               <v-card-text>
                  Por favor, espere
                  <v-progress-linear
                     indeterminate
                     color="white"
                     class="mb-0"
                  ></v-progress-linear>
               </v-card-text>
            </v-card>
         </div>
         <div v-else>
            <v-card>
               <v-alert text type="success" icon="mdi-check-circle">
                  El producto/servicio se agregó a tu carrito de compras.
               </v-alert>
               <v-container>
                  <v-row align="center" justify="center">
                     <v-col
                        cols="12"
                        sm="4"
                        align-self="center"
                        class="py-0 px-auto d-flex justify-center"
                     >
                        <v-img
                           class="white--text"
                           width="150px"
                           height="150px"
                           :src="image"
                           contain
                        ></v-img>
                     </v-col>
                     <v-col cols="12" sm="6">
                        <v-card-title class="">
                           {{ name }}
                        </v-card-title>
                        <v-row
                           v-if="type === 'P'"
                           justify="center"
                           class="py-0 px-7"
                        >
                           <v-col class="pa-0" cols="5" align-self="center">
                              <p class="ma-auto">Cantidad:</p>
                           </v-col>
                           <v-col class="pa-0" cols="7" align-self="center">
                              <div class="pa-auto d-flex justify-center">
                                 <number-input
                                    class="ma-auto"
                                    v-model="count"
                                    size="small"
                                    :min="1"
                                    :max="stock"
                                    rounded
                                    inline
                                    center
                                    controls
                                    @change="updateCount(id, count)"
                                 ></number-input>
                              </div>
                           </v-col>
                        </v-row>
                        <v-row justify="center" class="py-0 px-7">
                           <v-col class="pa-0" cols="5" align-self="center">
                              <p class="ma-auto">Total:</p>
                           </v-col>
                           <v-col class="pa-0" cols="7" align-self="center">
                              <p class="ma-auto font-weight-bold text-center">
                                 S/
                                 {{ (count * price).toFixed(2) }}
                              </p>
                           </v-col>
                        </v-row>
                     </v-col>
                  </v-row>
               </v-container>
               <v-divider></v-divider>
               <v-container>
                  <v-row class="pa-0" align="center" justify="center">
                     <v-col
                        class="py-0 px-auto d-flex justify-center"
                        cols="12"
                        sm="6"
                        align-self="center"
                     >
                        <v-btn color="primary" text @click="back()">
                           <v-icon class="mr-2">mdi-undo</v-icon>
                           Ver más productos
                        </v-btn>
                     </v-col>
                     <v-spacer></v-spacer>
                     <v-col
                        class="py-0 px-auto d-flex justify-center"
                        cols="12"
                        sm="6"
                        align-self="center"
                     >
                        <v-btn color="green darken-1" text @click="goToCart()">
                           <v-icon class="mr-2">mdi-cart-outline</v-icon>
                           Ir a mi carrito
                        </v-btn>
                     </v-col>
                  </v-row>
               </v-container>
            </v-card>
         </div>
      </v-dialog>
   </v-container>
</template>

<script>
import { bus } from "../main";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
   name: "ToCart",
   props: ["idUser", "id", "name", "image", "stock", "price", "show", "type"],
   data: () => ({
      previousCount: false,
      count: 1,
      loadingCart: false,
      showModal: false
   }),
   created() {
      bus.$on("previousCount", val => {
         this.previousCount = val;
      });
      bus.$on("dialog", val => {
         if (this.type == "P") {
            if (!this.previousCount) {
               let cartItem = this.cart.cart.find(item => item.id === this.id);
               this.count = cartItem ? cartItem.quantity : 1;
            } else {
               this.count = this.previousCount;
            }
         }
         this.showModal = val;
      });
   },
   watch: {
      count: function() {
         this.loadingCart = true;
         this.sleep(500).then(() => {
            this.loadingCart = false;
         });
      }
   },
   methods: {
      ...mapActions(["updateProductToCart"]),
      ...mapGetters("user", ["getUser"]),
      back() {
         this.$emit("back");
         this.showModal = false;
      },
      updateCount(idx, val) {
         console.log("modal carrito: ", idx, val);
         this.updateProductToCart({
            idUser: this.getUser().data.id,
            idItem: idx,
            count: val
         });
      },
      goToCart() {
         console.log("HERE");
         this.loadingCart = true;
         this.sleep(700).then(() => {
            this.loadingCart = false;
            this.showModal = false;
            this.$router.push({
               name: "shoppingCart",
               params: { userid: btoa("user=" + this.getUser().data.id) }
            });
         });
      },
      sleep(time) {
         return new Promise(resolve => setTimeout(resolve, time));
      }
   },
   computed: {
      ...mapState(["cart"])
   }
};
</script>
