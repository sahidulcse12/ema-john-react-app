
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleGoogleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';


function Login() {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    });

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const googleSignOut = () => {
        handleGoogleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }


    const handleBlur = (event) => {
        let isFormed = true;
        if (event.target.name === 'email') {
            isFormed = /\S+@\S+\.\S+/.test(event.target.value);
        }

        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const isPasswordHasNumber = /|d{1}/.test(event.target.value);
            isFormed = isPasswordHasNumber && isPasswordValid;
        }

        if (isFormed) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo)
        }

    }

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        event.preventDefault();
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }


    return (
        <div style={{ textAlign: 'center' }}>

            {
                user.isSignedIn ? <button onClick={googleSignOut}>Sign out</button> :
                    <button onClick={googleSignIn}>Sign in</button>
            }
            <br />
            <button onClick={fbSignIn}>Sign in using facebook</button>

            {
                user.isSignedIn ? <div>
                    <p>Welcome to {user.name}</p>
                    <p>Your Email : {user.email}</p>
                    <img src={user.photo} alt="" />
                </div> :
                    <div>
                        <p>you are signed out</p>
                    </div>
            }

            <h2>My own authentication</h2>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign up</label>

            <form onSubmit={handleSubmit}>
                {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="Your name" />}
                <br />
                <input onBlur={handleBlur} type="text" placeholder="Your Email" name="email" required />
                <br />
                <input onBlur={handleBlur} type="password" placeholder="Password" name="password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
            }


        </div>
    );
}

export default Login;
