import {ApiBuildService} from "api/BuildsService";
import {ApiSettingsService} from "api/SettingsService";
import {Settings} from "./SettingsType";
import {Build} from "./BuildType";
import {ErrorMessage} from "./ApiType";

export type StoreConfigurationOptions = {
  buildsService: ApiBuildService;
  settingsService: ApiSettingsService;
}

export type LayoutState = {
  pending: {
    loading: boolean;
    fullscreen?: boolean;
  },
  networkError?: ErrorMessage | null;
  modalShown: boolean;
};

export type BuildsState = {
  list: Build[] | null
};

export type BuildState = {
  log: string | null;
  details: Build | null;
};

export interface SettingsState extends Omit<Settings, 'id' | 'period'> {
  period: string;
}

