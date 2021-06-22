import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from 'components/layout/Layout';
import Settings from 'pages/settings/Settings';
import Build from 'pages/buildDetails/BuildDetails';
import BuildsList from 'pages/buildsList/BuildsList';
import routes from 'src/routes';

import './_variables.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path={routes.home} component={BuildsList} />
          <Route exact path={routes.settings} component={Settings} />
          <Route
            exact
            path={`${routes.build}/:buildNumber`}
            component={Build}
          />
          <Redirect to={routes.home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
