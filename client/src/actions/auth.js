import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes.js';

export const signin = () => async (dispatch,navigate) => {
    try{
        // login the user

        navigate("/");
    }
    catch (error) {
        console.log(error);
    }
}

export const signup = () => async (dispatch,navigate) => {
    try{
        // login the user

        navigate("/");
    }
    catch (error) {
        console.log(error);
    }
}