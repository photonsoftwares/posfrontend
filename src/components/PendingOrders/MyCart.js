import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, FormGroup, Row } from "reactstrap";
import { Modal } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { BsHandbag, BsArrowRight } from "react-icons/bs";
import { FcSpeaker } from "react-icons/fc";
import { IoCashOutline } from "react-icons/io5";
import { BsArrowLeft } from "react-icons/bs";
import { SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import FormControl from "@mui/material/FormControl";
import { BsFillCheckCircleFill } from "react-icons/bs";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { SiPhonepe } from "react-icons/si";
import { SiContactlesspayment } from "react-icons/si";
import { BsCreditCardFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { confirmAlert } from "react-confirm-alert"; // Import
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PaymentModal from "./PaymentModal";

const obj = [
  {
    "item_name": "Item 1",
    "item_qty": 2,
    "item_price": 20.00,
    "order_id": 4692,
    "order_date": "2023-07-12",
    "zero_price": "",
    "new_price": "",
    "item_id": "item001",
    "saas_id": "saas123",
    "store_id": "store456",
    "bill_qty": 2,
    "bill_price": 20.00,
    "discount": "",
    "discount_value": "",
    "amount_value": "",
    "discount_menu_is_open": false,
    "bill_tax": 2.00,
    "bill_net": 40.00,
    "bill_amount": 42.00,
    "status": "Pending"
  },
  {
    "order_id": 4692,
    "order_date": "2023-07-12",
    "item_id": "item003",
    "saas_id": "saas123",
    "zero_price": "",
    "new_price": "",
    "discount": "",
    "discount_value": "",
    "amount_value": "",
    "discount_menu_is_open": false,
    "store_id": "store456",
    "item_name": "Item 2",
    "item_qty": 3,
    "item_price": 15.00,
    "bill_qty": 3,
    "bill_price": 15.00,
    "bill_tax": 1.50,
    "bill_net": 45.00,
    "bill_amount": 46.50,
    "status": "Pending"
  }
]

const MyCart = ({
  show,
  setShow,
}) => {
  const { show_cart_modal } = useSelector((e) => e.ComponentPropsManagement);
  const dispatch = useDispatch();
  const [invoiceValue, setInvoiceValue] = useState(0)
  const [sumValue, setSumValue] = useState(0)
  const [popoverIsOpen, setPopoverIsOpen] = useState(false)

  const [discountPercentVal, setDiscountPercentVal] = useState("");
  const [discountAmountVal, setDiscountAmountVal] = useState("");
  const [totalDiscountVal, setTotalDiscountVal] = useState(0);
  const [cartData, setCartData] = useState([])
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false)
  const [balanceDue, setBalanceDue] = useState(0);
  const [amount, setAmount] = useState("");
  const [optionTickSum, setOptionTickSum] = useState(0);
  const [optionTick, setOptionTick] = useState([]);

  useEffect(() => {
    obj.map(item => {
      item["discount_menu_is_open"] = false;
      item["discount_value"] = "";
      item["amount_value"] = "";
      item["discount"] = 0;
      item["new_price"] = Number(item.item_price) * Number(item.item_qty);
      item["zero_price"] = Number(item.item_price) * Number(item.item_qty);
    })
    setCartData(obj)
  }, [obj])


  useEffect(() => {
    setInvoiceValue(parseFloat(sumValue).toFixed(2));
  }, [sumValue, totalDiscountVal]);

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
    let sum = 0;
    if (optionTick && optionTick?.length > 0) {
      optionTick.map((item) => {
        sum = sum + Number(item.amount);
      });
    } else {
      sum = 0;
    }
    setOptionTickSum(sum);
  }, [optionTick]);

  useEffect(() => {
    if (cartData.length > 0) {
      const t1 = []
      cartData.map(item => {
        const r1 = Number(item.new_price)
        t1.push(parseFloat(r1).toFixed(2))
      })
      let sum = 0
      t1.map(item => {
        sum = sum + Number(item)
      })
      setSumValue(sum)
      setAmount(sum);
    } else {
      setInvoiceValue(0)
      setSumValue(0)
      setDiscountPercentVal("")
      setDiscountAmountVal("")
      setTotalDiscountVal(0)
    }
  }, [cartData])


  const handleDiscount = (item, discount_value) => {
    const price = Number(item.item_price) * Number(item.item_qty);
    const calculatedVal = (price * discount_value) / 100;
    const t1 = price - calculatedVal;
    item.discount = parseFloat(calculatedVal).toFixed(2);
    item.new_price = t1;
    setCartData([...cartData]);
  };

  useEffect(() => {
    const handleWindowClose = (event) => {
      event.preventDefault();
      // Custom message to display in the confirmation dialog

      const confirmationMessage =
        "Please complete the transaction, we can see you have some items in your cart if you leave or exit data will be deleted!!";
      event.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
      return confirmationMessage; // Gecko, WebKit, Chrome <34
    };

    window.addEventListener("beforeunload", handleWindowClose);

    const disableBackButton = (event) => {
      event.preventDefault();
      window.history.forward(); // Navigates forward to the next page
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", disableBackButton);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      window.removeEventListener("popstate", disableBackButton);
    };
  }, []);

  const handleDiscountLarge = (discount_value) => {
    cartData.map((item) => {
      item.discount_value = discount_value;
      const price = Number(item.item_price) * Number(item.item_qty);
      if (price !== 0) {
        const val = (sumValue * discount_value) / 100;
        const calculatedVal = (price * val) / sumValue;
        item.discount = parseFloat(calculatedVal).toFixed(2);
        item.new_price = price - calculatedVal;
      }
    });
    setCartData([...cartData]);
  };

  const handleDiscountAmountLarge = (discountAmountVal) => {
    cartData.map((item) => {
      item.amount_value = discountAmountVal;
      const price = Number(item.item_price) * Number(item.item_qty);
      if (price !== 0) {
        const calculatedVal = (price * discountAmountVal) / sumValue;
        item.discount = parseFloat(calculatedVal).toFixed(2);
        item.new_price = price - calculatedVal;
      }
    });
    setCartData([...cartData]);
  };

  const handleDec = (item) => {
    if (item.item_qty === 1) {
      item.item_qty = item.item_qty = 1;
      item.new_price = item.item_price;
    } else {
      const q = item.item_qty - 1;
      item.item_qty = q;
      item.new_price = item.item_price * q;
    }
    cartData.map((item) => {
      item.discount_value = "";
      item.amount_value = "";
      item.new_price = item.item_price * item.item_qty;
    });
    setDiscountPercentVal("");
    setDiscountAmountVal("");
    setTotalDiscountVal(0);
    setCartData([...cartData]);
  };

  const handleDiscountAmount = (item, amount_value) => {
    const price = Number(item.item_price) * Number(item.item_qty);
    const calculatedVal = price - amount_value;
    item.discount = parseFloat(amount_value).toFixed(2);
    item.new_price = calculatedVal;
    setCartData([...cartData]);
  };

  const confirmBack = () => {
    if (cartData?.length > 0) {
      confirmAlert({
        title: "Are you sure to exit",
        message: "Are you sure to do this.",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              setShow(!show)
            },
          },
          {
            label: "No",
            onClick: () => { },
          },
        ],
      });
    } else {
      setShow(!show)
    }
  };

  const handleDeleteCartItem = (item) => {
    const updateCart = cartData.filter(
      (el) => el.item_id !== item.item_id
    );
    setCartData(updateCart);
  }

  const handleApplyClick = () => {
    if (discountPercentVal) {
      handleDiscountLarge(discountPercentVal);
      const val1 = (sumValue * discountPercentVal) / 100;

      setTotalDiscountVal(parseFloat(val1).toFixed(2));
    } else if (discountAmountVal) {
      handleDiscountAmountLarge(discountAmountVal);
      setTotalDiscountVal(parseFloat(discountAmountVal).toFixed(2));
    } else {
      setTotalDiscountVal(0);
      handleDiscountAmountLarge(0);
    }
  };

  const handlePlusSign = (item) => {
    const q = item.item_qty + 1;
    item.item_qty = q;
    const newP = item.item_price * q;
    item.new_price = newP;

    cartData.map((item) => {
      item.discount_value = "";
      item.amount_value = "";
      item.new_price = item.item_price * item.item_qty;
    });
    setDiscountPercentVal("");
    setDiscountAmountVal("");
    setTotalDiscountVal(0);
    setCartData([...cartData]);
  };

  return (<>
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <span style={{ fontWeight: "900", marginRight: "10px" }}>
            <BsArrowLeft
              style={{ cursor: "pointer", marginRight: "5px" }}
              onClick={() => {
                confirmBack();
              }}
            />{" "}
            My Basket
          </span>
          ({cartData?.length} items)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartData?.map((item) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid #e7e7e7",
              marginBottom: "10px",
            }}
          >
            <h1>{item.item_name}</h1>
            <div className="cart_product">
              <div style={{ height: "50px" }} className="cart_column">
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
                    }}
                  />

                  {item.item_qty}
                  <AiOutlinePlus
                    onClick={() => {
                      handlePlusSign(item);
                    }}
                  />
                </div>
              </div>
              <div style={{ flex: 1, marginLeft: "20px" }}>
                {Number(item.item_price) * Number(item.item_qty) === 0 ? (
                  <>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    >
                      <InputLabel>Amount</InputLabel>
                      <OutlinedInput
                        type="number"
                        size="small"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            item.item_price = item.zero_price;
                            item.new_price = item.zero_price;
                            setCartData([...cartData]);
                          }
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                item.item_price = item.zero_price;
                                item.new_price = item.zero_price;
                                setCartData([...cartData]);
                              }}
                              edge="end"
                            >
                              <BsFillCheckCircleFill
                                color={
                                  item.zero_price === "" ||
                                    item.zero_price === 0
                                    ? "#979797"
                                    : "green"
                                }
                              />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Amount"
                        className="w-50"
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val) {
                            item.zero_price = Number(val);
                            setCartData([...cartData]);
                          } else {
                            item.zero_price = "";
                            setCartData([...cartData]);
                          }
                        }}
                        value={item.zero_price}
                      />
                    </FormControl>
                  </>
                ) : (
                  <>
                    <div>{item.item_price * item.item_qty}</div>
                    <div>
                      <div
                        style={{
                          fontSize: "10px",
                          marginRight: "30px",
                        }}
                      >
                        {item.discount_value || item.amount_value ? (
                          <>
                            <span
                              style={{ textDecorationLine: "line-through" }}
                            >
                              {item.item_price * item.item_qty}
                            </span>{" "}
                            / {parseFloat(item.new_price).toFixed(2)}
                          </>
                        ) : (
                          <>{/* // <>{item.item_price * item.item_qty}</> */}</>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {item.discount_menu_is_open === true && (
              <>
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
                      disabled={item.amount_value}
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
                          handleDiscount(item, 0);
                        }

                        setDiscountPercentVal("");
                        setDiscountAmountVal("");
                        setTotalDiscountVal(0);
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
                          handleDiscountAmount(item, 0);
                        }

                        setDiscountPercentVal("");
                        setDiscountAmountVal("");
                        setTotalDiscountVal(0);
                      }}
                      value={item.amount_value}
                    />
                    <div>
                      <button
                        className="btn btn-danger my-3"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div style={{ display: "flex", flexDirection: "row" }}>
              <p
                style={{
                  color: "#a90a0a",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleDeleteCartItem(item);
                }}
              >
                Remove
              </p>
              {totalDiscountVal === 0 && (
                <>
                  <p
                    style={{
                      color: "darkblue",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      item.discount_menu_is_open = !item.discount_menu_is_open;
                      item.amount_value = "";
                      item.discount_value = "";
                      item.new_price = item.item_price * item.item_qty;
                      setDiscountPercentVal("");
                      setDiscountAmountVal("");
                      setTotalDiscountVal(0);
                      setCartData([...cartData]);
                    }}
                    className="mx-4"
                  >
                    Discount
                  </p>
                </>
              )}
            </div>
          </div>
        ))}

        {/* <div> */}
        {parseInt(invoiceValue) !== 0 && (
          <>
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
          </>
        )}
        {cartData?.filter((io) => io.discount_menu_is_open === true)?.length ===
          0 &&
          totalDiscountVal !== 0 && (
            <>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Total Discount: {totalDiscountVal}
              </div>
            </>
          )}
        {cartData?.filter((io) => io.discount_menu_is_open === true)?.length ===
          0 && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
                id="pop112"
              >
                {parseInt(invoiceValue) !== 0 && (
                  <>
                    <button
                      type="button"
                      style={{
                        backgroundColor: "rgb(169, 10, 10)",
                        border: "none",
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        padding: "6px 20px",
                        borderRadius: "10px",
                      }}
                      id="pop112"

                      onClick={() => {
                        setCartData([])

                      }}
                    >
                      Remove All Cart Items
                    </button>

                    <button
                      type="button"
                      style={{
                        backgroundColor: "green",
                        border: "none",
                        color: "white",
                        marginBottom: "10px",
                        fontWeight: "bold",
                        padding: "6px 20px",
                        borderRadius: "10px",
                      }}
                      id="pop112"
                      onClick={() => setPopoverIsOpen(!popoverIsOpen)}
                    >
                      Invoice Discount
                    </button>
                  </>
                )}
              </div>
            </>
          )}

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
                      cartData.map((item) => {
                        item.discount_value = "";
                        item.amount_value = "";
                      });
                      setCartData([...cartData]);
                      handleApplyClick();
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
            if (cartData?.length > 0) {
              if (cartData.filter((io) => io.item_price === 0)?.length === 0) {
                setPaymentModalIsOpen(true);
              } else {
                toast.error("Item amount should not be zero");
              }
            } else {
              setPaymentModalIsOpen(false);
            }
          }}
          style={{
            backgroundColor: "#20b9e3",
            outline: "none",
            border: "none",
            fontSize: "20px",
          }}
        >
          {cartData && cartData?.length > 0
            ? "Proceed to checkout"
            : "No Item here"}
        </Button>
      </Modal.Footer>
    </Modal>

    <PaymentModal
      setPaymentModalIsOpen={setPaymentModalIsOpen}
      paymentModalIsOpen={paymentModalIsOpen}
      invoiceValue={invoiceValue}
      sumValue={sumValue}
      amount={amount}
      setAmount={setAmount}
      setBalanceDue={setBalanceDue}
      balanceDue={balanceDue}
      optionTickSum={optionTickSum}
      setOptionTickSum={setOptionTickSum}
      setOptionTick={setOptionTick}
      optionTick={optionTick}
      cartData={cartData}
      setCartData={setCartData}
    />
  </>);
};

export default MyCart;
