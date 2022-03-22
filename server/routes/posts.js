// make sure to include file extensions for references
import express from "express";
import { getPost, getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost, commentPost } from "../controllers/postsController.js";
import auth from '../middleware/auth.js';

const router = express.Router();

// ROUTE = localhost:5000/posts/ -- look at index.js for prefix

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

export default router;