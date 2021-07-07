import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

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
});
