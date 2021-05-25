<template>
   <v-toolbar flat>
      <v-spacer></v-spacer>
      <v-row no-gutters>
         <v-col cols="11">
            <h3 class="text-right">{{ login.login.name + " " + login.login.lastName }}</h3>
            <h3 v-if="login.login.privilege === 'coordinador general'" class="text-right">{{ login.login.privilege.toUpperCase() }}</h3>
            <h3 v-if="login.login.privilege !== 'coordinador general'" class="text-right">
               {{ login.login.privilege.toUpperCase() + " - " + login.login.nameHei }}
            </h3>
         </v-col>
      </v-row>
      <v-avatar rounded>
         <v-img :src="urlProfile ? urlProfile : require(`@/images/` + urlDefault)"></v-img>
      </v-avatar>
      <v-menu offset-y>
         <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
               <v-icon>mdi-menu-down</v-icon>
            </v-btn>
         </template>
         <v-list>
            <v-list-item @click="goToMyProfile()">
               <v-list-item-title>Mi Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout()">
               <v-list-item-title>Cerrar Sesión</v-list-item-title>
            </v-list-item>
         </v-list>
      </v-menu>
   </v-toolbar>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
   data() {
      return {
         urlProfile: "https://assets-2flock.s3.amazonaws.com/ec84b565-011c-4ad8-a1c1-403c1b6eac5c/1606695642121.png",
         urlDefault: "user_default_1.jpg"
      };
   },
   beforeMount() {
      this.urlProfile = localStorage.getItem("avatarURL");
      if (!this.urlProfile) this.urlProfile = localStorage.getItem("otherAvatarURL");
   },
   computed: {
      ...mapState(["login"])
   },
   methods: {
      ...mapActions({ deleteUserAuthInf: "user/logOut" }),
      logout() {
         this.deleteUserAuthInf();
         this.$router.push("/");
      },
      goToMyProfile() {
         this.$router.push("/profile");
      }
   }
};
</script>
<style scoped src="../styles/Navbar2.css"></style>
