import React, { Component } from 'react';
import { Route , Switch, withRouter } from 'react-router-dom';
import * as actions from './store/actions/index';
import {connect} from 'react-redux';
import AuxWrapper from './components/AuxWrapper/AuxWrapper';
import HeaderCom from './components/HeaderCom/HeaderCom';
import FooterCom from './components/FooterCom/FooterCom';
import Main from './components/Main';
import Conversions from './components/Conversions/Conversions';
import AdminControlPanel from './components/AdminControlPanel/AdminControlPanel';
import AdminLogIn from './components/AdminControlPanel/AdminLogIn/AdminLogIn';
import ContentManagerPanel from './components/ContentManagerPanel/ContentManagerPanel';
import ContentManagerLogin from './components/ContentManagerPanel/ContentManagerLogin/ContentManagerLogin';
import Signup from './components/User/Signup/Signup';
import Cart from './components/Cart/Cart';
import GoogleRegPass from './components/User/GoogleRegPass/GoogleRegPass';
import ContentDetail from './components/Content/ContentDetail/ContentDetail';
import Forum from './components/Forum/Forum';
import Tutorials from './components/Tutorials/Tutorials';
import Login from './components/User/Login/Login';
import ECommerce from './components/ECommerce/ECommerce';
import My404Component from './components/My404Component/My404Component';
import Logout from './components/User/Logout/Logout';
import Alert from 'react-s-alert';
import 'react-select/dist/react-select.css';
import RequireAuth from './components/require_auth/require_auth';
import 'react-s-alert/dist/s-alert-default.css';
import showSearchProductResult from './components/showSearchProductResult/showSearchProductResult';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import ComponentDetailList from "./components/ECommerce/ComponentList/ComponentDetailList/ComponentDetailList";

class RouterCom extends Component {

    componentDidMount() {

    }

    render() {

        return (
          <AuxWrapper>
            <HeaderCom/>
            <main>
                <Alert stack={{limit: 3}} />
             <Switch>
                <Route path="/google/:token" component={GoogleRegPass}/>
                <Route path="/online-conversion-calculator" component={Conversions}/>
                <Route path="/AdminLogIn" component={AdminLogIn}/>
                <Route path="/ContentManagerLogin" component={ContentManagerLogin}/>
                 <Route path="/cart" component={Cart}/>
                <Route path="/Signup" component={Signup}/>
                <Route path="/Login" component={Login}/>
                <Route path="/Logout" component={Logout}/>
                <Route path="/articles/:id/:title" component={ContentDetail}/>
                <Route path="/Articles" component={Main}/>
                <Route path="/Forum" component={Forum}/>
                <Route path="/Tutorials" component={Tutorials}/>
                <Route path="/search/:category/:keyword" component={showSearchProductResult}/>
                <Route path="/search/:category/:keyword/:filter" component={showSearchProductResult}/>
                <Route path="/products/:category1" component={ComponentDetailList}/>
                <Route path="/products/:category1/:category2/:category3" component={ComponentDetailList}/>
                <Route path="/ContentManagerPanel" component={RequireAuth(ContentManagerPanel,'cm')}/>
                <Route path="/AdminControlPanel" component={RequireAuth(AdminControlPanel,'admin')}/>
                <Route path="/" component={ECommerce}/>
                <Route path="*" exact={true} component={My404Component} />
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

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch( actions.authCheckState() )
    };
};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RouterCom));

