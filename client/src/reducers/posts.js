/* eslint-disable import/no-anonymous-default-export */
import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING } from '../constants/actionTypes.js';

export default (state = {isLoading: true, posts:[]}, action) => {

    switch(action.type){
        case START_LOADING:
            return{...state, isLoading: true};
            
        case END_LOADING:
            return{...state, isLoading: false};
       
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
            return {...state, posts:[...state.posts, action.payload]};
            
        case UPDATE:
        case LIKE:
            // checks if the post id matched the action payload id, 
            // if it does return the action payload, else return the original post
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        
        case DELETE:
            // return all the posts that don't include the one we just deleted 
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};
        default:
            return state;
    }

};