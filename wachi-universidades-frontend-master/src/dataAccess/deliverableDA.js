import axios from "axios";

export function getDeliverableId(idUEvent, idActivity, idTeam) {
   let varAux = process.env.VUE_APP_API_KEY_COMMUNITY;
   let url =
      "api/unideliverable/deliverable/getByInfo?idUEvent=" +
      idUEvent.toString() +
      "&idActivity=" +
      idActivity.toString() +
      "&idTeam=" +
      idTeam.toString() +
      "&communityToken=" +
      varAux;
   return axios.get(url);
}

export function getDeliverable(idDeliverable) {
   let varAux = process.env.VUE_APP_API_KEY_COMMUNITY;
   let url = "api/unideliverable/deliverable/getById/?idDeliverable=" + idDeliverable.toString() + "&communityToken=" + varAux;
   return axios.get(url);
}

export function registerDeliberable(deliberable) {
   let url = "api/unideliverable/deliverable/register";
   return axios.post(url, deliberable);
}

export function registerFiles(file) {
   let url = "api/unideliverable/file/uploadFile";
   return axios.post(url, file);
}

export function deleteFile(idDeliverable, order) {
   let url = "api/unideliverable/file/deleteFile?idDeliverable=" + idDeliverable.toString() + "&order=" + order.toString();
   return axios.delete(url);
}
