import { configureStore } from '@reduxjs/toolkit';

import { buildsReducer } from './buildsSlice';

export const createStore = (options) =>
  configureStore({
    reducer: {
      builds: buildsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            buildsService: options.buildsService,
            settingsService: options.settingsService,
          },
        },
      }),
  });
