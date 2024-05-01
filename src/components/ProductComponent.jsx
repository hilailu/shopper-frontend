import React, {useEffect, useState} from 'react'
import {createProduct, getProduct, updateProduct} from "../services/ProductService.js";
import {useNavigate, useParams} from "react-router-dom";

const ProductComponent = () => {

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const {id} = useParams();
    const [errors, setErrors] = useState({
        productName: '',
        productDescription: '',
        price: '',
        quantity: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if (id){
            getProduct(id).then((response) => {
                setProductName(response.data.productName);
                setProductDescription(response.data.productDescription);
                setPrice(response.data.price);
                setQuantity(response.data.quantity);
            }).catch(error => {
                console.error(error);
                if (error.response && error.response.status === 403) {
                    navigator("/error")
                }
            })
        }
    }, [id]);

    function handleProductName(e){
        setProductName(e.target.value);
    }

    function handleProductDescription(e){
        setProductDescription(e.target.value);
    }

    function handlePrice(e){
        setPrice(e.target.value);
    }

    function handleQuantity(e){
        setQuantity(e.target.value);
    }

    function saveOrUpdateProduct(e){
        e.preventDefault();

        if (validateForm())
        {
            const product = {productName, productDescription, price, quantity};
            console.log(product);

            if (id) {
                updateProduct(id, product).then((response) => {
                    console.log(response.data);
                    navigator("/products");
                }).catch(error => {
                    console.error(error);
                    if (error.response && error.response.status === 403) {
                        navigator("/error")
                    }
                })
            } else {
                createProduct(product).then((response) => {
                    console.log(response.data);
                    navigator("/products");
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

        if (productName.trim()) {
            errorsCopy.productName = '';
        } else {
            errorsCopy.productName = 'Product name is required';
            valid = false;
        }

        if (productDescription.trim()) {
            errorsCopy.productDescription = '';
        } else {
            errorsCopy.productDescription = 'Product description is required';
            valid = false;
        }

        const convertedPrice = Number(price);
        if (!isNaN(convertedPrice) && convertedPrice > 0) {
            errorsCopy.price = '';
        } else {
            errorsCopy.price = 'Price is required';
            valid = false;
        }

        const convertedQuantity = Number(quantity);
        if (!isNaN(convertedQuantity) && convertedQuantity > 0) {
            errorsCopy.quantity = '';
        } else {
            errorsCopy.quantity = 'Quantity is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if (id) {
            return <h2 className="text-center">Edit Product</h2>;
        }
        else {
            return <h2 className="text-center">Add Product</h2>;
        }
    }

    return (
        <div className="container">
        <br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <br/>
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <input type="text" placeholder="Product Name" name="productName" value={productName}
                                       className={`form-control ${errors.productName ? 'is-invalid' : ''}`} onChange={handleProductName}/>
                                {errors.productName && <div className="invalid-feedback">{errors.productName}</div>}

                                <input type="text" placeholder="Product Description" name="productDescription" value={productDescription}
                                       className={`form-control ${errors.productDescription ? 'is-invalid' : ''}`} onChange={handleProductDescription}/>
                                {errors.productDescription && <div className="invalid-feedback">{errors.productDescription}</div>}

                                <input type="text" placeholder="Price" name="price" value={price}
                                       className={`form-control ${errors.price ? 'is-invalid' : ''}`} onChange={handlePrice}/>
                                {errors.price && <div className="invalid-feedback">{errors.price}</div>}

                                <input type="text" placeholder="Quantity" name="quantity" value={quantity}
                                       className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} onChange={handleQuantity}/>
                                {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}

                            </div>
                            <button className="btn btn-success" onClick={saveOrUpdateProduct}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductComponent
