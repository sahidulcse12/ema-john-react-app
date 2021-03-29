import React from 'react';


const Cart = (props) => {
    //console.log(props);
    const cart = props.cart;
    //console.log(cart);

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
        debugger;

    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;

    }
    else if (total > 15) {
        shipping = 4.99;
        console.log(shipping);
    }
    else if (total > 0) {
        shipping = 12.99;
        console.log(shipping);
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formateNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: ${formateNumber(total)}</p>
            <p>Shipping: ${shipping}</p>
            <p>Tax: ${tax}</p>
            <p>Grand Total: ${grandTotal}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;