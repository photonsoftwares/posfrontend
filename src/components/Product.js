import React, { useState, useEffect } from "react";

import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
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
import PaginationComponent from "../PaginationComponent";

const Product = ({
  setSearchValue,
  data,
  setData,
  setUpdatecart,
  updatecart,
}) => {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
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
    console.log("this is element from product.js", el)
  }, []);


  // useEffect(() => {

  // });

  // console.log("USER DATA", userData.userId);
  return (
    <>
      {" "}
      <h5
        // className="my-3"
        style={{
          fontWeight: "bold",
          padding: 0,
          margin: 0,
          // display: searchValue?.length ? "none" : "block",s
        }}
        onClick={() => { console.log("this is producte page 🤷‍♀️🤷‍♀️🤷‍♀️") }}
      >
        Recommended Items
      </h5>
      <div
        style={{
          // display: "flex",
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          placeItems: "center",
          // alignItems: "center",
          // justifyContent: "center",
          // flexDirection: "row",
          // flexWrap: "wrap",
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
            <div
              style={{
                height: "200px",
                width: "100%",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
                objectFit: "cover",
                backgroundPosition: "center",
              }}
            >
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundPosition: "center",
                }}
                className="cardCategory"
                src={`${BASE_Url}/item/get-image/${item && item.item_id}`}
                // class="card-img-top"
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
                            // aria-label="toggle password visibility"
                            onClick={() => {
                              toast.success("Item Added");
                              item.price = item.new_price;
                              setData([...data]);
                              const el = JSON.parse(localStorage.getItem("my-cart"));
                              if (el) {
                                if (el?.length > 0) {
                                  let flag = 0;
                                  el.map((el1) => {
                                    console.log("this is el1", el1)
                                    if (
                                      el1.productId === item.productId &&
                                      el1.item_name === item.item_name
                                    ) {
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
                                        const c = localStorage.setItem(
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
                              // window.location.reload();
                            }

                              // console.log("this is new pice",item.new_price)


                            }
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
                          console.log("this is value of inpute", val)
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
                  <p style={{ fontWeight: "400" }}>
                    <span>{saasId !== 15 ? "₹" : "रु."}</span>
                    <span style={{ marginLeft: 10 }}>{item.price}</span>
                  </p>
                </>
              )}
              {/* <a href="#" class="btn btn-sm btn-warning">
                Add to Cart
              </a> */}
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  // justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    display:
                      item.price === 0 || item.price === 0 ? "none" : "block",
                  }}
                  onClick={() => {
                    toast.success("Item Added");
                    const el = JSON.parse(localStorage.getItem("my-cart"));
                    if (el) {
                      console.log("cart me kuch toh pada hai", el)
                      if (el?.length > 0) {
                        let flag = 0;
                        el.map((el1) => {
                          console.log("this add to cart 😘😘😘😘😘😘", el1)
                          if (
                            el1.productId === item.productId &&
                            el1.item_name === item.item_name
                          ) {
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
                              const c = localStorage.setItem(
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
                      console.log("this item 🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️", item)
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
                    // window.location.reload();
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
        ))}
      </div>
      {/* <PaginationComponent /> */}
    </>
  );
};

export default Product;
