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

         <v-col class="hidden-lg-and-up" cols="8">
            <v-card
               elevation="0"
               shaped
               tile
               :style="{ height: '70vh', padding: '5%', marginRight: '5%' }"
            >
               <v-card-title>Contáctanos</v-card-title>
               <v-card-text>
                  <v-row>
                     <v-col cols="6">
                        <v-text-field
                           :maxlength="maxLength"
                           label="Nombres *"
                           required
                           offset-y
                           min-width="290px"
                           v-model="names"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="6">
                        <v-select
                           label="Correo institucional *"
                           :items="items"
                           item-text="name"
                           v-model="selectedHei"
                           return-object
                        ></v-select>
                     </v-col>
                     <v-col cols="6">
                        <v-text-field
                           :maxlength="maxLength"
                           label="Correo *"
                           required
                           offset-y
                           min-width="290px"
                           v-model="email"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="6">
                        <v-text-field
                           :maxlength="maxLength"
                           label="Celular *"
                           required
                           offset-y
                           min-width="290px"
                           v-model="mobile"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12">
                        <v-textarea
                           :maxlength="maxLength"
                           label="Mensaje *"
                           auto-grow
                           v-model="message"
                        ></v-textarea>
                     </v-col>
                     <v-col cols="12" align="right">
                        <v-btn
                           class="mr-4"
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
                  </v-row>
               </v-card-text>
            </v-card>
         </v-col>

         <v-col class="hidden-md-and-down" cols="6">
            <v-card
               elevation="0"
               shaped
               :style="{ maxHeight: '70vh', padding: '5%', marginRight: '5%' }"
            >
               <v-card-title>Contáctanos</v-card-title>
               <v-card-text>
                  <v-row>
                     <v-col cols="6">
                        <v-text-field
                           :maxlength="maxLength"
                           label="Nombres *"
                           required
                           offset-y
                           min-width="290px"
                           v-model="names"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="6">
                        <v-select
                           label="Institución Educativa *"
                           :items="items"
                           item-text="name"
                           v-model="selectedHei"
                           return-object
                        ></v-select>
                     </v-col>
                     <v-col cols="6">
                        <v-text-field
                           :maxlength="maxLength"
                           label="Correo *"
                           required
                           offset-y
                           min-width="290px"
                           v-model="email"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="6">
                        <v-text-field
                           :maxlength="maxLength"
                           label="Celular *"
                           required
                           offset-y
                           min-width="290px"
                           v-model="mobile"
                        ></v-text-field>
                     </v-col>
                     <v-col cols="12">
                        <v-textarea
                           :maxlength="maxLength"
                           label="Mensaje *"
                           auto-grow
                           v-model="message"
                        ></v-textarea>
                     </v-col>
                     <v-col cols="12" align="right">
                        <v-btn
                           class="mr-4"
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
                  </v-row>
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
   </v-main>
</template>

<script>
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
      /*if (this.contactUsConfig.contact.useApi) {
         ContactDA.getHeis()
            .then(res => {
               for (let i = 0; i < res.data.payload.length; i++)
                  this.items.push(res.data.payload[i].contactEmail);
            })
            .catch(err => {
               console.log("An error ocurred while getting heis", err);
            });
      }*/
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
      ...mapActions(["updateContactImage", "updateContactImageURL"])
   }
};
</script>
