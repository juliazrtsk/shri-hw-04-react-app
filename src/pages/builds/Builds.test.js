import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import events from '@testing-library/user-event';

import { createStore } from 'store';

import App from 'components/app/App';
import Builds from './Builds';

describe('Builds list page', () => {
  const modal = document.createElement('div');
  modal.setAttribute('id', 'modal');

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
    const sysMessage = getByTestId('system-message-settings-unset');
    expect(sysMessage).toBeInTheDocument();
  });

  it('should redirect on /settings route on Open settings button click', () => {
    const store = createStore({
      preloadedState: {
        settings: undefined,
      },
    });
    const history = createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0,
    });

    const buildsPage = (
      <Router history={history}>
        <Provider store={store}>
          <Builds loadData={() => {}} />
        </Provider>
      </Router>
    );

    const { getByTestId } = render(buildsPage);
    events.click(getByTestId('system-message-settings-btn'));

    expect(history.location.pathname).toBe('/settings');
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

  it('should show modal window after click on Run build button', () => {
    const store = createStore({
      preloadedState: {
        settings: { repoName: 'repo' },
      },
    });
    const history = createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0,
    });

    const buildsPage = (
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    const { getByTestId } = render(buildsPage, {
      container: document.body.appendChild(modal),
    });
    events.click(getByTestId('header-control-run-build'));

    const modalWindow = getByTestId('modal-run-build');
    expect(modalWindow).toBeInTheDocument();
  });
});
