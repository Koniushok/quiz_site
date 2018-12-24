import { dispatch } from "../store/index.js";
import { API_END_POINT } from "../config/constants.js";
import request from "./requestServer.js";

const url = "/api/statistics";

export const getStatistics = async () => {
  return await request.get(API_END_POINT + url);
};

export const updateStatistics = async (numCorrect, length, id) => {
  return request.put(API_END_POINT + "/api/statistics/publicTest", {
    correct: numCorrect,
    questions: length,
    testId: id
  });
};
