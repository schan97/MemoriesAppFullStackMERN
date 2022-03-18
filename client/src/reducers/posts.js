import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes.js';

export default (state = [], action) => {

    switch(action.type){
        case DELETE:
            // return all the posts that don't include the one we just deleted 
            return state.filter((post) => post._id !== action.payload)
        case UPDATE:
        case LIKE:
            // checks if the post id matched the action payload id, 
            // if it does return the action payload, else return the original post
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                totalNumberOfPages: action.payload.totalNumberOfPages,
            };

        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload,
            };
        
        case CREATE:
            return [...state, action.payload];
        
        default:
            return state;
    }

};