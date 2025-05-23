import React, {useEffect, useState} from 'react'
import {deleteProduct, listProducts} from "../services/ProductService.js";
import {useNavigate} from 'react-router-dom'

const ListProductComponent = () => {

    const [products, setProducts] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

    function getAllProducts(){
        listProducts().then((response) => {
            setProducts(response.data);
        }).catch(error => {
            console.error(error);
            navigator("/error")
        });
    }

    function addNewProduct(){
        navigator('/admin/add_product');
    }

    function editProduct(id){
        navigator(`/admin/edit_product/${id}`);
    }

    function delProduct(id){
        deleteProduct(id).then((response) => {
            getAllProducts();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="container">
            <br/>
            <h2 className="text-center">Products</h2>
            <button className="btn btn-primary" onClick={addNewProduct}>Add Product</button>
            <br/>
            <br/>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Categories</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map(product =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.productName}</td>
                            <td>{product.productDescription}</td>
                            <td>{product.categories.map(category => category.categoryName).join(', ')}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => editProduct(product.id)}>Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => delProduct(product.id)}>Delete
                                </button>
                            </td>
                        </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}
export default ListProductComponent
