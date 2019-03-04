import 'babel-polyfill';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import transit from 'transit-immutable-js';

import configure from 'store/configure';
import App from 'components/App';
import huremSocket from 'lib/socket/huremSocket';

const preloadedState = window.__PRELOADED_STATE__ && transit.fromJSON(window.__PRELOADED_STATE__);

const store = configure(preloadedState);

const socketURI = process.env.NODE_ENV === 'production' ? 
  ((window.location.protocol === 'https:') ? "wss://" : "ws://") + window.location.host + "/ws"
  : 'ws://localhost:4000/ws';

huremSocket.initialize(store, socketURI);

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

export default hot(module)(Root);
