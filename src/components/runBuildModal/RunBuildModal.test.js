import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { createStore } from 'store';

import RunBuildModal from './RunBuildModal';

describe('Run build modal', () => {
  let modalRoot;

  beforeAll(() => {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
  });

  it('should have disabled Run button if input is empty', () => {
    const store = createStore({
      preloadedState: {
        settings: { repoName: 'repo' },
      },
    });

    const modal = (
      <Provider store={store}>
        <RunBuildModal onClose={() => {}} />
      </Provider>
    );
    const { getByTestId } = render(modal, {
      container: document.body.appendChild(modalRoot),
    });

    const runButton = getByTestId('modal-build-button-run');
    expect(runButton).toHaveAttribute('disabled');
  });

  it('should have all buttons disabled while request is pending', () => {
    const store = createStore({
      preloadedState: {
        settings: { repoName: 'repo' },
        layout: {
          pending: {
            loading: true,
          },
        },
      },
    });

    const modal = (
      <Provider store={store}>
        <RunBuildModal onClose={() => {}} />
      </Provider>
    );
    const { getByTestId } = render(modal, {
      container: document.body.appendChild(modalRoot),
    });

    const runButton = getByTestId('modal-build-button-run');
    const cancelButton = getByTestId('modal-build-button-cancel');

    expect(runButton).toHaveAttribute('disabled');
    expect(cancelButton).toHaveAttribute('disabled');
  });
});
