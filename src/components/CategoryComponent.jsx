import React, {useEffect, useState} from 'react'
import {createCategory, getCategory, updateCategory} from "../services/CategoryService.js";
import {useNavigate, useParams} from "react-router-dom";
import '../main.css'

const CategoryComponent = () => {

    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const {id} = useParams();
    const [errors, setErrors] = useState({
        categoryName: '',
        categoryDescription: '',
    })

    const navigator = useNavigate();

    useEffect(() => {
        if (id){
            getCategory(id).then((response) => {
                setCategoryName(response.data.categoryName);
                setCategoryDescription(response.data.categoryDescription);
            }).catch(error => {
                console.error(error);
                if (error.response && error.response.status === 403) {
                    navigator("/error")
                }
            })
        }
    }, [id]);

    function handleCategoryName(e){
        setCategoryName(e.target.value);
    }

    function handleCategoryDescription(e){
        setCategoryDescription(e.target.value);
    }

    function saveOrUpdateCategory(e){
        e.preventDefault();

        if (validateForm())
        {
            const category = {categoryName, categoryDescription};
            console.log(category);

            if (id) {
                updateCategory(id, category).then((response) => {
                    console.log(response.data);
                    navigator("/admin/categories");
                }).catch(error => {
                    console.error(error);
                    if (error.response && error.response.status === 403) {
                        navigator("/error")
                    }
                })
            } else {
                createCategory(category).then((response) => {
                    console.log(response.data);
                    navigator("/admin/categories");
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

        if (categoryName.trim()) {
            errorsCopy.categoryName = '';
        } else {
            errorsCopy.categoryName = 'Category name is required';
            valid = false;
        }

        if (categoryDescription.trim()) {
            errorsCopy.categoryDescription = '';
        } else {
            errorsCopy.categoryDescription = 'Category description is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if (id) {
            return <h2 className="text-center">Edit Category</h2>;
        }
        else {
            return <h2 className="text-center">Add Category</h2>;
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
                            <input type="text" placeholder="Category Name" name="categoryName" value={categoryName}
                                   className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
                                   onChange={handleCategoryName}/>
                        </div>
                        {errors.categoryName &&
                            <div className="row col-8 offset-2 invalid-feedback">{errors.categoryName}</div>}
                        <br/>

                        <div className="row col-8 offset-2">
                            <input type="text" placeholder="Category Description" name="categoryDescription"
                                   value={categoryDescription}
                                   className={`form-control ${errors.categoryDescription ? 'is-invalid' : ''}`}
                                   onChange={handleCategoryDescription}/>
                        </div>

                        {errors.categoryDescription &&
                            <div className="invalid-feedback">{errors.categoryDescription}</div>}
                        <br/>

                        <button type="submit" className="btn btn-primary col-8 offset-2"
                                onClick={saveOrUpdateCategory}>Save
                        </button>
                    </form>
                    <br/>
                </div>
            </div>
        </div>
    )
}
export default CategoryComponent
