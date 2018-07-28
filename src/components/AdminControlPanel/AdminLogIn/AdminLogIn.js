import React , {Component} from 'react';
import axios from 'axios';
import { NavLink , Route , Switch } from 'react-router-dom';
import LoginCom from '../../LoginCom/LoginCom';
class AdminLogIn extends Component {
    render() {
        return (
            <div className="container">
                <br/>
                <br/>
                <LoginCom  redirectTo="/AdminControlPanel" url="http://localhost:80/ariaelec/public/api/admin/login" />
                <br/>
                <br/>
            </div>
        )
    }
}

export default AdminLogIn;