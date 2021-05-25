<template>
   <v-main :style="{ backgroundColor: generalConfig.secondaryColor }">
      <v-row style="margin-bottom: 1%; margin-top: 1%" no-gutters align="center" justify="center">
         <v-col class="hidden-md-and-down pa-0 ma-0 pt-0 pb-0" cols="6" style="margin: auto">
            <v-img :src="imageURL" alt="Imagen de la tarjeta" :style="{ maxHeight: '70vh' }">
               <input v-if="!read_only" class="file-input" ref="fileInput" type="file" @input="onSelectFile" />
            </v-img>
         </v-col>
         <v-col class="hidden-lg-and-up" cols="8" style="margin: auto">
            <v-card elevation="0" shaped :style="{ maxHeight: '70vh', padding: '5%', marginRight: '5%' }">
               <v-card-title>Contáctanos</v-card-title>
               <v-card-text>
                  <v-row>
                     <v-col cols="6">
                        <v-text-field :maxlength="maxLength" label="Nombres *" required offset-y min-width="290px" v-model="names"></v-text-field>
                     </v-col>
                     <v-col cols="6">
                        <v-select label="Institución Educativa *" :items="heis" item-text="name" v-model="selectedHei" return-object></v-select>
                     </v-col>
                     <v-col cols="6">
                        <v-text-field :maxlength="maxLength" label="Correo *" required offset-y min-width="290px" v-model="email"></v-text-field>
                     </v-col>
                     <v-col cols="6">
                        <v-text-field :maxlength="maxLength" label="Celular *" required offset-y min-width="290px" v-model="mobile"></v-text-field>
                     </v-col>
                     <v-col cols="12">
                        <v-textarea :maxlength="maxLength" label="Mensaje *" auto-grow v-model="message"></v-textarea>
                     </v-col>
                     <v-col cols="12" align="right">
                        <v-btn
                           class="mr-4"
                           :style="{
                              backgroundColor: generalConfig.mainColor + ' !important',
                              color: generalConfig.colorText + ' !important'
                           }"
                           rounded
                           @click="sendContactInformation"
                        >
                           Enviar
                        </v-btn>
                     </v-col>
                  </v-row>
               </v-card-text>
            </v-card>
         </v-col>
         <v-col class="hidden-md-and-down" cols="6" style="margin: auto">
            <v-card elevation="0" shaped :style="{ maxHeight: '70vh', padding: '5%', marginRight: '5%' }">
               <v-card-title>Contáctanos</v-card-title>
               <v-card-text>
                  <v-row>
                     <v-col cols="6">
                        <v-text-field :maxlength="maxLength" label="Nombres *" required offset-y min-width="290px" v-model="names"></v-text-field>
                     </v-col>
                     <v-col cols="6">
                        <v-select label="Institución Educativa *" :items="heis" item-text="name" v-model="selectedHei" return-object></v-select>
                     </v-col>
                     <v-col cols="6">
                        <v-text-field :maxlength="maxLength" label="Correo *" required offset-y min-width="290px" v-model="email"></v-text-field>
                     </v-col>
                     <v-col cols="6">
                        <v-text-field :maxlength="maxLength" label="Celular *" required offset-y min-width="290px" v-model="mobile"></v-text-field>
                     </v-col>
                     <v-col cols="12">
                        <v-textarea :maxlength="maxLength" label="Mensaje *" auto-grow v-model="message"></v-textarea>
                     </v-col>
                     <v-col cols="12" align="right">
                        <v-btn
                           class="mr-4"
                           :style="{
                              backgroundColor: generalConfig.mainColor + ' !important',
                              color: generalConfig.colorText + ' !important'
                           }"
                           rounded
                           @click="sendContactInformation"
                        >
                           Enviar
                        </v-btn>
                     </v-col>
                  </v-row>
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
   </v-main>
</template>

<script>
import { mapState } from "vuex";
import * as ContactDA from "@/dataAccess/contactDA.js";

export default {
   name: "ContactUs",
   data() {
      return {
         //items: [this.contactUsConfig.contact.email],
         maxLength: 200,
         imageFile: null,
         imageURL: "",
         read_only: true,
         heis: [],
         names: null,
         email: null,
         mobile: null,
         message: null,
         selectedHei: null
      };
   },
   created() {
      this.imageURL = this.contactUsConfig.image;
   },
   mounted() {
      console.log("this.community.community.idCommunity", this.community.community.idCommunity);

      //This service should change to accept communityToken as parameter instead of idCommunity
      //Already told Nico, waiting for his answer
      ContactDA.getHeis(this.community.community.idCommunity)
         .then(response => {
            console.log("heis", response.data);
            this.heis = response.data.payload;
         })
         .catch(err => {
            console.log("An error ocurred while getting heis", err);
         });
   },
   computed: {
      ...mapState(["generalConfig", "contactUsConfig"]),
      ...mapState(["community"])
   },
   methods: {
      sendContactInformation() {
         if (this.names === "" || this.email === "" || this.mobile === "" || this.message === "" || !this.selectedHei) {
            this.$swal.fire("Error", "Ingrese todos los datos en Contáctanos", "error");
         }
         console.log("entered sendContactInformation");
         let body = {
            name: this.names,
            email: this.email,
            mobile: this.mobile,
            message: this.message,
            hei: this.selectedHei
         };
         ContactDA.sendContactInformation(body)
            .then(resp => {
               console.log(resp);
               this.$swal.fire("Mensaje enviado", "Su mensaje ha sido enviado con éxito", "success");
               this.names = "";
               this.email = "";
               this.mobile = "";
               this.message = "";
               this.selectedHei = null;
            })
            .catch(err => {
               console.log(err);
               this.$swal.fire("Mensaje no enviado", "Su mensaje no ha sido enviado", "error");
            });
      }
   }
};
</script>
