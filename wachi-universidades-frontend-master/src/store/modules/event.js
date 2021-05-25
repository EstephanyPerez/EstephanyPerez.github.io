export default {
   namespaced: true,
   state: {
      event: {
         idCommunity: null,
         idEvent: null,
         name: null,
         description: null,
         startDate: null,
         endDate: null,
         minPerGroup: null,
         maxPerGroup: null,
         fileProgramBases: null,
         fileFrequentQuestions: null,
         heis: []
      },
      eventHistory: null
   },
   mutations: {
      saveGeneralInformation(state, event) {
         state.event.name = event.name;
         state.event.description = event.description;
         state.event.startDate = event.startDate;
         state.event.endDate = event.endDate;
         state.event.minPerGroup = event.minPerGroup;
         state.event.maxPerGroup = event.maxPerGroup;
         state.event.fileProgramBases = event.fileProgramBases;
         state.event.fileFrequentQuestions = event.fileFrequentQuestions;
      },
      saveHeisInformation(state, event) {
         state.event.heis = event.heis;
      },
      saveHistoryEventInformation(state, event) {
         state.eventHistory = { ...event };
      }
   },
   actions: {
      saveChangesStepOne(context, event) {
         context.commit("saveGeneralInformation", event);
      },
      saveChangesStepTwo(context, event) {
         context.commit("saveHeisInformation", event);
      },
      saveCurrentEventInformation(context, event) {
         // TODO llamar a esta funcion al momento de que se loguee el usuario
         context.commit("saveGeneralInformation", event);
         context.commit("saveHeisInformation", event);
      },
      saveHistoryEventInformation(context, event) {
         context.commit("saveHistoryEventInformation", event);
      }
   },
   getters: {
      getEvent: state => state.event
   }
};
