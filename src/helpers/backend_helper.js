import * as APIHandler from "./api_helper";
import * as url from "./url_helper";

const api = APIHandler;

// Authentication API calls

export const login = (data) => {
  return api.post(url.AUTH.LOGIN, data);
};

export const signup = (data) => {
  return api.post(url.AUTH.SIGNUP, data);
};

export const changePassword = (data) => {
  return api.post(url.AUTH.CHANGE_PASSWORD, data);
};

export const verifyAdmin = (data) => {
  return api.post(url.AUTH.VERIFY_ADMIN, data);
};

export const createCategory = (data) => {
  return api.post(url.CATEGORY.CREATE, data);
};

export const updateCategory = (id, data) => {
  return api.patch(url.CATEGORY.UPDATE + `/${id}`, data);
};

export const deleteCategory = (id) => {
  return api.remove(url.CATEGORY.DELETE + `/${id}`);
};

export const getAllCategory = (data) => {
  return api.get(url.CATEGORY.GET_ALL, data);
};

export const uploadVideo = (data) => {
  return api.post(url.VIDEO.UPLOAD, data);
};

export const getAllVideo = (data) => {
  return api.get(url.VIDEO.GET_ALL, data);
};
