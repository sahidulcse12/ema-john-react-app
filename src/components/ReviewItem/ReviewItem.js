import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, key, price } = props.product;
    const reviewItem = {
        border: '1px solid lightgray',
        padding: '10px',
        marginLeft: '10px'
    }
    return (
        <div style={reviewItem} className="review-item">
            <h1>{name}</h1>
            <p>Quantity: {quantity}</p>
            <p>Price: ${price}</p>
            <br />
            <button className="main-button" onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;