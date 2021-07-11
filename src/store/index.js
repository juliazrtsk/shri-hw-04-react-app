import { configureStore } from '@reduxjs/toolkit';

import { buildReducer } from './buildSlice';
import { buildsReducer } from './buildsSlice';
import { settingsReducer } from './settingsSlice';
import { layoutReducer } from './layoutSlice';

export const createStore = (options) =>
  configureStore({
    reducer: {
      build: buildReducer,
      builds: buildsReducer,
      settings: settingsReducer,
      layout: layoutReducer,
    },
    preloadedState: options.preloadedState,
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
