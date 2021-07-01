import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  pending: false,
  modalShown: false,
};

export const setPending = createAction('pending/set');
export const toggleModal = createAction('modal/toggle');

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(setPending, (state, action) => {
      state.pending = action.payload;
    });
    builder.addCase(toggleModal, (state) => {
      state.modalShown = !state.modalShown;
    });
  },
});

export const pendingSelector = (state) => state.layout.pending;
export const modalShownSelector = (state) => state.layout.modalShown;

export const { reducer: layoutReducer } = layoutSlice;
