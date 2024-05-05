import React, {useEffect, useState} from 'react'
import {deleteVendor, listVendors} from "../services/VendorService.js";
import {useNavigate} from 'react-router-dom'

const ListVendorComponent = () => {

    const [vendors, setVendors] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllVendors();
    }, []);

    function getAllVendors(){
        listVendors().then((response) => {
            setVendors(response.data);
        }).catch(error => {
            console.error(error);
            navigator("/error")
        });
    }

    function addNewVendor(){
        navigator('/admin/add_vendor');
    }

    function editVendor(id){
        navigator(`/admin/edit_vendor/${id}`);
    }

    function delVendor(id){
        deleteVendor(id).then((response) => {
            getAllVendors();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="container">
            <br/>
            <h2 className="text-center">Vendors</h2>
            <button className="btn btn-primary" onClick={addNewVendor}>Add Vendor</button>
            <br/>
            <br/>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    vendors.map(vendor =>
                        <tr key={vendor.id}>
                            <td>{vendor.id}</td>
                            <td>{vendor.vendorName}</td>
                            <td>{vendor.phoneNumber}</td>
                            <td>{vendor.email}</td>
                            <td>{vendor.country}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => editVendor(vendor.id)}>Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => delVendor(vendor.id)}>Delete
                                </button>
                            </td>
                        </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}
export default ListVendorComponent
