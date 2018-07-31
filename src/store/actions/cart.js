import * as actionTypes from './actionTypes';

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