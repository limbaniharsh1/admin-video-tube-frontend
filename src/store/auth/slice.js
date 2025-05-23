import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, signupThunk, verifyAdminThunk } from "./thunk";

const initialState = {
  data: {},
  adminId: JSON.parse(sessionStorage.getItem("adminId")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.adminId = action.payload.adminId;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Signup
    builder.addCase(signupThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(signupThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Signup
    builder.addCase(verifyAdminThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyAdminThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
    });
    builder.addCase(verifyAdminThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearToken } = slice.actions;
export default slice.reducer;
