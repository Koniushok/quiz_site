import { dispatch } from "../store/index.js";
import { API_END_POINT } from "../config/constants.js";
import request from "./requestServer.js";

const url = "/api/publicTests";

export const getPublicTest = async () => {
  return await request.get(API_END_POINT + url);
};
