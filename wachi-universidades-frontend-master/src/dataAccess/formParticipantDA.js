import axios from "axios";

export function getGenderList() {
   let url = "/api/unievent/inscriptions/list-all-gender";
   return axios.get(url);
}

export function getInstitutionalConditionList() {
   let url = "/api/unievent/inscriptions/list-all-institutional-condition";
   return axios.get(url);
}

export function EnrollIn(participant) {
   let url = "/api/unievent/user/register";
   return axios.post(url, participant);
}
