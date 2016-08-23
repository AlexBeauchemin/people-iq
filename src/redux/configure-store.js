import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers.js';

const env = process.env.NODE_ENV || 'production';
const logger = createLogger({
  level: 'info',
  collapsed: false,
  logger: console,
  predicate: (getState, action) => true
});
let enhancer = compose(applyMiddleware(thunkMiddleware));

if (env === 'test') enhancer = compose(applyMiddleware(thunkMiddleware, logger));

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, enhancer);
  return store;
}
