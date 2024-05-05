import React, {useEffect, useState} from 'react'
import {createSupply, getSupply, updateSupply} from "../services/SupplyService.js";
import {useNavigate, useParams} from "react-router-dom";
import '../main.css'

const SupplyComponent = () => {

    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [vendor, setVendor] = useState('');
    const [product, setProduct] = useState('');

    const {id} = useParams();
    const [errors, setErrors] = useState({
        date: '',
        price: '',
        amount: '',
        vendor: '',
        product: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if (id){
            getSupply(id).then((response) => {
                setDate(response.data.date);
                setPrice(response.data.price);
                setAmount(response.data.amount);
                setVendor(response.data.vendor);
                setProduct(response.data.product);
            }).catch(error => {
                console.error(error);
                if (error.response && error.response.status === 403) {
                    navigator("/error")
                }
            })
        }
    }, [id]);

    function handleDate(e){
        setDate(e.target.value);
    }

    function handlePrice(e){
        setPrice(e.target.value);
    }

    function handleAmount(e){
        setAmount(e.target.value);
    }

    function handleVendor(e){
        setVendor(e.target.value);
    }

    function saveOrUpdateSupply(e){
        e.preventDefault();

        if (validateForm())
        {
            const supply = {date, price, amount, vendor, product};
            console.log(supply);

            if (id) {
                updateSupply(id, supply).then((response) => {
                    console.log(response.data);
                    navigator("/admin/supplies");
                }).catch(error => {
                    console.error(error);
                    if (error.response && error.response.status === 403) {
                        navigator("/error")
                    }
                })
            } else {
                createSupply(supply).then((response) => {
                    console.log(response.data);
                    navigator("/admin/supplies");
                }).catch(error => {
                    console.error(error);
                    if (error.response && error.response.status === 403) {
                        navigator("/error")
                    }
                })
            }
        }
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {... errors};

        if (date.trim()) {
            errorsCopy.date = '';
        } else {
            errorsCopy.date = 'Supply name is required';
            valid = false;
        }

        if (price.trim()) {
            errorsCopy.price = '';
        } else {
            errorsCopy.price = 'Phone number is required';
            valid = false;
        }

        if (amount.trim()) {
            errorsCopy.amount = '';
        } else {
            errorsCopy.amount = 'Amount is required';
            valid = false;
        }

        if (vendor.trim()) {
            errorsCopy.vendor = '';
        } else {
            errorsCopy.vendor = 'Vendor is required';
            valid = false;
        }

        if (product.trim()) {
            errorsCopy.product = '';
        } else {
            errorsCopy.product = 'Product is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if (id) {
            return <h2 className="text-center">Edit Supply</h2>;
        }
        else {
            return <h2 className="text-center">Add Supply</h2>;
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
                            <input type="text" placeholder="Supply Name" name="date" value={date}
                                   className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                   onChange={handleDate}/>
                        </div>
                        {errors.date && <div className="row col-8 offset-2 invalid-feedback">{errors.date}</div>}
                        <br/>

                        <div className="row col-8 offset-2">
                            <input type="text" placeholder="Phone number" name="price"
                                   value={price}
                                   className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                   onChange={handlePrice}/>
                        </div>

                        {errors.price &&
                            <div className="invalid-feedback">{errors.price}</div>}
                        <br/>

                        <div className="row col-8 offset-2">
                            <input type="text" placeholder="Amount" name="amount" value={amount}
                                   className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                                   onChange={handleAmount}/>
                        </div>

                        {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                        <br/>

                        <div className="row col-8 offset-2">
                            <input type="text" placeholder="Vendor" name="vendor" value={vendor.id}
                                   className={`form-control ${errors.vendor ? 'is-invalid' : ''}`}
                                   onChange={handleVendor}/>
                        </div>
                        {errors.vendor && <div className="invalid-feedback">{errors.vendor}</div>}
                        <br/>

                        <div className="row col-8 offset-2">
                            <input type="text" placeholder="Product" name="product" value={product.id}
                                   className={`form-control ${errors.product ? 'is-invalid' : ''}`}
                                   onChange={handleVendor}/>
                        </div>
                        {errors.product && <div className="invalid-feedback">{errors.product}</div>}
                        <br/>

                        <button type="submit" className="btn btn-primary col-8 offset-2"
                                onClick={saveOrUpdateSupply}>Save
                        </button>
                    </form>
                    <br/>
                </div>
            </div>
        </div>
    )
}
export default SupplyComponent
