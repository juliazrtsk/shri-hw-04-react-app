import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, queryAllByRole } from '@testing-library/react';

import { createStore } from 'store';
import Layout from 'components/layout/Layout';

describe('Layout', () => {
  let history;

  beforeAll(() => {
    history = createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0,
    });
  });

  it('should contain error message if there is error data in store', () => {
    const store = createStore({
      preloadedState: {
        layout: {
          networkError: {
            message: 'Request failed with status code 500',
          },
        },
      },
    });

    const layout = (
      <Router history={history}>
        <Provider store={store}>
          <Layout />
        </Provider>
      </Router>
    );

    const { getByTestId } = render(layout);
    const systemMessage = getByTestId('system-message-error');
    expect(systemMessage).toBeInTheDocument();
  });

  it('should not have any buttons in the header at /settings route', () => {
    const store = createStore({});
    const history = createMemoryHistory({
      initialEntries: ['/settings'],
      initialIndex: 0,
    });
    const layout = (
      <Router history={history}>
        <Provider store={store}>
          <Layout />
        </Provider>
      </Router>
    );

    const { getByTestId } = render(layout);
    const controls = getByTestId('layout-controls');
    const buttons = queryAllByRole(controls, 'button');

    expect(buttons.length).toBe(0);
  });

  it('should have Run build and Settings buttons in the header at / route', () => {
    const store = createStore({
      preloadedState: {
        settings: { repoName: 'repo' },
      },
    });
    const history = createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0,
    });
    const layout = (
      <Router history={history}>
        <Provider store={store}>
          <Layout />
        </Provider>
      </Router>
    );

    const { getByTestId } = render(layout);
    const runBuildBtn = getByTestId('header-control-run-build');
    const settingsBtn = getByTestId('header-control-settings');

    expect(runBuildBtn).toBeInTheDocument();
    expect(settingsBtn).toBeInTheDocument();
  });

  it('should have Rebuild and Settings buttons in the header at /build/:id route', () => {
    const store = createStore({
      preloadedState: {
        settings: { repoName: 'repo' },
      },
    });
    const history = createMemoryHistory({
      initialEntries: ['/build/1'],
      initialIndex: 0,
    });
    const layout = (
      <Router history={history}>
        <Provider store={store}>
          <Layout />
        </Provider>
      </Router>
    );

    const { getByTestId } = render(layout);
    const rebuildBtn = getByTestId('header-control-rebuild');
    const settingsBtn = getByTestId('header-control-settings');

    expect(rebuildBtn).toBeInTheDocument();
    expect(settingsBtn).toBeInTheDocument();
  });
});
