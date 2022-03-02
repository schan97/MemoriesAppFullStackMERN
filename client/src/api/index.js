import axios from 'axios';

// url pointing to our backend route that we created and specified
const url = 'http://localhost:5000/posts'

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);