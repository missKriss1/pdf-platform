import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://134.209.67.28:5000",
});

export default axiosApi;
