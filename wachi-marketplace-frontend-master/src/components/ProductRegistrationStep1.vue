<template>
   <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
         <h1 class="title mb-3">Información General</h1>
         <h4 class="py-2 text-center" v-if="idParent === -1">
            ¿Qué desea agregar?
         </h4>
         <h4 class="py-2 text-center" v-else>¿Qué desea editar?</h4>
         <div class="flex-center">
            <v-radio-group
               v-model="addOption"
               row
               class="justify-center"
               @change="$emit('update:addOption', addOption)"
            >
               <v-radio label="Producto" value="product"></v-radio>
               <v-radio label="Servicio" value="service"></v-radio>
            </v-radio-group>
         </div>
         <div v-if="addOption === 'product'">
            <v-row>
               <v-text-field
                  class="custom-label-color ml-3"
                  label="Nombre del Producto *"
                  required
                  :rules="nameRules"
                  :maxlength="maxLengthName"
                  v-model="name"
                  key="product-name"
                  @keyup="$emit('update:name', name)"
               ></v-text-field>
            </v-row>
            <v-row>
               <v-textarea
                  name="descripcion"
                  label="Descripción"
                  class="ml-3"
                  v-model="description"
                  :maxlength="maxLengthDescription"
                  key="product-description"
                  @keyup="$emit('update:description', description)"
               ></v-textarea>
            </v-row>
            <v-row>
               <v-select
                  :items="categoryOptionsProd"
                  item-text="name"
                  item-value="id"
                  required
                  :rules="categoryRules"
                  v-model="categorySelected"
                  label="Categoría*"
                  class="custom-field ml-3"
                  key="product-category"
                  @input="$emit('update:categorySelected', categorySelected)"
               >
               </v-select>
            </v-row>
            <v-row justify="d-flex justify-space-around">
               <v-col cols="6">
                  <v-text-field
                     class="price"
                     label="Precio Unitario (S/)*"
                     type="number"
                     required
                     :rules="priceRules"
                     step="0.01"
                     min="0"
                     v-model="price"
                     key="product-price"
                     @change="$emit('update:price', price)"
                  ></v-text-field>
               </v-col>
               <v-col cols="6">
                  <v-text-field
                     label="Stock*"
                     type="number"
                     required
                     :rules="stockRules"
                     min="0"
                     step="1"
                     v-model="stock"
                     @change="$emit('update:stock', stock)"
                  ></v-text-field>
                  <!--<label>Stock</label>
            <number-input
               v-model="value"
               :min="0"
               :max="1000"
               inline
               center
               controls
               placeholder="Stock"
            ></number-input>-->
               </v-col>
            </v-row>
         </div>
         <div v-else>
            <v-row>
               <v-text-field
                  class="custom-label-color ml-3"
                  label="Nombre del Servicio *"
                  v-model="name"
                  required
                  :rules="nameRules"
                  key="service-name"
                  @keyup="$emit('update:name', name)"
               ></v-text-field>
            </v-row>
            <v-row>
               <v-textarea
                  name="descripcion"
                  label="Descripción"
                  class="ml-3"
                  v-model="description"
                  key="service-description"
                  @keyup="$emit('update:description', description)"
               ></v-textarea>
            </v-row>
            <v-row>
               <v-select
                  :items="categoryOptionsServ"
                  item-text="name"
                  item-value="id"
                  required
                  :rules="categoryRules"
                  v-model="categorySelected"
                  label="Categoría*"
                  class="custom-field ml-3"
                  key="service-category"
                  @input="$emit('update:categorySelected', categorySelected)"
               >
               </v-select>
            </v-row>
            <v-row justify="d-flex justify-space-around">
               <v-col cols="6">
                  <v-text-field
                     class="price"
                     label="Precio Unitario (S/)*"
                     type="number"
                     required
                     :rules="priceRules"
                     step="0.01"
                     min="0"
                     v-model="price"
                     key="service-price"
                     @change="$emit('update:price', price)"
                  ></v-text-field>
               </v-col>
               <v-col
                  cols="6"
                  align-self="center"
                  class="d-flex justify-center"
               >
                  <v-switch
                     v-model="stockService"
                     :label="stockService ? 'Disponible' : 'No disponible'"
                     @change="$emit('update:stockService', stockService)"
                  ></v-switch>
               </v-col>
            </v-row>
         </div>
      </v-form>
   </v-container>
</template>

<style scoped src="../styles/ProductRegistration.css"></style>

<script>
import Vue from "vue";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import * as productRegisterDA from "../dataAccess/productRegisterDA";
/*import { required, minLength, between } from "vuelidate/lib/validators";*/
Vue.component(VueNumberInput.name, VueNumberInput);
export default {
   props: ["idParent"],
   created() {
      productRegisterDA.getAllCategories("P").then(responseData => {
         this.categoryOptionsProd = responseData;
      });
      productRegisterDA.getAllCategories("S").then(responseData => {
         this.categoryOptionsServ = responseData;
      });
      if (this.idParent !== -1) {
         productRegisterDA.getItemById(this.idParent).then(response => {
            if (response !== {}) {
               if (response.body.productService.type === "P") {
                  this.addOption = "product";
                  this.stock = response.body.productService.stock;
               } else {
                  this.addOption = "service";
                  this.stockService = response.body.productService.stock === 1;
               }
               this.name = response.body.productService.name;
               this.categorySelected = response.body.productService.category.id;
               this.price = response.body.productService.price;
               //this.parentImageList = response.body.productService.images;
               this.description = response.body.productService.description;
            }
         });
      }
   },
   data() {
      return {
         addOption: "product",
         name: "",
         maxLengthName: 50,
         maxLengthDescription: 512,
         nameRules: [v => !!v || "El nombre es un campo requerido"],
         categoryRules: [v => !!v || "La categoría es un campo requerido"],
         priceRules: [
            v => !!v || "El precio es un campo requerido",
            v => v > 0 || "El precio debe ser positivo"
         ],
         stockRules: [
            v => (v === 0 ? true : !!v) || "El stock es un campo requerido",
            v => v >= 0 || "El stock debe ser mayor o igual a cero",
            v => this.validateStock(v) || "El stock debe ser un número entero"
         ],
         description: "",
         categoryOptionsProd: [
            { name: "Ropa", id: 1, description: "category test 1", type: "P" },
            {
               name: "Calzado",
               id: 2,
               description: "category test 2",
               type: "P"
            },
            {
               name: "Tecnología",
               id: 3,
               description: "category test 3",
               type: "P"
            },
            {
               name: "Música",
               id: 4,
               description: "category test 4",
               type: "P"
            }
         ],
         categoryOptionsServ: [
            {
               name: "Calzado",
               id: 1,
               description: "category test 2",
               type: "S"
            },
            {
               name: "Tecnología",
               id: 2,
               description: "category test 3",
               type: "S"
            },
            {
               name: "Música",
               id: 3,
               description: "category test 4",
               type: "S"
            }
         ],
         categorySelected: null,
         price: "",
         stock: "",
         valid: true,
         stockService: 0
      };
   },
   methods: {
      validate() {
         this.$refs.form.validate();
      },
      validateStock(stock) {
         if (/^[1-9]*[0-9]$/.test(stock)) {
            return true;
         } else {
            return false;
         }
      }
   }
};
</script>
