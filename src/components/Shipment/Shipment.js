import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);

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