import React, {useState, useRef} from 'react';
import {Typography, TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import { commentPost } from '../../actions/posts.js';

import useStyles from './styles.js';
import { mergeClasses } from '@material-ui/styles';

const CommentSection = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`

        // gets the response of the latest comments array
        const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

        // update the comments after posting
        setComments(newComments);

        // clears the comment input field
        setComment("");

        // scrolls to the anchor/ref point we declared
        commentsRef.current.scrollIntoView({behavior: 'smooth'});

    };

    return(
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((comment, index) => (
                        <Typography key={index} gutterBottom variant='subtitle1'>
                            {/* Bold the name */}
                            <strong>{comment.split(':')[0]}</strong>
                            :
                            {/* Actual comment */}
                            {comment.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>

                {user?.result?.name && (
                <div style={{width: '70%'}}>
                    <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant='outlined'
                        label='Comment'
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleClick}>
                        Comment
                    </Button>
                </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection;