import { createSlice } from "@reduxjs/toolkit";
import {
  createCategoryThunk,
  deleteCategoryThunk,
  getAllCategoryThunk,
  updateCategoryThunk,
} from "./thunk";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "Category",
  initialState,
  extraReducers: (builder) => {
    // Create
    builder.addCase(createCategoryThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCategoryThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data.unshift(action.payload.data);
    });
    builder.addCase(createCategoryThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateCategoryThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCategoryThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.map((category) =>
        category._id === action.payload.data._id
          ? { ...category, name: action.payload.data.name }
          : category
      );
    });
    builder.addCase(updateCategoryThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete
    builder.addCase(deleteCategoryThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter(
        (category) => category._id !== action.payload.data._id
      );
    });
    builder.addCase(deleteCategoryThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get All
    builder.addCase(getAllCategoryThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllCategoryThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllCategoryThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default slice.reducer;
