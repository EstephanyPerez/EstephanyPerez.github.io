<template>
   <div>
      <Navbar></Navbar>
      <v-row>
         <v-col cols="3">
            <Sidebar></Sidebar>
         </v-col>
         <v-row>
            <v-col cols="10">
               <h1>GESTIÓN DE FEEDBACK</h1>
               <br />
               <br />
               <v-row>
                  <v-col cols="6">
                     <v-row>
                        <img
                           height="150px"
                           width="150px"
                           :src="
                              feedback.feedback.team.logoURL
                                 ? feedback.feedback.team.logoURL.indexOf(`s3.amazonaws.com`) > -1
                                    ? feedback.feedback.team.logoURL
                                    : require(`@/assets/` + feedback.feedback.team.logoURL)
                                 : null
                           "
                           :style="{ borderRadius: '1000px' }"
                        />
                        <h3 class="mt-15 ml-5">{{ feedback.feedback.team.name }}</h3>
                     </v-row>
                  </v-col>
                  <v-col cols="5" offset="1">
                     <v-row v-for="(file, i) in feedback.feedback.team.deliverable.files" :key="i" class="ml-2 mb-2">
                        <v-col cols="12" class="p-0">
                           <v-row>
                              <v-icon v-if="file.filename.slice(-3) === 'pdf'" color="#FA0F00">mdi-file-pdf-outline</v-icon>
                              <v-icon v-else-if="file.filename.slice(-3) === 'doc'" color="#2B579A">mdi-file-word-outline</v-icon>
                              <v-icon v-else-if="file.filename.slice(-4) === 'docx'" color="#2B579A">mdi-file-word-outline</v-icon>
                              <v-icon v-else-if="file.filename.slice(-3) === 'zip'" color="#00000099">mdi-folder-zip-outline</v-icon>
                              <v-icon v-else-if="file.filename.slice(-3) === 'rar'" color="#00000099">mdi-folder-zip-outline</v-icon>
                              <a :style="{ color: '#00000099' }"
                                 ><h3 @click="redirect(file)" class="ml-2">
                                    {{
                                       file.filename.length > 30
                                          ? file.filename.slice(0, 13) + "..." + file.filename.slice(file.filename.length - 13, file.filename.length)
                                          : file.filename
                                    }}
                                 </h3></a
                              >
                           </v-row>
                        </v-col>
                     </v-row>
                  </v-col>
               </v-row>
               <br />
               <br />
               <v-row>
                  <v-textarea :color="color" :maxlength="maxLength" name="feedback" label="Feedback *" outlined v-model="feedbackText"></v-textarea>
               </v-row>
               <v-row justify="end">
                  <v-btn class="mx-3 mr-0" large :color="color" @click="sendFeedback()">
                     {{ isFeedback ? "EDITAR FEEDBACK" : "ENVIAR FEEDBACK" }}
                  </v-btn>
               </v-row>
            </v-col>
         </v-row>
         <v-col offset="3" cols="9" v-if="activitiesPost !== null"> </v-col>
      </v-row>
   </div>
</template>

<style scoped src="../styles/Activities.css"></style>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import * as FeedbackDA from "@/dataAccess/feedbackDA.js";
import * as EventDA from "@/dataAccess/eventDA.js";
import { mapState, mapActions } from "vuex";

export default {
   name: "CampusCoordinators",
   components: {
      Sidebar,
      Navbar
   },
   computed: {
      ...mapState(["feedback", "login", "community", "style"])
   },
   data() {
      return {
         color: "FFFF",
         maxLength: 200,
         feedbackText: "",
         isFeedback: false,
         idFeedback: 1,
         index: 0,
         currentEvent: null
      };
   },
   methods: {
      ...mapActions({ saveTeam: "feedback/saveTeam", saveFeedback: "feedback/updateFeedback" }),
      checkTeam(team) {
         this.saveTeam(team);
         console.log("LE DI CLICK A: ", team);
      },
      redirect(file) {
         var fileLink = document.createElement("a");
         fileLink.href = file.fileURL;
         fileLink.target = "_blank";
         fileLink.click();
      },
      sendFeedback() {
         console.log("el indice es: ", this.index);
         var message = { comment: this.feedbackText, index: this.index };
         if (this.feedbackText !== "") {
            if (this.isFeedback) {
               let body = {
                  idFeedback: parseInt(this.idFeedback),
                  idDeliverable: parseInt(this.feedback.feedback.team.deliverable.idDeliverable),
                  communityToken: process.env.VUE_APP_API_KEY_COMMUNITY,
                  user: {
                     id: parseInt(this.login.login.id)
                  },
                  comment: this.feedbackText
               };
               console.log(body);
               FeedbackDA.editFeedback(body)
                  .then(resp => {
                     console.log(resp.data.payload);
                     this.saveFeedback(message);
                     this.$swal.fire("Feedback Actualizado", "Se ha registrado el feedback con éxito", "success");
                  })
                  .catch(err => {
                     console.log(err);
                     this.$swal.fire("Ocurrió un Problema", "No se pudo actualizar el feedback", "error");
                  });
            } else {
               let body = {
                  idDeliverable: parseInt(this.feedback.feedback.team.deliverable.idDeliverable),
                  user: {
                     id: parseInt(this.login.login.id)
                  },
                  comment: this.feedbackText,
                  idUEvent: parseInt(this.currentEvent.idUEvent),
                  idTeam: parseInt(this.feedback.feedback.team.idTeam),
                  communityToken: process.env.VUE_APP_API_KEY_COMMUNITY
               };
               FeedbackDA.sendFeedback(body)
                  .then(resp => {
                     console.log(resp);
                     this.$swal.fire("Feedback Enviado", "Se ha registrado el feedback con éxito", "success");
                  })
                  .catch(err => {
                     console.log(err);
                     this.$swal.fire("Ocurrió un Problema", "No se pudo registrar el feedback", "error");
                  });
            }
         } else {
            this.$swal.fire("Feedback No Enviado", "Se debe ingresar un feedback", "error");
         }
      },
      searchIndex() {
         for (let i = 0; i < this.feedback.feedback.team.deliverable.feedbacks.length; i++) {
            if (this.feedback.feedback.team.deliverable.feedbacks[i].user.id === this.login.login.id) {
               return i;
            }
         }
         return -1;
      },
      loadFeedback() {
         console.log("este es el team: ", this.feedback.feedback.team);
         console.log("el usuario es: ", this.login.login);
         var index = this.searchIndex();
         if (index > -1) {
            this.feedbackText = this.feedback.feedback.team.deliverable.feedbacks[index].comment;
            this.isFeedback = true;
            this.idFeedback = this.feedback.feedback.team.deliverable.feedbacks[index].idFeedback;
            this.index = index;
         } else {
            this.feedbackText = "";
            this.isFeedback = false;
            this.idFeedback = 1;
            this.index = 0;
         }
      }
   },
   watch: {
      isFeedback() {
         this.loadFeedback();
      }
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      EventDA.getActiveUEvent(this.community.community.idCommunity)
         .then(response => {
            this.currentEvent = response.data.payload;
         })
         .catch(error => {
            console.log("al consultar el servidor + ", error);
         });
      this.loadFeedback();
   }
};
</script>
