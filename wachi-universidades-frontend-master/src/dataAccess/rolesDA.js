import axios from "axios";

export function registerNewRole(idEvent, newRole) {
   let varAux = process.env.VUE_APP_API_KEY_COMMUNITY;
   let url = "/api/unievent/user/register-cm";
   let body = {
      idUEvent: idEvent,
      idHei: newRole.idHei,
      communityToken: varAux,
      name: newRole.name,
      lastName: newRole.lastName,
      email: newRole.email,
      privilege: newRole.privilege
   };
   return axios.post(url, body);
}

export function getAdminRoles(idEvent) {
   let varAux = process.env.VUE_APP_API_KEY_COMMUNITY;
   let url = "/api/unievent/user/list-cm?idUEvent=" + idEvent + "&communityToken=" + varAux;
   return axios.get(url);
}

export function editAdminRole(admin) {
   let url = "/api/unievent/user/edit-cm";
   let body = {
      idUser: parseInt(admin.idUserDomain),
      name: admin.name,
      lastName: admin.lastName,
      idHei: parseInt(admin.idHei),
      idUEvent: parseInt(admin.idUEvent)
   };
   console.log("body edit: ", body);
   return axios.post(url, body);
}

export function deleteAdmin(idUser) {
   let varAux = process.env.VUE_APP_API_KEY_COMMUNITY;
   console.log("idUser: ", idUser);
   console.log("token: ", varAux);
   let url = "/api/unievent/user/delete-cm?idUser=" + idUser + "&communityToken=" + varAux;
   return axios.delete(url);
}
