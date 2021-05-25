import axios from "axios";

export function registerChallenge(idEvent, challenge) {
   console.log("challenge", challenge);
   let url = "/api/unievent/challenge/create";
   let body = {
      name: challenge.name,
      description: challenge.description,
      idUEvent: idEvent
   };
   return axios.post(url, body);
}
export function getChallenges(idUEvent) {
   let url = "/api/unievent/challenge/list/" + idUEvent;
   return axios.get(url);
}

export function getChallengeImageOrLogo(filename) {
   let url = "/api/unievent/challenge/get-file/" + filename;
   return axios.get(url, { responseType: "blob" });
}

export function registerLogo(idChallenge, file) {
   let url = "/api/unievent/challenge/upload-logo";
   let formData = new FormData();
   let varAux = process.env.VUE_APP_API_KEY_COMMUNITY;
   formData.append("file", file);
   formData.append("idChallenge", idChallenge);
   formData.append("communityToken", varAux);
   console.log("body de registrar logo: ", formData);
   return axios.post(url, formData, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   });
}

export function registerImage(idChallenge, file) {
   let url = "/api/unievent/challenge/upload-image";
   let formData = new FormData();
   let varAux = process.env.VUE_APP_API_KEY_COMMUNITY;
   formData.append("file", file);
   formData.append("idChallenge", idChallenge);
   formData.append("communityToken", varAux);
   return axios.post(url, formData, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   });
}

export function deleteChallenge(idChallenge) {
   let url = "/api/unievent/challenge/delete?idChallenge=" + idChallenge;
   return axios.delete(url);
}

export function editChallenge(editingChallenge, idUEvent) {
   console.log(editingChallenge);
   console.log(idUEvent);
   let url = "/api/unievent/challenge/update";
   let body = {
      idChallenge: editingChallenge.idChallenge,
      name: editingChallenge.name,
      description: editingChallenge.description,
      idUEvent: idUEvent
   };
   return axios.post(url, body);
}
