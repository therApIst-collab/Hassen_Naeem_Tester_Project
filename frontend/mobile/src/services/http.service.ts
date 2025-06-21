/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_URL } from "@env";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 20000,
});
// Add a request interceptor
instance.interceptors.request.use(function (config: any) {
  return {
    ...config,
    headers: {
      authorization: null,
    },
  };
});

export default instance;
