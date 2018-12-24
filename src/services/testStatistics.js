import { dispatch } from "../store/index.js";
import { API_END_POINT } from "../config/constants.js";
import request from "./requestServer.js";

const url = "/api/testStatistics";

export const updateTestStatistics = async (id, numCorrect, length) => {
  return await request.put(API_END_POINT + "/api/testStatistics", {
    testId: id,
    correct: numCorrect,
    questions: length
  });
};
