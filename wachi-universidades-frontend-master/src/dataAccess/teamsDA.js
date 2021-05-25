import axios from "axios";

export function getTeamList(idUEvent) {
   console.log("recibo idUEvent", idUEvent);
   let url = "api/unievent/team/list-all-teams-of-event";
   let body = {
      idUEvent: idUEvent
   };
   return axios.post(url, body);
}

export function getUsersOfTeam(idTeam) {
   let url = "api/unievent/team/list-all-users-of-team?idTeam=" + idTeam + "&communityToken=" + process.env.VUE_APP_API_KEY_COMMUNITY;
   return axios.get(url);
}

export function changeProgress(idTeam, idStage) {
   console.log("idTeam", idTeam);
   console.log("idStage", idStage);
   let url = "api/unievent/team/update-stage?idTeam=" + idTeam + "&idStage=" + idStage;
   return axios.put(url);
}

export function listStages(idUEvent) {
   console.log("idUEvent", idUEvent);
   let url = "api/unievent/stage/listAllByEvent?idUEvent=" + idUEvent.toString();
   return axios.get(url);
}

export function changeLeader(idTeam, idNewLeader) {
   console.log("idTeam", idTeam);
   console.log("idNewLeader", idNewLeader);

   let url = "api/unievent/team/update-leader?idTeam=" + idTeam + "&idNewLeader=" + idNewLeader;
   return axios.post(url);
}

export function selectChallenge(idTeam, idChallenge) {
   console.log("idTeam", idTeam);
   console.log("idChallenge", idChallenge);
   let url = "api/unievent/team/assign-challenge?idTeam=" + idTeam + "&idChallenge=" + idChallenge;
   return axios.post(url);
}

export function validateTeam(idTeam) {
   console.log("idTeam", idTeam);
   let url = "api/unievent/team/validate-team?idTeam=" + idTeam;
   return axios.post(url);
}

export function editName(idTeam, newName) {
   let url = "api/unievent/team/update-team-name?newName=" + newName + "&idTeam=" + idTeam;
   return axios.post(url);
}
