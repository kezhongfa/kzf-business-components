import { AxiosResponse, AxiosInstance, AxiosError } from "axios";

export function setResponseInterceptor(fetch: AxiosInstance) {
  fetch.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (error: AxiosError) => {
      return Promise.reject(error.response);
    }
  );
}
