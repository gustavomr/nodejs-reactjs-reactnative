import axios from "axios";

const api = axios.create({
  baseURL: "http://10.32.49.149:3333"
});

export default api;
