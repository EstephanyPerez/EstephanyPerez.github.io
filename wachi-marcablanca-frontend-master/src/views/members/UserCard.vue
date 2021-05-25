<template>
   <v-col style="width: fit-content; margin: auto">
      <v-card
         v-if="dataUser != undefined"
         class="mb-4 border-0"
         style=" textAlign: center; min-width: 180px; max-width: 180px; min-height: 200px; max-height: 200px; "
      >
         <v-row>
            <v-col>
               <v-avatar size="56">
                  <img
                     alt="logo-team"
                     src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                  />
               </v-avatar>
            </v-col>
         </v-row>
         <v-row>
            <v-card-text :style="{ fontSize: '.9rem' }" class="mb-0 pa-0"
               >{{ dataUser.name }}
            </v-card-text>
            <v-card-text :style="{ fontSize: '.9rem' }" class="mb-2 pa-0"
               >{{ dataUser.lastName }}
            </v-card-text>
         </v-row>

         <v-row>
            <v-col style="text-align:center" class="pa-1 mb-1">
               <v-btn
                  outlined
                  color="indigo"
                  class="ma-2 white--text"
                  small
                  elevation="2"
                  @click="goToPerfilUser"
                  :style="{
                     backgroundColor: generalConfig.mainColor + ' !important',
                     color: generalConfig.colorText + ' !important'
                  }"
               >
                  Ver perfil
               </v-btn>
            </v-col>
         </v-row>
      </v-card>
   </v-col>
</template>

<script>
import { mapState, mapActions } from "vuex";
import * as userDA from "../../dataAccess/user.js";

export default {
   name: "UserCard",
   props: ["dataUser"],
   data() {
      return {};
   },
   methods: {
      ...mapActions(["setProfileId"]),
      goToPerfilUser() {
         //console.log(this.dataUser.id)
         localStorage.setItem("profileId", this.dataUser.id);
         userDA.ProfileStructure({ id: this.dataUser.id }).then(res => {
            if (res.data.status == "OK") {
               localStorage.setItem(
                  "otherAvatarURL",
                  res.data.payload.profileImage
               );
               this.$router.push("/profile/yes");
            }
         });
      }
   },
   mounted() {
      //console.log("dataUser", this.dataUser);
   },
   computed: {
      ...mapState(["generalConfig"])
   },
   created() {}
};
</script>
