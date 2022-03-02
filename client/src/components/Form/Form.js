import React, {useEffect, useState} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts.js';
    


const Form = ({currentId, setCurrentId}) => {

    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    // if current Id is not null find the post whose id is equal to it, else return null
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const classes = useStyles();
    const dispatch = useDispatch();

    // run this use effect when post changes
    useEffect(() => {
        if(post)
        {
            setPostData(post);
        }

    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if(currentId) // update post if id exists 
        {
            dispatch(updatePost(currentId, postData));
        }
        else // create post if id doesn't exist
        {
            dispatch(createPost(postData));
        }

        // clear form
        clear();
       
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    }
    
    return(
        <Paper>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                {/* if current id exists show Editing else show Creating */}
                <Typography variant='h6'>{currentId ? 'Editing':'Creating'} a Memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;