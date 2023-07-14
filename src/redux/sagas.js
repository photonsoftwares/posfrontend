import { put, takeEvery, all, retry } from "redux-saga/effects";
import { BASE_Url, Email_Url, host } from "../URL";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import { json } from "react-router-dom";
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
console.log("storeId", storeId);

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
    if (jsonData.data && jsonData.data?.length > 0) {
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

    confirmAlert({
      title: "NO ITEM FOUND",
      message: "Would you like to add this Item to Store.??",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            window.location.replace("/add-item");
          },
        },
        {
          label: "No",
          onClick: () => {
            window.location.replace("/home");
          },
        },
      ],
    });

    yield put({
      type: "ComponentPropsManagement/handleSearchedDataResponse",
      // data: tempSearchArr,
    });
  }
}

function* handleSearchedDataRequest1(e) {
  // const navigate = useNavigate();
  try {
    const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
    const { searchValue } = e.payload;
    const response = yield fetch(
      `${BASE_Url}/search/get-result/${storeId}/${saasId}/${searchValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        yield put({
          type: "ComponentPropsManagement/handleSearchedDataResponse1",
          data: { list: jsonData.data, totalCount: 0 },
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleSearchedDataResponse1",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    console.log(err);
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

// Add / Create Supplier
function* handleCreateSupplierRequest(e) {
  // const { searchValue } = e.payload;
  console.log("PARTY NAME DATA E", e);
  const response = yield fetch(
    // `${BASE_Url}/search/get-result/Store1/AAAA/${searchValue}`,
    `${BASE_Url}/supplier/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  // console.log("JSONDATA SEARCH PARTY NAME__", jsonData);
  if (jsonData.status === true) {
    if (jsonData) {
      if (jsonData && jsonData.data) {
        toast.success(jsonData.message);
        jsonData.message;
        // yield put({
        //   type: "ComponentPropsManagement/handlePartyNameDataResponse",
        //   data: jsonData.data,
        // });
      }
    } else {
      toast.error(jsonData.message);
      // yield put({
      //   type: "ComponentPropsManagement/handlePartyNameDataResponse",
      //   data: {},
      // });
    }
  } else if (jsonData) {
    toast.error(jsonData.message);
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
    if (jsonData.data && jsonData.data?.length > 0) {
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

function* handleUpdateItemToStoreRequest(e) {
  const response = yield fetch(`${BASE_Url}/item/update-item/${e.payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload.data),
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
        data: jsonData.data.item_id,
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
  console.log("SAVE TRANSACTION DATA", jsonData);
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
    `${host}inventory-master/closing-stock/${saasId}`,
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

function* handleNoOfItemRequest(e) {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${ token }`)
  const response = yield fetch(
    `${host}inventory-master/no-of-items/${saasId}`,
    {
      method: "GET",
      // headers: myHeaders,
    }
  );
  const jsonData = yield response.json();
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleNoOfItemResponse",
        data: jsonData,
      });
      return;
    }
    toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleNoOfItemResponse",
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
  const response = yield fetch(`${host}tax/get-hsn-codes`, {
    method: "GET",
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
      `${host}tax/get-sales-report/${e.payload}/${storeId}/${saasId}`,
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

function* handleItemMasterListRequest(e) {
  try {
    const { currentPage } = e.payload;
    const response = yield fetch(
      `${host}item/get-item-list/${saasId}/${currentPage}`,
      {
        method: "GET",
      }
    );
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleItemMasterListResponse",
          data: { list: jsonData.data, totalCount: jsonData.count },
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleItemMasterListResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(err.message);
  }
}

function* handleTenderReportRequest(e) {
  try {
    const { date } = e.payload;
    const response = yield fetch(`${host}reconciliation/get-total-amount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        saas_id: saasId,
        store_id: storeId,
        business_date: moment(date).format("Y-MM-DD"),
      }),
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        // toast.success(jsonData.message)
        yield put({
          type: "ComponentPropsManagement/handleTenderReportResponse",
          data: jsonData.data,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleTenderReportResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(err.message);
  }
}

function* handleUpdateMoqRequest(e) {
  try {
    const response = yield fetch(`${host}moq/create-moq`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleUpdateMoqResponse",
          data: jsonData.data,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleUpdateMoqResponse",
        data: null,
      });
    } else {
      toast.error("Something went wrong server side");
    }
  } catch (err) {
    toast.error(err.message);
  }
}

function* handleUpdatePriceRequest(e) {
  try {
    const response = yield fetch(`${host}item-price/add-item-price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleUpdatePriceResponse",
          data: jsonData.data,
        });
        return;
      }
      toast.error(jsonData.message);
      yield put({
        type: "ComponentPropsManagement/handleUpdatePriceResponse",
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

function* handleExpenseCategoryDropdownRequest(e) {
  try {
    const response = yield fetch(`${host}expense/get-all-category-name`, {
      method: "GET",
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        if (jsonData.data && jsonData.data.length > 0) {
          const arr = [];
          jsonData.data.map((item) => {
            arr.push({ label: item, value: item });
          });
          yield put({
            type: "ComponentPropsManagement/handleExpenseCategoryDropdownResponse",
            data: arr,
          });
          return;
        }
        yield put({
          type: "ComponentPropsManagement/handleExpenseCategoryDropdownResponse",
          data: [],
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

function* handleExpenseCreateRequest(e) {
  try {
    const response = yield fetch(`${host}expense/create-expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleExpenseCreateResponse",
          data: jsonData.data,
        });
        return;
      } else {
        yield put({
          type: "ComponentPropsManagement/handleExpenseCreateResponse",
          data: null,
        });
        toast.error(jsonData.message);
      }
    } else {
      toast.error("Something went wrong");
    }
  } catch (err) {
    toast.error(err.message);
  }
}

function* handleViewOrderPendingRequest(e) {
  try {
    const date = new Date();
    const response = yield fetch(`${host}order/view-order/${moment(date).format("Y-MM-DD")}/${saasId}`, {
      // const response = yield fetch(`${host}order/view-order/2023-07-13/saas123`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        yield put({
          type: "ComponentPropsManagement/handleViewOrderPendingResponse",
          data: jsonData.data,
        });
        return;
      } else {
        yield put({
          type: "ComponentPropsManagement/handleViewOrderPendingResponse",
          data: null,
        });
        toast.error(jsonData.message);
      }
    } else {
      toast.error("Something went wrong");
    }
  } catch (err) {
    toast.error(err.message);
  }
}


function* pendingOrderCartDataRequest(e) {
  try {

    const { order_id } = e.payload
    const response = yield fetch(`${host}order/view-order-detail/${order_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        yield put({
          type: "ComponentPropsManagement/pendingOrderCartDataResponse",
          data: jsonData.data,
        });
        return;
      } else {
        yield put({
          type: "ComponentPropsManagement/pendingOrderCartDataResponse",
          data: null,
        });
        toast.error(jsonData.message);
      }
    } else {
      toast.error("Something went wrong");
    }
  } catch (err) {
    toast.error(err.message);
  }
}

//get Bahikhata
function* handleBahikhataPartyDropdownRequest(e) {
  const response = yield fetch(`${BASE_Url}/bahikhata/get-party-name`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ effective_from, end_date, tax_desc, hsn_code }),
  });
  const jsonData = yield response.json();

  if (jsonData) {
    if (jsonData && jsonData.data) {
      const arr = []
      jsonData.data.map((item) => {
        arr.push({ label: item, value: item })
      })
      yield put({
        type: "ComponentPropsManagement/handleBahikhataPartyDropdownResponse",
        data: arr
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handleBahikhataPartyDropdownResponse",
      data: [],
    });
  }

}

//..............create Bahikhata............................
function* handleBahikhataCreateRequest(e) {
  try {
    const response = yield fetch(`${host}/bahikhata/create-bahikhata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json()
    if (jsonData) {
      if (jsonData.status === true) {
        toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleBahikhataCreateResponse",
          data: jsonData.data,
        });
        return
      } else {
        yield put({
          type: "ComponentPropsManagement/handleBahikhataCreateResponse",
          data: null,
        });
        toast.error(jsonData.message);
      }
    } else {
      toast.error("Something went wrong");
    }
  } catch (err) {
    toast.error(err.message);
  }
}



function* handleUomListRequest(e) {
  try {
    const response = yield fetch(`${host}omni/get-uom/${saasId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    if (jsonData) {
      if (jsonData.status === true) {
        yield put({
          type: "ComponentPropsManagement/handleUomListResponse",
          data: jsonData.data,
        });
        return;
      } else {
        yield put({
          type: "ComponentPropsManagement/handleUomListResponse",
          data: null,
        });
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

  const response = yield fetch(
    `http://3.111.70.84:8091/test/v1/loyalty/customer`,
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
  // const loyalty_data = JSON.parse(localStorage.getItem("Loyalty_data"));
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  console.log("ACC E", e);
  try {
    console.log("E PAYLOAD ACCURAVAL", e.payload);

    const response = yield fetch(
      `http://3.111.70.84:8091/test/v1/loyalty/issue/${saasId}/${e.payload.link_loyalty_detail.loyalty_id}`,
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
  } catch (err) {
    console.log(err);
  }
}
//
function* handleDebitNoteRequest(e) {
  console.log("E PAYLOAD", e);
  try {
    const response = yield fetch(`${BASE_Url}/Debit/create-debitnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    console.log("Debit Note JSONDATA", jsonData);
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
// Delivery node
function* handleDeliveryNoteRequest(e) {
  console.log("E PAYLOAD", e);
  try {
    const response = yield fetch(`${BASE_Url}/Debit/create-debit-chalan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    });
    const jsonData = yield response.json();
    console.log("Debit Note JSONDATA", jsonData);
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

function* handleDelGetUserRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  console.log("E PAYLOAD USER DATA", e.payload);
  const { searchValue } = e.payload;
  try {
    const response = yield fetch(
      `http://3.111.70.84:8088/test/api/v1/customer/search-customer/${storeId}/EEEE/${searchValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(e.payload),
      }
    );
    const jsonData = yield response.json();
    console.log("JSONDATA E USER", jsonData);
    if (jsonData) {
      if (jsonData.status === true) {
        const tempSearchArr = jsonData.data;
        const arr = [];
        tempSearchArr.map((el) => {
          // arr.push({ label: el.taxCode + "@" + el.taxRate, ...el });
          arr.push({ ...el, label: el.name, value: el.name });
        });
        // toast.success(jsonData.message);
        yield put({
          type: "ComponentPropsManagement/handleDelGetUserResponse",
          data: arr,
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
// handleLinkLoyaltyRequest
function* handleLinkLoyaltyRequest(e) {
  console.log("SEARCH LINK MOBILE", e);
  // const { mobile_number } = e.payload;
  try {
    const response = yield fetch(
      `http://3.111.70.84:8091/test/v1/loyalty/customer-details`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e.payload),
      }
    );
    const jsonData = yield response.json();
    console.log("JSONDATA E USER", jsonData);
    if (jsonData) {
      yield put({
        type: "ComponentPropsManagement/handleLinkLoyaltyResponse",
        data: jsonData,
      });
    } else {
      toast.error("Something went wrong");
    }
  } catch (err) {
    toast.error(err.message);
  }
}

// handleRedeemPointRequest
function* handleRedeemPointRequest(e) {
  console.log("SEARCH LINK MOBILE", e);
  // const { mobile_number } = e.payload;
  try {
    const response = yield fetch(
      `http://3.111.70.84:8091/test/v1/loyalty/redeem-points/${e.payload.link_loyalty_detail.loyalty_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e.payload),
      }
    );
    const jsonData = yield response.json();
    console.log("JSONDATA E USER", jsonData);
    //   if (jsonData) {
    //     yield put({
    //       type: "ComponentPropsManagement/handleLinkLoyaltyResponse",
    //       data: jsonData,
    //     });
    //   } else {
    //     toast.error("Something went wrong");
    //   }
  } catch (err) {
    toast.error(err.message);
  }
}

// Search Invoice By Invoice No /Return
function* handleSearchInvoiceRequest(e) {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("User_data"));
  const response = yield fetch(
    `${host}transaction/search-invoice/${storeId}/${saasId}/${e.payload.searchValue}`,
    {
      method: "GET",
    }
  );
  const jsonData = yield response.json();
  console.log("JSONDATA RETURN", jsonData);
  if (jsonData) {
    if (jsonData.status === true) {
      yield put({
        type: "ComponentPropsManagement/handleSearchInvoiceResponse",
        data: jsonData.data,
      });
      return;
    }
    toast.error(jsonData.message);
    yield put({
      type: "ComponentPropsManagement/handleSearchInvoiceResponse",
      data: [],
    });
  } else {
    toast.error(jsonData.message);
  }
}

export function* helloSaga() {
  yield takeEvery(
    "ComponentPropsManagement/handleLoginRequest",
    handleLoginRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleItemMasterListRequest",
    handleItemMasterListRequest
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
    "ComponentPropsManagement/handleTenderReportRequest",
    handleTenderReportRequest
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
    "ComponentPropsManagement/pendingOrderCartDataRequest",
    pendingOrderCartDataRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleBahikhataCreateRequest",
    handleBahikhataCreateRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleBahikhataPartyDropdownRequest",
    handleBahikhataPartyDropdownRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleExpenseCategoryDropdownRequest",
    handleExpenseCategoryDropdownRequest
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
    "ComponentPropsManagement/handleUpdateMoqRequest",
    handleUpdateMoqRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleUpdatePriceRequest",
    handleUpdatePriceRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleAddItemToStoreRequest",
    handleAddItemToStoreRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleUpdateItemToStoreRequest",
    handleUpdateItemToStoreRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleUomListRequest",
    handleUomListRequest
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
    "ComponentPropsManagement/handleViewOrderPendingRequest",
    handleViewOrderPendingRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleExpenseCreateRequest",
    handleExpenseCreateRequest
  );

  yield takeEvery(
    "ComponentPropsManagement/handleSearchedDataRequest1",
    handleSearchedDataRequest1
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
  // yield takeEvery(
  //   "ComponentPropsManagement/handleSearchedDataRequest2",
  //   handleSearchedDataRequest2
  // );

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
  yield takeEvery(
    "ComponentPropsManagement/handleNoOfItemRequest",
    handleNoOfItemRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleDebitNoteRequest",
    handleDebitNoteRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleDeliveryNoteRequest",
    handleDeliveryNoteRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleDelGetUserRequest",
    handleDelGetUserRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleLinkLoyaltyRequest",
    handleLinkLoyaltyRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleRedeemPointRequest",
    handleRedeemPointRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleCreateSupplierRequest",
    handleCreateSupplierRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleSearchInvoiceRequest",
    handleSearchInvoiceRequest
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
