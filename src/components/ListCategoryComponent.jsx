import React, {useEffect, useState} from 'react'
import {deleteCategory, listCategories} from "../services/CategoryService.js";
import {useNavigate} from 'react-router-dom'

const ListCategoryComponent = () => {

    const [categories, setCategories] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllCategories();
    }, []);

    function getAllCategories(){
        listCategories().then((response) => {
            setCategories(response.data);
        }).catch(error => {
            console.error(error);
            navigator("/error")
        });
    }

    function addNewCategory(){
        navigator('/admin/add_category');
    }

    function editCategory(id){
        navigator(`/admin/edit_category/${id}`);
    }

    function delCategory(id){
        deleteCategory(id).then((response) => {
            getAllCategories();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="catalog container">
            <br/>
            <h2 className="text-center">Categories</h2>
            <button className="btn btn-primary" onClick={addNewCategory}>Add Category</button>
            <br/>
            <br/>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    categories.map(category =>
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.categoryName}</td>
                            <td>{category.categoryDescription}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => editCategory(category.id)}>Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => delCategory(category.id)}>Delete
                                </button>
                            </td>
                        </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}
export default ListCategoryComponent
