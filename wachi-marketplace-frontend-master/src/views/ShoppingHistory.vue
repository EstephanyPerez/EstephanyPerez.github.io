<template>
   <v-container class="pa-0">
      <!--<v-row>
         <v-col md="2" lg="2" xl="2" class="d-none d-md-flex">
            <SideBar></SideBar>
         </v-col>
         <v-col xs="12" sm="12" md="10" lg="10" xl="10">-->
      <v-card class="pa-5">
         <v-card-title class="pl-0 pt-0"> Compras </v-card-title>
         <v-card-text v-if="loading" class="ma-auto">
            <v-progress-linear
               indeterminate
               color="primary"
            ></v-progress-linear>
            <p class="text-center text--disabled mt-3">
               Cargando compras... Por favor, espere
            </p>
         </v-card-text>
         <div v-else>
            <div v-if="items.length === 0">
               <v-list-item-content>
                  <p class="text-center text--disabled">
                     Aún no tienes compras hechas
                  </p>
               </v-list-item-content>
            </div>
            <v-card
               class="mx-auto ma-3"
               v-for="(item, index) in visibleItems"
               :key="index"
            >
               <v-row class="mx-3">
                  <v-col
                     cols="12"
                     sm="6"
                     md="6"
                     lg="6"
                     xl="6"
                     align-self="center"
                     class="d-flex justify-start pt-2"
                  >
                     <v-list-item-content>
                        <v-list-item-title
                           class="text-bold"
                           v-text="'Pedido ' + item.code"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                           class="pt-2"
                           v-text="'Importe total: S/' + item.totalAmount"
                        ></v-list-item-subtitle>
                        <v-list-item-subtitle>
                           <v-btn small :color="getColorButton(item.status)">
                              {{ getText(item.status) }}
                           </v-btn>
                        </v-list-item-subtitle>
                     </v-list-item-content>
                  </v-col>
                  <v-col
                     cols="12"
                     sm="6"
                     md="6"
                     lg="6"
                     xl="6"
                     align-self="center"
                     class="d-flex justify-end"
                  >
                     <v-list-item-action>
                        <v-list-item-subtitle
                           v-text="item.date"
                        ></v-list-item-subtitle>
                        <v-list-item-subtitle class="mt-1">
                           Cantidad: {{ item.cantItems }}
                        </v-list-item-subtitle>
                        <a
                           href="javascript:void(0)"
                           class="mt-1"
                           @click="goOrderDetail(item.id)"
                           >Ver detalle de pedido
                        </a>
                     </v-list-item-action>
                  </v-col>
               </v-row>
            </v-card>
            <br v-if="items.length !== 0" />
            <v-row class="justify-center" v-if="items.length !== 0">
               <v-pagination
                  v-model="page"
                  :length="Math.ceil(items.length / perPage)"
                  :total-visible="maxVisiblePages"
               ></v-pagination>
            </v-row>
         </div>
      </v-card>
      <!--</v-col>
      </v-row>-->
   </v-container>
</template>

<script>
//import SideBar from "@/components/SideBar.vue";
import * as shoppingHistoryDA from "../dataAccess/shoppingHistoryDA";
import { mapState, mapGetters } from "vuex";

export default {
   name: "ShoppingHistory",
   components: {
      //SideBar
   },
   data: () => ({
      page: 1,
      perPage: 5,
      maxVisiblePages: 10,
      loading: true,
      colorsButton: [
         { color: "orange", text: "Procesado", value: "Procesado" },
         {
            color: "yellow",
            text: "Parcialmente entregado",
            value: "Parcialmente_entregado"
         },
         { color: "green", text: "Entregado", value: "Entregado" }
      ],
      items: [
         /*{
            id: 1,
            date: "29/09/20",
            cantItems: 3,
            totalAmount: Number(49.9).toFixed(2),
            code: "AB234",
            status: "EN PROCESO"
         },
         {
            id: 2,
            date: "29/09/20",
            cantItems: 3,
            totalAmount: Number(49.9).toFixed(2),
            code: "AB234",
            status: "EN PROCESO"
         },
         {
            id: 3,
            date: "29/09/20",
            cantItems: 3,
            totalAmount: Number(49.9).toFixed(2),
            code: "AB234",
            status: "ENVIADO"
         },
         {
            id: 4,
            date: "29/09/20",
            cantItems: 3,
            totalAmount: Number(49.9).toFixed(2),
            code: "AB234",
            status: "FINALIZADO"
         }*/
      ]
   }),
   watch: {},
   methods: {
      ...mapGetters("user", ["getUser"]),
      goOrderDetail(id) {
         console.log("dataa: ", this.$data);
         this.$router.push({
            name: "ShoppingOrderDetail",
            params: { orderid: btoa("orderId=" + id) }
         });
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
      shoppingHistoryDA
         .listShoppingHistory(this.getUser().data.id)
         .then(res => {
            // idUser harcodeado :v
            if (res.length !== 0) {
               this.items = res;
            }
            this.loading = false;
         });
   },
   computed: {
      ...mapState(["cart", "idUser"]),
      visibleItems() {
         let lista = this.items.slice(
            (this.page - 1) * this.perPage,
            this.page * this.perPage
         );
         return lista;
      }
   }
};
</script>

<style>
th {
   vertical-align: center;
}
.text-bold {
   align-self: auto;
   font-weight: bold;
}
.v-list-item__subtitle {
   color: rgba(0, 0, 0, 0.6);
}
.v-list-item__content > *:not(:last-child) {
   margin-bottom: 10px;
}
.v-list-item__action--stack {
   margin-right: 0px !important;
}
</style>
