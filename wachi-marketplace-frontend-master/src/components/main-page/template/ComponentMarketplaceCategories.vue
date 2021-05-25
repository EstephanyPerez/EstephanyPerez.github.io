<template>
   <!-- START: BODY-CONTAINER -->
   <v-main>
      <v-card id="cardColor" outlined tile color="#F6F6F6">
         <!-- Title -->
         <v-row>
            <v-col class="bcont" cols="12">
               <h2>Categorías</h2>
            </v-col>
         </v-row>
         <v-row justify="center">
            <!-- START: CONTAINER-SEARCH >
            <v-col cols="12" sm="3" :style="{ paddingTop: '30px' }">
               <v-card outlined style="padding:10px; min-width:124px;">
                  <v-text-field
                     outlined
                     label="Buscar"
                     prepend-inner-icon="mdi-magnify"
                  ></v-text-field>
               </v-card>
            </v-col>
            <FINISH: CONTAINER-SEARCH AND FILTERS -->
            <!-- START: CONTAINER TEAMS -->
            <v-col cols="12" sm="11">
               <v-row class="row">
                  <div class="col-lg-12 pa-1">
                     <div class="row">
                        <MarketplaceCategoryCard
                           v-for="(MarketplaceCategoryCard,
                           pos) in categoriesSlice"
                           :dataCategory="MarketplaceCategoryCard"
                           :pos="pos"
                           :key="pos"
                        />
                     </div>
                  </div>
               </v-row>
            </v-col>
            <v-col cols="12" sm="9">
               <div class="text-center">
                  <v-pagination
                     v-model="page"
                     :length="nPages"
                     :total-visible="7"
                     @input="handlePageChange"
                  ></v-pagination>
               </div>
            </v-col>
            <!-- FINISH: CONTAINER TEAMS -->
         </v-row>
      </v-card>
   </v-main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MarketplaceCategoryCard from "@/components/main-page/MarketplaceCategoryCard.vue";

export default {
   name: "ComponentMarketplaceCategories",
   components: {
      MarketplaceCategoryCard
   },
   props: ["mainColor", "secondaryColor"],
   data() {
      return {
         page: 1,
         nPages: 10,
         perPage: 0
      };
   },
   computed: {
      ...mapState([
         "multiCardConfig",
         "generalConfig",
         "c_editComponent1",
         "c_editComponent2",
         "c_editComponent3",
         "categoriesSlice",
         "nCategories"
      ])
   },
   methods: {
      ...mapActions(["editComponentMarketplaceCategories", "getCategories"]),
      handlePageChange(value) {
         console.log("this.page: ", this.page, " ", value);
         this.getCategories({ perPage: this.perPage, page: value });
         console.log("this.categoriesSlice: ", this.categoriesSlice);
      }
   },
   created() {
      this.perPage = 8;
      this.nPages = Math.ceil(this.nCategories / this.perPage);
      this.getCategories({ perPage: this.perPage, page: this.page });
   },
   mounted() {
      console.log(
         "Slices seteados: " +
            this.categoriesSlice +
            " " +
            this.nCategories +
            " " +
            this.page
      );
   }
};
</script>
