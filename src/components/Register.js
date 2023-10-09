import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, json, useParams } from "react-router-dom";
import {
  handleRegisterRequest,
  handleStoreNameRequest,
  handleLoginRequest
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { toast } from "react-toastify";
// import { Email } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_Url } from "../URL";
import AddToHomeScreenButton from "./AddToHome";
import Swal from "sweetalert2";
const Register = () => {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState("");
  const params = useParams();
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
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const onOptionChange = (e) => {
    setTaxable(e.target.value);
    console.log("E TARGET VALUE", e.target.value);
  };
  const onOptionStoreChange = (e) => {
    setStoreType(e.target.value);
    console.log("E TARGET VALUE", e.target.value);
  };

  console.log("PARAMS", params);

  // useEffect(() => {
  //   if (params.saasId && params.storeId) {
  //     navigate("/login");
  //   }
  // }, [saasId, storeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      if(mobile.length ==10){
        dispatch(
          handleRegisterRequest({
            mobile_number: mobile,
            password: password,
            customer_name: userName,
            store_id: params.storeId,
            email: email,
            saas_id: params.saasId,
          })
        );

      }else{
        return( Swal.fire({
          icon: 'error',
          title:'Invalid Mobile Number!',
        }))
      }
      Swal.fire({
        title: 'Click On Login',
        // showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Login',
        // denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(
            handleLoginRequest({
              user_name: mobile,
              password: password,
            }));
          // Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    
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
    } else {
      toast.error("Password Did'nt Match!");
    }
    // setUserName("");
    // setPassword("");
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
    // setTimeout(() => {
    //   window.location.replace("/");
    // }, 500);
  };

  // useEffect(() => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(
  //     `http://3.111.70.84:8088/test/api/v1/user-master/get-retailer-store-name/${params.saasId}/${params.storeId}`,
  //     requestOptions
  //   )
  //     .then((response) => response.text())
  //     .then((result) => JSON.parse(result))
  //     .then((data) => {
  //       console.log(data);
  //       if (data) {
  //         setName(data.store_name);
  //       }
  //     })
  //     .catch((error) => console.log("error", error));
  // });

  // console.log("NAME", name);

  const userData = async () => {
    axios
      .get(
        `${BASE_Url}/user-master/get-retailer-store-name/${params.saasId}/${params.storeId}`
      )
      .then((res) => {
        console.log("RESPONSE STORE DATA", res.data.data.store_name);
        setStoreData(res.data.data.store_name);
      });
  };

  useEffect(() => {
    userData();
  }, []);

  // useEffect(() => {
  //   dispatch(
  //     handleStoreNameRequest({ saasId: params.saasId, storeId: params.storeId })
  //   );
  // }, []);

  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12">
            <form className="form-box" onSubmit={handleSubmit}>
              <h1 style={{ textAlign: "center" }}>{storeData}</h1>
              <h2 style={{ textAlign: "center" }}>Register</h2>
              <div
                className="d-flex flex-col"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <TextField
                  size="small"
                  type="number"
                  inputProps={{ maxLength: 10 }}
                  className="form-control my-2"
                  id="customer-name"
                  label="Enter Your Mobile Number"
                  //   multiline
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  //   rows={3}
                />

                {/*  */}

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
                  className="form-control mt-2"
                  id="customer-name"
                  label="Customer Name"
                  value={userName}
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                />

                {/* <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={saasId}
                  required
                  onChange={(e) => setSaasId(e.target.value)}
                  label="Saas Id"
                /> */}

                {/* <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={registerId}
                  required
                  onChange={(e) => setRegisterId(e.target.value)}
                  label="Register Id"
                /> */}
                {/* <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  label="City"
                /> */}
                {/* <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  label="State"
                /> */}
                {/* <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                  label="Country"
                /> */}
                {/* <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={brandLogo}
                  required
                  onChange={(e) => setBrandLogo(e.target.value)}
                  label="Brand Logo"
                /> */}
                {/* <div
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
                </div> */}
                {/* <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={gstCode}
                  required
                  onChange={(e) => setGstCode(e.target.value)}
                  label="GST Code"
                /> */}
                {/* <TextField
                  size="small"
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  value={hsnCode}
                  required
                  onChange={(e) => setHsnCode(e.target.value)}
                  label="HSN Code"
                /> */}
                {/* <div
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
                </div> */}
              </div>

              <div className="">
                <button
                  style={{
                    backgroundColor: "#20b9e3",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    background: "#ECE447",
                    width: "100%",
                  }}
                >
                  Register
                </button>
                {/* <Link
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
                </Link> */}
                <p
                  className="mt-3"
                  style={{
                    color: "#808080",
                    fontFamily: "Segoe UI",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHight: "normal",
                    textAlign: "center",
                  }}
                >
                  Already have an account?{" "}
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                </p>
              </div>
            </form>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddToHomeScreenButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
