import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

import ComponentPropsManagement, {
  handleSearchedDataRequest,
  handleAddtoCart,
  handleInc,
} from "../redux/actions-reducers/ComponentProps/ComponentPropsManagement";
import { useDispatch, useSelector } from "react-redux";
const Product = ({ item }) => {
  const { cart_data } = useSelector((e) => e.ComponentPropsManagement);
  console.log("CART DATA", cart_data);
  const [showButton, setShowButton] = useState(true);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p className="h6" style={{ fontWeight: "bold" }}>
          {item.productName}
        </p>
        <p style={{ fontWeight: "400" }}>₹ {item.price}</p>
      </div>
      <div>
        {/* <div>
          <img
            src="https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt=""
            style={{
              width: "150px",
              height: "90px",
            }}
          />
        </div> */}

        <button
          style={{ width: "100%" }}
          className="btn btn-outline-danger my-4"
          onClick={() => {
            dispatch(handleAddtoCart(item));
            setShowButton(false);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
