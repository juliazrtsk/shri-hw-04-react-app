import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from 'components/layout/Layout';
import { paths, routes } from 'router';

const App = () => {
  return (
    <Layout>
      <Switch>
        {routes.map((route) => (
          <Route path={route.path} key={route.path}>
            <route.component loadData={route.loadData} />
          </Route>
        ))}
        <Redirect to={paths.home} />
      </Switch>
    </Layout>
  );
};

export default App;
