import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component, useCallback, useEffect, useState } from "react";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProtectedRoutingWhenLogin from "./ProtectedRoutingWhenLogin";
import ProtectedRoutingWhenLogout from "./ProtectedRoutingWhenLogout";
import { useDispatch } from "react-redux";
import { handleGetUserData } from "./redux/actions-reducers/ComponentProps/ComponentPropsManagement";

const App = () => {
  const dispatch = useDispatch();
  const login_data = localStorage.getItem("login_data");
  useEffect(() => {
    if (login_data) {
      dispatch(handleGetUserData(login_data));
      // dispatch(handleGetLanguageRequest());
      // dispatch(handleGetNationalityRequest());
      // dispatch(handleGetCountryDropdownRequest());
    }
  }, [login_data]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
            path="/login"
            element={<ProtectedRoutingWhenLogout Component={Login} />}
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
