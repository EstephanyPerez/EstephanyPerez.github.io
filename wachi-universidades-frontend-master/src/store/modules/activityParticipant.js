export default {
   namespaced: true,
   state: {
      activity: null
   },
   mutations: {
      saveActivity(state, activity) {
         console.log("Store: ", activity);
         state.activity = activity;
      }
   },
   actions: {
      addActivityData(context, activity) {
         context.commit("saveActivity", activity);
      }
   },
   getters: {
      getActivity: state => state.activity
   }
};
