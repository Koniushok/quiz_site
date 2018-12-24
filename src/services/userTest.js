import { dispatch } from "../store/index.js";
import { API_END_POINT } from "../config/constants.js";
import request from "./requestServer.js";

const url = "/api/userTest";

export const addTask = async (task, testId) => {
  return await request.post(API_END_POINT + url + "/task", {
    task,
    testId
  });
};

export const editTask = async (task, testId) => {
  return await request.put(API_END_POINT + url + "/task/edit", {
    task,
    testId
  });
};

export const deleteTask = async (testId, taskId) => {
  return await request.delete(
    API_END_POINT + "/api/userTest/task/" + testId + "/" + taskId
  );
};

export const addTest = async testName => {
  return await request.post(API_END_POINT + "/api/userTest", {
    name: testName
  });
};

export const editTest = async (testNameEdit, testId) => {
  return await request.put(API_END_POINT + "/api/userTest/edit", {
    name: testNameEdit,
    id: testId
  });
};

export const deleteTest = async testId => {
  return await request.delete(API_END_POINT + "/api/userTest/" + testId);
};
