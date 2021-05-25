import axios from "axios";

export function getTeamsXActivity(idActivity) {
   let url = "api/unievent/team/list-teams-activity?idActivity=" + parseInt(idActivity);
   return axios.get(url);
}

export function sendFeedback(feedback) {
   let url = "api/unideliverable/feedback/add";
   return axios.post(url, feedback);
}

export function editFeedback(feedback) {
   let url = "api/unideliverable/feedback/update";
   return axios.post(url, feedback);
}
