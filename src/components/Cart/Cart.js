import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../../components/Products/Products.css';
import './Cart.css';
const Cart = (props) => {
    const cart = props.cart;
    //console.log(cart);
    let total = cart.reduce((total, prd) => total + prd.price * prd.quantity, 0);
    let shippingCost=0; let vat=0;
    let totalCost = 0;
    if(total>10){
        shippingCost = 4.44;
        totalCost += shippingCost;
    }

    vat = (5*total) / 100;
    totalCost = parseFloat(total + totalCost + vat).toFixed(2);
    return (
        <div className="cart">
            <h3><u>Order Summery <FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon></u>
            </h3>
            <p>Items Added: <strong>{props.cart.length}</strong></p>
            <p>Items Cost: <strong>{total.toFixed(2)}</strong>$</p>
            <p>Shipping Cost: <strong>{shippingCost}</strong>$</p>
            <p>VAT(5%): <strong>{vat.toFixed(2)}</strong>$</p>
            <hr/>
            <p><strong>Total Cost: {totalCost}</strong>$</p>
            <br/>
            {props.children}
        </div>
    );
};

export default Cart;
