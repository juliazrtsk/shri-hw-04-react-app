import { matchPath } from 'react-router-dom';

import Settings from 'pages/settings/Settings';
import BuildsList from 'pages/buildsList/BuildsList';
import BuildDetails from 'pages/buildDetails/BuildDetails';

import { getSettings } from 'store/settingsSlice';
import { getBuilds } from 'store/buildsSlice';

export const paths = {
  home: '/',
  settings: '/settings',
  build: '/build/:buildId',
};

export const routes = [
  {
    path: paths.build,
    component: BuildDetails,
    loadData: () => {},
  },
  {
    path: paths.settings,
    component: Settings,
    loadData: () => getSettings(),
  },
  {
    path: paths.home,
    component: BuildsList,
    loadData: () => getBuilds(),
  },
];

export const matchLocationToPath = (locationPath) =>
  routes.reduce((match, route) => {
    return match || matchPath(locationPath, { path: route.path });
  }, null);
