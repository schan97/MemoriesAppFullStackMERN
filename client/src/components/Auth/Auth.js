import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './Icon';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = () => {

  };

  const handleChange = () => {

  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    //console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try{
      dispatch({type: 'AUTH', data: {result, token}})

      // navigate to home after google login success
      navigate("/");
    }
    catch(error)
    {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };


  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          {/* Check what to display based on bool */}
          <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                // if isSignUp == true
                // && is used for ternery operators with a second value being null
                isSignUp && (
                  <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                    <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half/>
                  </>
                ) 
              }
              <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
              {
                isSignUp && (
                  <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>
                )
              }
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              {/* Show sign up text if the user is signing up else show sign in */}
              {
                  isSignUp ? (
                    'Sign Up'
                  ) : (
                    'Sign In'
                  )
              }
            </Button>
            <GoogleLogin
              clientId='283669330184-mn1cdf8pfjbob5tl0cn0tu6vk27095a3.apps.googleusercontent.com'
              render={(renderProps) => (
                <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'>
                    Google Sign In
                  </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {
                    isSignUp ? (
                      "Already have an account? Sign In"
                    ) : (
                      "Don't have an account? Sign Up"
                    )
                  }
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default Auth