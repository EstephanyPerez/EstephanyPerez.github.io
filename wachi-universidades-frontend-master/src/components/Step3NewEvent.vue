<template>
   <div>
      <div>
         <v-row>
            <v-col cols="7">
               <h4 :style="styleColor">Información General</h4>
               <br />
               <div style="margin-left: 15px">
                  <p class="list"><b> Nombre del Evento:</b> {{ event.event.name }}</p>
                  <p class="list"><b>Descripción:</b> {{ event.event.description }}</p>
                  <p class="list"><b>Fecha de Inicio:</b> {{ event.event.startDate }}</p>
                  <p class="list"><b>Fecha de Fin:</b> {{ event.event.endDate }}</p>
                  <p class="list">
                     <b>Mínimo de Integrantes por Grupo:</b>
                     {{ event.event.minPerGroup }}
                  </p>
                  <p class="list">
                     <b>Máximo de Integrantes por Grupo:</b>
                     {{ event.event.maxPerGroup }}
                  </p>
               </div>
            </v-col>
            <v-col :style="styleObject" cols="4">
               <v-img :src="generalConfig.logo"></v-img>
            </v-col>
         </v-row>
      </div>
      <h4 :style="styleColor">Universidades e Instituciones</h4>
      <br />
      <v-treeview :items="this.heis" item-children="courses" open-on-click expand-icon="mdi-plus-circle" on-icon="mdi-calendar"></v-treeview>
   </div>
</template>
<style scoped src="../styles/Step3NewEvent.css"></style>
<script>
import { mapState } from "vuex";
export default {
   computed: {
      ...mapState(["event", "generalConfig", "style"]),
   },
   data() {
      return {
         heis: [],
         color: "FFFF",
         styleObject: {
            padding: "1%",
            width: "70em",
            margin: "3% auto",
         },
         styleColor: {
            color: " FFFF",
         },
      };
   },
   beforeMount() {
      this.color = this.style.style.colors.primary;
      this.styleObject.backgroundColor = this.style.style.colors.primary;
      this.styleColor.color = this.style.style.colors.primary;
   },
   methods: {
      funcion() {
         for (let i = 0; i < this.event.event.heis.length; i++) {
            this.heis.push({
               name: this.event.event.heis[i].name,
               courses: this.event.event.heis[i].units,
            });
         }

         console.log(this.heis);
      },
   },
};
</script>
