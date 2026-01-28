import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { triggerAuthLogout } from "./authEvents";
import { showErrorToast } from "@/lib/toast";
import { normalizeApiError } from "./apiError";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


let isRefreshing = false;

let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}[] = [];


const processQueue = ( isTokenRefreshed = false, error: unknown ) => {
  failedQueue.forEach((promise) => {
    if (isTokenRefreshed) {
      promise.resolve();
    } else {
      promise.reject(error);
    }
  });

  failedQueue = [];
};

// api.interceptors.response.use((response) => response, (error) => {...logic})
api.interceptors.response.use(

  (response) => response,

  async (error: AxiosError) => {

    const { message, status } = normalizeApiError(error);

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      skipAuthRefresh?: boolean;
    };

    //If unauthorized & not already retried
    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh
    ) {
      //prevent infinite loop
      originalRequest._retry = true;

      if (isRefreshing) {
        //wait for refresh to complete
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(originalRequest)),
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        await api.post("/users/refresh-token", null, {
          skipAuthRefresh: true
        });

        processQueue( true, null );
        return api(originalRequest);
      } catch (refreshError) {
        processQueue( false, refreshError );
        triggerAuthLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    showErrorToast(message)

    return Promise.reject(error);
  }
);

export default api;