import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";

const initialComponentPropsManagementState = {
  load: false,
  product_count: 0,
  get_searched_data: [],
  get_QR_img: "",
  show_cart_modal: false,
  cart_data: [],
  login_data: {},
  handel_redeem_point: {},
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
  save_transaction_data: {},
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
  handle_user_dropdown: [],
  last_sixty_days: 0,
  yesterday_sales: 0,
  tender_report_data: [],
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
  sales_report_table_data: [],
  gst_report_table_data: [],
  gst_report_item_table_data: [],
  link_loyalty_detail: {},
  no_of_items: 0,
  pending_order_data: [],
  expense_category_dropdown: [],
  uom_list_data: [],
  update_price_item_name_dropdown: [],
  pending_order_cart_data: [],
  bahikhata_party_name_dropdown: []
};

export const ComponentPropsManagement = createSlice({
  name: "ComponentPropsManagement",
  initialState: initialComponentPropsManagementState,
  reducers: {
    // Login User
    handleLoginRequest: (state, payload) => {
      state.load = true;
    },
    handleBahikhataCreateRequest: (state, payload) => {
    },
    handleBahikhataPartyDropdownRequest: (state, payload) => {
    },
    handleBahikhataPartyDropdownResponse: (state, payload) => {
      state.bahikhata_party_name_dropdown = payload.data;
    },
    handleBahikhataCreateResponse: (state, payload) => {
    },
    handleLoginResponse: (state, payload) => {
      state.login_data = payload.data;
      state.load = false;
      window.location.replace("/");
    },

    // Handle Open Menu
    handleOpneMenuRequest: (state, payload) => {
      state.open_menu = payload.payload;
    },
    // Register
    handleRegisterRequest: (state, payload) => {
      state.load = true;
    },
    handleRegisterResponse: (state, payload) => {
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
      // history.push("/add-item");
      state.load = true;
    },
    handleSearchedDataResponse: (state, payload) => {
      state.get_searched_data = payload;
      state.item_master_list = payload;
      state.load = false;
    },
    // Add to Cart Data!
    handleAddCartDataRequest: (state, payload) => {
      state.load = true;
    },
    handleAddCartData: (state, payload) => {
      // const tempCart = state.cart_data;

      // let find = state.cart_data.findIndex(
      //   (item) => item.productId === payload.payload.productId
      // );

      const a1 = state.cart_data.filter(
        (io) => io.productId === payload.payload.productId
      );
      if (a1 && a1?.length > 0) {
        state.cart_data.map((item) => {
          if (item.productId === payload.payload.productId) {
            item.productQty = Number(item.productQty) + 1;
          }
        });
      } else {
        state.cart_data = [...state.cart_data, payload.payload];
        state.product_count = state.cart_data?.length;
        localStorage.setItem("my-cart", JSON.stringify(state.cart_data));
      }

      // if (find >= 0) {
      //   state.cart_data[find].quantity = 1;
      // } else {
      // }
    },
    // delete Data!

    handleDeleteCartItem: (state, payload) => {
      const updateCart = (state.cart_data = state.cart_data.filter(
        (el) => el.productId !== payload.payload.productId
      ));
      localStorage.setItem("my-cart", JSON.stringify(updateCart));

      state.product_count = state.cart_data?.length - 1;

      state.load = false;
    },
    // Discount!
    handleDiscountItem: (state, payload) => {
      const item = state.cart_data.filter(
        (el) => el.productId == payload.payload.productId
      );
      state.load = false;
    },
    handleEmptyCartItem: (state, payload) => {
      state.cart_data = [];
    },
    // MANAGE CART ITEM NUMBER
    handlecartCount: (state, payload) => {
      // console.log("COUNT PAYLOD", payload.payload);

      state.product_count = payload.payload;
    },

    // GET QR IMAGE
    handleQRImageRequest: (state, payload) => {
      // state.load = true;
    },
    handleQRImageResponse: (state, payload) => {
      state.get_QR_img = payload.data;
      // window.location.replace("/");
      state.load = false;
    },

    // SAVE TRANSACTION
    handleSaveTransactionRequest: (state, payload) => {
      // state.load = true;
    },
    handleSavaTransactionResponse: (state, payload) => {
      state.handle_saveTransaction_data = payload.data;
      // localStorage.setItem(JSON.stringify(state.handle_saveTransaction_data));
      // window.location.replace("/");
      // state.load = false;
    },

    // Recommanded
    handleRecommendedDataRequest: (state, payload) => {
      state.load = true;
    },
    handleRecommendedDataResponse: (state, payload) => {
      state.get_recommended_items = payload;
      state.load = false;
    },
    // Register User
    handleRegisterUserRequest: (state, payload) => {
      state.load = true;
    },
    handleRegisterUserResponse: (state, payload) => {
      // state.get_recommended_items = payload;
      // state.load = false;
    },
    // Add Item to Store
    handleAddItemToStoreRequest: (state, payload) => {
      state.load = true;
    },
    handleAddItemToStoreResponse: (state, payload) => {
      state.save_product_id = payload.data;
    },
    handleUpdateItemToStoreRequest: (state, payload) => {
      // state.load = true;
    },
    // Handle Tax Rates
    handleTaxRatesRequest: (state, payload) => {
      state.load = true;
    },
    handleTaxRatesResponse: (state, payload) => {
      state.handle_tax_rate = payload.data;
    },
    // Handle ADD PATY
    handleAddPartyRequest: (state, payload) => {
      state.load = true;
    },
    handleAddPartyResponse: (state, payload) => {
      // state.handle_tax_rate = payload.data;
    },
    // Add Purchase
    handleAddPurchaseRequest: (state, payload) => {
      state.load = true;
    },
    handleAddPurchaseResponse: (state, payload) => {
      // state.handle_tax_rate = payload.data;
    },
    // Add Purchase
    handlePartyNameDataRequest: (state, payload) => {
      state.load = true;
    },
    handlePartyNameDataResponse: (state, payload) => {
      state.handle_party_name_data = payload.data;
    },
    // Add Purchase
    handleAddItemSearchRequest: (state, payload) => {
      state.load = true;
    },
    handleAddItemSearchResponse: (state, payload) => {
      state.handle_add_item_search = payload.data;
    },
    // Create Row in Tax Master
    handleCreateRowTaxMasterRequest: (state, payload) => {
      state.load = true;
    },
    handleCreateRowTaxMasterResponse: (state, payload) => {
      // state.handle_add_item_search = payload.data;
    },
    // Create GET HSN CODES
    handleHSNCODERequest: (state, payload) => {
      state.load = true;
    },
    handlehandleHSNCODEResponse: (state, payload) => {
      state.handle_hsn_codes = payload.data;
    },
    handleUploadPicRequest: (state, payload) => {
      state.load = true;
    },
    handleUploadPicResponse: (state, payload) => {
      // state.handle_hsn_codes = payload.data;
    },

    handleUploadItemRequest: (state, payload) => { },
    handleUploadItemResponse: (state, payload) => {
      // state.flag = !state.flag
    },
    handleUploadInventoryRequest: (state, payload) => { },
    handleUploadInventoryResponse: (state, payload) => {
      // state.flag = !state.flag
    },
    handleSalesOverviewRequest: (state, payload) => { },
    handleSalesOverviewResponse: (state, payload) => {
      const data = payload?.data?.data;
      state.sales_overview_data = data;
      // state.flag = !state.flag
    },
    handleLastWeekSalesRequest: (state, payload) => { },
    handleLastWeekSalesResponse: (state, payload) => {
      const data = payload?.data?.data;
      state.last_week_sales = data ? data : 0;
    },

    handleLastMonthSalesRequest: (state, payload) => { },
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
    handleNumberOfCustomerRequest: (state, payload) => { },
    handleNumberOfCustomerResponse: (state, payload) => {
      state.number_of_customer = payload.data.data ? payload.data.data : 0;
    },
    handleLowStockItemsRequest: (state, payload) => { },
    handleLowStockItemsResponse: (state, payload) => {
      state.low_stock_items = payload.data.data ? payload.data.data : 0;
    },
    handleQuantityInHandRequest: (state, payload) => { },
    handleQuantityInHandResponse: (state, payload) => {
      state.quantity_in_hand = payload?.data?.data ? payload?.data?.data : 0;
    },
    handleLastFourteenDaysSalesRequest: (state, payload) => { },
    handleLastFourteenDaysSalesResponse: (state, payload) => {
      state.last_fourteen_days = payload.data.data ? payload.data.data : 0;
    },
    handleLastSixtyDaysSalesRequest: (state, payload) => { },
    handleLastSixtyDaysSalesResponse: (state, payload) => {
      state.last_sixty_days = payload.data.data ? payload.data.data : 0;
    },
    handleYesterdaySalesRequest: (state, payload) => { },
    handleYesterdaySalesResponse: (state, payload) => {
      state.yesterday_sales = payload.data.data ? payload.data.data : 0;
    },
    handleGstTypeDropdownRequest: (state, payload) => { },
    handleGstTypeDropdownResponse: (state, payload) => {
      state.gst_type_dropdown = payload.data;
    },
    handleGetHsnCodeDropdownRequest: (state, payload) => { },
    handleGetHsnCodeDropdownResponse: (state, payload) => {
      state.hsn_code_dropdown = payload.data;
    },
    handleEmailNotificationRequest: (state, payload) => { },
    handleEmailNotificationResponse: (state, payload) => {
      // state.email_notification = payload.data;
    },
    handleSalesDashboardChartRequest: (state, payload) => {
      // state.hsn_code_dropdown = payload.data
    },
    handleSalesDashboardChartResponse: (state, payload) => {
      state.sales_dashboard_chart_data = payload.data.last_six_month_sales;
    },
    handleCreateTaxMasterRequest: (state, payload) => {
      // state.hsn_code_dropdown = payload.data
    },
    handleCreateTaxMasterResponse: (state, payload) => { },
    handleLowStockItemListRequest: (state, payload) => {
      // state.hsn_code_dropdown = payload.data
    },
    handleLowStockItemListResponse: (state, payload) => {
      // state.hsn_code_dropdown = payload.data
    },
    // Member Enrollmemt
    handleMemberEnrollmentRequest: (state, payload) => {
      // state.hsn_code_dropdown = payload.data
    },
    handleMemberEnrollmentResponse: (state, payload) => { },
    // accruval Loyalty
    handleAccruvalRequest: (state, payload) => {
      // state.hsn_code_dropdown = payload.data
    },
    handleAccruvalResponse: (state, payload) => { },

    handleEmptyCartData: (state, payload) => {
      state.cart_data = [];
    },

    handleShowModal: (state, payload) => {
      state.show_cart_modal = payload.payload.bagModalIsOpne;
    },

    handleSalesReportRequest: (state, payload) => { },
    handleSalesReportResponse: (state, payload) => {
      state.sales_report_table_data = payload.data ? payload.data : [];
    },
    handleGstReportRequest: (state, payload) => { },
    handleGstReportResponse: (state, payload) => {
      state.gst_report_table_data = payload.data ? payload.data : [];
    },
    handleGstReportItemRequest: (state, payload) => { },
    handleGstReportItemResponse: (state, payload) => {
      state.gst_report_item_table_data = payload.data ? payload.data : [];
    },
    handleNoOfItemRequest: (state, payload) => { },
    handleNoOfItemResponse: (state, payload) => {
      state.no_of_items = payload?.data?.data ? payload?.data?.data : 0;
    },
    handleDebitNoteRequest: (state, payload) => { },
    handleDebitNoteResponse: (state, payload) => {
      state.no_of_items = payload?.data?.data ? payload?.data?.data : 0;
    },
    // Handle CREATE Delivery NOTE
    handleDeliveryNoteRequest: (state, payload) => { },
    handleDeliveryResponse: (state, payload) => {
      state.no_of_items = payload?.data?.data ? payload?.data?.data : 0;
    },
    // handleDelGetUserRequest
    handleDelGetUserRequest: (state, payload) => { },
    handleDelGetUserResponse: (state, payload) => {
      // console.log("_*_*", payload.data);
      state.handle_user_dropdown = payload.data;
    },

    handleItemMasterListRequest: (state, payload) => { },
    handleItemMasterListResponse: (state, payload) => {
      state.item_master_list = payload.data;
    },
    // HANDLE LINK LOYALTY
    handleLinkLoyaltyRequest: (state, payload) => {
      console.log("PAYLOAD LOYALTY REQ", payload);
    },
    handleLinkLoyaltyResponse: (state, payload) => {
      console.log("PAYLOAD LOYALTY RES", payload);
      state.link_loyalty_detail = payload.data;
    },

    handleSearchedDataRequest1: (state, payload) => { },
    handleSearchedDataResponse1: (state, payload) => {
      state.item_master_list = payload.data;
    },
    // Redeam Point
    handleRedeemPointRequest: (state, payload) => { },
    handleRedeemPointResponse: (state, payload) => {
      // state.item_master_list = payload.data;
    },

    handleTenderReportRequest: (state, payload) => { },
    handleTenderReportResponse: (state, payload) => {
      state.tender_report_data = payload.data ? [payload.data] : [];
    },

    handleSearchedDataRequest1: (state, payload) => { },
    handleSearchedDataResponse1: (state, payload) => {
      state.item_master_list = payload.data;
    },

    handleExpenseCategoryDropdownRequest: (state, payload) => { },
    handleExpenseCategoryDropdownResponse: (state, payload) => {
      state.expense_category_dropdown = payload.data;
    },
    handleUomListRequest: (state, payload) => { },
    handleUomListResponse: (state, payload) => {
      state.uom_list_data = payload.data
    },
    handleExpenseCreateRequest: (state, payload) => { },
    handleExpenseCreateResponse: (state, payload) => { },
    handleUpdateMoqRequest: (state, payload) => { },
    handleUpdateMoqResponse: (state, payload) => { },
    handleUpdatePriceRequest: (state, payload) => { },
    handleUpdatePriceResponse: (state, payload) => { },
    handleViewOrderPendingRequest: (state, payload) => {

    },
    handleViewOrderPendingResponse: (state, payload) => {
      state.pending_order_data = payload.data
    },
    pendingOrderCartDataRequest: (state, payload) => {

    },
    pendingOrderCartDataResponse: (state, payload) => {
      state.pending_order_cart_data = payload.data
    },

    // handleSearchedDataRequest2: (state, payload) => { },
    // handleSearchedDataResponse2: (state, payload) => {
    //   let arr = []
    //   if (payload.data) {
    //     if (payload.data.length > 0) {
    //       payload.data.map(item => {
    //         arr.push({ ...item, label: item.itemName, value: item.productId })
    //       })
    //     }
    //   }
    //   state.update_price_item_name_dropdown = arr
    // },

    // handleSearchedDataResponse1: (state, payload) => {
    //   state.item_master_list = payload.data
    // },
  },
});

// Action creators are generated for each case reducer function

export const {
  handleUploadPicRequest,
  handleRedeemPointRequest,
  handleLinkLoyaltyRequest,
  handleDeliveryNoteRequest,
  handleDelGetUserRequest,
  handleDebitNoteRequest,
  handlecartCount,
  handleExpenseCreateRequest,
  handleShowModal,
  handleAccruvalRequest,
  handleMemberEnrollmentResponse,
  handleUpdatePriceRequest,
  handleTenderReportRequest,
  handleEmailNotificationResponse,
  handleEmailNotificationRequest,
  handleLoginRequest,
  handleOpneMenuRequest,
  handleSearchedDataRequest1,
  handleMemberEnrollmentRequest,
  handleItemMasterListRequest,
  handleNoOfItemRequest,
  handleRegisterRequest,
  handleUpdateMoqRequest,
  handleHSNCODERequest,
  handleCreateRowTaxMasterRequest,
  handleAddItemSearchRequest,
  handlePartyNameDataRequest,
  handleExpenseCategoryDropdownRequest,
  handleAddPurchaseRequest,
  handleAddPartyRequest,
  handleUomListRequest,
  handleGetUserData,
  handleTaxRatesRequest,
  handleAddItemToStoreRequest,
  handleRegisterUserRequest,
  handleSearchedDataRequest,
  handleCartTotal,
  handleSaveTransactionRequest,
  handleViewOrderPendingRequest,
  handleAddCartData,
  handleDeleteCartItem,
  handleRecommendedDataRequest,
  handleDiscountItem,
  handleAddtoCart,
  handleInc,
  handleEmptyCartItem,
  handleEmptyCartData,
  handleSalesReportRequest,
  handleQRImageRequest,
  getCartTotal,
  handleUploadItemRequest,
  handleUploadInventoryRequest,
  handleSalesOverviewRequest,
  handleLastWeekSalesRequest,
  pendingOrderCartDataRequest,
  handleBahikhataPartyDropdownRequest,
  handleBahikhataCreateRequest,
  handleLastMonthSalesRequest,
  handleTodaySalesRequest,
  handleNumberOfCustomerRequest,
  handleGstReportRequest,
  handleLowStockItemsRequest,
  handleQuantityInHandRequest,
  handleLastFourteenDaysSalesRequest,
  handleLastSixtyDaysSalesRequest,
  handleGstReportItemRequest,
  handleYesterdaySalesRequest,
  handleGstTypeDropdownRequest,
  handleGetHsnCodeDropdownRequest,
  handleUpdateItemToStoreRequest,
  handleSalesDashboardChartRequest,
  handleCreateTaxMasterRequest,
  handleLowStockItemListRequest,
} = ComponentPropsManagement.actions;

export default ComponentPropsManagement.reducer;
