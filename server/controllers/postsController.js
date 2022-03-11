// make sure to import the models (also make sure to include file extensions in reference)
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


// https://www.restapitutorial.com/httpstatuscodes.html
export const getPosts = async (req, res) => {
    try{
        const allPostMessages = await PostMessage.find();

        res.status(200).json(allPostMessages);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}


export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

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