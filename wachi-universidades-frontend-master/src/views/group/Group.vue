<template>
   <div class="pa-0">
      <Navbar> </Navbar>
      <!-- START: BODY-CONTAINER -->
      <v-container style="max-height: 935px !important; max-width: 935px !important; width: calc(100% - 40px) !important">
         <div class="container px-0 position-relative">
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
               <!-- START: CONTAINER-SEARCH AND FILTERS -->
               <v-col cols="12" sm="3">
                  <v-card outlined style="padding: 10px; min-width: 124px">
                     <v-text-field
                        :maxlength="maxLength"
                        @change="handlerSearch()"
                        v-model="search"
                        outlined
                        label="Buscar"
                        prepend-inner-icon="mdi-magnify"
                     ></v-text-field>
                  </v-card>
               </v-col>
               <!-- FINISH: CONTAINER-SEARCH AND FILTERS -->

               <!-- START: CONTAINER TEAMS -->
               <v-col>
                  <v-col cols="12">
                     <v-col>
                        <CardGroup
                           v-for="(cardGroup, pos) in teams"
                           :dataGroup="cardGroup"
                           :arrayLength="groupsLength"
                           :index="pos"
                           :pos="pos"
                           :key="pos"
                        />
                     </v-col>
                     <v-pagination v-model="page" :color="color" :total-visible="7" :length="numPages" @input="handlePageChange"></v-pagination>
                  </v-col>
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
import { mapState, mapActions } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import CardGroup from "@/views/group/cardGroup.vue";
import * as TeamsDA from "@/dataAccess/teamsDA.js";
import * as EventDA from "@/dataAccess/eventDA.js";

export default {
   name: "Teams",
   components: {
      Navbar,
      Footer,
      CardGroup,
   },
   data() {
      return {
         maxLength: 200,
         page: 1, // pagination value
         nTeamsxP: 5,
         perPage: 5,
         numPages: 5,
         visiblePages: 2,
         search: "",
         groupsAux: [],
         groupsLength: 0,
         groups: [],
         color: "FFFF",
      };
   },
   computed: {
      ...mapState(["nTeamsCard", "communityType", "community", "teams", "style"]),
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      this.completeNavbarOptions(this.communityType);
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then((response) => {
            console.log("respuesta evento", response.data);
            this.idUEvent = response.data.payload.idUEvent;
            console.log("idUEvent", this.idUEvent);
            TeamsDA.getTeamList(this.idUEvent)
               .then((response) => {
                  this.nTeamsxP = 5;
                  this.groups = response.data.payload.teams;

                  console.log("respuesta getTeamList", response.data);
                  this.setGroups(response.data.payload.teams);
                  this.groupsLength = response.data.payload.teams.length; //sets the number of comunities received
                  this.perPage = 5;
                  this.numPages = Math.ceil(response.data.payload.teams.length / this.nTeamsxP); //sets the number of pages rendered (10 or less cards per page)
                  this.visiblePages = this.numPages / 2;
                  console.log("numero de paginas: ", this.numPages);
                  this.getTeams({ nTeamsxP: this.nTeamsxP, page: this.page });
               })
               .catch((error) => {
                  this.setGroups([]);
                  console.log("error al obtener team list ", error);
               });
         })
         .catch((error) => {
            console.log("error al obtener backend event + ", error);
         });
   },
   methods: {
      ...mapActions(["getTeams", "completeNavbarOptions", "setGroups"]),
      handlePageChange(value) {
         //console.log("this.page", this.page, " ", value);
         this.getTeams({ nTeamsxP: this.nTeamsxP, page: value });
         //console.log("this.membersSlice", this.membersSlice);
      },
      handlerSearch() {
         console.log("search", this.search);
         if (this.search === "") {
            this.groupsLength = this.groups.length;
            this.setGroups(this.groups);
            this.numPages = Math.ceil(this.groups.length / this.perPage);
            this.getTeams({ nTeamsxP: this.nTeamsxP, page: this.page });
         } else {
            this.groupsAux = [];
            console.log("=============================================");
            this.groupsLength = this.groups.length;
            this.groups.forEach((group) => {
               console.log("cada grupo: ", group);
               if (group.teamName != null && group.teamName.toUpperCase().indexOf(this.search.toUpperCase()) > -1) {
                  this.groupsAux.push(group);
               }
            });
            this.setGroups(this.groupsAux);
            this.numPages = Math.ceil(this.groupsAux.length / this.perPage);
            console.log("this.neTeamsSXP", this.nTeamsxP);
            console.log("this.page", this.page);
            this.getTeams({ nTeamsxP: this.nTeamsxP, page: this.page });
            //this.groups = resp.data.payload;
         }
      },
   },
};
</script>
