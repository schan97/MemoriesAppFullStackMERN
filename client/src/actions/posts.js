import * as api from '../api/index.js';

// Action Creators are functions that return an action
export const getPosts = () => async (dispatch) => {

    try{
        const {data} = await api.fetchPosts();

        dispatch({
            type: 'FETCH_ALL',
            payload: data,
        });
    }
    catch(error){
        console.log(error.message);
    }
    
}