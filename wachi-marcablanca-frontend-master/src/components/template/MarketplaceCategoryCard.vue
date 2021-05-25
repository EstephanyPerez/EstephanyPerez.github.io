<template>
   <v-col
      xl="1"
      lg="2"
      md="3"
      sm="4"
      cols="12"
      :style="{ padding: '0px 0px' }"
      no-gutters
   >
      <v-card
         class="border-0"
         :style="{ padding: '8px', margin: '0px', textAlign: 'center' }"
         @click="goToCategory"
      >
         <v-row>
            <v-col>
               <v-avatar size="56">
                  <img alt="logo-team" :src="dataCategory.avatar" />
               </v-avatar>
            </v-col>
         </v-row>
         <v-row>
            <v-card-text :style="{ fontSize: '.9rem' }" class="mb-2 pa-0"
               >{{ dataCategory.name }}
            </v-card-text>
         </v-row>

         <!--v-row>
            <v-col style="text-align:center" class="pa-1 mb-1">
               <v-btn
                  outlined
                  color="indigo"
                  class="ma-2 white--text"
                  small
                  elevation="2"
                  @click="goToCategory"
                  :style="{
                     backgroundColor: generalConfig.mainColor + ' !important',
                     color: generalConfig.colorText + ' !important'
                  }"
               >
                  Ver perfil
               </v-btn>
            </v-col>
         </v-row-->
      </v-card>
   </v-col>
</template>

<script>
import { mapState } from "vuex";

export default {
   name: "MarketplaceCategoryCard",
   props: ["dataCategory"],
   data() {
      return {};
   },
   methods: {
      goToCategory() {
         console.log("Me fui");
      }
   },
   mounted() {
      console.log("this.dataCategory: ", this.dataCategory);
   },
   computed: {
      ...mapState(["generalConfig"])
   },
   created() {}
};
</script>
