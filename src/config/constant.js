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

let _apiBaseUrl, _apiUrl, _sourcePath, _ws ;

if (window.location.href.indexOf('localhost') === -1) {
  const cleanedHost = host.replace('admin.', '');

  _apiBaseUrl = `${protocol}//service.${cleanedHost}/`;
  _apiUrl = `${protocol}//service.${cleanedHost}/api/`;
  _sourcePath = `${protocol}//service.${cleanedHost}/`;
  _ws = `wss//service.${cleanedHost}/notificationHub`;
} else {
  _apiBaseUrl = "https://localhost:7208/api/";
  _apiUrl = "https://localhost:7208/api/";
  _sourcePath = "https://localhost:7208/";
  _ws = "wss://localhost:7208/notificationHub"
}


console.log(_apiUrl, "_apiUrl")
console.log(_ws, "_ws)")

export { _apiBaseUrl, _apiUrl, _sourcePath, _ws };

// let _apiBaseUrl, _apiUrl, _sourcePath;

// _apiBaseUrl="http://service.compliance360.bilberrysolutions.com/api/"
// _apiUrl="http://service.compliance360.bilberrysolutions.com/api/"
// _sourcePath="http://service.compliance360.bilberrysolutions.com/"

// export const API_SERVER = _apiUrl
// export { _apiBaseUrl, _apiUrl, _sourcePath };