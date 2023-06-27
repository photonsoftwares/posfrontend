import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";

const initialComponentPropsManagementState = {
  load: false,
  get_searched_data: [],
  get_QR_img: "",
  cart_data: [],
  login_data: {},
  register_data: {},
  total_quantity: 0,
  total_price: 0,
  handle_saveTransaction_data: {},
  get_recommended_items: [],
  handle_pdf_bill: "",
  handle_tax_rate: "",
  get_register_user: {},
  handle_add_party: {},
  handle_party_name_data: {},
  handle_add_item_search: [],
  handle_hsn_codes: [],
  handle_link_user_data: {},
  save_product_id: "",
  open_menu: false,
  // qr_file_name: "",
  // pdf_file_name: "",
};

export const ComponentPropsManagement = createSlice({
  name: "ComponentPropsManagement",
  initialState: initialComponentPropsManagementState,
  reducers: {
    // Login User
    handleLoginRequest: (state, payload) => {
      console.log("SEARCH PAYLOAD", payload);
      state.load = true;
    },

    handleLoginResponse: (state, payload) => {
      console.log("SEARCH PAYLOAD", payload);
      state.login_data = payload.data;
      // window.location.replace("/");
      state.load = false;
    },

    // Handle Open Menu
    handleOpneMenuRequest: (state, payload) => {
      // console.log("OPEN MENU PAYLOAD", payload.payload);
      state.open_menu = payload.payload;
    },
    // Register
    handleRegisterRequest: (state, payload) => {
      console.log("SEARCH PAYLOAD", payload);
      state.load = true;
    },
    handleRegisterResponse: (state, payload) => {
      console.log("SEARCH PAYLOAD", payload);
      // state.login_data = payload.data;
      // window.location.replace("/");
      state.load = false;
    },
    handleGetUserData: (state, payload) => {
      state.login_data = JSON.parse(payload.payload);
    },
    // Get Searched Data!
    handleSearchedDataRequest: (state, payload) => {
      // const history = useHistory();
      console.log("SEARCH PRO DATA", payload);
      // history.push("/add-item");
      state.load = true;
    },
    handleSearchedDataResponse: (state, payload) => {
      console.log("SEARCH PRO DATA RESPONSE", payload);
      state.get_searched_data = payload;
      state.load = false;
    },
    // Add to Cart Data!
    handleAddCartDataRequest: (state, payload) => {
      console.log("SEARCH PRO DATA REQUEST", payload);
      console.log("PAYLOAD", payload);
      state.load = true;
    },
    handleAddCartData: (state, payload) => {
      // console.log("ADD ITEM PAYLOAD", payload.payload);
      // const tempCart = state.cart_data;

      let find = state.cart_data.findIndex(
        (item) => item.productId === payload.payload.productId
      );
      if (find >= 0) {
        state.cart_data[find].quantity = 1;
      } else {
        state.cart_data = [...state.cart_data, payload.payload];
      }
    },
    // delete Data!
    handleDeleteCartItem: (state, payload) => {
      state.cart_data = state.cart_data.filter(
        (el) => el.productId !== payload.payload.productId
      );
      // console.log("state.cart_data", state.cart_data);
      state.load = false;
    },
    // Discount!
    handleDiscountItem: (state, payload) => {
      const item = state.cart_data.filter(
        (el) => el.productId == payload.payload.productId
      );
      console.log("DISCOUNT ITEM", item);
      state.load = false;
    },
    handleEmptyCartItem: (state, payload) => {
      console.log("EMPTY", payload);
      state.cart_data = [];
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

    // SAVE TRANSACTION
    handleSaveTransactionRequest: (state, payload) => {
      // console.log("SAVE TRANSACTION REQUEST", payload);
      // state.load = true;
    },
    handleSavaTransactionResponse: (state, payload) => {
      // console.log("SAVE TRANSACTION RESPONSE", payload);
      state.handle_saveTransaction_data = payload.data;
      // localStorage.setItem(JSON.stringify(state.handle_saveTransaction_data));
      // window.location.replace("/");
      // state.load = false;
    },

    // Recommanded
    handleRecommendedDataRequest: (state, payload) => {
      // console.log("RECOMENDED REQUEST", payload);
      state.load = true;
    },
    handleRecommendedDataResponse: (state, payload) => {
      // console.log("RECOMENDED RESPONSE", payload);
      state.get_recommended_items = payload;
      state.load = false;
    },
    // Register User
    handleRegisterUserRequest: (state, payload) => {
      console.log("REGISTER REQUEST", payload);
      state.load = true;
    },
    handleRegisterUserResponse: (state, payload) => {
      console.log("Register RESPONSE", payload);
      // state.get_recommended_items = payload;
      // state.load = false;
    },
    // Add Item to Store
    handleAddItemToStoreRequest: (state, payload) => {
      console.log("ADD ITEM REQUEST", payload);
      state.load = true;
    },
    handleAddItemToStoreResponse: (state, payload) => {
      console.log("ADD ITEM RESPONSE", payload);
      state.save_product_id = payload.data;
    },
    // Handle Tax Rates
    handleTaxRatesRequest: (state, payload) => {
      // console.log("ADD ITEM REQUEST", payload);
      state.load = true;
    },
    handleTaxRatesResponse: (state, payload) => {
      // console.log("TAX RATES RESPONSE", payload);
      state.handle_tax_rate = payload.data;
    },
    // Handle ADD PATY
    handleAddPartyRequest: (state, payload) => {
      console.log("TAX RATES REQUEST", payload);
      state.load = true;
    },
    handleAddPartyResponse: (state, payload) => {
      console.log("TAX RATES RESPONSE", payload);
      // state.handle_tax_rate = payload.data;
    },
    // Add Purchase
    handleAddPurchaseRequest: (state, payload) => {
      console.log("TAX RATES REQUEST", payload);
      state.load = true;
    },
    handleAddPurchaseResponse: (state, payload) => {
      console.log("TAX RATES RESPONSE", payload);
      // state.handle_tax_rate = payload.data;
    },
    // Add Purchase
    handlePartyNameDataRequest: (state, payload) => {
      console.log("TAX RATES REQUEST", payload);
      state.load = true;
    },
    handlePartyNameDataResponse: (state, payload) => {
      console.log("TAX RATES RESPONSE", payload);
      state.handle_party_name_data = payload.data;
    },
    // Add Purchase
    handleAddItemSearchRequest: (state, payload) => {
      console.log("ADD ITEM SEARCH REQUEST", payload);
      state.load = true;
    },
    handleAddItemSearchResponse: (state, payload) => {
      console.log("ADD ITEM SEARCH RESPONSE", payload);
      state.handle_add_item_search = payload.data;
    },
    // Create Row in Tax Master
    handleCreateRowTaxMasterRequest: (state, payload) => {
      console.log("ADD ITEM SEARCH REQUEST", payload);
      state.load = true;
    },
    handleCreateRowTaxMasterResponse: (state, payload) => {
      console.log("ADD ITEM SEARCH RESPONSE", payload);
      // state.handle_add_item_search = payload.data;
    },
    // Create GET HSN CODES
    handleHSNCODERequest: (state, payload) => {
      console.log("ADD ITEM SEARCH REQUEST", payload);
      state.load = true;
    },
    handlehandleHSNCODEResponse: (state, payload) => {
      console.log("ADD ITEM SEARCH RESPONSE", payload);
      state.handle_hsn_codes = payload.data;
    },
    handleUploadPicRequest: (state, payload) => {
      console.log("ADD ITEM SEARCH REQUEST", payload);
      state.load = true;
    },
    handleUploadPicResponse: (state, payload) => {
      console.log("UPLOAD IMAGE RES", payload);
      // state.handle_hsn_codes = payload.data;
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  handleUploadPicRequest,
  handleLoginRequest,
  handleOpneMenuRequest,
  handleRegisterRequest,
  handleHSNCODERequest,
  handleCreateRowTaxMasterRequest,
  handleAddItemSearchRequest,
  handlePartyNameDataRequest,
  handleAddPurchaseRequest,
  handleAddPartyRequest,
  handleGetUserData,
  handleTaxRatesRequest,
  handleAddItemToStoreRequest,
  handleRegisterUserRequest,
  handleSearchedDataRequest,
  handleCartTotal,
  handleSaveTransactionRequest,
  handleAddCartData,
  handleDeleteCartItem,
  handleRecommendedDataRequest,
  handleDiscountItem,
  handleAddtoCart,
  handleInc,
  handleEmptyCartItem,
  // handlePdfRequest,
  handleQRImageRequest,
  getCartTotal,
} = ComponentPropsManagement.actions;

export default ComponentPropsManagement.reducer;
