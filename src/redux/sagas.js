import { put, takeEvery, all, retry } from "redux-saga/effects";
import { BASE_Url } from "../URL";
import { toast } from "react-toastify";
import { json } from "react-router-dom";
import Navigation from "../Navigation";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
// import { useNavigate } from "react-router-dom";

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
    toast.error("NO ITEM FOUND, would you like to add this Item to Store.??");
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
  console.log("E SAVE TRANSACTION", e);
  // const { storeId } = e.payload;
  // console.log("STORE ID", storeId);
  // const { registerId, saasId, storeId } = JSON.parse(
  //   localStorage.getItem("login_data")
  // );
  // console.log("data", registerId, saasId, storeId);
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
    toast.success(jsonData.message);
    //   if (jsonData && jsonData.data) {
    //     const cartData = jsonData.data;
    //     yield put({
    //       type: "ComponentPropsManagement/handleSavaTransactionResponse",
    //       data: jsonData.data,
    //     });
    //   }
    // } else {
    //   yield put({
    //     type: "ComponentPropsManagement/handleSavaTransactionResponse",
    //     data: {},
    //   });
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
  console.log("JSONDATA", jsonData);
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

export function* helloSaga() {
  yield takeEvery(
    "ComponentPropsManagement/handleLoginRequest",
    handleLoginRequest
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
