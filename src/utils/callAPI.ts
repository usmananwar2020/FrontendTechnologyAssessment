import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";

interface ApiRequestOptions {
  endpoint: string;
  method: Method;
  body?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

let axiosInstance: AxiosInstance | null = null;

const getAxiosInstance = (baseURL: string): AxiosInstance => {
  if (axiosInstance) {
    // update baseURL dynamically if needed
    axiosInstance.defaults.baseURL = baseURL;
    return axiosInstance;
  }

  axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // e.g., config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("[Response Error]", error);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const callApi = async <T = any>({
  endpoint,
  method,
  body,
  params,
  headers,
}: ApiRequestOptions): Promise<T> => {
  const axiosInstance = getAxiosInstance(process.env.REACT_APP_ENDPOINT ?? "");
  params = {
    ...params,
    'api-key':  process.env.React_APP_API_KEY
  }

  const config: AxiosRequestConfig = {
    url: endpoint,
    method,
    headers,
    params,
    data: body,
  };

  const response = await axiosInstance.request<T>(config);
  return response.data;
};
