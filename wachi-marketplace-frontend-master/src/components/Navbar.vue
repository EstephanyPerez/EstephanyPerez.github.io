<template>
   <!--PARA MODIFICAR LAS OPCIONES MOSTRADAS DEBEN CAMBIAR LOS SGTES VALORES: generalConfig.communityId-->
   <v-main>
      <!--VISTA RESPONSIVE-->
      <v-app-bar class="d-md-none" flat>
         <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
         <v-img
            v-if="flag"
            alt="img-navbar"
            :src="urlLogo"
            style="
               min-heigth: 2vh;
               max-heigth: 2vh;
               min-width: 3vw;
               max-width: 5vw;
            "
            position="left"
            contain
         ></v-img>
         <v-img
            v-else
            alt="img-navbar"
            :src="generalConfig.logo"
            style="
               min-heigth: 2vh;
               max-heigth: 2vh;
               min-width: 3vw;
               max-width: 5vw;
            "
            position="left"
            contain
         ></v-img>
      </v-app-bar>
      <v-navigation-drawer
         v-model="drawer"
         class="d-md-none"
         app
         fixed
         clipped-left
         absolute
         floating
         temporary
         offset-y
      >
         <v-list nav dense>
            <!-- CELLPHONE  ===============================-->

            <v-list-item>
               <v-row
                  align="center"
                  style="padding-bottom: 0px"
                  v-if="showEditButton"
               >
                  <v-col cols="2">
                     <v-file-input
                        v-if="otherProfile != 'yes' && showEditButton"
                        hide-details
                        hide-input
                        v-model="currentFile"
                        prepend-icon="mdi-square-edit-outline"
                        @change="selectFile"
                     ></v-file-input>
                  </v-col>
                  <v-col
                     cols="10"
                     style="width: fit-content; margin: auto"
                     v-if="otherProfile != 'yes' && showEditButton"
                  >
                     <div style="width: fit-content; margin: auto">
                        <v-list-item-avatar
                           class="text-right"
                           height="40vw"
                           width="40vw"
                           max-width="180px"
                           max-height="180px"
                           style="margin: auto; justify: end"
                        >
                           <v-img :src="urlProfile"> </v-img>
                        </v-list-item-avatar>
                     </div>
                  </v-col>
                  <v-col
                     cols="12"
                     style="width: fit-content; margin: auto"
                     v-else
                  >
                     <div style="width: fit-content; margin: auto">
                        <v-list-item-avatar
                           class="text-right"
                           height="40vw"
                           width="40vw"
                           max-width="180px"
                           max-height="180px"
                           style="margin: auto; justify: end"
                        >
                           <v-img v-if="showEditButton" :src="urlProfile">
                           </v-img>
                           <v-img
                              v-else
                              src="https://assets-2flock.s3.amazonaws.com/ec84b565-011c-4ad8-a1c1-403c1b6eac5c/1606695642121.png"
                           >
                           </v-img>
                        </v-list-item-avatar>
                     </div>
                  </v-col>
               </v-row>
            </v-list-item>
            <v-list-item-content>
               <div v-if="userName != null && userLastName != null">
                  <v-list-item-title
                     class="title"
                     style="
                        width: fit-content;
                        margin: auto;
                        white-space: normal;
                        text-align: center;
                        padding-right: 4px;
                        padding-left: 4px;
                     "
                  >
                     {{ userName + " " + userLastName }}
                  </v-list-item-title>
                  <v-list-item-title
                     v-if="userName.length + userLastName.length > 25"
                     class="title"
                     style="width: fit-content; margin: auto"
                  >
                     {{ userName }}
                  </v-list-item-title>
                  <v-list-item-title
                     v-if="userName.length + userLastName.length > 25"
                     class="title"
                     style="width: fit-content; margin: auto"
                  >
                     {{ userLastName }}
                  </v-list-item-title>
               </div>
            </v-list-item-content>
            <v-list-item
               v-if="!getUser().session.authenticated"
               text
               :key="navbarConfig.login.title"
               :to="navbarConfig.login.link"
            >
               <v-list-item-icon>
                  <v-icon>{{ navbarConfig.login.icon }}</v-icon>
               </v-list-item-icon>
               <v-list-item-title>{{
                  navbarConfig.login.title
               }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="getUser().session.authenticated" class="px-2">
               <v-list-item-avatar>
                  <v-img
                     :src="navbarConfig.profilePhoto"
                     :color="generalConfig.mainColor"
                     alt="Perfil"
                  ></v-img>
               </v-list-item-avatar>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item-group>
               <v-list-item
                  v-for="item in navbarConfig.menuItems"
                  text
                  :key="item.title"
                  :to="item.link"
                  @click="navbarClickActions(item.action)"
               >
                  <v-list-item-icon>
                     <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>{{ item.title }}</v-list-item-title>
               </v-list-item>
               <v-list-item
                  v-if="communityType_local == 'marketplace'"
                  text
                  :key="navbarConfig.shoppingCart.title"
                  @click="toShoppingCart()"
               >
                  <v-list-item-icon>
                     <v-icon>{{ navbarConfig.shoppingCart.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{
                     navbarConfig.shoppingCart.title
                  }}</v-list-item-title>
               </v-list-item>
            </v-list-item-group>
            <v-divider></v-divider>
            <v-list-item-group>
               <v-list-item
                  v-for="item in dropDownCellphone1"
                  text
                  :key="item.title"
                  :to="item.link"
                  @click="navbarClickActions(item.action)"
               >
                  <v-list-item-icon
                     v-if="
                        item.title != 'Mis compras' &&
                           item.title != 'Mis ventas'
                     "
                  >
                     <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title
                     v-if="
                        item.title != 'Mis compras' &&
                           item.title != 'Mis ventas'
                     "
                     >{{ item.title }}</v-list-item-title
                  >
               </v-list-item>
            </v-list-item-group>
            <div v-if="getUser().session.authenticated">
               <v-list-group
                  v-for="item in itemsMarketplace"
                  :key="item.title"
                  v-model="item.active"
                  :prepend-icon="item.action"
                  no-action
               >
                  <template v-slot:activator>
                     <v-list-item-content>
                        <v-list-item-title
                           v-text="item.title"
                        ></v-list-item-title>
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
                        <v-list-item-title
                           v-text="child.title"
                        ></v-list-item-title>
                     </v-list-item-content>
                  </v-list-item>
               </v-list-group>
            </div>
            <v-list-item-group>
               <v-list-item
                  v-for="item in dropDownCellphone2"
                  text
                  :key="item.title"
                  :to="item.link"
                  @click="navbarClickActions(item.action)"
               >
                  <v-list-item-icon
                     v-if="
                        item.title != 'Mis compras' &&
                           item.title != 'Mis ventas'
                     "
                  >
                     <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title
                     v-if="
                        item.title != 'Mis compras' &&
                           item.title != 'Mis ventas'
                     "
                     >{{ item.title }}</v-list-item-title
                  >
               </v-list-item>
            </v-list-item-group>
         </v-list>
      </v-navigation-drawer>

      <!--VISTA NORMAL------------------------------------------------------------------------------------------>
      <v-app-bar class="d-none d-md-block" flat elevate-on-scroll>
         <v-img
            v-if="flag"
            alt="img-navbar"
            :src="urlLogo"
            style="
               min-heigth: 2vh;
               max-heigth: 2vh;
               min-width: 3vw;
               max-width: 5vw;
            "
            position="left"
            contain
         ></v-img>
         <v-img
            v-else
            alt="img-navbar"
            :src="generalConfig.logo"
            style="
               min-heigth: 2vh;
               max-heigth: 2vh;
               min-width: 3vw;
               max-width: 5vw;
            "
            position="left"
            contain
         ></v-img>
         <div class="flex-grow-1"></div>
         <v-toolbar-items>
            <v-btn
               v-for="item in navbarConfig.menuItems"
               text
               :key="item.title"
               :to="item.link"
               @click="navbarClickActions(item.action)"
            >
               <span>{{ item.title }}</span>
            </v-btn>
            <v-btn
               v-if="communityType_local == 'marketplace'"
               icon
               color="black"
               @click="toShoppingCart()"
            >
               <v-icon>{{ navbarConfig.shoppingCart.icon }}</v-icon>
            </v-btn>
            <v-btn
               v-if="!getUser().session.authenticated"
               :key="navbarConfig.login.title"
               :to="navbarConfig.login.link"
               :color="generalConfig.mainColor"
               class="ma-3"
               max-height="30px"
               rounded
               flat
            >
               <span>{{ navbarConfig.login.title }}</span>
            </v-btn>
            <v-menu v-else offset-y>
               <template v-slot:activator="{ on, attrs }">
                  <v-btn dark icon v-bind="attrs" v-on="on">
                     <v-avatar>
                        <v-img :src="urlProfile"> </v-img>
                     </v-avatar>
                  </v-btn>
               </template>

               <v-list>
                  <v-list-item
                     v-for="(item, i) in navbarConfig.dropDown"
                     :key="i"
                     :to="item.link"
                     @click="navbarClickActions(item.action)"
                  >
                     <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
               </v-list>
            </v-menu>
         </v-toolbar-items>
         <v-menu class="hidden-md-and-up">
            <v-list>
               <v-list-tile
                  v-for="item in navbarConfig.menuItems"
                  :key="item.title"
                  :to="item.link"
               >
                  <v-list-tile-content>
                     <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
               </v-list-tile>
            </v-list>
         </v-menu>
      </v-app-bar>
      <!-- <LoginModal view="navbar"></LoginModal> -->
      <LoginModal></LoginModal>
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
   </v-main>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import * as blueprintDA from "@/dataAccess/editCommunity.js";
import * as userDA from "@/dataAccess/user.js";
import { bus } from "../main";
import LoginModal from "../components/LoginModal";
export default {
   name: "Navbar",
   props: [
      "profileBool",
      "otherProfile",
      "flag",
      "flagOther",
      "profileImgUrl",
      "editProfile",
      "changeEditImgProfile"
   ],
   components: {
      LoginModal
   },
   data() {
      return {
         dialog: false,
         currentFile: [],
         drawer: false,
         communityType_local: "marketplace", // Update Navbar components by Community
         itemsMarketplace: [
            {
               action: "mdi-cart",
               items: [
                  { title: "Compras", link: "/myShoppingHistory" },
                  { title: "Preguntas", link: "/QuestionsCustomer" }
               ],
               title: "Mis compras"
            },
            {
               action: "mdi-store",
               active: true,
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
                  { title: "Reportes", action: "misReportes" }
               ],
               title: "Mis ventas"
            }
         ],
         navbarConfig: {
            menuItems: [],
            login: {
               icon: " mdi-login-variant",
               title: "Iniciar sesión",
               link: "/login"
            },
            shoppingCart: {
               icon: "mdi-cart-variant",
               title: "Carrito de compras",
               link: "/myShoppingCart/"
            },
            dropDown: [],
            profilePhoto: ""
         },
         dropDownCellphone1: [],
         dropDownCellphone2: [],
         privilegio: "",
         uploadImage: null,
         //POST, porque no hay URL
         dataUploadNewFiles: {
            key: process.env.VUE_APP_API_KEY_COMMUNITY,
            files: null
         },
         //put, con URL para actualizar
         dataUploadFiles: {
            key: process.env.VUE_APP_API_KEY_COMMUNITY,
            url: null,
            file: null
         },
         urlProfile: "https://www.w3schools.com/howto/img_avatar2.png",
         userName: "",
         userLastName: "",
         data: {},
         showEditButton: false,
         dataUser: {
            id: ""
         },
         validateSeller: null
      };
   },
   computed: {
      ...mapState(["generalConfig", "urlLogo", "idUser", "communityType"])
   },
   created() {
      this.urlProfile = localStorage.getItem("avatarURL");
      this.userName = localStorage.getItem("userName");
      this.userLastName = localStorage.getItem("userLastName");
      this.privilegio = this.getUser().data.communityPrivilege;
      if (this.flag) this.updateLogoImageURL(this.generalConfig.logo);
      this.showEditButton = this.getUser().session.authenticated;
   },
   mounted() {
      this.fillNavbarOptions(this.communityType_local);
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
      ...mapActions("user", ["logOut"], ["updateLogoImageURL"]),

      selectFile(file) {
         let user = this.getUser(); //get user ID
         this.currentFile = file;
         blueprintDA.UploadNewFiles(this.currentFile).then(res => {
            console.log(res);
            this.urlProfile = res.data.payload.urls[0];
            localStorage.setItem("avatarURL", this.urlProfile);

            blueprintDA.UpdateImage(user.data.id, this.urlProfile).then(res => {
               console.log(res);
               location.reload();
            });
         });
      },
      changeName() {
         this.userName = localStorage.getItem("userName");
         this.userLastName = localStorage.getItem("userLastName");
      },
      fillNavbarOptions(commId) {
         this.navbarConfig.menuItems = [];
         /*
         1 : Emprendimiento
         2 : Universidades
         3 : Marketplace
         */
         if (
            ["entrepreneurship", "university", "marketplace"].includes(commId)
         ) {
            if (this.getUser().session.authenticated) {
               if (!this.flag) {
                  this.navbarConfig.menuItems.push({
                     icon: " mdi-home",
                     title: "Inicio",
                     link: "/home-logged",
                     action: ""
                  });
               } else {
                  this.navbarConfig.menuItems.push({
                     icon: " mdi-home",
                     title: "Inicio"
                  });
               }
               if (["entrepreneurship", "university"].includes(commId)) {
                  if (!this.flag) {
                     this.navbarConfig.menuItems.push(
                        {
                           icon: " mdi-account-supervisor",
                           title: "Emprendedores",
                           link: "/members",
                           action: ""
                        },
                        {
                           icon: " mdi-earth",
                           title: "Equipos",
                           link: "/group",
                           action: ""
                        },
                        {
                           icon: " mdi-account-group",
                           title: "Mi equipo",
                           link: "/group",
                           action: ""
                        }
                     );
                  } else {
                     this.navbarConfig.menuItems.push(
                        {
                           icon: " mdi-account-supervisor",
                           title: "Emprendedores"
                        },
                        {
                           icon: " mdi-earth",
                           title: "Equipos"
                        },
                        {
                           icon: " mdi-account-group",
                           title: "Mi equipo"
                        }
                     );
                  }
                  if (commId == "university")
                     if (!this.flag) {
                        this.navbarConfig.menuItems[1] = {
                           icon: " mdi-account-supervisor",
                           title: "Participantes",
                           link: "/members",
                           action: ""
                        };
                     } else {
                        this.navbarConfig.menuItems[1] = {
                           icon: " mdi-account-supervisor",
                           title: "Participantes"
                        };
                     }
               }
               if (commId == "marketplace") {
                  if (!this.flag) {
                     this.navbarConfig.menuItems.push({
                        icon: " mdi-store",
                        title: "Mi Tienda",
                        link: "",
                        action: "miTienda"
                     });
                     this.navbarConfig.menuItems.push({
                        icon: "mdi-shopping",
                        title: "Productos",
                        link: "/ListProduct-loggued"
                     });
                  } else {
                     this.navbarConfig.menuItems.push({
                        icon: " mdi-store",
                        title: "Mi Tienda"
                     });
                     this.navbarConfig.menuItems.push({
                        icon: "mdi-shopping",
                        title: "Productos",
                        link: "/ListProduct"
                     });
                  }
               }
               //Dropdown
               this.navbarConfig.dropDown = [];
               if (!this.flag) {
                  this.navbarConfig.dropDown.push({
                     icon: "mdi-account",
                     title: "Mi perfil",
                     link: "/profile",
                     action: "myProfile"
                  });
               } else {
                  this.navbarConfig.dropDown.push({
                     icon: "mdi-account",
                     title: "Mi perfil"
                  });
               }
               if (
                  this.privilegio.toString().toLowerCase() == "administrador" &&
                  !this.flagOther
               ) {
                  if (!this.flag) {
                     this.navbarConfig.dropDown.push({
                        icon: "mdi-pencil",
                        title: "Editar Marca Blanca",
                        link: "/edit-community",
                        action: "edit-marcablanca"
                     });
                  } else {
                     this.navbarConfig.dropDown.push({
                        icon: "mdi-pencil",
                        title: "Editar Marca Blanca",
                        link: "",
                        action: ""
                     });
                  }
               }
               if (!this.flag) {
                  this.navbarConfig.dropDown.push({
                     icon: "mdi-lock",
                     title: "Cambiar contraseña",
                     link: "/change-password",
                     action: "edit-password"
                  });
               } else {
                  this.navbarConfig.dropDown.push({
                     icon: "mdi-lock",
                     title: "Cambiar contraseña"
                  });
               }

               if (commId == "marketplace") {
                  if (!this.flag) {
                     this.navbarConfig.dropDown.push(
                        {
                           icon: "mdi-wallet-giftcard",
                           title: "Mis compras",
                           link: "/myShoppingHistory",
                           action: ""
                        },
                        {
                           icon: "mdi-file-document-edit-outline",
                           title: "Mis ventas",
                           action: "misPublicaciones",
                           link: ""
                        }
                     );
                  } else {
                     this.navbarConfig.dropDown.push(
                        {
                           icon: "mdi-wallet-giftcard",
                           title: "Mis compras"
                        },
                        {
                           icon: "mdi-file-document-edit-outline",
                           title: "Mis ventas"
                        }
                     );
                  }
               }
               if (!this.flag) {
                  this.navbarConfig.dropDown.push({
                     icon: "mdi-power",
                     title: "Cerrar Sesion",
                     link: "",
                     action: "logout"
                  });
               } else {
                  this.navbarConfig.dropDown.push({
                     icon: "mdi-power",
                     title: "Cerrar Sesion"
                  });
               }
               this.dropDownCellphone1 = [];
               this.dropDownCellphone2 = [];
               for (let i = 0; i < 0; i++) {
                  if (
                     this.navbarConfig.dropDown[i].title != "Mis compras" &&
                     this.navbarConfig.dropDown[i].title != "Mis ventas"
                  )
                     this.dropDownCellphone1.push(
                        this.navbarConfig.dropDown[i]
                     );
               }
               for (let i = 0; i < this.navbarConfig.dropDown.length; i++) {
                  if (
                     this.navbarConfig.dropDown[i].title != "Mis compras" &&
                     this.navbarConfig.dropDown[i].title != "Mis ventas"
                  )
                     this.dropDownCellphone2.push(
                        this.navbarConfig.dropDown[i]
                     );
               }
               console.log(this.navbarConfig.dropDown);
            } else {
               if (!this.flag) {
                  this.navbarConfig.menuItems.push({
                     icon: " mdi-home",
                     title: "Inicio",
                     link: "/home",
                     action: ""
                  });
                  this.navbarConfig.menuItems.push({
                     icon: "mdi-shopping",
                     title: "Productos",
                     link: "/ListProduct",
                     action: ""
                  });
               } else {
                  this.navbarConfig.menuItems.push({
                     icon: " mdi-home",
                     title: "Inicio"
                  });
               }
            }
         }
      },

      navbarClickActions(action) {
         let url = window.location.href;
         let lastPos = url.lastIndexOf("/");
         switch (action) {
            case "":
               break;
            case "logout":
               localStorage.removeItem("userName");
               localStorage.removeItem("userLastName");
               localStorage.removeItem("avatarURL");
               this.logOut();
               this.$router.push("/login");
               break;
            case "edit-marcablanca":
               this.$router.push("/edit-community");
               break;
            case "edit-password":
               var returnAddress = url.slice(lastPos + 1, 100);
               if (returnAddress == "yes") {
                  returnAddress = "members";
               }
               this.$router.push("/change-password/" + returnAddress);
               break;
            case "myProfile":
               if (this.profileBool != undefined && this.profileBool)
                  location.reload();
               break;
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
      },

      onFileChange() {
         if (this.editProfile) {
            const input = this.$refs.fileInput;
            const files = input.files;
            if (files && files[0]) {
               const reader = new FileReader();
               reader.onload = e => {
                  this.uploadImage = files[0];
                  this.urlProfile = e.target.result;
               };
               reader.readAsDataURL(files[0]);
               this.$emit("input", files[0]);
            }
            if (this.profileImgUrl == null || this.profileImgUrl == "") {
               blueprintDA
                  .UploadNewFiles(files[0])
                  .then(resUrls => {
                     console.log(resUrls);
                     if (resUrls.data.status == "OK") {
                        this.urlProfile = resUrls.data.payload.urls[0];
                        userDA
                           .ProfileStructure(this.getUser().data)
                           .then(resProfile => {
                              if (resProfile.data.status == "OK") {
                                 this.data = resProfile.data.payload;
                                 this.data.profileImage = this.urlProfile;
                                 this.$emit("changeEditImgProfile", false);
                              }
                           })
                           .catch(function(error) {
                              console.log(error);
                           });
                     }
                  })
                  .catch(function(error) {
                     console.log(error);
                  });
            }
            this.$emit("changeEditImgProfile", false);
         } else {
            if (this.profileImgUrl == null || this.profileImgUrl == "") {
               userDA
                  .UpdateProfileStructure(this.data)
                  .then(resProfileUpdate => {
                     if (resProfileUpdate.data.status == "OK") {
                        this.$emit("changeEditImgProfile", this.urlProfile);
                        this.$emit("changeEditImgProfile", true);
                     }
                  })
                  .catch(function(error) {
                     console.log(error);
                  });
            } else {
               blueprintDA
                  .UploadFiles(this.uploadImage, this.profileImgUrl)
                  .then(resUrls => {
                     if (resUrls.status == "OK") {
                        this.urlProfile = this.profileImgUrl;
                        this.$emit("changeEditImgProfile", this.urlProfile);
                        this.$emit("changeEditImgProfile", false);
                     }
                  })
                  .catch(function(error) {
                     console.log(error);
                  });
            }
         }
      },
      editarMB() {
         this.$router.push("/edit-community");
      },
      toShoppingCart() {
         if (this.getUser().session.authenticated) {
            console.log(
               "estoy logeado y voy a mi carrito",
               this.getUser().data.id
            );
            this.$router.push(
               "/myShoppingCart/" + btoa("user=" + this.getUser().data.id)
            );
         } else {
            console.log("NO LOGGED");
            bus.$emit("loginModal", { view: "navbar", params: "", show: true });
         }
      },
      goProfile() {
         if (this.getUser().session.authenticated) {
            this.$router.push("/profile");
         }
      }
   }
};
</script>
