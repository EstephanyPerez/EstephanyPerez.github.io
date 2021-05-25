<template>
   <v-container>
      <v-card>
         <v-container>
            <v-form>
               <h3>Detalles del comprador</h3>
               <div>
                  <v-row>
                     <v-text-field
                        class="custom-label-color ml-3"
                        label="Correo electrónico"
                        required
                        v-model="email"
                     ></v-text-field>
                  </v-row>
               </div>
               <h3>Detalles de la tarjeta</h3>
               <div>
                  <v-row>
                     <v-text-field
                        class="custom-label-color ml-3"
                        label="Titular de la tarjeta"
                        required
                        v-model="card.cardholderName"
                     ></v-text-field>
                  </v-row>
                  <v-row>
                     <v-text-field
                        class="custom-label-color ml-3"
                        label="Fecha de vencimiento"
                        required
                        v-model="card.cardExpiration"
                        @input="automaticSlash"
                        hint="Formato: MM/YY"
                     ></v-text-field>
                  </v-row>
                  <v-row>
                     <v-text-field
                        class="custom-label-color ml-3"
                        label="N° de tarjeta"
                        required
                        v-model="card.cardNumber"
                     ></v-text-field>
                  </v-row>
                  <v-row>
                     <v-text-field
                        class="custom-label-color ml-3"
                        label="Código de seguridad"
                        required
                        v-model="card.securityCode"
                     ></v-text-field>
                  </v-row>
               </div>
               <div>
                  <v-btn class="primary" @click="pay()">
                     Pagar
                  </v-btn>
               </div>
            </v-form>
         </v-container>
      </v-card>
   </v-container>
</template>
<script>
import * as purchaseDA from "../dataAccess/purchaseDA";
import { mapState } from "vuex";

export default {
   name: "Payment",
   data: () => ({
      userid: null,
      purchaseDetail: [],
      card: {
         cardholderName: "",
         cardExpiration: "",
         cardNumber: "",
         securityCode: ""
      },
      pass: true,
      email: ""
   }),
   computed: {
      ...mapState(["cart", "idUser"])
   },
   /*watch: {
      "$route.params.purchaseid": function() {
         this.userid = this.$route.params.userid;
      }
   },*/
   created: function() {
      this.userid = this.$route.params.userid;
      console.log("pase a vista MercadoPago:", this.userid);
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      pay() {
         //alert("apreté el botón de pagar");
         console.log("apreté el botón de pagar");
         console.log("Soy el card", this.card);
         purchaseDA
            .buyShoppingCart(this.getUser().data.id)
            .then(res => {
               this.purchaseDetail = res;
               console.log(
                  "soy el id de la compra realizada",
                  this.purchaseDetail.id
               );
               console.log("compra efectuada");
               this.$router.push({
                  name: "PurchaseSummary",
                  params: {
                     purchaseid: this.purchaseDetail.id
                  }
               });
            })
            .catch(err => console.log(err));
      },
      automaticSlash() {
         if (this.card.cardExpiration.length === 2) {
            this.card.cardExpiration = this.card.cardExpiration + "/";
         }
      }
   }
};
</script>
