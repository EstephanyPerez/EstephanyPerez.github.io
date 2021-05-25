<template>
   <div>
      <Navbar></Navbar>
      <v-row>
         <v-col cols="2">
            <Sidebar></Sidebar>
         </v-col>
         <v-col cols="1"> </v-col>
         <v-col cols="9">
            <v-container>
               <h1>{{ event.event.name }}</h1>
               <v-row>
                  <p>¿Inscripciones abiertas?</p>
                  <v-switch
                     v-if="switchInscriptions"
                     class="v-input--reverse mt-0 pt-0"
                     v-model="switchInscriptions"
                     color="primary"
                     hide-details
                     label="Sí"
                  ></v-switch>
                  <v-switch v-else class="v-input--reverse mt-0 pt-0" v-model="switchInscriptions" color="primary" hide-details label="No"></v-switch>
               </v-row>

               <Step3NewEvent></Step3NewEvent>
            </v-container>
         </v-col>
      </v-row>
   </div>
</template>

<style scoped src="../styles/OpenInscriptions.css"></style>
<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import Step3NewEvent from "@/components/Step3NewEvent.vue";
import "sweetalert2/dist/sweetalert2.min.css";
import { mapState } from "vuex";

export default {
   name: "OpenInscriptions",
   components: {
      Sidebar,
      Navbar,
      Step3NewEvent
   },
   data() {
      return {
         switchInscriptions: false
      };
   },
   computed: {
      ...mapState(["event"])
   }
};
</script>
