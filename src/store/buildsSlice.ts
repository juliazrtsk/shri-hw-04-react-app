import {
  createSlice,
  createAsyncThunk} from '@reduxjs/toolkit';

import {
  Build,
  BuildsState,
  ErrorMessage,
  StoreConfigurationOptions
} from "model";
import {RootState} from "./index";

const initialState: BuildsState = {
  list: null,
};

export const getBuilds = createAsyncThunk<Build[], void, { extra: StoreConfigurationOptions, rejectValue: ErrorMessage}>(
  'builds/get-list',
  async (_, { rejectWithValue, extra: { buildsService } }) => {
    try {
      const { data } = await buildsService.getBuildsList();
      return data as Build[];
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);

const buildsSlice = createSlice({
  name: 'builds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBuilds.fulfilled, (state, action) => {
      return {
        ...state,
        list: [...action.payload],
      };
    });
  },
});

export const buildsListSelector = (state: RootState): BuildsState['list'] => state.builds.list;

export const { reducer: buildsReducer } = buildsSlice;
