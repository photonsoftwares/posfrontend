import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import God from "../assets/god.jpeg";
import noImg1 from "../assets/noImg1.png";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import noImg2 from "../assets/noImg2.png";
import { BsCreditCardFill, BsFillCheckCircleFill } from "react-icons/bs";
import {
  handleAddCartData,
  handleAddCartDataRequest,
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch, useSelector } from "react-redux";
import { BASE_Url } from "../URL";
import { Button } from "react-bootstrap";

const Product = ({ setSearchValue, data, setData }) => {
  const { cart_data } = useSelector((e) => e.ComponentPropsManagement);
  const [myPrice, setMyPrice] = useState(0)
  const [showButton, setShowButton] = useState(true);
  // const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  // console.log("PRODUCT CART DATA", item);

  // console.log("USER DATA", userData.userId);
  return (<>
    {data.map((item, index) => {
      return (<>

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
          <div style={{ height: "62px", width: "100px", marginRight: "20px" }}>
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
              {Number(item.price) === 0 ? (<>
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
                        item.price = myPrice;
                        setData([...data])
                      }
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          // aria-label="toggle password visibility"
                          onClick={() => {
                            item.price = myPrice;
                            setData([...data])
                          }}
                          edge="end"
                        >
                          <BsFillCheckCircleFill
                            color={
                              myPrice === "" ||
                                myPrice === 0
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
                        setMyPrice(Number(val))
                      } else {
                        setMyPrice(val)
                      }
                    }}
                    value={myPrice}
                  />
                </FormControl>
              </>) : (<>
                <p style={{ fontWeight: "400" }}>₹ {item.price}</p>
              </>)}
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                size="sm"
                variant="warning"
                style={{ width: "100%", fontSize: "10px" }}
                // className="btn btn-outline-primary"
                onClick={() => {
                  dispatch(handleAddCartData(item));
                  setShowButton(false);
                  setSearchValue("");
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </>)
    })}
  </>);
};

export default Product;
