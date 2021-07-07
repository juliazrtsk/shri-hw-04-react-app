import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { createStore } from 'store';

import Builds from './Builds';

describe('Builds list page', () => {
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
});
