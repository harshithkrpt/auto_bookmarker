import { ADD_BOOKMARK, READ_BOOKMARK, REMOVE_BOOKMARK, UPDATE_BOOKMARK,UPDATE_LOADING, FETCH_DATA_FAILURE,FETCH_DATA_SUCCESS } from './bookmarkTypes';
import axios from 'axios';

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

export const fetchLoading = () => {
    return {
        type: UPDATE_LOADING
    }
}

export const fetchDataSuccess = (payload) => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload
    }
}

export const fetchDataFailure = (payload) => {
    return {
        type: FETCH_DATA_FAILURE,
        payload
    }
}

export const fetchBookMarks = () => async (dispatch) => {
    dispatch(fetchLoading());
    try {
        const response = await axios.get('https://fakerapi.it/api/v1/books?_quantity=10');
        let booksmarks = [];
        response.data.data.forEach(item => {
            booksmarks.push({id: item.isbn, currentBookmarkValue: item.image})
        });
        dispatch(fetchDataSuccess(booksmarks));
    }
    catch(err) {
        dispatch(fetchDataFailure(err.message));
    }
}