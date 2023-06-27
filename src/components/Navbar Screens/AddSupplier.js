import { TextField } from "@mui/material";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import CreditAndBalance from "../AddParty/CreditAndBalance";
import GSTAddress from "../AddParty/GSTAddress";
import AdditionalFields from "../AddParty/AdditionalFields";
import { handleOpneMenuRequest } from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch } from "react-redux";

const AddSupplier = () => {
  const dispatch = useDispatch();
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
    {
      id: 3,
      button: "Additional Fields",
      component: <AdditionalFields />,
    },
  ];
  const [value, setValue] = useState(0);
  const [tabs] = useState(TabsData);

  const { component } = tabs[value];
  return (<>
    <div style={{ width: "100vw" }}>
      <div style={{ maxWidth: "500px", margin: "auto" }}>
        {/* // <section> */}
        {/* //   <div className="container">
    //     <div className="row d-flex justify-content-center">
    //       <div className="col-lg-5 col-md-10 col-sm-12"> */}
        <form
          className="form-box"
        //  onSubmit={handleSubmit}
        >
          <h2>Add Supplier</h2>

          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              //   justifyContent: "space-evenly",
            }}
          ></div>

          <TextField
            type="text"
            className="form-control my-2"
            id="customer-name"
            size="small"
            required
            label="Party Name"
          />
          <TextField
            type="text"
            className="form-control my-2"
            id="customer-name"
            size="small"
            required
            label="GSTIN"
          />
          <TextField
            type="text"
            className="form-control my-2"
            id="customer-name"
            size="small"
            required
            label="Phone Number"
          />
          {/* <div style={{ width: "100%" }}>
                <button
                  className="btn btn-outline-primary"
                  style={{ width: "100%" }}
                >
                  <AiOutlinePlusCircle />
                  Add Item (Optional)
                </button>
              </div> */}
          <div style={{ marginBottom: 0, paddingBottom: 0 }}>
            <div style={{ width: "100%" }}>
              <ul
                className="d-flex flex-row"
                style={{
                  listStyle: "none",
                  flex: 1,
                  marginRight: "40px",
                }}
              >
                {tabs.map((tab, index) => (
                  <li
                    key={tab.id}
                    // className="border-bottom border border-danger"
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      borderBottom: index === value && "2px solid red",
                    }}
                  >
                    <button
                      style={{
                        outline: "none",
                        border: "none",
                        fontSize: "15px",
                        width: "100%",
                      }}
                      onClick={() => setValue(index)}
                      className={`btn mx-2`}
                    >
                      {tab.button}
                    </button>
                  </li>
                ))}
              </ul>
              <div
              // style={{
              //   display: "flex",
              //   flexDirection: "column",
              //   justifyContent: "center",
              //   width: "100%",
              //   alignItems: "center",
              // }}
              >
                {component}
              </div>
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
    {/* </div> */}
    {/* </section> */}
  </>);
};

export default AddSupplier;
