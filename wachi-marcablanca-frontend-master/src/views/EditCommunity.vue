<template>
   <div class="main-container">
      <Navbar />

      <v-card class="ma-4 pa-4" elevation="0">
         <ToolbarEdit :onChangeItemNavBar="onChangeItemNavBar" />
         <v-card class="mx-auto ma-5" max-width="100%" elevation="0">
            <div v-if="!this.loading">
               <div v-if="itemNavBar.localeCompare('editMaingPage') === 0">
                  <Template
                     :flagToUpdate="flagToUpdate"
                     v-if="itemNavBar.localeCompare('editMaingPage') === 0"
                  />
               </div>
               <div v-if="itemNavBar.localeCompare('editLogin') === 0">
                  <EditLogin
                     :datos="edit"
                     :flagToUpdate="flagToUpdate"
                     v-if="itemNavBar.localeCompare('editLogin') === 0"
                  />
               </div>
               <div v-if="itemNavBar.localeCompare('editDatosComunidad') === 0">
                  <DataView
                     :datos="edit"
                     :flagToUpdate="flagToUpdate"
                     v-if="itemNavBar.localeCompare('editDatosComunidad') === 0"
                  />
               </div>
            </div>
            <div v-if="this.loading">
               {{ textLoading }}
            </div>
         </v-card>
      </v-card>
      <Footer />
   </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import ToolbarEdit from "@/components/template/ToolbarEdit";
import { mapActions } from "vuex";
import Template from "@/components/template/Template";
import EditLogin from "@/components/template/EditLogin";
import DataView from "@/components/template/DataView";
import * as homepageDA from "@/dataAccess/home-page.js";

export default {
   name: "EditCommunity",
   components: {
      Footer,
      ToolbarEdit,
      EditLogin,
      Template,
      DataView,
      Navbar
   },
   data() {
      return {
         loading: true,
         textLoading: "Los datos estan cargando ....",
         itemNavBar: "editDatosComunidad",
         flagToUpdate: true,
         edit: {
            colores: {
               primario: "",
               secundario: "",
               texto: "#000000"
            },
            inicio_registro: {
               texto: "Ingrese su texto aca",
               imagen: ""
            }
         }
      };
   },
   created() {
      this.loading = false;
      this.getBluePrintDataCommunity();
      this.edit.colores.primario = this.generalConfig.mainColor;
      this.edit.colores.secundario = this.generalConfig.secondaryColor;
      this.edit.colores.texto = this.generalConfig.colorText;
      this.edit.inicio_registro.texto = this.generalConfig.loginText;
      this.edit.inicio_registro.imagen = this.generalConfig.loginImage;
   },
   methods: {
      ...mapActions(["completeComponentsConfigurationToUpdate"]),
      onChangeItemNavBar(pos) {
         //console.log("SUPER GAAA. estoy cambiando", pos);
         this.itemNavBar = pos;
      },
      getBluePrintDataCommunity() {
         homepageDA
            .obtainHomepageConfiguration()
            .then(res => {
               console.log(res.data);
               if (res.data.status == "OK") {
                  this.completeComponentsConfigurationToUpdate(
                     res.data.payload
                  );
                  this.$forceUpdate();
               }
            })
            .catch(function(error) {
               console.log(error);
            });
      }
   },
   destroyed() {
      localStorage.removeItem("token");
   }
};
</script>
