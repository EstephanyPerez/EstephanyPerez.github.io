<template>
   <v-container class="mb-10 pb-5">
      <div class="cabecera-payment d-flex justify-space-between">
         <!-- Logo wachi en casa -->
      </div>
      <div>
         <form ref="payForm" id="payForm">
            <v-row>
               <v-col cols="12" sm="12" md="9">
                  <v-card>
                     <!-- Inicio Bloque 1 -->
                     <div class="bloque-1">
                        <!-- Cabecera de Bloque 1 -->
                        <v-card-title>Datos de la tarjeta</v-card-title>
                        <!-- Fin cabecera de Bloque 1 -->

                        <!-- Cuerpo de Bloque 1 -->
                        <div class="px-5">
                           <v-row>
                              <!--Columna Titular de la Tarjeta -->
                              <v-col cols="12" sm="6" class="pb-0 mb-0">
                                 <label class="bloque-1__label">
                                    Titular de la Tarjeta:
                                 </label>
                                 <v-text-field
                                    type="text"
                                    data-checkout="cardholderName"
                                    v-model="card.cardholderName"
                                    :rules="[rules.ruleMarca]"
                                    dense
                                    outlined
                                 ></v-text-field>
                              </v-col>
                              <!-- Fin Columna Titular de la Tarjeta -->

                              <!-- Columna Numero de Tarjeta -->
                              <v-col cols="12" sm="6" class="pb-0 mb-0">
                                 <label class="bloque-1__label"
                                    >Nro Tarjeta:</label
                                 >
                                 <v-text-field
                                    type="text"
                                    data-checkout="cardNumber"
                                    v-model="card.cardNumber"
                                    :rules="[rules.ruleNroTarjeta]"
                                    min="0"
                                    dense
                                    outlined
                                    @change="setPaymentMedhod()"
                                 >
                                    <template v-slot:append>
                                       <v-scroll-x-reverse-transition>
                                          <img
                                             v-show="paymentMethodImage"
                                             :src="paymentMethodImage"
                                             alt="payment-method-image"
                                          />
                                       </v-scroll-x-reverse-transition>
                                    </template>
                                 </v-text-field>
                              </v-col>
                              <!-- Fin Columna Numero de Tarjeta -->

                              <!-- Columna Codigo de Seguridad -->
                              <v-col cols="12" sm="6" class="pt-0 mt-0">
                                 <label class="bloque-1__label"
                                    >Cód. Seguridad:</label
                                 >
                                 <div class="d-flex">
                                    <v-text-field
                                       class="pb-0 mb-0"
                                       type="number"
                                       data-checkout="securityCode"
                                       v-model="card.securityCode"
                                       :rules="rulesCodigo"
                                       min="100"
                                       max="999"
                                       dense
                                       outlined
                                       hint="(últimos 3 dígitos al reverso)"
                                       persistent-hint
                                    ></v-text-field>
                                    <img
                                       class="pl-3 pr-13 pb-0 mb-0"
                                       width="auto"
                                       height="38px"
                                       src="@/assets/img/payment/card.png"
                                       alt="Imagen Card | Wachi MarketPlace"
                                    />
                                 </div>
                              </v-col>
                              <!-- Fin Columna Codigo de Seguridad -->

                              <!-- Columna Fecha de Expiración -->
                              <v-col cols="12" sm="6" class="pt-0 mt-0">
                                 <label class="bloque-1__label"
                                    >Fecha de Expiración:</label
                                 >
                                 <div class="d-flex">
                                    <v-text-field
                                       type="number"
                                       data-checkout="cardExpirationMonth"
                                       v-model="card.cardExpirationMonth"
                                       :rules="rulesMes"
                                       min="1"
                                       max="12"
                                       class="pr-3"
                                       dense
                                       outlined
                                       hint="(Formato: MM)"
                                       persistent-hint
                                    ></v-text-field>
                                    <div class="bloque-1__año">
                                       <v-text-field
                                          type="number"
                                          data-checkout="cardExpirationYear"
                                          v-model="card.cardExpirationYear"
                                          :rules="rulesAño"
                                          dense
                                          min="20"
                                          max="99"
                                          outlined
                                          hint="(Formato: YY)"
                                          persistent-hint
                                       ></v-text-field>
                                    </div>
                                 </div>
                              </v-col>
                              <!-- Fin Columna Fecha de Expiración -->
                           </v-row>
                           <v-row>
                              <v-col cols="12" sm="6" class="pb-0 mb-0">
                                 <label class="bloque-1__label">
                                    Tipo de documento:
                                 </label>
                                 <v-select
                                    :items="documentTypes"
                                    v-model="documentType"
                                    dense
                                    outlined
                                 ></v-select>
                                 <input
                                    data-checkout="docType"
                                    type="hidden"
                                    :value="documentType"
                                 />
                              </v-col>
                              <!-- Fin Columna Titular de la Tarjeta -->

                              <!-- Columna Numero de Tarjeta -->
                              <v-col cols="12" sm="6" class="pb-0 mb-0">
                                 <label class="bloque-1__label">
                                    Nro de documento:
                                 </label>
                                 <v-text-field
                                    type="text"
                                    v-model="documentNumber"
                                    data-checkout="docNumber"
                                    :rules="[rules.ruleNroTarjeta]"
                                    min="0"
                                    dense
                                    outlined
                                 ></v-text-field>
                              </v-col>
                              <!-- Fin Columna Numero de Tarjeta -->
                           </v-row>
                        </div>
                        <!-- Fin cuerpo de Bloque 1 -->
                     </div>
                     <!-- Fin Bloque 1 -->
                     <v-divider></v-divider>
                     <!-- Inicio Bloque 2 -->
                     <div class="bloque-2">
                        <!-- Cabecera de Bloque 2 -->
                        <v-card-title>Detalles del Comprador</v-card-title>
                        <!-- Fin cabecera de Bloque 2 -->

                        <!-- Cuerpo de Bloque 2 -->
                        <div class="px-5">
                           <v-row>
                              <!-- Columna Email -->
                              <v-col cols="12" sm="6" class="">
                                 <label class="bloque-2__label">Email:</label>
                                 <v-text-field
                                    name="email"
                                    v-model="email"
                                    :rules="emailRules"
                                    dense
                                    outlined
                                 ></v-text-field>
                              </v-col>
                              <!-- Fin Columna Email -->
                           </v-row>
                        </div>
                        <!-- Fin cuerpo de Bloque 1 -->
                     </div>
                     <!-- Fin Bloque 2 -->
                  </v-card>
               </v-col>

               <v-col
                  cols="12"
                  sm="12"
                  md="3"
                  class="bloque-4__col d-flex justify-space-between"
               >
                  <v-card>
                     <!-- Inicio Bloque 4 -->
                     <div class="bloque-4">
                        <v-card-title>Resumen</v-card-title>
                        <v-card-text class="px-4 pt-6 pb-2 rounded-b-lg">
                           <!-- <div class="d-flex justify-space-between">
<p class="mb-2 font-weight-bold">Comercio</p>
<span>WACHI SAC</span>
</div>
<div class="d-flex justify-space-between">
<p class="mb-2 font-weight-bold">Nro. de Orden</p>
<span>160990379</span>
</div> -->
                           <div class="d-flex justify-space-between">
                              <p class="mb-2 font-weight-bold">Moneda</p>
                              <span>SOL</span>
                           </div>
                           <div class="d-flex justify-space-between">
                              <p class="font-weight-bold">Total</p>
                              <span class="red--text"
                                 >S/ {{ this.total.toFixed(2) }}</span
                              >
                           </div>
                           <v-col class="d-flex justify-space-around">
                              <v-btn
                                 :style="{
                                    backgroundColor:
                                       generalConfig.mainColor + ' !important',
                                    color: 'white !important'
                                 }"
                                 text
                                 class="px-10 py-5"
                                 @click="pay"
                                 :disabled="loading"
                              >
                                 Pagar
                              </v-btn>
                           </v-col>
                           <v-col>
                              <v-slide-x-transition>
                                 <v-alert
                                    type="error"
                                    class="white--text caption text-center"
                                    v-show="transactionError"
                                    dismissible
                                 >
                                    Hubo un error en la transacción, inténtelo
                                    nuevamente
                                 </v-alert>
                              </v-slide-x-transition>
                           </v-col>
                           <v-col class="d-flex">
                              <v-icon
                                 @click="gotoShoppingCart()"
                                 color="blue"
                                 class="ml-auto"
                              >
                                 mdi-arrow-left
                              </v-icon>
                              <a
                                 style="text-decoration: none"
                                 href="javascript:void(0)"
                                 class="mr-auto"
                                 @click="gotoShoppingCart()"
                              >
                                 Volver al carrito
                              </a>
                           </v-col>
                        </v-card-text>
                     </div>
                  </v-card>
                  <!-- Fin Bloque 4 -->
               </v-col>
            </v-row>
            <input type="hidden" name="paymentMethodId" />
            <input type="hidden" name="paymentMethod" id="paymentMethod" />
         </form>

         <!-- Carrousel -->
         <CarrouselPayment />
         <!-- Fin Carrousel -->
      </div>
   </v-container>
</template>

<script>
// import * as purchaseDA from "../dataAccess/purchaseDA";
import CarrouselPayment from "@/components/bloques/carrousel/carrouselPayment.vue";
import * as purchaseDA from "@/dataAccess/purchaseDA";
import * as listProductDA from "../dataAccess/listProductDA";
import { mapState, mapGetters } from "vuex";

export default {
   data: () => ({
      userid: null,
      total: 0.0,
      toBuy: false,
      showError: false,
      alert: false,
      itemsCount: 0,
      outOfStock: 0,
      buyerId: null,
      productList: [],
      purchaseDetail: [],
      email: "",
      paymentMethod: "",
      paymentMethodImage: "",
      card: {
         cardholderName: "",
         cardExpirationMonth: "",
         cardExpirationYear: "",
         cardNumber: "",
         securityCode: ""
      },
      transactionError: false,
      documentNumber: "",
      documentType: "",
      nPayments: 0,
      model: 0,
      loading: false,
      mes: [
         "Enero",
         "Febrero",
         "Marzo",
         "Abril",
         "Mayo",
         "Junio",
         "Julio",
         "Agosto",
         "Septiembre",
         "Octubre",
         "Noviembre",
         "Diciembre"
      ],
      rules: {
         required: value => !!value || "Este campo es requerido.",
         ruleMarca: value => !!value || "Titular es requerido",
         ruleNroTarjeta: value => !!value || "Número es requerido"
      },
      emailRules: [
         v => !!v || "E-mail es requerido",
         v => /.+@.+/.test(v) || "E-mail es incorrecto"
      ],
      rulesMes: [
         v => !!v || "Mes es requerido",
         v => v <= 12 || "Mes inválido",
         v => v >= 1 || "Mes inválido"
      ],
      rulesAño: [
         v => !!v || "Año es requerido",
         v => v <= 99 || "Año inválido",
         v => v >= 20 || "Año inválido"
      ],
      rulesCodigo: [
         v => !!v || "Código es requerido",
         v => v >= 100 || "Código inválido",
         v => v <= 999 || "Código inválido"
      ],
      documentTypes: ["DNI", "C.E", "RUC", "OTRO"]
   }),
   created: function() {
      this.userid = this.$route.params.userid;
      // console.log('pase a vista Payment:', this.userid)

      window.Mercadopago.setPublishableKey(
         "TEST-fe53dc26-6ae4-4f5a-9396-cb693ff1fafe"
      );
      window.Mercadopago.getIdentificationTypes();
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      pay() {
         try {
            this.loading = true;
            console.log("loading:", this.loading);
            this.toBuy = true;
            this.retrieveAllItems();
         } catch (e) {
            console.error(e);
            throw e;
         }
      },
      gotoShoppingCart() {
         this.$router.push({
            name: "shoppingCart",
            params: { userid: this.getUser().data.id }
         });
      },
      async retrieveAllItems() {
         try {
            const cartResponse = await listProductDA.getCart(
               this.getUser().data.id
            );
            this.total = cartResponse[1];
            this.checkStatusAndStock(cartResponse[0]);
            if (!this.showError) {
               if (this.toBuy) {
                  console.log("a comprar ");
                  this.toBuy = false;
                  let nPayments = 0;
                  console.log("antes del payment method");
                  await this.setPaymentMedhod();
                  console.log("después del payment method");

                  const buyShoppingCartResponse = await purchaseDA.buyShoppingCart(
                     this.getUser().data.id
                  );
                  this.purchaseDetail = buyShoppingCartResponse;
                  console.log(
                     "soy el id de la compra realizada",
                     this.purchaseDetail.id
                  );
                  const numberPaymentsResponse = await purchaseDA.getNumberPayments(
                     this.getUser().data.id
                  );
                  nPayments = numberPaymentsResponse.payments;
                  console.log("NPayments:", nPayments);
                  let token;
                  let createPaymentResponse;
                  let body = {
                     purchaseId: this.purchaseDetail.id,
                     buyerId: this.getUser().data.id,
                     communityToken: process.env.VUE_APP_API_KEY_COMMUNITY,
                     email: this.email,
                     paymentMethod: this.paymentMethod,
                     documentType: this.documentType,
                     documentNumber: this.documentNumber
                  };
                  try {
                     for (let i = 0; i < nPayments; i++) {
                        token = await this.getCardToken();
                        console.log("Token", i, ":", token);
                        body.cardToken = token;
                        //console.log("body", body);

                        console.log("iteración payment:", i);
                        createPaymentResponse = await purchaseDA.createPayment(
                           body
                        );

                        console.log(
                           "createPaymentResponse:",
                           createPaymentResponse
                        );

                        //if (!createPaymentResponse.ok) // or check for response.status
                        //throw new Error('¡Ups!')
                        if (createPaymentResponse.body == 9) {
                           i = i - 1;
                           console.log(
                              "999999999999999999999999999999999999999999999999"
                           );
                        }

                        console.log("iteración payment:", i);
                        console.log("compra efectuada", createPaymentResponse);
                        this.loading = false;
                     }
                  } catch {
                     this.transactionError = true;
                     this.loading = false;
                     console.log("ERRRRRRRRRROR");
                     return;
                  }
                  await this.$router.push({
                     name: "PurchaseSummary",
                     params: {
                        purchaseid: this.purchaseDetail.id,
                        cardNumber: this.card.cardNumber
                     }
                  });
               }
            } else {
               this.toBuy = false;
               this.loading = false;
               await this.$router.push({
                  name: "shoppingCart",
                  params: { userid: this.getUser().data.id }
               });
            }
         } catch (e) {
            console.log(e);
         }
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
      getCardToken() {
         let form = this.$refs.payForm;
         return new Promise((resolve, reject) => {
            window.Mercadopago.createToken(form, (status, response) => {
               window.Mercadopago.clearSession();
               if (status !== 200 && status !== 201) {
                  reject(response);
               } else {
                  resolve(response.id);
               }
            });
         });
      },
      setPaymentMedhod() {
         return new Promise((resolve, reject) => {
            window.Mercadopago.getPaymentMethod(
               { bin: this.bin },
               (status, response) => {
                  if (status === 200) {
                     this.paymentMethodImage = response[0].thumbnail;
                     this.paymentMethod = response[0].id;
                     console.log(this.paymentMethod);
                     const paymentMethod = document.getElementById(
                        "paymentMethod"
                     );
                     paymentMethod.setAttribute("name", "paymentMethodId");
                     paymentMethod.setAttribute("type", "hidden");
                     paymentMethod.setAttribute("value", response[0].id);
                     const form = document.querySelector("#payForm");
                     form.appendChild(paymentMethod);
                     resolve(response);
                  } else {
                     reject(response);
                  }
               }
            );
         });
      }

      // sdkResponseHandler(status, response) {
      //   window.Mercadopago.clearSession();
      //   // console.log(response)
      //   if (status != 200 && status != 201) {
      //     alert("Error, asegurate que los datos son correctos");
      //   } else {
      //     // const payload = {
      //     //   clientInfo: {
      //     //     email: this.email,
      //     //     id_buyer: this.idUser
      //     //   },
      //     //   paymentInfo: {
      //     //     cartToken: response.id
      //     //   }
      //     // }
      //     // purchaseDA
      //     //   .createPaymentOrder(payload)
      //     //   .then(response => console.log(response))
      //     //   .catch(error => console.error(error))
      //   }
      // }
      // form.submit();
   },
   components: {
      CarrouselPayment
   },
   mounted() {
      this.retrieveAllItems();
   },
   computed: {
      ...mapState(["cart", "idUser", "generalConfig"]),
      bin() {
         return this.card.cardNumber.replace(/[ .-]/g, "").slice(0, 6);
      }
   }
};
</script>

<style scoped>
.cursor {
   cursor: pointer;
}

.cabecera-payment__img {
   width: 150px;
}

.bloque-1__cabecera,
.bloque-2__cabecera {
   border: 1px solid #bababa;
   background: rgb(62 124 212);
   color: #ffff;
   font-size: calc(0.1vw + 7px);
   /*font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;*/
}

.bloque-1__cuerpo,
.bloque-2__cuerpo {
   border: 1px solid #bababa;
}

.bloque-1__label,
.bloque-2__label {
   /*font-family: Arial, Helvetica, sans-serif;*/
   font-weight: 600;
   font-size: calc(1px + 12px);
}

.bloque-1__año {
   width: 50%;
}

.bloque-4__cabecera {
   /*border: 1px solid #bababa;*/
   background: rgb(232 232 232);
}

.bloque-4__cuerpo {
   border: 1px solid #bababa;
}

.bloque-4__col {
   flex-direction: column;
}

.bloque-5 {
   border: 1px solid #bababa;
}

.bloque-5__btn {
   font-style: normal;
   letter-spacing: normal;
   text-transform: none;
}

.footer {
   font-size: 12px;
}
</style>
