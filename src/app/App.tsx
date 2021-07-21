import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import { routes, paths } from 'router';
import Layout from 'components/layout/Layout';

const App: React.FC = () => (
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

export default App;
