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

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No post with that id');
    }

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});

    res.json(updatePost);


}