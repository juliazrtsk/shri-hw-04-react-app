import { configureStore } from '@reduxjs/toolkit';

import { buildsReducer } from './buildsSlice';
import { settingsReducer } from './settingsSlice';

export const createStore = (options) =>
  configureStore({
    reducer: {
      builds: buildsReducer,
      settings: settingsReducer,
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
