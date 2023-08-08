import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../SCSS/SignUp.scss';

import { useFirebaseContext } from '../context/FirebaseContext';

function Login() {

    const redirect = useNavigate();

    const clearInput = document.querySelectorAll('input');

    const { signInUser, authenticated, userLoginData, setUserLoginData } = useFirebaseContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserLoginData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const alert = document.getElementById('alert');
        const { email, password } = userLoginData;

        if (email === '') {
            alert.innerText = 'Please enter an email';
            alert.className = 'alert';
        } else if (password === '') {
            alert.innerText = 'Please enter a password';
            alert.className = 'alert';
        } else {
            alert.className = '';
            signInUser(email, password);

            clearInput.forEach((input) => {
                input.value = ''
            });
        }
    };

    useEffect(() => {
        if (authenticated) {
            redirect("/products");
        }
    }, [authenticated, redirect]);

    return (
        <div className="SignUp">
            <form onSubmit={handleSubmit}>

                <section>
                    <h1 className="reg">Login</h1>
                    <p id="alert" className="alert"></p>
                </section>

                <div className="data-input">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        className="email"
                        name="email"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="data-input">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        id="password"
                        className="password"
                        name="password"
                        required
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" id="register" className='button'>
                    Login
                </button>
                <h5>
                    Don't have an account?
                    <br />
                    <Link to="/signup">Sign Up</Link>
                </h5>
            </form>
        </div>
    );
}

export default Login;