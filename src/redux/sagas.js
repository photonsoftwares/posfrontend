import { put, takeEvery, all } from "redux-saga/effects";
import { BASE_Url } from "../URL";

function* handleLoginRequest(e) {
  // const { username, password } = e.payload;
  const response = yield fetch(`http://13.232.172.11:8089/v1/loyalty/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e.payload),
  });
  const jsonData = yield response.json();
  console.log(jsonData);
  if (jsonData) {
    if (jsonData.username && jsonData.client_id) {
      // toast.success("Login Successfully");
      localStorage.setItem("client_id", jsonData.client_id);
      localStorage.setItem("login_data", JSON.stringify(jsonData));
      yield put({
        type: "ComponentPropsManagement/handleLoginResponse",
        data: jsonData,
      });
      // location.replace("/");
      window.location.replace("/");
    } else {
      // toast.error("Please enter correct username and password");
      yield put({
        type: "ComponentPropsManagement/handleLoginResponse",
        data: [],
      });
    }
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

  // console.log("JSONDATA", jsonData);
  if (jsonData && jsonData.data) {
    yield put({
      type: "ComponentPropsManagement/handleSearchedDataResponse",
      data: jsonData.data,
    });
  } else {
    yield put({
      type: "ComponentPropsManagement/handleSearchedDataResponse",
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
