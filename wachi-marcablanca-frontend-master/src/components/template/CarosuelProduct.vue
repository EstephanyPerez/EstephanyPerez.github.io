<template>
   <v-slide-group
      mobile-breakpoint="1000"
      show-arrows
      center-active
      class="pa-4 pt-0"
   >
      <v-slide-item
         v-for="(relatedPublication, i) in relatedPublications"
         :key="i"
      >
         <v-hover v-slot:default="{ hover }" open-delay="200">
            <v-card
               :elevation="hover ? 16 : 2"
               width="160"
               class="ma-4"
               height="280"
               @click="viewDetail(relatedPublication.id)"
            >
               <v-card-title class="pt-2 pr-2 pl-2 pb-2">
                  <v-img height="160" contain :src="relatedPublication.imgURL">
                  </v-img>
               </v-card-title>
               <v-divider></v-divider>
               <v-card-text class="text-center pt-2 pb-3">
                  <h4 class="publication-title">
                     {{ relatedPublication.name }}
                  </h4>
                  <h3 class="publication-price mt-3">
                     S/ {{ relatedPublication.price.toFixed(2) }}
                  </h3>
               </v-card-text>
            </v-card>
         </v-hover>
      </v-slide-item>
   </v-slide-group>
</template>

<style scoped src="@/styles/Component/ProductServiceDetail.css"></style>

<script>
//import * as listProductDA from "../dataAccess/listProductDA";
export default {
   //props: ["idPublication"],
   watch: {
      "$route.params.pid": function() {
         console.log("estas en watch");
         this.doStuff(this.idPublication);
      }
   },
   data: () => ({
      relatedPublications: [],
      publicationID: 1,
      id: null
   }),
   beforeCreate() {
      /*console.log("before create: idpublicacion", this.idPublication);
      listProductDA
         .getRelatedPublicationsByPublicationID(this.idPublication)
         .then(res => {
            //aqui cambie
            this.relatedPublications = res;
            console.log(this.publicationID);
         });*/
   },
   created: function() {
      this.doStuff(this.idPublication);
   },
   methods: {
      doStuff(id) {
         this.retrieveRelatedPublications();
         console.log("Id publicacion", id);
      },
      retrieveRelatedPublications() {
         /* listProductDA
            .getRelatedPublicationsByPublicationID(this.idPublication)
            .then(res => (this.relatedPublications = res));*/
      },
      viewDetail(id) {
         console.log("id del producto relacionado", id);
         /*this.$router
            .push({
               name: "ProductServicePrincipalDetail",
               params: {
                  pid: id
               }
            })
            .catch(err => err);*/
      }
   },
   mounted() {}
};
</script>
