import React, {useEffect, useState} from 'react'
import {getOrdersForCustomer} from "../services/OrderService.js";
import '../main.css'

const CustomerOrderComponent = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders();
    }, []);

    function getOrders(){
        getOrdersForCustomer().then((response) => {
            setOrders(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="catalog container">
            <br/>
            <h2 className="text-center">Orders</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map(order =>
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.date}</td>
                            <td>{order.orderStatus}</td>
                        </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}

export default CustomerOrderComponent
