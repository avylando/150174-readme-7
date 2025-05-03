export interface ApiError {
  error: string;
  message: string[];
  statusCode: number;
}

export interface ApiSuccess<T> {
  data: T;
}

export type ApiResponse<T> = ApiError | ApiSuccess<T>;
