// make sure to incluse file extensions for references
import express from "express";
import { getPosts, createPost } from "../controllers/postsController.js";

const router = express.Router();

// ROUTE = localhost:5000/posts/ -- look at index.js for prefix
router.get('/', getPosts);
router.post('/', createPost)

export default router;