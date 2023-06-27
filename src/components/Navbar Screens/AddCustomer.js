import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { handleRegisterUserRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

const AddCustomer = ({ openMenu, setOpenMenu }) => {
  const { storeId } = JSON.parse(localStorage.getItem("User_data"));
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const onOptionChange = (e) => {
    setGender(e.target.value);
    console.log("E TARGET VALUE", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("NAME", name);
    // console.log("MOBILE", mobile);
    // console.log("EMAIL", email);
    // console.log("ADDRESS", address);
    // console.log("AGE", age);
    // console.log("DOB", startDate);
    // console.log("GENDER", gender);
    // console.log("AGE", age);
    // console.log("OCCUPATION", occupation);
    dispatch(
      handleRegisterUserRequest({
        mobile_number: mobile,
        email: email,
        name: name,
        address: address,
        source_of_acq: "Source1",
        dob: startDate,
        gender: gender,
        occupation: occupation,
        income_level: 600000,
        saas_id: "EEEE",
        store_id: storeId,
      })
    );
    setName("");
    setMobile("");
    setEmail("");
    setAge("");
    setAddress("");
    setGender("");
    setOccupation("");
  };
  return (<>
    {/* // <section>
    //   <div className="container">
    //     <div className="row d-flex justify-content-center">
    //       <div className="col-lg-5 col-md-10 col-sm-12"> */}
    <div style={{ width: "100vw" }}>
      <div style={{ maxWidth: "500px", margin: "auto" }}>
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Add Customer</h2>
          <TextField
            type="text"
            className="form-control my-2"
            id="customer-name"
            size="small"
            label="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            type="text"
            className="form-control my-2"
            id="customer-name"
            size="small"
            required
            label="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <TextField
            type="email"
            className="form-control my-2"
            id="customer-name"
            required
            size="small"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div
            className="my-2 d-flex flex-column items-center justify-content-center"
          // style={{ width: "100%" }}
          >
            <p>Date of Birth</p>
            <ReactDatePicker
              selected={startDate}
              style={{ zIndex: 2 }}
              onChange={(date) => setStartDate(date)}
            />
            {/* <DatePicker
                  label="Controlled picker"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />*/}
          </div>
          <TextField
            size="small"
            type="text"
            className="form-control my-2"
            id="customer-name"
            label="Delivery Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            type="text"
            className="form-control my-2"
            id="customer-name"
            label="Age"
            size="small"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <div className="d-flex justify-content-center">
            <div class="form-check form-check-inline">
              <input
                class="form-check-TextField mx-2"
                type="radio"
                name="inlineRadioOptions"
                value={"Male"}
                onChange={onOptionChange}
                id="inlineRadio1"
              // value="option1"
              />
              <label class="form-check-label" for="inlineRadio1">
                Male
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-TextField mx-2"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value={"Female"}
                onChange={onOptionChange}
              />
              <label class="form-check-label" for="inlineRadio2">
                Female
              </label>
            </div>
          </div>
          <TextField
            type="text"
            className="form-control my-2"
            id="customer-name"
            label="Occupation"
            required
            size="small"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
          <div className="mt-3">
            <button
              type="submit"
              className="btn btn-primary"
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
              Submit
            </button>
            <Link
              to="/"
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
              Close
            </Link>
          </div>
        </form>
      </div>
    </div>
    {/* 
    //   </div>
    // </section> */}
  </>);
};

export default AddCustomer;
