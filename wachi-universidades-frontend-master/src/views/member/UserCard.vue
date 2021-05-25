<template>
   <v-col xl="3" lg="4" md="4" sm="5" cols="12" :style="{ padding: '0px 3px' }">
      <v-card class="mb-4 border-0" :style="{ padding: '8px', margin: '8px', textAlign: 'center' }">
         <v-row>
            <v-col>
               <v-avatar size="100" v-if="dataUser.imageUrl">
                  <img alt="logo-team" :src="dataUser.imageUrl" />
               </v-avatar>
               <v-avatar size="100" v-else>
                  <img alt="logo-team" src="https://www.w3schools.com/howto/img_avatar2.png" />
               </v-avatar>
            </v-col>
         </v-row>
         <v-row>
            <v-card-text :style="{ fontSize: '.9rem' }" class="mb-0 pa-0">{{ dataUser.names }} </v-card-text>
            <v-card-text :style="{ fontSize: '.9rem' }" class="mb-2 pa-0">{{ dataUser.lastnames }} </v-card-text>
         </v-row>

         <v-row>
            <v-col style="text-align: center" class="pa-1 mb-1">
               <div class="text-center">
                  <v-dialog v-model="modal" width="500">
                     <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ma-2" small elevation="2" :color="color" v-bind="attrs" v-on="on">
                           Ver Perfil
                        </v-btn>
                     </template>

                     <v-card>
                        <v-card-title class="headline grey lighten-2"> Perfil </v-card-title>

                        <v-card-text>
                           <v-row>
                              <v-col cols="3">
                                 <v-avatar size="100" v-if="dataUser.imageUrl">
                                    <img alt="logo-team" :src="dataUser.imageUrl" />
                                 </v-avatar>
                                 <v-avatar size="100" v-else>
                                    <img alt="logo-team" src="https://www.w3schools.com/howto/img_avatar2.png" />
                                 </v-avatar>
                              </v-col>
                              <v-col cols="9">
                                 <p class="mb-0">
                                    Participante:
                                    {{ dataUser.names + " " + dataUser.lastnames }}
                                 </p>
                                 <p class="mb-0" v-if="dataUser.idTeam !== null">Equipo: {{ dataUser.teamName }}</p>
                                 <p class="mb-0">Centro de Estudios: {{ dataUser.hei }}</p>
                                 <p class="mb-0">Correo: {{ dataUser.email }}</p>
                              </v-col>
                           </v-row>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                           <v-spacer></v-spacer>
                           <v-btn :color="color" text @click="modal = false"> Cerrar </v-btn>
                        </v-card-actions>
                     </v-card>
                  </v-dialog>
               </div>
            </v-col>
         </v-row>
      </v-card>
   </v-col>
</template>

<script>
import { mapState } from "vuex";

export default {
   name: "UserCard",
   props: ["dataUser", "arrayLength", "index"],
   data() {
      return {
         modal: false,
         color: "FFFF"
      };
   },
   methods: {},
   mounted() {
      this.color = this.style.style.colors.primary;
   },
   computed: {
      ...mapState(["generalConfig", "style"])
   },
   created() {}
};
</script>
