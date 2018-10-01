import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ShoppingCart from '../../../assets/Images/shopping_cart.png';
import './ResponsiveHeader.css';
import Search from './Search/Search';
import Navigation from './Navigation/Navigation'

class ResponsiveHeader extends Component {
    render() {
        return (
        <div className="navbar-sticky-container d-block d-lg-none col-12 p-0">
            <div className="fixed-navbar-top">
                <div className="d-flex justify-content-between bg-dark p-2">
                    <div className="flex-grow-1">
                        <h3><Link to="/" className="text-light">AriaElec</Link></h3>
                    </div>
                    <div className="shopping-cart-div p-1 mr-5">
                        <Link to="/cart" style={{fontSize: '22px'}}
                              className="border border-1 pl-2 pr-2 pt-2 pb-2 rounded shopping-cart-border-color">
                            <span className="badge">0</span>
                            <img src={ShoppingCart} alt="سبد خرید" className="img-fluid" width="35"/>
                        </Link>
                    </div>
                    <div className="iconbar-container">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
                <Search/>
            </div>
            <Navigation/>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart
    };
};

export default connect(mapStateToProps,null)(ResponsiveHeader);

