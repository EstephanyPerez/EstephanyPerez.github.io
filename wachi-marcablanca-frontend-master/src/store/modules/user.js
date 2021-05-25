export default {
   namespaced: true,
   state: {
      user: {
         session: {
            authenticated: false
         },
         data: null
      }
   },
   mutations: {
      saveSession(state, user) {
         state.user.session.authenticated = true;
         state.user.data = user;
      },
      deleteSession(state) {
         state.user.session.authenticated = false;
         state.user.data = null;
      }
   },
   actions: {
      async logIn(context, user) {
         console.log("ENTRA AL LOGIN ACTION: ");
         console.log(user);
         context.commit("saveSession", user);
      },
      async logOut(context) {
         context.commit("deleteSession");
      }
   },
   getters: {
      getUser: state => state.user
   }
};
