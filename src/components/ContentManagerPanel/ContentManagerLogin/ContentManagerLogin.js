import React , {Component} from 'react';
import axios from 'axios';
import { NavLink , Route , Switch } from 'react-router-dom';
import LoginCom from '../../LoginCom/LoginCom';

class ContentManagerLogin extends Component {
    render() {
        return (
            <div className="container text-right">
                <br/>
                <h2>پنل ورود مدیر محتوا</h2>
                <LoginCom redirectTo="/ContentManagerPanel" url="http://localhost:80/ariaelec/public/api/cm/login" />
                <br/>
            </div>
        )
    }
}

export default ContentManagerLogin;