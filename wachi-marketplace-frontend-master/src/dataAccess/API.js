/* eslint-disable */
import axios from "axios";

const API = axios.create({
   baseURL: process.env.VUE_APP_API_URL,
   crossDomain: true,
   headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
   }
});

API.interceptors.request.use(
   function(config) {
      return config;
   },
   function(error) {
      return Promise.reject(error);
   }
);

const APIORDER = axios.create({
   baseURL: process.env.VUE_APP_API_URL,
   crossDomain: true,
   headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
   }
});

APIORDER.interceptors.request.use(
   function(config) {
      return config;
   },
   function(error) {
      return Promise.reject(error);
   }
);

const APITEST = axios.create({
   baseURL: "http://54.167.82.200:8080",
   crossDomain: true,
   headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
   }
});

APITEST.interceptors.request.use(
   function(config) {
      return config;
   },
   function(error) {
      return Promise.reject(error);
   }
);

export { API, APIORDER, APITEST };
