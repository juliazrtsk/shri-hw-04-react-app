import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, waitFor } from '@testing-library/react';

import Api from 'api/Api';
import BuildsService from 'api/BuildsService';
import { createStore } from 'store';

import App from 'components/app/App';
import BuildDetails from './BuildDetails';

describe('Build details page', () => {
  let history, mockApi, buildsService;

  beforeAll(() => {
    mockApi = new Api();
    mockApi.get = jest.fn();
    mockApi.post = jest.fn();
    buildsService = new BuildsService(mockApi);
  });

  beforeEach(() => {
    history = createMemoryHistory({
      initialEntries: ['/build/1'],
      initialIndex: 0,
    });
  });

  it('should render Build details page on /build/:id route', async () => {
    const store = createStore({
      buildsService,
    });
    const app = (
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
    mockApi.get.mockReturnValueOnce({ data: null });
    mockApi.get.mockReturnValue(null);

    const { getByTestId } = render(app);
    await waitFor(() =>
      expect(getByTestId('page-build-details')).toBeInTheDocument()
    );
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
    const buildPage = (
      <Provider store={store}>
        <Router history={history}>
          <BuildDetails loadData={() => {}} />
        </Router>
      </Provider>
    );

    const { getByTestId } = render(buildPage);
    const message = getByTestId('system-message-pending');
    expect(message).toBeInTheDocument();
  });

  it('should send request for getting build details and log on open', async () => {
    const store = createStore({
      buildsService,
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
    mockApi.get.mockReturnValueOnce({ data: null });
    mockApi.get.mockReturnValue(null);

    render(app);
    await waitFor(() =>
      expect(mockApi.get.mock.calls).toEqual([
        ['/builds/1'],
        ['/builds/1/logs'],
      ])
    );
  });

  it('should render build details card and log if data was fetched successfully', async () => {
    const store = createStore({
      buildsService,
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
    mockApi.get.mockReturnValueOnce({
      data: {
        id: '1',
        buildNumber: 1,
        status: 'Waiting',
        commitMessage: 'Message',
        branchName: 'master',
        authorName: 'Author',
        commitHash: '1q2w3e4r',
      },
    });
    mockApi.get.mockReturnValue('log');

    const { getByTestId } = render(app);
    await waitFor(() => {
      expect(getByTestId('build-card')).toBeInTheDocument();
      expect(getByTestId('build-log')).toBeInTheDocument();
    });
  });
});
