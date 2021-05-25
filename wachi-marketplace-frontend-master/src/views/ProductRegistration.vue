<template>
   <div>
      <v-row>
         <v-col cols="12" class="marginTop">
            <v-row>
               <v-col md="6" offset-md="3">
                  <v-container>
                     <v-stepper v-model="stepView">
                        <v-stepper-header class="mx-auto">
                           <v-stepper-step
                              :complete="stepView > 1"
                              :step="1"
                              color="#1867C0"
                              editable
                           >
                              Información general
                           </v-stepper-step>

                           <v-divider></v-divider>

                           <v-stepper-step
                              :complete="stepView > 2"
                              :step="2"
                              color="#1867C0"
                           >
                              Fotos
                           </v-stepper-step>
                        </v-stepper-header>

                        <v-stepper-items>
                           <v-stepper-content step="1">
                              <ProductRegistrationStep1
                                 :name.sync="parentName"
                                 :categorySelected.sync="parentCategory"
                                 :price.sync="parentPrice"
                                 :stock.sync="parentStock"
                                 :addOption.sync="parentAddOption"
                                 :description.sync="parentDescription"
                                 :idParent="parentId"
                                 :stockService.sync="stockService"
                                 ref="validateForm"
                              ></ProductRegistrationStep1>
                              <v-row>
                                 <v-col cols="6" class="button-row">
                                    <v-btn
                                       :style="{
                                          color:
                                             generalConfig.mainColor +
                                             ' !important'
                                       }"
                                       class="cancel-button"
                                       @click="$router.go(-1)"
                                    >
                                       Cancelar
                                    </v-btn>
                                 </v-col>
                                 <v-col cols="6" class="button-row">
                                    <v-btn
                                       :style="{
                                          backgroundColor:
                                             generalConfig.mainColor +
                                             ' !important',
                                          color: 'white !important'
                                       }"
                                       class="continue-button"
                                       @click="validateForm()"
                                    >
                                       Continuar
                                    </v-btn>
                                 </v-col>
                              </v-row>
                           </v-stepper-content>

                           <v-stepper-content step="2">
                              <Step2AddProduct
                                 :addOption="parentAddOption"
                                 :passImg="parentImageList"
                                 :passParentId="parentId"
                                 @pass-images="passImages"
                              ></Step2AddProduct>
                              <v-row>
                                 <v-col cols="6" class="button-row">
                                    <v-btn
                                       class="cancel-button"
                                       @click="goBack()"
                                    >
                                       Anterior
                                    </v-btn>
                                 </v-col>
                                 <v-col cols="6" class="button-row">
                                    <v-btn
                                       color="#1867C0"
                                       class="continue-button"
                                       @click="finishCreation()"
                                       :disabled="loading"
                                    >
                                       Finalizar
                                    </v-btn>
                                 </v-col>
                              </v-row>
                           </v-stepper-content>
                        </v-stepper-items>
                     </v-stepper>
                  </v-container>
               </v-col>
            </v-row>
         </v-col>
      </v-row>
   </div>
</template>

<style scoped src="../styles/ProductRegistration.css"></style>
<script>
import ProductRegistrationStep1 from "@/components/ProductRegistrationStep1.vue";
import Step2AddProduct from "@/components/Step2AddProduct.vue";
import * as productRegisterDA from "../dataAccess/productRegisterDA";
import { mapState, mapGetters } from "vuex";
export default {
   name: "ProductRegistration",
   components: {
      ProductRegistrationStep1,
      Step2AddProduct
   },
   data() {
      return {
         stepView: 1,
         parentAddOption: "product",
         parentName: "",
         parentCategory: null,
         parentPrice: "",
         parentStock: null,
         parentImageList: [],
         parentDescription: "",
         parentId: -1,
         prodServId: -1,
         stockService: null,
         loading: false
      };
   },
   created() {
      this.parentId = this.$route.params.pid;
   },
   mounted() {
      if (this.parentId !== -1) {
         productRegisterDA.getItemById(this.parentId).then(response => {
            if (response !== {}) {
               if (response.body.productService.type === "P") {
                  this.parentAddOption = "product";
                  this.parentStock = response.body.productService.stock;
               } else {
                  this.parentAddOption = "service";
                  //this.parentStock = null;
                  this.stockService = response.body.productService.stock === 1;
               }
               this.parentName = response.body.productService.name;
               this.parentCategory = response.body.productService.category.id;
               this.parentPrice = response.body.productService.price;
               this.parentImageList = response.body.productService.images.map(
                  function(img) {
                     return "data:image/jpeg;base64," + img;
                  }
               );
               this.parentDescription =
                  response.body.productService.description;
               this.prodServId = response.body.productService.id;
            }
         });
      }
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      finishCreation() {
         this.loading = true;
         productRegisterDA
            .createOrEditProdServ(this.$data, this.getUser().data.id)
            .then(response => {
               console.log(response);
               this.loading = false;
               this.$router.push("/myPublications");
            });
      },
      validateForm() {
         console.log("Valida esto: ", this.$data);
         this.$refs.validateForm.validate();
         if (this.parentAddOption === "product") {
            if (
               this.parentName !== "" &&
               this.parentPrice !== "" &&
               this.parentCategory != null &&
               this.parentStock != null &&
               this.parentPrice > 0 &&
               this.parentStock >= 0 &&
               /^[1-9]*[0-9]$/.test(this.parentStock)
            ) {
               this.stepView = 2;
            }
         } else {
            if (
               this.parentName !== "" &&
               this.parentPrice !== "" &&
               this.parentCategory != null &&
               this.parentPrice > 0
            ) {
               //this.parentStock = null;
               this.stepView = 2;
            }
         }
      },
      goBack() {
         this.stepView = 1;
      },
      passImages(fileList) {
         console.log("Se pasaon imgs a ProductRegistration.vue", fileList);
         var files = fileList.map(function(f) {
            return f.path;
         });
         this.parentImageList = files;
      }
   },
   computed: {
      ...mapState(["cart", "idUser", "generalConfig"])
   }
};
</script>
