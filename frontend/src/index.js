import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import "./App.css";
import App from './App';
import * as serviceWorker from './serviceWorker';

import Store from './store';

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.unregister();

