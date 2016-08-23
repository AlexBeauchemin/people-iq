import { combineReducers } from 'redux';
import progress from './modules/progress.js';
import user from './modules/user.js';

const reducers = combineReducers({ progress, user });

export default reducers;
