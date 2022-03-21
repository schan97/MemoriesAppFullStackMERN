import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes.js';

export const signin = (formData,navigate) => async (dispatch) => {
    try{
        // login the user
        const {data} = await api.signIn(formData);

        dispatch({type: AUTH, data});
        navigate("/");
    }
    catch (error) {
        console.log(error);
        alert("Invalid Credentials");
    }
}

export const signup = (formData,navigate) => async (dispatch) => {
    try{
        // login the user
        const {data} = await api.signUp(formData);

        dispatch({type: AUTH, data});

        navigate("/");
    }
    catch (error) {
        console.log(error);
    }
}