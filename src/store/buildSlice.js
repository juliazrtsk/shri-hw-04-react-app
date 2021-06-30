import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  details: null,
  log: null,
};

export const getBuildDetails = createAsyncThunk(
  'build/get-details',
  async (buildId, { extra: { buildsService } }) => {
    const { data } = await buildsService.getBuildDetails(buildId);
    return data;
  }
);

export const getBuildLogs = createAsyncThunk(
  'build/get-logs',
  async (buildId, { extra: { buildsService } }) => {
    return await buildsService.getBuildLogs(buildId);
  }
);

export const addBuildToQueue = createAsyncThunk(
  'build/add-to-queue',
  async (commitHash, { extra: { buildsService } }) => {
    const { data } = await buildsService.addBuildToQueue(commitHash);
    return data;
  }
);

const buildSlice = createSlice({
  name: 'build',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getBuildDetails.fulfilled, (state, action) => {
      return { ...state, details: action.payload };
    });
    builder.addCase(getBuildLogs.fulfilled, (state, action) => {
      return { ...state, log: action.payload };
    });
  },
});

export const buildDetailsSelector = (state) => state.build.details;
export const buildLogSelector = (state) => state.build.log;

export const { reducer: buildReducer } = buildSlice;
