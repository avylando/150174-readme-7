import { Axios, AxiosResponse } from 'axios';
import { ApiService } from '../interfaces/api-service.interface';

export class AxiosApiService implements ApiService {
  constructor(private readonly http = new Axios()) {}

  get<T>(url: string, params?: RequestInit): Promise<AxiosResponse<T>> {
    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(params?.headers as Record<string, string>),
      },
    });
  }

  post<D, T>(url: string, body: D): Promise<AxiosResponse<T>> {
    return this.http.post<T>(url, body);
  }

  put<D, T>(url: string, body: D): Promise<AxiosResponse<T>> {
    return this.http.put<T>(url, body);
  }

  delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.http.delete<T>(url);
  }
}
