<template>
   <!-- START: BODY-CONTAINER -->
   <v-main>
      <v-card id="cardColor" outlined tile :color="generalConfig.mainColor">
         <!-- Title -->
         <v-row align="center" justify="center" class="row-margin">
            <v-col
               align="center"
               justify="center"
               cols="3"
               class="div_style_focus"
               :style="style_div_style_focus"
               id="div-titleC2"
            >
               <v-combobox
                  v-model="select"
                  :items="items.map(e => e.name)"
                  auto-select-first="true"
                  solo
                  hide-details
               ></v-combobox>
            </v-col>
            <v-col
               align="center"
               justify="center"
               cols="8"
               class="div_style_focus"
               :style="style_div_style_focus"
               id="div-titleC2"
            >
               <!--v-card class="pa-2 rounded-pill">
                  <v-text-field
                     label="Texto búsqueda"
                     single-line
                     hide-details
                     prepend-icon="mdi-magnify"
                     @input="filterSearch"
                  ></v-text-field>
               </v-card-->
               <v-card outlined class="rounded-pill" style="min-width: 124px">
                  <v-text-field
                     outlined
                     single-line
                     hide-details
                     label="Buscar"
                     prepend-inner-icon="mdi-magnify"
                     v-model="search"
                     v-on:keyup.enter="searchProductService()"
                  ></v-text-field>
               </v-card>
            </v-col>
            <!--v-btn
               color="green"
               fab
               absolute
               large
               dark
               top
               right
               @click="editComponent"
               :style="{ top: '20px', right: '20px' }"
            >
               <v-icon>mdi-pencil</v-icon>
            </v-btn-->
         </v-row>
      </v-card>
   </v-main>
</template>

<style src="@/styles/Component/Components.css" scoped></style>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import * as productRegisterDA from "../../dataAccess/productRegisterDA";

export default {
   name: "ComponentMarketplaceSearch",
   components: {},
   watch: {
      select: function(newVal) {
         //console.log(newVal);
         let index = this.items.map(e => e.name).indexOf(newVal);
         let category = this.items.splice(index, 1);
         this.goToListProductWithCategory(category[0]);
      }
   },
   data() {
      return {
         read_only: true,
         select: "Categoría",
         items: ["Categoría", "Precio", "Antigüedad"],
         search: ""
      };
   },
   mounted() {
      //console.log(this.multiCardConfig);
      productRegisterDA.getAllCategoriesWithImg().then(responseData => {
         this.items = responseData;
      });
   },
   computed: {
      ...mapState([
         "multiCardConfig",
         "generalConfig",
         "c_editComponent1",
         "c_editComponent2",
         "c_editComponent3",
         "cart",
         "idUser"
      ]),
      style_div_style_focus() {
         if (this.read_only) {
            return {
               "--div-outline--hover": "0px solid #03989A",
               "--div-outline--focus": "0px solid #03989A",
               "--text-color": this.generalConfig.mainColor
            };
         } else {
            return {
               "--div-outline--hover": "2px solid #03989A",
               "--div-outline--focus": "3px solid #03989A",
               "--text-color": this.generalConfig.mainColor
            };
         }
      }
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      ...mapActions([
         "editComponent1",
         "editComponent2",
         "editComponent3",
         "editComponentMarketplaceSearch"
      ]),
      editComponent() {
         console.log(this.multiCardConfig);
         if (this.c_editComponentMarketplaceSearh == true) {
            this.editComponentMarketplaceSearch(false);
            this.read_only = true;
         } else {
            this.editComponentMarketplaceSearch(true);
            this.editComponent1(false);
            this.editComponent2(false);
            this.editComponent3(false);
            this.read_only = false;
         }
      },
      blurElement(itemId) {
         document.getElementById(itemId).style.outline = "0px solid #03989A";
      },
      focusElement(itemId) {
         if (!this.read_only) {
            document.getElementById(itemId).style.outline = "3px solid #03989A";
         }
      },
      searchProductService() {
         if (!this.getUser().session.authenticated) {
            this.$router.push({
               name: "ListProduct",
               params: {
                  search: this.search
               }
            });
         } else {
            this.$router.push({
               name: "ListProduct-loggued",
               params: {
                  search: this.search
               }
            });
         }

         /*let nameAux = "ListProduct";
         if (this.idUser !== 0) {
            nameAux = "ListProduct-loggued";
         }
         this.$router.push({
            name: nameAux,
            params: {
               search: this.search
            }
         });*/
      },
      goToListProductWithCategory(category) {
         //console.log("Autenti", this.getUser().session.authenticated);
         if (!this.getUser().session.authenticated) {
            this.$router.push({
               name: "ListProduct",
               params: {
                  categorySelected: category
               }
            });
         } else {
            this.$router.push({
               name: "ListProduct-loggued",
               params: {
                  categorySelected: category
               }
            });
         }
         /*let nameAux = "ListProduct";
         if (this.idUser !== 0) {
            nameAux = "ListProduct-loggued";
         }
         this.$router.push({
            name: nameAux,
            params: {
               categorySelected: category
            }
         });*/
      }
   }
};
</script>
