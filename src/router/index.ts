import { matchPath } from 'react-router-dom';

import Settings from 'pages/settings/Settings';
import BuildsList from 'pages/buildsList/BuildsList';
import BuildDetails from 'pages/buildDetails/BuildDetails';

import { getSettings } from 'store/settingsSlice';
import { getBuilds } from 'store/buildsSlice';
import { getBuildDetails, getBuildLogs } from 'store/buildSlice';
import { setPending, setNetworkError } from 'store/layoutSlice';

import {Route, LocationMatch, PathConfig} from "model";
import {AppDispatch} from "store";

export const paths: PathConfig = {
  home: '/',
  settings: '/settings',
  build: '/build/:buildId',
} as const;

export const routes: Route[] = [
  {
    path: paths.build,
    component: BuildDetails,
    loadData: async (dispatch: AppDispatch, buildId: string): Promise<void> => {
      await dispatch(setPending({ loading: true, fullscreen: true }));
      const results = await Promise.all([
        dispatch(getBuildDetails(buildId)),
        dispatch(getBuildLogs(buildId)),
      ]);
      // @ts-ignore
      results.forEach(({ error }) => {
        if (error) {
          dispatch(setNetworkError(error));
        }
      });
      await dispatch(setPending({ loading: false }));
    },
  },
  {
    path: paths.settings,
    component: Settings,
    loadData: async (dispatch: AppDispatch): Promise<void> => {
      await dispatch(setPending({ loading: true, fullscreen: true }));
      // @ts-ignore
      const { error } = await dispatch(getSettings());
      if (error) {
        dispatch(setNetworkError(error));
      }
      dispatch(setPending({ loading: false }));
    },
  },
  {
    path: paths.home,
    component: BuildsList,
    loadData: async (dispatch: AppDispatch): Promise<void> => {
      await dispatch(setPending({ loading: true, fullscreen: true }));
      // @ts-ignore
      const { error, payload } = await dispatch(getSettings());
      if (!error && payload) {
        // @ts-ignore
        const { error } = await dispatch(getBuilds());
        if (error) {
          dispatch(setNetworkError(error));
        }
      } else {
        dispatch(setNetworkError(error));
      }
      dispatch(setPending({ loading: false }));
    },
  },
];

export const matchLocationToPath = (locationPath: string): LocationMatch =>
  routes.reduce((match: LocationMatch, route: Route) => {
    return match || matchPath(locationPath, { path: route.path });
  }, null);
