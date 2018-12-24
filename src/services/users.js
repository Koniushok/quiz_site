import { dispatch } from "../store/index.js";
import { API_END_POINT } from "../config/constants.js";
import request from "./requestServer.js";

const url = "/api/users";

export const userEdit = async user => {
  return await request.put(API_END_POINT + url + "/edit", user);
};

export const addUser = async account => {
  return await request.post(API_END_POINT + url, account);
};
