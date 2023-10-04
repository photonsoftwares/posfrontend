import { TextField } from "@mui/material";
import Button from "react-bootstrap/Button";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  handleUpdateAddressforUserRequest,
  handleUpdateAddressforUserResponse,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import axios from "axios";
import { BASE_Url } from "../../URL";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const { id } = JSON.parse(localStorage.getItem("Customer_data"));

  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const onOptionChange = (e) => {
    setType(e.target.value);
    // console.log("E TARGET VALUE", e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(type);
    axios
      .post(`${BASE_Url}/customer/create-address/${id}`, {
        address: address,
        address_type: type,
        street: street,
        store_id: storeId,
        saas_id: saasId,
        pincode: pincode,
        city: city,
        state: state,
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data.message);
          toast.success(res.data.message);
          dispatch(handleUpdateAddressforUserResponse(res.data.data));
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
    // setCity("");
    // setState("");
    // setPincode("");
    // setStreet("");
    // setAddress("");

    // dispatch(
    //   handleUpdateAddressforUserRequest({
    //     address: address,
    //     address_type: type,
    //     street: street,
    //     store_id: storeId,
    //     saas_id: saasId,
    //     pincode: pincode,
    //     city: city,
    //     state: state,
    //   })
    // );
  };
  return (
    <>
      <div>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-5 col-md-10 col-sm-12 px-5">
              <form className="form-box" onSubmit={handleSubmit}>
                <h4>Profile</h4>
                <h1>Add Address</h1>
                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="Street"
                    value={street}
                    onChange={(e) => {
                      setStreet(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="my-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-TextField mx-2"
                      type="radio"
                      name="inlineRadioOptions"
                      value={"OFFICE"}
                      // required
                      onChange={onOptionChange}
                      id="inlineRadio4"
                      // value="option1"
                    />
                    <label className="form-check-label" for="inlineRadio4">
                      Office
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-TextField mx-2"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio5"
                      value={"HOME"}
                      // required
                      onChange={onOptionChange}
                    />
                    <label className="form-check-label" for="inlineRadio5">
                      Home
                    </label>
                  </div>
                </div>

                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="Pincode"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="City"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control my-2"
                    id="customer-name"
                    label="State"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-3">
                  <Button
                    //   to={"/home"}
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      // backgroundColor: "yellowgreen",
                      outline: "none",
                      border: "none",
                      fontSize: "20px",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  >
                    Save
                  </Button>
                  <Link
                    to="/"
                    type="submit"
                    // onClick={()=>}
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
      </div>
    </>
  );
};

export default CustomerProfile;
