import {
  createSlice,
  createAction,
} from '@reduxjs/toolkit';

import {LayoutState} from "model";
import {RootState} from "./index";

const initialState: LayoutState = {
  pending: {
    loading: false,
    fullscreen: true,
  },
  networkError: null,
  modalShown: false,
};

export const setPending = createAction<LayoutState['pending']>('network/set-pending');
export const setNetworkError = createAction<LayoutState['networkError']>('network/set-error');
export const toggleModal = createAction('modal/toggle');

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPending, (state, action) => {
        state.pending = {
          loading: action.payload.loading,
          fullscreen: !!action.payload.fullscreen,
        };
      })
      .addCase(setNetworkError, (state, action) => {
        state.networkError = action.payload;
      })
      .addCase(toggleModal, (state) => {
        state.modalShown = !state.modalShown;
      })
  }
});

export const pendingSelector = (state: RootState): LayoutState['pending'] => state.layout.pending;
export const networkErrorSelector = (state: RootState): LayoutState['networkError'] => state.layout.networkError;
export const modalShownSelector = (state: RootState): LayoutState['modalShown'] => state.layout.modalShown;

export const { reducer: layoutReducer } = layoutSlice;
