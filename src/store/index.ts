import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {StoreConfigurationOptions} from "model";

import {buildsService, settingsService} from "api";
import { buildReducer } from './buildSlice';
import { buildsReducer } from './buildsSlice';
import { settingsReducer } from './settingsSlice';
import { layoutReducer } from './layoutSlice';

const rootReducer = combineReducers({
  build: buildReducer,
  builds: buildsReducer,
  settings: settingsReducer,
  layout: layoutReducer,
});

export const createStore = (options: StoreConfigurationOptions) =>
  configureStore({
    reducer: rootReducer,
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

export const store = createStore({
  buildsService,
  settingsService,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
