import axios from "axios";
import { AsyncStorage } from "react-native";
import NavigationService from "../services/NavigationService";

export const getToken = () => AsyncStorage.getItem("token");

export const logout = () => {
  AsyncStorage.removeItem("token");
  AsyncStorage.removeItem("user");
};

export const axiosReference = axios.create({
  baseURL: "http://10.32.49.149:3333"
});

axiosReference.interceptors.request.use(async config => {
  const token = await getToken();
  //console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosReference.interceptors.response.use(
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
      console.log("redirect");
      //console.log(error.response);
      logout();
      NavigationService.navigate("Login");
    }
    return Promise.reject(error);
  }
);

//export default api;
