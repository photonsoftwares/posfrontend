import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { BsHandbag, BsArrowRight } from "react-icons/bs";
import { FcSalesPerformance, FcSpeaker } from "react-icons/fc";
import { IoCashOutline } from "react-icons/io5";
import { SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { SiContactlesspayment } from "react-icons/si";
import { BsCreditCardFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import Modal from "react-bootstrap/Modal";

import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";

import qrData from "../assets/QR.jpeg";
import {
  handleSearchedDataRequest,
  handleSaveTransactionRequest,
  handleRecommendedDataRequest,
  handleAccruvalRequest,
  handleShowModal,
  handleItemsDataRequest,
  handleEmailNotificationResponse,
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Button } from "react-bootstrap";
import pdfFile from "../assets/PDF.pdf";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { toast } from "react-toastify";
import { BASE_Url } from "../URL";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

import MyCart from "./my-cart/MyCart";
import { HiCreditCard } from "react-icons/hi2";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const Home = () => {
  const loyalty_data = JSON.parse(localStorage.getItem("Loyalty_data"));
  // console.log("Loylty Home", loyalty_data);

  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [defaultPdfFile] = useState(pdfFile);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const userData = JSON.parse(localStorage.getItem("User_data"));

  const {
    get_searched_data,
    // cart_data,
    get_QR_img,
    total_price,
    handle_saveTransaction_data,
    get_recommended_items,
    show_cart_modal,
  } = useSelector((e) => e.ComponentPropsManagement);
  // console.log("GSD", get_searched_data);
  useEffect(() => {
    dispatch(handleRecommendedDataRequest());
  }, []);

  const [validated, setValidated] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // const [cartData, setCartData] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [percentOff, setPercentOff] = useState(1);
  const [amountOff, setAmountOff] = useState("");
  const [show, setShow] = useState(false);
  const [speachModal, setSpechModal] = useState(false);
  const [visibleVoiceCommand, setVisibleVoiceCommand] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [handleShowReceipt, setHandleShowReceipt] = useState(false);
  const [handleShowQR, setHandleShowQR] = useState(false);
  const [handleOpenWhatsapp, setHandleOpenWhatsapp] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [balanceDue, setBalanceDue] = useState(0);
  const [sumValue, setSumValue] = useState(0);
  const [QR, setQR] = useState(null);
  const [overDicount, setOverDiscount] = useState([]);
  const [isIndividualDiscount, setIsIndividualDiscount] = useState(true);
  const [amount, setAmount] = useState("");
  const [optionTick, setOptionTick] = useState([]);
  const [optionTickSum, setOptionTickSum] = useState(0);
  const [discountPercentVal, setDiscountPercentVal] = useState("");
  const [discountAmountVal, setDiscountAmountVal] = useState("");
  const [totalDiscountVal, setTotalDiscountVal] = useState(0);
  const [invoiceValue, setInvoiceValue] = useState(0);
  const [addPrice, setAddPrice] = useState("");
  const [email, setEmail] = useState("");
  const [updatecart, setUpdatecart] = useState(true);
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("Store_data")) {
      const allData = JSON.parse(localStorage.getItem("Store_data"));
      // console.log("STORE NAME", storeName);
      setStoreName(allData?.storeName);
    }
  }, [storeName]);

  const getDataFromStorage = () => {
    try {
      const t1 = JSON.parse(localStorage.getItem("my-cart"));
      setCartData(t1);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDataFromStorage();
  }, [updatecart]);

  // console.log("CART*DATA", cartData);

  useEffect(() => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (
      handle_saveTransaction_data &&
      handle_saveTransaction_data.transaction_id
    ) {
      dispatch(
        handleAccruvalRequest({
          client_id: userData && userData.saasId,
          source_channel: "POS",
          register_id: userData && userData.registerId,
          total_invoice_amount: balanceDue,
          store_id: userData && userData.storeId,
          business_date: `${day}-${month}-${year}`,
          invoice_no: handle_saveTransaction_data.transaction_id + "",
          source_app: "POS",
          concept_code: 1,
          source_function: "POST",
          country: loyalty_data && loyalty_data?.data?.country,
          reference_number: handle_saveTransaction_data.transaction_id + "",
          territory_code: loyalty_data && loyalty_data?.data?.country,
          remarks: "GOOD",
          product: cartData,
          transaction_type: "PURCHASE",
          program_name: "campaign name",
          base_currency: loyalty_data?.data?.base_currency,
          tender: handleTenderAmount(),
          //  [
          //   {
          //     tender_name: "check",
          //     tender_value: 300,
          //   },
          //   {
          //     tender_name: "cash",
          //     tender_value: 300,
          //   },
          // ],
        })
      );
    }
  }, [handle_saveTransaction_data]);

  useEffect(() => {
    setShow(show_cart_modal);
  }, [show_cart_modal]);

  useEffect(() => {
    if (
      Number(optionTickSum) === Number(invoiceValue) &&
      Number(invoiceValue) !== 0
    ) {
      setAmount(0);
      setBalanceDue(0);
    } else if (Number(optionTickSum) < Number(invoiceValue)) {
      const balance_due = Number(invoiceValue) - Number(optionTickSum);
      setBalanceDue(parseFloat(balance_due).toFixed(2));
      setAmount(parseFloat(balance_due).toFixed(2));
    }
  }, [optionTickSum, invoiceValue]);

  useEffect(() => {
    // if (totalDiscountVal) {
    //   setInvoiceValue(parseFloat(sumValue - totalDiscountVal).toFixed(2));
    // } else {
    // }
    setInvoiceValue(parseFloat(sumValue).toFixed(2));
  }, [sumValue, totalDiscountVal]);

  useEffect(() => {
    if (get_recommended_items && get_recommended_items?.data) {
      if (get_recommended_items?.data.length > 0) {
        const t1 = JSON.parse(JSON.stringify(get_recommended_items?.data));
        t1.map((item) => {
          item["new_price"] = item.price;
        });
        setRecommendedData(t1);
      }
    }
  }, [get_recommended_items]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    console.log("cartData", cartData);
    const arr = [];
    let sum = 0;
    cartData?.map((el) => {
      // const totalCart = Number(el.price) * Number(el.productQty);
      // arr.push(totalCart);
      arr.push(el.new_price);
    });
    arr?.map((el) => {
      sum = sum + el;
    });
    // console.log("SUM", sum);
    // setBalanceDue(sum);
    setSumValue(sum);
    setAmount(sum);

    // =============================
  }, [cartData]);

  useEffect(() => {
    if (get_QR_img) {
      setQR(get_QR_img);
    }
  }, [get_QR_img]);

  // useEffect(() => {
  //   if (cart_data) {
  //     if (cart_data.length > 0) {
  //       const t1 = JSON.parse(JSON.stringify(cart_data));
  //       t1.map((item) => {
  //         item["discount_menu_is_open"] = false;
  //         item["discount_value"] = "";
  //         item["amount_value"] = "";
  //         item["new_price"] = Number(item.price) * Number(item.productQty);
  //         item["zero_price"] = Number(item.price) * Number(item.productQty);
  //       });
  //       setCartData(t1);
  //     }
  //  else {
  //   setCartData([]);
  //   setTotalDiscountVal(0);
  // }
  // }
  // }, [cart_data]);
  const optionArray = [
    {
      id: 1,
      name: "Cash",
      icon: <IoCashOutline size={25} />,
      value: "cash",
    },
    {
      id: 2,
      name: "Paytm",
      icon: <SiPaytm size={25} />,
      value: "paytm",
    },
    {
      id: 3,
      name: "Google Pay",
      icon: <FaGooglePay size={25} color="white" />,
      value: "googlepay",
    },
    {
      id: 4,
      name: "Phone Pay",
      icon: <SiPhonepe size={25} color="white" />,
      value: "phonepay",
    },
    {
      id: 5,
      name: "UPI",
      icon: <SiContactlesspayment size={25} color="white" />,
      value: "upi",
    },
    {
      id: 6,
      name: "Card",
      icon: <BsCreditCardFill size={25} />,
      value: "card",
    },
    {
      id: 7,
      name: "Credit Sale",
      icon: <FcSalesPerformance size={25} />,
      value: "card",
    },
    {
      id: 8,
      name: "Loyalty",
      icon: <RiMoneyDollarCircleFill color="#F1C40F" size={25} />,
      value: "card",
    },
  ];

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

  const handleVoiceSearch = (value) => {
    dispatch(handleSearchedDataRequest({ searchValue: value }));
  };

  const optimizedVoicefn = useCallback(debounce(handleVoiceSearch), []);

  useEffect(() => {
    if (get_searched_data && get_searched_data?.data) {
      if (get_searched_data?.data.length > 0) {
        const t1 = JSON.parse(JSON.stringify(get_searched_data?.data));
        t1.map((item) => {
          item["new_price"] = item.price;
        });
        setSearchedData(t1);
      }
    }
  }, [get_searched_data]);

  // console.log(searchedData);
  const handleSearch = (value) => {
    dispatch(handleSearchedDataRequest({ searchValue: value }));
  };

  const optimizedFn = useCallback(debounce(handleSearch), []);

  useEffect(() => {
    if (searchValue) {
      optimizedFn(searchValue);
    }
  }, [searchValue]);

  const recognition = window.recognition;
  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    // document.getElementById("p").innerHTML = transcript;
    setSearchValue(transcript);
  });

  const handleVoiceCommand = () => {
    try {
      recognition.start();
    } catch (err) {
      console.log("err", err);
    }
    // setVisibleVoiceCommand((state) => !state);
    // SpeechRecognition.startListening({ language: "en-IN" });
  };

  const handleSelect = (e) => {
    // console.log(e.target.value);
  };

  useEffect(() => {
    // console.log("optionTick", optionTick);
    let sum = 0;
    if (optionTick && optionTick.length > 0) {
      optionTick.map((item) => {
        sum = sum + Number(item.amount);
      });
    } else {
      sum = 0;
    }
    setOptionTickSum(sum);
  }, [optionTick]);

  const handleToQR = () => {
    if (balanceDue == 0) {
      setHandleShowReceipt(true);
    }
    //  else if (balanceDue == 0) {
    //   setHandleShowReceipt(true);
    // }
    else {
      // alert("PAY DUE AMOUNT");
      toast.success("Pay Due Amount!");
    }
  };

  const handleWhatsSubmit = (event) => {
    event.preventDefault();
    toast.success("Invoice Sent To Your WhatsApp!");
    // alert("Form Sumbited!");
    // window.location.reload();
  };

  const RenderUi = () => {
    if (searchedData && searchValue.length > 0) {
      return (
        <>
          <Product
            setSearchValue={setSearchValue}
            setData={setSearchedData}
            cartData={cartData}
            setCartData={setCartData}
            data={searchedData}
            setUpdatecart={setUpdatecart}
            updatecart={updatecart}
          />
        </>
      );
    } else if (recommendedData && recommendedData.length > 0) {
      return (
        <>
          <Product
            setSearchValue={setSearchValue}
            data={recommendedData}
            cartData={cartData}
            setCartData={setCartData}
            setData={setRecommendedData}
            setUpdatecart={setUpdatecart}
            updatecart={updatecart}
          />
        </>
      );
    }
  };

  const handleTenderAmount = () => {
    if (optionTick.length > 0) {
      const obj = {};
      optionTick.map((item) => {
        obj[item.name] = item.amount;
      });
      return obj;
      // setSendValues(obj)
    }
    return {};
  };

  const handleNotifyEmail = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(
        handleEmailNotificationResponse({
          to: email,
          receiptFileName:
            handle_saveTransaction_data &&
            handle_saveTransaction_data.pdf_file_name,
        })
      );
    }
    setEmail("");
  };
  return (
    <div className="app">
      <div
        style={{
          // position: "sticky",
          // top: 0,
          width: "",
          // height: "85px",
          backgroundColor: "#fff",
        }}
      >
        <div className="d-flex align-items-center justify-content-center mt-3">
          <IoIosSearch size={30} opacity={0.4} />

          {/* {visibleVoiceCommand ? ( */}
          {/* <input
            style={{ border: "none", outline: "none" }}
            type="text"
            value={searchValue}
            autoFocus
            onChange={(e) => {
              optimizedFn(e);
              setSearchValue(e.target.value);
            }}
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Search for items..."
          /> */}
          {/* ) : ( */}
          <input
            style={{ border: "1px solid yellowgreen", outline: "none" }}
            type="text"
            value={searchValue}
            autoFocus
            onChange={(e) => {
              const val = e.target.value;
              // optimizedFn(val)
              setSearchValue(val);
            }}
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Search for items..."
          />
          {/* // <div style={{ width: "100%" }}>{transcript}</div> */}
          {/* )} */}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            // marginTop: "10px",
            justifyContent: "center",
          }}
        >
          <FcSpeaker
            size={30}
            opacity={0.9}
            // onClick={() => setSpechModal(true)}
            onClick={handleVoiceCommand}
            // onClick={() => {
            //   setVisibleVoiceCommand(true);
            //   startListening;
            // }}
          />
        </div>
      </div>
      <ul
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          overflowY: "scroll",
          maxHeight: "400px",
          // paddingBottom: "20px",
        }}
      >
        <h5
          // className="my-3"
          style={{
            fontWeight: "bold",
            padding: 0,
            margin: 0,
            display: searchValue.length ? "none" : "block",
          }}
        >
          Recommended Items
        </h5>

        <RenderUi />
        {/* {searchedData && searchValue.length > 0
          ? searchedData.map((item, index) => (
              <Product item={item} key={index} />
            ))
          : recommendedData &&
            recommendedData.length > 0 &&
            recommendedData.map((item, index) => (
              <>
                <Product item={item} key={index} />
              </>
            ))} */}
      </ul>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          backgroundColor: "#ffd700",
          width: "100%",
          height: "50px",
          borderRadius: "5px",
        }}
      >
        {/* {cart_data && ( */}
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
            color: "#fff",
          }}
        >
          <div
            style={{
              color: "#eee",
              fontWeight: "bolder",
              color: "#8f0707",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <p style={{ fontSize: "19px", padding: 0, margin: 0 }}>
              {localStorage.getItem("User_data") ? storeName : ""}
            </p> */}
            <p style={{ fontSize: "19px", padding: 0, margin: 0 }}>
              Total Sales
            </p>
          </div>
          <div
            style={{
              fontWeight: "lighter",
              color: "#fff",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <div style={{ margin: "5px 0px" }}>
              {/* <BsHandbag color="#000" fontSize={30} opacity={0.8} /> */}
            </div>
            <h6
              style={{
                fontSize: "15px",
                padding: 0,
                margin: 0,
                position: "absolute",
                color: "red",
                right: "11px",
                top: "16px",
              }}
            >
              {/* {cartData?.length} */}
            </h6>
          </div>
          <h2
            style={{
              padding: 0,
              margin: 0,
              fontWeight: "400",
              color: "#000",
              textDecoration: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
            // onClick={() => {
            //   if (cartData && cartData.length > 0) {
            //     setShow(true);
            //   } else {
            //     toast.error("Please add atleast one item in cart");
            //   }
            // }}
          >
            {/* View Cart <BsArrowRight /> */}
          </h2>
        </div>
        {/* )} */}
      </div>
      {/* MY CART */}
      {show === true && (
        <MyCart
          show={show}
          cartData={cartData}
          invoiceValue={invoiceValue}
          popoverIsOpen={popoverIsOpen}
          setPopoverIsOpen={setPopoverIsOpen}
          discountAmountVal={discountAmountVal}
          discountPercentVal={discountPercentVal}
          setDiscountPercentVal={setDiscountPercentVal}
          totalDiscountVal={totalDiscountVal}
          setShow={setShow}
          setPaymentModal={setPaymentModal}
          setCartData={setCartData}
          sumValue={sumValue}
          setTotalDiscountVal={setTotalDiscountVal}
          setDiscountAmountVal={setDiscountAmountVal}
        />
      )}

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // id="contained-modal-title-vcenter"
        show={paymentModal}
        // style={{ position: "relative" }}
      >
        <Modal.Body>
          <div className="main-container">
            <div
              className="main-container1"
              style={{
                backgroundColor: "#f8f8f8",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    Total Invoice Value: {invoiceValue}
                  </div>
                  <div className="mt-2">
                    <input
                      type="number"
                      className="input-style"
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!val) {
                          setAmount("");
                        } else {
                          if (val <= balanceDue) {
                            setAmount(val);
                          } else {
                            setAmount(balanceDue);
                          }
                        }
                      }}
                      // disabled={optionTick.length > 0}
                      disabled={Number(optionTickSum) === Number(sumValue)}
                      value={amount}
                      required={true}
                      placeholder="Enter Amount"
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  display: "flex",
                  marginRight: "26px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="option-item-container">
                  {optionArray.map((item, i) => {
                    return (
                      <>
                        <div className="mb-2 d-flex px-0" key={item.id}>
                          <div
                            onClick={() => {
                              if (optionTick.length === 0) {
                                const obj = { ...item, amount };
                                setOptionTick([...optionTick, obj]);
                              } else if (optionTick.length > 0) {
                                if (
                                  optionTick.filter(
                                    (io) => io.value === item.value
                                  ).length > 0
                                ) {
                                  setOptionTick(
                                    optionTick.filter(
                                      (io) => io.value !== item.value
                                    )
                                  );
                                } else {
                                  if (Number(optionTickSum) <= sumValue) {
                                    const obj = { ...item, amount };
                                    setOptionTick([...optionTick, obj]);
                                  }
                                }
                              }
                            }}
                            className={`option-item ${
                              optionTick.filter((io) => io.name === item.value)
                                .length > 0 && ""
                            }`}
                            style={{
                              width: "90%",
                              backgroundColor:
                                item.name === "Cash"
                                  ? "#fed813"
                                  : item.name === "Paytm"
                                  ? "#00B9F1"
                                  : item.name === "Google Pay"
                                  ? "#2DA94F"
                                  : item.name === "Phone Pay"
                                  ? "#5f259f"
                                  : item.name === "UPI"
                                  ? "#ff7909"
                                  : item.name === "Credit Sale"
                                  ? "#1741b2"
                                  : item.name === "Loyalty"
                                  ? "#c8030e"
                                  : "silver",
                            }}
                          >
                            <div style={{ position: "relative", top: "2px" }}>
                              {item.icon}
                            </div>
                            <div
                              style={{
                                fontSize: "10px",
                                color:
                                  item.name === "Cash"
                                    ? "black"
                                    : item.name === "Paytm"
                                    ? "black"
                                    : item.name === "Google Pay"
                                    ? "white"
                                    : item.name === "Phone Pay"
                                    ? "white"
                                    : item.name === "UPI"
                                    ? "white"
                                    : item.name === "Credit Sale"
                                    ? "#fff"
                                    : item.name === "Loyalty"
                                    ? "#fff"
                                    : "black",
                              }}
                            >
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="calculated_amount-container">
                  {optionTick && optionTick.length > 0 && (
                    <>
                      {optionTick.map((item) => {
                        return (
                          <>
                            <div style={{ fontSize: "20px" }}>
                              {item.name} - {item.amount}
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>

              <div className="due-blnce-container">
                Balance Due = {balanceDue}
              </div>

              <div className="btn-container">
                <button
                  type="submit"
                  className="btn-style"
                  onClick={() => {
                    handleToQR();
                    dispatch(
                      handleSaveTransactionRequest({
                        registerId: userData && userData.registerId,
                        storeId: userData && userData.storeId,
                        saasId: userData && userData.saasId,
                        tenderId: "TENDER1",
                        tender: handleTenderAmount(),
                        cartItems: cartData,
                      })
                    );
                    // dispatch(
                    //   handleAccruvalRequest({
                    //     client_id: userData && userData.saasId,
                    //     source_channel: "POS",
                    //     register_id: "2002",
                    //     total_invoice_amount: balanceDue,
                    //     store_id: userData && userData.storeId,
                    //     business_date: "2023-04-05",
                    //     invoice_no: "8487021",
                    //     source_app: "POS",
                    //     concept_code: 1,
                    //     source_function: "POST",
                    //     country: loyalty_data && loyalty_data.data.country,
                    //     reference_number: "8487021",
                    //     territory_code:
                    //       loyalty_data && loyalty_data.data.country,
                    //     remarks: "GOOD",
                    //     product: cartData,
                    //     transaction_type: "PURCHASE",
                    //     program_name: "campaign name",
                    //     base_currency: loyalty_data.data.base_currency,
                    //     tender: handleTenderAmount(),
                    //     //  [
                    //     //   {
                    //     //     tender_name: "check",
                    //     //     tender_value: 300,
                    //     //   },
                    //     //   {
                    //     //     tender_name: "cash",
                    //     //     tender_value: 300,
                    //     //   },
                    //     // ],
                    //   })
                    // );
                  }}
                >
                  Receipts
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setPaymentModal(false)}
            style={{
              backgroundColor: "#20b9e3",
              outline: "none",
              border: "none",
              fontSize: "20px",
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* PDF RECEiPT*/}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={handleShowReceipt}
        style={{ height: "100%" }}
      >
        <Modal.Header>
          <Modal.Title>Your Receipt! </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "300px", width: "100%", margin: "auto" }}>
            {defaultPdfFile && (
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={`${BASE_Url}/transaction/pdf/${
                      handle_saveTransaction_data &&
                      handle_saveTransaction_data.pdf_file_name
                    }`}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </>
            )}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "30px",
              }}
            >
              <div
                style={{
                  // height: "100px",
                  // width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={`${BASE_Url}/transaction/pdf-qr/${
                    handle_saveTransaction_data &&
                    handle_saveTransaction_data.qr_file_name
                  }`}
                  alt=""
                  style={{ height: "100%", width: "80%" }}
                />
              </div>
              <Button
                variant="outline-success"
                size="lg"
                onClick={() => setHandleOpenWhatsapp(true)}
              >
                WhatsApp <IoLogoWhatsapp size={25} />
              </Button>
              <form
                onSubmit={handleNotifyEmail}
                className="d-flex flex-row align-items-center"
                style={{ width: "50%" }}
              >
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
                <div className="mx-2">
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            //  variant="secondary"
            style={{
              backgroundColor: "#20b9e3",
              outline: "none",
              border: "none",
              fontSize: "20px",
            }}
            onClick={() => {
              setHandleShowReceipt(false);
              setPaymentModal(false);
              // setShow(false);
              // dispatch(handleEmptyCartItem());
              setCartData([]);
              setAmount(0);
              // setSumValue(0);
              setSearchValue("");
              dispatch(handleShowModal({ bagModalIsOpne: !show_cart_modal }));
              localStorage.removeItem("my-cart");
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* QR */}
      {/* WhatsApp */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={handleOpenWhatsapp}
      >
        <Modal.Header>
          <Modal.Title>WhatsApp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/*  */}

          <form
            style={{ height: "100vh", width: "100%" }}
            onSubmit={handleWhatsSubmit}
          >
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Mobile
              </label>
              <input
                type="text"
                class="form-control"
                value="8400063557"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
          {/*  */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            //  variant="secondary"
            style={{
              backgroundColor: "#20b9e3",
              outline: "none",
              border: "none",
              fontSize: "20px",
            }}
            onClick={() => setHandleOpenWhatsapp(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
