<template>
   <v-card class="mx-auto my-6" max-width="400">
      <div @click="viewDetail()" style="cursor: pointer">
         <template slot="progress">
            <v-progress-linear
               color="deep-purple"
               height="10"
               indeterminate
            ></v-progress-linear>
         </template>
         <v-img
            class="white--text align-end"
            contain
            height="180px"
            :src="productItem.imgURL"
            :aspect-ratio="16 / 9"
         >
            <div
               class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal"
               style="height: 100%"
               v-if="productItem.stock === outOfStock"
            >
               <v-btn class="" outlined>Agotado</v-btn>
            </div>
         </v-img>
         <v-card-title primary-title class="justify-center publication-title">{{
            productItem.name
         }}</v-card-title>

         <v-row align="center" class="mx-0">
            <v-card-text class="pt-0 pb-0">
               <v-card-actions class="pa-0 pb-2 justify-center">
                  <v-rating
                     :value="productItem.promRating"
                     color="amber"
                     background-color="amber"
                     dense
                     half-increments
                     readonly
                     size="20"
                  ></v-rating>

                  <h4 class="grey--text ml-2 mr-4" style="font-weight: normal">
                     {{ productItem.promRating }}
                  </h4>
               </v-card-actions>
            </v-card-text>
            <v-card-text align="center" class="pt-0 pb-1">
               {{ productItem.salesQuantity }} vendidos
            </v-card-text>
         </v-row>
      </div>
      <v-divider class="mx-4"></v-divider>
      <v-card-actions align="center">
         <div class="row">
            <div
               class="col-md-6 col-sm-12 col-xs-12 pt-0 pb-0"
               v-if="productItem.stock === outOfStock"
            >
               <h4 class="pr-0 pl-0 mt-4">Agotado</h4>
            </div>
            <div v-else class="col-md-6 col-sm-12 col-xs-12 pt-0 pb-0">
               <h4 class="pr-0 pl-0 mt-4">
                  S/ {{ productItem.price.toFixed(2) }}
               </h4>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12 pb-1">
               <v-badge
                  :value="isItemCart"
                  bordered
                  color="success"
                  icon="mdi-check"
                  overlap
               >
                  <v-btn
                     :style="{
                        backgroundColor:
                           generalConfig.mainColor + ' !important',
                        color: 'white !important'
                     }"
                     @click="buy"
                     :disabled="productItem.stock === outOfStock"
                  >
                     <v-icon color="white" class="justify-center" @click="buy"
                        >mdi-cart-outline</v-icon
                     >
                  </v-btn>
               </v-badge>
            </div>
         </div>
      </v-card-actions>
   </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
   name: "CardProduct",
   props: ["productItem", "isItemCart"],
   data() {
      return {
         outOfStock: 0
      };
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      buy() {
         this.$emit("addToCart", this.productItem);
      },
      viewDetail() {
         console.log("detalle del producto", this.productItem.id);
         console.log("autenti", this.getUser().session.authenticated);
         if (!this.getUser().session.authenticated) {
            this.$router.push({
               name: "ProductServicePrincipalDetail",
               params: {
                  pid: btoa("productId="+ this.productItem.id)
               }
            });
         } else {
            this.$router.push({
               name: "ProductServicePrincipalDetail-loggued",
               params: {
                  pid: btoa("productId="+ this.productItem.id)
               }
            });
         }
      }
   },
   computed: {
      ...mapState(["generalConfig"])
   }
};
</script>
<style scoped src="../styles/CardProduct.css"></style>
<style>
.v-card--reveal {
   align-items: center;
   bottom: 0;
   justify-content: center;
   opacity: 0.8;
   position: absolute;
   width: 100%;
}
</style>
