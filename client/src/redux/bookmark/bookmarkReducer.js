import { ADD_BOOKMARK, READ_BOOKMARK, REMOVE_BOOKMARK, UPDATE_BOOKMARK } from './bookmarkTypes';

const initialState = {
    loading: true,
    bookmarks: [],
    error: ''
}


export const bookmarkReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOKMARK:
            return {
                ...state,
                bookmarks: [...state.bookmarks, action.payload]
            };

        case READ_BOOKMARK:
            return state;

        case UPDATE_BOOKMARK:
            return {
                ...state,
                bookmarks: [...state.bookmarks.map(bookmark => bookmark.id !== action.payload.id ? bookmark : { ...action.payload })]
            };

        case REMOVE_BOOKMARK:
            return {
                ...state,
                bookmarks: [...state.bookmarks.filter(bookmark => bookmark.id !== action.payload.id)]
            }

        default:
            return state;
    }
}