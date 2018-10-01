import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Alert from 'react-s-alert';
import axios from 'axios';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import './DesktopHeader.css';
import ShoppingCart from '../../../assets/Images/shopping_cart.png';
import Search from './Search/Search';
import Navigation from './Navigation/Navigation';

class DesktopHeader extends Component {

    state = {
        loggingOut: false
    }

    componentDidMount() {
        this.props.checkAuthState();
    }

    LogOutHandler = (e) => {
        e.preventDefault();
        this.setState({loggingOut: true});
        // this.props.logout();
        console.log("token : "+this.props.token);
        let url = 'http://localhost:80/ariaelec/public/api/logout';
        axios.post(url,{token: this.props.token})
            .then(response => {
                console.log(response);
                this.props.logout();
                this.setState({loggingOut: false});
                this.props.history.push(`/`);
            })
            .catch(err => {
                console.log(err);
                this.setState({loggingOut: false});
                Alert.error('اختلالی پیش آمده است، لطفا دوباره امتحان کنید', {
                    position: 'top-left',
                    effect: 'scale',
                    beep: false,
                    timeout: 3000,
                    offset: 100
                });
            });

    }

    render() {
        console.log("header");console.log(this.props.cartLength);
        let authLinks = null;
        if(this.props.isAuthenticated) {
            authLinks = (
                <ul className="breadcrumb">
                    <li className="mr-lg-5 mr-md-3">
                        <Link to="/cart" className="border border-1 rounded pl-2 pr-2 pt-1 pb-1 shopping-cart-border-color">
                            <span className="badge">{this.props.cartLength}</span>
                            <img src={ShoppingCart} alt="سبد خرید" className="img-fluid" width="29"/>
                        </Link>
                    </li>
                    <li hidden={this.state.loggingOut} className="breadcrumb-item"><Link to="/Login" onClick={this.LogOutHandler}>خروج</Link></li>
                    <ClipLoader color={'#123abc'} loading={this.state.loggingOut} />
                </ul>
            );
        } else {
            authLinks = (
                <ul className="breadcrumb">
                    <li className="mr-lg-5 mr-md-3">
                        <Link to="/cart" className="border border-1 rounded pl-2 pr-2 pt-2 pb-2 shopping-cart-border-color">
                            <span className="badge">{this.props.cartLength}</span><span> سبد خرید </span>
                            <img src={ShoppingCart} alt="سبد خرید" className="img-fluid" width="29"/>
                        </Link>
                    </li>
                    <li className="breadcrumb-item"><Link to="/Login">ورود</Link></li>
                    <li className="breadcrumb-item"><Link to="/Signup">ثبت نام</Link></li>
                </ul>
            );
        }
        return (
        <nav className="navbar-custom p-0 d-none d-lg-block">
            <div className="d-flex justify-content-between pr-5 pl-1">
                <div>
                    <Link to="/" className="navbar-custom-link pt-1">
                        <h2 className="text-light">AriaElec</h2>
                    </Link>
                </div>
                <Search/>
                {authLinks}
            </div>
            <Navigation/>
        </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userRole: state.auth.userRole,
        cartLength: state.cart.cartLength
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch( actions.authCheckState() ),
        logout: () => dispatch( actions.logout() )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(DesktopHeader);

