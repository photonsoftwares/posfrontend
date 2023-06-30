import { TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { handleLinkUserRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_Url } from "../../URL";

const LinkCustomer = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [userName, setUsername] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [err, setErr] = useState("");
  // const [dataRes, setDataRes] = useState({});

  const handleSearch = (e) => {
    //   dispatch(handleSearchedDataRequest({ searchValue: e.target.value }));
    // };
    // dispatch(handleLinkUserRequest({ mobile_number: e.target.value }));

    axios
      .post(`${BASE_Url}/customer/search-customer`, {
        mobile_number: e.target.value,
      })
      // .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.data.data.name);
        setUsername(data.data.data.name);
        setUserMobile(data.data.data.mobile_number);
      })
      .catch((err) => {
        console.log(err);
        setErr(err.message);
      });
  };
  useEffect(() => {}, [handleSearch]);

  // console.log(dataRes);
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  const optimizedFn = useCallback(debounce(handleSearch), []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-5 col-md-10 col-sm-12 px-5">
          <form className="form-box" onSubmit={handleSubmit}>
            <h2>Link Customer</h2>
            <div>
              <TextField
                size="small"
                type="text"
                className="form-control my-2"
                id="customer-name"
                label="Mobile Number"
                value={searchValue}
                onChange={(e) => {
                  optimizedFn(e);
                  setSearchValue(e.target.value);
                }}
              />
            </div>
            {searchValue && searchValue ? (
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <p style={{ padding: 0, margin: 0 }}>Customer Name</p>
                  <p
                    style={{
                      fontWeight: "900",
                      padding: 0,
                      margin: 0,
                      // fontSize: "20px",
                    }}
                  >
                    {userName}
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
                    {userMobile}
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
