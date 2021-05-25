import Vue from "vue";
import Vuex from "vuex";
import userStore from "./modules/user";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
   modules: { user: userStore },
   plugins: [createPersistedState()],
   state: {
      //Variables community
      communityPrivacy: "",
      communityName: "",
      communityType: "university", //university, marketplace or entrepreneurship
      communityDescription: "",

      //Para imagenes
      logo: null,
      generalImage: null,
      landingImage: null,
      contactImage: null,
      card0: null,
      card1: null,
      card2: null,
      multicard0: null,
      multicard1: null,
      multicard2: null,

      //URL Para imagenes
      urlLogo: "",
      urlLoginImage: "",
      urlLandingImage: "",
      urlContactImage: "",
      urlCard0: "",
      urlCard1: "",
      urlCard2: "",
      urlMulticard0: "",
      urlMulticard1: "",
      urlMulticard2: "",

      //GeneralSettings
      dialog: false, // open dialog personalizar comunidad

      /******INICIO CONFIGURACIÓN COMPONENTES******/
      generalConfig: {
         //GLENN - DAN-EL
         mainColor: "#A93434", //Color primario
         secondaryColor: "#EDD8D8", //Color secundario,
         colorText: "white",
         loginImage: "",
         loginText: "String(100)",
         logo: "http://2flock.com/static/imagenes/logos/logotwoflock.png",
         favicon: "" // Por defecto favicon wachi.ico
      },

      landingConfig: {
         order: 1, //Orden de aparicion
         componentName: "landing",
         image: "",
         view: true,
         landingText: {
            //Es opcional en caso solo se quiera mostrar imagen (Marketplace)
            visible: true, // Boolean,
            text: "String(30)",
            textAlign: "center", //Centrado/Derecha/Izquierda //"center/flex-end/flex-start"
            buttonText: "String(10)"
         }
      },

      contactUsConfig: {
         //FRYDA - JOHANA
         order: 2, //Orden de aparicion
         componentName: "contactUs",
         image: "",
         view: true,
         contact: {
            useApi: true, //Boolean - en caso se cuente con una API de contactos
            urlApi: "URL", //(Null-static True) Url donde se consume el API de contacto
            email: "email@domain.us" //(Null-static False) Solo aplica para empredimiento
         }
      },

      imageCardConfig: {
         //FRYDA - JOHANA
         order: 3, //Orden de aparacion
         componentName: "imageCard",
         titleText: "String(20)",
         view: true,
         cards: [
            // Maxima longitud 3, minimo 1
            {
               order: 1,
               cardName: "imageCard1",
               image: ""
            },
            {
               order: 2,
               cardName: "imageCard2",
               image: ""
            },
            {
               order: 3,
               cardName: "imageCard3",
               image: ""
            }
         ],
         buttons: [
            {
               order: 1,
               text: "String(10)",
               href: "URl"
            },
            {
               order: 2,
               text: "String(10)",
               href: "URl"
            }
         ]
      },

      multiCardConfig: {
         order: 4, //Order de aparacion
         componentName: "multiCard",
         view: true,
         title: {
            visible: true, //Boolean
            text: "StringTitle(20)"
         },
         description: {
            visible: true, //Boolean
            text: "StringDescription(300)"
         },
         cards: [
            // Maximo longitud 3, minimo 1
            {
               order: 1,
               cardName: "multiCard1",
               image: "",
               title: "String(10)",
               text: "String(300)",
               align: "flex-start"
            },
            {
               order: 2,
               cardName: "multiCard2",
               image: "",
               title: "String2(10)",
               text: "String2(300)",
               align: "center"
            },
            {
               order: 3,
               cardName: "multiCard3",
               image: "",
               title: "String3(10)",
               text: "String3(300)",
               align: "flex-end" //center/right/left
            }
         ]
      },
      searchCategoriesConfig: {
         order: 5, //Order de aparacion
         componentName: "searchCategories",
         view: false
      },

      carosuelProductConfig: {
         order: 6, //Order de aparacion
         componentName: "carosuelProduct",
         view: false
      },
      categoriesListConfig: {
         order: 7, //Order de aparacion
         componentName: "categoriesList",
         view: false
      },
      /******FIN CONFIGURACIÓN COMPONENTES******/
      //Variables for Component1
      c1_porcentageAplha: 0.6,
      ////////////////Categories components temp
      categories: [
         {
            idCategory: 1,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 1"
         },
         {
            idCategory: 2,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 2"
         },
         {
            idCategory: 3,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 3"
         },
         {
            idCategory: 4,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 4"
         },
         {
            idCategory: 5,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 5"
         },
         {
            idCategory: 6,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 6"
         },
         {
            idCategory: 7,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 7"
         },
         {
            idCategory: 8,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 8"
         },
         {
            idCategory: 9,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 9"
         },
         {
            idCategory: 10,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 10"
         },
         {
            idCategory: 11,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 11"
         },
         {
            idCategory: 12,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 12"
         },
         {
            idCategory: 13,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 13"
         },
         {
            idCategory: 14,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 14"
         },
         {
            idCategory: 15,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 15"
         },
         {
            idCategory: 16,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 16"
         },
         {
            idCategory: 17,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 17"
         },
         {
            idCategory: 18,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 18"
         },
         {
            idCategory: 19,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 19"
         },
         {
            idCategory: 20,
            avatar: "https://www.flaticon.es/svg/static/icons/svg/66/66553.svg",
            name: "Categoria 20"
         }
      ],
      nCategoriesSlice: 0,
      categoriesSlice: [],
      nCategories: 20,

      ///////////////////////////////////////

      ////////////////members view temp
      //For member view
      //"Members" no debe existir solo estoy simulando como si fuera una llamada ala BD.
      //Lo que existe es "nMembers" y "membersSlice" ya que se mostrara un grupo de miembros
      //en la pagina y con el boton de next page se cargara la siguiente porcion de miembros
      members: [
         {
            idUser: 1,
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            name: " Sebastian",
            lastName: "Sanchez Herrera"
         },
         {
            idUser: 2,
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            name: " Miguel",
            lastName: "Sanchez Herrera"
         },
         {
            idUser: 3,
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            name: " Antonio",
            lastName: "Sanchez Herrera"
         },
         {
            idUser: 4,
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            name: " Sebastian",
            lastName: "Sanchez Herrera"
         },
         {
            idUser: 5,
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            name: " Susana",
            lastName: "Sanchez Herrera"
         },
         {
            idUser: 6,
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            name: " Sebastian",
            lastName: "Sanchez Herrera"
         },
         {
            idUser: 7,
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            name: " Matias",
            lastName: "Sanchez Herrera"
         },
         {
            idUser: 8,
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            name: " Rosa",
            lastName: "Sanchez Herrera"
         },
         {
            idUser: 9,
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            name: " Sebastian",
            lastName: "Sanchez Herrera"
         },
         {
            idUser: 10,
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            name: " Mario",
            lastName: "Sanchez Herrera"
         },
         {
            idUser: 11,
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            name: " Julian",
            lastName: "Sanchez Herrera"
         }
      ],
      nMembersSlice: 0,
      membersSlice: [],
      nMembers: 11,

      //variables de Ernie para el perfil... no tocar
      userId: "",
      profileId: "",
      /******FIN CONFIGURACIÓN COMPONENTES******/
      groups: [
         {
            image: "https://images2flock.s3.amazonaws.com/1604104291855.jpg",
            name: "grupo 1",
            about:
               "asfadsjkfnasjkfnjkasdfjkasdf dfsadf asfdsfsa sg fdsg shdfaewt reyt yriuytkiyk h "
         },
         {
            image: "https://images2flock.s3.amazonaws.com/1604104291855.jpg",
            name: "grupo 2",
            about:
               "asfadsjkfnasjkfnjkasdfjkasdf asfsfdsf asfdasgsdfvc EREWTargfhdfgx sdzgfxhttyurtwre asdasdf"
         },
         {
            image: "https://images2flock.s3.amazonaws.com/1604104291855.jpg",
            name: "grupo 2",
            about:
               "asfadsjkfnasjkfnjkasdfjkasdf dafs as f sfdasg fasfgfdg sfagsg afsg sfggdcxvxcbchhn g"
         },
         {
            image: "https://images2flock.s3.amazonaws.com/1604104291855.jpg",
            name: "grupo 2",
            about:
               "asfadsjkfnasjkfnjkasdfjkasdf sd afsdf af  f ads fasd f asdf a dsfa dfa df adf a fR ADSF SDG  FGSF"
         }
      ],
      nTeamsCard: 0,
      teams: [],
      nTeams: 2,
      ///////////////////////////////////////////////////////

      //variablesEditarComponentes
      c_editComponent1: false,
      c_editComponent2: false,
      c_editComponent3: false,
      c_editComponentContactUs: false
   },
   mutations: {
      fillComponentsConfigurationToUpdate(state, configData) {
         console.log(configData);
         state.generalConfig = {};
         state.landingConfig = {};
         state.contactUsConfig = {};
         state.imageCardConfig = {};
         state.multiCardConfig = {};
         state.searchCategoriesConfig = {};
         state.carosuelProductConfig = {};
         state.categoriesListConfig = {};

         //Configuración general del homepage
         state.generalConfig.mainColor = configData.mainColor;
         state.generalConfig.secondaryColor = configData.secondaryColor;
         state.generalConfig.colorText = configData.colorText;
         state.generalConfig.loginImage = configData.loginImage;
         state.generalConfig.loginText = configData.loginText;
         state.generalConfig.logo = configData.logo;
         state.generalConfig.favicon = configData.favicon;
         state.generalConfig.communityId = configData.communityId;

         //Configuración de los componentes
         let specificComponents = configData.components;

         state.landingConfig = specificComponents.find(
            comp => comp.componentName === "landing"
         );
         state.contactUsConfig = specificComponents.find(
            comp => comp.componentName === "contactUs"
         );
         state.imageCardConfig = specificComponents.find(
            comp => comp.componentName === "imageCard"
         );
         state.multiCardConfig = specificComponents.find(
            comp => comp.componentName === "multiCard"
         );
         state.searchCategoriesConfig = specificComponents.find(
            comp => comp.componentName === "searchCategories"
         );
         state.carosuelProductConfig = specificComponents.find(
            comp => comp.componentName === "carosuelProduct"
         );
         state.categoriesListConfig = specificComponents.find(
            comp => comp.componentName === "categoriesList"
         );
      },
      updateComponenteLogin(state, edit) {
         state.generalImage = edit.inicio_registro.imagen;
         state.generalConfig.loginText = edit.inicio_registro.texto;
      },

      updateCommunity(state, community) {
         state.communityOrganization = community.organization;
         if (community.privacy == "Público") {
            state.communityPrivacy = "public";
         } else {
            if (community.privacy == "Privado") {
               state.communityPrivacy = "private";
            }
         }

         (state.communityName = community.name),
            (state.communityAcronym = community.acronym);
         //state.communityType = community.type;
         /*
         1 : Emprendimiento
         2 : Universidades
         3 : Marketplace
         */
         switch (community.type) {
            case "Emprendimientos":
               state.communityType = "entrepreneurship";
               state.searchCategoriesConfig.view = false;
               state.carosuelProductConfig.view = false;
               state.categoriesListConfig.view = false;
               break;
            case "Universidades":
               state.communityType = "university";
               state.searchCategoriesConfig.view = false;
               state.carosuelProductConfig.view = false;
               state.categoriesListConfig.view = false;
               break;
            case "Marketplace":
               state.communityType = "marketplace";
               break;
         }
         state.communityDescription = community.description;
      },
      fillLogoImageURL(state, image) {
         state.urlLogo = image;
         console.log("URLLOGO");
         console.log(state.urlLogo);
      },
      updateLandingImageURL(state, image) {
         state.urlLandingImage = image;
      },
      updateMulticardImageURL0(state, image) {
         state.urlMulticard0 = image;
      },
      updateMulticardImageURL1(state, image) {
         state.urlMulticard1 = image;
      },
      updateMulticardImageURL2(state, image) {
         state.urlMulticard2 = image;
      },
      updateImageCardURL0(state, image) {
         state.urlMulticard0 = image;
      },
      updateImageCardURL1(state, image) {
         state.urlMulticard1 = image;
      },
      updateImageCardURL2(state, image) {
         state.urlMulticard2 = image;
      },
      updateContactImageURL(state, image) {
         state.urlContactImage = image;
      },
      updateLandingImage(state, landing) {
         state.landingImage = landing;
      },
      updateContactImage(state, contact) {
         state.contactImage = contact;
      },
      updateMulticardImg0(state, img) {
         state.multicard0 = img;
      },
      updateMulticardImg1(state, img) {
         state.multicard1 = img;
      },
      updateMulticardImg2(state, img) {
         state.multicard2 = img;
      },
      updateImageCard0(state, img) {
         state.card0 = img;
      },
      updateImageCard1(state, img) {
         state.card1 = img;
      },
      updateImageCard2(state, img) {
         state.card2 = img;
      },
      updateImageLogo(state, img) {
         state.logo = img;
      },
      updateCommunityDominio(state, dominio) {
         state.communityDominio = dominio;
      },
      editComponent1(state, edit) {
         state.c_editComponent1 = edit;
      },
      editComponent2(state, edit) {
         state.c_editComponent2 = edit;
      },
      editComponent3(state, edit) {
         state.c_editComponent3 = edit;
      },
      editComponentContactUs(state, contactUs) {
         state.c_editComponentContactUs = contactUs;
      },
      //Open or close the general settings
      showDialog(state, edit) {
         state.dialog = edit;
      },
      updateContentComponentContactUs(state, content) {
         if (state.communityType == "university") {
            state.contactUsConfig.contact.useApi = true;
            state.contactUsConfig.contact.urlApi = "urlApi";
         } else {
            state.contactUsConfig.contact.useApi = false;
            state.contactUsConfig.contact.email = content.email;
         }
         //state.contactUsConfig.image = content.image;
      },
      fillLoggedUser(state, loggedData) {
         state.loggedUser = loggedData;
      },

      updateMainColor(state, newColor) {
         state.generalConfig.mainColor = newColor;
      },
      updateSecondaryColor(state, newColor) {
         state.generalConfig.secondaryColor = newColor;
      },
      deleteCardC2(state, pos) {
         state.multiCardConfig.cards.splice(pos, 1);
      },
      deleteCardImageCardConfig(state, pos) {
         state.imageCardConfig.cards.splice(pos, 1);
      },
      addCardC2(state, pos) {
         state.multiCardConfig.cards = pos;
      },
      changeColorTexto(state, colorText) {
         state.generalConfig.colorText = colorText;
      },
      //Api para la integración
      setTotalCategoriesSlice(state, data) {
         state.nCategoriesSlice = data;
      },
      setCategoriesSlice(state, data) {
         const posIni = data.perPage * (data.page - 1);
         const posFinal = data.perPage * data.page;
         state.categoriesSlice = state.categories.slice(posIni, posFinal);
      },
      updateLonginImageGlobal(state) {
         state.urlMulticard0 = "";
         state.urlMulticard1 = "";
         state.urlMulticard2 = "";
         state.urlLoginImage = "";
         state.urlContactImage = "";
         state.urlLandingImage = "";
         state.urlCard0 = "";
         state.urlCard1 = "";
         state.urlCard2 = "";

         state.logo = null;
         state.multicard0 = null;
         state.multicard1 = null;
         state.multicard2 = null;
         state.loginImage = null;
         state.contactImage = null;
         state.landingImage = null;
         state.card0 = null;
         state.card1 = null;
         state.card2 = null;
      },
      setTeamsData(state, data) {
         state.nTeamsCard = data;
      },
      setTeamsCard(state, data) {
         //(state,data) => donde data es el resultado de recibir del back esa porcion de dato
         //pero....bueno se hardcodeara ese calculo aqui
         const pIni = state.nTeamsCard * (data - 1);
         const pFin = state.nTeamsCard * data - 1;
         state.teams = state.groups.slice(pIni, pFin);
      },
      setTotalMembersSlice(state, data) {
         state.nMembersSlice = data;
      },
      setMembersSlice(state, data) {
         const posIni = state.nMembersSlice * (data - 1);
         const posFinal = state.nMembersSlice * data - 1;
         state.membersSlice = state.members.slice(posIni, posFinal);
      },
      setProfileId(state, data) {
         //Establecer el ID que servirá para mostrar el perfil de ese usuario
         if (state.userId == "" && data.login) state.userId = data.id;
         else state.profileId = data.id;
      },
      resetGeneralConfig(state) {
         (state.generalConfig.mainColor = "#A93434"), //Color primario
            (state.generalConfig.secondaryColor = "#EDD8D8"), //Color secundario,
            (state.generalConfig.colorText = "white"),
            (state.generalConfig.loginImage = ""),
            (state.generalConfig.loginText = "String(100)"),
            (state.generalConfig.logo = ""),
            (state.generalConfig.favicon = ""); // Por defecto favicon wachi.ico
      }
   },
   actions: {
      async resetGeneralConfig({ commit }) {
         commit("resetGeneralConfig");
      },
      async updateLogoImageURL(context, image) {
         context.commit("fillLogoImageURL", image);
      },
      async updateLandingImageURL(context, image) {
         context.commit("updateLandingImageURL", image);
      },
      async updateMulticardImageURL0(context, image) {
         context.commit("updateMulticardImageURL0", image);
      },
      async updateMulticardImageURL1(context, image) {
         context.commit("updateMulticardImageURL1", image);
      },
      async updateMulticardImageURL2(context, image) {
         context.commit("updateMulticardImageURL2", image);
      },
      async updateImageCardURL0(context, image) {
         context.commit("updateImageCardURL0", image);
      },
      async updateImageCardURL1(context, image) {
         context.commit("updateImageCardURL1", image);
      },
      async updateImageCardURL2(context, image) {
         context.commit("updateImageCardURL2", image);
      },
      async updateContactImageURL(context, image) {
         context.commit("updateContactImageURL", image);
      },
      async getTeams(context, data) {
         context.commit("setTeamsData", data.nTeamsxP);
         context.commit("setTeamsCard", data.page);
      },
      async getMembers(context, data) {
         //Call the API to get a portion of data
         context.commit("setTotalMembersSlice", data.perPage);
         context.commit("setMembersSlice", data.page);
      },
      async completeComponentsConfigurationToUpdate(context, configData) {
         context.commit("fillComponentsConfigurationToUpdate", configData);
      },
      async updateMulticardImg0(context, data) {
         context.commit("updateMulticardImg0", data);
      },
      async updateMulticardImg1(context, data) {
         context.commit("updateMulticardImg1", data);
      },
      async updateMulticardImg2(context, data) {
         context.commit("updateMulticardImg2", data);
      },
      async updateImageMultiCard(context, data) {
         context.commit("updateImageMultiCard", data);
      },
      async deleteCardImageCardConfig(context, pos) {
         context.commit("deleteCardImageCardConfig", pos);
      },
      async deleteCardC2(context, pos) {
         context.commit("deleteCardC2", pos);
      },
      async addCardC2(context, nCards) {
         context.commit("addCardC2", nCards);
      },
      async updateComponenteLogin(context, edit) {
         context.commit("updateComponenteLogin", edit);
      },
      async updateCommunity(context, community) {
         context.commit("updateCommunity", community);
      },
      async editComponent1(context, edit) {
         context.commit("editComponent1", edit);
      },
      async editComponent2(context, edit) {
         context.commit("editComponent2", edit);
      },
      async editComponent3(context, edit) {
         context.commit("editComponent3", edit);
      },
      async editComponentContactUs(context, contactUs) {
         context.commit("editComponentContactUs", contactUs);
      },
      async showDialog(context, edit) {
         context.commit("showDialog", edit);
      },
      async deleteCardsImages(context, nCards) {
         context.commit("deleteCardsImages", nCards);
      },
      async updateContentComponentContactUs(context, content) {
         context.commit("updateContentComponentContactUs", content);
      },
      async updateMainColor(context, newColor) {
         context.commit("updateMainColor", newColor);
      },
      async updateSecondaryColor(context, newColor) {
         context.commit("updateSecondaryColor", newColor);
      },
      async changeColorTexto(context, colorText) {
         context.commit("changeColorTexto", colorText);
      },
      async updateContactImage(context, img) {
         context.commit("updateContactImage", img);
      },
      async updateCommunityDominio(context, data) {
         context.commit("updateCommunityDominio", data);
      },
      async updateLandingImage(context, img) {
         context.commit("updateLandingImage", img);
      },
      async updateImageCard0(context, img) {
         context.commit("updateImageCard0", img);
      },
      async updateImageCard1(context, img) {
         context.commit("updateImageCard1", img);
      },
      async updateImageCard2(context, img) {
         context.commit("updateImageCard2", img);
      },
      async updateImageLogo(context, img) {
         context.commit("updateImageLogo", img);
      },
      async getCategories(context, data) {
         //Call the API to get a portion of data
         context.commit("setTotalCategoriesSlice", data.perPage);
         context.commit("setCategoriesSlice", data);
      },
      async updateLonginImageGlobal(context) {
         context.commit("updateLonginImageGlobal");
      }
   }
});
