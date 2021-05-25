<template>
   <div>
      <v-card>
         <v-card-title> {{ this.activity.name }}</v-card-title>
         <v-divider></v-divider>
         <v-card-text>
            <v-row> </v-row>
            <v-row>
               <v-col cols="4">
                  <v-card>
                     <v-card-title>Estado de la actividad</v-card-title>
                     <v-card-text>
                        <v-row>
                           <v-icon color="primary">mdi-file-alert-outline</v-icon>
                        </v-row>
                        <v-row>
                           <p v-if="activeDeliverable">Actividad enviada</p>
                           <p v-else>Actividad sin enviar</p>
                        </v-row>
                     </v-card-text>
                  </v-card>
               </v-col>
               <v-col cols="4">
                  <v-card>
                     <v-card-title>Estado de la revision</v-card-title>
                     <v-card-text>
                        <v-row>
                           <v-icon color="primary">mdi-file-document-edit-outline</v-icon>
                        </v-row>
                        <v-row>
                           <p>
                              {{
                                 activeDeliverable
                                    ? deliverable.feedbacks == null
                                       ? "Actividad sin revisar"
                                       : "Actividad Revisada"
                                    : "Actividad sin enviar"
                              }}
                           </p>
                        </v-row>
                     </v-card-text>
                  </v-card>
               </v-col>
               <v-col cols="4">
                  <v-card>
                     <v-card-title>Ultima modificacion</v-card-title>
                     <v-card-text>
                        <v-row>
                           <v-icon color="primary">mdi-file-cog-outline</v-icon>
                        </v-row>
                        <v-row>
                           <p>{{ activeDeliverable ? deliverable.lastModification : "Actividad sin enviar" }}</p>
                        </v-row>
                     </v-card-text>
                  </v-card>
               </v-col>
            </v-row>
            <v-divider></v-divider>
            <br />
            <v-row>
               <h3 class="ml-5">{{ this.activity.description }}</h3>
            </v-row>
            <br />
            <div v-if="activeDeliverable && deliverable">
               <v-row v-for="(file, i) in deliverable.files" :key="i" class="ml-2 mb-2">
                  <v-col cols="5" class="p-0">
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
                  <v-col cols="7">
                     <v-dialog v-model="file.dialogFile" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                           <v-col cols="3" class="pointer pt-0" v-bind="attrs" v-on="on">
                              <v-icon color="gray">mdi-delete-outline</v-icon>
                              <!--Falta añadir estilo-->
                           </v-col>
                        </template>
                        <v-card>
                           <v-card-title>
                              <span class="headline">Eliminar Archivo</span>
                           </v-card-title>
                           <v-card-text>
                              <v-form>
                                 <v-container>
                                    <v-row>
                                       <v-col cols="12">
                                          <div class="text-center">
                                             <h2>
                                                ¿Está seguro de que desea eliminar el archivo
                                                {{ file.filename }}?
                                             </h2>
                                          </div>
                                       </v-col>
                                    </v-row>
                                 </v-container>
                              </v-form>
                           </v-card-text>
                           <v-card-actions>
                              <v-row>
                                 <v-col cols="2"> </v-col>
                                 <v-col cols="2">
                                    <v-btn class="primary" x-large @click="file.dialogFile = false">Cancelar</v-btn>
                                 </v-col>
                                 <v-col cols="3"> </v-col>
                                 <v-col cols="2">
                                    <v-btn
                                       class="primary"
                                       x-large
                                       @click="
                                          deleteFile(file);
                                          file.dialogFile = false;
                                       "
                                       >Aceptar</v-btn
                                    >
                                 </v-col>
                              </v-row>
                           </v-card-actions>
                        </v-card>
                     </v-dialog>
                  </v-col>
               </v-row>
               <div v-if="activeDeliverable && deliverable.feedbacks != null">
                  <v-row class="ml-2 mb-2">
                     <h3>Feedback:</h3>
                  </v-row>
                  <div v-for="(feedback, i) in deliverable.feedbacks" :key="i">
                     <v-row class="ml-2 mb-2"
                        ><h4>{{ feedback.comment }}</h4></v-row
                     >
                     <v-row class="ml-2 mb-2">
                        <v-avatar v-if="feedback.user.imageUrl">
                           <v-img :src="feedback.user.imageUrl"></v-img>
                        </v-avatar>
                        <v-avatar v-if="!feedback.user.imageUrl">
                           <v-img src="https://www.w3schools.com/howto/img_avatar2.png"></v-img>
                        </v-avatar>
                        {{ activeDeliverable ? feedback.user.name + " " + feedback.user.lastName : null }}
                     </v-row>
                  </div>
               </div>
            </div>
            <div v-else></div>
            <br />
            <v-row class="ml-2">
               <v-dialog v-model="dailogEntrega" max-width="700px">
                  <template v-slot:activator="{ on, attrs }">
                     <v-btn color="primary" dark large v-bind="attrs" v-on="on"> Añadir entrega </v-btn>
                  </template>
                  <v-card>
                     <v-card-title>
                        <h4>Añadir entrega</h4>
                     </v-card-title>
                     <v-divider></v-divider>
                     <v-card-text>
                        <v-form>
                           <v-row align="center" justify="center">
                              <v-col cols="10">
                                 <v-file-input
                                    outlined
                                    multiple
                                    chips
                                    v-model="fileImage"
                                    prepend-icon="mdi-file"
                                    label="Subir entrega de la actividad"
                                    accept=".pdf, .zip, .rar, .doc, .docx"
                                 >
                                    <template v-slot:selection="{ text }">
                                       <v-chip small label color="primary">
                                          {{ text }}
                                       </v-chip>
                                    </template>
                                 </v-file-input>
                              </v-col>
                           </v-row>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-row>
                           <v-col cols="2"></v-col>
                           <v-col cols="2">
                              <v-btn class="primary" x-large @click="dailogEntrega = false">Cancelar</v-btn>
                           </v-col>
                           <v-col cols="3"></v-col>
                           <v-col cols="2">
                              <v-btn
                                 class="primary"
                                 x-large
                                 :loading="loadingUpload"
                                 @click="
                                    UploadFiles();
                                    dailogEntrega = false;
                                 "
                                 >Aceptar</v-btn
                              >
                           </v-col>
                        </v-row>
                     </v-card-actions>
                  </v-card>
               </v-dialog>
            </v-row>
         </v-card-text>
      </v-card>
   </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import * as DeliverableDA from "@/dataAccess/deliverableDA.js";

export default {
   name: "MenuActiviyTeam",
   data() {
      return {
         dailogEntrega: false,
         fileImage: null,
         currentActivity: null,
         activeDeliverable: false,
         deliverable: null,
         dialogDeleteFile: false,
         loadingUpload: false
      };
   },
   computed: {
      ...mapGetters({
         activity: "activityParticipant/getActivity"
      }),
      ...mapState(["login"])
   },
   mounted() {
      console.log("TOKEN: ", process.env.VUE_APP_API_KEY_COMMUNITY);
      console.log("ID Actividad para usar: ", this.activityIndex);
      console.log("GETTER ", this.activity);
      this.loadDeliverable();
   },
   watch: {
      activity() {
         console.log("TOKEN: ", process.env.VUE_APP_API_KEY_COMMUNITY);
         console.log("GETTER ", this.activity);
         this.loadDeliverable();
      }
   },

   methods: {
      UploadFiles() {
         this.loadingUpload = true;
         console.log("archivos: ", this.fileImage);
         let deliverableBody = {
            idActivity: parseInt(this.activity.idActivity),
            idUEvent: parseInt(this.activity.idUEvent),
            idTeam: parseInt(this.login.login.idTeam),
            files: [],
            feedbacks: []
         };
         if (this.activeDeliverable) {
            //ya no se debe registrar el entregable
            var filesReponse = [];
            this.fileImage.forEach((file, index) => {
               var formData = new FormData();
               formData.append("file", file);
               console.log("se setea el archivo y queda: ", file, formData);
               formData.append("idDeliverable", parseInt(this.deliverable.idDeliverable));
               formData.append("order", index + 1 + this.searchMax(this.deliverable.files));
               formData.append("communityToken", process.env.VUE_APP_API_KEY_COMMUNITY);
               console.log("estoy enviando este archivo: ", formData);
               DeliverableDA.registerFiles(formData)
                  .then(res => {
                     this.loadingUpload = false;
                     if (res.data.status == "OK") {
                        filesReponse.push(1);
                        this.loadDeliverable();
                     } else {
                        filesReponse.push(0);
                     }
                  })
                  .catch(err => {
                     this.loadingUpload = false;
                     console.log(err.response.data);
                     filesReponse.push(0);
                  });
            });
            let errorFiles = false;
            let errorMessage = "Ocurrió un error de carga en los siguientes archivos:";
            filesReponse.forEach((file, index) => {
               if (file === 0) {
                  errorFiles = true;
                  errorMessage = errorMessage + " " + this.fileImage[index].name + ",";
               }
            });
            if (errorFiles) {
               this.$swal("Error en la carga de archivos", errorMessage, "error");
            } else {
               this.$swal("Carga Exitosa", "Se registró su entrega con éxito", "success");
            }
         } else {
            DeliverableDA.registerDeliberable(deliverableBody)
               .then(
                  resp => {
                     //se crea el entregable y se obtiene el id
                     console.log(resp);
                     if (resp.data.status == "OK") {
                        var filesReponse = [];
                        this.fileImage.forEach((file, index) => {
                           let formData = new FormData();
                           formData.append("file", file);
                           console.log("se setea el archivo y queda: ", file, formData);
                           formData.append("idDeliverable", parseInt(resp.data.payload.idDeliverable));
                           formData.append("order", index + 1);
                           formData.append("communityToken", process.env.VUE_APP_API_KEY_COMMUNITY);
                           console.log("estoy enviando este archivo: ", formData);
                           DeliverableDA.registerFiles(formData)
                              .then(res => {
                                 this.loadingUpload = false;
                                 if (res.data.status == "OK") {
                                    filesReponse.push(1);
                                 } else {
                                    filesReponse.push(0);
                                 }
                              })
                              .catch(err => {
                                 this.loadingUpload = false;
                                 console.log(err.response.data);
                                 filesReponse.push(0);
                              });
                        });
                        let errorFiles = false;
                        let errorMessage = "Ocurrió un error de carga en los siguientes archivos:";
                        filesReponse.forEach((file, index) => {
                           if (file === 0) {
                              errorFiles = true;
                              errorMessage = errorMessage + " " + this.fileImage[index].name + ",";
                           }
                        });
                        if (errorFiles) {
                           this.$swal("Error en la carga de archivos", errorMessage, "error");
                        } else {
                           this.$swal("Carga Exitosa", "Se registró su entrega con éxito", "success");
                        }
                     }
                  },
                  () => {
                     this.loadDeliverable();
                  }
               )
               .catch(err => {
                  console.log(err);
               });
         }
      },
      loadDeliverable() {
         console.log("login: ", this.login.login);
         this.deliverable = null;
         console.log("VOY A USAR ESTA ACTIVIDAD: ", this.activity.idActivity);
         DeliverableDA.getDeliverableId(this.activity.idUEvent, this.activity.idActivity, this.login.login.idTeam)
            .then(resp => {
               console.log("existencia de entregable: ", resp.data.payload);
               if (resp.data.payload == null) {
                  console.log("NO HAY ENTREGABLE");
                  //no existe entregable y se lo debe crear
                  this.activeDeliverable = false;
               } else {
                  //ya existe entregable
                  this.activeDeliverable = true;
                  console.log("idDeliverable: ", resp.data.payload[0].idDeliverable);
                  DeliverableDA.getDeliverable(parseInt(resp.data.payload[0].idDeliverable))
                     .then(res => {
                        console.log("entregable COMPLETO: ", res.data.payload);
                        for (let i = 0; i < res.data.payload.files.length; i++) {
                           res.data.payload.files[i].dialogFile = false;
                        }
                        this.deliverable = res.data.payload;
                        console.log("este es el deliverable en el state", this.deliverable.files);
                     })
                     .catch(err => {
                        console.log("se produjo un error: ", err.response.data);
                     });
               }
               console.log("hya entregable?", this.activeDeliverable);
            })
            .catch(err => {
               console.log("se produjo un error: ", err.response.data);
            });
      },
      redirect(file) {
         var fileLink = document.createElement("a");
         fileLink.href = file.fileURL;
         fileLink.target = "_blank";
         fileLink.click();
      },
      deleteFile(file) {
         console.log("archivo seleccionado", file);
         DeliverableDA.deleteFile(this.deliverable.idDeliverable, file.deliverableFileOrder)
            .then((resp, index) => {
               console.log(resp, index);
               this.$swal("Eliminación Exitosa", "Se eliminó el archivo con éxito", "success");
               this.loadDeliverable();
            })
            .catch(err => {
               console.log(err.response.data);
               this.$swal("Ocurrió un error", "No se pudo eliminar el archivo correctamente", "error");
            });
      },
      searchMax(array) {
         var max = 0;
         array.forEach(file => {
            if (file.deliverableFileOrder > max) {
               max = file.deliverableFileOrder;
            }
         });
         return max;
      }
   }
};
</script>
