import {
  createSlice,
  createAsyncThunk} from '@reduxjs/toolkit';

import {NewSettingsResponse, Settings, SettingsState, StoreConfigurationOptions, ErrorMessage} from "model";
import {RootState} from "./index";

const initialState: SettingsState = {
  repoName: '',
  buildCommand: '',
  mainBranch: '',
  period: '',
};

export const getSettings = createAsyncThunk<Settings, void, { extra: StoreConfigurationOptions, rejectValue: ErrorMessage}>(
  'settings/get',
  async (_, { rejectWithValue, extra: { settingsService } }) => {
    try {
      const { data } = await settingsService.getSettings();
      return data as Settings;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

export const updateSettings = createAsyncThunk<NewSettingsResponse, Settings, { extra: StoreConfigurationOptions, rejectValue: ErrorMessage}>(
  'settings/update',
  async (settings, { rejectWithValue, extra: { settingsService } }) => {
    try {
      const { data } = await settingsService.updateSettings(settings);
      return data as NewSettingsResponse;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettings.fulfilled, (state, action) => {
        return {
          ...action.payload,
          period: `${action.payload.period}`,
        }
      })
    .addCase(updateSettings.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    })
  },
});

export const settingsSelector = (state: RootState): SettingsState => state.settings;

export const { reducer: settingsReducer } = settingsSlice;
