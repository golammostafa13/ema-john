import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css'
import { Link } from 'react-router-dom';
const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const prevProduct =  productKeys.map(pdKey => {
            const product = fakeData.find(pd => pd.key === pdKey);
            product.quantity = savedCart[pdKey];
            return product;
        })
        setCart(prevProduct);
    }, [])

    const handleAddProduct = (product)=> {
        // console.log(product);
        const sameProduct = cart.find(pd => pd.key === product.key);
        let newCart;
        let count = 1;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }else{
            newCart = [...cart, product];
        }
        product.quantity = count;
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop-review">
            <div className="shop-product">
                <ul>
                {
                    products.map(pd => <Products
                        key = {pd.key}
                        showAddToCart = {true}handleAddProduct = {handleAddProduct} product = {pd}></Products>)
                }
                </ul>
            </div>
            <div className="shop-cart">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;