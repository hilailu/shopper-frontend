import React, {useEffect, useState} from 'react'
import {createProduct, getProduct, updateProduct} from "../services/ProductService.js";
import {useNavigate, useParams} from "react-router-dom";
import Select from "react-select";
import '../main.css'
import {listCategories} from "../services/CategoryService.js";

const ProductComponent = () => {

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categories, setCategories] = useState([]);
    const [fetchedCategories, setFetchedCategories] = useState([]);
    const [selectCategories, setSelectCategories] = useState([]);

    const {id} = useParams();
    const [errors, setErrors] = useState({
        productName: '',
        productDescription: '',
        price: '',
        quantity: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        fetchCategories();
        if (id){
            getProduct(id).then((response) => {
                setProductName(response.data.productName);
                setProductDescription(response.data.productDescription);
                setPrice(response.data.price);
                setQuantity(response.data.quantity);
                setCategories(transformCategoryToOption(response.data.categories));
            }).catch(error => {
                console.error(error);
                if (error.response && error.response.status === 403) {
                    navigator("/error")
                }
            })
        }
    }, [id]);

    function fetchCategories() {
        listCategories()
            .then(data => {
                setFetchedCategories(data.data);
                setSelectCategories(transformCategoryToOption(data.data));
            })
            .catch(error => {
            console.error(error);
            if (error.response && error.response.status === 403) {
                navigator("/error")
            }
        })
    }

    function handleMultiChange(option) {
        setCategories(option);
    }

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

    const transformOptionToCategory = (options, fetchedCategories) => {
        return options.map(option => {
            const matchingCategory = fetchedCategories.find(category => category.categoryName === option.value);
            if (matchingCategory) {
                return {
                    id: matchingCategory.id,
                    categoryName: matchingCategory.categoryName,
                    categoryDescription: matchingCategory.categoryDescription
                };
            } else {
                return null;
            }
        }).filter(category => category !== null);
    };

    function transformCategoryToOption(data)
    {
        return data.map(category => ({
            value: category.categoryName,
            label: category.categoryName
        }));
    }

    function saveOrUpdateProduct(e){
        e.preventDefault();

        if (validateForm())
        {
            const cats = transformOptionToCategory(categories, fetchedCategories);
            const product = {productName, productDescription, price, quantity, categories: cats};
            console.log(product);

            if (id) {
                updateProduct(id, product).then((response) => {
                    console.log(response.data);
                    navigator("/admin/products");
                }).catch(error => {
                    console.error(error);
                    if (error.response && error.response.status === 403) {
                        navigator("/error")
                    }
                })
            } else {
                createProduct(product).then((response) => {
                    console.log(response.data);
                    navigator("/admin/products");
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
        <div className="main container">
        <br/>
                <div className="card col-md-4">
                    <br/>
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="row col-8 offset-2">
                                <input type="text" placeholder="Product Name" name="productName" value={productName}
                                       className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                                       onChange={handleProductName}/>
                            </div>
                            {errors.productName &&
                                <div className="row col-8 offset-2 invalid-feedback">{errors.productName}</div>}
                            <br/>

                            <div className="row col-8 offset-2">
                                <input type="text" placeholder="Product Description" name="productDescription"
                                       value={productDescription}
                                       className={`form-control ${errors.productDescription ? 'is-invalid' : ''}`}
                                       onChange={handleProductDescription}/>
                            </div>

                            {errors.productDescription &&
                                <div className="invalid-feedback">{errors.productDescription}</div>}
                            <br/>

                            <div className="row col-8 offset-2">
                                <input type="text" placeholder="Price" name="price" value={price}
                                       className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                       onChange={handlePrice}/>
                            </div>

                            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                            <br/>

                            <div className="row col-8 offset-2">
                                <input type="text" placeholder="Quantity" name="quantity" value={quantity}
                                       className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                                       onChange={handleQuantity}/>
                            </div>
                            {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                            <br/>

                            <div className="row col-8 offset-2">
                                <Select
                                    name="categories"
                                    placeholder="Categories"
                                    value={categories}
                                    options={selectCategories}
                                    onChange={handleMultiChange}
                                    isMulti={true}
                                />
                            </div>
                            <br/>

                            <button type="submit" className="btn btn-primary col-8 offset-2"
                                    onClick={saveOrUpdateProduct}>Save
                            </button>
                        </form>
                        <br/>
                    </div>
                </div>
        </div>
    )
}
export default ProductComponent
