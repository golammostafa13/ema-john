import React from 'react';
import './../Products/Products.css';
const ReviewItem = (props) => {
    const {name, quantity, key} = props.product;
    return (
        <div style = { {marginLeft: '100px'}}className="product-details">
            <h3 className="product"><strong>{name}</strong></h3>
            <p>Quantity: {quantity}</p>
            <br/>
            <button onClick={() => props.removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;