import React, {useEffect, useState} from 'react';
import {filterCatalog, showCatalog} from "../services/ProductService.js";
import { useCart } from '../CartContext';

const CatalogComponent = () => {
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortDir, setSortDir] = useState('');
    const [name, setName] = useState('');

    const [products, setProducts] = useState([])

    const { addToCart } = useCart();

    useEffect(() => {
        getAllProducts();
    }, []);

    function getAllProducts(){
        showCatalog().then((response) => {
            setProducts(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    const filterProducts = async () => {
        const queryParams = {
            minPrice,
            maxPrice,
            category,
            sortBy,
            sortDir,
            name
        };

        filterCatalog(queryParams).then((response) => {
            setProducts(response.data);
        }).catch(error => {
            console.error(error);
        });
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <div className="catalog container">
            <div className="row">
                <div className="col-lg-3">
                    <div>
                        <br/>
                        <h4>Filters</h4>
                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="women">Women</option>
                                <option value="men">Men</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="minPrice">Min Price:</label>
                            <input
                                type="number"
                                id="minPrice"
                                className="form-control"
                                value={minPrice}
                                min="0"
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="maxPrice">Max Price:</label>
                            <input
                                type="number"
                                id="maxPrice"
                                className="form-control"
                                value={maxPrice}
                                min="0"
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sortBy">Sort By:</label>
                            <select
                                id="sortBy"
                                className="form-control"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="">-- Select --</option>
                                <option value="price">Price</option>
                                <option value="name">Name</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sortDir">Sort Direction:</label>
                            <select
                                id="sortDir"
                                className="form-control"
                                value={sortDir}
                                onChange={(e) => setSortDir(e.target.value)}
                            >
                                <option value="">-- Select --</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Search:</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                placeholder="Search by name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <br/>
                        <button className="btn btn-primary" onClick={filterProducts}>Apply Filters</button>
                    </div>
                </div>
                <div className="col-lg-9">
                    <br/>
                    <h2 className="text-center pb-3">Products</h2>
                    <div className="row">
                        {products.map(product => (
                            <div className="col-lg-4 mb-3" key={product.id}>
                                <div className="card h-100 d-flex flex-column">
                                    <div className="card-body">
                                        <h5 className="card-title">{product.productName}</h5>
                                        <p className="card-text">{product.productDescription}</p>
                                        <p className="card-text">${product.price}</p>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogComponent;
