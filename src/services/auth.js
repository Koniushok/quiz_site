import request from "./requestServer.js";
import { dispatch } from "../store/index.js";
import { API_END_POINT } from "../config/constants.js";

export function logout() {
  request.removeJwt();
  dispatch("ADD_USER", {});
}

export async function login() {
  try {
    const jwt = request.getJwt();
    if (!jwt) return;
    const { data } = await request.get(API_END_POINT + "/api/users/my");
    console.log("login:", data);
    dispatch("ADD_USER", data);
  } catch (ex) {
    console.error(ex);
  }
}
