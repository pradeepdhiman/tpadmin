let BACKEND_SERVER = null;
if (process.env.REACT_APP_BACKEND_SERVER) {
  BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
} else {
  BACKEND_SERVER = "https://localhost:7208/api/";
}

export const API_SERVER = BACKEND_SERVER;
export const ADMIN = 1;
export const USER = 2;


const { protocol, host } = window.location;

let _apiBaseUrl, _apiUrl;

if (window.location.href.indexOf('localhost') === -1) {
  const cleanedHost = host.replace('admin.', '');

  _apiBaseUrl = `${protocol}//service.${cleanedHost}/`;
  _apiUrl = `${protocol}//service.${cleanedHost}/api/`;
} else {
  _apiBaseUrl = "https://localhost:7208/api/";
  _apiUrl = "https://localhost:7208/api/";
}


console.log(_apiUrl, "_apiUrl")

export { _apiBaseUrl, _apiUrl };
