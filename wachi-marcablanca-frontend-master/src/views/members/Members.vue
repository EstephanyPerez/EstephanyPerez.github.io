<template>
   <div class="pa-0">
      <Navbar> </Navbar>
      <v-container
         class="pa-0"
         style="
            max-width: 935px !important;
            width: calc(100% - 20px) !important
         "
      >
         <!-- START: BODY-CONTAINER -->

         <div
            style="
    margin-bottom: 3%;
"
            class="container px-0 position-relative"
         >
            <div
               class="banner_main"
               style="
                  background-size: cover;
                  border-radius: 5px;
                  height: 200px;
                  background-image: url(https://i2.wp.com/www.moreorganised.com/wp-content/uploads/2017/10/More_Organised_in_the_office.jpg?resize=3200%2C1245&ssl=1);
               "
            ></div>

            <v-row justify="center">
               <!-- START: CONTAINER-SEARCH -->
               <v-col cols="12" sm="3" :style="{ paddingTop: '30px' }">
                  <v-card outlined style="padding: 10px; min-width: 124px">
                     <v-text-field
                        v-model="search"
                        outlined
                        label="Buscar"
                        prepend-inner-icon="mdi-magnify"
                        v-on:keyup.enter="searchUsers"
                     ></v-text-field>
                     <v-select
                        v-model="searchFilter"
                        outlined
                        value="Nombre"
                        label="Filtro"
                        :items="items"
                     ></v-select>
                  </v-card>
               </v-col>
               <!-- FINISH: CONTAINER-SEARCH AND FILTERS @change="searchUsers" -->
               <!-- START: CONTAINER TEAMS -->
               <v-col>
                  <v-row>
                     <v-col v-for="j in users" :key="j" lg="4" md="6" sm="6">
                        <UserCard :dataUser="j" />
                     </v-col>
                  </v-row>

                  <div class="text-center mb-10">
                     <v-pagination
                        v-model="page"
                        :length="totalPagesUsers"
                        :total-visible="7"
                        @input="handlePageChange"
                     ></v-pagination>
                  </div>
               </v-col>

               <!-- FINISH: CONTAINER TEAMS -->
            </v-row>
         </div>
         <!-- FINISH: BODY-CONTAINER -->
      </v-container>
      <Footer> </Footer>
   </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import UserCard from "@/views/members/UserCard.vue";
import Footer from "@/components/Footer.vue";
import { mapState, mapActions } from "vuex";
import * as membersDA from "../../dataAccess/members.js";

export default {
   name: "Member",
   components: {
      UserCard,
      Navbar,
      Footer
   },
   data() {
      return {
         items: ["Nombre", "Apellido"],
         page: 1,
         nPages: 10,
         perPage: 9,

         data: {
            page: "1",
            size: "10000", //Inicialmente se llama a la api de listar usuarios con 10'000 usuarios para que consiga todos los usuarios.
            //Luego calculamos cuántas páginas son necesarias a partir de la cantidad total de usuarios recibida
            name: "",
            per_page: "",
            lastName: ""
         },
         users: [],
         totalLengthUsers: 0,
         totalPagesUsers: 0,
         usersInCurrentPage: 0,
         totalFirstRow: 0,
         totalSecondRow: 0,
         totalThirdRow: 0,
         search: "",
         isSearching: false,
         searchFilter: "Nombre"
      };
   },
   computed: {
      ...mapState([
         "membersSlice",
         "nMembers",
         "communityType",
         "generalConfig"
      ]),
      visibleItems() {
         let lista = this.users.slice(
            (this.page - 1) * this.perPage,
            this.page * this.perPage
         );
         return lista;
      }
   },
   /*
   watch: {
      page: function(newVal) {
         this.handlePageChange(newVal);
      }
   },*/
   methods: {
      ...mapActions(["getMembers", "completeNavbarOptions"]),

      //La siguiente función se llama cada vez que cambiamos de página
      handlePageChange(value) {
         if (this.isSearching) {
            this.users = []; //Cada vez que cambiemos de página debemos limpiar la lista de usuarios que se mostrarán
            this.internalSearchUsers(value);
         } else {
            console.log("chaning the page - NO SEARCH");
            this.getMembersPage(value);
         }
      },

      //La siguiente función se llama cada vez que cambiamos el buscador

      internalSearchUsers(value) {
         this.data.page = value;
         this.page = 1;

         if (this.searchFilter == "Apellido") {
            this.data.name = "";
            this.data.lastName = this.search;
         } else {
            this.data.lastName = "";
            this.data.name = this.search;
         }

         console.log(this.data);
         this.users = [];

         membersDA.getMembers(this.data).then(res => {
            console.log(res);
            if (res.data.status == "OK") {
               //Nota: Recordar que siempre se mostrarán 9 usuarios por página
               membersDA //Llamamos nuevamente a la api, esta vez solo nos devuelve los 9 primeros usuarios que cumplen con el filtro
                  .getMembers(this.data)
                  .then(res => {
                     console.log(res);

                     this.totalLengthUsers = res.data.payload.users.length; // Guardamos la cantidad de usuarios total de la comunidad que cumplen con el filtro
                     this.totalPagesUsers = res.data.payload.totalPages;
                     //Guardamos la cantidad de páginas necesarias (Total de usuarios ÷ 9)
                     if (res.data.status == "OK") {
                        this.users = res.data.payload.users.map(u => {
                           return {
                              id: u.id,
                              name: u.name,
                              lastName: u.lastName,
                              email: u.email,
                              privilege: u.privilege
                           };
                        });
                     }
                  });
            }
         });
      },

      searchUsers() {
         if (this.search.trim() == "") {
            this.isSearching = false;
            console.log("isn't searching");
            this.search = "";
            this.data.name = "";
            this.data.lastName = "";
            this.getMembersPage("1");
            return;
         } else {
            console.log("is searching");
            this.isSearching = true;
            this.internalSearchUsers("1");
         }
      },
      getMembersPage(value) {
         this.data.page = value; //Establecemos los paráemtros iniciales: Ver la página 1
         this.users = [];
         membersDA.getMembers(this.data).then(res => {
            if (res.data.status == "OK") {
               //Nota: Primero, recordar que siempre se mostrarán 9 usuarios por página
               this.totalLengthUsers = res.data.payload.users.length; // Guardamos la cantidad de usuarios total de la comunidad que cumplen con el filtro
               this.totalPagesUsers = res.data.payload.totalPages;
               console.log(res.data.payload);

               this.users = res.data.payload.users.map(u => {
                  return {
                     id: u.id,
                     name: u.name,
                     lastName: u.lastName,
                     email: u.email,
                     privilege: u.privilege
                  };
               });
            }
         });
      }
   },

   created() {
      console.log("increated");
      this.data.per_page = this.perPage; //Establecemos los paráemtros iniciales: 9 usuarios por página
      this.getMembersPage("1");
   },
   mounted() {
      //console.log(this.membersSlice, this.nMembers, this.page);
      //this.completeNavbarOptions(this.communityType);
   },
   updated() {}
};
</script>
