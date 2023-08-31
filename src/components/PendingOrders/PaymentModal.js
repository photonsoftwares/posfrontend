import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { BsHandbag, BsArrowRight } from "react-icons/bs";
import { FcSalesPerformance, FcSms, FcSpeaker } from "react-icons/fc";
import { IoCashOutline } from "react-icons/io5";
import { SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { SiContactlesspayment } from "react-icons/si";
import { BsCreditCardFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import pdfFile from "../../assets/PDF.pdf";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import Product from "../components/Product";
import {
  handleSearchedDataRequest,
  handleSaveTransactionRequest,
  handleRecommendedDataRequest,
  handleAccruvalRequest,
  handleShowModal,
  handleItemsDataRequest,
  handleEmailNotificationResponse,
  updateInvoicedRequest,
  handlewhatsAppRequest,
} from "../../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { Button } from "react-bootstrap";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { toast } from "react-toastify";
import { BASE_Url } from "../../URL";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { HiCreditCard } from "react-icons/hi2";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";

const PaymentModal = (props) => {
  const {
    setPaymentModalIsOpen,
    paymentModalIsOpen,
    invoiceValue,
    sumValue,
    amount,
    setAmount,
    setBalanceDue,
    balanceDue,
    optionTickSum,
    setOptionTickSum,
    setOptionTick,
    optionTick,
    cartData,
    setCartData,
  } = props;
  const userData = JSON.parse(localStorage.getItem("User_data"));
  console.log(" CARTDATA PAYMENT", cartData);
  const [loyaltyAmount, setLoyaltyAmount] = useState(10000);
  const [handleShowReceipt, setHandleShowReceipt] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [defaultPdfFile] = useState(pdfFile);
  const [emailOpen, setEmailOpen] = useState(false);
  const [WhatsAppOpen, setWhatsAppOpen] = useState(false);
  const [smsOpen, setSmsOpen] = useState(false);
  const [whatsApp, setWhatsApp] = useState("");
  const [paymentModal, setPaymentModal] = useState(false);
  const {
    get_searched_data,
    // cart_data,
    get_QR_img,
    total_price,
    handle_saveTransaction_data,
    get_recommended_items,
    show_cart_modal,
  } = useSelector((e) => e.ComponentPropsManagement);
  const handleToQR = () => {
    if (balanceDue === 0) {
      setHandleShowReceipt(true);
    } else {
      toast.error("Pay Due Amount!");
    }
  };

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
      value: "credit_sale",
    },
    {
      id: 8,
      name: "Loyalty",
      icon: <RiMoneyDollarCircleFill color="#F1C40F" size={25} />,
      value: "loyalty",
    },
  ];

  const handleTenderAmount = () => {
    if (optionTick?.length > 0) {
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

  const handleWhatsApp = (e) => {
    e.preventDefault();
    console.log("handleWhatsApp", e);
    // if (whatsApp) {
    dispatch(
      handlewhatsAppRequest({
        to: whatsApp,
        url:
          handle_saveTransaction_data &&
          handle_saveTransaction_data.pdf_file_name,
      })
    );
    setWhatsApp("");
    // }
    setEmail("");
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={paymentModalIsOpen}
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
                      // disabled={optionTick?.length > 0}
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
                              if (item.value !== "loyalty") {
                                if (optionTick?.length === 0) {
                                  const obj = { ...item, amount };
                                  setOptionTick([...optionTick, obj]);
                                } else if (optionTick?.length > 0) {
                                  if (
                                    optionTick.filter(
                                      (io) => io.value === item.value
                                    )?.length > 0
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
                              }
                              if (item.value === "loyalty") {
                                let newLoyaltyAmount = loyaltyAmount;
                                if (loyaltyAmount > amount) {
                                  newLoyaltyAmount = amount;
                                }
                                if (optionTick?.length === 0) {
                                  const obj = {
                                    ...item,
                                    amount: newLoyaltyAmount,
                                  };
                                  setOptionTick([...optionTick, obj]);
                                } else if (optionTick?.length > 0) {
                                  if (
                                    optionTick.filter(
                                      (io) => io.value === item.value
                                    )?.length > 0
                                  ) {
                                    setOptionTick(
                                      optionTick.filter(
                                        (io) => io.value !== item.value
                                      )
                                    );
                                  } else {
                                    if (Number(optionTickSum) <= sumValue) {
                                      const obj = {
                                        ...item,
                                        amount: newLoyaltyAmount,
                                      };
                                      setOptionTick([...optionTick, obj]);
                                    }
                                  }
                                }
                                // const r1 = amount - loyaltyAmount
                                // setAmount(r1)
                              }
                            }}
                            className={`option-item ${
                              optionTick.filter((io) => io.name === item.value)
                                ?.length > 0 && ""
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
                  {optionTick && optionTick?.length > 0 && (
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
                    dispatch(
                      updateInvoicedRequest({
                        order_id: props.orderNumber,
                        status: "Invoiced",
                      })
                    );
                  }}
                >
                  Receipts
                </button>
                <Button
                  onClick={() => setPaymentModalIsOpen(false)}
                  style={{
                    backgroundColor: "#20b9e3",
                    fontSize: "20px",
                    marginLeft: "20px",
                    padding: "10px 20px",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

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
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                // style={{ flex: 1 }}
                >
                  <Button
                    variant="outline-success"
                    size="lg"
                    // onClick={() => setHandleOpenWhatsapp(true)}
                    onClick={() => {
                      setWhatsAppOpen((state) => !state);
                      setSmsOpen(false);
                      setEmailOpen(false);
                    }}
                  >
                    WhatsApp <IoLogoWhatsapp size={25} />
                  </Button>
                </div>
                <div
                //  style={{ flex: 1 }}
                >
                  <Button
                    variant="outline-success"
                    size="lg"
                    // onClick={() => setHandleOpenWhatsapp(true)}
                    onClick={() => {
                      setEmailOpen((state) => !state);
                      setWhatsAppOpen(false);
                      setSmsOpen(false);
                    }}
                  >
                    Email <AiOutlineMail size={25} />
                  </Button>
                </div>
                <div
                // style={{ flex: 1 }}
                >
                  <Button
                    variant="outline-success"
                    size="lg"
                    onClick={() => {
                      setSmsOpen((state) => !state);
                      setEmailOpen(false);
                      setWhatsAppOpen(false);
                    }}
                  >
                    SMS <FcSms size={25} />
                  </Button>
                </div>
              </div>
              {emailOpen ? (
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
              ) : (
                ""
              )}
              {WhatsAppOpen ? (
                <form
                  onSubmit={handleWhatsApp}
                  className="d-flex flex-row align-items-center"
                  style={{ width: "50%" }}
                >
                  <TextField
                    type="number"
                    className="form-control my-2"
                    id="customer-name"
                    required
                    onWheel={(e) => e.target.blur()}
                    size="small"
                    label="WhatsApp"
                    value={whatsApp}
                    onChange={(e) => setWhatsApp(e.target.value)}
                  />
                  <div className="mx-2">
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </div>
                </form>
              ) : (
                ""
              )}
              {smsOpen ? (
                <form
                  onSubmit={() => {}}
                  className="d-flex flex-row align-items-center"
                  style={{ width: "50%" }}
                >
                  <TextField
                    type="email"
                    className="form-control my-2"
                    id="customer-name"
                    required
                    size="small"
                    label="SMS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="mx-2">
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </div>
                </form>
              ) : (
                ""
              )}
              <Button
                //  variant="secondary"
                style={{
                  backgroundColor: "#20b9e3",
                  outline: "none",
                  border: "none",
                  fontSize: "20px",
                  marginTop: "10px",
                }}
                onClick={() => {
                  localStorage.removeItem("my-cart");

                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }}
              >
                Close
              </Button>
              <div
                style={{
                  // height: "100px",
                  // width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // marginTop: "20px",
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
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button
            //  variant="secondary"
            style={{
              backgroundColor: "#20b9e3",
              outline: "none",
              border: "none",
              fontSize: "20px",
            }}
            onClick={() => {
              localStorage.removeItem("my-cart");

              setTimeout(() => {
                window.location.reload();
              }, 500);
            }}
          >
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentModal;
