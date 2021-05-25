<template>
   <v-container class="pa-0">
      <!--<v-row>
         <v-col md="2" lg="2" xl="2" class="d-none d-md-flex">
            <SideBar></SideBar>
         </v-col>
         <v-col xs="12" sm="12" md="10" lg="10" xl="10">-->
      <v-card class="pa-0">
         <v-card-title class="pl-5">
            Lista de productos y servicios
         </v-card-title>

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

            <v-col
               cols="12"
               sm="6"
               md="6"
               lg="3"
               xl="3"
               align-self="center"
               class="d-flex justify-center align-center"
            >
               <v-btn
                  :style="{
                     backgroundColor: generalConfig.mainColor + ' !important',
                     color: 'white !important'
                  }"
                  dark
                  @click="createItem()"
                  block
               >
                  <v-icon color="white">mdi-plus-box</v-icon>
                  <span class="ml-1">Crear Nuevo</span>
               </v-btn>
            </v-col>
            <v-col
               cols="12"
               sm="6"
               md="6"
               lg="3"
               xl="3"
               align-self="center"
               class="d-flex justify-center align-center"
            >
               <div @click="notDataSelected" class="v-btn--block">
                  <vue-excel-xlsx
                     :data="selected"
                     :columns="columns"
                     :filename="'Publicaciones'"
                     :sheetname="'Mis publicaciones'"
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
            :headers="headers"
            :items="publications"
            :search="search"
            v-model="selected"
            item-key="id"
            show-select
            multi-sort
            class="elevation-1"
            :no-data-text="noDataText"
            :no-results-text="filterNoResultsText"
            :footer-props="footerProps"
            :loading="loadingData"
            loading-text="Cargando datos... Por favor, espere"
            :custom-filter="filterWithDescription"
            mobile-breakpoint="1264"
         >
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
            <template v-slot:[`item.actions`]="{ item }">
               <v-tooltip
                  bottom
                  v-for="(action, index) in actions"
                  :key="index"
               >
                  <template v-slot:activator="{ on, attrs }">
                     <v-icon
                        small
                        class="mr-2"
                        @click="handleAction(action.title, item)"
                        v-bind="attrs"
                        v-on="on"
                     >
                        {{ action.icon }}
                     </v-icon>
                  </template>
                  <span>{{ action.title }}</span>
               </v-tooltip>
            </template>
            <template v-slot:[`footer.page-text`]="props">
               {{ props.pageStart }} - {{ props.pageStop }} de
               {{ props.itemsLength }}
            </template>
         </v-data-table>
      </v-card>
      <!--</v-col>
      </v-row>-->

      <!-- Confirm to delete item -->
      <v-dialog v-model="deleteDialog" persistent max-width="400">
         <v-card>
            <v-card-title class="headline">
               ¿Está seguro de eliminar?
            </v-card-title>
            <v-card-text>
               Usted está eliminando el producto/servicio
               {{ toDelete.sku }}
            </v-card-text>
            <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn color="red darken-1" text @click="deleteDialog = false">
                  Cancelar
               </v-btn>
               <v-btn color="green darken-1" text @click="deleteItem(toDelete)">
                  Aceptar
               </v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>

      <!-- Visualize item -->
      <v-dialog v-model="visualizeDialog" persistent max-width="500">
         <v-card>
            <v-card-title
               class="headline justify-center"
               v-if="informationItem.productService.type === 'P'"
            >
               Información del producto
            </v-card-title>

            <v-card-title class="headline justify-center" v-else>
               Información del servicio
            </v-card-title>

            <v-card-text>
               <v-container>
                  <v-row>
                     <v-col cols="12" sm="6" md="6">
                        <v-text-field
                           class="custom-label-color"
                           label="Fecha de creación"
                           readonly
                           v-model="informationItem.productService.creationDate"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12" sm="6" md="6">
                        <v-text-field
                           class="custom-label-color"
                           label="Código"
                           readonly
                           v-model="informationItem.productService.sku"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12">
                        <v-text-field
                           class="custom-label-color"
                           label="Nombre del Producto"
                           readonly
                           v-model="informationItem.productService.name"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12">
                        <v-textarea
                           class="custom-label-color"
                           label="Descripción"
                           readonly
                           rows="2"
                           row-height="20"
                           v-model="informationItem.productService.description"
                        ></v-textarea>
                     </v-col>
                     <v-col cols="12" sm="12" md="12">
                        <v-text-field
                           class="custom-label-color"
                           label="Categoria"
                           readonly
                           v-model="
                              informationItem.productService.category.name
                           "
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12" sm="6" md="6">
                        <v-text-field
                           class="custom-label-color"
                           label="Precio (S/)"
                           readonly
                           v-model="informationItem.productService.price"
                        ></v-text-field>
                     </v-col>
                     <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        v-if="informationItem.productService.type === 'P'"
                     >
                        <v-text-field
                           class="custom-label-color"
                           label="Stock"
                           readonly
                           v-model="informationItem.productService.stock"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12" sm="6" md="6">
                        <v-text-field
                           class="custom-label-color"
                           label="Calificación"
                           readonly
                           v-model="informationItem.promRating"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12" sm="6" md="6">
                        <v-text-field
                           class="custom-label-color"
                           label="Cantidad de vendidos"
                           readonly
                           v-model="informationItem.salesQuantity"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12" class="justify-center">
                        <v-slide-group height="auto" center-active show-arrows>
                           <v-slide-item
                              v-for="image in informationItem.images"
                              :key="image"
                              center-active
                           >
                              <v-card class="ma-4">
                                 <v-img
                                    :src="image"
                                    min-height="100px"
                                    min-width="100px"
                                    max-height="100px"
                                    max-width="100px"
                                 >
                                 </v-img>
                              </v-card>
                           </v-slide-item>
                        </v-slide-group>
                     </v-col>
                  </v-row>
               </v-container>
            </v-card-text>
            <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn
                  color="green darken-1"
                  text
                  @click="visualizeDialog = false"
               >
                  Aceptar
               </v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </v-container>
</template>

<script>
//import SideBar from "@/components/SideBar.vue";
import * as sellerPublicationDA from "../dataAccess/sellerPublicationDA";
import { mapState, mapGetters } from "vuex";

export default {
   name: "SellerPublications",
   components: {
      //SideBar
   },
   data: () => ({
      loadingData: false,
      formatDate: { day: "numeric", month: "numeric", year: "numeric" },
      toDelete: { sku: 0 },
      selected: [],
      deleteDialog: false,
      visualizeDialog: false,
      loadInfo: false,
      search: "",
      headers: [
         { text: "Código", value: "sku", sortable: true, width: "10%" },
         { text: "Nombre", value: "name", sortable: true, width: "22%" },
         { text: "Tipo", value: "type", width: "10%" },
         { text: "Cantidad", value: "stock", sortable: true, width: "12%" },
         {
            text: "Fecha de Creación",
            value: "creationDate",
            sortable: true,
            width: "10%"
         },
         {
            text: "Precio Unitario (S/)",
            value: "price",
            sortable: true,
            width: "10%"
         },
         {
            text: "Categoría",
            value: "category",
            sortable: true,
            width: "13%"
         },
         { text: "Acciones", value: "actions", sortable: false, width: "13%" }
      ],
      publications: [],
      actions: [
         { title: "Visualizar", icon: "mdi-eye" },
         { title: "Editar", icon: "mdi-pencil" },
         { title: "Eliminar", icon: "mdi-trash-can" }
      ],
      filterNoResultsText:
         "No se ha encontrado productos o servicios con los filtros.",
      noDataText: "No hay productos o servicios a mostrar",
      footerProps: {
         "items-per-page-Text": "Filas por página: ",
         "items-per-page-options": [10, 20, 50]
      },
      columns: [],
      data: [],
      dataExcelAlert: false,
      informationItem: {
         productService: {
            sku: "",
            name: "",
            description: "",
            stock: -1,
            price: -1,
            category: {
               name: ""
            },
            creationDate: "",
            type: ""
         },
         images: [],
         promRating: 0,
         salesQuantity: 0
      }
   }),
   methods: {
      ...mapGetters("user", ["getUser"]),
      handleAction(action, item) {
         if (action === "Visualizar") {
            this.visualizeItem(item.id);
         } else if (action === "Editar") {
            console.log("EDITAR ", item.id);
            this.$router.push({
               name: "productRegistration",
               params: { pid: item.id }
            });
         } else if (action === "Eliminar") {
            this.toDelete = item;
            this.deleteDialog = true;
         }
      },

      retrieveAllItems() {
         this.loadingData = true;
         sellerPublicationDA
            .getAllPublicationsBySeller(this.getUser().data.id)
            .then(res => {
               this.publications = res;
               this.loadingData = false;
            });

         // To export data to excel
         this.columns = this.headers
            .filter(e => e.value != "actions")
            .map(e => {
               return { label: e.text, field: e.value };
            });
      },

      createItem() {
         this.$router.push({
            name: "productRegistration",
            params: { pid: -1 }
         });
      },

      deleteItem(itemSelected) {
         sellerPublicationDA
            .deletePublicationBySeller(itemSelected.id)
            .then(res => {
               this.publications = this.publications.filter(
                  e => e.id != itemSelected.id
               );
               console.log(res);
            });
         this.deleteDialog = false;
      },

      notDataSelected() {
         if (this.selected.length === 0) this.dataExcelAlert = true;
         else this.dataExcelAlert = false;
      },

      visualizeItem(itemId) {
         sellerPublicationDA
            .visualizeInformationProductService(itemId)
            .then(res => {
               this.informationItem = res;
               console.log("soy res", res);
               console.log("soy la info 1:", this.informationItem);
               this.loadInfo = true;
               if (this.loadInfo) {
                  this.visualizeDialog = true;
                  this.loadInfo = false;
               }
            });
         console.log("llegue");
         console.log("soy la info:", this.informationItem);
      },

      filterWithDescription(value, search, item) {
         return (
            (value != null &&
               search != null &&
               typeof value === "string" &&
               item.sku.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
            item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            item.type.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            item.stock
               .toString()
               .toLowerCase()
               .indexOf(search.toLowerCase()) !== -1 ||
            item.creationDate
               .toString()
               .toLowerCase()
               .indexOf(search.toLowerCase()) !== -1 ||
            item.price
               .toString()
               .toLowerCase()
               .indexOf(search.toLowerCase()) !== -1 ||
            item.category.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            item.description.toLowerCase().indexOf(search.toLowerCase()) !== -1
         );
      }
   },
   mounted() {
      this.retrieveAllItems();
   },
   created() {
      sellerPublicationDA
         .getAllPublicationsBySeller(this.getUser().data.id)
         .then(res => (this.publications = res));

      // To export data to excel
      this.columns = this.headers
         .filter(e => e.value != "actions")
         .map(e => {
            return { label: e.text, field: e.value };
         });
   },
   computed: {
      ...mapState(["cart", "idUser", "generalConfig"])
   }
};
</script>

<style scoped>
th {
   vertical-align: center;
}
</style>
