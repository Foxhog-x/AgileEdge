import { useRef } from "react";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
// import { useBackdropStore } from "../store/loader/backdropLoaderStore";
// import { getUserData, removeUserData } from "../localStorage/authUtils";
import {
  addTokenData,
  getTokenData,
  removeTokenData,
} from "../../localStorage/authUtil";
import { urls } from "../urls/urls";
// import { urls } from "./urls";
// import { useAuthStore } from "../store/auth/authStore";
// import { useToastStore } from "../store/snackbar/toastStore";

const useCustomAxios = (contentType = "application/json") => {
  // const { showBackdrop, hideBackdrop } = useBackdropStore();
  // const { setLoggedOut } = useAuthStore();
  // const { showToast } = useToastStore();
  const userToken = getTokenData();
  const customAxiosRef = useRef<AxiosInstance | null>(null);

  if (!customAxiosRef.current) {
    customAxiosRef.current = axios.create({
      // baseURL: urls.baseURL,
      baseURL: urls.baseUrl,
      headers: {
        "Content-Type": contentType,
      },
    });

    // Add request interceptors
    customAxiosRef.current.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // showBackdrop();
        if (userToken) {
          config.headers.Authorization = `Bearer ${userToken}`;
        }
        // Add authorization logic here if needed
        return config;
      },
      (error: AxiosError) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          // showToast("Logging out due to unauthorized request", "danger");
          // removeUserData();
          // setLoggedOut();
        } else {
          // showToast("Network Error", "danger");
        }
        // hideBackdrop();
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    // Add response interceptors
    customAxiosRef.current.interceptors.response.use(
      (response: AxiosResponse) => {
        // hideBackdrop();

        // Handle response logic here if needed
        return response;
      },
      (error: AxiosError) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          // showToast("Logging out due to unauthorized request", "warning");
          removeTokenData();
          // setLoggedOut();
        } else {
          // showToast("Network Error", "danger");
        }
        // hideBackdrop();
        console.error("Response error:", error);
        return Promise.reject(error);
      }
    );
  }

  return customAxiosRef.current;
};

export default useCustomAxios;
