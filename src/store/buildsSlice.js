import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getBuilds = createAsyncThunk(
  'builds/get-list',
  async (_, { extra: { buildsService } }) => {
    const { data } = await buildsService.getBuildsList();
    return data;
  }
);

const buildsSlice = createSlice({
  name: 'builds',
  initialState: null,
  extraReducers: (builder) => {
    builder.addCase(getBuilds.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const buildsListSelector = (state) => state.builds;

export const { reducer: buildsReducer } = buildsSlice;
