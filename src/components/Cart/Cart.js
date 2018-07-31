import React , {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import * as actions from '../../store/actions/index';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';

class Cart extends Component {

    state  = {
        loading: false,cart: []
    }

    componentDidMount() {
        this.setState({loading: true});
        axios.post('http://localhost:80/ariaelec/public/api/user/cart/read',{token: this.props.token})
            .then(response => {
                console.log(response);
                this.setState({cart: response.data});
                this.setState({loading: false});
            })
            .catch(err => {
                console.log(err);
                Alert.error('دوباره امتحن کنید', {
                    position: 'bottom-right',
                    effect: 'scale',
                    beep: false,
                    timeout: 3000,
                    offset: 100
                });
                this.setState({loading: false});
            });
    }

    deleteFromCart = (productName) => {

    }


    render() {
        let cartLsit;let ListNull;
        console.log('render');console.log(this.state.cart);
       if(!this.state.loading) {
           if (Number(this.state.cart) === 550) {
               console.log('cart');console.log(this.state.cart);
               ListNull = <p className="text-center">سبد خرید شما خالی هست</p>;
           } else {
               cartLsit = this.state.cart.map((list, i) => {
                   return (
                       <tr key={i}>
                           <td>{list.name}</td>
                           <td>{list.num}</td>
                           <td><button onClick={()=>this.deleteFromCart(list.name)}><i class="fa fa-trash" aria-hidden="true"></i></button></td>
                       </tr>);
               });
           }
       }

        return(
            <div className="container table-responsive text-center searchResultContainer">
                <br/>
                <br/>
                <table className="table table-striped">
                    <thead>
                      <th>نام محصول</th><th>تعداد</th><th>قیمت واحد</th><th>قیمت مجموع</th>
                    </thead>
                    <tbody>{cartLsit}</tbody>
                </table>
                {ListNull}
                <ClipLoader size="200" color={'#123abc'} loading={this.state.loading} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (productName,number,category) => dispatch(actions.addToCart(productName,number,category)),
    };
};

const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        token: state.auth.token,
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Cart));