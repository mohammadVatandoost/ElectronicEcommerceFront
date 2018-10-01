import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addToCart = (productName,number,category) => {
    return {
       type: actionTypes.ADD_TO_CART,
       productName: productName, number: number, category: category
    }
}

export const removeFromCart = (productName) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        productName: productName
    }
}

export const removeAllCart = (productName) => {
    return {
        type: actionTypes.REMOVE_ALL_FROM_CART
    }
}

export const changeNumFromCart = (productName,number,category) => {
    return {
        type: actionTypes.REMOVE_ALL_FROM_CART,
        productName: productName, number: number, category: category
    }
}

export const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    const cartLength = localStorage.getItem('cartLength');
    return {
        type: actionTypes.GET_CART_FROM_LOCALSTORAGE,
        cart: JSON.parse(cart), cartLength: cartLength
    }
}

export const getCartFromServer = (token) => {
    return dispatch => {
        dispatch(setLoadingAndError(true, null));
        axios.post('http://localhost:80/ariaelec/public/api/user/cart/read', {token: token})
            .then(response => {
                console.log(response);
                dispatch(setLoadingAndError(false, null));
                return {
                    type: actionTypes.GET_CART_FROM_SERVER,
                    cart: JSON.parse(response.data), cartLength: response.data.length
                }
            })
            .catch(err => {
                console.log(err);
                // Alert.error('دوباره امتحن کنید', {
                //     position: 'bottom-right',
                //     effect: 'scale',
                //     beep: false,
                //     timeout: 3000,
                //     offset: 100
                // });
                dispatch(setLoadingAndError(false, err));
            });
    }
}

export const setLoadingAndError = (loading,error) => {
    return {
        type: actionTypes.SET_LOADING_AND_ERROR,
        loading: loading, error: error
    }
}
