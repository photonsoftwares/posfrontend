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
  email_notification: "",
  user_data: localStorage.getItem("User_data")
    ? JSON.parse(localStorage.getItem("User_data"))
    : null,
  sales_overview_data: null,
  last_week_sales: 0,
  last_month_sales: 0,
  number_of_customer: 0,
  low_stock_items: 0,
  quantity_in_hand: 0,
  today_sales: 0,
  last_fourteen_days: 0,
  last_sixty_days: 0,
  yesterday_sales: 0,

  state_dropdown: [
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Bihar", value: "Bihar" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jammu and Kashmir", value: "Jammu and Kashmir" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Meghalaya", value: "Meghalaya" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Tripura", value: "Tripura" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "West Bengal", value: "West Bengal" },
  ],
  gst_type_dropdown: [],
  hsn_code_dropdown: [],

  sales_dashboard_chart_data: null,
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
      state.load = false;
      window.location.replace("/");
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

    handleUploadItemRequest: (state, payload) => {},
    handleUploadItemResponse: (state, payload) => {
      // state.flag = !state.flag
    },
    handleUploadInventoryRequest: (state, payload) => {},
    handleUploadInventoryResponse: (state, payload) => {
      // state.flag = !state.flag
    },
    handleSalesOverviewRequest: (state, payload) => {},
    handleSalesOverviewResponse: (state, payload) => {
      const data = payload?.data?.data;
      state.sales_overview_data = data;
      // state.flag = !state.flag
    },
    handleLastWeekSalesRequest: (state, payload) => {},
    handleLastWeekSalesResponse: (state, payload) => {
      const data = payload?.data?.data;
      state.last_week_sales = data ? data : 0;
    },

    handleLastMonthSalesRequest: (state, payload) => {},
    handleLastMonthSalesResponse: (state, payload) => {
      const data = payload?.data?.data;
      state.last_month_sales = data ? data : 0;
    },
    handleTodaySalesRequest: (state, payload) => {
      // state.add_temple_modal_close_flag = true
    },
    handleTodaySalesResponse: (state, payload) => {
      state.today_sales = payload.data.data ? payload.data.data : 0;
    },
    handleNumberOfCustomerRequest: (state, payload) => {},
    handleNumberOfCustomerResponse: (state, payload) => {
      state.number_of_customer = payload.data.data ? payload.data.data : 0;
    },
    handleLowStockItemsRequest: (state, payload) => {},
    handleLowStockItemsResponse: (state, payload) => {
      state.low_stock_items = payload.data.data ? payload.data.data : 0;
    },
    handleQuantityInHandRequest: (state, payload) => {},
    handleQuantityInHandResponse: (state, payload) => {
      state.quantity_in_hand = payload.data.data ? payload.data.data : 0;
    },
    handleLastFourteenDaysSalesRequest: (state, payload) => {},
    handleLastFourteenDaysSalesResponse: (state, payload) => {
      state.last_fourteen_days = payload.data.data ? payload.data.data : 0;
    },
    handleLastSixtyDaysSalesRequest: (state, payload) => {},
    handleLastSixtyDaysSalesResponse: (state, payload) => {
      state.last_sixty_days = payload.data.data ? payload.data.data : 0;
    },
    handleYesterdaySalesRequest: (state, payload) => {},
    handleYesterdaySalesResponse: (state, payload) => {
      state.yesterday_sales = payload.data.data ? payload.data.data : 0;
    },
    handleGstTypeDropdownRequest: (state, payload) => {},
    handleGstTypeDropdownResponse: (state, payload) => {
      state.gst_type_dropdown = payload.data;
    },
    handleGetHsnCodeDropdownRequest: (state, payload) => {},
    handleGetHsnCodeDropdownResponse: (state, payload) => {
      state.hsn_code_dropdown = payload.data;
    },
    handleEmailNotificationRequest: (state, payload) => {
      console.log(payload.payload);
    },
    handleEmailNotificationResponse: (state, payload) => {
      console.log(payload);
      // state.email_notification = payload.data;
    },
    handleSalesDashboardChartRequest: (state, payload) => {
      // state.hsn_code_dropdown = payload.data
    },
    handleSalesDashboardChartResponse: (state, payload) => {
      state.sales_dashboard_chart_data = payload.data.last_six_month_sales;
      // console.log("rrsc", payload.data.last_six_month_sales)
    },
    handleCreateTaxMasterRequest: (state, payload) => {
      // state.hsn_code_dropdown = payload.data
    },
    handleCreateTaxMasterResponse: (state, payload) => {
      console.log("dds", payload.data);
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  handleUploadPicRequest,
  handleEmailNotificationResponse,
  handleEmailNotificationRequest,
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
  handleUploadItemRequest,
  handleUploadInventoryRequest,
  handleSalesOverviewRequest,
  handleLastWeekSalesRequest,
  handleLastMonthSalesRequest,
  handleTodaySalesRequest,
  handleNumberOfCustomerRequest,
  handleLowStockItemsRequest,
  handleQuantityInHandRequest,
  handleLastFourteenDaysSalesRequest,
  handleLastSixtyDaysSalesRequest,
  handleYesterdaySalesRequest,
  handleGstTypeDropdownRequest,
  handleGetHsnCodeDropdownRequest,
  handleSalesDashboardChartRequest,
  handleCreateTaxMasterRequest,
} = ComponentPropsManagement.actions;

export default ComponentPropsManagement.reducer;
