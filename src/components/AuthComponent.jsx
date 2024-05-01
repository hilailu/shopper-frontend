import React, { useState } from 'react';
import {login, register} from "../services/AuthService.js";
import '../main.css'
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const [loginData, setLoginData] = useState({ login: '', password: '' });
    const [errors, setErrors] = useState({
        login: '',
        password: ''
    })

    const navigator = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorsCopy = {... errors};

        if (!loginData.login.trim()) {
            errorsCopy.login = 'Login is required';
        }

        if (!loginData.password.trim()) {
            errorsCopy.password = 'Password is required';
        }

        if (errorsCopy.password || errorsCopy.login){
            setErrors(errorsCopy);
            return;
        }

        try {
            const response = await login(loginData);
            console.log(response.data);
            navigator("/profile")
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="main container">
            <br/>
                <div className="card col-md-4">
                    <br/>
                    <h2 className="text-center">Login</h2>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>

                            <div className="row col-8 offset-2">
                                <input type="text" placeholder="Login" name="login" value={loginData.login}
                                       onChange={handleChange}/>
                            </div>
                            {errors.login && <div className="row col-8 offset-2 text-danger">{errors.login}</div>}
                            <br/>
                            <div className="row col-8 offset-2">
                                <input type="password" placeholder="Password" name="password" value={loginData.password}
                                       onChange={handleChange}/>
                            </div>
                            {errors.password && <div className="row col-8 offset-2 text-danger">{errors.password}</div>}
                            <br/>

                            <button className="btn btn-primary col-8 offset-2" type="submit">Login</button>
                            <br/>
                            <br/>

                        </form>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p className="col-8 offset-2 text-center">Don't have an account? <Link to="/auth/register">Register</Link></p>
                    </div>
                </div>
        </div>
    );
};

const Register = () => {
    const [registerData, setRegisterData] = useState({login: '', email: '', password: ''});
    const [errors, setErrors] = useState({
        login: '',
        email: '',
        password: ''
    })

    const navigator = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegisterData({...registerData, [name]: value});
        setErrors({ ...errors, [name]: '' });
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorsCopy = {... errors};

        if (!registerData.login.trim()) {
            errorsCopy.login = 'Login is required';
        }

        if (!validateEmail(registerData.email)) {
            errorsCopy.email = 'Invalid email address';
        }

        if (!registerData.password.trim()) {
            errorsCopy.password = 'Password is required';
        }

        if (errorsCopy.password || errorsCopy.email || errorsCopy.login){
            setErrors(errorsCopy);
            return;
        }

        try {
            const response = await register(registerData);
            console.log(response.data);
            navigator("/profile");
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="main container">
            <br/>
            <div className="card col-md-4">
                <br/>
                <h2 className="text-center">Registration</h2>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="row col-8 offset-2">
                            <input type="text" placeholder="Login" name="login" value={registerData.login}
                                   onChange={handleChange}/>
                        </div>
                        {errors.login && <div className="row col-8 offset-2 text-danger">{errors.login}</div>}

                        <br/>
                        <div className="row col-8 offset-2">
                            <input type="email" placeholder="Email" name="email" value={registerData.email}
                                   onChange={handleChange}/>
                        </div>
                        {errors.email && <div className="row col-8 offset-2 text-danger">{errors.email}</div>}

                        <br/>
                        <div className="row col-8 offset-2">
                            <input type="password" placeholder="Password" name="password" value={registerData.password}
                                   onChange={handleChange}/>
                        </div>
                        {errors.password && <div className="row col-8 offset-2 text-danger">{errors.password}</div>}

                        <br/>

                        <button className="btn btn-primary col-8 offset-2" type="submit">Register</button>
                        <br/>
                        <br/>

                    </form>

                    <p className="col-8 offset-2 text-center">Already have an account? <Link to="/auth/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export {Login, Register};
