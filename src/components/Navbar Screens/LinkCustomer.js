import { TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  handleLinkUserRequest,
  handleSaveSearchCustomerData,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_Url } from "../../URL";
import AsyncSelect from "react-select/async";

const LinkCustomer = () => {
  const { search_customer_data } = useSelector(
    (e) => e.ComponentPropsManagement
  );

  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const dispatch = useDispatch();
  const [userData, setUserdata] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [userName, setUsername] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [err, setErr] = useState("");
  const [defaultItemData, setDefaultItemData] = useState([]);
  const [itemObj, setItemObj] = useState({});
  const loadOptions = (inputValue) => {
    if (inputValue.length > 0) {
      return new Promise((resolve, reject) => {
        resolve(handleItemFilter(inputValue));
      });
    } else {
      // return new Promise((resolve, reject) => {
      //     resolve(handleRecommendedDataRequest(inputValue));
      // });
    }
  };

  console.log(userData);

  const [customerState, setCustomerState] = useState({
    customer_name: "",
    customer_email: "",
    // previous_price: "",
    // effective_date: "",
    // valid_upto: "",
  });
  // console.log(Userdata);

  const handleItemFilter = async (inputValue) => {
    try {
      const response = await fetch(
        `${BASE_Url}/customer/search-customer/${storeId}/${saasId}/${inputValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      // console.log("IN DELIVERY", jsonData);
      if (jsonData) {
        if (jsonData.status === true) {
          const d1 = jsonData.data;
          if (d1) {
            if (d1.length > 0) {
              const arr = [];
              d1.map((item) => {
                arr.push({
                  ...item,
                  label: item.name,
                  value: item.name,
                });
              });
              return arr;
            }
          }
          // setUserdata(jsonData);
          return [];
        }
        toast.error(jsonData.message);
      } else {
        toast.error("Something went wrong server side");
      }
    } catch (err) {
      console.log(err);
    }
  };
  // const [dataRes, setDataRes] = useState({});

  // const handleSearch = (e) => {
  //   axios
  //     .post(`${BASE_Url}/customer/search-customer`, {
  //       mobile_number: e.target.value,
  //     })
  //     // .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       console.log(data.data.data.name);
  //       setUsername(data.data.data.name);
  //       setUserMobile(data.data.data.mobile_number);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setErr(err.message);
  //     });
  // };
  // useEffect(() => {}, [handleSearch]);

  // // console.log(dataRes);
  // const debounce = (func) => {
  //   let timer;
  //   return function (...args) {
  //     const context = this;
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       timer = null;
  //       func.apply(context, args);
  //     }, 1000);
  //   };
  // };

  // const optimizedFn = useCallback(debounce(handleSearch), []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-5 col-md-10 col-sm-12 px-5">
          <form className="form-box" onSubmit={handleSubmit}>
            <h4>Link Customer</h4>
            <div>
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                isSearchable={true}
                defaultOptions={defaultItemData}
                onChange={(e) => {
                  // console.log("E", e);
                  setUserdata(e);
                  const val = e.label;
                  dispatch(handleSaveSearchCustomerData({ e }));
                  setItemObj(e);
                  setCustomerState({
                    ...customerState,
                    customer_name: val,
                    // customer_email: val,
                  });
                  // console.log("VAL", val);
                }}
                // value={updatePriceState.item_name}
                required={true}
                placeholder="Select Customer"
              />
            </div>
            {userData && userData.email && userData.mobileNumber ? (
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <p style={{ padding: 0, margin: 0 }}>Customer Email</p>
                  <p
                    style={{
                      fontWeight: "900",
                      padding: 0,
                      margin: 0,
                      // fontSize: "20px",
                    }}
                  >
                    {userData.email}
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between my-3">
                  <p style={{ padding: 0, margin: 0 }}>Mobile Number</p>
                  <p
                    style={{
                      fontWeight: "900",
                      padding: 0,
                      margin: 0,
                      // fontSize: "20px",
                    }}
                  >
                    {userData.mobileNumber}
                  </p>
                </div>
                <div>
                  {userMobile && userName ? (
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
                        Link
                      </button>
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
                        Cancel
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              err
            )}
            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  backgroundColor: "yellowgreen",
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
  );
};

export default LinkCustomer;
