// make sure to incluse file extensions for references
import express from "express";
import { getPosts, createPost, updatePost, deletePost } from "../controllers/postsController.js";

const router = express.Router();

// ROUTE = localhost:5000/posts/ -- look at index.js for prefix
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;