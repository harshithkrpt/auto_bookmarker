import { ADD_TAG, GET_ALL_TAGS,TAG_LOADING,DELETE_TAG } from './tagsTypes'

const initialState = {
    loading: false,
    error: '',
    tags: []
}

export const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TAG:
            return {
                ...state,
                loading: false,
                tags: [...state.tags , action.payload]
            }
        case GET_ALL_TAGS:
            return {
                ...state,
                loading: false,
                tags: [...action.payload.tags]
            }
        case TAG_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case DELETE_TAG:
            return {
                ...state,
                loading: false,
                tags: [...state.tags.filter(tag => tag.id !== action.payload.id)]
            }
        
        default:
            return state;
    }
}