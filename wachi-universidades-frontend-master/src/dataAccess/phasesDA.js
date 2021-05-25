import axios from "axios";

export function registerPhase(idHei, phase, idEvent) {
   console.log("idHei", idHei);
   console.log("phase", phase);
   console.log("idUEvent", idEvent);
   let url = "/api/unievent/stage/register";
   let body = {
      phaseName: phase.name,
      phaseDescription: phase.description,
      order: phase.order,
      idUEvent: idEvent,
      idHei: idHei
   };
   return axios.post(url, body);
}
export function getPhases(idUEvent) {
   let url = "/api/unievent/stage/listAllByEvent?idUEvent=" + idUEvent;
   return axios.get(url);
}

export function deletePhase(idPhase) {
   let url = "/api/unievent/stage/delete?idPhase=" + idPhase;
   return axios.delete(url);
}

export function editPhase(editingPhase, idEvent) {
   console.log(editingPhase);
   console.log(idEvent);
   let url = "/api/unievent/stage/update";
   let body = {
      idPhase: editingPhase.idPhase,
      phaseDescription: editingPhase.phaseDescription,
      idUEvent: idEvent,
      order: parseInt(editingPhase.order),
      idHei: editingPhase.idHei,
      phaseName: editingPhase.phaseName
   };
   console.log("Se envia: ", body);
   return axios.post(url, body);
}
