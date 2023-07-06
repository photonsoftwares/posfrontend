import { put, takeEvery, all, retry } from "redux-saga/effects";
import { BASE_Url, Email_Url, host } from "../URL";
import { toast } from "react-toastify";

import moment from "moment";
// import { useNavigate } from "react-router-dom";

const {
  createdAt,
  password,
  registerId,
  status,
  saasId,
  storeId,
  storeName,
  userId,
  userName,
} = localStorage.getItem("User_data")
  ? JSON.parse(localStorage.getItem("User_data"))
  : {};

// console.log("LOYALTY DATA", data.loyalty_id);
// console.log("SAAS DATA", saasId);

function* handleLoginRequest(e) {
  const response = yield fetch(`${BASE_Url}/auth/user-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("LOGIN DATA", jsonData);

  if (jsonData) {
    if (jsonData.status === true) {
      toast.success("Login Successfully");
      localStorage.setItem("Token", JSON.stringify(jsonData.data.jwt_response));
      localStorage.setItem(
        "Store_data",
        JSON.stringify(jsonData.data.store_data)
      );
      localStorage.setItem(
        "User_data",
        JSON.stringify(jsonData.data.user_data)
      );
      // window.location.href("/");
      yield put({
        type: "ComponentPropsManagement/handleLoginResponse",
        data: jsonData.data.user_data,
      });
    } else {
      toast.error("Please enter correct username and password");
      yield put({
        type: "ComponentPropsManagement/handleLoginResponse",
        data: {},
      });
    }
  }
}
// REGISTER USER
function* handleRegisterRequest(e) {
  const response = yield fetch(`${BASE_Url}/auth/user-registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("REGISTER JSON", jsonData);

  if (jsonData) {
    if (jsonData.status === true) {
      toast.success("Register User Successfully");
      localStorage.setItem(
        "login_data",
        JSON.stringify(jsonData.data.user_data)
      );
      localStorage.setItem("Token", JSON.stringify(jsonData.data.jwt_response));
      // window.location.href("/");
      yield put({
        type: "ComponentPropsManagement/handleLoginResponse",
        data: jsonData.data.user_data,
      });
    } else {
      toast.error("Please enter correct username and password");
      yield put({
        type: "ComponentPropsManagement/handleLoginResponse",
        data: {},
      });
    }
  }
}

function* handleSearchedDataRequest(e) {
  // const navigate = useNavigate();
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const { searchValue } = e.payload;
  console.log("SEARCH VALUE", e);
  const response = yield fetch(
    // `${BASE_Url}/search/get-result/Store1/AAAA/${searchValue}`,
    `${BASE_Url}/search/get-result/${storeId}/${saasId}/${searchValue}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();

  console.log("JSONDATA SEARCH", jsonData);
  if (jsonData.status === true) {
    if (jsonData.data && jsonData.data.length > 0) {
      // console.log("INSIDE", jsonData);
      const tempSearchArr = jsonData.data;
      tempSearchArr.map((el) => {
        el["productQty"] = 1;
        el["sku"] = "SKU";
        el["department"] = "Dept2";
        // el["discount"] = false;
      });
      // console.log("tempSearchArr", tempSearchArr);
      yield put({
        type: "ComponentPropsManagement/handleSearchedDataResponse",
        data: tempSearchArr,
      });
    }
  } else if (jsonData.status === false && jsonData.data == null) {
    // toast.error("NO ITEM FOUND, would you like to add this Item to Store.??");
    const confirm = window.confirm(
      "NO ITEM FOUND, would you like to add this Item to Store.??"
    );
    if (confirm) {
      // return <Navigation />;
      // navigate("/add-item");
      // history.push("/add-item");
      window.location.replace("/add-item");
    } else {
      // history.push("/");
      window.location.replace("/home");
      // navigate("/");
    }
    yield put({
      type: "ComponentPropsManagement/handleSearchedDataResponse",
      // data: tempSearchArr,
    });
  }
}

// HANDLE ADD ITEM SEARCH
function* handleAddItemSearchRequest(e) {
  // const navigate = useNavigate();

  const { searchValue } = e.payload;
  // console.log("SEARCH VALUE", e);
  const response = yield fetch(
    // `${BASE_Url}/search/get-result/Store1/AAAA/${searchValue}`,
    `${BASE_Url}/search/get-result/Store1/AAAA/${searchValue}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();

  console.log("JSONDATA ADD ITEM SEARCH", jsonData);
  if (jsonData) {
    if (jsonData) {
      if (jsonData.data) {
        yield put({
          type: "ComponentPropsManagement/handleAddItemSearchResponse",
          data: jsonData.data,
        });
      }
    } else {
      yield put({
        type: "ComponentPropsManagement/handleAddItemSearchResponse",
        data: [],
      });
    }
  }
}

// handle handle Party Name Data
function* handlePartyNameDataRequest(e) {
  // const { searchValue } = e.payload;
  console.log("PARTY NAME DATA E", e);
  const response = yield fetch(
    // `${BASE_Url}/search/get-result/Store1/AAAA/${searchValue}`,
    `${BASE_Url}/supplier/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();

  console.log("JSONDATA SEARCH PARTY NAME__", jsonData);
  if (jsonData.status === true) {
    if (jsonData) {
      if (jsonData && jsonData.data) {
        yield put({
          type: "ComponentPropsManagement/handlePartyNameDataResponse",
          data: jsonData.data,
        });
      }
    } else {
      yield put({
        type: "ComponentPropsManagement/handlePartyNameDataResponse",
        data: {},
      });
    }
  } else if (jsonData) {
  }
}
function* handleRecommendedDataRequest() {
  // console.log("***", e.payload);
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(
    `${BASE_Url}/search/recommended-items/${storeId}/${saasId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      // body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  // console.log("JSONDATA RECOMMENDED", jsonData);
  if (jsonData) {
    if (jsonData.data && jsonData.data.length > 0) {
      // console.log("INSIDE", jsonData);
      const tempSearchArr = jsonData.data;
      tempSearchArr.map((el) => {
        el["productQty"] = 1;
        el["sku"] = "SKU";
        el["department"] = "Dept2";
        // el["new_edit_price"] = 0;
        // el["discount"] = false;
      });
      // console.log("tempSearchArr", tempSearchArr);
      yield put({
        type: "ComponentPropsManagement/handleRecommendedDataResponse",
        data: tempSearchArr,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handleRecommendedDataResponse",
      data: [],
    });
  }
}

function* handleQRImageRequest(e) {
  const response = yield fetch(
    `${BASE_Url}/transaction/payment/phonepay/EE/AA`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response;

  console.log("FILE", jsonData.url);
  if (jsonData && jsonData.url) {
    //   const cartData = jsonData.data;
    yield put({
      type: "ComponentPropsManagement/handleQRImageResponse",
      data: jsonData.url,
    });
  } else {
    yield put({
      type: "ComponentPropsManagement/handleQRImageResponse",
      data: "",
    });
  }
}

function* handleRegisterUserRequest(e) {
  console.log("E PAYLOAD REGISTER", e.payload);
  const response = yield fetch(`${BASE_Url}/customer/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("REGISTER JSONDATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      toast.success(jsonData.message);
      // alert(jsonData.message);
      // const cartData = jsonData.data;
      // yield put({
      //   type: "ComponentPropsManagement/handleRegisterUserResponse",
      //   data: jsonData.data,
      // });
    } else {
      toast.error(jsonData.message);
    }
  } else {
    toast.error(jsonData.message);
    // yield put({
    //   type: "ComponentPropsManagement/handleRegisterUserResponse",
    //   data: {},
    // });
  }
}
function* handleEmailNotificationResponse(e) {
  console.log("E EMAIL NOTIFICATION", e.payload);
  const response = yield fetch(`${Email_Url}email/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("Email Notify JSONDATA", jsonData);
  if (jsonData) {
    // if (jsonData && jsonData.data) {
    toast.success(jsonData.message);
    // alert(jsonData.message);
    // const cartData = jsonData.data;
    // yield put({
    //   type: "ComponentPropsManagement/handleRegisterUserResponse",
    //   data: jsonData.data,
    // });
    // } else {
    //   toast.error(jsonData.message);
    // }
  } else {
    toast.error(jsonData.message);
    // yield put({
    //   type: "ComponentPropsManagement/handleRegisterUserResponse",
    //   data: {},
    // });
  }
}
// ADD Purchase
function* handleAddPurchaseRequest(e) {
  console.log("E PAYLOAD ADDPURCHASE", e.payload);
  const response = yield fetch(`${BASE_Url}/purchase/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("ADD PURCHASE REQUEST", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      toast.success(jsonData.message);
      // alert(jsonData.message);
      // const cartData = jsonData.data;
      // yield put({
      //   type: "ComponentPropsManagement/handleRegisterUserResponse",
      //   data: jsonData.data,
      // });
    } else {
      toast.error(jsonData.message);
    }
  } else {
    toast.error(jsonData.message);
    // yield put({
    //   type: "ComponentPropsManagement/handleRegisterUserResponse",
    //   data: {},
    // });
  }
}
function* handleAddItemToStoreRequest(e) {
  console.log("ADD ITEM E PAYLOAD", e.payload);
  const response = yield fetch(`${BASE_Url}/item/add-item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("REGISTER JSONDATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      // toast.success(jsonData.message);
      // alert(jsonData.message);
      // const cartData = jsonData.data;
      toast.success(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleAddItemToStoreResponse",
        data: jsonData.data.productId,
      });
    } else {
      toast.error(jsonData.message);
    }
  } else {
    toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleAddItemToStoreResponse",
      data: "",
    });
  }
}

// SAVE TRANSACTION
function* handleSaveTransactionRequest(e) {
  // const { searchValue } = e.payload;
  // console.log("E SAVE TRANSACTION", e);

  const response = yield fetch(`${BASE_Url}/transaction/save-transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  // console.log("SAVE TRANSACTION DATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      const cartData = jsonData.data;
      yield put({
        type: "ComponentPropsManagement/handleSavaTransactionResponse",
        data: jsonData.data,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handleSavaTransactionResponse",
      data: {},
    });
  }
}
// Create Row in Tax Master
function* handleCreateRowTaxMasterRequest(e) {
  // const { searchValue } = e.payload;
  console.log("E TAX MASTER", e);
  const { id, effective_from, end_date, tax_desc, hsn_code } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(`${BASE_Url}/tax/create/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ effective_from, end_date, tax_desc, hsn_code }),
  });
  const jsonData = yield response.json();
  console.log("E TAX MASTER JSONDATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      toast.success(jsonData.message);

      // const cartData = jsonData.data;
      // yield put({
      //   type: "ComponentPropsManagement/handleSavaTransactionResponse",
      //   data: jsonData.data,
      // });
    }
  } else {
    toast.error(jsonData.message);

    // yield put({
    //   type: "ComponentPropsManagement/handleSavaTransactionResponse",
    //   data: {},
    // });
  }
}
// GET HSN CODES
function* handleHSNCODERequest() {
  // const { searchValue } = e.payload;
  // console.log("E TAX MASTER", e);
  // const { id, effective_from, end_date, tax_desc, hsn_code } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(`${BASE_Url}/tax/get-hsn-codes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ effective_from, end_date, tax_desc, hsn_code }),
  });
  const jsonData = yield response.json();
  console.log("HSN CODES", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      yield put({
        type: "ComponentPropsManagement/handlehandleHSNCODEResponse",
        data: jsonData.data,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handlehandleHSNCODEResponse",
      data: [],
    });
  }
}
// Handle ADD Party
function* handleAddPartyRequest(e) {
  // const { searchValue } = e.payload;
  console.log("E ADD PARTY", e);
  // const { storeId } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(
    `http://3.111.70.84:8088/api/v1/supplier/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  console.log("ADD PARTY DATA", jsonData);
  if (jsonData) {
    if (jsonData.status === true) {
      toast.success(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleAddPartyResponse",
        data: jsonData,
      });
    } else {
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleAddPartyResponse",
        data: {},
      });
    }
  } else {
    toast.error(jsonData.message);
  }
}
// Handle Tax Rates
function* handleTaxRatesRequest() {
  // const { searchValue } = e.payload;
  // console.log("E SAVE TRANSACTION", e);
  // const { storeId } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(`${BASE_Url}/tax/get-taxes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonData = yield response.json();
  // console.log("TAX RATE JSONDATA", jsonData);
  if (jsonData) {
    if (jsonData && jsonData.data) {
      const tempSearchArr = jsonData.data;
      const arr = [];
      tempSearchArr.map((el) => {
        arr.push({ label: el.taxCode + "@" + el.taxRate, ...el });
      });
      // console.log("tempSearchArr", arr);
      yield put({
        type: "ComponentPropsManagement/handleTaxRatesResponse",
        data: arr,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handleTaxRatesResponse",
      data: "",
    });
  }
}

function* handleDeleteCartItemRequest(e) {
  // const { searchValue } = e.payload;
  // console.log("E VALUE", e.payload);
  const { storeId } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(
    `${BASE_Url}/price-check/deleteproduct/11342/753/31`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();

  if (jsonData && jsonData.data) {
    yield put({
      type: "ComponentPropsManagement/handleAddCartDataResponse",
      data: jsonData.data.products,
    });
  } else {
    yield put({
      type: "ComponentPropsManagement/handleAddCartDataResponse",
      data: [],
    });
  }
}

function* handleUploadPicRequest(e) {
  // console.log(object);
  const { save_product_id, formdata } = e.payload;
  const response = yield fetch(
    `${BASE_Url}/item/save-image/${save_product_id}`,
    {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formdata,
    }
  );
  const jsonData = yield response.json();
  console.log("JSONDATA UPLOAD PIC", jsonData);
  if (jsonData && jsonData.data) {
    toast.success(jsonData.message);
    //   yield put({
    //     type: "ComponentPropsManagement/handleAddCartDataResponse",
    //     data: jsonData.data.products,
    //   });
    // } else {
    //   yield put({
    //     type: "ComponentPropsManagement/handleAddCartDataResponse",
    //     data: [],
    //   });
  }
}

function* handleUploadItemRequest(e) {
  try {
    const { csvFile } = e.payload;

    const formData = new FormData();

    formData.append("file", csvFile);
    formData.append("saas-id", saasId);

    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${token}`)

    const response = yield fetch(`${host}dashboard/upload-items`, {
      method: "POST",
      // headers: myHeaders,
      body: formData,
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleUploadItemResponse",
          data: jsonData,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleUploadItemResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(`${err.message} - dashboard/upload-items`);
  }
}

function* handleUploadInventoryRequest(e) {
  try {
    const { csvFile } = e.payload;
    const formData = new FormData();

    formData.append("file", csvFile);
    formData.append("saas-id", saasId);

    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${token}`)

    const response = yield fetch(`${host}dashboard/upload-inventory`, {
      method: "POST",
      // headers: myHeaders,
      body: formData,
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleUploadInventoryResponse",
          data: jsonData,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleUploadInventoryResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(`${err.message} - dashboard/upload-inventory`);
  }
}

function* handleSalesOverviewRequest(e) {
  // console.log("e.", e.payload)
  // const formData = new FormData();
  // formData.append('file', e.payload.file);
  // formData.append('name', e.payload.name);
  // formData.append('description', e.payload.description);
  // formData.append('created-by', e.payload['created-by']);
  // formData.append('is-popular', e.payload['is-popular']);
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`)
  try {
    const response = yield fetch(
      `${host}inventory-master/inventory-dashboard/${saasId}`,
      {
        method: "GET",
        // headers: myHeaders,
        // body: e.payload
      }
    );
    const jsonData = yield response.json();
    // console.log("jsonData", jsonData)
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleSalesOverviewResponse",
          data: jsonData,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleSalesOverviewResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(`${err.message} - inventory-master/inventory-dashboard`);
  }
}

function* handleLastWeekSalesRequest(e) {
  // console.log("e.", e.payload)
  // const formData = new FormData();
  // formData.append('file', e.payload.file);
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`)
  try {
    const response = yield fetch(`${host}dashboard/last-week-sales/${saasId}`, {
      method: "GET",
      // headers: myHeaders,
      // body: e.payload
    });

    const jsonData = yield response.json();
    // console.log("jsonData", jsonData)
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleLastWeekSalesResponse",
          data: jsonData,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleLastWeekSalesResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(`${err.message} - dashboard/last-week-sales`);
  }
}

function* handleLastMonthSalesRequest(e) {
  // console.log("e.", e.payload)
  // const formData = new FormData();
  // formData.append('file', e.payload.file);
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`)
  try {
    const response = yield fetch(
      `${host}dashboard/last-month-sales/${saasId}`,
      {
        method: "GET",
        // headers: myHeaders,
        // body: e.payload
      }
    );

    const jsonData = yield response.json();
    // console.log("jsonData", jsonData)
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleLastMonthSalesResponse",
          data: jsonData,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleLastMonthSalesResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(`${err.message} - dashboard/last-month-sales`);
  }
}

function* handleTodaySalesRequest(e) {
  const date = new Date();
  // const formData = new FormData();
  // formData.append('today_sales', "2023-06-19");
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`)
  try {
    const response = yield fetch(
      `${host}dashboard/today-sales/${saasId}/${moment(date).format(
        "Y-MM-DD"
      )}`,
      {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },

        // body: JSON.stringify({
        //   today_sales: moment(date).format("Y-MM-DD"),
        // }),
        // body: formData
        // body: e.payload
      }
    );
    const jsonData = yield response.json();
    // console.log("jsonData", jsonData)
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleTodaySalesResponse",
          data: jsonData,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleTodaySalesResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(`${err.message} - dashboard/today-sales`);
  }
}

function* handleNumberOfCustomerRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  try {
    const response = yield fetch(`${host}inventory-master/total-customer`, {
      method: "GET",
      // headers: myHeaders,
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        yield put({
          type: "ComponentPropsManagement/handleNumberOfCustomerResponse",
          data: jsonData,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleNumberOfCustomerResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(`${err.message} - inventory-master/total-customer`);
  }
}

function* handleLowStockItemsRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(
    `${host}inventory-master/inventory-less-closing-quantity`,
    {
      method: "GET",
      // headers: myHeaders,
    }
  );
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleLowStockItemsResponse",
        data: jsonData,
      });
      return;
    }
    toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleLowStockItemsResponse",
      data: null,
    });
  } else {
    toast.error("Something went wrong server side");
  }
}

function* handleLowStockItemListRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(`${host}inventory-master/low-stock-item`, {
    method: "GET",
    // headers: myHeaders,
  });
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleLowStockItemListResponse",
        data: jsonData.data,
      });
      return;
    }
    toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleLowStockItemListResponse",
      data: null,
    });
  } else {
    toast.error("Something went wrong server side");
  }
}

function* handleQuantityInHandRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(
    `${host}inventory-master/no-of_items/${saasId}`,
    {
      method: "GET",
      // headers: myHeaders,
    }
  );
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleQuantityInHandResponse",
        data: jsonData,
      });
      return;
    }
    toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleQuantityInHandResponse",
      data: null,
    });
  } else {
    toast.error("Something went wrong server side");
  }
}

function* handleLastFourteenDaysSalesRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)

  const response = yield fetch(
    `${host}dashboard/last-fourteen-days-sales/${saasId}`,
    {
      method: "GET",
      // headers: myHeaders,
    }
  );

  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleLastFourteenDaysSalesResponse",
        data: jsonData,
      });
      return;
    }
    toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleLastFourteenDaysSalesResponse",
      data: null,
    });
  } else {
    toast.error("Something went wrong server side");
  }
}

function* handleLastSixtyDaysSalesRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)

  const response = yield fetch(
    `${host}dashboard/last-sixty-days-sales/${saasId}`,
    {
      method: "GET",
      // headers: myHeaders,
    }
  );

  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleLastSixtyDaysSalesResponse",
        data: jsonData,
      });
      return;
    }
    toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleLastSixtyDaysSalesResponse",
      data: null,
    });
  } else {
    toast.error("Something went wrong server side");
  }
}

function* handleYesterdaySalesRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(`${host}dashboard/yesterday-sales/${saasId}`, {
    method: "GET",
    // headers: myHeaders,
  });
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleYesterdaySalesResponse",
        data: jsonData,
      });
      return;
    }
    toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleYesterdaySalesResponse",
      data: null,
    });
  } else {
    toast.error("Something went wrong server side");
  }
}

function* handleGstTypeDropdownRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(`${host}tax/get-taxes`, {
    method: "GET",
    // headers: myHeaders,
    // body: e.payload,
    // redirect: 'follow'
  });
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      const arr = [];
      jsonData.data.map((item) => {
        arr.push({
          ...item,
          label: `${item.taxCode}@${item.taxRate}%`,
          value: item.taxRate,
        });
      });
      // toast.success(jsonData.message)
      yield put({
        type: "ComponentPropsManagement/handleGstTypeDropdownResponse",
        data: arr,
      });
      return;
    }
    toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleGstTypeDropdownResponse",
      data: null,
    });
  } else {
    toast.error("Something went wrong server side");
  }
}

function* handleGetHsnCodeDropdownRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(`${host}tax/get-hsn-codes`, {
    method: "GET",
    // headers: myHeaders,
    // body: e.payload,
    // redirect: 'follow'
  });
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      const arr = [];
      jsonData.data.map((item) => {
        arr.push({ ...item, label: `${item.hsn_name}`, value: item.hsn_code });
      });
      // toast.success(jsonData.message)
      yield put({
        type: "ComponentPropsManagement/handleGetHsnCodeDropdownResponse",
        data: arr,
      });
      return;
    }
    toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleGetHsnCodeDropdownResponse",
      data: null,
    });
  } else {
    toast.error("Something went wrong server side");
  }
}

function* handleSalesDashboardChartRequest(e) {
  try {
    const response = yield fetch(`${host}dashboard/last-six-month/${saasId}`, {
      method: "GET",
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleSalesDashboardChartResponse",
          data: jsonData.data,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleSalesDashboardChartResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(err.message);
  }
}

function* handleSalesReportRequest(e) {
  try {
    const response = yield fetch(
      `${host}tax/get-sales-report/${moment(new Date()).format("Y-MM-DD")}`,
      {
        method: "GET",
      }
    );
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleSalesReportResponse",
          data: jsonData.list_sales_report,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleSalesReportResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(err.message);
  }
}

function* handleGstReportRequest(e) {
  try {
    const response = yield fetch(`${host}tax/get-hsn-list`, {
      method: "GET",
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleGstReportResponse",
          data: jsonData.tax_list,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleGstReportResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(err.message);
  }
}

function* handleGstReportItemRequest(e) {
  try {
    const response = yield fetch(`${host}tax/get-hsn-item-list`, {
      method: "GET",
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleGstReportItemResponse",
          data: jsonData.tax_item_list,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleGstReportItemResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(err.message);
  }
}

// Create Row in Tax Master
function* handleCreateTaxMasterRequest(e) {
  try {
    const response = yield fetch(`${BASE_Url}/tax/create/${saasId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    console.log("E TAX MASTER JSONDATA", jsonData);
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleCreateTaxMasterResponse",
          data: jsonData.data,
        });
      } else {
        toast.error(jsonData.message);
      }
    } else {
      toast.error("Something went wrong");
    }
  } catch (err) {
    toast.error(err.message);
  }
}
// Member Enrollment
function* handleMemberEnrollmentRequest(e) {
  console.log("E PAYLOAD ENROLLMENT", e.payload);

  const response = yield fetch(`http://3.111.70.84:8091/v1/loyalty/customer`, {
    // const response = yield fetch(`${BASE_Url}/loyalty/customer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log("JSONDATA MEMBER ENRL", jsonData);
  // if (jsonData) {
  //   if (jsonData.status === true) {
  //     toast.success(jsonData.messag);
  //     // yield put({
  //     //   type: "ComponentPropsManagement/handleYesterdaySalesResponse",
  //     //   data: jsonData,
  //     // });
  //     // return;
  //   }
  //   toast.error(jsonData.message);
  //   yield put({
  //     type: "ComponentPropsManagement/handleYesterdaySalesResponse",
  //     data: null,
  //   });
  // } else {
  //   toast.error("Something went wrong server side");
  // }
}

// Accruval Loyalty
function* handleAccruvalRequest(e) {
  console.log("E PAYLOAD ACCURAVAL", e.payload);
  // const { data } = JSON.parse(localStorage.getItem("Loyalty_data"));

  // console.log("E PAYLOAD ACC SAAS", saasId);
  // console.log("E PAYLOAD ACC LOYALTY ID", data.loyalty_id);
  // console.log(
  //   "E PAYLOAD URL",
  //   `http://3.111.70.84:8091/v1/loyalty/issue/${saasId}/${data.loyalty_id}`
  // );

  // const { data } = JSON.parse(localStorage.getItem("Loyalty_data"));
  const response = yield fetch(
    // `http://3.111.70.84:8091/v1/loyalty/issue/${saasId}/${data.loyalty_id}`,
    `http://3.111.70.84:8091/v1/loyalty/issue/8/80407237021438056AED`,
    {
      // const response = yield fetch(`${BASE_Url}/loyalty/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  console.log("JSONDATA ACC>", jsonData);
  // if (jsonData) {
  //   if (jsonData.status === true) {
  //     yield put({
  //       type: "ComponentPropsManagement/handleYesterdaySalesResponse",
  //       data: jsonData,
  //     });
  //     return;
  //   }
  //   toast.error(jsonData.message);
  //   yield put({
  //     type: "ComponentPropsManagement/handleYesterdaySalesResponse",
  //     data: null,
  //   });
  // } else {
  //   toast.error("Something went wrong server side");
  // }
}

export function* helloSaga() {
  yield takeEvery(
    "ComponentPropsManagement/handleLoginRequest",
    handleLoginRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleSalesReportRequest",
    handleSalesReportRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleGstReportRequest",
    handleGstReportRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleGstReportItemRequest",
    handleGstReportItemRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleRegisterRequest",
    handleRegisterRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handlePartyNameDataRequest",
    handlePartyNameDataRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleRegisterUserRequest",
    handleRegisterUserRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleAddItemToStoreRequest",
    handleAddItemToStoreRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleHSNCODERequest",
    handleHSNCODERequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleSearchedDataRequest",
    handleSearchedDataRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleRecommendedDataRequest",
    handleRecommendedDataRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleQRImageRequest",
    handleQRImageRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleDeleteCartItemRequest",
    handleDeleteCartItemRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleSaveTransactionRequest",
    handleSaveTransactionRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleTaxRatesRequest",
    handleTaxRatesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleAddPartyRequest",
    handleAddPartyRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleAddPurchaseRequest",
    handleAddPurchaseRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleCreateRowTaxMasterRequest",
    handleCreateRowTaxMasterRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleAddItemSearchRequest",
    handleAddItemSearchRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleUploadPicRequest",
    handleUploadPicRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleUploadItemRequest",
    handleUploadItemRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleUploadInventoryRequest",
    handleUploadInventoryRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleSalesOverviewRequest",
    handleSalesOverviewRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLastWeekSalesRequest",
    handleLastWeekSalesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLastMonthSalesRequest",
    handleLastMonthSalesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleTodaySalesRequest",
    handleTodaySalesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleNumberOfCustomerRequest",
    handleNumberOfCustomerRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLowStockItemsRequest",
    handleLowStockItemsRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleQuantityInHandRequest",
    handleQuantityInHandRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLastFourteenDaysSalesRequest",
    handleLastFourteenDaysSalesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLastSixtyDaysSalesRequest",
    handleLastSixtyDaysSalesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleYesterdaySalesRequest",
    handleYesterdaySalesRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleGstTypeDropdownRequest",
    handleGstTypeDropdownRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleGetHsnCodeDropdownRequest",
    handleGetHsnCodeDropdownRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleSalesDashboardChartRequest",
    handleSalesDashboardChartRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleCreateTaxMasterRequest",
    handleCreateTaxMasterRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleEmailNotificationResponse",
    handleEmailNotificationResponse
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLowStockItemListRequest",
    handleLowStockItemListRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleMemberEnrollmentRequest",
    handleMemberEnrollmentRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleAccruvalRequest",
    handleAccruvalRequest
  );
}

// export function* incrementAsync() {
//     yield delay(1000)
//     yield put({ type: 'INCREMENT' })
// }

// export function* watchIncrementAsync() {
//     yield takeEvery('INCREMENT_ASYNC', incrementAsync)
// }

// export function* saga() {

// }

export default function* rootSaga() {
  yield all([
    helloSaga(),
    // watchIncrementAsync()
  ]);
}

// export default saga
