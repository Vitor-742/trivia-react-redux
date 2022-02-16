import { combineReducers } from 'redux';
import token from './token';
import player from './player';
import questionsReducer from './questions';

const rootReducer = combineReducers({ token, player, questionsReducer });

export default rootReducer;
