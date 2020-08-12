import { AxiosRequestConfig, AxiosInstance, AxiosError } from "axios";

export function setRequestInterceptor(fetch: AxiosInstance) {
  fetch.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
}
