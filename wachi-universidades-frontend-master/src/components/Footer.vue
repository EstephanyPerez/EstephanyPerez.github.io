<template>
   <v-content>
      <v-footer
         height="100"
         width="auto"
         :style="{
            backgroundColor: this.generalConfig.mainColor + ' !important'
         }"
      >
         <v-row justify="center">
            <v-col class="text-center" cols="12">
               <h3 style="color: white">2FLOCK © {{ new Date().getFullYear() }} — Todos los derechos reservados</h3>
            </v-col>
         </v-row>
      </v-footer>
   </v-content>
</template>

<script>
import { mapState } from "vuex";

export default {
   name: "Footer",

   computed: {
      ...mapState(["generalConfig"])
   },

   data() {
      return {};
   },

   methods: {}
};
</script>

<style></style>
