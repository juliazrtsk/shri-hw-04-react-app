import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, waitFor } from '@testing-library/react';

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
});
