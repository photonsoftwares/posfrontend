import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import God from "../assets/god.jpeg";
import noImg1 from "../assets/noImg1.png";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import noImg2 from "../assets/noImg2.png";
import { BsCreditCardFill, BsFillCheckCircleFill } from "react-icons/bs";
import {
  handleAddCartData,
  handleAddCartDataRequest,
  handlecartCount,
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch, useSelector } from "react-redux";
import { BASE_Url } from "../URL";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Product = ({
  setSearchValue,
  data,
  setData,
  cartData,
  setCartData,
  setUpdatecart,
  updatecart,
}) => {
  const { cart_data } = useSelector((e) => e.ComponentPropsManagement);
  const [myPrice, setMyPrice] = useState({ productId: "", price: "" });
  const [showButton, setShowButton] = useState(true);
  // const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  // console.log("PRODUCT CART DATA", item);

  useEffect(() => {
    const el = JSON.parse(localStorage.getItem("my-cart"));
    if (el) {
      dispatch(handlecartCount(el?.length));
    } else {
      dispatch(handlecartCount(0));
    }
  }, []);

  // console.log("USER DATA", userData.userId);
  return (
    <>
      <div
        style={{
          // display: "flex",
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          placeItems: "center",
        }}
      >
        {data.map((item) => (
          <div
            class="card"
            style={{
              width: "10rem",
              margin: "5px",
              display: "flex",
            }}
          >
            <div style={{ height: "100px", width: "100%" }}>
              <img
                style={{ height: "100%", width: "100%" }}
                src={`${BASE_Url}/item/get-image/${item && item.imageName}`}
                class="card-img-top"
                alt="..."
              />
            </div>
            <div class="card-body">
              <h5 class="card-title">{item.item_name}</h5>
              {Number(item.price) === 0 ? (
                <>
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel>Amount</InputLabel>
                    <OutlinedInput
                      type="number"
                      size="small"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          item.price = item.new_price;
                          setData([...data]);
                        }
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              item.price = item.new_price;
                              setData([...data]);
                            }}
                            edge="end"
                          >
                            <BsFillCheckCircleFill
                              color={
                                item.new_price === "" || item.new_price === 0
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
                          setMyPrice({
                            productId: item.productId,
                            price: Number(val),
                          });
                          item.new_price = Number(val);
                          // setMyPrice(Number(val))
                        } else {
                          item.new_price = "";
                          setMyPrice({
                            productId: item.productId,
                            price: val,
                          });
                          // setMyPrice(val)
                        }
                        // setData([...data])
                      }}
                      value={
                        item.productId === myPrice.productId
                          ? myPrice.price
                          : ""
                      }
                    />
                  </FormControl>
                </>
              ) : (
                <>
                  <p style={{ fontWeight: "400" }}>₹ {item.price}</p>
                </>
              )}

              <div
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display:
                      item.price === 0 || item.price === 0 ? "none" : "block",
                  }}
                  onClick={() => {
                    console.log("ITEM", item);
                    const el = JSON.parse(localStorage.getItem("my-cart"));
                    if (el) {
                      if (el?.length > 0) {
                        let flag = 0;
                        el.map((el1) => {
                          if (el1.productId === item.productId) {
                            if (el1.price === item.price) {
                              el1.productQty = el1.productQty + 1;
                              flag = 1;
                              console.log(el1.productQty)
                            } else {
                              item["discount_menu_is_open"] = false;
                              item["discount_value"] = "";
                              item["amount_value"] = "";
                              item["new_price"] =
                                Number(item.price) * Number(item.productQty);
                              item["zero_price"] =
                                Number(item.price) * Number(item.productQty);
                              localStorage.setItem(
                                "my-cart",
                                JSON.stringify([...el, item])
                              );
                            }
                          }
                        });
                        el.map((item) => {
                          item["discount_menu_is_open"] = false;
                          item["discount_value"] = "";
                          item["amount_value"] = "";
                          item["new_price"] =
                            Number(item.price) * Number(item.productQty);
                          item["zero_price"] =
                            Number(item.price) * Number(item.productQty);
                        });
                        localStorage.setItem("my-cart", JSON.stringify(el));
                        if (flag === 0) {
                          item["discount_menu_is_open"] = false;
                          item["discount_value"] = "";
                          item["amount_value"] = "";
                          item["new_price"] =
                            Number(item.price) * Number(item.productQty);
                          item["zero_price"] =
                            Number(item.price) * Number(item.productQty);
                          localStorage.setItem(
                            "my-cart",
                            JSON.stringify([...el, item])
                          );
                        }
                        dispatch(handlecartCount([...el, item]?.length));
                      } else {
                        item["discount_menu_is_open"] = false;
                        item["discount_value"] = "";
                        item["amount_value"] = "";
                        item["new_price"] =
                          Number(item.price) * Number(item.productQty);
                        item["zero_price"] =
                          Number(item.price) * Number(item.productQty);
                        localStorage.setItem("my-cart", JSON.stringify([item]));
                        dispatch(handlecartCount(1));
                      }
                    } else {
                      item["discount_menu_is_open"] = false;
                      item["discount_value"] = "";
                      item["amount_value"] = "";
                      item["new_price"] =
                        Number(item.price) * Number(item.productQty);
                      item["zero_price"] =
                        Number(item.price) * Number(item.productQty);
                      localStorage.setItem("my-cart", JSON.stringify([item]));
                      dispatch(handlecartCount(1));
                    }

                    setUpdatecart(!updatecart);
                    setSearchValue("");
                  }}
                >
                  <Button
                    size="sm"
                    variant={`warning`}
                    style={{
                      width: "100%",
                      fontSize: "10px",
                      display: item.price === 0 ? "hidden" : "block",
                    }}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ---------------- */}
      {/* /* {data.map((item, index) => { */}
      {data.map((item, index) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginBottom: "20px",
              }}
              key={item.productId}
            >
              <div
                style={{ height: "62px", width: "100px", marginRight: "20px" }}
              >
                <img
                  src={`${BASE_Url}/item/get-image/${item && item.imageName}`}
                  // src={`${BASE_Url}/item/get-item/${item.productId}`}
                  // src={`${item.imgName == null ? noImg1 : item.imgName}`}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    height: "80px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p className="h6" style={{ fontWeight: "bold" }}>
                    {item.itemName}
                  </p>
                  {Number(item.price) === 0 ? (
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
                              item.price = item.new_price;
                              setData([...data]);
                            }
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                // aria-label="toggle password visibility"
                                onClick={() => {
                                  item.price = item.new_price;
                                  setData([...data]);
                                }}
                                edge="end"
                              >
                                <BsFillCheckCircleFill
                                  color={
                                    item.new_price === "" ||
                                    item.new_price === 0
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
                              setMyPrice({
                                productId: item.productId,
                                price: Number(val),
                              });
                              item.new_price = Number(val);
                              // setMyPrice(Number(val))
                            } else {
                              item.new_price = "";
                              setMyPrice({
                                productId: item.productId,
                                price: val,
                              });
                              // setMyPrice(val)
                            }
                            // setData([...data])
                          }}
                          value={
                            item.productId === myPrice.productId
                              ? myPrice.price
                              : ""
                          }
                        />
                      </FormControl>
                    </>
                  ) : (
                    <>
                      <p style={{ fontWeight: "400" }}>₹ {item.price}</p>
                    </>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      display:
                        item.price === 0 || item.price === 0 ? "none" : "block",
                    }}
                    onClick={() => {
                      const el = JSON.parse(localStorage.getItem("my-cart"));
                      if (el) {
                        if (el?.length > 0) {
                          let flag = 0;
                          el.map((el1) => {
                            if (el1.productId === item.productId) {
                              if (el1.price === item.price) {
                                el1.productQty = el1.productQty + 1;
                                flag = 1;
                              } else {
                                item["discount_menu_is_open"] = false;
                                item["discount_value"] = "";
                                item["amount_value"] = "";
                                item["new_price"] =
                                  Number(item.price) * Number(item.productQty);
                                item["zero_price"] =
                                  Number(item.price) * Number(item.productQty);
                                localStorage.setItem(
                                  "my-cart",
                                  JSON.stringify([...el, item])
                                );
                              }
                            }
                          });
                          el.map((item) => {
                            item["discount_menu_is_open"] = false;
                            item["discount_value"] = "";
                            item["amount_value"] = "";
                            item["new_price"] =
                              Number(item.price) * Number(item.productQty);
                            item["zero_price"] =
                              Number(item.price) * Number(item.productQty);
                          });
                          localStorage.setItem("my-cart", JSON.stringify(el));
                          if (flag === 0) {
                            item["discount_menu_is_open"] = false;
                            item["discount_value"] = "";
                            item["amount_value"] = "";
                            item["new_price"] =
                              Number(item.price) * Number(item.productQty);
                            item["zero_price"] =
                              Number(item.price) * Number(item.productQty);
                            localStorage.setItem(
                              "my-cart",
                              JSON.stringify([...el, item])
                            );
                          }
                          dispatch(handlecartCount([...el, item]?.length));
                        } else {
                          item["discount_menu_is_open"] = false;
                          item["discount_value"] = "";
                          item["amount_value"] = "";
                          item["new_price"] =
                            Number(item.price) * Number(item.productQty);
                          item["zero_price"] =
                            Number(item.price) * Number(item.productQty);
                          localStorage.setItem(
                            "my-cart",
                            JSON.stringify([item])
                          );
                          dispatch(handlecartCount(1));
                        }
                      } else {
                        item["discount_menu_is_open"] = false;
                        item["discount_value"] = "";
                        item["amount_value"] = "";
                        item["new_price"] =
                          Number(item.price) * Number(item.productQty);
                        item["zero_price"] =
                          Number(item.price) * Number(item.productQty);
                        localStorage.setItem("my-cart", JSON.stringify([item]));
                        dispatch(handlecartCount(1));
                      }

                      setUpdatecart(!updatecart);
                      setSearchValue("");
                    }}
                  >
                    <Button
                      size="sm"
                      // variant={`${item.price === 0 ? "secondary" : "warning"}`}
                      variant={`warning`}
                      style={{
                        width: "100%",
                        fontSize: "10px",
                        display: item.price === 0 ? "hidden" : "block",
                      }}
                    >
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Product;
