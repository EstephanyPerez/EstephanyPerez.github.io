import axios from "axios";

export function listarActividades(event) {
   let url = "/api/activity/getAll" + "/?idEvent" + event.idEvento;

   return axios.get(url);
}
