import React, {useEffect, useState} from 'react'
import {createVendor, getVendor, updateVendor} from "../services/VendorService.js";
import {useNavigate, useParams} from "react-router-dom";
import '../main.css'

const VendorComponent = () => {

    const [vendorName, setVendorName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');

    const {id} = useParams();
    const [errors, setErrors] = useState({
        vendorName: '',
        phoneNumber: '',
        email: '',
        country: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if (id){
            getVendor(id).then((response) => {
                setVendorName(response.data.vendorName);
                setPhoneNumber(response.data.phoneNumber);
                setEmail(response.data.email);
                setCountry(response.data.country);
            }).catch(error => {
                console.error(error);
                if (error.response && error.response.status === 403) {
                    navigator("/error")
                }
            })
        }
    }, [id]);

    function handleVendorName(e){
        setVendorName(e.target.value);
    }

    function handlePhoneNumber(e){
        setPhoneNumber(e.target.value);
    }

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handleCountry(e){
        setCountry(e.target.value);
    }

    function saveOrUpdateVendor(e){
        e.preventDefault();

        if (validateForm())
        {
            const vendor = {vendorName, phoneNumber, email, country};
            console.log(vendor);

            if (id) {
                updateVendor(id, vendor).then((response) => {
                    console.log(response.data);
                    navigator("/admin/vendors");
                }).catch(error => {
                    console.error(error);
                    if (error.response && error.response.status === 403) {
                        navigator("/error")
                    }
                })
            } else {
                createVendor(vendor).then((response) => {
                    console.log(response.data);
                    navigator("/admin/vendors");
                }).catch(error => {
                    console.error(error);
                    if (error.response && error.response.status === 403) {
                        navigator("/error")
                    }
                })
            }
        }
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    function validateForm(){
        let valid = true;
        const errorsCopy = {... errors};

        if (vendorName.trim()) {
            errorsCopy.vendorName = '';
        } else {
            errorsCopy.vendorName = 'Vendor name is required';
            valid = false;
        }

        if (phoneNumber.trim()) {
            errorsCopy.phoneNumber = '';
        } else {
            errorsCopy.phoneNumber = 'Phone number is required';
            valid = false;
        }

        if (validateEmail(email)) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if (country.trim()) {
            errorsCopy.country = '';
        } else {
            errorsCopy.country = 'Country is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if (id) {
            return <h2 className="text-center">Edit Vendor</h2>;
        }
        else {
            return <h2 className="text-center">Add Vendor</h2>;
        }
    }

    return (
        <div className="main container">
            <br/>
            <div className="card col-md-4">
                <br/>
                {pageTitle()}
                <div className="card-body">
                    <form>
                        <div className="row col-8 offset-2">
                            <input type="text" placeholder="Vendor Name" name="vendorName" value={vendorName}
                                   className={`form-control ${errors.vendorName ? 'is-invalid' : ''}`}
                                   onChange={handleVendorName}/>
                        </div>
                        {errors.vendorName && <div className="row col-8 offset-2 invalid-feedback">{errors.vendorName}</div>}
                        <br/>

                        <div className="row col-8 offset-2">
                            <input type="text" placeholder="Phone number" name="phoneNumber"
                                   value={phoneNumber}
                                   className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                   onChange={handlePhoneNumber}/>
                        </div>

                        {errors.phoneNumber &&
                            <div className="invalid-feedback">{errors.phoneNumber}</div>}
                        <br/>

                        <div className="row col-8 offset-2">
                            <input type="text" placeholder="Email" name="email" value={email}
                                   className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                   onChange={handleEmail}/>
                        </div>

                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        <br/>

                        <div className="row col-8 offset-2">
                            <input type="text" placeholder="Country" name="country" value={country}
                                   className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                                   onChange={handleCountry}/>
                        </div>
                        {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                        <br/>

                        <button type="submit" className="btn btn-primary col-8 offset-2" onClick={saveOrUpdateVendor}>Save</button>
                    </form>
                    <br/>
                </div>
            </div>
        </div>
    )
}
export default VendorComponent
