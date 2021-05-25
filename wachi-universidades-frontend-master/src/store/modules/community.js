export default {
   namespaced: true,
   state: {
      community: {
         idCommunity: process.env.VUE_APP_API_KEY_COMMUNITY
      }
   },
   mutations: {},
   actions: {},
   getters: {
      getActivities: state => state.community
   }
};
