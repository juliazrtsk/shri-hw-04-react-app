import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  pending: {
    loading: false,
    fullscreen: true,
  },
  networkError: null,
  modalShown: false,
};

export const setPending = createAction('network/set-pending');
export const setNetworkError = createAction('network/set-error');
export const toggleModal = createAction('modal/toggle');

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(setPending, (state, action) => {
      state.pending = {
        loading: !!action.payload.loading,
        fullscreen: !!action.payload.fullscreen,
      };
    });
    builder.addCase(setNetworkError, (state, action) => {
      state.networkError = action.payload;
    });
    builder.addCase(toggleModal, (state) => {
      state.modalShown = !state.modalShown;
    });
  },
});

export const pendingSelector = (state) => state.layout.pending;
export const networkErrorSelector = (state) => state.layout.networkError;
export const modalShownSelector = (state) => state.layout.modalShown;

export const { reducer: layoutReducer } = layoutSlice;
