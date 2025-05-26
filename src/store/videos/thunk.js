import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllVideo, uploadVideo } from "../../helpers/backend_helper";
import { toastError } from "../../config/toastConfig";

export const uploadVideoThunk = createAsyncThunk(
  "uploadVideoThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await uploadVideo(values);
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

export const getAllVideoThunk = createAsyncThunk(
  "getAllVideoThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await getAllVideo(values);
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
