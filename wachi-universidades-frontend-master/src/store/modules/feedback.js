export default {
   namespaced: true,
   state: {
      feedback: {
         activity: null,
         team: null
      }
   },
   mutations: {
      saveActivity(state, activity) {
         state.feedback.activity = { ...activity };
      },
      saveTeam(state, team) {
         console.log("se va a grabar el equipo en el store: ", team);
         state.feedback.team = { ...team };
      },
      updateFeedback(state, message) {
         console.log("en el store de feedback: ", message);
         state.feedback.team.deliverable.feedbacks[message.index].comment = message.comment;
      }
   },
   actions: {
      saveActivity(context, activity) {
         context.commit("saveActivity", activity);
      },
      saveTeam(context, team) {
         context.commit("saveTeam", team);
      },
      updateFeedback(context, message) {
         context.commit("updateFeedback", message);
      }
   },
   getters: {
      getActivity: state => state.feedback
   }
};
