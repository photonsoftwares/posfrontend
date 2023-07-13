import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import {
  AiFillInfoCircle,
  AiOutlineEdit,
  AiOutlinePercentage,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { PiBookOpenLight } from "react-icons/pi";
import { BsBank2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GiBlackBook } from "react-icons/gi";
import { Button } from "react-bootstrap";
import { BiChevronRight } from "react-icons/bi";
import { TextField } from "@mui/material";
// import {
//   handleDebitNoteRequest,
//   handleGstTypeDropdownRequest,
// } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import {
  handleDebitNoteRequest,
  handleGstTypeDropdownRequest,
  handleDelGetUserRequest,
  handleDeliveryNoteRequest,
} from "../../src/redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const DeliveryChalan = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGstTypeDropdownRequest());
  }, []);

  useEffect(() => {
    // console.log("GST COLLECTION", gst_type_dropdown);
    // dispatch(handleTaxRatesRequest());
  }, []);
  const { gst_type_dropdown, handle_user_dropdown } = useSelector(
    (state) => state.ComponentPropsManagement
  );
  const [selectedOptionSellPrice, setSelectedOptionSellPrice] = useState(null);
  const [charges, setCharges] = useState("");
  const [gstType, setGstType] = useState("");
  const [amount, setAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [sellingPrice, setsellingPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  // const [selectedOptionCustomer, setSelectedOptionCustomer] = useState(null);
  const [gstTax, setGstTax] = useState("");
  const [selectedOptionUnit, setSelectedOptionUnit] = useState(null);
  const [items, setItems] = useState([]);
  // const [selectedOptionPurchasePrice, setSelectedOptionPurchasePrice] =
  //   useState("");
  const [purchaseTax, setPurchaseTax] = useState("");
  const [priceTax, setPriceTax] = useState("");
  const [selectedOptionGST, setSelectedOptionGST] = useState(null);

  // console.log(selectedOptionCustomer);
  // console.log(selectedOptionSellPrice);
  // console.log(selectedOptionPurchasePrice);
  // console.log(selectedOptionUnit);

  const [edit, setEdit] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [type, setType] = useState("");
  const [addProduct, setAddProduct] = useState(false);

  const onOptionChange = (e) => {
    setType(e.target.value);
    // console.log("E TARGET VALUE", e.target.value);
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  // const optionsSellPrice = [
  //   { value: "21.00", label: "21.00" },
  //   { value: "22.00", label: "22.00" },
  //   { value: "23.00", label: "23.00" },
  // ];
  // const optionsPurchasePrice = [
  //   { value: "Tax A", label: "Tax A" },
  //   { value: "Tax B", label: "Tax B" },
  // ];
  const optionsforUnit = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
  ];
  const optionsGST = [
    { value: "18", label: "18" },
    { value: "19", label: "19" },
  ];
  // const optionsCustomer = [{ value: "Customer ABC", label: "Customer ABC" }];

  const handleAddItemSubmit = () => {
    // e.preventDefault();
    // console.log("PRODUCT NAME", type);
    // console.log("PRODUCT TYPE", itemType);
    // console.log("SELLING PRICE", sellingPrice);
    // console.log("SELLING PRICE OPTION", selectedOptionSellPrice);
    // console.log("PURCHASE PRICE", purchasePrice);
    // console.log("PURCHASE PRICE OPTION", selectedOptionSellPrice);
    // console.log("GST OPTION", selectedOptionGST);
    // console.log("UNITS", selectedOptionUnit);

    setItems((state) => [
      ...state,
      {
        type: type,
        name: productName,
        selling_price: sellingPrice,
        selling_price_tax: priceTax,
        purchase_price: 20.0,
        purchase_price_tax: purchaseTax,
        gst: gstTax,
        quantity: selectedOptionUnit,
      },
    ]);
    // setProductName("");
    // setItemType("");
    // setsellingPrice("");
    // setPurchasePrice("");
    // setPriceTax("");
    // setSelectedOptionUnit("");
    // setGstTax("");
  };
  // console.log(items);
  // console.log(taxable);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      handleDeliveryNoteRequest({
        customer_party: customerName,
        charges: charges,
        amount: amount,
        add_chalan: items,
      })
    );
    setProductName("");
    setsellingPrice("");
    setPriceTax("");
    setPurchasePrice("");
    setPurchaseTax("");
    setGstTax("");
    setAmount("");
    setCharges("");
    setCustomerName("");
  };

  // const handleGetUserSubmit = (e) => {
  //   // dispatch(handleDelGetUserRequest({ data: e.target.value }));
  // };

  const loadOptions = (searchValue, callback) => {
    const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
    axios
      .get(
        `http://3.111.70.84:8088/test/api/v1/customer/search-customer/${storeId}/EEEE/${searchValue}`
      )
      .then((data) => {
        data.map((item) => {});
      });
    // if (searchValue) {
    //   dispatch(handleDelGetUserRequest({ searchValue }));
    // }
    // const { label, value } = handle_user_dropdown;
    // callback(label, value);
  };

  // console.log(handle_user_dropdown);

  const handleChange = (selectedOption) => {
    console.log("SELECTED OPTION", selectedOption);
  };

  return (
    <section>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <form
            className="col-lg-5 col-md-10 col-sm-12 px-4"
            onSubmit={handleSubmit}
          >
            <h2>Delivery challan</h2>
            <div className="d-flex justify-content-between bg-white">
              <div>
                <p
                  className="text-secondary mb-1"
                  //   style={{ paddingBottom: 0, marginBottom: 0 }}
                >
                  Debit Node#
                </p>
                <input
                  type="text"
                  value="0001"
                  style={{ width: "50%" }}
                  disabled={edit ? false : true}
                  className="mb-1"
                />
                <p className="text-secondary">2023-07-01</p>
              </div>
              <h5
                className="text-primary fw-bold"
                onClick={() => setEdit((state) => !state)}
              >
                {edit ? "Save" : "Edit"}
              </h5>
            </div>
            <div>
              <p className="mb-1 fw-bold">
                Party <AiFillInfoCircle />
              </p>
              <p
                className="text-primary bg-white"
                style={{ fontSize: "20px" }}
                onClick={() => {
                  setOpenCustomer((state) => !state);
                }}
              >
                <AiOutlinePlusCircle className="mx-2" />
                Select Customer
              </p>
              {openCustomer ? (
                <div>
                  <div className="my-3">
                    {/* <TextField
                      size="small"
                      type="text"
                      className="form-control mt-2"
                      id="customer-name"
                      label="Customer Name"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    /> */}
                    <div>
                      <AsyncSelect
                        loadOptions={loadOptions}
                        onChange={handleChange}
                        // options={handle_user_dropdown}
                        // onChange={(e) => {
                        //   handleGetUserSubmit();
                        //   // setCustomerName(e.value);
                        // }}
                        // value={handle_user_dropdown.filter(
                        //   (io) => io.value === customerName
                        // )}
                        // required={true}
                        // placeholder="Select Gst Type"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <p className="mb-1 fw-bold">
                Products
                <AiFillInfoCircle className="mx-2" />
              </p>
              <p
                className="text-primary bg-white"
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => setAddProduct((state) => !state)}
              >
                <AiOutlinePlusCircle className="mx-2" />
                Add Products
              </p>
              {addProduct ? (
                <div>
                  <div className="">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-TextField mx-2"
                        type="radio"
                        name="inlineRadioOptions"
                        value={"Type 1"}
                        required
                        onChange={onOptionChange}
                        id="inlineRadio4"
                        // value="option1"
                      />
                      <label class="form-check-label" for="inlineRadio4">
                        Product
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-TextField mx-2"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio5"
                        value={"Type 2"}
                        required
                        onChange={onOptionChange}
                      />
                      <label class="form-check-label" for="inlineRadio5">
                        Service
                      </label>
                    </div>
                  </div>
                  <TextField
                    size="small"
                    type="text"
                    className="form-control mt-2"
                    id="customer-name"
                    label="Product Name"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <div
                    className=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className="" style={{ flex: 1 }}>
                      <p>Selling Price</p>
                      <TextField
                        size="small"
                        type="text"
                        className="form-control mt-2"
                        id="customer-name"
                        value={sellingPrice}
                        onChange={(e) => setsellingPrice(e.target.value)}
                        label="₹ 0"
                        required
                      />
                    </div>
                    <div
                      className="d-flex flex-col"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <p>Sell Price Tax Type</p>
                      <div>
                        <Select
                          options={gst_type_dropdown}
                          onChange={(e) => {
                            setPriceTax(e.value);
                          }}
                          value={gst_type_dropdown.filter(
                            (io) => io.value === priceTax
                          )}
                          required={true}
                          placeholder="Select Gst Type"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className="" style={{ flex: 1 }}>
                      <p>Purchase Price</p>
                      <TextField
                        size="small"
                        type="text"
                        className="form-control mt-2"
                        id="customer-name"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                        label="₹ 0"
                        required
                      />
                    </div>
                    <div
                      className="d-flex flex-col"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <p>Purchase Price Tax Type</p>
                      <div>
                        <Select
                          options={gst_type_dropdown}
                          onChange={(e) => {
                            setPurchaseTax(e.value);
                          }}
                          value={gst_type_dropdown.filter(
                            (io) => io.value === purchaseTax
                          )}
                          required={true}
                          placeholder="Select Gst Type"
                        />
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="my-3">
                    <p className="my-1">GST %</p>
                    <div>
                      <Select
                        options={gst_type_dropdown}
                        onChange={(e) => {
                          setGstTax(e.value);
                        }}
                        value={gst_type_dropdown.filter(
                          (io) => io.value === gstTax
                        )}
                        required={true}
                        placeholder="Select Gst Type"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="my-1">Units</p>
                    <Select
                      // defaultValue={selectedOption}
                      // onChange={setSelectedOption}
                      options={optionsforUnit}
                      required
                      onChange={(e) => setSelectedOptionUnit(e.value)}
                      placeholder="Select Unit"
                    />
                  </div>
                  <Button
                    // type="submit"
                    className="w-100"
                    onClick={() => handleAddItemSubmit()}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="d-flex justify-content-between bg-white">
              <p className="fw-bold">Optional</p>
              <h5 className="text-primary fw-bold">
                <AiOutlinePlusCircle className="mx-2" />
                Additional Charges
              </h5>
            </div>

            <div className="rounded">
              <p className="d-flex align-items-center fw-bold fs-5 text-secondary">
                <BsBank2 className="mx-2" />
                Enter Bank Details
              </p>
              <p className="d-flex align-items-center fw-bold fs-5 text-secondary">
                <AiOutlineEdit className="mx-2" />
                Select Signature
              </p>
              <p className="d-flex align-items-center fw-bold fs-5 text-secondary">
                <PiBookOpenLight className="mx-2" />
                Add Notes
              </p>
              <p className="d-flex align-items-center fw-bold fs-5 text-secondary">
                <GiBlackBook className="mx-2" />
                Add Tearms
              </p>
              <div className="d-flex align-items-center justify-content-between">
                <p className="d-flex align-items-center fw-bold fs-5 text-secondary">
                  <AiOutlinePercentage className="mx-2" />
                  Extra Discount
                </p>
                {/* <p className="text-danger fw-bold">-0</p> */}
              </div>
              {/*  */}
              <div className="d-flex align-items-center justify-content-between">
                <TextField
                  size="small"
                  type="number"
                  className="form-control mt-2"
                  id="customer-name"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  label="Amount"
                  required
                />
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <TextField
                  size="small"
                  type="number"
                  className="form-control mt-2"
                  id="customer-name"
                  value={charges}
                  onChange={(e) => setCharges(e.target.value)}
                  label="Charges"
                  required
                />
              </div>
              {/*  */}
              <div className="d-flex align-items-center justify-content-between bg-white my-2">
                <div>
                  <Button type="submit">
                    Create
                    <BiChevronRight />
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DeliveryChalan;
