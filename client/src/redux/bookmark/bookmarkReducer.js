import { ADD_BOOKMARK, FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS, READ_BOOKMARK, REMOVE_BOOKMARK, UPDATE_BOOKMARK, UPDATE_LOADING } from './bookmarkTypes';

const initialState = {
    loading: false,
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
        
        case UPDATE_LOADING:
            return {
                ...state,
                loading: true
            }

        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                bookmarks: [...action.payload],
                loading: false
            }
        
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            
        default:
            return state;
    }
}