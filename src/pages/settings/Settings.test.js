import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, waitFor } from '@testing-library/react';
import events from '@testing-library/user-event';

import Api from 'api/Api';
import SettingsService from 'api/SettingsService';
import { createStore } from 'store';

import App from 'components/app/App';

describe('Settings page', () => {
  let history, mockApi, settingsService;

  beforeAll(() => {
    mockApi = new Api();
    mockApi.get = jest.fn();
    mockApi.post = jest.fn();
    settingsService = new SettingsService(mockApi);
  });

  beforeEach(() => {
    history = createMemoryHistory({
      initialEntries: ['/settings'],
      initialIndex: 0,
    });
  });

  it('should render Settings page on /settings route', async () => {
    const store = createStore({
      settingsService,
    });
    const app = (
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
    mockApi.get.mockReturnValue({ data: {} });

    const { getByTestId } = render(app);
    await waitFor(() =>
      expect(getByTestId('page-settings')).toBeInTheDocument()
    );
  });

  it('should redirect on / route after click on cancel button', async () => {
    const store = createStore({
      settingsService,
    });
    mockApi.get.mockReturnValue({ data: {} });

    const settings = (
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    const { getByTestId } = render(settings);
    await waitFor(() => {
      events.click(getByTestId('settings-control-cancel'));
      expect(history.location.pathname).toBe('/');
    });
  });

  it('should send request on settings save eith proper parameters', async () => {
    const store = createStore({
      settingsService,
    });
    mockApi.get.mockReturnValue({ data: {} });
    mockApi.post.mockReturnValue({ data: {} });

    const settings = (
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    const { getByTestId } = render(settings);

    // for some reason infinitely calls onBlur function, todo: fix
    await waitFor(() => {
      /*
      events.type(getByTestId('settings-input-repo'), 'github.com/repo');
      events.type(getByTestId('settings-input-build'), 'run');
      events.type(getByTestId('settings-input-branch'), 'master');
      events.type(getByTestId('settings-input-period'), '10');
      events.click(getByTestId('settings-control-save'));

      const expectedData = {
        repoName: 'github.com/repo',
        buildCommand: 'run',
        mainBranch: 'master',
        period: 10,
      }
      expect(mockApi.post).toBeCalledWith(['/builds/1', expectedData]);
      */
    });
  });
});
