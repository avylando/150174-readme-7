import { ApiResponse } from './api-response.interface';

export interface ApiService {
  get<T>(url: string, params?: RequestInit): Promise<ApiResponse<T>>;
  post<D, T>(url: string, data: D): Promise<ApiResponse<T>>;
  put<D, T>(url: string, data: D): Promise<ApiResponse<T>>;
  delete<T>(url: string): Promise<ApiResponse<T>>;
}
