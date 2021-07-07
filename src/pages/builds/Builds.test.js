import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import { createStore } from 'store';

import App from 'components/app/App';
import Builds from './Builds';

describe('Builds list page', () => {
  let history;

  beforeAll(() => {
    history = createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0,
    });
  });

  it('should render builds list when builds array is in the store', () => {
    const store = createStore({
      preloadedState: {
        settings: {
          repoName: 'repo',
        },
        builds: [
          {
            id: '1',
            status: 'Waiting',
            buildNumber: 1,
            commitMessage: 'Message',
            branchName: 'master',
            authorName: 'Author',
            commitHash: '1q2w3e4r',
          },
        ],
      },
    });
    const buildsPage = (
      <Provider store={store}>
        <Builds loadData={() => {}} />
      </Provider>
    );

    const { getByTestId } = render(buildsPage);
    const buildsList = getByTestId('builds-list');
    expect(buildsList).toBeInTheDocument();
  });

  it('should render system message when there are no settings in the store', () => {
    const store = createStore({
      preloadedState: {
        settings: undefined,
      },
    });
    const buildsPage = (
      <Provider store={store}>
        <Builds loadData={() => {}} />
      </Provider>
    );

    const { getByTestId } = render(buildsPage);
    const buildsList = getByTestId('system-message-settings-unset');
    expect(buildsList).toBeInTheDocument();
  });

  it('should render Run build button when there are settings in the store', () => {
    const store = createStore({
      preloadedState: {
        settings: { repoName: 'repo' },
      },
    });
    const buildsPage = (
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    const { getByTestId } = render(buildsPage);
    const buildsList = getByTestId('header-control-run-build');
    expect(buildsList).toBeInTheDocument();
  });

  it('should render system message when there is pending request', () => {
    const store = createStore({
      preloadedState: {
        layout: {
          pending: {
            loading: true,
            fullscreen: true,
          },
        },
      },
    });
    const buildsPage = (
      <Provider store={store}>
        <Builds loadData={() => {}} />
      </Provider>
    );

    const { getByTestId } = render(buildsPage);
    const buildsList = getByTestId('system-message-pending');
    expect(buildsList).toBeInTheDocument();
  });
});
