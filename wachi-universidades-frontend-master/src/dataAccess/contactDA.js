import axios from "axios";

export function getHeis(idCommunity) {
   let url = "api/unievent/getActiveHeiDataFromActiveEventByCommunity?communityToken=" + idCommunity;
   return axios.get(url);
}

export function sendContactInformation(body) {
   console.log("body", body);
   let url = "https://wachi.erickmrtz.me/api/unievent/user/send-contact-mail";
   return axios.post(url, body);
}
