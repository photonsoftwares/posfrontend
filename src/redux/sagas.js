import { put, takeEvery, all } from "redux-saga/effects";
import { BASE_Url } from "../URL";
import { toast } from "react-toastify";
import { json } from "react-router-dom";

function* handleLoginRequest(e) {
  // const { username, password } = e.payload;
  const response = yield fetch(`http://13.232.172.11:8088/v1/register/user`, {
    // const response = yield fetch(`http://13.233.25.68:8089/v1/loyalty/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  // console.log(jsonData);

  if (jsonData) {
    if (jsonData.status === true) {
      // toast.success("Login Successfully");
      localStorage.setItem("login_data", JSON.stringify(jsonData.data));
      yield put({
        type: "ComponentPropsManagement/handleLoginResponse",
        data: jsonData.data,
      });
    } else {
      toast.error("Please enter correct username and password");
      yield put({
        type: "ComponentPropsManagement/handleLoginResponse",
        data: {},
      });
    }
    // location.replace("/");
    //  window.location.replace("/");
  }
}

function* handleSearchedDataRequest(e) {
  const { searchValue } = e.payload;
  // console.log("SEARCH VALUE", searchValue);
  const response = yield fetch(
    // `${BASE_Url}search/get-result/Store1/AAAA/${searchValue}`,
    `http://13.232.172.11:8088/api/v1/search/get-result/Store1/AAAA/${searchValue}`,
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
  if (jsonData) {
    if (jsonData.data && jsonData.data.length > 0) {
      // console.log("INSIDE", jsonData);
      const tempSearchArr = jsonData.data;
      tempSearchArr.map((el) => {
        el["quantity"] = 1;
      });
      // console.log("tempSearchArr", tempSearchArr);
      yield put({
        type: "ComponentPropsManagement/handleSearchedDataResponse",
        data: tempSearchArr,
      });
    }
  } else {
    yield put({
      type: "ComponentPropsManagement/handleSearchedDataResponse",
      data: [],
    });
  }
}

function* handleQRImageRequest(e) {
  // const { searchValue } = e.payload;
  console.log("E VALUE", e.payload);
  // const { storeId } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(
    `http://13.232.172.11:8088/api/v1/transaction/payment/phonepay/EE/AA`,
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
function* handlePdfRequest(e) {
  // const { searchValue } = e.payload;
  console.log("E VALUE PDF", e.payload);
  // const { storeId } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(
    `http://13.232.172.11:8088/api/v1/transaction/pdf-qr/TV2PcbCCgEDTf4mgQR.png`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  console.log("QR IMAGE", jsonData);
  // if (jsonData && jsonData.data.products) {
  //   const cartData = jsonData.data;
  //   yield put({
  //     type: "ComponentPropsManagement/handlePdfResponse",
  //     data: jsonData.data,
  //   });
  // } else {
  //   yield put({
  //     type: "ComponentPropsManagement/handlePdfResponse",
  //     data: [],
  //   });
  // }
}

function* handleDeleteCartItemRequest(e) {
  // const { searchValue } = e.payload;
  // console.log("E VALUE", e.payload);
  const { storeId } = e.payload;
  // console.log("STORE ID", storeId);
  const response = yield fetch(
    `http://13.232.172.11:8088/v1/price-check/deleteproduct/11342/753/31`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e.payload),
    }
  );
  const jsonData = yield response.json();
  // console.log("JSONDATA", jsonData);
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

export function* helloSaga() {
  yield takeEvery(
    "ComponentPropsManagement/handleLoginRequest",
    handleLoginRequest
  );
  yield takeEvery(
    "ComponentPropsManagement/handleSearchedDataRequest",
    handleSearchedDataRequest
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
    "ComponentPropsManagement/handlePdfRequest",
    handlePdfRequest
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
