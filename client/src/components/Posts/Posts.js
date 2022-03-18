import React from 'react';
import Post from './Post/Post.js'
import useStyles from './styles'
import { useSelector } from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core';
    
const Posts = ({setCurrentId}) => {
    const {posts} = useSelector((state) => state.posts);
    const classes = useStyles();

    return(
        // checks if posts is populated, if not show loading circle, 
        // else show the Grid with each post (looped with map)
        !posts?.length ? <CircularProgress/> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {
                    posts.map((post) => (
                        // for extra small and small devices show 1 card per row: (12/12) = 1
                        // for medium devices show 2 per row: (12/6) = 2
                        // for large devices show 4 per row: (12/3) = 4
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} setCurrentId = {setCurrentId}/>
                        </Grid>

                    ))
                }
            </Grid>
        )
    );
}

export default Posts;