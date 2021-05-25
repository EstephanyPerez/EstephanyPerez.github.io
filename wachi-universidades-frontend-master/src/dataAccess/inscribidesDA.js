import axios from "axios";

export function getInscribidesByEvent(idEvent) {
   let varAux = process.env.VUE_APP_API_KEY_COMMUNITY;
   let url = "api/unievent/inscriptions?idUEvent=" + idEvent + "&communityToken=" + varAux;
   return axios.get(url);
}

export function registryTeam(team) {
   console.log("llamada para registrar team: ", team);
   let url = "api/unievent/team/register";
   return axios.post(url, team);
}

export function deleteParticipant(idInscription, idUEvent) {
   console.log("llamada para eliminar un participante: ", idInscription);
   let url = "api/unievent/inscriptions/delete?idInscription=" + idInscription.toString() + "&idUEvent=" + parseInt(idUEvent);
   return axios.delete(url);
}

export function deleteParticipantFromTeam(idUser, idTeam) {
   console.log("llamada para desvincular un participante de un equipo: ", idTeam, idUser);
   let url = "api/unievent/user/removeTeam?idTeam=" + idTeam.toString() + "&idUser=" + idUser.toString();
   return axios.delete(url);
}

export function registryLogo(logo) {
   console.log("llamada para añadir un logo a un team: ", logo);
   let url = "api/unievent/team/upload-logo";
   let formData = new FormData();
   formData.append("idTeam", logo.idTeam);
   formData.append("communityToken", process.env.VUE_APP_API_KEY_COMMUNITY);
   formData.append("logo", logo.logo);
   formData.append("logoLocalPath", logo.logoLocalPath);
   formData.append("logoInLocalPath", logo.logoInLocalPath);

   return axios.post(url, formData, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   });
}

export function assignParticipantToTeam(idUser, idTeam) {
   console.log("Data acces: ", idUser, idTeam);
   let url = "api/unievent/user/assignUserTeam?idTeam=" + idTeam.toString() + "&idUser=" + idUser.toString();
   return axios.post(url);
}

export function suggestTeam(idUEvent, communityToken, field, idHei) {
   let url =
      "/api/unievent/team/get-teams-suggestions-by-field?idUEvent=" +
      idUEvent.toString() +
      "&communityToken=" +
      communityToken.toString() +
      "&field=" +
      field.toString() +
      "&idHei=" +
      idHei.toString();
   return axios.get(url);
}
