import React, { Component } from 'react';
import { Route , Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import App from './App';
import AuxWrapper from './components/AuxWrapper/AuxWrapper';
import HeaderCom from './components/HeaderCom/HeaderCom';
import FooterCom from './components/FooterCom/FooterCom';
import Alert from 'react-s-alert';
import RequireAuth from './components/require_auth/require_auth';
import My404Component from './components/My404Component/My404Component';
import Login from './components/User/Login/Login';
import Logout from './components/User/Logout/Logout';
import GoogleRegPass from './components/User/GoogleRegPass/GoogleRegPass';
import Signup from './components/User/Signup/Signup';
import Cart from './components/Cart/Cart';
import showSearchProductResult from './components/showSearchProductResult/showSearchProductResult';
import Conversions from './components/Conversions/Conversions';
import 'react-select/dist/react-select.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

class RouteAPI extends Component {

    render() {

        return (
            <AuxWrapper>
                <HeaderCom/>
                <main>
                    <Alert stack={{limit: 3}} />
                    <Switch>
                        <Route path="/google/:token" component={GoogleRegPass}/>
                        <Route path="/search/:category/:keyword" component={showSearchProductResult}/>
                        <Route path="/search/:category/:keyword/:filter" component={showSearchProductResult}/>
                        <Route path="/cart" component={Cart}/>
                        <Route path="/online-conversion-calculator" component={Conversions}/>
                        <Route path="/Signup" component={Signup}/>
                        <Route path="/Login" component={Login}/>
                        <Route path="/Logout" component={Logout}/>
                        <Route exact path="/" component={App}/>
                        <Route component={My404Component} />
                    </Switch>
                </main>
                <FooterCom/>
            </AuxWrapper>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userRole: state.auth.userRole
    };
};


export default withRouter(connect(mapStateToProps,null)(RouteAPI));

