import React, { useState } from 'react';
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deletePost, likePost } from '../../../actions/posts.js';

import moment from 'moment';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes);

    const userId = user?.result?.googleId || user?.result?._id;
    const currentUserHasLikedPost = post.likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id))

        if(currentUserHasLikedPost){
            setLikes(post.likes.filter((id) => id !== userId));
            
        }
        else{
            setLikes([...post.likes, userId]);
        }
    };

    // Likes Sub component
    const Likes = () => {
        if (likes.length > 0) {
            // loop through the array of likes and check if the currently
            // signed in userId is contained inside the likes array
            return likes.find((like) => like === userId)
                ? (
                    // If it's in the likes array, the user already liked the post and display:
                    <>
                        <ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
                    </>
                ) : (
                    // else user hasn't liked the post and display:
                    <>
                        <ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                    </>
                );
        }
        // return the default like button if no user liked the post
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>


    };

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                {/* Card Picture, post creator & time elasped from post creation */}
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>




                {/* Details / Tags */}
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>

                {/* Post Title & Message */}
                <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component="p" gutterBottom>{post.message}</Typography>
                </CardContent>

            </ButtonBase>

            {/* Only the creator of the post can edit it */}
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                // Edit Ellipse
                <div className={classes.overlay2}>
                    <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}

            {/* Post Actions */}
            <CardActions className={classes.cardActions}>

                {/* Like */}
                <Button size="small" disabled={!user?.result} color="primary" onClick={handleLike}>
                    {/* <ThumbUpAltIcon fontSize="small"/>
                    &nbsp; Like &nbsp;
                    {post.likeCount} */}
                    <Likes />
                </Button>



                {/* Only the creator of the post can delete it */}
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    /* Delete */
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}


            </CardActions>

        </Card>
    );
}

export default Post;