import { matchPath } from 'react-router-dom';

import Settings from 'pages/settings/Settings';
import BuildsList from 'pages/buildsList/BuildsList';
import BuildDetails from 'pages/buildDetails/BuildDetails';

import { getSettings } from 'store/settingsSlice';
import { getBuilds } from 'store/buildsSlice';
import { getBuildDetails, getBuildLogs } from 'store/buildSlice';
import { setPending, setNetworkError } from 'store/layoutSlice';

export const paths = {
  home: '/',
  settings: '/settings',
  build: '/build/:buildId',
};

export const routes = [
  {
    path: paths.build,
    component: BuildDetails,
    loadData: async (dispatch, buildId) => {
      await dispatch(setPending({ loading: true, fullscreen: true }));
      const results = await Promise.all([
        dispatch(getBuildDetails(buildId)),
        dispatch(getBuildLogs(buildId)),
      ]);
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
    loadData: async (dispatch) => {
      await dispatch(setPending({ loading: true, fullscreen: true }));
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
    loadData: async (dispatch) => {
      await dispatch(setPending({ loading: true, fullscreen: true }));
      const { error, payload } = await dispatch(getSettings());
      if (!error && payload) {
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

export const matchLocationToPath = (locationPath) =>
  routes.reduce((match, route) => {
    return match || matchPath(locationPath, { path: route.path });
  }, null);
