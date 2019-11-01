import axios from "axios";
import { logout } from "../pages/Logout/index";
require("dotenv").config();

export const getToken = () =>
  localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  async config => {
    //200
    return config;
  },
  function(error) {
    // different from 200
    //console.log(error.response);
    if (
      error.response.status === 401 &&
      error.response.data.message === "Token expired."
    ) {
      console.log(error.response);
      logout();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;
