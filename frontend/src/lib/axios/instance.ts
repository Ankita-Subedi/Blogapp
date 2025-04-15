import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
});
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found. Please login.");
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
export default instance;
