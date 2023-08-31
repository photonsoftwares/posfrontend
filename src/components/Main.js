import React, { useEffect, useState } from "react";
import { FaReceipt, FaFileInvoice } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdNoteAlt, MdOutlineHelp } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiExpense, GiNotebook, GiStabbedNote } from "react-icons/gi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiPriceTag3Fill, RiEditCircleFill } from "react-icons/ri";
import { SiHomeassistantcommunitystore, SiCoinmarketcap } from "react-icons/si";
// import { SiCoinmarketcap } from "react-icons/si";
import { MdEditSquare } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { TfiViewListAlt } from "react-icons/tfi";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BiGroup, BiCube } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FaMoneyBillAlt } from "react-icons/fa";
import { AiOutlineAreaChart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import offer from "../assets/offer.jpeg";
import { BiUser } from "react-icons/bi";
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
import video from "../assets/shop.mp4";
import { useDispatch, useSelector } from "react-redux";
import ViewOrdersCustomer from "./PendingOrders/ViewOrdersCustomer";
import { handleStoreNameRequest } from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
const Main = () => {
  const {
    get_searched_data,
    // cart_data,
    get_QR_img,
    link_loyalty_detail,
    total_price,
    handle_saveTransaction_data,
    get_recommended_items,
    search_customer_data,
    show_cart_modal,
    show_viewOrder_modal,
  } = useSelector((e) => e.ComponentPropsManagement);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expenseModalIsOpen, setExpenseModalIsOpen] = useState(false);
  const [bahikhataModalIsOpen, setBahikhataModalIsOpen] = useState(false);
  const [updateMoqModalIsOpen, setUpdateMoqModalIsOpen] = useState(false);
  const [updatePriceModalIsOpen, setUpdatePriceModalIsOpen] = useState(false);
  const [viewOrderModalIsOpen, setViewOrderModalIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();

  useEffect(() => {});
  let { storeName, userType, saasId, storeId } = localStorage.getItem(
    "User_data"
  )
    ? JSON.parse(localStorage.getItem("User_data"))
    : {};
  console.log(userType);
  const checkCustomer = userType === "CUSTOMER";

  // useEffect(() => {}, [checkCustomer]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (checkCustomer) {
      navigate("/home");
    }
  }, [checkCustomer]);

  // console.log("TEST---", checkCustomer);

  const create_transaction_arr = [
    {
      id: 1,
      // label: "Invoice",
      label: checkCustomer ? "Order Now" : "Invoice",
      value: "retail_billing",
      icon: <FaReceipt color="blue" size="25" />,
      isActive: checkCustomer ? true : true,
    },
    {
      id: 2,
      label: "Purchase",
      value: "purchase",
      icon: <BsCartFill color="green" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 3,
      label: "Payment",
      value: "payment",
      icon: <FaMoneyBillAlt color="#ff17f8" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 4,
      label: "Return",
      value: "return_credit_note",
      icon: <MdNoteAlt color="red" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 5,
      label: "Delivery",
      value: "delivery_challan",
      icon: <CiDeliveryTruck color="#979797" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 6,
      label: "Expense",
      value: "expense",
      icon: <GiExpense color="#6700ff" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 7,
      label: "Debit",
      value: "debit_note",
      icon: <GiStabbedNote color="#1facb8" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 8,
      label: "Bahikhata",
      value: "bahikhata",
      icon: <GiNotebook color="#ffc107" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    // {
    //   id: 9,
    //   label: "View Order",
    //   value: "pending_orders",
    //   icon: <TfiViewListAlt size="25" color="#26cbaf" />,
    //   isActive: checkCustomer ? true : false,
    // },
  ];

  const omni_channel_arr = [
    {
      id: 1,
      label: "View Order",
      value: "pending_orders",
      icon: <TfiViewListAlt size="25" color="#26cbaf" />,
      isActive: checkCustomer ? true : true,
    },
    {
      id: 2,
      label: "MOQ",
      value: "update_moq",
      icon: <RiEditCircleFill size="25" color="#a050fd" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 3,
      label: "Price",
      value: "update_price",
      icon: <RiPriceTag3Fill size="25" color="#0405c3" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 4,
      label: "UOM",
      value: "update_uom",
      icon: <MdEditSquare size="25" color="#19d413" />,
      isActive: checkCustomer ? false : true,
    },
  ];

  const feature_arr = [
    {
      id: 1,
      label: "Templates",
      value: "invoice_template",
      icon: <FaFileInvoice color="#41d796" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 2,
      label: "Settings",
      value: "document_settings",
      icon: <AiFillSetting color="#495057" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 3,
      label: "Dashboard",
      value: "dashboard",
      icon: <AiOutlineAreaChart color="#1184ff" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 4,
      label: "Marketing",
      value: "marketing",
      icon: <SiCoinmarketcap color="#164ba1" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 5,
      label: "Store",
      value: "online_store",
      icon: <SiHomeassistantcommunitystore color="#dc3545" size="25" />,
      isActive: checkCustomer ? false : true,
    },
    {
      id: 6,
      label: "Help",
      value: "help",
      icon: <MdOutlineHelp color="#007bff80" size="25" />,
      isActive: checkCustomer ? false : true,
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
      label: "Product & Parties",
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
      // isActive: checkCustomer ? false : true,
      isActive: false,
    },
    {
      id: 5,
      label: "More",
      value: "more",
      icon: <RxDashboard color="blue" size="25" />,
      isActive: false,
    },
  ];

  const filterTransactionsForCustomer = (item) => {
    if (checkCustomer) {
      if (item.value === "retail_billing") {
        navigate("/home");
      }
    } else if (!checkCustomer) {
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
      } else if (item.value === "bahikhata") {
        setBahikhataModalIsOpen(!bahikhataModalIsOpen);
      } else if (item.value === "delivery_challan") {
        navigate("/delivery-challan");
      } else if (item.value === "marketing") {
        console.log(item);
        navigate("/marketing");
      }
    }
  };

  const filterOmniForCustomer = (item) => {
    if (checkCustomer) {
      if (item.value === "pending_orders") {
        setViewOrderModalIsOpen(!viewOrderModalIsOpen);
      }
    } else if (!checkCustomer) {
      if (item.value === "update_moq") {
        setUpdateMoqModalIsOpen(!updateMoqModalIsOpen);
      } else if (item.value === "update_price") {
        setUpdatePriceModalIsOpen(!updatePriceModalIsOpen);
      } else if (item.value === "pending_orders") {
        setViewOrderModalIsOpen(!viewOrderModalIsOpen);
      } else if (item.value === "update_uom") {
        navigate("/uom");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
  }, []);
  const detectKeyDown = (e) => {
    // console.log("CLICKED KEY :", e);
    if (e.keyCode === 49) {
      // navigate("/home");
    }
  };
  useEffect(() => {
    dispatch(handleStoreNameRequest({ saasId, storeId }));
  }, []);

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
        <h1
          style={{
            color: "#1E1E1E",
            // font-family: Segoe UI;
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "normal",
          }}
        >
          Hi {storeName}
        </h1>
        <div
          style={{
            backgroundColor: "#FDEECC",
            width: "100%",
            maxWidth: "1200px",
            border: "1px solid black",
          }}
          // onKeyPress={keyDownEvent}
        >
          <div style={{ height: "70vh", overflow: "auto" }}>
            <div
              style={{
                backgroundColor: "white",
                margin: "20px 20px",
                borderRadius: "10px",
                boxShadow: "0px 4px 12px 0px rgba(133, 133, 133, 0.15)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                userSelect: "none",
              }}
            >
              <div
                style={{
                  fontSize: "25px",
                  fontWeight: "900",
                  paddingLeft: "20px",
                  color: "#230D4D",
                  margin: "10px 0",
                }}
              >
                {checkCustomer ? "Transactions" : "Create Transactions"}
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  margin: "0px 20px",
                  borderRadius: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  // justifyContent: "center",
                  // alignItems: "center",
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
                          onClick={() => filterTransactionsForCustomer(item)}
                        >
                          <div>{item.icon}</div>
                          <div>{item.label}</div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                margin: "20px 20px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                // justifyContent: "center",
                // alignItems: "center",
                boxShadow: "0px 4px 12px 0px rgba(133, 133, 133, 0.15)",
                userSelect: "none",
              }}
            >
              <div
                style={{
                  fontSize: "25px",
                  fontWeight: "900",
                  paddingLeft: "20px",
                  // marginTop: "30px",
                  color: "#230D4D",
                }}
              >
                Omni Channel Orders
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  margin: "0px 20px",
                  borderRadius: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  // justifyContent: "center",
                  // alignItems: "center",
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
                            // marginBottom: "20px",
                            cursor: "pointer",
                            color: "#3d2b2b",
                          }}
                          onClick={() => filterOmniForCustomer(item)}
                        >
                          <div>{item.icon}</div>
                          <div>{item.label}</div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "white",
                margin: "20px 20px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                boxShadow: "0px 4px 12px 0px rgba(133, 133, 133, 0.15)",

                userSelect: "none",
              }}
            >
              <div
                style={{
                  fontSize: "25px",
                  fontWeight: "900",
                  paddingLeft: "20px",
                  color: "#230D4D",
                }}
              >
                Features
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  margin: "0px 20px",
                  borderRadius: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  // justifyContent: "center",
                  // alignItems: "center",
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
                            } else if (item.value === "marketing") {
                              navigate("/marketing");
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

            {/* ----- */}
            <div
              style={{
                fontSize: "25px",
                fontWeight: "900",
                paddingLeft: "20px",
                color: "#230D4D",
              }}
            >
              {checkCustomer ? "Customer Profile" : ""}
            </div>
            <div
              style={{
                backgroundColor: "white",
                margin: "0px 20px",
                borderRadius: "10px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              {checkCustomer ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: "10px",
                    cursor: "pointer",
                    color: "#3d2b2b",
                  }}
                >
                  <BiUser size={25} />
                  <p>Profile</p>
                </div>
              ) : (
                ""
              )}
            </div>
            {/*  */}

            {checkCustomer ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                  }}
                >
                  <img
                    src={offer}
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {/*  */}
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
                            // navigate("/add-item");
                          }
                        }}
                      >
                        {item.value === "parties" ? (
                          <>
                            <Dropdown
                              isOpen={dropdownOpen}
                              toggle={toggle}
                              direction={"up"}
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
                                <DropdownItem
                                  onClick={() => {
                                    navigate("/add-item");
                                  }}
                                >
                                  Add Item
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => {
                                    navigate("/add-category");
                                  }}
                                >
                                  Add Category
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

      {
        checkCustomer
          ? console.log("CUSTOMER")
          : // <ViewOrdersCustomer
            //   show={show}
            //   setShow={setShow}
            //   // viewOrderModalIsOpen={viewOrderModalIsOpen}
            //   // setViewOrderModalIsOpen={setViewOrderModalIsOpen}
            // />
            console.log("RETAILER")
        // <ViewOrders
        //   viewOrderModalIsOpen={viewOrderModalIsOpen}
        //   setViewOrderModalIsOpen={setViewOrderModalIsOpen}
        // />
      }

      {/* <ViewOrdersCustomer /> */}
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
