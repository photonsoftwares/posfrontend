import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { IoIosSearch } from "react-icons/io";
import { BsHandbag, BsArrowRight } from "react-icons/bs";
import { FcSpeaker } from "react-icons/fc";
import { IoCashOutline } from "react-icons/io5";
import { SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { SiContactlesspayment } from "react-icons/si";
import { BsCreditCardFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiQrScan } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import Logo from "../assets/logo.jpeg";
import Product from "../components/Product";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";

import qrData from "../assets/QR.jpeg";
import {
  handleDeleteCartItem,
  handleSearchedDataRequest,
  handleCartTotal,
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Button } from "react-bootstrap";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import pdfFile from "../assets/PDF.pdf";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Home = () => {
  const dispatch = useDispatch();
  const [defaultPdfFile] = useState(pdfFile);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {}, [defaultPdfFile]);
  const { get_searched_data, cart_data, get_QR_img, total_price } = useSelector(
    (e) => e.ComponentPropsManagement
  );

  // console.log("TOTAL PRICE", total_price);

  // CART COUNT TOTAL FIX
  dispatch(handleCartTotal());

  useEffect(() => {
    setAmount(total_price);
  }, [total_price]);

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [validated, setValidated] = useState(false);
  const [searchedData, setSearchedData] = useState(get_searched_data);
  const [searchValue, setSearchValue] = useState("");
  const [cartData, setCartData] = useState(cart_data);
  const [show, setShow] = useState(false);
  const [speachModal, setSpechModal] = useState(false);
  const [visibleVoiceCommand, setVisibleVoiceCommand] = useState(true);
  const [transScriptSearch, setTransScriptSearch] = useState(transcript);
  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [handleShowReceipt, setHandleShowReceipt] = useState(false);
  const [handleShowQR, setHandleShowQR] = useState(false);
  const [handleOpenWhatsapp, setHandleOpenWhatsapp] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [balanceDue, setBalanceDue] = useState(total_price);
  const [QR, setQR] = useState(null);
  // console.log("PAYMENT METHOD", paymentMethod);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
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
      setCartData(cart_data);
    }
  }, [cartData]);

  // Payment
  const [amount, setAmount] = useState(total_price);
  const [optionTick, setOptionTick] = useState([]);
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

  function removeElement(array, value) {
    // Find the index of the element to be removed
    let index = array.indexOf(value);

    // If the element is found, remove it from the array
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  // Payment

  // useEffect(() => {}, [handleDeleteCartItem]);

  // console.log("TRANSACRIPT", { transcript });
  // console.log(get_searched_data);

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
    // const { transcript, browserSupportsSpeechRecognition } =
    //   useSpeechRecognition();
    if (transcript) {
      optimizedVoicefn(transcript);
    }
  }, [transcript]);

  // const startListening = () =>
  //   SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  // const { transcript, browserSupportsSpeechRecognition } =
  //   useSpeechRecognition();

  useEffect(() => {
    if (get_searched_data && get_searched_data.data) {
      setSearchedData(get_searched_data.data);
    }
  }, [get_searched_data]);

  useEffect(() => {
    if (cart_data && cart_data.length > 0) {
      setCartData(cart_data);
    }
  }, [cart_data]);

  const handleSearch = (e) => {
    dispatch(handleSearchedDataRequest({ searchValue: e.target.value }));
  };

  const optimizedFn = useCallback(debounce(handleSearch), []);

  const handleVoiceCommand = () => {
    setVisibleVoiceCommand((state) => !state);
    SpeechRecognition.startListening({ language: "en-IN" });
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    let suum = 0;
    if (optionTick.length > 0) {
      optionTick.map((item) => {
        suum = suum + Number(item.amount);
      });
    }
    if (optionTick.length === 1) {
      const amount1 = optionTick[0].amount;
      const amount2 = Number(total_price) - Number(amount1);
      setAmount(amount2);
    } else if (optionTick.length === 2) {
      setAmount(0);
    }
    if (suum === 0) {
      setBalanceDue(total_price);
    } else {
      const t1 = Number(total_price) - Number(suum);
      setBalanceDue(t1);
    }
  }, [optionTick]);

  const handleToQR = () => {
    if (balanceDue == 0) {
      setHandleShowReceipt(true);
    } else if (balanceDue == 0) {
      setHandleShowReceipt(true);
    } else {
      alert("PAY DUE AMOUNT");
    }
  };

  const handleWhatsSubmit = (event) => {
    event.preventDefault();
    // alert("Form Sumbited!");
  };

  return (
    <div className="app">
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "",
          height: "100px",
          backgroundColor: "#fff",
          marginBottom: "80px",
        }}
      >
        <div
          style={{
            height: "100px",
            backgroundColor: "#ffd700",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
            justifyContent: "space-between",
          }}
        >
          <div
            className=""
            style={{
              height: "50px",
              width: "100%",
            }}
          >
            <img src={Logo} style={{ height: "50px", width: "40%" }} />
          </div>
        </div>
        <div className="mt-3 d-flex align-items-center justify-content-center">
          <IoIosSearch size={30} opacity={0.4} />

          {visibleVoiceCommand ? (
            <input
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
            />
          ) : (
            <input
              style={{ border: "1px solid yellowgreen", outline: "none" }}
              type="text"
              value={transcript}
              autoFocus
              onChange={(e) => {
                optimizedFn(e);
                // console.log(e.target.value);
                setSearchValue(e.target.value);
              }}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Search for items..."
            />
            // <div style={{ width: "100%" }}>{transcript}</div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
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
      <div
        style={{ paddingLeft: "20px", paddingRight: "20px", overflowY: "auto" }}
      >
        <h5 className="my-4 h4" style={{ fontWeight: "bold" }}>
          Recommended Items
        </h5>

        {searchedData.map((item, index) => (
          <Product item={item} key={index} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#ffd700",
          bottom: 0,
          width: "100%",
          borderRadius: "10px",
        }}
      >
        {cart_data && cart_data.length > 0 ? (
          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              height: "90px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontWeight: "lighter",
                color: "#fff",
                position: "relative",
              }}
            >
              <BsHandbag color="#000" fontSize={35} />
              <h6
                style={{
                  fontSize: "12px",
                  position: "absolute",
                  color: "black",
                  right: "15px",
                  top: "16px",
                }}
              >
                {cartData.length}
              </h6>
            </div>
            <h2
              style={{
                fontWeight: "400",
                color: "#000",
                textDecoration: "none",
                fontSize: "24px",
              }}
              onClick={() => setShow(true)}
            >
              View Cart <BsArrowRight />
            </h2>
          </div>
        ) : (
          <div></div>
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
            ({cartData.length} items)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartData?.map((item) => (
            <div
              // className="cart_container"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
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
                  <Select
                    styles={{
                      menu: (baseStyles, state) => ({
                        ...baseStyles,
                        // height: "50px",
                        overflow: "auto",
                        fontWeight: "900",
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        height: "50px",
                        fontWeight: "900",
                        overflow: "auto",
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        // height: "50px",
                        fontWeight: "900",
                        // overflow: "auto",
                      }),
                    }}
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="1"
                  />
                </div>
                <div style={{ flex: 1, marginLeft: "20px" }}>
                  <h4>₹{item.price}</h4>
                </div>
              </div>
              <p
                style={{ color: "#a90a0a", fontWeight: "600" }}
                onClick={() => dispatch(handleDeleteCartItem(item))}
              >
                Remove
              </p>
            </div>
          ))}
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
              setPaymentModal((state) => !state);
            }}
            style={{
              backgroundColor: "#20b9e3",
              outline: "none",
              border: "none",
              fontSize: "20px",
            }}
            // className="bg-primary"
          >
            Proceed to checkout
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
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
                    Total Invoice Value: {total_price}
                  </div>
                  <div className="mt-2">
                    <input
                      type="number"
                      className="input-style"
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                      disabled={optionTick.length > 0}
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
                            if (
                              optionTick.filter((io) => io.name === item.value)
                                .length > 0
                            ) {
                              const t1 = JSON.parse(JSON.stringify(optionTick));
                              setOptionTick(
                                t1.filter((io) => io.name !== item.value)
                              );
                            } else {
                              if (optionTick.length <= 1) {
                                setOptionTick([
                                  ...optionTick,
                                  {
                                    name: item.value,
                                    amount: amount,
                                    label: item.name,
                                  },
                                ]);
                              }
                            }
                          }}
                          className={`option-item ${
                            optionTick.filter((io) => io.name === item.value)
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
                          <div>
                            {item.label} - {item.amount}
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
                    // total_price >= 0
                    //   ? setHandleShowReceipt(true)
                    //   : alert("Pay DUE AMount");
                    handleToQR();
                    // balanceDue >= 0
                    //   ? setHandleShowReceipt(true)
                    //   : alert("Pay DUE AMOUNT");
                    // dispatch(handleQRImageRequest("Hello"));
                    // setHandleShowReceipt(true);
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
                    fileUrl={defaultPdfFile}
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
                  src={qrData}
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
            onClick={() => setHandleShowReceipt(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* QR */}
      {/* <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={handleShowQR}
      >
        <Modal.Header>
          <Modal.Title>Your Receipt! </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{}}>
          <div style={{ height: "200px", width: "100%" }}>
            <img
              src={qrData}
              alt=""
              style={{ height: "100%", width: "100%" }}
            />
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
            onClick={() => setHandleShowQR(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
      {/* WhatsApp */}{" "}
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
