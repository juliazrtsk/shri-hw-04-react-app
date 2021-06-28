import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from 'components/layout/Layout';
import { routes, paths } from 'router';
import { createStore } from 'store';
import { buildsService, settingsService } from 'api';

import './_variables.css';
import './index.css';

const store = createStore({
  buildsService,
  settingsService,
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
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
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
