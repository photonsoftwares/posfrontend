import { TextField } from "@mui/material";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import CreditAndBalance from "../AddParty/CreditAndBalance";
import GSTAddress from "../AddParty/GSTAddress";
import AdditionalFields from "../AddParty/AdditionalFields";
import {
  handleCreateSupplierRequest,
  handleOpneMenuRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch } from "react-redux";

const AddSupplier = () => {
  const dispatch = useDispatch();
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const [partyName, setPartyName] = useState("");
  const [gstIn, setGstIn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gstType, setGstType] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [openingBalance, setopeningBalance] = useState("");
  const [creditLimitAmount, setCreditLimitAmount] = useState("");

  const TabsData = [
    {
      id: 1,
      button: "GST & Address",
      component: <GSTAddress />,
    },
    {
      id: 2,
      button: "Credit & Balance",
      component: <CreditAndBalance />,
    },
  ];
  const [value, setValue] = useState(0);
  const [tabs] = useState(TabsData);

  const { component } = tabs[value];
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(state, gstType);
    dispatch(
      handleCreateSupplierRequest({
        saas_id: saasId,
        party_name: partyName,
        gstin: gstIn,
        phone_number: phoneNumber,
        gst_type: gstType.toUpperCase(),
        state: state,
        email: email,
        billing_address: billingAddress,
        opening_balance: openingBalance,
        credit_limit_flag: false,
        creditLimitAmount: creditLimitAmount,
      })
    );
    setPartyName("");
    setGstIn("");
    setGstType("");
    setPartyName("");
    setPhoneNumber("");
    setState("");
    setEmail("");
    setCreditLimitAmount("");
    setopeningBalance("");
    setBillingAddress("");
    console.log(gstType.toUpperCase());
  };
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-9 col-sm-12 px-5">
            <form className="form-box" onSubmit={handleSubmit}>
              <h2>Add Supplier</h2>

              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                label="Party Name"
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={gstIn}
                onChange={(e) => setGstIn(e.target.value)}
                label="GSTIN"
              />
              <TextField
                type="number"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                label="Phone Number"
              />
              <TextField
                type="email"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                label="Billing Address"
              />
              <TextField
                type="number"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={openingBalance}
                onChange={(e) => setopeningBalance(e.target.value)}
                label="Opening Amount"
              />
              <TextField
                type="number"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={creditLimitAmount}
                onChange={(e) => setCreditLimitAmount(e.target.value)}
                label="Credit Limit Amount"
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={gstType}
                onChange={(e) => setGstType(e.target.value)}
                label="Gst Type"
              />
              <TextField
                type="text"
                className="form-control my-2"
                id="customer-name"
                size="small"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                label="State"
              />

              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#fc0202",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  Save
                </button>
                <Link
                  to="/"
                  type="submit"
                  onClick={() => dispatch(handleOpneMenuRequest(false))}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "gray",
                    outline: "none",
                    border: "none",
                    marginLeft: "20px",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  Close
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSupplier;
