import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authRoutes } from "./AuthRoutes";
import { adminRoutes } from "./AdminRoutes";
import AuthProtected from "./AuthProtected";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {authRoutes.map((item) => {
          return (
            <Route path={item.PATH} element={item.COMPONENT} key={item.PATH} />
          );
        })}
        {adminRoutes.map((item) => {
          return (
            <Route
              path={item.PATH}
              element={<AuthProtected>{item.COMPONENT}</AuthProtected>}
              key={item.PATH}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
