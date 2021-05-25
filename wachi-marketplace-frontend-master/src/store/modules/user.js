export default {
   namespaced: true,
   state: {
      user: {
         session: {
            authenticated: false
         },
         data: null //communityPrivilege,communityToken,email,id
      },
      idUser: null
   },
   mutations: {
      saveSession(state, user) {
         console.log("entre a saveSession");
         state.user.session.authenticated = true;
         state.user.data = user;
         console.log(state.user.data);
      },
      deleteSession(state) {
         state.user.session.authenticated = false;
         state.user.data = null;
      },
      assignedIdUser(state, id) {
         console.log("id de mutacion:", id);
         state.idUser = id;
         console.log("idUser", state.idUser);
      }
   },
   actions: {
      async logIn(context, user) {
         console.log("entre a logIN");
         context.commit("saveSession", user);
      },
      async logOut(context) {
         context.commit("deleteSession");
      },
      assignIdUser(context, id) {
         console.log("no puede seer", id);
         context.commit("assignedIdUser", id);
         console.log("despues del commit");
      }
   },
   getters: {
      getUser: state => state.user
   }
};
