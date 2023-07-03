import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import Home from "./components/Home";
import Home from "./components/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component, useCallback, useEffect, useState } from "react";
import Login from "./components/Login";
import ProtectedRoutingWhenLogin from "./ProtectedRoutingWhenLogin";
import ProtectedRoutingWhenLogout from "./ProtectedRoutingWhenLogout";
import { useDispatch } from "react-redux";
import { handleGetUserData } from "./redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import AddCustomer from "./components/Navbar Screens/AddCustomer";
import AddItem from "./components/Navbar Screens/AddItem";
import Navbar from "./components/Navbar";
import ReconciliationReport from "./components/ReconciliationReport";
import InventoryDashboard from "./components/InventoryDashboard ";
import SalesDashboard from "./components/SalesDashboard";
import GSTReport from "./components/Navbar Screens/GSTReport";
import LinkCustomer from "./components/Navbar Screens/LinkCustomer";
import AddPurchase from "./components/Navbar Screens/AddPurchase";
import Tax from "./components/Navbar Screens/Tax";
import Hsn from "./components/Navbar Screens/Hsn";
import AddParty from "./components/Navbar Screens/AddParty";
import AddSupplier from "./components/Navbar Screens/AddSupplier";
import Register from "./components/Register";
import Main from "./components/Main";
import Return from "./components/Navbar Screens/Return";
import RetailerDashboard from "./components/retailer-dashboard/home/index";
import RetailerDashboardNanbar from "./components/retailer-dashboard/navbar/index";
import LoyalityDashboard from "./components/Navbar Screens/LoyalityDashboard";
import DebitNote from "./components/Navbar Screens/DebitNote";
// import { Navbar } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const login_data = localStorage.getItem("login_data");
  const location = useLocation();
  // console.log("llo", location);
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
      {location.pathname === "/retailer-dashboard" ? (
        <>
          <RetailerDashboardNanbar />
        </>
      ) : (
        <>
          <Navbar />
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoutingWhenLogin Component={Main} />}
        />
        <Route
          path="/home"
          element={<ProtectedRoutingWhenLogin Component={Home} />}
        />
        <Route
          path="/retailer-dashboard"
          element={<ProtectedRoutingWhenLogin Component={RetailerDashboard} />}
        />
        <Route
          path="/login"
          element={<ProtectedRoutingWhenLogout Component={Login} />}
        />
        <Route
          path="/register"
          element={<ProtectedRoutingWhenLogout Component={Register} />}
        />
        <Route
          path="/loyality-dashboard"
          element={<ProtectedRoutingWhenLogin Component={LoyalityDashboard} />}
        />
        <Route
          path="/add-customer"
          element={<ProtectedRoutingWhenLogin Component={AddCustomer} />}
        />
        <Route
          path="/add-party"
          element={<ProtectedRoutingWhenLogin Component={AddParty} />}
        />
        <Route
          path="/add-supplier"
          element={<ProtectedRoutingWhenLogin Component={AddSupplier} />}
        />
        <Route
          path="/add-item"
          element={<ProtectedRoutingWhenLogin Component={AddItem} />}
        />
        <Route
          path="/return"
          element={<ProtectedRoutingWhenLogin Component={Return} />}
        />
        <Route
          path="/debit-note"
          element={<ProtectedRoutingWhenLogin Component={DebitNote} />}
        />
        <Route
          path="/inventory-dashboard"
          element={<ProtectedRoutingWhenLogin Component={InventoryDashboard} />}
        />
        <Route
          path="/GST-report"
          element={<ProtectedRoutingWhenLogin Component={GSTReport} />}
        />
        <Route
          path="/link-customer"
          element={<ProtectedRoutingWhenLogin Component={LinkCustomer} />}
        />
        <Route
          path="/add-party"
          element={<ProtectedRoutingWhenLogin Component={AddParty} />}
        />
        <Route
          path="/add-purchase"
          element={<ProtectedRoutingWhenLogin Component={AddPurchase} />}
        />
        <Route
          path="/reconciliation-report"
          element={
            <ProtectedRoutingWhenLogin Component={ReconciliationReport} />
          }
        />
        <Route
          path="/tax"
          element={<ProtectedRoutingWhenLogin Component={Tax} />}
        />
        <Route
          path="/HSN"
          element={<ProtectedRoutingWhenLogin Component={Hsn} />}
        />
        <Route
          path="/inventory-dashboard"
          element={<ProtectedRoutingWhenLogin Component={InventoryDashboard} />}
        />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
};

export default App;
