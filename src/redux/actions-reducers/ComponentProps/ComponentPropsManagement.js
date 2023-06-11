import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

const initialComponentPropsManagementState = {
  load: false,
  get_searched_data: [],

  get_QR_img: "",
  cart_data: [],
  login_data: {},
  total_quantity: 0,
  total_price: 0,
};

export const ComponentPropsManagement = createSlice({
  name: "ComponentPropsManagement",
  initialState: initialComponentPropsManagementState,
  reducers: {
    // Login User
    handleLoginRequest: (state, payload) => {
      state.load = true;
    },
    handleLoginResponse: (state, payload) => {
      state.login_data = payload.data;
      // window.location.replace("/");
      state.load = false;
    },
    handleGetUserData: (state, payload) => {
      state.login_data = JSON.parse(payload.payload);
    },
    // Get Searched Data!
    handleSearchedDataRequest: (state, payload) => {
      // console.log("SEARCH PRO DATA", payload);
      state.load = true;
    },
    handleSearchedDataResponse: (state, payload) => {
      // console.log("SEARCH PRO DATA", payload);
      state.get_searched_data = payload;
      state.load = false;
    },
    // Add to Cart Data!
    handleAddCartDataRequest: (state, payload) => {
      // console.log("PAYLOAD", payload);
      state.load = true;
    },
    handleAddCartData: (state, payload) => {
      // console.log("ADD ITEM PAYLOAD", payload.payload);
      const tempCart = state.cart_data;

      // tempCart.map((el) => console.log("EL", el));
      // console.log("tempCart", tempCart);
      let find = state.cart_data.findIndex(
        (item) => item.productId === payload.payload.productId
      );
      if (find >= 0) {
        state.cart_data[find].quantity = 1;
      } else {
        state.cart_data = [...state.cart_data, payload.payload];
      }
      // state.cart_data = [...state.cart_data, payload.payload];
      // state.load = false;
    },
    // delete Data!

    handleDeleteCartItem: (state, payload) => {
      state.cart_data = state.cart_data.filter(
        (el) => el.productId !== payload.payload.productId
      );

      // console.log("state.cart_data", state.cart_data);
      state.load = false;
    },

    // GET QR IMAGE
    handleQRImageRequest: (state, payload) => {
      // console.log("QR IMAGE RESPONSE", payload);
      // state.load = true;
    },
    handleQRImageResponse: (state, payload) => {
      // console.log("QR IMAGE RESPONSE", payload);
      state.get_QR_img = payload.data;
      // window.location.replace("/");
      state.load = false;
    },
    // GET PDF
    handlePdfRequest: (state, payload) => {
      // console.log("QR IMAGE RESPONSE", payload);
      // state.load = true;
    },
    handlePdfResponse: (state, payload) => {
      // console.log("QR IMAGE RESPONSE", payload);
      // state.get_QR_img = payload.data;
      // window.location.replace("/");
      state.load = false;
    },

    handleCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.cart_data.reduce(
        (cartTotal, cartItem) => {
          // console.log("carttotal", cartTotal);
          // console.log("cartitem", cartItem);
          const { price, quantity } = cartItem;
          // console.log(price, quantity);
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          // totalQuantity: 0,
        }
      );
      state.total_price = parseInt(totalPrice.toFixed(2));
      // state.total_quantity = totalQuantity;
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  handleLoginRequest,
  handleGetUserData,
  handleSearchedDataRequest,
  handleCartTotal,
  handleAddCartData,
  handleDeleteCartItem,
  handleAddtoCart,
  handleInc,
  handlePdfRequest,
  handleQRImageRequest,
  getCartTotal,
} = ComponentPropsManagement.actions;

export default ComponentPropsManagement.reducer;
