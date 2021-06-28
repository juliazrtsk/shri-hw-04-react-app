import { matchPath } from 'react-router-dom';

import Settings from 'pages/settings/Settings';
import BuildsList from 'pages/buildsList/BuildsList';
import BuildDetails from 'pages/buildDetails/BuildDetails';

export const paths = {
  home: '/',
  settings: '/settings',
  build: '/build/:buildId',
};

export const routes = [
  {
    path: paths.build,
    component: BuildDetails,
  },
  {
    path: paths.settings,
    component: Settings,
  },
  {
    path: paths.home,
    component: BuildsList,
  },
];

export const matchLocationToPath = (locationPath) =>
  routes.reduce((match, route) => {
    return match || matchPath(locationPath, { path: route.path });
  }, null);
