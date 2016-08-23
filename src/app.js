import 'babel-polyfill'; // Fix 'Symbol' is undefined in IE
import 'whatwg-fetch';

// import './styles/main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createRoutes from './router/routes.jsx';
import configureStore from './redux/configure-store.js';
import injectTapEventPlugin from 'react-tap-event-plugin'; // for material-ui, might be removed in the future

const store = configureStore();

injectTapEventPlugin();

ReactDOM.render((
  <Provider store={store}>
    {createRoutes(browserHistory)}
  </Provider>
), document.getElementById('root'));
