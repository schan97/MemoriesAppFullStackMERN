import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from "react-router-dom";
import {AppBar, Avatar, Toolbar, Typography, Button} from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.png';
import memoriesCameraLogo from '../../images/memoriesLogoCameraFlash.png';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { LOGOUT } from '../../constants/actionTypes.js'



const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({type: LOGOUT});

        
        // set user to null
        setUser(null);

        // navigate to auth after logging out
        navigate("/auth");
        

    }

    // Listens when location changes, set the user
    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            // checks if the token is expired
            if(decodedToken.exp * 1000 < new Date().getTime())
            {
                // if token is expired, logout the user
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);


    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to="/" className={classes.brandContainer} >
                {/* <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography> */}
                <img src={memoriesText} alt="icon" height="45px"/>
                <img className={classes.image} src={memoriesLogo} alt="memories" height="60"/>
            </Link>

            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar