import axios from "axios";
import { setRequestInterceptor } from "./interceptors/request";
import { setResponseInterceptor } from "./interceptors/response";

// 纯粹的微服务
export const pureFetch = axios.create();
setRequestInterceptor(pureFetch);
setResponseInterceptor(pureFetch);
