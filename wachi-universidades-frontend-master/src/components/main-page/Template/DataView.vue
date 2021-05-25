<template>
   <v-container fluid>
      <v-row justify="center">
         <v-col cols="12" sm="10" md="8" lg="6">
            <v-form ref="form" lazy-validation>
               <!--h3>Datos de la organización solicitante</h3-->
               <v-row>
                  <v-col cols="12" md="12">
                     <h3>Nombre de la comunidad</h3>
                     <v-text-field required dense v-model="data.name" :maxlength="50" counter="50"></v-text-field>
                  </v-col>
               </v-row>
               <h3>Descripción de la comunidad</h3>
               <v-textarea full-width required v-model="data.description" :maxlength="200" counter="200"></v-textarea>
               <!--v-select required dense></v-select-->
               <v-row justify="center">
                  <v-dialog v-model="dialog" persistent max-width="490">
                     <template v-slot:activator="{ on, attrs }">
                        <v-btn
                           x-large
                           depressed
                           :style="{
                              backgroundColor: generalConfig.mainColor,
                              color: generalConfig.colorText
                           }"
                           v-bind="attrs"
                           v-on="on"
                        >
                           Guardar cambios
                        </v-btn>
                     </template>
                     <v-card>
                        <v-card-title>
                           ¿Deseas actualizar los datos de la comunidad?
                        </v-card-title>
                        <v-card-actions>
                           <v-spacer></v-spacer>
                           <v-btn color="red darken-1" text @click="dialog = false">
                              Cancelar
                           </v-btn>
                           <v-btn color="green darken-1" text @click="[(dialog = false), updateData()]">
                              Aceptar
                           </v-btn>
                        </v-card-actions>
                     </v-card>
                  </v-dialog>
               </v-row>
            </v-form>
         </v-col>
      </v-row>
   </v-container>
</template>

<script>
import { mapState } from "vuex";
import * as userDA from "@/dataAccess/editCommunity";
export default {
   data() {
      return {
         data: {
            name: null,
            token: null,
            abbreviation: null,
            communityType: null,
            description: null,
            url: null,
            subscription: null,
            privacy: null,
            organizationName: null,
            profile: {
               work: false,
               academicDetails: true,
               voluntaryWork: true,
               teaching: true,
               achievement: true,
               language: true,
               location: true,
               market: true
            }
         },
         privacy: ["Público", "Privado"],
         domain: ["HTTP", "HTTPS"],
         subscription: ["Lite", "Básico", "Corporativo"],
         dialog: false
      };
   },
   computed: {
      ...mapState(["generalConfig"])
   },
   methods: {
      getData() {
         userDA
            .GetDataCommunity()
            .then(res => {
               if (res.data.status.localeCompare("OK") == 0) {
                  let data = res.data.payload;
                  this.data.name = data.name;
                  this.data.token = data.token;
                  this.data.communityType = data.communityType;
                  this.data.description = data.description;
                  this.data.url = data.url;
                  this.data.subscription = data.subscription;
                  this.convert(data.privacy);
                  this.convert(data.subscription);
                  this.data.organizationName = data.organizationName;
                  userDA.getCommunityProfile().then(resCom => {
                     if (resCom.data.status.localeCompare("OK") == 0) {
                        this.data.profile.work = resCom.data.payload.work;
                        this.data.profile.academicDetails = resCom.data.payload.academicDetails;
                        this.data.profile.voluntaryWork = resCom.data.payload.voluntaryWork;
                        this.data.profile.teaching = resCom.data.payload.teaching;
                        this.data.profile.achievement = resCom.data.payload.achievement;
                        this.data.profile.language = resCom.data.payload.language;
                        this.data.profile.location = resCom.data.payload.location;
                        this.data.profile.market = resCom.data.payload.market;
                     }
                  });
               }
            })
            .catch(function(error) {
               console.log(error);
            });
      },
      updateData() {
         this.data.token = process.env.VUE_APP_API_KEY_COMMUNITY;
         this.convert(this.data.privacy);
         this.convert(this.data.subscription);
         userDA
            .UpdateDataCommunity(this.data)
            .then(res => {
               if (res.data.status.localeCompare("OK") == 0) {
                  this.convert(this.data.privacy);
                  this.convert(this.data.subscription);
               }
            })
            .catch(function(error) {
               console.log(error);
            });
      },
      convert(name) {
         switch (name) {
            case "public": {
               this.data.privacy = "Público";
               break;
            }
            case "Público": {
               this.data.privacy = "public";
               break;
            }
            case "private": {
               this.data.privacy = "Privado";
               break;
            }
            case "Privado": {
               this.data.privacy = "private";
               break;
            }
            case "basic": {
               this.data.subscription = "basic";
               break;
            }
            case "Básico": {
               this.data.subscription = "basic";
               break;
            }
            case "lite": {
               this.data.subscription = "lite";
               break;
            }
            case "Lite": {
               this.data.subscription = "lite";
               break;
            }
            case "corporative": {
               this.data.subscription = "corporative";
               break;
            }
            case "Corporativo": {
               this.data.subscription = "corporative";
               break;
            }
         }
      }
   },
   mounted() {
      this.getData();
   }
};
</script>
