import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  repoName: '',
  buildCommand: '',
  mainBranch: '',
  period: '',
};

export const getSettings = createAsyncThunk(
  'settings/get',
  async (_, { extra: { settingsService } }) => {
    const { data } = await settingsService.getSettings();
    return data;
  }
);

export const updateSettings = createAsyncThunk(
  'settings/update',
  async (settings, { extra: { settingsService } }) => {
    const { data } = await settingsService.updateSettings(settings);
    return data;
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getSettings.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const settingsSelector = (state) => state.settings;

export const { reducer: settingsReducer } = settingsSlice;
