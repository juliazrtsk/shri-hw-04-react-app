import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { createStore } from 'store';

import Api from 'api/Api';
import SettingsService from 'api/SettingsService';
import BuildsService from 'api/BuildsService';

import Builds from './Builds';

describe('Builds list page', () => {
  /*let history, settingsService, buildsService, mockApi;

  beforeAll(() => {
    mockApi = new Api();
    mockApi.get = jest.fn(() => Promise.resolve({
      data: []
    }));
    settingsService = new SettingsService(mockApi);
    buildsService = new BuildsService(mockApi);

    history = createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0,
    });
  });

  it('should send request for getting settings on open',  () => {
    const store = createStore({
      preloadedState: {
        builds: []
      },
      buildsService,
      settingsService
    });
    const app = (
      <Provider store={store}>
        <Router history={history}>
          <Provider store={store}>
            <App/>
          </Provider>
        </Router>
      </Provider>
    );

    render(app);

    screen.logTestingPlaygroundURL();
    // expect(mockApi.get).toHaveBeenCalledWith('/settings');
    // const page = getByTestId('page-settings');
    // expect(page).toBeTruthy();
  });*/

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

  it('should render system message when there is no settings in the store', () => {
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
