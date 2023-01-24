import { ADD_TAG,GET_ALL_TAGS,TAG_LOADING,DELETE_TAG  } from './tagsTypes';
import axios from 'axios';

/*
    Payload : {
        tag: '',
        id; ''
    }
*/
export const addTag = (payload) => {
    return {
        type: ADD_TAG,
        payload
    }
}


export const getTags = (payload) => {
    return {
        type: GET_ALL_TAGS,
        payload
    }
}


export const tagLoading = (payload) => {
    return {
        type: TAG_LOADING,
        payload
    }
}

/*
    Payload : {
        id: ''
    }
*/
export const deleteTag = (payload) => {
    return {
        type: DELETE_TAG,
        payload
    }
}


export const addTagThunk = (payload) => async (dispatch) => {
    dispatch(tagLoading(true));
    try {
        const {data:{id}} = await axios.post('http://localhost:4000/api/addtag', { name: payload.name });
        dispatch(addTag({id ,name: payload.name}));
    }
    catch(err) {
        dispatch(tagLoading(false));
    }
}

export const getTagsThunk = () => async (dispatch) => {
    dispatch(tagLoading(true));
    try {
        const response = await axios.get("http://localhost:4000/api/gettags");
        const tags = response.data.data.map((tag) =>  { return {id: tag._id,name:tag.name}})
        dispatch(getTags({tags}));
    }   
    catch(err) {
        dispatch(tagLoading(false));
    }   
}

export const deleteTagThunk = (payload) => async (dispatch) => {
    dispatch(tagLoading(true));
    try {
        await axios.post('http://localhost:4000/api/deletetag',{ id : payload.id })
        dispatch(deleteTag(payload));
    }
    catch(err) {
        dispatch(tagLoading(false));
    }
}