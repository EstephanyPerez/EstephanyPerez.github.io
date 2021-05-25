<template>
   <div>
      <v-card flat :disabled="edit" class="mt-5">
         <v-row>
            <v-col>
               <gmap-map
                  :center="location"
                  :zoom="mapzoom"
                  :mapTypeControl="false"
                  ref="gmap"
                  style="height: 550px; margin-left: 8px; margin-right: 8px"
               >
                  <gmap-marker :position="location" title="Ubicacion" :options="markerOptions" ref="gmarker" @drag="updateCoordinates"> </gmap-marker>
               </gmap-map>
            </v-col>
         </v-row>

         <v-row justify="center">
            <v-col cols="10" sm="4" align-md="3" lg="4" style="margin-left:0px">
               <v-text-field
                  v-model="info.latitude"
                  label="Latitud"
                  placeholder="Latitud"
                  prepend-icon="mdi-pencil"
                  offset-y
                  filled
                  disabled
                  :maxlength="7"
                  type="number"
                  min-width="290px"
               ></v-text-field>
            </v-col>
            <v-col cols="10" sm="4" align-md="3" lg="4" style="margin-left:0px">
               <v-text-field
                  v-model="info.longitude"
                  label="Longitud"
                  placeholder="Longitud"
                  prepend-icon="mdi-pencil"
                  offset-y
                  filled
                  disabled
                  :maxlength="7"
                  type="number"
                  min-width="290px"
               ></v-text-field>
            </v-col>
         </v-row>
      </v-card>
   </div>
</template>

<script>
import * as VueGoogleMaps from "vue2-google-maps";
import Vue from "vue";
Vue.use(VueGoogleMaps, {
   load: {
      key: process.env.VUE_APP_API_KEY_GOOGLE_MAPS
   }
});
export default {
   name: "ProfileLocation",
   props: ["edit", "info"],
   data() {
      return {
         location: {
            lat: this.$props.info.latitude,
            lng: this.$props.info.longitude
         },
         coordinates: null,
         markerOptions: {
            //Opciones predeterminadas de cada marcador
            clickable: true,
            draggable: true,
            visible: true
         },
         mapzoom: 16
      };
   },
   methods: {
      updateCoordinates(location) {
         this.coordinates = {
            lat: location.latLng.lat(),
            lng: location.latLng.lng()
         };
         this.$props.info.longitude = this.coordinates.lng;
         this.$props.info.latitude = this.coordinates.lat;
      }
   }
};
</script>
<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
   -webkit-appearance: none;
   margin: 0;
}
</style>
