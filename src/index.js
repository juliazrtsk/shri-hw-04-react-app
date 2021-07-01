import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from 'components/app/App';

import { createStore } from 'store';
import { buildsService, settingsService } from 'api';

import './_variables.css';
import './index.css';

const store = createStore({
  buildsService,
  settingsService,
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
