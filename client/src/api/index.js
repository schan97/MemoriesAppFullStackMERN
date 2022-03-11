import axios from 'axios';

// url pointing to our backend route that we created and specified
// const url = 'https://app-memories-proj.herokuapp.com/posts'
// const url = 'http://localhost:5000/posts'

const API = axios.create({baseURL: 'http://localhost:5000'})

export const fetchPosts = () => axios.get('/posts');
export const createPost = (newPost) => axios.post('/posts', newPost);
export const updatePost = (id, updatedPost) => axios.patch(`'/posts'/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`'/posts'/${id}`);
export const likePost = (id) => axios.patch(`'/posts'/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formData) => API.post('/user/signup',formData);