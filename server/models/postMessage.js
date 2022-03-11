import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        // array of ids
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

// creates PostMessage by using mongoose.model and the schema we just created
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;