<template>
   <div>
      <Navbar></Navbar>
      <v-container>
         <h1>Home de un participante Loggeado</h1>
      </v-container>
      <Footer></Footer>
   </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
   name: "ParticipantHomeLogged",
   components: {
      Navbar,
      Footer
   }
};
</script>
