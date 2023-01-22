import { ADD_BOOKMARK, READ_BOOKMARK, REMOVE_BOOKMARK, UPDATE_BOOKMARK } from './bookmarkTypes';

export const addBookmark = (payload) => {
    return {
        type: ADD_BOOKMARK,
        payload
    }
}


export const removeBookmark = (payload) => {
    return {
        type: REMOVE_BOOKMARK,
        payload
    }
}


export const updateBookmark = (payload) => {
    return {
        type: UPDATE_BOOKMARK,
        payload
    }
}

export const readBookmark = (payload) => {
    return {
        type: READ_BOOKMARK,
        payload
    }   
}

