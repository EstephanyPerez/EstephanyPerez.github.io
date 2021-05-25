<template>
   <v-slide-group
      mobile-break-point="1000"
      show-arrows
      center-active
      class="pa-4 pt-0"
   >
      <v-slide-item
         v-for="(relatedPublication, i) in relatedPublications"
         :key="i"
      >
         <v-hover v-slot:default="{ hover }">
            <v-card
               :elevation="hover ? 16 : 2"
               width="160"
               class="ma-4"
               height="280"
               @click="viewDetail(relatedPublication.id)"
            >
               <v-card-title class="pt-2 pr-2 pl-2 pb-2">
                  <v-img height="160" contain :src="relatedPublication.imgURL">
                     <div
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal"
                        style="height: 100%"
                        v-if="relatedPublication.stock === outOfStock"
                     >
                        <v-btn class="" outlined>Agotado</v-btn>
                     </div>
                  </v-img>
               </v-card-title>
               <v-divider></v-divider>
               <v-card-text class="text-center pt-2 pb-3">
                  <h4 class="publication-title">
                     {{ relatedPublication.name }}
                  </h4>
                  <h3
                     class="publication-price mt-3"
                     v-if="relatedPublication.stock !== outOfStock"
                  >
                     S/ {{ relatedPublication.price.toFixed(2) }}
                  </h3>
               </v-card-text>
            </v-card>
         </v-hover>
      </v-slide-item>
   </v-slide-group>
</template>

<style scoped src="../styles/ProductServiceDetail.css"></style>

<script>
import * as listProductDA from "../dataAccess/listProductDA";
import { mapGetters } from "vuex";

export default {
   props: ["idPublication"],
   watch: {
      "$route.params.pid": function() {
         this.doStuff(this.idPublication);
      }
   },
   data: () => ({
      relatedPublications: [],
      publicationID: 1,
      id: null,
      outOfStock: 0
   }),
   created: function() {
      this.doStuff(this.idPublication);
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      doStuff(id) {
         this.retrieveRelatedPublications();
         if (this.getUser().session.authenticated)
            console.log("Id publicacion", id, "userId", this.getUser().data.id);
      },
      retrieveRelatedPublications() {
         if (this.getUser().session.authenticated) {
            listProductDA
               .getRelatedPublicationsByPublicationID(
                  this.idPublication,
                  this.getUser().data.id
               )
               .then(res => (this.relatedPublications = res));
         } else {
            listProductDA
               .getRelatedPublicationsByPublicationID(this.idPublication, -1)
               .then(res => (this.relatedPublications = res));
         }
      },
      viewDetail(id) {
         this.$emit("setLoadPage", true);
         if (!this.getUser().session.authenticated) {
            this.$router.push({
               name: "ProductServicePrincipalDetail",
               params: {
                  pid: btoa("productId="+ id)
               }
            });
         } else {
            this.$router.push({
               name: "ProductServicePrincipalDetail-loggued",
               params: {
                  pid: btoa("productId="+ id)
               }
            });
         }
      }
   },
   mounted() {}
};
</script>
<style>
.v-card--reveal {
   align-items: center;
   bottom: 0;
   justify-content: center;
   opacity: 0.8;
   position: absolute;
   width: 100%;
}
</style>
