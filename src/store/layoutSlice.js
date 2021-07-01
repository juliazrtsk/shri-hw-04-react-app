import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  pending: false,
};

export const setPending = createAction('pending/set');

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(setPending, (state, action) => {
      state.pending = action.payload;
    });
  },
});

export const pendingSelector = (state) => state.layout.pending;

export const { reducer: layoutReducer } = layoutSlice;
