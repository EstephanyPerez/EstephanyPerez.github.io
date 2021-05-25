<template>
   <v-container class="pa-0">
      <!--<v-row>
         <v-col md="2" lg="2" xl="2" class="d-none d-md-flex">
            <SideBar></SideBar>
         </v-col>
          <v-col xs="12" sm="12" md="10" lg="10" xl="10">-->
      <v-card class="pa-5">
         <v-card-title class="pl-0 pt-0">
            Pedido {{ this.orderCode }}
         </v-card-title>
         <v-card-text v-if="loading" class="ma-auto">
            <v-progress-linear
               indeterminate
               color="primary"
            ></v-progress-linear>
            <p class="text-center text--disabled mt-3">
               Cargando detalle de pedido... Por favor, espere
            </p>
         </v-card-text>
         <div v-else>
            <!-- Status  -->
            <v-card class="mx-auto ma-3">
               <v-list-group :value="true">
                  <template v-slot:activator>
                     <v-list-item-title class="bigger-text"
                        >Seguimiento del pedido</v-list-item-title
                     >
                  </template>

                  <v-stepper color="green" alt-labels class="hidden-xs-only">
                     <v-stepper-header>
                        <template v-for="(step, n) in steps.map(e => e.text)">
                           <v-stepper-step
                              :key="`${n}-step`"
                              :complete="stepComplete(n)"
                              :step="n + 1"
                              :color="stepColor(n)"
                           >
                              {{ step }}
                           </v-stepper-step>
                           <v-divider
                              v-if="n + 1 !== steps.length"
                              :key="n"
                           ></v-divider>
                        </template>
                     </v-stepper-header>
                  </v-stepper>
                  <v-stepper color="green" vertical class="hidden-sm-and-up">
                     <template v-for="(step, n) in steps.map(e => e.text)">
                        <v-stepper-step
                           :key="`${n}-step`"
                           :complete="stepComplete(n)"
                           :step="n + 1"
                           :color="stepColor(n)"
                        >
                           {{ step }}
                        </v-stepper-step>
                        <v-stepper-content
                           :step="n + 1"
                           :key="`${n}-cont`"
                        ></v-stepper-content>
                     </template>
                  </v-stepper>
               </v-list-group>
            </v-card>
            <!-- Info from shoppingHistory -->
            <v-card class="mx-auto ma-3">
               <v-card v-for="(item, index) in 4" :key="index" elevation="0">
                  <v-row class="mx-1">
                     <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        lg="6"
                        xl="6"
                        align-self="center"
                        class="d-flex justify-start"
                     >
                        <v-list-item-title
                           class="d-flex justify-start titlesCard2"
                           >{{ card2Titles[index] }}</v-list-item-title
                        >
                     </v-col>
                     <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        lg="6"
                        xl="6"
                        align-self="center"
                     >
                        <v-list-item-title class="d-flex justify-end">{{
                           info[index]
                        }}</v-list-item-title>
                     </v-col>
                  </v-row>
               </v-card>
            </v-card>
            <!-- Order detail -->
            <v-card class="mx-auto ma-3">
               <v-list-item>
                  <v-list-item-content>
                     <v-list-item-title class="bigger-text"
                        >Detalle del pedido</v-list-item-title
                     >
                  </v-list-item-content>
               </v-list-item>
               <template v-for="(detail, n) in details">
                  <v-row class="mx-1" :key="`${n}-detail`">
                     <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        lg="6"
                        xl="6"
                        align-self="center"
                        class="d-flex justify-start"
                     >
                        <v-list-item-title
                           class="d-flex justify-start stateTitle"
                           >Estado
                        </v-list-item-title>
                     </v-col>
                     <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        lg="6"
                        xl="6"
                        align-self="center"
                     >
                        <v-list-item-title
                           class="d-flex justify-end statusDetail"
                        >
                           <v-btn small :color="getColorButton(detail.status)">
                              {{ getText(detail.status) }}
                           </v-btn>
                        </v-list-item-title>
                     </v-col>
                  </v-row>
                  <v-row class="mx-1 mb-5" :key="`${n}-info`">
                     <v-col
                        cols="12"
                        sm="3"
                        md="3"
                        lg="3"
                        xl="3"
                        align-self="center"
                        class="d-flex justify-center"
                     >
                        <img
                           class="show-img img-responsive"
                           :src="'data:image/jpeg;base64,' + detail.images[0]"
                        />
                     </v-col>
                     <v-col
                        cols="12"
                        sm="9"
                        md="9"
                        lg="9"
                        xl="9"
                        align-self="center"
                     >
                        <v-card-text
                           class="pa-0"
                           v-text="detail.name"
                        ></v-card-text>
                        <v-card-text
                           class="pa-0"
                           v-text="'Vendedor: ' + detail.sellerName"
                        ></v-card-text>
                        <v-card-text
                           class="pa-0"
                           v-text="'Cantidad: ' + detail.quantity"
                        ></v-card-text>
                        <v-card-text
                           class="pa-0"
                           v-text="
                              'Importe total: S/' + detail.subtotal.toFixed(2)
                           "
                        ></v-card-text>

                        <v-card-text
                           class="pa-0"
                           v-if="
                              (detail.status == 'Realizado' ||
                                 detail.status == 'Entregado') &&
                                 detail.rated == 0
                           "
                        >
                           <a
                              href="javascript:void(0)"
                              @click="showModal(detail.id)"
                              >Deja una calificación</a
                           >
                        </v-card-text>
                     </v-col>
                  </v-row>
               </template>
            </v-card>

            <!-- Modal to grade a product or service and leave a comment -->
            <v-dialog v-model="modal" max-width="400">
               <v-card class="mx-auto">
                  <v-list-item>
                     <v-list-item-content>
                        <v-list-item-title class="bigger-text mt-3"
                           >Déjanos tu calificación</v-list-item-title
                        >
                     </v-list-item-content>
                  </v-list-item>
                  <div class="text-center mx-auto">
                     <v-rating
                        background-color="warning lighten-1"
                        color="warning"
                        hover
                        length="5"
                        size="40"
                        v-model="rating"
                     ></v-rating>
                  </div>
                  <v-list-item>
                     <v-list-item-content>
                        <v-list-item-title>Comentarios</v-list-item-title>
                     </v-list-item-content>
                  </v-list-item>
                  <v-textarea
                     solo
                     class="ma-3"
                     v-model="comment"
                     key="commentForProdServ"
                  ></v-textarea>
                  <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn
                        :style="{
                           color: generalConfig.mainColor + ' !important'
                        }"
                        class="cancel-button"
                        text
                        @click="resetGrade()"
                     >
                        Cancelar
                     </v-btn>
                     <v-btn
                        :style="{
                           backgroundColor:
                              generalConfig.mainColor + ' !important',
                           color: 'white !important'
                        }"
                        @click="gradeProdServ()"
                     >
                        Calificar
                     </v-btn>
                  </v-card-actions>
                  <br />
               </v-card>
            </v-dialog>
         </div>
      </v-card>
      <!--</v-col>
      </v-row>-->
   </v-container>
</template>

<script>
//import SideBar from "@/components/SideBar.vue";
import * as shoppingHistoryDA from "../dataAccess/shoppingHistoryDA";
import { mapGetters, mapState } from "vuex";

export default {
   name: "ShoppingOrderDetail",
   components: {
      //SideBar
   },
   data: () => ({
      orderid: 0,
      orderCode: /*"AB234"*/ "",
      userID: 0,
      currentStep: 0,
      rating: 0,
      modal: false,
      idProdSendComment: 0,
      comment: "",
      loading: true,
      steps: [
         { step: 1, text: "Procesado", value: "Procesado" },
         {
            step: 2,
            text: "Parcialmente entregado",
            value: "Parcialmente_entregado"
         },
         { step: 3, text: "Entregado", value: "Entregado" }
      ],
      card2Titles: [
         "Fecha del pedido",
         "Importe total (S/)",
         "Cantidad",
         "Medio de pago"
      ],
      colorsButton: [
         { color: "orange", text: "Procesado", value: "Procesado" },
         {
            color: "yellow",
            text: "Parcialmente entregado",
            value: "Parcialmente_entregado"
         },
         { color: "disabled", text: "Entregado", value: "Entregado" },
         { color: "red", text: "Pendiente", value: "Pendiente" },
         { color: "yellow", text: "En curso", value: "En_curso" },
         { color: "green", text: "Enviado", value: "Enviado" },
         { color: "disabled", text: "Entregado", value: "Entregado" },
         { color: "red", text: "Devuelto", value: "Devuelto" },
         { color: "red", text: "Pendiente", value: "Pendiente" },
         { color: "disabled", text: "Realizado", value: "Realizado" }
      ],
      info: [],
      details: []
   }),
   watch: {},
   methods: {
      ...mapGetters("user", ["getUser"]),
      stepComplete(step) {
         return this.currentStep > step;
      },
      stepColor(step) {
         return this.currentStep > step ? "green" : "blue";
      },
      showModal(id) {
         this.modal = true;
         this.idProdSendComment = id;
      },
      gradeProdServ() {
         //console.log("Vas a calificar al id : ", this.idProdSendComment);
         //console.log("Con estrellas igual a: ", this.rating);
         //console.log("Con comentario: ", this.comment);
         let data = {
            idPurchase: this.orderid,
            buyerId: this.getUser().data.id, // 12,
            idProduct: this.idProdSendComment,
            rating: this.rating,
            comment: this.comment
         };
         shoppingHistoryDA.saveRating(data).then(res => {
            console.log(res);
            this.resetGrade();
            this.$router.push("/myShoppingHistory");
         });
      },
      resetGrade() {
         this.comment = "";
         this.rating = 0;
         this.modal = false;
      },
      getColorButton(status) {
         let index = this.colorsButton.map(e => e.value).indexOf(status);
         let color = this.colorsButton[index].color;
         return color;
      },
      getText(status) {
         let index = this.colorsButton.map(e => e.value).indexOf(status);
         let text = this.colorsButton[index].text;
         return text;
      }
   },
   mounted() {},
   created() {
      this.loading = true;

      try {
         let urlParams = "?" + atob(this.$route.params.orderid);
         let regex = /[?&]([^=#]+)=([^&#]*)/g;
         let objParams = {};
         let match;
         while((match = regex.exec(urlParams))) {
            objParams[match[1]] = match[2];
         }

         this.orderid = objParams.orderId;
      } catch (error) {
         console.log("Error Decode: ", error);
      } finally {
         if(this.orderid == 0) {
            this.$router.push("/myShoppingHistory");
         }
      }

      shoppingHistoryDA
         .getOrderDetail(this.orderid)
         .then((res) => {
            try {
               this.userID = res.userId;
               this.details = res.details;
               this.info = [
                  res.date,
                  res.totalAmount.toFixed(2),
                  res.cantItems,
                  "Tarjeta de débito",
               ];
               this.orderid = res.id;
               this.orderCode = res.code;
               let index = this.steps.map((e) => e.value).indexOf(res.status);
               this.currentStep = this.steps[index].step;
               this.loading = false;
            } catch (error) {
               console.log("no hay details uU");
            }
         });
   },
   computed: {
      ...mapState(["generalConfig"])
   }
};
</script>

<style>
th {
   vertical-align: center;
}
.v-stepper__label {
   align-items: flex-start;
   display: flex !important;
   flex-direction: column;
   line-height: 1;
}
.theme--light.v-stepper .v-stepper__step--active .v-stepper__label {
   text-shadow: none !important;
}
.v-stepper--alt-labels .v-stepper__step {
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;
   flex-basis: 135px;
}
.theme--light.v-stepper .v-stepper__step--complete .v-stepper__label {
   color: rgba(0, 0, 0, 0.87);
   text-align: center;
}
.v-application--is-ltr .v-stepper__label {
   text-align: center;
}
.img-responsive {
   display: block;
   max-width: 100%;
   height: auto;
}
.show-img {
   max-height: 100px;
   max-width: 140px;
   display: inline-block;
   vertical-align: middle;
}
.bigger-text {
   align-self: auto;
   font-size: 120%;
   font-weight: 500;
}
.statusDetail {
   font-weight: 500;
   font-size: 90%;
   color: rgb(97, 95, 95);
}
.titlesCard2 {
   font-weight: 500;
}
.stateTitle {
   font-weight: 500;
   font-size: 90%;
}
</style>
