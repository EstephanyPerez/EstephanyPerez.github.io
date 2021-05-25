<template>
   <v-card
      light
      style="textAlign: center; min-width: 75px; max-width: 12vw;"
      @click="goToCategory()"
      v-if="dataCategory != undefined"
      height="180"
      width="10vw"
   >
      <v-card-title class="pt-2 pr-2 pl-2 pb-2">
         <v-img
            height="90"
            contain
            :src="'data:image/jpeg;base64,' + dataCategory.image"
         >
         </v-img>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="text-center pt-2 pl-3">
         <h4>{{ dataCategory.name }}</h4>
      </v-card-text>
   </v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
   name: "MarketplaceCategoryCard",
   props: ["dataCategory"],
   data() {
      return {};
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      goToCategory() {
         console.log("Me fui");
         if (!this.getUser().session.authenticated) {
            this.$router.push({
               name: "ListProduct",
               params: {
                  categorySelected: this.dataCategory
               }
            });
         } else {
            this.$router.push({
               name: "ListProduct-loggued",
               params: {
                  categorySelected: this.dataCategory
               }
            });
         }

         /*let nameAux = "ListProduct";
         if (this.idUser !== 0 ) {
            nameAux = "ListProduct-loggued"
         }
         this.$router.push({
            name: nameAux,
            params: {
               categorySelected: this.dataCategory
            }
         });*/
      }
   },
   mounted() {},
   computed: {
      ...mapState(["generalConfig", "cart", "idUser"])
   },
   created() {}
};
</script>
