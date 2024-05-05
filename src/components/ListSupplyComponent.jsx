import React, {useEffect, useState} from 'react'
import {deleteSupply, listSupplies} from "../services/SupplyService.js";
import {useNavigate} from 'react-router-dom'

const ListSupplyComponent = () => {

    const [supplies, setSupplies] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllSupplies();
    }, []);

    function getAllSupplies(){
        listSupplies().then((response) => {
            setSupplies(response.data);
        }).catch(error => {
            console.error(error);
            navigator("/error")
        });
    }

    function addNewSupply(){
        navigator('/admin/add_supply');
    }

    function editSupply(id){
        navigator(`/admin/edit_supply/${id}`);
    }

    function delSupply(id){
        deleteSupply(id).then((response) => {
            getAllSupplies();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="container">
            <br/>
            <h2 className="text-center">Supplies</h2>
            <button className="btn btn-primary" onClick={addNewSupply}>Add Supply</button>
            <br/>
            <br/>
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Vendor</th>
                    <th>Product</th>
                </tr>
                </thead>
                <tbody>
                {
                    supplies.map(supply =>
                        <tr key={supply.id}>
                            <td>{supply.id}</td>
                            <td>{supply.date}</td>
                            <td>{supply.price}</td>
                            <td>{supply.amount}</td>
                            <td>{supply.vendor.id}</td>
                            <td>{supply.product.id}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => editSupply(supply.id)}>Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => delSupply(supply.id)}>Delete
                                </button>
                            </td>
                        </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}
export default ListSupplyComponent
