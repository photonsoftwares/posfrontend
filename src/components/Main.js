import React, { useState } from "react";
import { FaReceipt, FaFileInvoice } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdNoteAlt, MdOutlineHelp } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiExpense, GiNotebook, GiStabbedNote } from "react-icons/gi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiPriceTag3Fill, RiEditCircleFill } from "react-icons/ri";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { MdEditSquare } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { TfiViewListAlt } from "react-icons/tfi";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BiGroup, BiCube } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FaMoneyBillAlt } from "react-icons/fa";
import { AiOutlineAreaChart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Expense from "./expense";
import Bahikhata from "./Bahikhata";
import UpdateMoq from "./moq";
import UpdatePrice from "./update-price";
import ViewOrders from "./PendingOrders";

const Main = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expenseModalIsOpen, setExpenseModalIsOpen] = useState(false);
  const [bahikhataModalIsOpen, setBahikhataModalIsOpen] = useState(false);
  const [updateMoqModalIsOpen, setUpdateMoqModalIsOpen] = useState(false);
  const [updatePriceModalIsOpen, setUpdatePriceModalIsOpen] = useState(false);
  const [viewOrderModalIsOpen, setViewOrderModalIsOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();
  const create_transaction_arr = [
    {
      id: 1,
      label: "Invoice",
      value: "retail_billing",
      icon: <FaReceipt color="blue" size="25" />,
      isActive: true,
    },
    {
      id: 2,
      label: "Purchase",
      value: "purchase",
      icon: <BsCartFill color="green" size="25" />,
      isActive: true,
    },
    {
      id: 3,
      label: "Payment",
      value: "payment",
      icon: <FaMoneyBillAlt color="#ff17f8" size="25" />,
      isActive: true,
    },
    {
      id: 4,
      label:"Return",
      value: "return_credit_note",
      icon: <MdNoteAlt color="red" size="25" />,
      isActive: true,
    },
    {
      id: 5,
      label: "Delivery",  
      value: "delivery_challan",
      icon: <CiDeliveryTruck color="#979797" size="25" />,
      isActive: true,
    },
    {
      id: 6,
      label: "Expense",
      value: "expense",
      icon: <GiExpense color="#6700ff" size="25" />,
      isActive: true,
    },
    {
      id: 7,
      label:"Debit",
      value: "debit_note",
      icon: <GiStabbedNote color="#1facb8" size="25" />,
      isActive: true,
    },

    {
      id: 8,
      label: "Bahikhata",
      value: "bahikhata",
      icon: <GiNotebook color="#ffc107" size="25" />,
      isActive: true,
    },
  ];

  const omni_channel_arr = [
    {
      id: 1,
      label: "View Order",
      value: "pending_orders",
      icon: <TfiViewListAlt size="25" color="#26cbaf" />,
      isActive: true,
    },
    {
      id: 2,
      label: "MOQ",
      value: "update_moq",
      icon: <RiEditCircleFill size="25" color="#a050fd" />,
      isActive: true,
    },
    {
      id: 3,
      label: "Price",
      value: "update_price",
      icon: <RiPriceTag3Fill size="25" color="#0405c3" />,
      isActive: true,
    },
    {
      id: 4,
      label: "UOM",
      value: "update_uom",
      icon: <MdEditSquare size="25" color="#19d413" />,
      isActive: true,
    },
  ];

  const feature_arr = [
    {
      id: 1,
      label: "Templates",
      value: "invoice_template",
      icon: <FaFileInvoice color="#41d796" size="25" />,
      isActive: true,
    },
    {
      id: 2,
      label: "Settings",
      value: "document_settings",
      icon: <AiFillSetting color="#495057" size="25" />,
      isActive: true,
    },
    {
      id: 3,
      label: "Dashboard",
      value: "dashboard",
      icon: <AiOutlineAreaChart color="#1184ff" size="25" />,
      isActive: true,
    },
    {
      id: 4,
      label: "Store",
      value: "online_store",
      icon: <SiHomeassistantcommunitystore color="#dc3545" size="25" />,
      isActive: true,
    },
    {
      id: 5,
      label: "Help",
      value: "help",
      icon: <MdOutlineHelp color="#007bff80" size="25" />,
      isActive: true,
    },
  ];

  const footer_arr = [
    {
      id: 1,
      label: "Home",
      value: "home",
      icon: <AiFillHome color="#2c2c63" size="25" />,
      isActive: true,
    },
    {
      id: 2,
      label: "Parties",
      value: "parties",
      icon: <BiGroup color="#ff4949" size="25" />,
      isActive: true,
    },
    // {
    //   id: 3,
    //   label: "Online Store",
    //   value: "online_store",
    //   icon: <SiHomeassistantcommunitystore color="#17a2b8" size="25" />,
    //   isActive: true,
    // },
    {
      id: 4,
      label: "Product",
      value: "product",
      icon: <BiCube color="#28a745" size="25" />,
      isActive: true,
    },
    {
      id: 5,
      label: "More",
      value: "more",
      icon: <RxDashboard color="blue" size="25" />,
      isActive: false,
    },
  ];

  return (
    <>
      {/* <div style={{ height: "100vh", width: "100vw" }}> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffc544",
            width: "100%",
          
            maxWidth: "1200px",
            border: "1px solid black",
          }}
        >
          <div style={{ height: "75vh", overflow: "auto" }}>
            <div
              style={{
                fontSize: "25px",
                fontWeight: "900",
                paddingLeft: "20px",
                color: "#230D4D",
              }}
            >
              Create Transactions
            </div>
            <div
              style={{
                backgroundColor: "white",
                margin: "20px",
                borderRadius: "10px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              {create_transaction_arr
                .filter((io) => io.isActive === true)
                .map((item) => {
                  return (
                    <>
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          margin: "10px",
                          marginBottom: "20px",
                          cursor: "pointer",
                          color: "#3d2b2b",
                        }}
                        onClick={() => {
                          if (item.value === "retail_billing") {
                            navigate("/home");
                          } else if (item.value === "purchase") {
                            navigate("/add-purchase");
                          } else if (item.value === "return_credit_note") {
                            navigate("/return");
                          } else if (item.value === "debit_note") {
                            navigate("/debit-note");
                          } else if (item.value === "expense") {
                            setExpenseModalIsOpen(!expenseModalIsOpen);
                          }
                            else if (item.value === "bahikhata") {
                              setBahikhataModalIsOpen(!bahikhataModalIsOpen);
                            } 
                           else if (item.value === "delivery_challan") {
                            navigate("/delivery-challan");
                          }
                        }}
                      >
                        <div>{item.icon}</div>
                        <div>{item.label}</div>
                      </div>
                    </>
                  );
                })}
            </div>

            <div
              style={{
                fontSize: "25px",
                fontWeight: "900",
                paddingLeft: "20px",
                marginTop: "30px",
                color: "#230D4D",
              }}
            >
              Omni Channel Orders
            </div>
            <div
              style={{
                backgroundColor: "white",
                margin: "20px",
                borderRadius: "10px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              {omni_channel_arr
                .filter((io) => io.isActive === true)
                .map((item) => {
                  return (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          margin: "10px",
                          marginBottom: "20px",
                          cursor: "pointer",
                          color: "#3d2b2b",
                        }}
                        onClick={() => {
                          if (item.value === "update_moq") {
                            setUpdateMoqModalIsOpen(!updateMoqModalIsOpen);
                          } else if (item.value === "update_price") {
                            setUpdatePriceModalIsOpen(!updatePriceModalIsOpen);
                          }
                           else if (item.value === "pending_orders") {
                            setViewOrderModalIsOpen(!viewOrderModalIsOpen);
                          }
                        }}
                      >
                        <div>{item.icon}</div>
                        <div>{item.label}</div>
                      </div>
                    </>
                  );
                })}
            </div>

            <div
              style={{
                fontSize: "25px",
                fontWeight: "900",
                paddingLeft: "20px",
                marginTop: "30px",
                color: "#230D4D",
              }}
            >
              Features
            </div>
            <div
              style={{
                backgroundColor: "white",
                margin: "20px",
                borderRadius: "10px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              {feature_arr
                .filter((io) => io.isActive === true)
                .map((item) => {
                  return (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          margin: "10px",
                          marginBottom: "20px",
                          cursor: "pointer",
                          color: "#3d2b2b",
                        }}
                        onClick={() => {
                          if (item.value === "dashboard") {
                            navigate("/retailer-dashboard");
                          }
                        }}
                      >
                        <div>{item.icon}</div>
                        <div>{item.label}</div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>

          <div style={{}}>
            <div
              style={{
                backgroundColor: "white",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                userSelect: "none",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              {footer_arr
                .filter((io) => io.isActive === true)
                .map((item) => {
                  return (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          margin: "10px",
                          marginBottom: "20px",
                          cursor: "pointer",
                          
                        }}
                        onClick={() => {
                          if (item.value === "product") {
                            navigate("/add-item");
                          }
                        }}
                      >
                        {item.value === "parties" ? (
                          <>
                            <Dropdown
                              isOpen={dropdownOpen}
                              toggle={toggle}
                              direction={"down"}
                            >
                              <DropdownToggle
                                style={{ textAlign: "center" }}
                                tag={"span"}
                              >
                                <div>{item.icon}</div>
                                <div>{item.label}</div>
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem
                                  onClick={() => {
                                    navigate("/add-customer");
                                  }}
                                >
                                  Add Customer
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => {
                                    navigate("/add-supplier");
                                  }}
                                >
                                  Add Supplier
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </>
                        ) : (
                          <>
                            <div>{item.icon}</div>
                            <div>{item.label}</div>
                          </>
                        )}
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <ViewOrders
        viewOrderModalIsOpen={viewOrderModalIsOpen}
        setViewOrderModalIsOpen={setViewOrderModalIsOpen}
      />

      <UpdatePrice
        updatePriceModalIsOpen={updatePriceModalIsOpen}
        setUpdatePriceModalIsOpen={setUpdatePriceModalIsOpen}
      />

      <UpdateMoq
        updateMoqModalIsOpen={updateMoqModalIsOpen}
        setUpdateMoqModalIsOpen={setUpdateMoqModalIsOpen}
      />

      <Expense
        expenseModalIsOpen={expenseModalIsOpen}
        setExpenseModalIsOpen={setExpenseModalIsOpen}
      />
       <Bahikhata
        bahikhataModalIsOpen={bahikhataModalIsOpen}
        setBahikhataModalIsOpen={setBahikhataModalIsOpen}
      />

    </>
  );
};

export default Main;
