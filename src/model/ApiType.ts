import {AxiosError} from "axios";

export interface ApiInstance {
  get: <T>(...args: any[]) => Promise<ApiResponse<T>>;
  post: <T>(...args: any[]) => Promise<ApiResponse<T>>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export type ErrorMessage = string;

export type ApiError = AxiosError
