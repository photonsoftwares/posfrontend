import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Select from "react-select";
import Logo from "../assets/logo.jpeg";
import { IoIosSearch } from "react-icons/io";
import { BsHandbag, BsArrowRight, BsThreeDots } from "react-icons/bs";
import { FcSpeaker } from "react-icons/fc";
import { IoCashOutline } from "react-icons/io5";
import { SiPaytm } from "react-icons/si";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { SiContactlesspayment } from "react-icons/si";
import { BsCreditCardFill, BsFillCheckCircleFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  Popover,
  PopoverHeader,
  PopoverBody,
  Input,
  Label,
  Row,
  Col,
  FormGroup,
  Form,
} from "reactstrap";

import Modal from "react-bootstrap/Modal";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";

import qrData from "../assets/QR.jpeg";
import {
  handleDeleteCartItem,
  handleSearchedDataRequest,
  handleCartTotal,
  handleSavaTransactionRequest,
  handleSaveTransactionRequest,
  handlePdfRequest,
  handleRecommendedDataRequest,
  handleEmptyCartItem,
  handleDiscountItem,
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Button } from "react-bootstrap";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
import pdfFile from "../assets/PDF.pdf";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { toast } from "react-toastify";
import { BASE_Url } from "../URL";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import { TextField } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Home = () => {
  // console.log("SAAS REGISTER STORE", saasId, registerId, storeId);
  // useEffect(() => {
  //   if (localStorage.getItem("User_data")) {
  //   }
  // });
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defaultPdfFile] = useState(pdfFile);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // useEffect(() => { }, [defaultPdfFile]);

  const userData = JSON.parse(localStorage.getItem("User_data"));
  // console.log("HOME DATA", userData);

  // useEffect(() => { }, [userData]);

  const {
    get_searched_data,
    cart_data,
    get_QR_img,
    total_price,
    handle_saveTransaction_data,
    get_recommended_items,
  } = useSelector((e) => e.ComponentPropsManagement);
  // console.log("GSD", get_searched_data);
  useEffect(() => {
    dispatch(handleRecommendedDataRequest());
  }, []);

  // useEffect(() => {
  //   if (handle_saveTransaction_data) {
  //     dispatch(handlePdfRequest(handle_saveTransaction_data));
  //   }
  // }, [handle_saveTransaction_data]);

  // CART COUNT TOTAL FIX
  // dispatch(handleCartTotal());

  // useEffect(() => {
  //   setAmount(total_price);
  // }, [total_price]);

  // const { transcript, browserSupportsSpeechRecognition } =
  // useSpeechRecognition();
  const [validated, setValidated] = useState(false);
  const [searchedData, setSearchedData] = useState(get_searched_data);
  const [recommendedData, setRecommendedData] = useState(get_recommended_items);
  const [searchValue, setSearchValue] = useState("");
  const [cartData, setCartData] = useState(null);
  // const [cartData, setCartData] = useState([]);
  const [percentOff, setPercentOff] = useState(1);
  const [amountOff, setAmountOff] = useState("");
  const [show, setShow] = useState(false);
  const [speachModal, setSpechModal] = useState(false);
  const [visibleVoiceCommand, setVisibleVoiceCommand] = useState(true);
  // const [transScriptSearch, setTransScriptSearch] = useState(transcript);
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
  const [isIndividualDiscount, setIsIndividualDiscount] = useState(true)
  const [amount, setAmount] = useState("");
  const [optionTick, setOptionTick] = useState([]);
  const [optionTickSum, setOptionTickSum] = useState(0);
  const [discountPercentVal, setDiscountPercentVal] = useState("");
  const [discountAmountVal, setDiscountAmountVal] = useState("");
  const [totalDiscountVal, setTotalDiscountVal] = useState(0);
  const [invoiceValue, setInvoiceValue] = useState(0);

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

  // const { registerId, saasId, storeId } = JSON.parse(
  //   localStorage.getItem("User_data")
  // );
  // console.log("REGISTER HOME", registerId);
  // console.log("--1--", overDicount);
  // console.log(cartData);

  // console.log("SEARCH DATA STATE", searchedData);
  // console.log("SEARCH DATA", get_searched_data);
  useEffect(() => {
    if (get_recommended_items && get_recommended_items.data) {
      setRecommendedData(get_recommended_items.data);
    }
  }, [get_recommended_items]);

  // console.log(optionTick);

  // console.log("recommended", recommendedData);
  // console.log("recommended", get_recommended_items);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
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
    console.log("SUM", sum);
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

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];

  useEffect(() => {
    if (cart_data) {
      if (cart_data.length > 0) {
        const t1 = JSON.parse(JSON.stringify(cart_data));
        t1.map((item) => {
          item["discount_menu_is_open"] = false;
          item["discount_value"] = "";
          item["amount_value"] = "";
          item["new_price"] = item.price;
          item["zero_price"] = item.price;
        });
        setCartData(t1);
      }
    }
  }, [cart_data]);
  // console.log("cartData", cartData)
  // Payment

  // console.log("**", amount);
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
  ];

  // function removeElement(array, value) {
  //   // Find the index of the element to be removed
  //   let index = array.indexOf(value);

  //   // If the element is found, remove it from the array
  //   if (index !== -1) {
  //     array.splice(index, 1);
  //   }
  // }

  // Payment

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

  // useEffect(() => {
  //   // const { transcript, browserSupportsSpeechRecognition } =
  //   //   useSpeechRecognition();
  //   if (transcript) {
  //     optimizedVoicefn(transcript);
  //   }
  // }, [transcript]);

  useEffect(() => {
    if (get_searched_data && get_searched_data.data) {
      setSearchedData(get_searched_data.data);
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

  const handleDec = (item) => {
    if (item.productQty === 1) {
      item.productQty = item.productQty = 1;
      item.new_price = item.price
      setCartData([...cartData]);
    } else {
      const q = item.productQty - 1;
      item.productQty = q;
      item.new_price = item.price * q;
      setCartData([...cartData]);
    }
  };

  const RenderUi = () => {
    if (searchedData && searchValue.length > 0) {
      return searchedData.map((item, index) => (
        <Product item={item} index={index} />
      ));
    } else if (recommendedData && recommendedData.length > 0) {
      return recommendedData.map((item, index) => (
        <Product item={item} index={index} />
      ));
    }
    //  else if (searchedData) {
    //   console.log("INSIDE IF", searchedData);
    //   return (
    //     <>
    //       <span>No data found,</span>
    //       <Button>Add this Item to store!!</Button>
    //     </>
    //   );
    // }
  };
  // const DiscountUI = () => {
  //   return (
  //     <div className="d-flex flex-sm-row">
  //       <div>
  //         <div></div>
  //         <TextField
  //           label="Percent Off"
  //           type="number"
  //           // ref={ref}
  //           disabled={amountOff.length > 0 ? true : false}
  //           value={percentOff}
  //           style={{ flex: 1 }}
  //           onChange={(e) => setPercentOff(e.target.value)}
  //         />
  //         <TextField
  //           label="Amount Off"
  //           type="number"
  //           style={{ flex: 1 }}
  //           // className="mt-2"
  //           disabled={percentOff.length > 0 ? true : false}
  //           value={amountOff}
  //           onChange={(e) => setAmountOff(e.target.value)}
  //         />
  //         <Button variant="secondary" size="sm">
  //           Apply
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // };
  // const handleDiscountOff = (el) => {
  // console.log("EL", el);
  // if (el.discount == true && amountOff.length > 0) {
  //   el.price * el.productQty - amountOff;
  // } else if (el.discount == true && percentOff.length > 0) {
  //   (el.price * el.productQty * percentOff) / 100;
  // } else {
  //   el.price * el.productQty;
  // }
  // console.log("EL", el);
  // return el;
  // };

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

  const handleDiscount = (item, discount_value) => {
    const price = Number(item.price) * Number(item.productQty);
    const calculatedVal = (price * discount_value) / 100;
    const t1 = price - calculatedVal
    item.new_price = t1
    setCartData([...cartData]);
  };

  const handleDiscountLarge = (discount_value) => {
    cartData.map(item => {
      item.discount_value = discount_value
      const price = Number(item.price) * Number(item.productQty);
      const calculatedVal = (price * discount_value) / 100;
      const t1 = price - calculatedVal
      item.new_price = t1
    })
    setCartData([...cartData]);
  };

  const handleDiscountAmountLarge = (discountAmountVal) => {
    cartData.map(item => {
      item.amount_value = discountAmountVal
      const price = Number(item.price) * Number(item.productQty);
      const calculatedVal = price - discountAmountVal;
      item.new_price = calculatedVal
    })
    setCartData([...cartData]);
  };

  console.log("cartData", cartData)
  const handleDiscountAmount = (item, amount_value) => {
    const price = Number(item.price) * Number(item.productQty);
    const calculatedVal = price - amount_value;
    item.new_price = calculatedVal;
    setCartData([...cartData]);
  };

  // const handelDeleteProduct = (item) => {
  //   console.log("DELETE ITEM HANDLER", item);
  //   // setCartData(cartData.filter((el) => el.id !== item.id));
  // };

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
          // marginBottom: "10px",
          backgroundColor: "#ffd700",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          width: "100%",
          height: "100px",
          borderRadius: "5px",
        }}
      >
        {cart_data && (
          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              // height: "45px",
              // paddingTop: "3px",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontWeight: "lighter",
                color: "#fff",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <div style={{ margin: "5px 0px" }}>
                <BsHandbag color="#000" fontSize={30} opacity={0.8} />
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
                {cartData?.length}
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
              onClick={() => {
                if (cartData && cartData.length > 0) {
                  setShow(true);
                } else {
                  toast.error("Please add atleast one item in cart");
                }
              }}
            >
              View Cart <BsArrowRight />
            </h2>
          </div>
        )}
      </div>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={() => setShow(false)}>
          <Modal.Title id="contained-modal-title-vcenter">
            <span style={{ fontWeight: "900", marginRight: "10px" }}>
              My Basket
            </span>
            ({cartData?.length} items)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartData?.map((item) => (
            <div
              // className="cart_container"
              style={{
                display: "flex",
                flexDirection: "column",
                // padding: "10px",
                border: "1px solid #e7e7e7",
                marginBottom: "10px",
              }}
            >
              <h1>{item.itemName}</h1>
              <div className="cart_product" style={{}}>
                <div
                  style={{ flex: 1, height: "50px" }}
                  className="cart_column"
                >
                  <div
                    style={{
                      border: "1px solid #eee",
                      borderRadius: "20px",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <AiOutlineMinus
                      onClick={() => {
                        handleDec(item);
                        // item.productQty = item.productQty - 1;
                        // setCartData([...cartData]);
                      }}
                    />

                    {item.productQty}
                    <AiOutlinePlus
                      onClick={() => {
                        const q = item.productQty + 1;
                        item.productQty = q;
                        const newP = item.price * q;
                        item.new_price = newP;
                        // item.price = newP
                        // console.log("ITEM", item);
                        setCartData([...cartData]);
                      }}
                    />
                  </div>
                </div>
                <div style={{ flex: 1, marginLeft: "20px" }}>
                  {Number(item.price) * Number(item.productQty) === 0 ? (<>
                    {/* <TextField
                      label="Enter Price"
                      type="number"
                      onChange={e => {
                        const val = e.target.value
                        item.zero_price = val
                        setCartData([...cartData])
                      }}
                      value={item.zero_price}
                    /> */}


                    <InputLabel
                    >Enter Amount</InputLabel>
                    <OutlinedInput
                      type="number"
                      size="small"
                      // style={{ border: "2px solid #979797" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            // onClick={handleClickShowPassword}
                            edge="end"
                          >
                            <BsFillCheckCircleFill color="green" />
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Amount"
                      onChange={e => {
                        const val = e.target.value
                        item.zero_price = val
                        setCartData([...cartData])
                      }}
                      value={item.zero_price}
                    />

                  </>) : (<>
                    {item.price * item.productQty}
                  </>)}
                </div>
              </div>
              {/* {item.discount ? ( */}
              {item.discount_menu_is_open ? (<>
                <div className="d-flex flex-sm-row">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      label="Percent Off"
                      type="number"
                      className="me-3"
                      // ref={ref}
                      // disabled={amountOff.length > 0 ? true : false}
                      disabled={item.amount_value}
                      // value={percentOff}
                      // onChange={(e) => setPercentOff(e.target.value)}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val) {
                          if (val >= 1 && val <= 99) {
                            item.discount_value = val;
                            handleDiscount(item, val);
                          } else {
                            item.discount_value = 99;
                            handleDiscount(item, 99);
                          }
                        } else {
                          item.discount_value = "";
                          handleDiscount(item, 0)
                        }
                        // handleDiscount(item, "");
                      }}
                      value={item.discount_value}
                    />
                    <TextField
                      label="Amount Off"
                      type="number"
                      className="me-3"
                      disabled={item.discount_value}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val) {
                          if (val >= 1 && val <= 99999) {
                            item.amount_value = val;
                            handleDiscountAmount(item, val);
                          } else {
                            item.amount_value = 99999;
                            handleDiscountAmount(item, 99999);
                          }
                        } else {
                          item.amount_value = "";
                          handleDiscountAmount(item, 0)
                        }
                      }}
                      value={item.amount_value}
                    // disabled={percentOff.length > 0 ? true : false}
                    // value={amountOff}
                    // onChange={(e) => setAmountOff(e.target.value)}
                    />
                    <div>
                      <button
                        className="btn btn-danger my-3"
                      // onClick={() => handleDiscountOff(item)}
                      >
                        Apply
                      </button>
                      {console.log("cartData", cartData)}
                      <div style={{ fontSize: "10px" }}>
                        {item.discount_value || item.amount_value ? (
                          <>
                            <span
                              style={{ textDecorationLine: "line-through" }}
                            >
                              {item.price * item.productQty}
                            </span>{" "}
                            / {parseFloat(item.new_price).toFixed(2)}
                          </>
                        ) : (
                          <>{item.price * item.productQty}</>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>) : (<>
                <div style={{ fontSize: "10px", display: "flex", justifyContent: "flex-end", marginRight: "30px" }}>
                  {item.discount_value || item.amount_value ? (
                    <>
                      <span
                        style={{ textDecorationLine: "line-through" }}
                      >
                        {item.price * item.productQty}
                      </span>{" "}
                      / {parseFloat(item.new_price).toFixed(2)}
                    </>
                  ) : (
                    <>{item.price * item.productQty}</>
                  )}
                </div>
              </>)}
              {/* {console.log("ITEM", item)} */}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p
                  style={{
                    color: "#a90a0a",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(handleDeleteCartItem(item))}
                // onClick={() => handelDeleteProduct(item)}
                >
                  Remove
                </p>
                {totalDiscountVal === 0 && (<>
                  <p
                    style={{
                      color: "darkblue",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    // onClick={() => {
                    //   item.discount = !item.discount;
                    //   setCartData([...cartData]);
                    //   // setDiscount((state) => !state);
                    // }}
                    onClick={() => {
                      item.discount_menu_is_open = !item.discount_menu_is_open;
                      setCartData([...cartData]);
                      // item.discount == !true ? setDiscount((state) => !state) : ""
                    }}
                    className="mx-4"
                  >
                    Discount
                  </p>
                </>)}
              </div>
            </div>
          ))}

          {/* <div> */}

          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Total Invoice Value: {invoiceValue}
            <br />
          </div>
          {cartData?.filter(io => io.discount_menu_is_open === true).length === 0 && totalDiscountVal !== 0 && (<>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Total Discount: {totalDiscountVal}
            </div>
          </>)}
          {/* </div> */}
          {cartData?.filter(io => io.discount_menu_is_open === true).length === 0 && (<>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <button
                type="button"
                style={{
                  backgroundColor: "green",
                  border: "none",
                  color: "white",
                  fontWeight: "bold",
                  padding: "6px 20px",
                  borderRadius: "10px",
                }}
                id="pop112"
                onClick={() => setPopoverIsOpen(!popoverIsOpen)}
              >
                Invoice Discount
              </button>
            </div>
          </>)}

          <Modal
            show={popoverIsOpen}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header
              closeButton
              onClick={() => setPopoverIsOpen(!popoverIsOpen)}
            >
              <Modal.Title id="contained-modal-title-vcenter">
                <span style={{ fontWeight: "900", marginRight: "10px" }}>
                  Invoice Discount
                </span>
                {/* ({cartData?.length} items) */}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>
                      Percent <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      disabled={discountAmountVal}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val) {
                          if (val >= 1 && val <= 99) {
                            setDiscountPercentVal(val);
                          } else {
                            setDiscountPercentVal(99);
                          }
                        } else {
                          setDiscountPercentVal("");
                        }
                        // handleDiscount(item, val);
                      }}
                      value={discountPercentVal}
                      placeholder="Percent Value"
                    />
                  </FormGroup>
                </Col>

                <Col md={12}>
                  <FormGroup>
                    <Label>
                      Amount <span className="text-red"> * </span>
                    </Label>
                    <Input
                      type="text"
                      disabled={discountPercentVal}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val) {
                          if (val >= 1 && val <= 99999) {
                            setDiscountAmountVal(val);
                          } else {
                            setDiscountAmountVal(99999);
                          }
                        } else {
                          setDiscountAmountVal("");
                        }
                        // handleDiscountAmount(item, val);
                      }}
                      value={discountAmountVal}
                      placeholder="Amount Value"
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup className="d-flex justify-content-end">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        if (discountPercentVal) {
                          handleDiscountLarge(discountPercentVal)
                          // cartData.map(item => {
                          //   item.discount_value = discountPercentVal
                          // })
                          // { console.log("cartData", cartData) }
                          // setCartData([...cartData])
                          const val1 = (sumValue * discountPercentVal) / 100;

                          setTotalDiscountVal(parseFloat(val1).toFixed(2));
                        } else if (discountAmountVal) {
                          handleDiscountAmountLarge(discountAmountVal)
                          setTotalDiscountVal(
                            parseFloat(discountAmountVal).toFixed(2)
                          );
                        } else {
                          setTotalDiscountVal(0);
                          handleDiscountAmountLarge(0)
                        }
                        setPopoverIsOpen(!popoverIsOpen);
                      }}
                    >
                      Apply
                    </button>
                  </FormGroup>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
          {/* <Popover placement="bottom" isOpen={popoverIsOpen} target="pop112" toggle={() => setPopoverIsOpen(!popoverIsOpen)}>
            <PopoverHeader>Invoice Discount</PopoverHeader>
            <PopoverBody>
              <div>
                <Input
                  type="text"
                  id="aaa"
                />
              </div>
            </PopoverBody>
          </Popover> */}
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => {
              cartData.length > 0
                ? setPaymentModal(true)
                : setPaymentModal(false);
              // setPaymentModal((state) => !state);
            }}
            style={{
              backgroundColor: "#20b9e3",
              outline: "none",
              border: "none",
              fontSize: "20px",
            }}
          // className="bg-primary"
          >
            {cartData && cartData.length > 0
              ? "Proceed to checkout"
              : "No Item here"}
            {/* Proceed to checkout */}
          </Button>
        </Modal.Footer>
      </Modal>
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
              <div className="option-item-container">
                {optionArray.map((item) => {
                  return (
                    <>
                      <div className="me-3 mb-3 d-flex" key={item.id}>
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
                          className={`option-item ${optionTick.filter((io) => io.name === item.value)
                            .length > 0 && ""
                            }`}
                          style={{
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
                                        : "silver",
                          }}
                        >
                          <div style={{ position: "relative", top: "2px" }}>
                            {item.icon}
                          </div>
                          <div
                            style={{
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
                    fileUrl={`${BASE_Url}/transaction/pdf/${handle_saveTransaction_data &&
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
                  src={`${BASE_Url}/transaction/pdf-qr/${handle_saveTransaction_data &&
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
              <div>
                <TextField
                  type="email"
                  className="form-control my-2"
                  id="customer-name"
                  required
                  size="small"
                  label="Email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
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
              setShow(false);
              // dispatch(handleEmptyCartItem());
              setCartData(null);
              window.location.reload();
              setAmount(0);
              // setSumValue(0);
              setSearchValue("");
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
