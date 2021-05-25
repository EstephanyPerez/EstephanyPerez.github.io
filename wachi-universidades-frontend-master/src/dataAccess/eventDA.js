import axios from "axios";

export function editEventGeneralInformation(eventBackend, eventEdited) {
   let url = "api/unievent/save-modified-general-information";
   console.log("backend:", eventBackend);
   console.log("edited: ", eventEdited);
   let newEvent = {};
   newEvent.idUEvent = eventBackend.idUEvent;
   if (eventBackend.name !== eventEdited.name) {
      newEvent.name = eventEdited.name;
   }
   if (eventBackend.description !== eventEdited.description) {
      newEvent.description = eventEdited.description;
   }
   if (eventBackend.startDate !== eventEdited.startDate) {
      newEvent.startDate = eventEdited.startDate;
   }
   if (eventBackend.endDate !== eventEdited.endDate) {
      newEvent.endDate = eventEdited.endDate;
   }
   if (eventBackend.minPerGroup !== eventEdited.minPerGroup) {
      newEvent.minPerGroup = eventEdited.minPerGroup;
   }
   if (eventBackend.maxPerGroup !== eventEdited.maxPerGroup) {
      newEvent.maxPerGroup = eventEdited.maxPerGroup;
   }
   return axios.post(url, newEvent);
}

export function getActiveUEvent(communityToken) {
   let url = "api/unievent/getActiveUEvent?communityToken=" + communityToken.toString();
   return axios.get(url);
}

export function registerEvent(event) {
   console.log("event", event);
   let url = "api/unievent/register";

   let formData = new FormData();
   formData.append("name", event.name);
   formData.append("description", event.description);
   formData.append("startDate", event.startDate);
   formData.append("endDate", event.endDate);
   formData.append("minPerGroup", event.minPerGroup);
   formData.append("maxPerGroup", event.maxPerGroup);
   //formData.append(name, value, filename);
   return axios.post(url, formData, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   });
}

export function loadProgramBases(file, idEvent) {
   let url = "api/unievent/upload-terms";
   let formData = new FormData();

   let varAux = process.env.VUE_APP_API_KEY_COMMUNITY;
   formData.append("file", file);
   formData.append("idUEvent", idEvent);
   formData.append("communityToken", varAux);
   console.log("bases en DA: ", file, idEvent, varAux);
   return axios.post(url, formData, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   });
}

export function loadFrequentQuestions(file, idEvent) {
   let url = "api/unievent/upload-faq";
   let formData = new FormData();
   let varAux = process.env.VUE_APP_API_KEY_COMMUNITY;
   formData.append("file", file);
   formData.append("idUEvent", idEvent);
   formData.append("communityToken", varAux);
   console.log("faq en DA: ", file, idEvent, varAux);
   return axios.post(url, formData, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   });
}

export function getHeisByFile(file) {
   let url = "api/hei/parse-bulk-load-file";
   let formData = new FormData();
   formData.append("fileHeis", file);
   return axios.post(url, formData, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   });
}

export function registryHeis(heis) {
   let url = "api/hei/add-all-heis-of-an-event";
   return axios.post(url, heis);
}

export function getActiveEvent() {
   let url = "api/unievent/getActiveUEvent/?idCommunity=1";
   return axios.get(url);
}

export function getHeisByEvent(idEvent) {
   let url = "api/hei/list-all-active-by-event-id/" + idEvent;
   return axios.get(url);
}

export function updateHeisInEvent(heis, idEvent) {
   let url = "urlUpdate";
   let body = {
      heis: heis,
      idEvent: idEvent
   };
   return axios.post(url, body);
}

export function addHeiInEvent(hei, idEvent) {
   let url = "api/hei/add";
   let idType;
   if (hei.type === "Universidad") idType = 1;
   else idType = 2;
   let body = {
      idEvent: idEvent,
      name: hei.name,
      contactEmail: hei.contactEmail,
      idType: idType
   };
   return axios.post(url, body);
}

export function addUnitInEvent(unit, idHei) {
   let url = "api/hei/unit/add";
   let body = {
      name: unit.name,
      contactEmail: unit.contactEmail,
      idHei: idHei
   };
   return axios.post(url, body);
}

export function addCourseInEvent(course, id, type) {
   let url = "api/hei/course/add";
   let body = {
      idType: type,
      name: course.name,
      contactEmail: course.contactEmail
   };
   if (type === 1) body.idUnit = id;
   else body.idHei = id;
   console.log("especialidad: ", body);
   return axios.post(url, body);
}

export function editHeiInEvent(hei) {
   let url = "api/hei/edit-hei-general-information";
   let body = {
      idHei: hei.idHei,
      name: hei.name,
      contactEmail: hei.contactEmail
   };
   return axios.post(url, body);
}

export function editUnitInEvent(unit) {
   let url = "api/hei/unit/edit-unit-general-information";
   console.log(unit);
   let body = {
      idUnit: unit.idUnit,
      name: unit.name,
      contactEmail: unit.contactEmail
   };

   return axios.post(url, body);
}

export function editCourseInEvent(course) {
   let url = "api/hei/course/edit-course-general-information";
   let body = {
      idCourse: course.idCourse,
      name: course.name,
      contactEmail: course.contactEmail
   };
   return axios.post(url, body);
}

export function deleteHeiInEvent(idHei) {
   let url = "api/hei/remove";
   let body = {
      idHei: idHei
   };
   return axios.post(url, body);
}

export function deleteUnitInEvent(idHei, idUnit) {
   let url = "api/hei/unit/remove";
   let body = {
      idHei: idHei,
      idUnit: idUnit
   };
   console.log("Body enviado", body);
   return axios.post(url, body);
}

export function deleteCourseInEvent(idHei, idCourse) {
   let url = "api/hei/course/remove";
   let body = {
      idHei: idHei,
      idCourse: idCourse
   };
   return axios.post(url, body);
}

export function createEvent(event) {
   let url = "api/unievent/register";
   return axios.post(url, event);
}

export function enableEnrollment(idUEvent) {
   let url = "api/unievent/enable-enrollment";
   let body = {
      idUEvent: idUEvent
   };
   return axios.post(url, body);
}

export function disableEnrollment(idUEvent) {
   let url = "api/unievent/disable-enrollment";
   let body = {
      idUEvent: idUEvent
   };
   return axios.post(url, body);
}

export function downloadUniEventFile(filename) {
   let url = "api/unievent/get-file/" + filename;
   return axios.get(url, { responseType: "blob" });
}

export function getEventHistory() {
   let varAux = process.env.VUE_APP_API_KEY_COMMUNITY;
   let url = "api/unievent/list/" + varAux;
   return axios.get(url);
}

export function endEvent(idUEvent) {
   let varAux = process.env.VUE_APP_API_KEY_COMMUNITY;
   let url = "api/unievent/terminate/?idUEvent=" + idUEvent.toString() + "&communityToken=" + varAux;
   return axios.delete(url);
}
