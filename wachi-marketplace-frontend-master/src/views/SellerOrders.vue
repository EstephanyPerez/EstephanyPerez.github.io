<template>
   <v-container class="pa-0">
      <v-card class="pa-0">
         <v-card-title class="pl-5"> Lista de pedidos </v-card-title>

         <v-row class="mx-3">
            <v-col
               cols="12"
               sm="12"
               md="12"
               lg="6"
               xl="6"
               align-self="center"
               class="d-flex justify-center"
            >
               <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar producto o servicio"
                  single-line
                  hide-details
                  color="indigo darken-4"
                  class="mt-0"
               ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col
               cols="12"
               sm="12"
               md="12"
               lg="3"
               xl="3"
               align-self="center"
               class="d-flex justify-center align-center"
            >
               <div @click="notDataSelected" class="v-btn--block">
                  <vue-excel-xlsx
                     :data="selectedDataToExcel"
                     :columns="columnsDataToExcel"
                     :filename="'Lista de pedidos'"
                     :sheetname="'Mis pedidos'"
                     class="v-btn v-btn--block v-btn--contained theme--dark v-size--default green darken-1"
                  >
                     <v-icon color="white">mdi-cloud-download</v-icon>
                     <span class="ml-1">Descargar Excel</span>
                  </vue-excel-xlsx>
               </div>
            </v-col>
         </v-row>

         <v-card-text>
            <v-alert
               v-model="dataExcelAlert"
               type="warning"
               dense
               dismissible
               border="left"
               transition="fade-transition"
            >
               Debe seleccionar los datos que desea exportar.
            </v-alert>
         </v-card-text>

         <v-data-table
            class="elevation-1"
            item-key="id"
            show-select
            multi-sort
            v-model="selectedDataToExcel"
            :headers="headers"
            :items="orders"
            :search="search"
            :no-data-text="noDataText"
            :no-results-text="filterNoResultsText"
            :footer-props="footerProps"
            :loading="loadingData"
            :loading-text="loadingDataText"
            :custom-filter="filterWithDescription"
            :single-expand="false"
            :expanded.sync="expanded"
            show-expand
            mobile-breakpoint="1264"
         >
            <!-- single expand: solo uno o varios -->
            <template
               v-slot:[`item.data-table-expand`]="{ item, expand, isExpanded }"
            >
               <div class="text-center my-2">
                  <v-icon @click="expand(!isExpanded)">mdi-contacts</v-icon>
               </div>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
               <td :colspan="headers.length" class="text-center">
                  <span class="font-weight-bold">
                     {{ item.type }} {{ item.name }}
                  </span>
                  pedido por
                  <span class="font-weight-bold">{{ item.username }}</span>
                  con correo
                  <span class="font-weight-bold">{{ item.email }}</span>
               </td>
            </template>
            <template v-slot:[`item.sku`]="{ item }">
               <v-chip label class="px-0 mr-2">
                  <v-img
                     :src="item.images"
                     min-height="32px"
                     min-width="32px"
                     max-height="32px"
                     max-width="32px"
                  ></v-img>
               </v-chip>
               {{ item.sku }}
            </template>

            <template v-slot:[`item.price`]="{ item }">
               <div class="d-flex justify-end">
                  {{ item.price.toFixed(2) }}
               </div>
            </template>

            <template v-slot:[`item.total`]="{ item }">
               <div class="d-flex justify-end">
                  {{ item.total.toFixed(2) }}
               </div>
            </template>

            <template v-slot:[`item.state`]="{ item }">
               <v-btn
                  small
                  :color="getColorState(item.type, item.state)"
                  @click="listStates(item)"
               >
                  {{ item.state }}
               </v-btn>
            </template>

            <template v-slot:[`footer.page-text`]="props">
               {{ props.pageStart }} - {{ props.pageStop }} de
               {{ props.itemsLength }}
            </template>
         </v-data-table>
      </v-card>

      <!-- Order states -->
      <v-dialog v-model="dialogOrderUpdate" max-width="400">
         <v-card class="mx-auto" tile>
            <v-list flat>
               <v-subheader
                  >Estado del pedido
                  {{ selectedOrderUpdate.purchaseCode }}</v-subheader
               >
               <v-list-item-group v-model="selectedStateUpdate" color="primary">
                  <v-list-item
                     v-for="state in generalStates"
                     :key="state.value"
                     :color="
                        getColorListState(
                           selectedOrderUpdate.state,
                           selectedOrderUpdate.type,
                           state.text
                        )
                     "
                     :disabled="
                        getDisabledState(
                           selectedOrderUpdate.state,
                           selectedOrderUpdate.type,
                           state.value
                        )
                     "
                     @click="updateState(selectedOrderUpdate, state.text)"
                  >
                     <v-list-item-content>
                        <v-list-item-title
                           v-text="state.text"
                        ></v-list-item-title>
                     </v-list-item-content>
                  </v-list-item>
               </v-list-item-group>
            </v-list>
         </v-card>
      </v-dialog>
   </v-container>
</template>

<script>
import * as sellerOrderDA from "../dataAccess/sellerOrderDA";
import { mapState, mapGetters } from "vuex";

export default {
   name: "SellerOrders",
   data: () => ({
      // idUser: 12,
      expanded: [],

      search: "",
      selectedDataToExcel: [],
      columnsDataToExcel: [],
      dataExcelAlert: false,
      formatDate: { day: "numeric", month: "numeric", year: "numeric" },
      headers: [
         { text: "Código", value: "sku", sortable: true, width: "10%" },
         { text: "Nombre", value: "name", sortable: true, width: "20%" },
         // { text: "Tipo", value: "type", width: "10%" },
         {
            text: "Fecha Pedido",
            value: "date",
            sortable: true,
            width: "15%"
         },
         { text: "Cantidad", value: "quantity", sortable: true, width: "10%" },
         {
            text: "Precio Unitario (S/)",
            value: "price",
            sortable: true,
            width: "10%"
         },
         {
            text: "Total (S/)",
            value: "total",
            sortable: true,
            width: "10%"
         },
         {
            text: "Pedido",
            value: "purchaseCode",
            sortable: true,
            width: "10%"
         },
         { text: "Estado", value: "state", sortable: false, width: "10%" },
         {
            text: "Cliente",
            value: "data-table-expand",
            sortable: false,
            width: "10%"
         }
      ],
      orders: [],
      noDataText: "No hay productos o servicios a mostrar",
      filterNoResultsText:
         "No se ha encontrado productos o servicios con los filtros.",
      loadingDataText: "Cargando datos... Por favor, espere",
      footerProps: {
         "items-per-page-Text": "Filas por página: ",
         "items-per-page-options": [10, 20, 50]
      },
      loadingData: false,
      loadingProductStates: false,
      loadingServiceStates: false,
      generalStates: [],
      productStates: [],
      serviceStates: [],
      colorProductStates: ["red", "yellow", "green", "disabled", "red"],
      colorServiceStates: ["red", "yellow", "disabled"],
      dialogOrderUpdate: false,
      selectedOrderUpdate: { purchaseCode: "-- Ningun codigo --" },
      selectedStateUpdate: "-- Ninguno --"
   }),
   created() {
      this.retrieveAllItems();
   },
   mounted() {
      this.retrieveAllItems();
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      listStates(item) {
         this.selectedOrderUpdate = item;
         this.selectedStateUpdate = -1;
         this.generalStates = [];

         if (item.type === "Producto") {
            this.selectedStateUpdate = this.productStates
               .map(e => e.text)
               .indexOf(item.state);
            this.generalStates = this.productStates;
         } else if (item.type === "Servicio") {
            this.selectedStateUpdate = this.serviceStates
               .map(e => e.text)
               .indexOf(item.state);
            this.generalStates = this.serviceStates;
         }

         this.dialogOrderUpdate = true;
      },
      getColorState(type, state) {
         let color = "disabled";
         if (type === "Producto") {
            let idx = this.productStates.map(e => e.text).indexOf(state);
            color = this.colorProductStates[idx];
         } else if (type === "Servicio") {
            let idx = this.serviceStates.map(e => e.text).indexOf(state);
            color = this.colorServiceStates[idx];
         }

         return color;
      },
      getColorListState(orderState, orderType, state) {
         let color = "disabled";
         if (orderType === "Producto") {
            let idx = this.productStates.map(e => e.text).indexOf(state);
            if (this.getDisabledState(orderState, orderType, idx))
               return "disabled";
            color = this.colorProductStates[idx];
         } else if (orderType === "Servicio") {
            let idx = this.serviceStates.map(e => e.text).indexOf(state);
            if (this.getDisabledState(orderState, orderType, idx))
               return "disabled";
            color = this.colorServiceStates[idx];
         }

         return color;
      },
      getDisabledState(orderState, orderType, stateIdx) {
         let idx = 0;
         let limite = 0;
         if (orderType === "Producto") {
            idx = this.productStates.map(e => e.text).indexOf(orderState);
            limite = 2;
         } else if (orderType === "Servicio") {
            idx = this.serviceStates.map(e => e.text).indexOf(orderState);
            limite = 2;
         }

         let disabled = idx >= limite && stateIdx < idx;
         return disabled;
      },
      updateState(item, state) {
         console.log("UUUUU---- ", item, state);
         if (state === "En curso") state = "En_curso";
         sellerOrderDA
            .updateState(item.idProduct, item.idPurchase, state)
            .then(() => {
               if (state === "En_curso") state = "En curso";
               item.state = state;
            });
      },
      retrieveStates() {
         sellerOrderDA.getProductStates().then(res => {
            this.productStates = res.map((e, idx) => {
               return {
                  value: idx,
                  text: e === "En_curso" ? "En curso" : e,
                  condition: "enabled"
               };
            });
         });

         sellerOrderDA.getServiceStates().then(res => {
            this.serviceStates = res.map((e, idx) => {
               return {
                  value: idx,
                  text: e === "En_curso" ? "En curso" : e,
                  condition: "enabled"
               };
            });
         });
      },
      retrieveAllItems() {
         this.loadingData = true;

         this.retrieveStates();
         sellerOrderDA.getAllOrderBySeller(this.getUser().data.id).then(res => {
            this.orders = res;
            this.loadingData = false;
         });

         // To export data to excel
         this.columnsDataToExcel = this.headers
            .filter(e => e.value != "data-table-expand")
            .map(e => {
               return { label: e.text, field: e.value };
            });
         this.columnsDataToExcel.splice(2, 0, { field: "type", label: "Tipo" });
         this.columnsDataToExcel.splice(8, 0, {
            field: "username",
            label: "Cliente"
         });
         this.columnsDataToExcel.splice(9, 0, {
            field: "email",
            label: "Correo"
         });
         console.log(this.columnsDataToExcel);
      },
      notDataSelected() {
         if (this.selectedDataToExcel.length === 0) this.dataExcelAlert = true;
         else this.dataExcelAlert = false;
      },
      filterWithDescription(value, search, item) {
         return (
            (value != null &&
               search != null &&
               typeof value === "string" &&
               item.sku.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
            item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            item.type.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            item.quantity
               .toString()
               .toLowerCase()
               .indexOf(search.toLowerCase()) !== -1 ||
            item.date
               .toString()
               .toLowerCase()
               .indexOf(search.toLowerCase()) !== -1 ||
            item.price
               .toString()
               .toLowerCase()
               .indexOf(search.toLowerCase()) !== -1 ||
            item.total
               .toString()
               .toLowerCase()
               .indexOf(search.toLowerCase()) !== -1 ||
            item.purchaseCode.toLowerCase().indexOf(search.toLowerCase()) !==
               -1 ||
            item.state.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            item.username.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            item.email.toLowerCase().indexOf(search.toLowerCase()) !== -1
         );
      }
   },
   computed: {
      ...mapState(["idUser"])
   }
};
</script>

<style scoped>
td {
   vertical-align: center;
}
.v-input--selection-controls__ripple {
   margin: 0px;
}
</style>
