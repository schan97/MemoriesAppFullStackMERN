import React,{useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

import {Grow, Grid, Container, Paper, AppBar, TextField, Button, Chip} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import useStyles from './styles';
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
import Pagination from '../Pagination/Pagination.jsx';


function useQuery() {
    return new URLSearchParams(useLocation.search);
}


const Home = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search,setSearch] = useState('');
    const [tags,setTags] = useState([]);

    const classes = useStyles();

    const [currentId, setCurrentId] = useState(null);

    const dispatch = useDispatch();

    // listens on the change of dispatch and currentId
    // if it ever changes the get posts will be executed again
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    const searchPost = () => {
        if(search.trim()){
            // dispatch -> fetch search post
        }
        else{
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13)
        {
            //search post
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
    

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                                name='search' 
                                variant='outlined' 
                                label='Search Memories'
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={handleKeyPress}

                            />
                            <ChipInput
                                style={{margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} variant='contained' className={classes.searchButton} color="primary">Search</Button>
                        </AppBar>
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