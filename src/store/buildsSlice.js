import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getBuilds = createAsyncThunk(
  'builds/get-list',
  async (_, { rejectWithValue, extra: { buildsService } }) => {
    try {
      const { data } = await buildsService.getBuildsList();
      return data;
    } catch (e) {
      return rejectWithValue(e.response.message);
    }
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
