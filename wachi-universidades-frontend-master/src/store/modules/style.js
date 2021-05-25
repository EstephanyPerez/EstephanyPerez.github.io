/*
 * Style State
 * used to manage all style properties in the system
 *
 * */

export default {
   namespaced: true,
   state: {
      style: {
         colors: {
            primary: "#FFFFFF",
            secondary: "#FFFFFF",
            accent: "#82B1FF",
            error: "#FF5252",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#4CAF50"
         }
      }
   },
   mutations: {
      saveStyleConfig(state, style) {
         state.style.colors.primary = style.mainColor;
         state.style.colors.secondary = style.secondaryColor;
      }
   },
   actions: {
      startApplication(context, style) {
         context.commit("saveStyleConfig", style);
      }
   },
   getters: {
      getStyle: state => state.style
   }
};
