// import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
const Products = (props) => {
    // console.log(props);
    const {name, price, img, seller, key} = props.product;
    return (
        <div className="product">
            <div className="productImg">
                <img src={img} alt=""/>
            </div>
            <div className="product-details">
                <p>Product Name: <strong><Link to={'/product/'+key}>{name}</Link></strong></p>
                <p>Price: <strong>{price}</strong>$</p>
                <p>Seller: <strong>{seller}</strong></p>
                {props.showAddToCart && <button className="main-button" onClick = {()=>props.handleAddProduct(props.product)}>Add To Cart<FontAwesomeIcon ></FontAwesomeIcon></button>}
            </div>
        </div>
    );
};

export default Products;