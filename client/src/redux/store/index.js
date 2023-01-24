import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { bookmarkReducer } from '../bookmark/bookmarkReducer'
import { tagsReducer } from '../tags/tagsReducer';

export const store = createStore(combineReducers({bookmarks : bookmarkReducer,tags: tagsReducer}), applyMiddleware(thunk,logger));