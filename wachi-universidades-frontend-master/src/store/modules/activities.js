export default {
   namespaced: true,
   state: {
      activities: []
   },
   mutations: {
      saveActivities(state, activities) {
         state.activities = activities;
      },
      dropActivities(state) {
         state.activities = [];
      },
      addActivity(state, activity) {
         state.activities.push(activity);
      }
   },
   actions: {
      saveActivities(context, activities) {
         // TODO puede llamarse a backend aca
         context.commit("saveActivities", activities);
      },
      deleteActivity(context, idActivity, activities) {
         //llamas al back para desactivar actividad con el id
         context.commit("deleteActivity", idActivity, activities);
      },
      dropActivities(context) {
         context.commit("dropActivities");
      },
      addActivity(context, activity) {
         context.commit("addActivity", activity);
      }
   },
   getters: {
      getActivities: state => state.activities
   }
};
