import { createSlice } from "@reduxjs/toolkit";
import { getAllVideoThunk, uploadVideoThunk } from "./thunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "Videos",
  initialState,
  extraReducers: (builder) => {
    // Upload
    builder.addCase(uploadVideoThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadVideoThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data.unshift(action.payload.data);
    });
    builder.addCase(uploadVideoThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get All
    builder.addCase(getAllVideoThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllVideoThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllVideoThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default slice.reducer;
