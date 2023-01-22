import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { bookmarkReducer } from '../bookmark/bookmarkReducer'

export const store = createStore(combineReducers({bookmarks : bookmarkReducer}), applyMiddleware(thunk));