import React,{useEffect, useState} from 'react';
import {Grow, Grid, Container, Paper} from '@material-ui/core';
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';

import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

import useStyles from './styles';

import Pagination from '../Pagination/Pagination.jsx';



const Home = () => {

    const classes = useStyles();

    const [currentId, setCurrentId] = useState(null);

    const dispatch = useDispatch();

    // listens on the change of dispatch and currentId
    // if it ever changes the get posts will be executed again
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent='space-between' alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        </Grow>
    )

}
    

export default Home