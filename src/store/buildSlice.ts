import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {
  BuildState,
  StoreConfigurationOptions,
  Build,
  BuildLog,
  NewBuildResponse,
  ErrorMessage
} from "model";
import {RootState} from "./index";

const initialState: BuildState = {
  details: null,
  log: null,
};

export const getBuildDetails = createAsyncThunk<Build, Build['id'], { extra: StoreConfigurationOptions, rejectValue: ErrorMessage}>(
  'build/get-details',
  async (buildId, { rejectWithValue, extra: { buildsService } }) => {
    try {
      const { data } = await buildsService.getBuildDetails(buildId);
      return data as Build;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

export const getBuildLogs = createAsyncThunk<BuildLog, Build['id'], { extra: StoreConfigurationOptions, rejectValue: ErrorMessage}>(
  'build/get-logs',
  async (buildId, { rejectWithValue, extra: { buildsService } }) => {
    try {
      const log = await buildsService.getBuildLogs(buildId);
      return log as unknown as BuildLog;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

export const addBuildToQueue = createAsyncThunk<NewBuildResponse, Build['commitHash'], { extra: StoreConfigurationOptions, rejectValue: ErrorMessage}>(
  'build/add-to-queue',
  async (commitHash, { rejectWithValue, extra: { buildsService } }) => {
    try {
      const { data } = await buildsService.addBuildToQueue(commitHash);
      return data as NewBuildResponse;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

const buildSlice = createSlice({
  name: 'build',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBuildDetails.fulfilled, (state, action) => {
        state.details = action.payload;
      })
      .addCase(getBuildLogs.fulfilled, (state, action) => {
        state.log = action.payload;
      });
  }
});

export const buildDetailsSelector = (state: RootState): BuildState['details'] => state.build.details;
export const buildLogSelector = (state: RootState): BuildState['log'] => state.build.log;

export const { reducer: buildReducer } = buildSlice;
