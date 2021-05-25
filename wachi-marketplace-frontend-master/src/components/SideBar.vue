<template>
   <v-navigation-drawer permanent color="#FFFFFF">
      <v-divider></v-divider>

      <!--SideBar Vendedor
         <v-list dense nav class="mt-5">
            Compras
            <v-list-group :value="false" class="pl-0" no-action>
               <template v-slot:activator>
                  <v-list-item class="px-0 py-0">
                     <v-list-item-icon>
                        <v-icon color="black" class="">mdi-cart</v-icon>
                     </v-list-item-icon>
                     <v-list-item-content>
                        <v-list-item-title class="blackText"
                           >Compras</v-list-item-title
                        >
                     </v-list-item-content>
                  </v-list-item>
               </template>
               <v-list-item
                  v-for="(info, i) in currentShop"
                  :key="i"
                  :to="info[1]"
               >
                  <v-list-item-content>
                     <v-list-item-title
                        v-text="info[0]"
                        class="blackText"
                     ></v-list-item-title>
                  </v-list-item-content>
               </v-list-item>
            </v-list-group>

            Ventas
            <v-list-group :value="false" class="v-list-group">
               <template v-slot:activator>
                  <v-list-item class="px-0 py-0">
                     <v-icon color="black" class="pr-5">mdi-store</v-icon>
                     <v-list-item-title class="blackText"
                        >Ventas</v-list-item-title
                     >
                  </v-list-item>
               </template>
               <v-list-item
                  v-for="(info, i) in currentSell"
                  :key="i"
                  :to="info[1]"
               >
                  <v-icon
                     v-text="info[2]"
                     class="pr-2 ml-3"
                     color="black"
                  ></v-icon>
                  <v-list-item-title
                     v-text="info[0]"
                     class="blackText pr-2 ml-4"
                  ></v-list-item-title>
               </v-list-item>
            </v-list-group>
         </v-list>-->
      <v-list dense nav class="pl-0 ml-0">
         <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
         >
            <template v-slot:activator>
               <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
               </v-list-item-content>
            </template>

            <v-list-item
               v-for="child in item.items"
               :key="child.title"
               link
               :to="child.link"
               @click="navbarClickActions(child.action)"
            >
               <v-list-item-content>
                  <v-list-item-title v-text="child.title"></v-list-item-title>
               </v-list-item-content>
            </v-list-item>
         </v-list-group>
      </v-list>
      <v-dialog v-model="dialog" max-width="290">
         <v-card>
            <v-card-text
               class="headline justify-center pt-2"
               style="color:black"
            >
               ¿Deseas vender tus productos o servicios?
            </v-card-text>

            <v-card-text
               >Requerimos que completes cierta información para que puedas
               publicar libremente tus productos y/o servicios</v-card-text
            >
            <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn color="green darken-1" text @click="dialog = false">
                  Cancelar
               </v-btn>
               <v-btn color="green darken-1" text @click="goProfile()">
                  Continuar
               </v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </v-navigation-drawer>
</template>

<script>
import * as userDA from "@/dataAccess/user.js";
import { mapGetters } from "vuex";
export default {
   name: "SideBar",
   components: {},
   data() {
      return {
         currentSell: [
            ["Publicaciones", "/myPublications"],
            ["Pedidos", "/orders" /* "mdi-paperclip", "/activities" */],
            ["Preguntas" /* "mdi-lightbulb-on", "/challenges" */],
            ["Reportes" /* "mdi-account-voice","/campusCoordinators" */]
         ],
         currentShop: [["Compras", "/myShoppingHistory"], ["Preguntas"]],
         items: [
            {
               action: "mdi-cart",
               items: [
                  { title: "Compras", link: "/myShoppingHistory" },
                  { title: "Preguntas", link: "/QuestionsCustomer" }
               ],
               title: "Compras"
            },
            {
               action: "mdi-store",
               active: false,
               items: [
                  {
                     title: "Publicaciones",
                     link: "",
                     action: "misPublicaciones"
                  },
                  { title: "Pedidos", link: "", action: "misPedidos" },
                  {
                     title: "Preguntas",
                     link: "",
                     action: "misPreguntas"
                  },
                  { title: "Reportes", link: "", action: "misReportes" }
               ],
               title: "Ventas"
            }
         ],
         validateSeller: null,
         dataUser: {
            id: ""
         },
         dialog: false
      };
   },
   mounted() {
      if (this.getUser().session.authenticated) {
         this.dataUser.id = this.getUser().data.id;
         userDA.ProfileStructure(this.dataUser).then(res => {
            console.log("Info del ususario", res.data.payload.market.seller);
            this.validateSeller = res.data.payload.market.seller;
         });
      }
   },
   methods: {
      ...mapGetters("user", ["getUser"]),
      example() {},
      navbarClickActions(action) {
         switch (action) {
            case "miTienda":
               if (this.validateSeller) this.$router.push("/myPublications");
               else this.dialog = true;
               break;
            case "misPublicaciones":
               if (this.validateSeller) this.$router.push("/myPublications");
               else this.dialog = true;
               break;
            case "misPedidos":
               if (this.validateSeller) this.$router.push("/orders");
               else this.dialog = true;
               break;
            case "misPreguntas":
               if (this.validateSeller) this.$router.push("/questions");
               else this.dialog = true;
               break;
            case "misReportes":
               if (this.validateSeller) this.$router.push("/salesReports");
               else this.dialog = true;
               break;
         }
      }
   }
};
</script>
