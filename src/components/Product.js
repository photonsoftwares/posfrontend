import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import God from "../assets/god.jpeg";
import noImg1 from "../assets/noImg1.png";
import noImg2 from "../assets/noImg2.png";
import {
  handleAddCartData,
  handleAddCartDataRequest,
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch, useSelector } from "react-redux";
import { BASE_Url } from "../URL";
import { Button } from "react-bootstrap";

const Product = ({ item, setSearchValue }) => {
  const { cart_data } = useSelector((e) => e.ComponentPropsManagement);
  const [showButton, setShowButton] = useState(true);
  // const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  // console.log("PRODUCT CART DATA", item);

  // console.log("USER DATA", userData.userId);
  return (
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
          <p style={{ fontWeight: "400" }}>₹ {item.price}</p>
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
  );
};

export default Product;
