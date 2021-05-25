import axios from "axios";

export function uploadFile(idHei, file, category) {
   let url = "/api/hei/kit/uploadFile";
   let formData = new FormData();
   formData.append("idHei", idHei);
   formData.append("file", file);
   formData.append("fileType", category);
   formData.append("communityToken", process.env.VUE_APP_API_KEY_COMMUNITY);
   return axios.post(url, formData, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   });
}

export function getFiles(idHei, fileCategory) {
   let url = "/api/hei/kit/listByHeiAndType?idHei=" + idHei + "&fileType=" + fileCategory;
   return axios.get(url);
}

export function deleteFile(idFile) {
   let url = "/api/hei/kit/deleteFile?idKitFile=" + idFile;
   return axios.delete(url);
}
