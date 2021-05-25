<template>
   <v-container>
      <v-card-actions>
         <ProductServiceDetail
            :idParent="parentId"
            @setLoadPage="setLoadPage"
         ></ProductServiceDetail>
      </v-card-actions>
      <div v-if="!loadPage">
         <v-divider></v-divider>
         <v-card-title class="pb-1">También te pueden gustar</v-card-title>
         <CarosuelProduct
            :idPublication="parentId"
            @setLoadPage="setLoadPage"
         ></CarosuelProduct>
         <v-divider></v-divider>
         <v-card-title class="pb-1">Preguntas y respuestas</v-card-title>
         <v-card-actions class="pb-0"
            ><AskAQuestion :idPublication="parentId"></AskAQuestion
         ></v-card-actions>
         <v-card-title class="pb-1 pt-0">Ultimas preguntas</v-card-title>
         <v-card-actions class="pb-5">
            <CardQuestionAnswer :idPublication="parentId"></CardQuestionAnswer
         ></v-card-actions>
      </div>
   </v-container>
</template>

<style scoped src="../styles/ProductRegistration.css"></style>
<script>
import CarosuelProduct from "@/components/CarosuelProduct.vue";
import CardQuestionAnswer from "@/components/CardQuestionAndAnswer.vue";
import ProductServiceDetail from "@/components/ProductServiceDetail.vue";
import AskAQuestion from "@/components/AskAQuestion.vue";

export default {
   name: "ProductServicePrincipalDetail",
   components: {
      ProductServiceDetail,
      CarosuelProduct,
      CardQuestionAnswer,
      AskAQuestion
   },
   data() {
      return {
         parentId: -1,
         loadPage: false
      };
   },
   watch: {
      "$route.params": function() {
         this.$router.go(0);
      }
   },
   created: function() {
      this.loadPage = true;

      try {
         let urlParams = "?" + atob(this.$route.params.pid);
         let regex = /[?&]([^=#]+)=([^&#]*)/g;
         let objParams = {};
         let match;
         while((match = regex.exec(urlParams))) {
            objParams[match[1]] = match[2];
         }

         this.parentId = objParams.productId;
      } catch (error) {
         console.log("Error Decode: ", error);
      } finally {
         if(this.parentId == -1) {
            this.$router.push({name: "HomeMarketplace"});
         }
      }

   },
   mounted() {},
   methods: {
      setLoadPage(val) {
         this.loadPage = val;
      }
   }
};
</script>
