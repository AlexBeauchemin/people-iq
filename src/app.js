import 'babel-polyfill'; // Fix 'Symbol' is undefined in IE
import 'whatwg-fetch';

// import './styles/main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin'; // for material-ui, might be removed in the future

injectTapEventPlugin();


ReactDOM.render(<App />, document.getElementById('root'));
