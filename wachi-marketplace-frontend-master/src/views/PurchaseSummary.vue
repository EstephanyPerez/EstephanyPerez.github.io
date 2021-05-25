<template>
   <v-container class="pt-5 pb-5  mb-6">
      <div>
         <h1 class="alignCenter colorBlue">¡Gracias por tu compra!</h1>
         <h3 class="alignCenter">Tu solicitud de compra fue recibida</h3>
         <br />
         <p class="alignCenter">
            Tu pedido se encuentra en proceso de validación, en breve recibirás
            un correo con el detalle del proceso.
         </p>
         <p class="alignCenter">
            Si tienes alguna consulta, comunícate con nuestro Centro de Atención
            al cliente al correo electrónico wachi@gmail.com.
         </p>
         <h3 class="alignCenter colorBlue">¡Gracias por preferir Wachi!</h3>
         <br />
         <br />
         <div class="row alignRow">
            <h2 class="withoutBold">
               Pedido <strong>{{ purchaseSummary.code }}</strong>
            </h2>
         </div>
         <p class="alignCenter">
            Fecha de solicitud de compra:
            {{ purchaseSummary.date }}
         </p>
      </div>

      <v-row>
         <v-col md="6" cols="12" class="firstCol">
            <v-card :style="'border: 1px solid #1867C0;'">
               <v-row class="row alignRow withPaddingTop">
                  <img
                     src="../assets/payment-method-blue.svg"
                     width="38"
                     height="38"
                  />
                  <v-card-title class="withoutPaddingTop  "
                     >Medio de pago</v-card-title
                  >
               </v-row>
               <v-divider :style="'border: 1px solid #1867C0;'"></v-divider>
               <v-row class="row alignRow minHeight">
                  <v-card-text class="alignCenter payment-method-text"
                     >Tarjeta de crédito</v-card-text
                  >
                  <v-card-text class="alignCenter payment-method-text">{{
                     this.cardNumber
                  }}</v-card-text>
                  <v-card-text class="alignCenter payment-method-text"
                     >Importe: S/
                     {{ purchaseSummary.totalAmount.toFixed(2) }}</v-card-text
                  >
               </v-row>
            </v-card>
         </v-col>
         <v-col md="6" cols="12" class="secondCol">
            <v-card :style="'border: 1px solid #1867C0;'">
               <v-row class="row alignRow withPaddingTop">
                  <img
                     src="../assets/purchase-summary-blue.svg"
                     width="38"
                     height="38"
                  />
                  <v-card-title class="withoutPaddingTop">Resumen</v-card-title>
               </v-row>
               <v-divider :style="'border: 1px solid #1867C0;'"></v-divider>
               <v-row class="row alignRow minHeight ">
                  <v-card-text class="alignCenter subtotal payment-method-text"
                     >Items comprados:
                     {{ purchaseSummary.cantItems }}</v-card-text
                  >
                  <v-card-text class="alignCenter payment-method-text"
                     ><strong>
                        TOTAL S/
                        {{ purchaseSummary.totalAmount.toFixed(2) }}</strong
                     ></v-card-text
                  >
               </v-row>
            </v-card>
         </v-col>
      </v-row>
   </v-container>
</template>
<style scoped src="../styles/PurchaseSummary.css"></style>
<script>
import moment from "moment";
import * as purchaseDA from "../dataAccess/purchaseDA";
export default {
   name: "PurchaseSummary",
   data: () => ({
      currentDate: new Date(),
      formatedDate: "",
      purchaseid: null,
      purchaseSummary: {},
      cardNumber: ""
   }),
   watch: {
      "$route.params.purchaseid": function() {
         this.purchaseid = this.$route.params.purchaseid;
      }
   },
   created: function() {
      this.purchaseid = this.$route.params.purchaseid;
      var aux2 = this.$route.params.cardNumber.substring(
         this.$route.params.cardNumber.length - 3,
         this.$route.params.cardNumber.length
      );
      var aux1 = new Array(this.$route.params.cardNumber.length - 3).fill("*");
      this.cardNumber = aux1.join("").concat(aux2);
      console.log("pase a vista resumen con id:", this.purchaseid);
   },
   methods: {
      formatDate() {
         this.formatedDate = moment(this.currentDate).format("DD/MM/YYYY");
      },
      getPurchaseSummary() {
         purchaseDA.getPurchaseSummary(this.purchaseid).then(res => {
            console.log(res);
            this.purchaseSummary = res;
         });
      }
   },
   mounted() {
      this.formatDate();
      this.getPurchaseSummary();
   }
};
</script>
