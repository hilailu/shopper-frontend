import React, {useEffect, useState} from 'react'
import {createSupply, getSupply, updateSupply} from "../services/SupplyService.js";
import {useNavigate, useParams} from "react-router-dom";
import '../main.css'
import {listVendors} from "../services/VendorService.js";
import {listProducts} from "../services/ProductService.js";
import Select from "react-select";

const SupplyComponent = () => {

    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [product, setProduct] = useState([]);
    const [selectProducts, setSelectProducts] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState([]);

    const [vendor, setVendor] = useState([]);
    const [selectVendors, setSelectVendors] = useState([]);
    const [fetchedVendors, setFetchedVendors] = useState([]);

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
        fetchVendorsAndProducts();
        if (id){
            getSupply(id).then((response) => {
                setDate(response.data.date.slice(0, -13));
                setPrice(response.data.price);
                setAmount(response.data.amount);
                setVendor(vendorToOption(response.data.vendor));
                setProduct(productToOption(response.data.product));
            }).catch(error => {
                console.error(error);
                if (error.response && error.response.status === 403) {
                    navigator("/error")
                }
            })
        }
    }, [id]);

    function fetchVendorsAndProducts() {
        listVendors()
            .then(data => {
                setFetchedVendors(data.data);
                setSelectVendors(transformVendorsToOption(data.data));
            })
            .catch(error => {
                console.error(error);
                if (error.response && error.response.status === 403) {
                    navigator("/error")
                }
            });

        listProducts()
            .then(data => {
                setFetchedProducts(data.data);
                setSelectProducts(transformProductToOption(data.data));
            })
            .catch(error => {
                console.error(error);
                if (error.response && error.response.status === 403) {
                    navigator("/error")
                }
            });
    }

    const transformOptionToVendor = (option) => {
        const matchingVendor = fetchedVendors.find(vendor => vendor.vendorName === option.value);
        if (matchingVendor) {
            return {
                id: matchingVendor.id,
                vendorName: matchingVendor.vendorName,
                email: matchingVendor.email,
                phoneNumber: matchingVendor.phoneNumber,
                country: matchingVendor.country
            };
        } else {
            return null;
        }
    };

    function transformVendorsToOption(data) {
        return data.map(vendor => vendorToOption(vendor));
    }

    function vendorToOption(vendor) {
        return {
            value: vendor.vendorName,
            label: vendor.vendorName
        };
    }

    const transformOptionToProduct = (option) => {
        const matchingProduct = fetchedProducts.find(product => product.productName === option.value);
        if (matchingProduct) {
            return {
                id: matchingProduct.id,
                productName: matchingProduct.productName,
                productDescription: matchingProduct.productDescription,
                price: matchingProduct.price,
                quantity: matchingProduct.quantity
            };
        } else {
            return null;
        }
    };

    function transformProductToOption(data)
    {
        return data.map(product => productToOption(product));
    }

    function productToOption(product) {
        return {
            value: product.productName,
            label: product.productName
        };
    }

    function handleProductChange(option) {
        setProduct(option);
    }

    function handleVendorChange(option) {
        setVendor(option);
    }

    function handleDate(e){
        setDate(e.target.value);
    }

    function handlePrice(e){
        setPrice(e.target.value);
    }

    function handleAmount(e){
        setAmount(e.target.value);
    }

    function saveOrUpdateSupply(e){
        e.preventDefault();

        if (validateForm())
        {
            let v = transformOptionToVendor(vendor);
            let p = transformOptionToProduct(product);
            const supply = {date, price, amount, vendor: v, product: p};
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

        if (validateDateTimeLocal(date)) {
            errorsCopy.date = '';
        } else {
            errorsCopy.date = 'Supply date is required';
            valid = false;
        }

        const convertedPrice = Number(price);
        if (!isNaN(convertedPrice) && convertedPrice > 0) {
            errorsCopy.price = '';
        } else {
            errorsCopy.price = 'Price is required';
            valid = false;
        }

        const convertedAmount = Number(amount);
        if (!isNaN(convertedAmount) && convertedAmount > 0) {
            errorsCopy.amount = '';
        } else {
            errorsCopy.amount = 'Amount is required';
            valid = false;
        }

        if (vendor != null) {
            errorsCopy.vendor = '';
        } else {
            errorsCopy.vendor = 'Vendor is required';
            valid = false;
        }

        if (product != null) {
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

    function validateDateTimeLocal(datetime) {
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        return regex.test(datetime);
    }

    function convertIsoToDatetimeLocal(isoDateString) {
        const date = new Date(isoDateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
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
                            <input type="datetime-local" placeholder="Supply Date" name="date" value={convertIsoToDatetimeLocal(date)}
                                   className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                   onChange={handleDate}/>
                        </div>
                        {errors.date && <div className="row col-8 offset-2 invalid-feedback">{errors.date}</div>}
                        <br/>

                        <div className="row col-8 offset-2">
                            <input type="text" placeholder="Price" name="price"
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
                            <Select
                                name="vendor"
                                placeholder="Vendor"
                                value={vendor}
                                options={selectVendors}
                                onChange={handleVendorChange}
                            />
                        </div>
                        {errors.vendor && <div className="invalid-feedback">{errors.vendor}</div>}
                        <br/>

                        <div className="row col-8 offset-2">
                            <Select
                                name="product"
                                placeholder="Product"
                                value={product}
                                options={selectProducts}
                                onChange={handleProductChange}
                            />
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
