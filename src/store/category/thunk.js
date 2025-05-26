import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../../helpers/backend_helper";
import { toastError } from "../../config/toastConfig";

export const createCategoryThunk = createAsyncThunk(
  "createCategoryThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await createCategory(values);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      // Reject with error response
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const updateCategoryThunk = createAsyncThunk(
  "updateCategoryThunk",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const { data } = await updateCategory(id, values);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toastError(errorMessage);
      // Reject with error response
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "deleteCategoryThunk",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await deleteCategory(id);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toastError(errorMessage);
      // Reject with error response
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);

export const getAllCategoryThunk = createAsyncThunk(
  "getAllCategoryThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await getAllCategory(values);
      console.log(data);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toastError(errorMessage);
      // Reject with error response
      return rejectWithValue({
        status: error.response.status,
        message: errorMessage,
      });
    }
  }
);
