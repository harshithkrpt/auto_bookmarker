import { ADD_BOOKMARK, READ_BOOKMARK, REMOVE_BOOKMARK, UPDATE_BOOKMARK, UPDATE_LOADING, FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS } from './bookmarkTypes';
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
        const response = await axios.get('http://localhost:4000/api/getbookmarks');
        let booksmarks = [];
        response.data.data.forEach(item => {
            booksmarks.push({ id: item._id, currentBookmarkValue: item.currentBookmarkValue })
        });
        dispatch(fetchDataSuccess(booksmarks));
    }
    catch (err) {
        dispatch(fetchDataFailure(err.message));
    }
}

export const addBookmarkThunk = (payload) => async (dispatch) => {
    try {
        const { data : {  id }} = await axios.post('http://localhost:4000/api/addbookmark', {
            currentBookmarkValue : payload.currentBookmarkValue
        })
        dispatch(addBookmark({id , currentBookmarkValue: payload.currentBookmarkValue}));
    }
    catch (err) {
        dispatch(fetchDataFailure(err.message));
    }
}

export const deleteBookmarkThunk = (payload) => async (dispatch) => {
    try {
        await axios.post('http://localhost:4000/api/deletebookmark',{
            id : payload.id
        });
        dispatch(removeBookmark(payload));
    }
    catch(err) {
        dispatch(fetchDataFailure(err.message));
    }
}

export const updateBookmarkThunk = (payload) => async (dispatch) => {
    try {
        await axios.post('http://localhost:4000/api/updatebookmark',{
            id : payload.id,
            currentBookmarkValue : payload.currentBookmarkValue
        });
        dispatch(updateBookmark(payload));
    }
    catch(err) {
        dispatch(fetchDataFailure(err.message));
    }
}