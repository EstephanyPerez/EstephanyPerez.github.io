<template>
   <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <v-row>
         <v-col cols="3"> </v-col>
         <v-row>
            <v-col cols="7">
               <h1>HISTORIAL DE EVENTOS</h1>
            </v-col>
            <v-col v-if="events !== null" cols="3"> </v-col>
            <v-col v-else cols="3"></v-col>
         </v-row>
         <v-col offset="3" cols="9" v-if="events !== null">
            <v-layout class="events" v-for="(event, i) in events" :key="i">
               <v-flex xs12 sm9 offset-sm0>
                  <v-card class="cards">
                     <v-card-title primary-title>
                        <v-col cols="8">
                           <div>
                              <h2>{{ event.name }}</h2>
                           </div>
                           <div v-if="event.active">
                              <p class="mb-0">Activo</p>
                           </div>
                           <div v-else>
                              <p class="mb-0">Culminado</p>
                           </div>
                           <div>
                              <p class="mb-0">
                                 {{ event.startDate }}
                              </p>
                           </div>
                           <div>
                              <p class="mb-0">
                                 {{ event.endDate }}
                              </p>
                           </div>
                        </v-col>
                        <v-col cols="4">
                           <v-btn :color="color" large @click="eventDetail(event)"> Ver Detalle </v-btn>
                        </v-col>
                     </v-card-title>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-col>
         <v-col v-else cols="9">
            <h1>No hay Eventos</h1>
         </v-col>
      </v-row>
   </div>
</template>
<style scoped src="../styles/EventHistory.css"></style>
<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import * as EventDA from "@/dataAccess/eventDA.js";
import { mapState, mapActions } from "vuex";
export default {
   name: "EventHistory",
   components: {
      Sidebar,
      Navbar,
   },
   data() {
      return {
         color: "FFFF",
         events: [],
         eventHistoryDetailURL: "/eventHistoryDetail",
      };
   },
   methods: {
      ...mapActions({
         saveHistoryEventInformation: "event/saveHistoryEventInformation",
      }),
      eventDetail(event) {
         console.log("se dio doble click a", event.name);
         this.saveHistoryEventInformation(event);
         this.$router.push("/eventHistoryDetail");
      },
   },
   computed: {
      ...mapState(["community", "style"]),
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      EventDA.getEventHistory()
         .then((response) => {
            console.log("api de historico", response.data.payload);
            this.events = response.data.payload.reverse();
         })
         .catch((err) => {
            console.log("err", err.response.data);
         });
   },
};
</script>
