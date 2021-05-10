import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import fakeData from '../../fakeData';
import orderImg from '../../images/giphy.gif';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
const Review = () => {
    const [cart, setCart] = useState([]);
    const removeProduct = productKey =>{
        const newCart = cart.filter(product => product.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    const [happyImg, setHappyImg] = useState(false);
    let history = useHistory();
    const handleProccessOrder = () => {
        history.push('/shipment');
    }
    let thankYou;
    if(happyImg){
        thankYou = <img src={orderImg} alt=""/>
    }
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        const newCart = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(newCart)
    }, []);
    return (
        <div className="shop-review">
            <div className="shop-product">
                <h1>Items Order: {cart.length}</h1>
                {
                    cart.map(pd => <ReviewItem removeProduct = {removeProduct} key={pd.key} product = {pd}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="shop-cart">
                <Cart cart={cart}>
                    <button onClick={handleProccessOrder} className="main-button">Process Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;