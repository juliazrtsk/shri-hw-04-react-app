import axios from 'axios';
import {ApiInstance, ApiResponse} from "model";

const API = process.env.REACT_APP_API_URL || '';

class Api implements ApiInstance {
  async get<T>(path: string, params: Record<string, unknown>): Promise<ApiResponse<T>> {
    const url = `${API}${path}`;
    const response = await axios.get(url, { params });
    return response.data;
  }

  async post<T>(path: string, data: Record<string, unknown>, params: Record<string, unknown>): Promise<ApiResponse<T>> {
    const url = `${API}${path}`;
    const response = await axios.post(url, data, { params });
    return response.data;
  }
}

export default Api;
