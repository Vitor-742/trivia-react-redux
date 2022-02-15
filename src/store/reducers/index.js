import { combineReducers } from 'redux';
import login from './Login';
import token from './token';
import player from './player';

const rootReducer = combineReducers({ token, player, login });

export default rootReducer;
