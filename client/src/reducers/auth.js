import { AUTH, LOGOUT } from '../constants/actionTypes.js';

const authReducer = (state = {authData: null},action) => {
    switch(action.type) {
        case AUTH:
            // save login token in local storage
            localStorage.setItem('profile', JSON.stringify({...action?.data}));

            return {...state, authData: action?.data};

        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state
    }
}

export default authReducer;