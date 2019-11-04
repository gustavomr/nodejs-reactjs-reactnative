import axios from "axios";
import { AsyncStorage } from "react-native";
const api = axios.create({
  baseURL: "http://10.32.49.149:3333"
});

export const getToken = () => AsyncStorage.getItem("token");

api.interceptors.request.use(async config => {
  const token = await getToken();
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
