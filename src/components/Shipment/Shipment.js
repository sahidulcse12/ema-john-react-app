import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() };

        fetch('https://vast-dawn-65363.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('your ordered successfully');
                }
            })


    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'center' }}>

            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
            <br />
            {errors.name && <span>Name is required</span>}


            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
            <br />
            {errors.email && <span>Email is required</span>}


            <input name="address" ref={register({ required: true })} placeholder="Your Address" />
            <br />
            {errors.address && <span>Address is required</span>}


            <input name="phone" ref={register({ required: true })} placeholder="Your Phone" />
            <br />
            {errors.phone && <span>TPhone Number is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;