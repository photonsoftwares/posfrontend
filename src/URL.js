export let BASE_Url = "";
export let Email_Url = "";
export let host = "";
export const isDev = true;

if (isDev === true) {
  BASE_Url = "http://3.111.70.84:8088/test/api/v1";
  Email_Url = "http://3.111.70.84:8088/test/";
  host = "http://3.111.70.84:8088/test/api/v1/";
} else if (isDev === false) {
  BASE_Url = "https://pos.photonsoftwares.com/prod/api/v1";
  Email_Url = "https://pos.photonsoftwares.com/prod/";
  host = "https://pos.photonsoftwares.com/prod/api/v1/";
}
