<template>
   <v-main :style="{ backgroundColor: secondaryColor }">
      <v-row class="hidden-lg-and-up ml-2 mb-2" v-if="!read_only">
         <label>Editar imagen (no visible):</label>
         <input
            v-if="!read_only"
            class="file-input"
            ref="fileInput"
            type="file"
            @input="onSelectFile"
         />
      </v-row>
      <v-row
         style="
         margin-bottom: 1%; margin-top: 1%
"
         no-gutters
         align="center"
         justify="center"
      >
         <v-col
            class="hidden-md-and-down pa-0 ma-0 pt-0 pb-0"
            md="6"
            style="margin:auto"
         >
            <v-btn
               color="green"
               fab
               absolute
               large
               dark
               top
               right
               @click="editComponent()"
               :style="{ top: '20px', right: '20px' }"
            >
               <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-img
               lazy-src="https://picsum.photos/id/11/10/6"
               :src="imageURL"
               alt="Imagen de la tarjeta"
               :style="{ height: '70vh' }"
            >
               <input
                  v-if="!read_only"
                  class="file-input"
                  ref="fileInput"
                  type="file"
                  @input="onSelectFile"
               />
            </v-img>
         </v-col>

         <v-col
            class="hidden-lg-and-up pa-0 ma-0 pt-0 pb-0"
            cols="1"
            style="margin:auto"
         >
            <v-btn
               color="green"
               fab
               absolute
               large
               dark
               top
               right
               @click="editComponent()"
               :style="{ top: '20px', right: '20px' }"
            >
               <v-icon>mdi-pencil</v-icon>
            </v-btn>
         </v-col>

         <v-col class="hidden-lg-and-up" cols="8">
            <v-card
               elevation="0"
               shaped
               tile
               :style="{ maxHeight: '70vh', padding: '5%', marginRight: '5%' }"
            >
               <v-card-title>Contáctanos</v-card-title>
               <v-card-text>
                  <v-row>
                     <v-col cols="6">
                        <v-text-field
                           disabled
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
                           disabled
                           label="correo Institucional *"
                           :items="items"
                           item-text="name"
                           v-model="selectedHei"
                           return-object
                        ></v-select>
                     </v-col>
                     <v-col cols="6">
                        <v-text-field
                           disabled
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
                           disabled
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
                           disabled
                           :maxlength="maxLength"
                           label="Mensaje *"
                           auto-grow
                           v-model="message"
                        ></v-textarea>
                     </v-col>
                     <v-col cols="12" align="right">
                        <v-btn
                           disabled
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
               tile
               :style="{ maxHeight: '70vh', padding: '5%', marginRight: '5%' }"
            >
               <v-card-title>Contáctanos</v-card-title>
               <v-card-text>
                  <v-row>
                     <v-col cols="6">
                        <v-text-field
                           disabled
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
                           disabled
                           label="Institución Educativa *"
                           :items="items"
                           item-text="name"
                           v-model="selectedHei"
                           return-object
                        ></v-select>
                     </v-col>
                     <v-col cols="6">
                        <v-text-field
                           disabled
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
                           disabled
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
                           disabled
                           :maxlength="maxLength"
                           label="Mensaje *"
                           auto-grow
                           v-model="message"
                        ></v-textarea>
                     </v-col>
                     <v-col cols="12" align="right">
                        <v-btn
                           disabled
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
import Swal from "sweetalert2";
//import * as ContactDA from "@/dataAccess/contactDA.js";

export default {
   name: "ContactUs",
   props: ["mainColor", "secondaryColor"],
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
      ])
   },

   methods: {
      ...mapActions([
         "editComponentContactUs",
         "editComponent3",
         "editComponent1",
         "editComponent2",
         "updateContactImage",
         "updateContactImageURL"
      ]),
      editComponent() {
         if (this.c_editComponentContactUs == true) {
            this.editComponentContactUs(false);
            this.editComponent1(false);
            this.editComponent2(false);
            this.editComponent3(false);
            this.read_only = true;
         } else {
            this.editComponentContactUs(true);
            this.editComponent1(false);
            this.editComponent2(false);
            this.editComponent3(false);
            this.read_only = false;
         }
      },
      onSelectFile() {
         //if (!this.read_only) {
         const input = this.$refs.fileInput;
         const files = input.files;

         console.log(files);

         const fileName = files[0].name;
         let idxDot = fileName.lastIndexOf(".") + 1;
         let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
         var filesize = (files[0].size / 1024 / 1024).toFixed(4); // MB
         console.log(filesize);
         if (filesize < 10) {
            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
               if (files && files[0]) {
                  const reader = new FileReader();
                  reader.onload = e => {
                     this.imageFile = files[0];
                     this.imageURL = e.target.result;
                  };
                  reader.readAsDataURL(files[0]);
                  this.$emit("input", files[0]);
                  this.updateContactImage(files[0]);
                  this.updateContactImageURL(this.imageURL);
               }
            } else {
               Swal.fire({
                  icon: "error",
                  title: '<p style="font-family:Roboto;">Error</p>',
                  html:
                     '<p style="font-family:Roboto;">Solo archivos tipo jpg/jpeg y png son permitidos!</p>'
               });
               return;
            }
         } else {
            Swal.fire({
               icon: "error",
               title: '<p style="font-family:Roboto;">Error</p>',
               html:
                  '<p style="font-family:Roboto;">Tamaño de archivo muy grande! Max. 10MB</p>'
            });
            return;
         }
      }
   }
};
</script>
