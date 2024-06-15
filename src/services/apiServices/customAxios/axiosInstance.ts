import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import { urls } from "../urls/urls";
import { getTokenData } from "../../localStorage/authUtil";

export const axiosInstance = axios.create({
  baseURL: urls.baseUrl,
  headers: { Accept: "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    console.log("request is intercepting");
    config.headers = {
      Authorization: `Bearer ${getTokenData}`,
    } as AxiosRequestHeaders;
    return config;
  },
  (error) => {
    Promise.reject(error);
    if (error.response.status === 401) console.log("Session expired");
  }
);
