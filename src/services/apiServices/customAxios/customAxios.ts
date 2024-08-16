import { useRef } from "react";
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getTokenData, removeTokenData } from "../../localStorage/authUtil";
import { urls } from "../urls/urls";
import useBackdropStore from "../../../store/useBackdropStore";

const useCustomAxios = (contentType = "application/json") => {
  const userToken = getTokenData();
  const customAxiosRef = useRef<AxiosInstance | null>(null);
  const { showBackdrop, hideBackdrop } = useBackdropStore();
  if (!customAxiosRef.current) {
    customAxiosRef.current = axios.create({
      baseURL: urls.baseUrl,
      headers: {
        "Content-Type": contentType,
      },
    });

    // Request interceptor
    customAxiosRef.current.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (userToken) {
          config.headers.Authorization = `Bearer ${userToken}`;
        }
        showBackdrop()
        return config;
      },
      (error: AxiosError) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      },
    );
  
    // Response interceptor
    customAxiosRef.current.interceptors.response.use(
      
      (response: AxiosResponse) => {
        hideBackdrop()
        return response;

        
      },
      (error: AxiosError) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        )
          removeTokenData();
        console.error("Response error:", error);
        return Promise.reject(error);
      },
    );
  
  }

  return customAxiosRef.current;
};

export default useCustomAxios;
