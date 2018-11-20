import axios from "axios";

const tokenKey = "token";

const token = localStorage.getItem(tokenKey);
if (token) axios.defaults.headers.common["token"] = token;

export function removeJwt() {
  localStorage.removeItem(tokenKey);
  axios.defaults.headers.common["token"] = undefined;
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

function setJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
  axios.defaults.headers.common["token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  getJwt,
  removeJwt
};
