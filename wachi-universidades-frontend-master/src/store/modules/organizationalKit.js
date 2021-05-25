export default {
   namespaced: true,
   state: {
      hei: {},
      filesType: 0
   },
   mutations: {
      saveHei(state, hei) {
         state.hei = hei;
      },
      saveFilesType(state, filesType) {
         state.filesType = filesType;
      }
   },
   actions: {
      saveHei(context, hei) {
         context.commit("saveHei", hei);
      },
      saveFilesType(context, filesType) {
         context.commit("saveFilesType", filesType);
      }
   }
};
