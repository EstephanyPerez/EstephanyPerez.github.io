<template>
   <div class="pa-0">
      <Navbar> </Navbar>
      <!-- START: BODY-CONTAINER -->
      <v-container
         style="
            max-height: 935px! important; max-width: 935px!important; width: calc(100% - 20px)!important;"
      >
         <div class="container px-0 position-relative">
            <div
               class="banner_main"
               style="
                background-size: cover;
                border-radius: 5px;
                height: 200px;
                background-image: url(https://i2.wp.com/www.moreorganised.com/wp-content/uploads/2017/10/More_Organised_in_the_office.jpg?resize=3200%2C1245&ssl=1);"
            ></div>

            <v-row justify="center">
               <!-- START: CONTAINER-SEARCH -->
               <v-col cols="12" sm="3" :style="{ paddingTop: '30px' }">
                  <v-card outlined style="padding:10px; min-width:124px;">
                     <v-text-field
                        :maxlength="maxLength"
                        @change="handlerSearch()"
                        v-model="search"
                        outlined
                        label="Buscar"
                        :color="color"
                        prepend-inner-icon="mdi-magnify"
                     ></v-text-field>
                  </v-card>
               </v-col>
               <!-- FINISH: CONTAINER-SEARCH AND FILTERS -->
               <!-- START: CONTAINER TEAMS -->
               <v-col cols="12" sm="9">
                  <v-row class="row">
                     <div class="col-lg-12 pa-0">
                        <div class="row">
                           <UserCard
                              v-for="(userCard, pos) in membersSlice"
                              :dataUser="userCard"
                              :arrayLength="membersLength"
                              :index="pos"
                              :pos="pos"
                              :key="pos"
                           />
                        </div>
                     </div>
                  </v-row>
                  <div class="text-center">
                     <v-pagination :color="color" v-model="page" :length="nPages" :total-visible="7" @input="handlePageChange"></v-pagination>
                  </div>
               </v-col>

               <!-- FINISH: CONTAINER TEAMS -->
            </v-row>
         </div>
      </v-container>
      <!-- FINISH: BODY-CONTAINER -->
      <Footer> </Footer>
   </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import UserCard from "@/views/member/UserCard.vue";
import Footer from "@/components/Footer.vue";
import * as EventDA from "@/dataAccess/eventDA.js";
import * as InscribidesDA from "@/dataAccess/inscribidesDA.js";
import { mapState, mapActions } from "vuex";
export default {
   name: "Member",
   components: {
      UserCard,
      Navbar,
      Footer
   },
   data() {
      return {
         maxLength: 200,
         page: 1,
         nPages: 10,
         perPage: 10,
         members: [],
         membersLength: 0,
         search: "",
         membersAux: [],
         color: "FFFF"
      };
   },
   computed: {
      ...mapState(["membersSlice", "nMembers", "communityType", "generalConfig", "community", "style"])
   },
   methods: {
      ...mapActions(["getMembers", "completeNavbarOptions", "setMembers"]),
      handlePageChange(value) {
         //console.log("this.page", this.page, " ", value);
         this.getMembers({ perPage: this.perPage, page: value });
         //console.log("this.membersSlice", this.membersSlice);
      },
      handlerSearch() {
         console.log(this.search);
         if (this.search === "") {
            this.membersLength = this.members.length;
            this.setMembers(this.members);
            this.nPages = Math.ceil(this.members.length / this.perPage);
            this.getMembers({ perPage: this.perPage, page: this.page });
         } else {
            this.membersAux = [];
            console.log("=============================================");
            this.membersLength = this.members.length;
            this.members.forEach(member => {
               if (member.names.toUpperCase().indexOf(this.search.toUpperCase()) > -1) {
                  this.membersAux.push(member);
               }
            });
            this.setMembers(this.membersAux);
            this.nPages = Math.ceil(this.membersAux.length / this.perPage);
            this.getMembers({ perPage: this.perPage, page: this.page });
            //this.members = resp.data.payload;
         }
      }
   },
   created() {},
   mounted() {
      this.color = this.style.style.colors.primary;
      //console.log(this.membersSlice, this.nMembers, this.page);
      
      this.completeNavbarOptions(this.communityType);
      EventDA.getActiveUEvent(this.community.community.idCommunity).then(response => {
         ///
         console.log("entra a buscar el evento activo");
         if (Object.keys(response.data).indexOf("payload") !== -1) {
            //si devuelve payload = hay un evento activo
            InscribidesDA.getInscribidesByEvent(parseInt(response.data.payload.idUEvent)).then(resp => {
               console.log("llega al listar inscritos");
               //se obtiene el listado de inscritos al evento
               console.log("listado de inscritos antes de if: ", resp.data.payload);
               if (Object.keys(resp.data).indexOf("payload") !== -1) {
                  if (resp.data.payload.length > 0) {
                     this.membersLength = resp.data.payload.length;
                     console.log("length: ", this.nMembers);
                     this.setMembers(resp.data.payload);
                     console.log("members: ", this.membersSlice);
                     this.perPage = 10;
                     console.log("nmembers:", this.nMembers);
                     console.log("perpgae:", this.perPage);
                     this.nPages = Math.ceil(resp.data.payload.length / this.perPage);
                     console.log("numero de paginas: ", this.nPages);
                     this.getMembers({ perPage: this.perPage, page: this.page });
                     this.members = resp.data.payload;
                  } else {
                     this.setMembers([]);
                  }
               }
            });
         }
      });
   },
   updated() {
      //console.log(this.membersSlice, this.page);
      //console.log("Componente actualizado");
   }
};
</script>
