import Vue from "vue";
import Vuex from "vuex";
import userStore from "./modules/user";
import styleStore from "./modules/style";
import eventStore from "./modules/event";
import activitiesStore from "./modules/activities";
import communityStore from "./modules/community";
import createPersistedState from "vuex-persistedstate";
import challengesStore from "./modules/challenges";
import activityParticipantStore from "./modules/activityParticipant";
import feedbackStore from "./modules/feedback";
import loginStore from "./modules/login";
import organizationalKitStore from "./modules/organizationalKit";

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      user: userStore,
      style: styleStore,
      event: eventStore,
      activities: activitiesStore,
      challenges: challengesStore,
      community: communityStore,
      activityParticipant: activityParticipantStore,
      login: loginStore,
      feedback: feedbackStore,
      organizationalKit: organizationalKitStore
   },
   plugins: [createPersistedState()],
   state: {
      //Login variables
      idUser: 0, //ya no se está tomando en cuenta esta variable
      loggedUser: false, //ya no se está tomando en cuenta esta variable

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
         mainColor: "#A93434", //Color primario
         secondaryColor: "#EDD8D8", //Color secundario,
         colorText: "white",
         loginImage: "",
         loginText: "String(100)",
         logo: "",
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
         order: 4, //Order de aparacion
         componentName: "searchCategories",
         view: false
      },

      carosuelProductConfig: {
         order: 4, //Order de aparacion
         componentName: "carosuelProduct",
         view: false
      },
      categoriesListConfig: {
         order: 4, //Order de aparacion
         componentName: "categoriesList",
         view: false
      },
      /******FIN CONFIGURACIÓN COMPONENTES******/
      nMembersSlice: 0,
      membersSlice: [],
      nMembers: 11,

      nTeamsCard: 0,
      teams: [],
      nTeams: 2,

      //Variables de componentes
      c1_porcentageAplha: 0.6, // accepted values: [0,1]
      c_editComponent1: false,
      c_editComponent2: false,
      c_editComponent3: false,
      c_editComponentContactUs: false
   },
   mutations: {
      fillIdUser(state, loginData) {
         state.idUser = loginData;
      },
      fillLoggedUser(state, loggedData) {
         state.loggedUser = loggedData;
      },

      editComponentContactUs(state, contactUs) {
         state.c_editComponentContactUs = contactUs;
      },
      fillSelectedComponents(state, components_data) {
         state.selectedComponents = [];
         for (let comp of components_data) {
            state.selectedComponents.push(comp);
         }
      },
      fillPrivilege(state, privilegeData) {
         state.privilege = privilegeData;
      },

      fillProfile(state, profileData) {
         state.name = profileData.name;
         state.lastName = profileData.lastName;
      },

      fillTeamData(state, teamData) {
         state.teamData.idTeam = teamData.idTeam;
         state.teamData.idEntrepreneurship = teamData.idEntrepreneurship;
         state.teamData.teamName = teamData.teamName;
         state.teamData.linkImage = teamData.linkImage;
         state.teamData.linkAvatar = teamData.linkAvatar;
      },

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

         state.landingConfig = specificComponents.find(comp => comp.componentName === "landing");
         state.contactUsConfig = specificComponents.find(comp => comp.componentName === "contactUs");
         state.imageCardConfig = specificComponents.find(comp => comp.componentName === "imageCard");
         state.multiCardConfig = specificComponents.find(comp => comp.componentName === "multiCard");
         state.searchCategoriesConfig = specificComponents.find(comp => comp.componentName === "searchCategories");
         state.carosuelProductConfig = specificComponents.find(comp => comp.componentName === "carosuelProduct");
         state.categoriesListConfig = specificComponents.find(comp => comp.componentName === "categoriesList");
         console.log(state.searchCategoriesConfig);
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

         (state.communityName = community.name), (state.communityAcronym = community.acronym);
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
      showDialog(state, edit) {
         state.dialog = edit;
      },
      updateMainColor(state, newColor) {
         state.generalConfig.mainColor = newColor;
      },
      updateSecondaryColor(state, newColor) {
         state.generalConfig.secondaryColor = newColor;
      },
      changeColorTexto(state, colorText) {
         state.generalConfig.colorText = colorText;
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
      resetGeneralConfig(state) {
         (state.generalConfig.mainColor = "#A93434"), //Color primario
            (state.generalConfig.secondaryColor = "#EDD8D8"), //Color secundario,
            (state.generalConfig.colorText = "white"),
            (state.generalConfig.loginImage = ""),
            (state.generalConfig.loginText = "String(100)"),
            (state.generalConfig.logo = ""),
            (state.generalConfig.favicon = ""); // Por defecto favicon wachi.ico
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
      setMembers(state, members) {
         console.log("en el store llega: ", members);
         state.members = [];
         members.forEach(member => {
            state.members.push(member);
         });
      },
      setGroups(state, groups) {
         console.log("en el store llega: ", groups);
         state.groups = [];
         groups.forEach(group => {
            state.groups.push(group);
         });
      }
   },
   actions: {
      completeIdUser(context, loginData) {
         context.commit("fillIdUser", loginData);
      },
      completeLoggedUser(context, loggedData) {
         context.commit("fillLoggedUser", loggedData);
      },
      setGroups(context, groups) {
         //se llena la lista de miembros por evento
         context.commit("setGroups", groups);
      },
      async editComponentContactUs(context, contactUs) {
         context.commit("editComponentContactUs", contactUs);
      },
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
      async setMembers(context, members) {
         context.commit("setMembers", members);
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
      async showDialog(context, edit) {
         context.commit("showDialog", edit);
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
      async updateLonginImageGlobal(context) {
         context.commit("updateLonginImageGlobal");
      },
      async completeSelectedComponentsData(context, components_data) {
         context.commit("fillSelectedComponents", components_data);
      },
      async completePrivilege(context, privilegeData) {
         context.commit("fillPrivilege", privilegeData);
      },
      async completeTeamData(context, teamData) {
         context.commit("fillTeamData", teamData);
      },
      async completeProfile(context, profileData) {
         context.commit("fillProfile", profileData);
      }
   }
});
