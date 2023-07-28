import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { handleRegisterRequest } from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { toast } from "react-toastify";
const Register = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState("");
  const [saasId, setSaasId] = useState("");
  const [registerId, setRegisterId] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [brandLogo, setBrandLogo] = useState("");
  const [taxable, setTaxable] = useState("");
  const [gstCode, setGstCode] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [storeType, setStoreType] = useState("");

  const onOptionChange = (e) => {
    setTaxable(e.target.value);
    console.log("E TARGET VALUE", e.target.value);
  };
  const onOptionStoreChange = (e) => {
    setStoreType(e.target.value);
    console.log("E TARGET VALUE", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(
        handleRegisterRequest({
          user_name: userName,
          password: password,
          store_name: storeName,
          store_id: storeId,
          saas_id: saasId,
          register_id: registerId,
          city: city,
          state: state,
          country: country,
          brand_logo: brandLogo,
          tax_able: taxable,
          gst_code: gstCode,
          hsn_code: hsnCode,
          store_type: storeType,
        })
      );
    } else {
      toast.error("Password Did'nt Match!");
    }
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    setStoreName("");
    setSaasId("");
    setRegisterId("");
    setCity("");
    setState("");
    setCountry("");
    setBrandLogo("");
    setTaxable("");
    setGstCode("");
    setHsnCode("");
    setStoreType("");
    setTimeout(() => {
      window.location.replace("/");
    }, 500);
  };
  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12">
            <form className="form-box" onSubmit={handleSubmit}>
              <h2>Sign Up</h2>
              <div
                className="d-flex flex-col"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <TextField
                  size="small"
                  type="text"
                  className="form-control mt-2"
                  id="customer-name"
                  label="User Name"
                  value={userName}
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
                <div
                  className="d-flex flex-column"
                  // style={{ borderBottom: "1px solid #000" }}
                >
                  <TextField
                    size="small"
                    type="password"
                    className="form-control mt-2"
                    id="customer-name"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                  />
                  <TextField
                    size="small"
                    type="password"
                    className="form-control mt-2"
                    id="customer-name"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirm Password"
                  />
                </div>
              </div>
              <div
                className="d-flex flex-col"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  label="Store Name"
                  //   multiline
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  //   rows={3}
                />
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  required
                  value={storeId}
                  onChange={(e) => setStoreId(e.target.value)}
                  label="Store Id"
                />

                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={saasId}
                  required
                  onChange={(e) => setSaasId(e.target.value)}
                  label="Saas Id"
                />

                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={registerId}
                  required
                  onChange={(e) => setRegisterId(e.target.value)}
                  label="Register Id"
                />
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  label="City"
                />
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  label="State"
                />
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                  label="Country"
                />
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={brandLogo}
                  required
                  onChange={(e) => setBrandLogo(e.target.value)}
                  label="Brand Logo"
                />
                <div
                  className="d-flex flex-column align-items-center justify-content-center my-2 pb-2"
                  style={{ border: "1px solid #e2e2e2" }}
                >
                  <label htmlFor="" className="my-2">
                    Taxable
                  </label>
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-TextField mx-2"
                        type="radio"
                        name="inlineRadioOptions"
                        value={true}
                        required
                        onChange={onOptionChange}
                        id="inlineRadio4"
                        // value="option1"
                      />
                      <label className="form-check-label" for="inlineRadio4">
                        Yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-TextField mx-2"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio5"
                        value={false}
                        required
                        onChange={onOptionChange}
                      />
                      <label className="form-check-label" for="inlineRadio5">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={gstCode}
                  required
                  onChange={(e) => setGstCode(e.target.value)}
                  label="GST Code"
                />
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={hsnCode}
                  required
                  onChange={(e) => setHsnCode(e.target.value)}
                  label="HSN Code"
                />
                <div
                  className="d-flex flex-column align-items-center justify-content-center my-2 pb-2"
                  style={{ border: "1px solid #e2e2e2" }}
                >
                  <label htmlFor="" className="my-2">
                    Store Type
                  </label>
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-TextField mx-2"
                        type="radio"
                        name="inlineRadioOptionsStore"
                        value={"medium"}
                        required
                        onChange={onOptionStoreChange}
                        id="inlineRadio2"
                        // value="option1"
                      />
                      <label className="form-check-label" for="inlineRadio2">
                        Medium
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-TextField mx-2"
                        type="radio"
                        name="inlineRadioOptionsStore"
                        id="inlineRadio3"
                        value={"Large"}
                        required
                        onChange={onOptionStoreChange}
                      />
                      <label className="form-check-label" for="inlineRadio3">
                        Large
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <button
                  style={{
                    backgroundColor: "#20b9e3",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  Sign up
                </button>
                <Link
                  to="/login"
                  type="submit"
                  // onClick={()=>}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#fc0202",
                    outline: "none",
                    border: "none",
                    marginLeft: "20px",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
