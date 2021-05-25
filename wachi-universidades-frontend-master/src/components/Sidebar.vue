<template>
   <div v-if="userModel.data !== null">
      <v-navigation-drawer clipped app :color="color" width="310">
         <v-img :src="generalConfig.logo" class="navbar-image"></v-img>
         <v-divider></v-divider>
         <v-list>
            <div v-for="(item, index) in items" :key="item.title">
               <v-list-item
                  v-if="!item.subItems && item.roles.includes(userModel.data.privilege) && item.always"
                  :to="item.to"
                  @click="logout(index)"
               >
                  <v-list-item-icon>
                     <v-icon color="white">{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                     <v-list-item-title v-text="item.title" class="white--text" active-class="white--text"></v-list-item-title>
                  </v-list-item-content>
               </v-list-item>
               <v-list-item
                  v-else-if="!item.subItems && item.roles.includes(userModel.data.privilege) && !eventExists"
                  :to="item.to"
                  @click="logout(index)"
               >
                  <v-list-item-icon>
                     <v-icon color="white">{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                     <v-list-item-title v-text="item.title" class="white--text" active-class="white--text"></v-list-item-title>
                  </v-list-item-content>
               </v-list-item>

               <v-list-group v-if="item.subItems && item.roles.includes(userModel.data.privilege) && eventExists" :key="item.title">
                  <template v-slot:activator>
                     <v-list-item-icon>
                        <v-icon v-text="item.icon" color="white"></v-icon>
                     </v-list-item-icon>
                     <v-list-item-title v-text="item.title" class="white--text" active-class="white--text"></v-list-item-title>
                  </template>
                  <div v-for="subItem in item.subItems" :key="subItem.title">
                     <v-list-item v-if="!subItem.subItems && subItem.roles.includes(userModel.data.privilege)" :key="subItem.title" :to="subItem.to">
                        <v-list-item-icon>
                           <v-icon class="ml-7" v-text="subItem.icon" color="white"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                           <v-list-item-title v-text="subItem.title" class="white--text" active-class="white--text"></v-list-item-title>
                        </v-list-item-content>
                     </v-list-item>
                  </div>
               </v-list-group>
            </div>
         </v-list>
      </v-navigation-drawer>
   </div>
</template>

<style scoped src="../styles/Sidebar.css"></style>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import privileges from "@/util/privilegeConst";
import * as EventDA from "@/dataAccess/eventDA.js";

export default {
   name: "Sidebar",
   components: {},
   data() {
      return {
         color: "FFFF",
         eventExists: false,
         items: [
            {
               to: "/edit-community",
               icon: "mdi-pencil",
               title: "Editar Marca Blanca",
               always: true,
               roles: [privileges.ADMINISTRATOR]
            },
            {
               to: "/home-logged",
               icon: "mdi-home",
               title: "Inicio",
               always: true,
               roles: [privileges.CAMPUS_COORDINATOR_PRIVILEGE, privileges.GENERAL_COORDINATOR_PRIVILEGE, privileges.MENTOR_PRIVILEGE]
            },
            {
               to: "/newEvent",
               icon: "mdi-bank-plus",
               title: "Nuevo evento",
               always: false,
               roles: [privileges.GENERAL_COORDINATOR_PRIVILEGE]
            },
            {
               to: "/eventHistory",
               icon: "mdi-history",
               title: "Historial",
               always: true,
               roles: [privileges.GENERAL_COORDINATOR_PRIVILEGE]
            },
            {
               icon: "mdi-calendar",
               title: "Gestión de eventos",
               roles: [privileges.CAMPUS_COORDINATOR_PRIVILEGE, privileges.GENERAL_COORDINATOR_PRIVILEGE, privileges.MENTOR_PRIVILEGE],
               always: true,
               subItems: [
                  {
                     to: "/editEventGeneralInformation",
                     icon: "mdi-information",
                     title: "Información general",
                     roles: [privileges.GENERAL_COORDINATOR_PRIVILEGE]
                  },
                  {
                     to: "/hei",
                     icon: "mdi-school",
                     title: "Instituciones educativas",
                     roles: [privileges.GENERAL_COORDINATOR_PRIVILEGE]
                  },
                  {
                     to: "/activities",
                     icon: "mdi-paperclip",
                     title: "Actividades",
                     roles: [privileges.GENERAL_COORDINATOR_PRIVILEGE]
                  },
                  {
                     to: "/challenges",
                     icon: "mdi-lightbulb-on",
                     title: "Retos",
                     roles: [privileges.GENERAL_COORDINATOR_PRIVILEGE]
                  },
                  {
                     to: "/campusCoordinators",
                     icon: "mdi-badge-account-horizontal-outline",
                     title: "Coordinadores de sede",
                     roles: [privileges.GENERAL_COORDINATOR_PRIVILEGE]
                  },
                  {
                     to: "/mentors",
                     icon: "mdi-teach",
                     title: "Mentores",
                     roles: [privileges.GENERAL_COORDINATOR_PRIVILEGE, privileges.CAMPUS_COORDINATOR_PRIVILEGE]
                  },
                  {
                     to: "/organizationalKit",
                     icon: "mdi-file-multiple",
                     title: "Kit organizador",
                     roles: [privileges.GENERAL_COORDINATOR_PRIVILEGE, privileges.CAMPUS_COORDINATOR_PRIVILEGE]
                  },
                  {
                     to: "/inscribides",
                     icon: "mdi-badge-account-outline",
                     title: "Inscritos",
                     roles: [privileges.GENERAL_COORDINATOR_PRIVILEGE, privileges.CAMPUS_COORDINATOR_PRIVILEGE]
                  },
                  {
                     to: "/teams",
                     icon: "mdi-account-group",
                     title: "Equipos",
                     roles: [privileges.GENERAL_COORDINATOR_PRIVILEGE, privileges.CAMPUS_COORDINATOR_PRIVILEGE]
                  },
                  {
                     to: "/phases",
                     icon: "mdi-format-list-numbered",
                     title: "Fases",
                     roles: [privileges.GENERAL_COORDINATOR_PRIVILEGE, privileges.CAMPUS_COORDINATOR_PRIVILEGE]
                  },
                  {
                     to: "/feedback",
                     icon: "mdi-clipboard-check-multiple-outline",
                     title: "Feedback",
                     roles: [privileges.CAMPUS_COORDINATOR_PRIVILEGE, privileges.GENERAL_COORDINATOR_PRIVILEGE, privileges.MENTOR_PRIVILEGE]
                  }
               ]
            },
            {
               to: "/",
               icon: "mdi-logout",
               title: "Salir",
               always: true,
               roles: [privileges.CAMPUS_COORDINATOR_PRIVILEGE, privileges.GENERAL_COORDINATOR_PRIVILEGE, privileges.MENTOR_PRIVILEGE]
            }
         ]
      };
   },
   computed: {
      ...mapGetters({
         userModel: "user/getUser",
         eventModel: "event/getEvent"
      }),
      ...mapState(["urlLogo", "generalConfig", "style"])
   },
   methods: {
      ...mapActions({ sessionLogout: "user/logOut" }),
      logout(index) {
         if (index === this.items.length - 1) {
            this.sessionLogout();
         }
      }
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      let communityToken = process.env.VUE_APP_API_KEY_COMMUNITY;
      EventDA.getActiveUEvent(communityToken)
         .then(resp => {
            if (resp.data.payload) {
               this.eventExists = true;
            }
         })
         .catch(err => {
            console.log(err.response.data);
         });
   }
};
</script>

<style scoped>
.navbar-image {
   max-width: 250px;
   margin: 20px 20px 20px 20px;
}
</style>
