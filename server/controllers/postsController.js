// make sure to import the models (also make sure to include file extensions in reference)
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


// https://www.restapitutorial.com/httpstatuscodes.html
export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPosts = async (req, res) => {
    const {page} = req.query;

    try{
        // limit the number of results per page
        const LIMIT = 8;
        // get the starting index of every page
        const startIndex = (Number(page) - 1) * LIMIT; 
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({data: posts, currentPage: Number(page), totalNumberOfPages: Math.ceil(total / LIMIT)});
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

// Query -> /posts?page=1 -> page = 1
// Params -> /posts/123 -> id = 123

export const getPostsBySearch = async (req, res) => {

    // grabbing searchQuery and tags from the request query
    const {searchQuery, tags} = req.query

    try{
        const title = new RegExp(searchQuery, 'i'); // i flag means ignore case, example: "Test", "TEST", "TeSt"

        // $or means to find the posts based on the search term or tags
        // $in means is there a tag in the tags array that matches our query
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({data: posts});
    }
    catch(error){
        res.status(404).json({message: error});
    }
}


export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try{
        await newPost.save();

        res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}


export const updatePost = async (req, res) => {

    // we are getting id from the route using req.params and aliasing it as _id;
    const { id: _id } = req.params;
    //const { title, message, creator, selectedFile, tags } = req.body;
    const post = req.body;

    // checks if the id is a mongoose object id
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No post with that id');
    }


    //const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    // we are getting id from the route using req.params;
    const { id } = req.params;

    // checks if the id is a mongoose object id
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No post with that id');
    }

    await PostMessage.findByIdAndDelete(id);

    return res.json({message: `Post deleted successfully`});

}

export const likePost = async (req, res) => {
    const {id} = req.params;

    // checks user authentication
    if(!req.userId) return (res.json({message: 'Unauthenticated'}));

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No post with that id');
    }

    const post = await PostMessage.findById(id);

    // checks if the user already liked this specific post
    const index = post.likes.findIndex((id) => id === String(req.userId));

    // index will equal -1 if their id wasn't found in the post likes
    if(index === -1){
        // like the post
        post.likes.push(req.userId);
    }
    else{
        // dislike the post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost);


}