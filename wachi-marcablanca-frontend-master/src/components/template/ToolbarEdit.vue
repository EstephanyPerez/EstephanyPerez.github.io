<template>
   <v-sheet elevation="0">
      <v-row justify="center">
         <v-slide-group
            v-model="model"
            :style="{ paddingTop: '7px' }"
            mandatory
            show-arrows
         >
            <v-slide-item v-slot="{}">
               <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                     <v-btn
                        color="white"
                        v-bind="attrs"
                        elevation="0"
                        v-on="on"
                     >
                        ACTUALIZAR MB
                     </v-btn>
                  </template>
                  <v-list>
                     <v-list-item link @click="onChangeItemNavBar('editLogin')">
                        <v-list-item-title>Editar Login</v-list-item-title>
                     </v-list-item>
                     <v-list-item
                        link
                        @click="onChangeItemNavBar('editMaingPage')"
                     >
                        <v-list-item-title
                           >Editar Página Principal</v-list-item-title
                        >
                     </v-list-item>
                  </v-list>
               </v-menu>
            </v-slide-item>
            <v-slide-item v-slot="{}">
               <v-btn
                  class="pt-4"
                  color="white"
                  elevation="0"
                  @click="onChangeItemNavBar('editDatosComunidad')"
               >
                  <p>DATOS COMUNIDAD</p>
               </v-btn>
            </v-slide-item>
         </v-slide-group>
      </v-row>
   </v-sheet>
</template>

<script>
export default {
   name: "ToolbarEdit",
   props: ["onChangeItemNavBar"],
   data: () => ({
      model: null,
      color: ""
   }),
   methods: {
      editarLogin() {
         this.onChangeItemNavBar("editLogin");
         this.color = "#AAAAAA";
      }
   }
};
</script>
