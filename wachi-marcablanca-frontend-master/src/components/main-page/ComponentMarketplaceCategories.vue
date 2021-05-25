<template>
   <v-main>
      <v-card id="cardColor" outlined tile color="#F6F6F6">
         <v-row justify="center">
            <h2>Categorías</h2>
         </v-row>
         <v-row
            justify="center"
            class="hidden-md-and-down"
            v-if="allCategories.length != 0"
         >
            <v-carousel hide-delimiters class="carousel" height="400">
               <v-carousel-item
                  v-for="i in nPages"
                  :key="'v-carousel-item' + i"
                  class="carousel-item"
               >
                  <v-row
                     v-if="allCategories.length > (i - 1) * 8"
                     justify="center"
                  >
                     <v-col v-for="j in 4" :key="j" cols="2">
                        <MarketplaceCategoryCard
                           :dataCategory="allCategories[(i - 1) * 8 + j - 1]"
                        />
                     </v-col>
                  </v-row>
                  <v-row
                     v-if="allCategories.length > (i - 1) * 8 + 4"
                     justify="center"
                  >
                     <v-col v-for="j in 4" :key="j" cols="2">
                        <MarketplaceCategoryCard
                           :dataCategory="
                              allCategories[(i - 1) * 8 + j - 1 + 4]
                           "
                        />
                     </v-col>
                  </v-row>
               </v-carousel-item>
            </v-carousel>
         </v-row>
         <v-row
            justify="center"
            class="hidden-lg-and-up"
            v-if="allCategories.length != 0"
         >
            <v-slide-group
               mobile-breakpoint="1000"
               show-arrows
               center-active
               class="pa-4 pt-0"
            >
               <v-row justify="center">
                  <v-slide-item v-for="(category, i) in allCategories" :key="i">
                     <v-hover v-slot:default="{ hover }" open-delay="200">
                        <v-card
                           :elevation="hover ? 16 : 2"
                           width="180"
                           class="ma-4"
                           height="160"
                        >
                           <v-card-title class="pt-2 pr-2 pl-2 pb-2">
                              <v-img
                                 height="80"
                                 contain
                                 :src="
                                    'data:image/jpeg;base64,' + category.image
                                 "
                              >
                              </v-img>
                           </v-card-title>
                           <v-divider></v-divider>
                           <v-card-text class="text-center pt-2 pb-3">
                              <h4>{{ category.name }}</h4>
                           </v-card-text>
                        </v-card>
                     </v-hover>
                  </v-slide-item>
               </v-row>
            </v-slide-group>
         </v-row>
      </v-card>
   </v-main>
</template>

<script>
import { mapState } from "vuex";
import MarketplaceCategoryCard from "@/components/main-page/MarketplaceCategoryCard.vue";
import * as marketplaceDA from "@/dataAccess/productRegisterDA.js";

export default {
   name: "ComponentMarketplaceCategories",
   components: {
      MarketplaceCategoryCard
   },
   data() {
      return {
         nPages: 0,
         perPage: 8, //constante
         allCategories: []
      };
   },
   computed: {
      ...mapState([
         "multiCardConfig",
         "generalConfig",
         "c_editComponent1",
         "c_editComponent2",
         "c_editComponent3"
      ])
   },
   methods: {},
   created() {
      marketplaceDA.getAllCategoriesWithImg().then(res => {
         this.allCategories = res.data.body;
         this.nPages = Math.ceil(this.allCategories.length / this.perPage);
      });
   },
   mounted() {},
   updated() {}
};
</script>
