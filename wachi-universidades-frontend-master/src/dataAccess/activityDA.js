import axios from "axios";

export function editActivity(activity) {
   console.log("justo antes de llamar el put. ", activity);
   let url = "api/unievent/activity/update";
   return axios.put(url, activity);
}

export function deleteActivity(idActivity) {
   console.log("justo antes de llamar el delete. ", idActivity);
   let url = "api/unievent/activity/delete?idActivity=" + idActivity.toString();
   return axios.delete(url);
}

export function listActivities(idUEvent) {
   let url = "/api/unievent/activity/getAll/?idUEvent=" + idUEvent.toString();
   return axios.get(url);
}

export function registryActivity(activity) {
   let url = "/api/unievent/activity/register";
   return axios.post(url, activity);
}
