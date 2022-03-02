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
    
};

export const createPost = (post) => async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
  
      dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
};


export const updatePost = (id, post) => async (dispatch) => {
  try{
    const {data} = await api.updatePost(id, post);
    
    dispatch({
      type: 'UPDATE',
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
      type: 'DELETE',
      payload: id
    });

  }
  catch(error){
    console.log(error);
  }
}