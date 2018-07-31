import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    cart: []
};

const cartADD = ( state, action ) => {
    let temp = state.cart ;
    for(let i=0;i<temp.length;i++) {
        if( temp[i].productName === action.productName ) {
            temp[i].number = action.number + temp[i].number ;
        }
    }
    temp.push({productName: action.productName, number: action.number, category: action.category});
    // console.log('cartAdd');console.log(temp);
    return updateObject( state, { cart: temp} );
};

const cartRemove = (state, action) => {
    let temp = state.cart;
    temp = temp.filter((el) => {
        return el !== action.productName
    });
    return updateObject( state, { cart: temp} );
};

const cartRemoveAll = (state, action) => {
    return updateObject( state, { cart: []} );
};

const cartChangeNum = (state, action) => {
    let temp = state.cart;
    for(let i=0;i<temp.length;i++) {
        if( temp[i].productName === action.productName ) {
           console.log('cartChangeNum');console.log(action.productName);
           temp[i].number = action.number ;
        }
    }
    return updateObject( state, { cart: temp} );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_TO_CART: return cartADD(state, action);
        case actionTypes.REMOVE_ALL_FROM_CART: return cartRemoveAll(state, action);
        case actionTypes.REMOVE_FROM_CART: return cartRemove(state, action);
        case actionTypes.CHANGE_NUM_FROM_CART: return cartChangeNum(state, action);
        default:
            return state;
    }
};

export default reducer;