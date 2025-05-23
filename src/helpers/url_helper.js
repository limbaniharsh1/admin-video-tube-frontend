import { create } from "lodash";

const initialPath = "/api";
const auth = initialPath + "/admin/v1/auth";
const category = initialPath + "/admin/v1/category";
const video = initialPath + "/v1/video";

export const AUTH = {
  LOGIN: `${auth}/login`,
  SIGNUP: `${auth}/register`,
  VERIFY_ADMIN: `${auth}/verify-secret`,
};

export const CATEGORY = {
  CREATE: `${category}/create`,
  UPDATE: `${category}/update`,
  DELETE: `${category}/delete`,
  GET_ALL: `${category}/get-all`,
};

export const VIDEO = {
  UPLOAD: `${video}/upload`,
  GET_ALL: `${video}/get-all`,
};
