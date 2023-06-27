import { TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
import Select, { useStateManager } from "react-select";
import Pricing from "../Addpurchase tabs/Pricing";
import Stock from "../Addpurchase tabs/Stock";
import {
  handleAddItemSearchRequest,
  handleAddPurchaseRequest,
  handleOpneMenuRequest,
  handlePartyNameDataRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch, useSelector } from "react-redux";

const AddPurchase = () => {
  const { handle_party_name_data, handle_add_item_search } = useSelector(
    (e) => e.ComponentPropsManagement
  );

  // console.log("SEARCH ADD ITEM", handle_add_item_search);
  const dispatch = useDispatch();
  const TabsData = [
    {
      id: 1,
      button: "Pricing",
      component: <Pricing />,
    },
    {
      id: 2,
      button: "Stock",
      component: <Stock />,
    },
  ];
  const [startDate, setStartDate] = useState(new Date());
  const [addItem, setAddItem] = useState(false);
  const [billNumber, setBillnumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [partyName, setPartyName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [mobile, setMobile] = useState("");
  const [value, setValue] = useState(0);
  const [tabs] = useState(TabsData);
  const [quantity, setQuantity] = useState();
  const { component } = tabs[value];

  useEffect(() => {
    if (handle_add_item_search && handle_add_item_search[0]) {
      setItemCode(handle_add_item_search[0].productId);
      setItemCategory(handle_add_item_search[0].category);
    }
  }, [handle_add_item_search]);

  useEffect(() => {
    if (handle_party_name_data && handle_party_name_data.partyName) {
      setPartyName(handle_party_name_data.partyName);
      setSupplierId(handle_party_name_data.supplierId);
    }
  }, [handle_party_name_data]);
  // console.log("PARTY NAME", handle_party_name_data);

  const { saasId, storeId } = JSON.parse(localStorage.getItem("User_data"));

  // console.log("Supplier Id", supplierId);

  const handleSearch = (e) => {
    dispatch(handlePartyNameDataRequest({ phone_number: e.target.value }));
  };

  const handleSearchItem = (e) => {
    dispatch(handleAddItemSearchRequest({ searchValue: e.target.value }));
  };

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
  const optimizedFnItemSearch = useCallback(debounce(handleSearchItem), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("SAAS ID", saasId);
    // console.log("STORE ID", storeId);
    // console.log("SUPPLIER ID", supplierId);
    // console.log("ITEM LIST", handle_add_item_search);
    // console.log("QUANTITY", quantity);
    dispatch(
      handleAddPurchaseRequest({
        saas_id: saasId,
        store_id: storeId,
        supplier_id: supplierId,
        item_list: [
          { productId: Number(itemCode), productQty: Number(quantity) },
        ],
      })
    );
    setItemName("");
    setPhoneNumber("");
    setPartyName("");
    setItemName("");
    setQuantity("");
    setItemCode("");
    setItemCategory("");
  };

  return (
    <>
      <div style={{ width: "100vw" }}>
        <div style={{ maxWidth: "500px", margin: "auto" }}>
          {/* <div className="row d-flex justify-content-center">
          <div className="col-lg-5 col-md-10 col-sm-12"> */}
          <form className="form-box" onSubmit={handleSubmit}>
            <h2>Add Purchase</h2>

            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div
              //  style={{ flex: 1 }}
              >
                <TextField
                  type="text"
                  className="form-control my-2"
                  id="customer-name"
                  size="small"
                  value={billNumber}
                  onChange={(e) => setBillnumber(e.target.value)}
                  required
                  disabled
                  label="Bill Number"
                />
              </div>
              <div
                style={
                  {
                    // width: "100%",
                  }
                }
              >
                <ReactDatePicker
                  style={{ width: "500px" }}
                  selected={startDate}
                  // style={{ zIndex: 2 }}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>

            <TextField
              type="text"
              className="form-control my-2"
              id="customer-name"
              size="small"
              required
              value={phoneNumber}
              onChange={(e) => {
                optimizedFn(e);
                setPhoneNumber(e.target.value);
              }}
              label="Phone Number"
            />
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
            <div
              style={{ width: "100%" }}
              onClick={() => setAddItem((state) => !state)}
            >
              <button
                className="btn btn-outline-primary"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AiOutlinePlusCircle />
                Add Item (Optional)
              </button>
            </div>

            <div>
              {addItem ? (
                <>
                  <div>
                    <TextField
                      type="text"
                      className="form-control my-2"
                      id="customer-name"
                      size="small"
                      required
                      value={itemName}
                      onChange={(e) => {
                        optimizedFnItemSearch(e);
                        setItemName(e.target.value);
                      }}
                      label="Item Name"
                    />
                    <TextField
                      type="text"
                      className="form-control my-2"
                      id="customer-name"
                      size="small"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      label="Quantity"
                    />
                    <TextField
                      type="text"
                      className="form-control my-2"
                      id="customer-name"
                      size="small"
                      required
                      value={itemCode}
                      onChange={(e) => setItemCode(e.target.value)}
                      label="Item Code / Barcode"
                    />
                    <TextField
                      type="text"
                      className="form-control my-2"
                      id="customer-name"
                      size="small"
                      required
                      value={itemCategory}
                      onChange={(e) => setItemCategory(e.target.value)}
                      label="Item Category"
                    />
                    <TextField
                      type="text"
                      className="form-control my-2"
                      id="customer-name"
                      size="small"
                      // required
                      // placeholder={`HSN/SAC Code ${(<BiSearchAlt2 />)}`}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      label="Phone Number"
                    />
                  </div>
                  <div style={{ marginBottom: 0, paddingBottom: 0 }}>
                    <div
                    // style={{ width: "500px" }}
                    >
                      <ul
                        className="d-flex flex-row"
                        style={{
                          listStyle: "none",
                          marginRight: "40px",
                          // width: "500px",
                        }}
                      >
                        {tabs.map((tab, index) => (
                          <li
                            key={tab.id}
                            // className="border-bottom border border-danger"
                            style={{
                              border: "none",
                              outline: "none",
                              flex: 1,
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "center",
                              borderBottom:
                                index === value && "2px solid red",
                            }}
                          >
                            <button
                              style={{ outline: "none", border: "none" }}
                              onClick={() => setValue(index)}
                              className={`btn mx-2`}
                            >
                              {tab.button}
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div
                      // className="d-flex justify-content-center"
                      >
                        {component}
                      </div>
                      <div
                        className="d-flex flex-row"
                        style={{ width: "100%" }}
                      >
                        <div style={{ flex: 1, width: "100%" }}>
                          <button
                            style={{
                              width: "100%",
                              outline: "none",
                              border: "none",
                              padding: "10px",
                              backgroundColor: "#e2e2e2",
                              color: "#000",
                            }}
                            className=""
                          >
                            Cancel
                          </button>
                        </div>
                        <div style={{ flex: 1 }}>
                          <button
                            style={{
                              width: "100%",
                              outline: "none",
                              border: "none",
                              padding: "10px",
                              backgroundColor: "red",
                              color: "#fff",
                            }}
                            className=""
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div
              style={{
                height: "300px",
                width: "100%",
                marginTop: "10px",
                backgroundColor: "#e2e2e2",
                padding: "20px 20px",
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <p>Total Amount</p>
                <p>₹_____________</p>
              </div>
            </div>

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
                onClick={() => dispatch(handleOpneMenuRequest(false))}
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
          {/* </div>
        </div> */}
        </div>
      </div>
    </ >
  );
};

export default AddPurchase;
