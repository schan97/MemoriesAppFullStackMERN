import * as api from '../api/index.js';
import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes.js';

// Action Creators are functions that return an action
export const getPosts = (page) => async (dispatch) => {

    try{
        const {data} = await api.fetchPosts(page);

        dispatch({
            type: FETCH_ALL,
            payload: data,
        });
    }
    catch(error){
        console.log(error.message);
    }
    
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    // we have to destructure the data twice, first because we are making an axios request
    // and second time because we put it in a new object with the property called data.
    // Look at the postsController and getPostsBySearch method on server side: 
    // we return res.json({data: posts});
    const {data: {data}} = await api.fetchPostsBySearch(searchQuery);

    dispatch({
      type: FETCH_BY_SEARCH,
      payload: data,
    });
  }
  catch(error){
    console.log(error);
  }
}

export const createPost = (post) => async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
  
      dispatch({ 
        type: CREATE, 
        payload: data 
      });
    } catch (error) {
      console.log(error.message);
    }
};


export const updatePost = (id, post) => async (dispatch) => {
  try{
    const {data} = await api.updatePost(id, post);
    
    dispatch({
      type: UPDATE,
      payload: data
    });
  }
  catch(error){
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try{
    await api.deletePost(id);

    dispatch({
      type: DELETE,
      payload: id
    });

  }
  catch(error){
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  try{
    const {data} = await api.likePost(id);

    dispatch({
      type: LIKE,
      payload: data,
    }); 
  }
  catch(error){
    console.log(error);
  }
}