export default {
   namespaced: true,
   state: {
      challenges: [
         {
            idChallenge: 1,
            name: "Reto no más hambre para los gatitos",
            description: "Es un reto innovador",
            fileImage: require("@/assets/gatitos_comiendo-1.jpg"),
            logoImage: require("@/assets/lindo-panda-patas.jpg")
         },
         {
            idChallenge: 2,
            name: "Reto salvemos a los panditas del Asia",
            description: "Es un reto divertido",
            fileImage: require("@/assets/maxresdefault.jpg"),
            logoImage: require("@/assets/gatito.jpg")
         },
         {
            idChallenge: 3,
            name: "Reto salvemos el planeta de los malvados",
            description: "Reto ecoamigable",
            fileImage: require("@/assets/maxresdefault.jpg"),
            logoImage: require("@/assets/lindo-panda-patas.jpg")
         },
         {
            idChallenge: 4,
            name: "Reto no más hambre para los gatitos",
            description: "Es un reto innovador",
            fileImage: require("@/assets/gatitos_comiendo-1.jpg"),
            logoImage: require("@/assets/gatito.jpg")
         },
         {
            idChallenge: 5,
            name: "Reto salvemos a los panditas del mundo",
            description: "Es un reto divertido",
            fileImage: require("@/assets/maxresdefault.jpg"),
            logoImage: require("@/assets/lindo-panda-patas.jpg")
         },
         {
            idChallenge: 6,
            name: "Reto salvemos el planeta del calentamiento global",
            description: "Reto ecoamigable",
            fileImage: require("@/assets/maxresdefault.jpg"),
            logoImage: require("@/assets/gatito.jpg")
         }
      ]
   },
   mutations: {
      saveChallenges(state, challenges) {
         state.challenges = challenges;
      },
      dropChallenges(state) {
         state.challenges = [];
      },
      addChallenge(state, challenge) {
         state.challenges.push(challenge);
      }
   },
   actions: {
      saveChallenges(context, challenges) {
         // TODO puede llamarse a backend aca
         context.commit("saveChallenges", challenges);
      },
      deleteChallenge(context, idChallenge, challenges) {
         //llamas al back para desactivar actividad con el id
         context.commit("deleteChallenge", idChallenge, challenges);
      },
      dropChallenges(context) {
         context.commit("dropChallenges");
      },
      addActivity(context, challenge) {
         context.commit("addChallenge", challenge);
      }
   },
   getters: {
      getChallenges: state => state.challenges
   }
};
