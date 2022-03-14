import React, {useEffect} from 'react';
import useStyles from './styles'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useDispatch} from 'react-redux';

import { deletePost, likePost} from '../../../actions/posts.js';

import moment from 'moment';
    
const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    // Likes Sub component
    const Likes = () => {
        if (post.likes.length > 0)
        {
            // loop through the array of likes and check if the currently
            // signed in userId is contained inside the likes array
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    // If it's in the likes array, the user already liked the post and display:
                    <>
                        <ThumbUpAltIcon fontSize="small"/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
                    </>
                ) : (
                    // else user hasn't liked the post and display:
                    <>
                        <ThumbUpAltOutlined fontSize="small"/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                    </>
                );
        }
        // return the default like button if no user liked the post
        return <><ThumbUpAltOutlined fontSize="small"/>&nbsp;Like</>


    }

    return(
        <Card className={classes.card}>

            {/* Card Picture, post creator & time elasped from post creation */}
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {/* Only the creator of the post can edit it */}
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                // Edit Ellipse
                <div className={classes.overlay2}>
                    <Button style={{color: "white"}} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium"/>
                    </Button>
                </div>
            )}
            

            {/* Details / Tags */}
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>

            {/* Post Title & Message */}
            <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component="p" gutterBottom>{post.message}</Typography>
            </CardContent>
            
            {/* Post Actions */}
            <CardActions className={classes.cardActions}>

                {/* Like */}
                <Button size="small" disabled={!user?.result} color="primary" onClick={() => dispatch(likePost(post._id))}>
                    {/* <ThumbUpAltIcon fontSize="small"/>
                    &nbsp; Like &nbsp;
                    {post.likeCount} */}
                    <Likes/>
                </Button>

                {/* Only the creator of the post can delete it */}
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    /* Delete */
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small"/>
                        Delete
                    </Button>
                )}

                
            </CardActions>

        </Card>
    );
}

export default Post;