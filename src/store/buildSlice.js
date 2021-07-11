import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendMetricEvent } from 'metrics';

const initialState = {
  details: null,
  log: null,
};

export const getBuildDetails = createAsyncThunk(
  'build/get-details',
  async (buildId, { rejectWithValue, extra: { buildsService } }) => {
    try {
      const { data } = await buildsService.getBuildDetails(buildId);
      return data;
    } catch (e) {
      return rejectWithValue(e.response.message);
    }
  }
);

export const getBuildLogs = createAsyncThunk(
  'build/get-logs',
  async (buildId, { rejectWithValue, extra: { buildsService } }) => {
    try {
      sendMetricEvent('getLogs', 'start');
      const result = await buildsService.getBuildLogs(buildId);
      sendMetricEvent('getLogs', 'end');
      return result;
    } catch (e) {
      sendMetricEvent('getLogs', 'end');
      return rejectWithValue(e.response.message);
    }
  }
);

export const addBuildToQueue = createAsyncThunk(
  'build/add-to-queue',
  async (commitHash, { rejectWithValue, extra: { buildsService } }) => {
    try {
      const { data } = await buildsService.addBuildToQueue(commitHash);
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

const buildSlice = createSlice({
  name: 'build',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getBuildDetails.fulfilled, (state, action) => {
      state.details = action.payload;
    });
    builder.addCase(getBuildLogs.fulfilled, (state, action) => {
      state.log = action.payload;
    });
  },
});

export const buildDetailsSelector = (state) => state.build.details;
export const buildLogSelector = (state) => state.build.log;

export const { reducer: buildReducer } = buildSlice;
