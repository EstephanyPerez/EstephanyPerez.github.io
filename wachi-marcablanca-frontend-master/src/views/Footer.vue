<template>
   <v-container>
      <!-- START: FOOTER -->
      <v-footer padless>
         <v-row justify="center" no-gutters>
            <v-col class="primary  py-4 text-center white--text" cols="12">
               <strong>Wachi</strong> © {{ new Date().getFullYear() }} — Todos
               los derechos reservados
            </v-col>
         </v-row>
      </v-footer>
      <!-- FINISH: FOOTER -->
   </v-container>
</template>

<script>
//import { mapGetters } from "vuex";

export default {
   name: "Footer"
};
</script>
