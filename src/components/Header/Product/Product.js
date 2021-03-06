import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props);
    //console.log('props.product', props.product);
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-content">
                <h2 className="product-name"><Link to={"/product/" + key}>{name}</Link></h2>
                <p>by: <small>{seller}</small></p>
                <p>${price}</p>
                <p>only {stock} left the order</p>

                {props.showAddToCart && <button className="main-button" onClick={() => props.handleAddProduct(props.product)} ><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;