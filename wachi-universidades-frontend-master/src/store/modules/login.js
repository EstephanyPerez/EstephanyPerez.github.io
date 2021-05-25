export default {
   namespaced: true,
   state: {
      login: null
   },
   mutations: {
      saveLogin(state, login) {
         state.login = login;
      }
   },
   actions: {
      addLoginData(context, login) {
         context.commit("saveLogin", login);
      }
   },
   getters: {
      getLogin: state => state.login
   }
};
