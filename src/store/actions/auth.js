import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token,userData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userData: userData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password,url) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };

        axios.post(url, authData)
            .then((response) => {
                console.log(response);
                if(response.data != 404)
                {
                    // response.data.expiresIn
                    const expirationDate = new Date(new Date().getTime() +  10000* 1000);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userData', JSON.stringify(response.data.userData));
                    dispatch(authSuccess(response.data.token,response.data.userData));
                    dispatch(checkAuthTimeout(10000));
                } else {
                    console.log("Erorr");
                    dispatch(authFail('ایمیل یا رمز خود را اشتباه وارد کرده اید'));
                }
            })
            .catch(err => {
                console.log("error");
                console.log(err);
                dispatch(authFail('دوباره امتحان کنید'));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        if (!token) {
            dispatch(logout());
        } else {
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate <= new Date()) {
            //     dispatch(logout());
            // } else {

             dispatch(authSuccess(token,JSON.parse(userData)));
            //  dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            // }
        }
    };
};