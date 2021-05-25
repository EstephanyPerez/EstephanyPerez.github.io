<template>
   <v-main :style="{ backgroundColor: generalConfig.secondaryColor }">
      <v-row
         style="
    margin-bottom: 1%;margin-top: 1%
"
         no-gutters
         align="center"
         justify="center"
      >
         <v-col
            class="hidden-md-and-down pa-0 ma-0 pt-0 pb-0"
            cols="6"
            style="margin:auto"
         >
            <v-img
               lazy-src="https://picsum.photos/id/11/10/6"
               :src="imageURL"
               alt="Imagen de la tarjeta"
               :style="{ maxHeight: '70vh' }"
               v-if="this.imageURL != ''"
            >
            </v-img>
         </v-col>

         <v-col class="hidden-lg-and-up mb-4" cols="8">
            <v-card
               class="d-flex justify-center"
               elevation="0"
               shaped
               :style="{ maxHeight: '70vh', padding: '2%', marginRight: '2%' }"
            >
               <v-row>
                  <v-card-title class="pt-2 ml-4">Contáctanos</v-card-title>

                  <v-card-text class="pa-0 ml-8 mr-8 ">
                     <v-row>
                        <v-col class=" ma-0" cols="6">
                           <v-text-field
                              class="pa-0 ma-0"
                              :maxlength="maxLength"
                              label="Nombres *"
                              required
                              offset-y
                              min-width="290px"
                              v-model="names"
                           ></v-text-field>
                        </v-col>
                        <v-col class=" ma-0" cols="6">
                           <v-select
                              v-if="contactUsConfig.contact.useApi"
                              class="pa-0 ma-0"
                              label="Correo institucional *"
                              :items="items"
                              item-text="name"
                              v-model="selectedHei"
                              return-object
                           ></v-select>
                           <v-text-field
                              v-else
                              class="pa-0 ma-0"
                              :label="contactUsConfig.contact.email"
                              disabled
                              offset-y
                              min-width="290px"
                           ></v-text-field>
                        </v-col>
                     </v-row>
                     <v-row>
                        <v-col class=" ma-0" cols="6">
                           <v-text-field
                              class="pa-0 ma-0"
                              :maxlength="maxLength"
                              label="Correo *"
                              required
                              offset-y
                              min-width="290px"
                              v-model="email"
                           ></v-text-field>
                        </v-col>
                        <v-col class=" ma-0" cols="6">
                           <v-text-field
                              class="pa-0 ma-0"
                              :maxlength="maxLength"
                              label="Celular *"
                              required
                              offset-y
                              min-width="290px"
                              v-model="mobile"
                           ></v-text-field>
                        </v-col>
                     </v-row>
                     <v-col class="pa-0 ma-0" cols="12">
                        <v-textarea
                           class="pa-0 ma-0"
                           :maxlength="maxLength"
                           label="Mensaje *"
                           auto-grow
                           v-model="message"
                        ></v-textarea>
                     </v-col>
                     <v-col class="pa-3 ma-0" cols="12" align="right">
                        <v-btn
                           :style="{
                              backgroundColor:
                                 generalConfig.mainColor + ' !important',
                              color: generalConfig.colorText + ' !important'
                           }"
                           rounded
                           @click="sendContactInformation"
                        >
                           Enviar
                        </v-btn>
                     </v-col>
                  </v-card-text>
               </v-row>
            </v-card>
         </v-col>

         <v-col class="hidden-md-and-down" cols="6">
            <v-card
               class="d-flex justify-start"
               elevation="0"
               shaped
               :style="{ maxHeight: '70vh', padding: '2%', marginRight: '2%' }"
            >
               <v-row>
                  <v-card-title class="pt-2 ml-4">Contáctanos</v-card-title>

                  <v-card-text class="pa-0 ml-8 mr-8">
                     <v-row>
                        <v-col class=" ma-0" cols="6">
                           <v-text-field
                              :maxlength="maxLength"
                              label="Nombres *"
                              required
                              offset-y
                              min-width="290px"
                              v-model="names"
                           ></v-text-field>
                        </v-col>
                        <v-col class=" ma-0" cols="6">
                           <v-select
                              v-if="contactUsConfig.contact.useApi"
                              label="Correo institucional *"
                              :items="items"
                              item-text="name"
                              v-model="selectedHei"
                              return-object
                           ></v-select>
                           <v-text-field
                              v-else
                              :label="contactUsConfig.contact.email"
                              disabled
                              offset-y
                              min-width="290px"
                           ></v-text-field>
                        </v-col>
                     </v-row>
                     <v-row>
                        <v-col class=" ma-0" cols="6">
                           <v-text-field
                              :maxlength="maxLength"
                              label="Correo *"
                              required
                              offset-y
                              min-width="290px"
                              v-model="email"
                           ></v-text-field>
                        </v-col>
                        <v-col class=" ma-0" cols="6">
                           <v-text-field
                              :maxlength="maxLength"
                              label="Celular *"
                              required
                              offset-y
                              min-width="290px"
                              v-model="mobile"
                           ></v-text-field>
                        </v-col>
                     </v-row>
                     <v-col class="pa-0 ma-0" cols="12">
                        <v-textarea
                           :maxlength="maxLength"
                           label="Mensaje *"
                           auto-grow
                           v-model="message"
                        ></v-textarea>
                     </v-col>
                     <v-col class="pa-3 ma-0" cols="12" align="right">
                        <v-btn
                           :style="{
                              backgroundColor:
                                 generalConfig.mainColor + ' !important',
                              color: generalConfig.colorText + ' !important'
                           }"
                           rounded
                           @click="sendContactInformation"
                        >
                           Enviar
                        </v-btn>
                     </v-col>
                  </v-card-text>
               </v-row>
            </v-card>
         </v-col>
      </v-row>
   </v-main>
</template>

<script>
import * as ContactDA from "@/dataAccess/contactDA.js";
import { mapState, mapActions } from "vuex";

export default {
   name: "ContactUs",
   data() {
      return {
         imageFile: null,
         imageURL: "",
         read_only: true,
         items: []
      };
   },
   created() {
      this.imageURL = this.contactUsConfig.image;
      if (this.contactUsConfig.contact.useApi) {
         console.log("GAAA");
         ContactDA.getHeis()
            .then(res => {
               for (let i = 0; i < res.data.payload.length; i++)
                  this.items.push(res.data.payload[i].contactEmail);
            })
            .catch(err => {
               console.log("An error ocurred while getting heis", err);
            });
      }
   },
   computed: {
      ...mapState([
         "generalConfig",
         "contactUsConfig",
         "c_editComponentContactUs",
         "urlContactImage"
      ]),
      style_div_style_focus() {
         return {
            "--text-color": this.generalConfig.mainColor
         };
      }
   },

   methods: {
      ...mapActions(["updateContactImage", "updateContactImageURL"]),

      onSelectFile() {
         //if (!this.read_only) {
         const input = this.$refs.fileInput;
         console.log("ESTE ES EL REF");
         console.log(input);
         const files = input.files;

         console.log(files);
         if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
               this.imageFile = files[0];
               this.imageURL = e.target.result;
               console.log("CONTACTANOS");
               console.log(this.imageFile);
               //console.log("TARGET");
               //console.log(e.target.result);
            };
            //console.log(files[0]);
            reader.readAsDataURL(files[0]);
            this.$emit("input", files[0]);
            this.updateContactImage(files[0]);
            this.updateContactImageURL(this.imageURL);
         }
         //}
      }
   }
};
</script>
