<template>
   <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <v-row>
         <v-col cols="3"></v-col>
         <v-col cols="9">
            <h1>KIT ORGANIZADOR</h1>
            <h1>{{ organizationalKit.hei.name }}</h1>
            <h1 v-if="organizationalKit.filesType == 1" class="mt-5">INFORMACIÓN</h1>
            <h1 v-else-if="organizationalKit.filesType == 2" class="mt-5">DISEÑO</h1>
            <h1 v-else class="mt-5">DOCUMENTOS</h1>
            <v-row>
               <v-col cols="4">
                  <v-btn :color="color" dark large @click="$router.back()">
                     <v-icon left> mdi-arrow-left </v-icon>
                     Regresar
                  </v-btn>
               </v-col>
            </v-row>
            <v-row>
               <v-col cols="4">
                  <v-dialog v-model="dialogUploadFile" persistent max-width="600px">
                     <template v-slot:activator="{ on, attrs }">
                        <v-btn :color="color" dark large v-bind="attrs" v-on="on">
                           <v-icon left> mdi-plus </v-icon>
                           AGREGAR DOCUMENTO
                        </v-btn>
                     </template>
                     <v-card>
                        <v-file-input class="pt-5 px-5" outlined label="Seleccione aquí" prepend-icon="mdi-pencil" v-model="file"></v-file-input>
                        <v-card-actions>
                           <v-row align="center" justify="center">
                              <v-col cols="3" class="mr-8">
                                 <v-btn :color="color" @click="dialogUploadFile = false" large> Cancelar </v-btn>
                              </v-col>
                              <v-col cols="3" class="ml-8">
                                 <v-btn :color="color" :loading="loadingUpload" @click="uploadFile()" dark large> Aceptar </v-btn>
                              </v-col>
                           </v-row>
                        </v-card-actions>
                     </v-card>
                  </v-dialog>
               </v-col>
            </v-row>
            <v-row v-for="(file, i) in heiFiles" :key="i" class="ml-2 mb-2">
               <v-col cols="3" class="p-0">
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
               <v-col cols="2">
                  <v-dialog v-model="file.dialogDeleteFile" persistent max-width="600px">
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
                                 <v-btn :color="color" x-large @click="file.dialogDeleteFile = false">Cancelar</v-btn>
                              </v-col>
                              <v-col cols="3"> </v-col>
                              <v-col cols="2">
                                 <v-btn :color="color" x-large @click="deleteFile(file)" :disabled="blockUpload">Aceptar</v-btn>
                              </v-col>
                           </v-row>
                        </v-card-actions>
                     </v-card>
                  </v-dialog>
               </v-col>
            </v-row>
         </v-col>
      </v-row>
   </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar2.vue";
import * as OrganizationalKitDA from "@/dataAccess/organizationalKitDA.js";
import { mapState } from "vuex";

export default {
   name: "OrganizationalKitHeiFiles",
   components: {
      Sidebar,
      Navbar
   },
   computed: {
      ...mapState(["user", "organizationalKit", "style"])
   },
   data() {
      return {
         dialogUploadFile: false,
         blockUpload: false,
         file: null,
         heiFiles: [],
         loadingUpload: false,
         color: "FFFF"
      };
   },
   methods: {
      uploadFile() {
         this.blockUpload = true;
         this.loadingUpload = true;
         OrganizationalKitDA.uploadFile(this.organizationalKit.hei.idHei, this.file, this.organizationalKit.filesType)
            .then(response => {
               console.log(response);
               this.dialogUploadFile = false;
               this.blockUpload = false;
               this.loadingUpload = false;
               this.$swal("Subida Exitosa", "Se subió el archivo con éxito", "success");
               this.getFiles();
               this.file = null;
            })
            .catch(error => {
               console.log(error.response.data);
               this.loadingUpload = false;
               this.$swal("Ocurrió un error", "No se pudo subir el archivo correctamente", "error");
            });
      },
      deleteFile(file) {
         OrganizationalKitDA.deleteFile(file.idFile)
            .then(response => {
               console.log(response);
               file.dialogDeleteFile = false;
               this.getFiles();
               this.$swal("Eliminación Exitosa", "Se eliminó el archivo con éxito", "success");
            })
            .catch(error => {
               console.log(error.response.data);
               this.$swal("Ocurrió un error", "No se pudo eliminar el archivo correctamente", "error");
            });
      },
      redirect(file) {
         var fileLink = document.createElement("a");
         fileLink.href = file.url;
         fileLink.target = "_blank";
         fileLink.click();
      },
      getFiles() {
         OrganizationalKitDA.getFiles(this.organizationalKit.hei.idHei, this.organizationalKit.filesType)
            .then(response => {
               console.log(response);
               for (let i = 0; i < response.data.payload.kitFiles.length; i++) response.data.payload.kitFiles.dialogDeleteFile = false;
               this.heiFiles = response.data.payload.kitFiles;
            })
            .catch(error => {
               console.log(error.response);
               this.$swal("Ocurrió un error", "No se pudo cargar los archivos correctamente", "error");
            });
      }
   },
   mounted() {
      this.color = this.style.style.colors.primary;
      this.getFiles();
   }
};
</script>
