import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Header/Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('https://vast-dawn-65363.herokuapp.com/product/' + productKey)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [product])


    //const product = fakeData.find(pd => pd.key === productKey);
    //console.log(product);
    return (
        <div>
            <h1>Your Product key {productKey} and details are coming soon</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;