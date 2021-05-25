<template>
   <div class="pa-0">
      <Navbar> </Navbar>
      <v-container class="pa-0">
         <v-container
            style="
            max-height: 935px! important; max-width: 935px!important; width: calc(100% - 40px)!important;"
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
                  <!-- START: CONTAINER-SEARCH AND FILTERS -->
                  <v-col cols="12" sm="3">
                     <v-card outlined style="padding:10px; min-width:124px;">
                        <v-text-field
                           outlined
                           label="Buscar"
                           prepend-inner-icon="mdi-magnify"
                           v-model="search"
                           v-on:keyup.enter="searchGroups"
                        ></v-text-field>
                     </v-card>
                  </v-col>

                  <!-- START: CONTAINER TEAMS -->
                  <v-col>
                     <v-col cols="12">
                        <v-col>
                           <card-group
                              v-for="(cardGroup, pos) in entreShowList"
                              :dataGroup="cardGroup"
                              :pos="pos"
                              :key="pos"
                           />
                        </v-col>
                        <v-pagination
                           class="mb-5"
                           v-model="page"
                           :length="totalPages"
                           :total-visible="7"
                           @input="handlePageChange"
                        ></v-pagination>
                     </v-col>
                  </v-col>
               </v-row>
            </div>
         </v-container>
         <Footer> </Footer>
      </v-container>
   </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import cardGroup from "@/views/groups/GroupCard.vue";
import * as EventDA from "@/dataAccess/groupsView.js";

export default {
   name: "Teams",
   components: {
      Navbar,
      Footer,
      cardGroup
   },
   data() {
      return {
         entreShowList: [], // 4 entres showing on web
         entreActualList: [], //total entres from searchbar (intially equals entreList)
         entreList: [], //total entres got from backend
         page: 1,
         entresPerPage: 4,
         totalPages: 0,
         search: ""
      };
   },
   computed: {
      ...mapState(["groups", "nTeamsCard", "communityType"])
   },
   mounted() {
      //this.listGroups();
   },
   created() {
      EventDA.getActiveUEventEntre("ec84b565-011c-4ad8-a1c1-403c1b6eac5c")
         .then(res => {
            let idUEvent = res.data.payload;

            EventDA.getTeamListEntre(idUEvent)
               .then(res => {
                  console.log(res);
                  let entreName, image;
                  for (let i = 0; i < res.data.payload.length; i++) {
                     if (res.data.payload[i].entrepreneurshipName == undefined)
                        entreName = "Sin emprendimiento";
                     else entreName = res.data.payload[i].entrepreneurshipName;
                     if (
                        res.data.payload[i].image == undefined ||
                        res.data.payload[i].image == ""
                     )
                        image =
                           "https://www.runroom.com/uploads/media/default/0001/01/c516d0063d47b2e19430524d898b199af74bc061.png";
                     else image = res.data.payload[i].image;
                     this.entreList.push({
                        groupName: res.data.payload[i].name,
                        entreName: entreName,
                        image: image
                     });
                     this.entreActualList.push({
                        groupName: res.data.payload[i].name,
                        entreName: entreName,
                        image: image
                     });
                     if (i < this.entresPerPage)
                        this.entreShowList.push({
                           groupName: res.data.payload[i].name,
                           entreName: entreName,
                           image: image
                        });
                  }
                  this.totalPages = Math.ceil(
                     this.entreList.length / this.entresPerPage
                  );
               })
               .catch(error => {
                  console.log("error al obtener team list ", error.data);
               });
         })
         .catch(error => {
            console.log("error al obtener backend event + ", error);
         });
   },
   methods: {
      ...mapActions(["getTeams"]),
      handlePageChange(value) {
         //value = current page from v-pagination
         this.entreShowList = []; //clean showing entres because we are changing page
         let index;
         for (let i = 0; i < this.entresPerPage; i++) {
            index = (value - 1) * this.entresPerPage + i;
            if (this.entreActualList.length > index)
               this.entreShowList.push(this.entreActualList[index]);
         }
      },
      searchGroups() {
         this.entreActualList = [];
         if (this.search == "") {
            for (let i = 0; i < this.entreList.length; i++) {
               this.entreActualList.push(this.entreList[i]);
            }
         } else {
            for (let i = 0; i < this.entreList.length; i++) {
               if (
                  this.entreList[i].groupName
                     .toLowerCase()
                     .includes(this.search.toLowerCase()) ||
                  this.entreList[i].entreName
                     .toLowerCase()
                     .includes(this.search.toLowerCase())
               )
                  this.entreActualList.push(this.entreList[i]);
            }
         }
         this.handlePageChange(1);
         this.totalPages = Math.ceil(
            this.entreActualList.length / this.entresPerPage
         );
      }
   }
};
</script>
