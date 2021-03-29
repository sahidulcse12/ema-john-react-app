import React from 'react';


const Inventory = () => {
    const handleProduct = () => {
        const product = {};
        fetch('https://vast-dawn-65363.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name :</span><input type="text" /></p>
                <p><span>Price :</span><input type="text" /></p>
                <p><span>Quantity :</span><input type="text" /></p>
                <p><span>Upload Image</span><input type="file" /></p>
                <button onClick={handleProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;