import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

const initialComponentPropsManagementState = {
  load: false,
  get_searched_data: [],
  cart_data: [],
  login_data: "",
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
      state.load = false;
    },
    handleGetUserData: (state, payload) => {
      state.login_data = JSON.parse(payload.payload);
    },
    // Get Searched Data!
    handleSearchedDataRequest: (state, payload) => {
      // console.log("PAYLOAD", payload);
      state.load = true;
    },
    handleSearchedDataResponse: (state, payload) => {
      state.get_searched_data = payload;
      state.load = false;
    },
    handleAddtoCart: (state, payload) => {
      console.log("CART PAYLOAD", payload.payload.productId);
      // state.cart_data.push(payload.payload);
      state.cart_data = [...state.cart_data, payload.payload];

      // if (state.cart_data.includes(payload.payload.productId)) {
      // }
      // const exist = state.cart_data.find(
      //   (x) => x.productId === payload.payload.productId
      // );
      console.log("-_-_", state.cart_data);
    },

    handleInc: (state, payload) => {
      // console.log("INC PAYLOAD", payload);
      // const total = 0;
      // state.cart_data.push(payload.payload);
      // state.total_price = [...state.cart_data, payload.payload];
      // state.total_price = state.cart_data.map((i) => console.log("I", i));
      //
      // const find = state.cart_data.findIndex(
      //   (item) => item.id === payload.productId
      // );
      // if (find > 0) {
      //   state.cart_data[find].quantity += 1;
      // } else {
      //   const tempVar = { payload, quantity: 1 };
      //   state.cart_data.push(tempVar);
      // }
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  handleLoginRequest,
  handleGetUserData,
  handleSearchedDataRequest,
  handleAddtoCart,
  handleInc,
} = ComponentPropsManagement.actions;

export default ComponentPropsManagement.reducer;
