import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const ProtectedRoutingWhenLogout = (props) => {
  const { Component } = props;
  return (
    <>
      {localStorage.getItem("client_id") ? (
        <>
          <Navigate to="/" />
        </>
      ) : (
        <>
          <Component />
        </>
      )}
    </>
  );
};

export default ProtectedRoutingWhenLogout;
