const API_URL = "http://51.255.8.253/baladiya/";

export const setToken = (token) => {
  sessionStorage.setItem("token", token);
};

export const getToken = (token) => {
  return sessionStorage.getItem("token");
};

export const removeToken = () => {
  sessionStorage.removeItem("token");
};

export { API_URL };
