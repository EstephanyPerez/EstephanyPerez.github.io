<template>
   <v-container>
      <h1>
         Home Logged
      </h1>
      <h1>
         {{ userModel.session.authenticated }}
      </h1>
   </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   name: "HomeLogged",
   computed: {
      ...mapGetters({
         userModel: "user/getUser"
      })
   }
};
</script>
