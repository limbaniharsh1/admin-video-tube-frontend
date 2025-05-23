import { combineReducers } from "@reduxjs/toolkit";
import Auth from "./auth/slice";
import Category from "./category/slice";
import Videos from "./videos/slice";

export const appReducer = combineReducers({
  Auth,
  Category,
  Videos,
});

export const rootReducer = (state, action) => {
  if (action.type == "RESET_STORE") {
    state = undefined;
  }
  return appReducer(state, action);
};
