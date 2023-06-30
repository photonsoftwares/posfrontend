import React, { useState } from "react";
import { FaReceipt, FaFileInvoice } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdNoteAlt, MdOutlineHelp } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiExpense, GiNotebook, GiStabbedNote } from "react-icons/gi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { SiHomeassistantcommunitystore } from "react-icons/si";
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

const Main = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();
  const create_transaction_arr = [
    {
      id: 1,
      label: "Retail Billing",
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
      label: "Return/Credit Note",
      value: "return_credit_note",
      icon: <MdNoteAlt color="red" size="25" />,
      isActive: true,
    },
    {
      id: 5,
      label: "Delivery Challan",
      value: "delivery_challan",
      icon: <CiDeliveryTruck color="#979797" size="25" />,
      isActive: true,
    },
    {
      id: 6,
      label: "Expense",
      value: "expense",
      icon: <GiExpense color="#979797" size="25" />,
      isActive: true,
    },
    {
      id: 7,
      label: "Debit Note",
      value: "debit_note",
      icon: <GiStabbedNote color="#1facb8" size="25" />,
      isActive: true,
    },
    {
      id: 8,
      label: "BahiKhata",
      value: "bahikhata",
      icon: <GiNotebook color="#ffc107" size="25" />,
      isActive: true,
    },
  ];

  const feature_arr = [
    {
      id: 1,
      label: "Invoice Template",
      value: "invoice_template",
      icon: <FaFileInvoice color="#41d796" size="25" />,
      isActive: true,
    },
    {
      id: 2,
      label: "Document Settings",
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
      label: "Online Store",
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
    {
      id: 3,
      label: "Online Store",
      value: "online_store",
      icon: <SiHomeassistantcommunitystore color="#17a2b8" size="25" />,
      isActive: true,
    },
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
            backgroundColor: "#ffd700",
            width: "100%",
            // height: "85vh",
            maxWidth: "500px",
            border: "1px solid black",
          }}
        >
          <div style={{ height: "75vh", overflow: "auto" }}>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "900",
                paddingLeft: "20px",
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
                        }}
                        onClick={() => {
                          if (item.value === "retail_billing") {
                            navigate("/home");
                          } else if (item.value === "purchase") {
                            navigate("/add-purchase");
                          } else if (item.value === "return_credit_note") {
                            navigate("/return");
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
                fontSize: "20px",
                fontWeight: "900",
                paddingLeft: "20px",
                marginTop: "30px",
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
      {/* </div> */}
    </>
  );
};

export default Main;
