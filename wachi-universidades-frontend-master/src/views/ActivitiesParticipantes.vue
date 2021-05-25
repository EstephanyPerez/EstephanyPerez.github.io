<template>
   <div>
      <v-row>
         <Header></Header>
      </v-row>
      <v-divider></v-divider>
      <v-row>
         <v-col cols="4"> </v-col>
         <v-col cols="7">
            <v-card>
               <v-card-title>Actividad 1</v-card-title>
               <v-card-text>
                  <v-row>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula odio vitae rutrum posuere. Vestibulum nulla risus,
                     tempor eget felis vitae, auctor scelerisque tortor.
                  </v-row>
                  <v-row>
                     <v-col cols="2">
                        <v-card>
                           <v-card-title>Estado de la actividad</v-card-title>
                           <v-card-text>
                              <v-row>
                                 <v-icon color="primary">mdi-file-alert-outline</v-icon>
                              </v-row>
                              <v-row>
                                 <p>Actividad sin enviar</p>
                              </v-row>
                           </v-card-text>
                        </v-card>
                     </v-col>
                     <v-col cols="2">
                        <v-card>
                           <v-card-title>Estado de la revision</v-card-title>
                           <v-card-text>
                              <v-row>
                                 <v-icon color="primary">mdi-file-document-edit-outline</v-icon>
                              </v-row>
                              <v-row>
                                 <p>Actividad sin revisar</p>
                              </v-row>
                           </v-card-text>
                        </v-card>
                     </v-col>
                     <v-col cols="2">
                        <v-card>
                           <v-card-title>Ultima modificacion</v-card-title>
                           <v-card-text>
                              <v-row>
                                 <v-icon color="primary">mdi-file-cog-outline</v-icon>
                              </v-row>
                              <v-row>
                                 <p>Aun no se ha enviado la actividad</p>
                              </v-row>
                           </v-card-text>
                        </v-card>
                     </v-col>
                  </v-row>
                  <v-row>
                     <p>Enunciado</p>
                  </v-row>
                  <v-row>
                     <p>Enunciado_de_Actividad.pdf</p>
                  </v-row>
                  <v-row>
                     <p>Actividad1.docx</p>
                  </v-row>
                  <v-row>
                     <v-dialog v-model="dailogEntrega" max-width="700px">
                        <template v-slot:activator="{ on, attrs }">
                           <v-btn color="primary" dark large v-bind="attrs" v-on="on">
                              Entrega
                           </v-btn>
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
                                          v-model="fileImage"
                                          prepend-icon="mdi-file"
                                          label="Subir entrega de la actividad"
                                          accept=".pdf"
                                       ></v-file-input>
                                    </v-col>
                                 </v-row>
                              </v-form>
                           </v-card-text>
                        </v-card>
                     </v-dialog>
                  </v-row>
                  <v-row>
                     <p>Añadir entrega</p>
                  </v-row>
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
   </div>
</template>

<script>
import Header from "@/components/HeaderParticipant.vue";

export default {
   components: {
      Header
   }
};
</script>
