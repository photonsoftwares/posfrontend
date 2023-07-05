import { TextField } from "@mui/material";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  handhandleMemberEnrollmentRequest,
  handleMemberEnrollmentRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import Home from "../Home";
import moment from "moment";

const MemberEnrollment = () => {
  const dispatch = useDispatch();
  //   const [DOB, setDob] = useState(new Date());
  const [dob, setDob] = useState("");
  const [clientId, setClientId] = useState("");
  const [baseCurrecy, setBaseCurrency] = useState("");
  const [mobile, setMobile] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [language, setLanguage] = useState("");
  const [sourceChannel, setSourceChannel] = useState("");
  const [pinCode, setPincode] = useState("");
  const [preferredAddress, setPreferredAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [gender, setGender] = useState("");
  const [businessCreatedDate, setBusinessCreatedDate] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");
  //   const [selectedOptionBaseCurrency, setSelectedOptionBaseCurrency] =
  //     useState(null);

  console.log("INPUT DOB", dob);

  const [selectedMaritalOption, setSelectedMaritalOption] = useState(null);
  const [selectedCountryOption, setSelectedCountryOption] = useState(null);
  const [selectedLocationOption, setselectedLocationOption] = useState(null);
  const [selectedCityOption, setSelectedCityOption] = useState(null);
  const [selectedSuffixOption, setSelectedSuffixOption] = useState(null);

  //   const options = [
  //     { value: "AED", label: "AED" },
  //     { value: "USD", label: "USD" },
  //     { value: "EUR", label: "EUR" },
  //   ];
  const optionsForCity = [{ value: "Sharjah", label: "Sharjah" }];
  const optionsForCountry = [{ value: "DUBAI", label: "Dubai" }];
  const optionsforSuffix = [
    { value: "Mr.", label: "Mr." },
    { value: "Mrs.", label: "Mrs." },
  ];

  const optionsforSourceOption = [{ value: "WEB", label: "WEB" }];
  const optionsforMaritalStatusOption = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
  ];
  const optionsforLocationOption = [{ value: "Sahraj", label: "Sarjah" }];

  const onOptionChange = (e) => {
    setGender(e.target.value);
    console.log("E TARGET VALUE", e.target.value);
  };

  const handleSelectedSuffix = (selectedOption) => {
    console.log("Selected Suffix", selectedOption);
    setSelectedSuffixOption(selectedOption.value);
  };

  const handleMaritalOption = (selectedOption) => {
    console.log("Selected Marital", selectedOption);
    setSelectedMaritalOption(selectedOption.value);
  };

  const handleLocationOption = (selectedOption) => {
    console.log("Selected Location", selectedOption);
    setselectedLocationOption(selectedOption.value);
  };

  const handleCityOption = (selectedOption) => {
    console.log("Selected City", selectedOption);
    setSelectedCityOption(selectedOption.value);
  };

  const handleCountryOption = (selectedOption) => {
    console.log("Selected Country", selectedOption);
    setSelectedCountryOption(selectedOption.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(baseCurrecy.toUpperCase());
    dispatch(
      handleMemberEnrollmentRequest({
        customer_id: "",
        client_id: clientId,
        base_currency: baseCurrecy,
        mobile_number: mobile,
        customer_name: customerName,
        email_id: email,
        source_channel: sourceChannel,
        business_created_date: businessCreatedDate,
        nationality: nationality,
        language: language,
        dob: dob,
        gender: gender,
        suffix: selectedSuffixOption,
        marital_status: selectedMaritalOption,
        anniversary_date: anniversaryDate,
        preferred_address: preferredAddress,
        location: selectedLocationOption,
        address_line1: address1,
        address_line2: address2,
        city: selectedCityOption,
        country: selectedCountryOption,
        pincode: pinCode,
      })
    );
    setClientId("");
    setBaseCurrency("");
    setMobile("");
    setCustomerName("");
    setEmail("");
    setSourceChannel("");
    setBaseCurrency("");
    setNationality("");
    setLanguage("");
    setPreferredAddress("");
    setAddress1("");
    setAddress2("");
  };

  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12 px-4">
            <form className="form-box" onSubmit={handleSubmit}>
              <h2>Member Enrollment</h2>
              {/* <TextField
                size="small"
                type="number"
                className="form-control mt-2"
                id="customer-name"
                label="Customer ID"
                required
              /> */}
              <TextField
                size="small"
                type="number"
                className="form-control mt-2"
                id="customer-name"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                label="Client ID"
                required
              />
              <TextField
                size="small"
                type="text"
                className="form-control mt-2"
                id="customer-name"
                value={baseCurrecy}
                onChange={(e) => setBaseCurrency(e.target.value)}
                label="Bace Currency"
                required
              />
              <TextField
                size="small"
                type="number"
                className="form-control mt-2"
                id="customer-name"
                label="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <TextField
                size="small"
                type="text"
                className="form-control mt-2"
                id="customer-name"
                label="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
              <TextField
                size="small"
                type="email"
                className="form-control mt-2"
                id="customer-name"
                label="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                size="small"
                type="text"
                className="form-control mt-2"
                id="customer-name"
                label="Source Channnel"
                value={sourceChannel}
                onChange={(e) => setSourceChannel(e.target.value)}
                required
              />
              <div className="d-flex flex-row items-center justify-content-between mt-3">
                <p>Business created date</p>
                <div>
                  {/* <ReactDatePicker
                    selected={businessCreatedDate}
                    onChange={(date) => setBusinessCreatedDate(date)}
                  /> */}
                  <input
                    type="date"
                    name=""
                    id=""
                    // placeholder="Date of Birth"
                    value={businessCreatedDate}
                    onChange={(e) => setBusinessCreatedDate(e.target.value)}
                  />
                </div>
              </div>
              <TextField
                size="small"
                type="text"
                className="form-control mt-2"
                id="customer-name"
                label="Nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              />
              <TextField
                size="small"
                type="text"
                className="form-control mt-2"
                id="customer-name"
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              />
              <div className="d-flex flex-row items-center justify-content-between mt-3">
                <p>Date of Birth</p>
                <div>
                  {/* <ReactDatePicker
                    selected={DOB}
                    onChange={(date) => setDob(date)}
                  /> */}
                  <input
                    type="date"
                    name=""
                    id=""
                    // placeholder="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center my-3">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
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
                    class="form-check-input"
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
              <div
                className="d-flex flex-row items-center justify-content-between mt-3"
                // style={{ width: "100%" }}
              >
                <p>Anniversary Date</p>
                <div>
                  {/* <ReactDatePicker
                    selected={anniversaryDate}
                    onChange={(date) => setAnniversaryDate(date)}
                  /> */}
                  <input
                    type="date"
                    name=""
                    id=""
                    value={anniversaryDate}
                    onChange={(e) => setAnniversaryDate(e.target.value)}
                  />
                </div>
              </div>
              <TextField
                size="small"
                type="text"
                className="form-control mt-2"
                id="customer-name"
                value={preferredAddress}
                onChange={(e) => setPreferredAddress(e.target.value)}
                label="Preferred Address"
                required
              />
              <TextField
                size="small"
                type="text"
                className="form-control mt-2"
                id="customer-name"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                label="Address 1"
                required
              />
              <TextField
                size="small"
                type="text"
                className="form-control mt-2"
                id="customer-name"
                label="Address 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
              />
              <div className="mt-2">
                <Select
                  defaultValue={selectedSuffixOption}
                  onChange={handleSelectedSuffix}
                  options={optionsforSuffix}
                  placeholder="Suffix"
                />
              </div>
              <div className="my-3">
                <Select
                  defaultValue={selectedMaritalOption}
                  onChange={handleMaritalOption}
                  options={optionsforMaritalStatusOption}
                  placeholder="Marital Status"
                />
              </div>
              <div className="my-3">
                <Select
                  defaultValue={selectedLocationOption}
                  onChange={handleLocationOption}
                  options={optionsforLocationOption}
                  placeholder="Location"
                />
              </div>
              <div className="my-3">
                <Select
                  defaultValue={selectedCityOption}
                  onChange={handleCityOption}
                  options={optionsForCity}
                  placeholder="City"
                />
              </div>
              <div className="my-3">
                <Select
                  defaultValue={selectedCountryOption}
                  onChange={handleCountryOption}
                  options={optionsForCountry}
                  placeholder="Country"
                />
              </div>
              <TextField
                size="small"
                type="number"
                className="form-control mt-2"
                id="customer-name"
                label="Pin Code"
                value={pinCode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
              <div className="btn d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <Link to="/">
                  <button type="submit" className="btn btn-secondary">
                    Close
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberEnrollment;
