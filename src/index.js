import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from 'components/layout/Layout';
import { routes, paths } from 'router';

import './_variables.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} key={route.path}>
              <route.component />
            </Route>
          ))}
          <Redirect to={paths.home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
