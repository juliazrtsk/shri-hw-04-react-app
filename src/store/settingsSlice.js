import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  repoName: '',
  buildCommand: '',
  mainBranch: '',
  period: '',
};

export const getSettings = createAsyncThunk(
  'settings/get',
  async (_, { rejectWithValue, extra: { settingsService } }) => {
    try {
      const { data } = await settingsService.getSettings();
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/update',
  async (settings, { rejectWithValue, extra: { settingsService } }) => {
    try {
      const { data } = await settingsService.updateSettings(settings);
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getSettings.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updateSettings.rejected, (state, action) => {
      return action.payload;
    });
  },
});

export const settingsSelector = (state) => state.settings;

export const { reducer: settingsReducer } = settingsSlice;
