<template>
   <v-card flat style="min-height: 90vh;">
      <v-list>
         <v-list-item>
            <v-row align="center">
               <v-col cols="2" v-if="otherProfile != 'yes'">
                  <v-file-input
                     hide-details
                     hide-input
                     v-model="currentFile"
                     prepend-icon="mdi-square-edit-outline"
                     @change="selectFile"
                  ></v-file-input>
               </v-col>
               <v-col cols="10" style="width: fit-content; margin: auto">
                  <div>
                     <v-list-item-avatar
                        class="text-right"
                        height="10vw"
                        width="10vw"
                        style="margin:auto; justify: end"
                     >
                        <v-img :src="urlProfile"> </v-img>
                     </v-list-item-avatar>
                  </div>
               </v-col>
            </v-row>
         </v-list-item>
         <v-list-item-content>
            <div>
               <v-list-item-title
                  class="title "
                  style="width:fit-content; margin:auto; white-space: normal; text-align: center; padding-right: 4px; padding-left: 4px;"
               >
                  {{ info.name + " " + info.lastName }}
               </v-list-item-title>
            </div>
         </v-list-item-content>

         <v-divider
            v-if="
               privilegio.toString().toLowerCase() == 'administrador' &&
                  !flagOther
            "
         ></v-divider>
         <div
            style="width:fit-content; margin:auto"
            v-if="otherProfile != 'yes'"
         >
            <v-row
               ><v-btn
                  v-if="
                     privilegio.toString().toLowerCase() == 'administrador' &&
                        !flagOther
                  "
                  :style="{
                     backgroundColor: generalConfig.mainColor + ' !important'
                  }"
                  style="padding-right: 12px; padding-left: 12px; width: 11vw; height: 2vw; margin-bottom: 10px; "
                  dark
                  Large
                  bottom
                  @click="editarMB()"
               >
                  <span style="font-size: 0.8vw;">Editar Marca blanca</span>
               </v-btn></v-row
            >
            <v-row>
               <v-btn
                  :style="{
                     backgroundColor: generalConfig.mainColor + ' !important'
                  }"
                  style="padding-right: 12px; padding-left: 12px; width: 11vw; height: 2vw"
                  dark
                  Large
                  bottom
                  @click="changePassword()"
               >
                  <span style="font-size: 0.8vw;">Cambiar contraseña</span>
               </v-btn>
            </v-row>
         </div>
         <v-divider></v-divider>
      </v-list>
   </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import * as blueprintDA from "../dataAccess/blueprint.js";
//import * as userDA from "../dataAccess/user.js";
export default {
   name: "ProfileSideBar",
   props: [
      "info",
      "flagOther",
      "profileImgUrl",
      "editProfile",
      "changeEditImgProfile",
      "otherProfile"
   ],
   data() {
      return {
         currentFile: [],
         privilegio: "",
         uploadImage: null,
         //POST, porque no hay URL
         dataUploadNewFiles: {
            key: process.env.VUE_APP_API_KEY_COMMUNITY,
            files: null
         },
         //put, con URL para actualizar
         dataUploadFiles: {
            key: process.env.VUE_APP_API_KEY_COMMUNITY,
            url: null,
            file: null
         },
         urlProfile: "https://www.w3schools.com/howto/img_avatar2.png", //change static image
         data: {}
      };
   },
   created() {
      console.log(this.otherProfile);
      this.privilegio = this.getUser().data.communityPrivilege;
      if (this.otherProfile == "yes") {
         this.urlProfile = localStorage.getItem("otherAvatarURL");
      } else {
         this.urlProfile = localStorage.getItem("avatarURL");
      }
   },
   computed: {
      ...mapState(["generalConfig"])
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      selectFile(file) {
         let user = this.getUser(); //get user ID
         this.currentFile = file;
         blueprintDA.UploadNewFiles(this.currentFile).then(res => {
            console.log(res);
            this.urlProfile = res.data.payload.urls[0];
            localStorage.setItem("avatarURL", this.urlProfile);

            blueprintDA.UpdateImage(user.data.id, this.urlProfile).then(res => {
               console.log(res);
               location.reload();
            });
         });
      },

      editarMB() {
         this.$router.push("/edit-community");
      },
      changePassword() {
         let url = window.location.href;
         let lastPos = url.lastIndexOf("/");
         var returnAddress = url.slice(lastPos + 1, 100);
         this.$router.push("/change-password/" + returnAddress);
      }
   }
};
</script>
