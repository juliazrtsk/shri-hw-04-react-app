import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, waitFor } from '@testing-library/react';
import events from '@testing-library/user-event';

import { createStore } from 'store';

import Api from 'api/Api';
import SettingsService from 'api/SettingsService';
import BuildsService from 'api/BuildsService';

import App from 'components/app/App';
import Builds from './Builds';

describe('Builds list page', () => {
  let history, mockApi, settingsService, buildsService, modal;

  beforeAll(() => {
    modal = document.createElement('div');
    modal.setAttribute('id', 'modal');

    mockApi = new Api();
    mockApi.get = jest.fn();
    mockApi.post = jest.fn();
    settingsService = new SettingsService(mockApi);
    buildsService = new BuildsService(mockApi);
  });

  beforeEach(() => {
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
    const sysMessage = getByTestId('system-message-settings-unset');
    expect(sysMessage).toBeInTheDocument();
  });

  it('should redirect on /settings route on Open settings button click', () => {
    const store = createStore({
      preloadedState: {
        settings: undefined,
      },
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

  it('should send request for getting settings on open', async () => {
    const store = createStore({
      buildsService,
      settingsService,
    });
    const app = (
      <Provider store={store}>
        <Router history={history}>
          <Provider store={store}>
            <App />
          </Provider>
        </Router>
      </Provider>
    );
    mockApi.get.mockReturnValue({ data: {} });

    render(app);
    await waitFor(() =>
      expect(mockApi.get.mock.calls).toEqual([['/settings'], ['/builds']])
    );
  });
});
