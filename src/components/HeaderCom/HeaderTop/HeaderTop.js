import React, { Component } from 'react';
import { withRouter } from 'react-router'
import axios from 'axios';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import Alert from 'react-s-alert';
import './HeaderTop.css';

class HeaderTop extends Component {

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
        let authLinks = null;
        if(this.props.isAuthenticated) {
                authLinks = (
                    <div className="flex-row flex-item-3 auth">
                       <Link hidden={this.state.loggingOut}  to="/Logout" onClick={this.LogOutHandler}>خروج</Link>
                       <ClipLoader color={'#123abc'} loading={this.state.loggingOut} />
                    </div>
                );
        } else {
            authLinks = (
                <div className="flex-row flex-item-3 auth">
                    <Link to="/Signup">ثبت نام</Link>
                    <Link to="/Login">ورود</Link>
                </div>
            );
        }
        return (
            <div className="HeaderTop">
                {authLinks}
                <Search/>
                <Link to="/"><h1 className="flex-item-3 text-left">AriaElec</h1></Link>
            </div>
        )
    }
};


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch( actions.authCheckState() ),
        logout: () => dispatch( actions.logout() )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HeaderTop));
