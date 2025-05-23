import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup, verifyAdmin } from "../../helpers/backend_helper";

export const loginThunk = createAsyncThunk(
  "loginThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await login(values);
      sessionStorage.setItem("adminId", JSON.stringify(data.adminId));
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

export const signupThunk = createAsyncThunk(
  "signupThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await signup(values);
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

export const verifyAdminThunk = createAsyncThunk(
  "verifyAdminThunk",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await verifyAdmin(values);
      localStorage.setItem("token", data.token);
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
