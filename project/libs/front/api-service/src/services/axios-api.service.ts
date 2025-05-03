import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiService } from '../interfaces/api-service.interface';
import { ApiError } from '../interfaces/api-response.interface';

export class AxiosApiService implements ApiService {
  private static _instance: AxiosApiService;

  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  private readonly errorInterceptor = (error: unknown): Promise<ApiError> => {
    if (axios.isAxiosError(error) && error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  };

  private prepareAxiosParams(params?: RequestInit): AxiosRequestConfig {
    const headers: Record<string, string> = this.defaultHeaders;

    if (params?.headers) {
      Object.entries(params.headers).forEach(([key, value]) => {
        if (typeof value === 'string') {
          headers[key] = value;
        } else if (Array.isArray(value)) {
          headers[key] = value.join(', ');
        } else {
          headers[key] = JSON.stringify(value);
        }
      });
    }
    return {
      headers,
    };
  }

  constructor(
    private readonly baseURL = '',
    private readonly http = axios.create({
      responseType: 'json',
    }),
  ) {
    if (AxiosApiService._instance) {
      return AxiosApiService._instance;
    }
    AxiosApiService._instance = this;
    this.http.defaults.baseURL = this.baseURL;
    this.http.defaults.headers = {
      ...this.http.defaults.headers,
      ...this.defaultHeaders,
    };
    this.http.interceptors.response.use(undefined, this.errorInterceptor);
  }

  get<T>(url: string, params?: RequestInit): Promise<AxiosResponse<T>> {
    return this.http.get(url, this.prepareAxiosParams(params));
  }

  post<D, T>(
    url: string,
    body: D,
    params?: RequestInit,
  ): Promise<AxiosResponse<T>> {
    return this.http.post<T>(url, body, this.prepareAxiosParams(params));
  }

  put<D, T>(
    url: string,
    body: D,
    params?: RequestInit,
  ): Promise<AxiosResponse<T>> {
    return this.http.put<T>(url, body, this.prepareAxiosParams(params));
  }

  delete<T>(url: string, params?: RequestInit): Promise<AxiosResponse<T>> {
    return this.http.delete<T>(url, this.prepareAxiosParams(params));
  }
}
