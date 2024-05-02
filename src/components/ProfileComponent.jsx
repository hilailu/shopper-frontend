import React, { useState, useEffect } from 'react';
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {getCustomer, saveCustomer} from "../services/ProfileService.js";
import {useNavigate} from "react-router-dom";
import {logout} from "../services/AuthService.js";
import '../main.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";

library.add(faCircleUser);

const ProfileComponent = () => {
    const [customerData, setCustomerData] = useState({
        customerName: '',
        phoneNumber: '',
        user: {
            email: '',
            password: '',
            login: ''
        }
    });

    const [errors, setErrors] = useState({
        customerName: '',
        phoneNumber: '',
        email: '',
        login: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        fetchCustomerData();
    }, []);

    const fetchCustomerData = async () => {
        try {
            const response = await getCustomer();
            setCustomerData(response.data);
        } catch (error) {
            console.error('Failed to fetch customer data', error);
            if (error.response && error.response.status === 403) {
                navigator("/error")
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('user.')) {
            const nestedFieldName = name.replace('user.', '');

            setCustomerData((prevData) => ({
                ...prevData,
                user: {
                    ...prevData.user,
                    [nestedFieldName]: value
                }
            }));
            setErrors({ ...errors, [nestedFieldName]: '' });
        } else {
            setCustomerData((prevData) => ({
                ...prevData,
                [name]: value
            }));
            setErrors({ ...errors, [name]: '' });
        }
    };


    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^(375|80)(29|33|44|17)\d{7}$/;
        return regex.test(phoneNumber);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigator('/auth/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    const showOrders = () => {
        navigator("/orders");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorsCopy = {... errors};

        if (!customerData.customerName.trim()) {
            errorsCopy.customerName = 'Name is required';
        }

        if (!validatePhoneNumber(customerData.phoneNumber)) {
            errorsCopy.phoneNumber = 'Incorrect number format';
        }

        if (!customerData.user.login.trim()) {
            errorsCopy.login = 'Login is required';
        }

        if (!validateEmail(customerData.user.email)) {
            errorsCopy.email = 'Invalid email address';
        }

        if (errorsCopy.email|| errorsCopy.login || errorsCopy.phoneNumber || errorsCopy.customerName){
            setErrors(errorsCopy);
            return;
        }

        try {
            await saveCustomer(customerData);
            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Failed to update profile', error);
        }
    };

    return (
    <div className="main container">
        <br/>
        <div className="card col-md-4">
            <br/>
            <FontAwesomeIcon icon="circle-user" className="fa-7x"/>
            <br/>
            <h2 className="text-center">User Profile</h2>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row col-8 offset-2">
                        <input type="text" name="customerName" value={customerData.customerName}
                               placeholder="Name" onChange={handleChange}/>
                    </div>
                    {errors.customerName && <div className="row col-8 offset-2 text-danger">{errors.customerName}</div>}
                    <br/>

                    <div className="row col-8 offset-2">
                        <input type="text" name="phoneNumber" placeholder="Phone Number"
                               value={customerData.phoneNumber} onChange={handleChange}/>
                    </div>
                    {errors.phoneNumber && <div className="row col-8 offset-2 text-danger">{errors.phoneNumber}</div>}
                    <br/>

                    <div className="row col-8 offset-2">
                        <input type="email" name="user.email" placeholder="Email" value={customerData.user.email}
                               onChange={handleChange}/>
                    </div>
                    {errors.email && <div className="row col-8 offset-2 text-danger">{errors.email}</div>}
                    <br/>

                    <div className="row col-8 offset-2">
                        <input type="text" name="user.login" placeholder="Login" value={customerData.user.login}
                               onChange={handleChange}/>
                    </div>
                    {errors.login && <div className="row col-8 offset-2 text-danger">{errors.login}</div>}
                    <br/>

                    <button className="btn btn-success col-8 offset-2" type="submit">Save</button>
                    <br/>
                    <br/>

                </form>
                <button className="btn btn-primary col-8 offset-2" onClick={showOrders}>My orders</button>
                <br/>
                <br/>
                <button className="btn btn-danger col-8 offset-2" onClick={handleLogout}>Logout</button>
                <br/>
                <br/>
            </div>
        </div>
    </div>
    )
        ;
};

export default ProfileComponent;