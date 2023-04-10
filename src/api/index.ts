import axios, { AxiosError, HttpStatusCode } from "axios";
import { AuthResponse, ServerErrors } from "../types/api";
import { Token } from "../util/token";
export const API_URL = "http://localhost:8000/api";

export const api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

export function isAxiosError<ResponseType>(error: unknown): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}

export const getErrors = (e: any) => {
  if (isAxiosError<ServerErrors>(e)) {
    const errors = e.response?.data.errors;
    if (!errors) {
      return;
    }
    const parsed = Object.entries(errors).map(([key, errors]) => [key.toLowerCase(), typeof (errors) === "string" ? errors : errors[0]]);
    return Object.fromEntries(parsed);
  }
};

api.interceptors.request.use((config) => {
  config.headers.set("Access-Control-Allow-Origin", "*");
  if (config.data && Object.keys(config.data).length === 0) {
    config.headers.set("Content-Type", "multipart/form-data");
  } else {
    config.headers.set("Content-Type", "application/json");
  }
  let access = Token.getAccess();
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

const createResponseInterceptor = () => {
  const interceptor = api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status !== HttpStatusCode.Unauthorized) {
        return Promise.reject(error);
      }

      api.interceptors.response.eject(interceptor);

      return api.post<AuthResponse>("/users/login/refresh/", { refresh: Token.getRefresh() })
        .then((response) => {
          Token.save(response.data);
          error.response.config.headers.Authorization = `Bearer ${response.data.access}`;
          return api(error.response.config);
        })
        .catch((error2) => {
          Token.drop();
          // redirect to login?
          return Promise.reject(error2);
        })
        .finally(createResponseInterceptor);
    }
  );
};

createResponseInterceptor();
