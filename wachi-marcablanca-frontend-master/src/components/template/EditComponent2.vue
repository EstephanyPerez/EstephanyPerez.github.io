<template>
   <v-card v-if="this.c_editComponent2" :style="{ height: '100%' }">
      <v-card-title>
         Personalización
      </v-card-title>
      <v-card-text>
         <div>
            <p>Texto del título</p>
            <v-textarea
               class="edit-input"
               solo
               name="input-7-4"
               v-model="multiCardConfig.title.text"
               auto-grow
               filled
               rows="1"
               dense
               counter="70"
               :maxlength="70"
               placeholder="Título"
               @focus="focusSelectItem('div-titleC2')"
               @blur="leaveSelectedItem('div-titleC2')"
            ></v-textarea>
         </div>

         <div>
            <p>Texto de la descripción</p>
            <v-textarea
               class="edit-input"
               solo
               name="input-7-4"
               v-model="multiCardConfig.description.text"
               auto-grow
               filled
               dense
               rows="3"
               counter="100"
               :maxlength="100"
               placeholder="Descripción"
               @focus="focusSelectItem('div-ParagraphC2')"
               @blur="leaveSelectedItem('div-ParagraphC2')"
            ></v-textarea>
         </div>

         <div>
            <p>Tarjetas</p>

            <v-expansion-panels>
               <v-expansion-panel
                  v-for="(item, i) in multiCardConfig.cards"
                  :key="i"
               >
                  <v-expansion-panel-header>
                     Tarjeta {{ i + 1 }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                     <div>
                        <div>
                           <h4>Titulo de la tarjeta</h4>
                           <div
                              :id="'title-card-edit' + i"
                              :style="{ display: flagParts[i].title.display }"
                           >
                              <v-textarea
                                 class="edit-input"
                                 solo
                                 name="input-7-4"
                                 v-model="multiCardConfig.cards[i].title"
                                 auto-grow
                                 filled
                                 rows="1"
                                 dense
                                 counter="14"
                                 :maxlength="14"
                                 placeholder="Título de la tarjeta"
                                 @focus="focusSelectItem('title-card-text' + i)"
                                 @blur="
                                    leaveSelectedItem('title-card-text' + i)
                                 "
                              ></v-textarea>
                           </div>
                        </div>

                        <div>
                           <h4>Texto de la tarjeta</h4>
                           <div
                              :id="'text-card-edit' + i"
                              :style="{ display: flagParts[i].text.display }"
                           >
                              <v-textarea
                                 class="edit-input"
                                 solo
                                 name="input-7-4"
                                 v-model="multiCardConfig.cards[i].text"
                                 auto-grow
                                 filled
                                 rows="2"
                                 dense
                                 counter="80"
                                 :maxlength="80"
                                 placeholder="Texto de la tarjeta"
                                 @focus="focusSelectItem('body-card-text' + i)"
                                 @blur="leaveSelectedItem('body-card-text' + i)"
                              ></v-textarea>
                           </div>
                        </div>
                        <div>
                           <v-checkbox
                              v-model="flagParts[i].image.flag"
                              label="Imagen de la tarjeta"
                              hide-details
                              @change="handleSelect('image', i)"
                           ></v-checkbox>
                           <div
                              :id="'image-card-edit' + i"
                              :style="{ display: flagParts[i].image.display }"
                           ></div>
                        </div>
                     </div>
                  </v-expansion-panel-content>
               </v-expansion-panel>
            </v-expansion-panels>
         </div>
      </v-card-text>
   </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
   data() {
      return {
         flagParts: [],
         imgBackground: [],
         prueba: { indice1: "12", indice2: "11" }
      };
   },
   computed: {
      ...mapState([
         "multiCardConfig",
         "c_editComponent1",
         "c_editComponent2",
         "c_editComponent3",
         "multicard0",
         "multicard1",
         "multicard2"
      ])
   },
   updated() {
      console.log(this.multiCardConfig);
   },
   beforeMount() {
      this.multiCardConfig.cards.map((item, index) => {
         console.log(index, item);
         this.flagParts.push({
            title:
               typeof item.title == "undefined"
                  ? { display: "none", flag: false }
                  : { display: "block", flag: true },
            text:
               typeof item.text == "undefined"
                  ? { display: "none", flag: false }
                  : { display: "block", flag: true },
            image:
               typeof item.image == "undefined"
                  ? { display: "none", flag: false }
                  : { display: "block", flag: true }
         });
         this.imgBackground.push(item.image);
      });
      //console.log(this.flagParts, this.imgBackground);
   },
   methods: {
      ...mapActions([
         "editComponent1",
         "updateMulticardImg0",
         "updateMulticardImg1",
         "updateMulticardImg2"
      ]),
      previewImage(pos) {
         if (pos == 0) {
            this.updateMulticardImg0(this.imgBackground[0]);
            //console.log(this.multicard0);
            this.image.multiCard1 = URL.createObjectURL(
               this.imgBackground[pos]
            );
         } else if (pos == 1) {
            this.updateMulticardImg1(this.imgBackground[1]);
            this.image.multiCard2 = this.imgBackground[1];
         } else {
            this.updateMulticardImg2(this.imgBackground[2]);
            this.image.multiCard3 = this.imgBackground[2];
         }
      },
      focusSelectItem(itemId) {
         document.getElementById(itemId).style.outline = "3px solid #03989A";
      },
      leaveSelectedItem(itemId) {
         document.getElementById(itemId).style.outline = "0px solid #03989A";
      },
      alignTextCard(text, pos) {
         console.log(text, pos);
         this.multiCardConfig.cards[pos].align = text;
         var _text = "text-card-text" + pos;
         console.log("_text", _text);
         document.getElementById(_text).style.textAlign = text;
      },
      validateMinimo(pos) {
         var cont = 0;
         if (this.flagParts[pos].title.flag) {
            cont += 1;
         }
         if (this.flagParts[pos].text.flag) {
            cont += 1;
         }
         if (this.flagParts[pos].image.flag) {
            cont += 1;
         }
         if (cont == 1) {
            return true;
         }
         return false;
      },
      handleSelect(element, pos) {
         console.log(element, pos);
         const estaMinimo = this.validateMinimo(pos);
         if (estaMinimo) {
            return;
         }

         if (element.localeCompare("title") == 0) {
            if (!this.flagParts[pos].title.flag) {
               document.getElementById("title-card-text" + pos).style.display =
                  "none";
               this.flagParts[pos].title = { display: "none", flag: false };

               this.multiCardConfig.cards[pos]["title"] = "";
            } else {
               console.log(this.multiCardConfig.cards[pos]);

               console.log(this.multiCardConfig.cards[pos]);
               this.flagParts[pos].title = { display: "block", flag: true };
               document.getElementById("title-card-text" + pos).style.display =
                  "block";
            }
         } else if (element.localeCompare("text") == 0) {
            console.log(this.flagParts[pos].text);
            if (!this.flagParts[pos].text.flag) {
               document.getElementById("body-card-text" + pos).style.display =
                  "none";
               this.flagParts[pos].text = { display: "none", flag: false };

               this.multiCardConfig.cards[pos]["text"] = "";
            } else {
               this.flagParts[pos].text = { display: "block", flag: true };
               document.getElementById("body-card-text" + pos).style.display =
                  "block";
            }
         } else if (element.localeCompare("image") == 0) {
            console.log(this.flagParts[pos].image);
            if (!this.flagParts[pos].image.flag) {
               document.getElementById("image-card-text" + pos).style.display =
                  "none";
               this.multiCardConfig.cards[pos]["image"] = "";
               this.flagParts[pos].image = { display: "none", flag: false };
            } else {
               this.flagParts[pos].image = { display: "block", flag: true };
               document.getElementById("image-card-text" + pos).style.display =
                  "block";
            }
         }
      }
   }
};
</script>
