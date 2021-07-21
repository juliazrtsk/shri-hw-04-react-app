import {ApiInstance, ApiResponse, NewSettingsResponse, Settings} from "model";

export interface ApiSettingsService {
  getSettings: () => Promise<ApiResponse<Settings>>,
  updateSettings: (settings: Settings) => Promise<ApiResponse<unknown>>,
}

export default class SettingsService implements ApiSettingsService {
  private api: ApiInstance;

  constructor(api: ApiInstance) {
    this.api = api;
  }

  getSettings(): Promise<ApiResponse<Settings>> {
    return this.api.get<Settings>('/settings');
  }

  updateSettings(settings: Settings): Promise<ApiResponse<NewSettingsResponse>> {
    return this.api.post<NewSettingsResponse>('/settings', settings);
  }
}
