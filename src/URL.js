export let BASE_Url = "";
export let Email_Url = "";
export let host = "";
export const isDev = true;

if (isDev === true) {
  BASE_Url = "http://3.111.70.84:8088/api/v1";
  Email_Url = "http://3.111.70.84:8088/";
  host = "http://3.111.70.84:8088/api/v1/";
} else if (isDev === false) {
  BASE_Url = "http://3.111.70.84:8089/api/v1";
  Email_Url = "http://3.111.70.84:8089/";
  host = "http://3.111.70.84:8089/api/v1/";
}

// console.log("BASE URL", BASE_Url);
