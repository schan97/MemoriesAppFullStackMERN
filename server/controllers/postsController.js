// make sure to import the models (also make sure to include file extensions in reference)
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

    const newPost = newPostMessage(post);

    try{
        await newPost.save();

        res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({message: error.message});
    }
}