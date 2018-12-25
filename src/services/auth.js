import request from "./requestServer.js";
import { dispatch } from "../store/index.js";
import { API_END_POINT } from "../config/constants.js";
import { setUserStatistics } from "./userSatistics";
import { setUserTest } from "./userTest";

const url = "/api/auth";

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

    await setUserStatistics();
    //await setUserTest();
  } catch (ex) {
    console.error(ex);
  }
}

export async function authorization(login, password) {
  const { data } = await request.post(API_END_POINT + "/api/auth", {
    login: login,
    password: password
  });
  request.setJwt(data.jwt);
  dispatch("ADD_USER", data.user);
}
