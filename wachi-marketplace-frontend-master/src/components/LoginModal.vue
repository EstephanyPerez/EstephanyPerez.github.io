<template>
   <v-container class="pa-0">
      <v-dialog v-model="show" width="900" class="pa-0">
         <!--:fullscreen="$vuetify.breakpoint.xsOnly"-->
         <v-card>
            <v-alert
               dark
               prominent
               type="primary"
               icon="mdi-information-variant"
               class="my-0"
            >
               Para agregar productos/servicios al carrito, es necesario iniciar
               sesión.
            </v-alert>
            <v-container class="ma-0 py-0">
               <LoginView :view="view" :params="params"></LoginView>
               <!--TODO: verificar que funcione-->
            </v-container>
         </v-card>
      </v-dialog>
   </v-container>
</template>

<script>
import { bus } from "../main";
import LoginView from "../views/Login";

export default {
   name: "LoginModal",
   components: {
      LoginView
   },
   // props: ["view", "params"],
   data: () => ({
      view: "",
      params: "",
      show: false
   }),
   created() {
      bus.$on("loginModal", val => {
         this.view = val.view;
         this.params = val.params;
         this.show = val.show;
      });
   }
};
</script>
