import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../../config";

const AxiosClient = axios.create({
  baseURL: API_BASE_URL,
});

const authRequestInterceptor = (config: AxiosRequestConfig) => {
  // getting accessToken from local storage
  // maybe accessToken should be stored in cookies instead
  const accessToken = window.localStorage.getItem("accessToken");

  if (accessToken) {
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  if (config.headers) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
};

AxiosClient.interceptors.request.use(authRequestInterceptor);
// AxiosClient.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     const message: string = error.response?.data?.message || error.message;

//     // raise a message box

//     return Promise.reject(error);
//   }
// );

export default AxiosClient;
