import {useEffect, useState} from 'react';
import {getAllOrders, updateOrderStatus} from "../services/OrderService.js";

function OrderComponent() {

    const [orders, setOrders] = useState([])
    const [selectedStatuses, setSelectedStatuses] = useState({});

    useEffect(() => {
        getOrders();
    }, []);

    function getOrders(){
        getAllOrders().then((response) => {
            setOrders(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    const handleChangeStatus = (orderId, e) => {
        const status = e.target.value;
        setSelectedStatuses({ ...selectedStatuses, [orderId]: status });

        const orderStatus = { id: orderId, status };

        updateOrderStatus(orderStatus).then((response) => {
            getOrders();
        }).catch(error => {
            console.error(error);
        });
    };

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
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.date}</td>
                        <td>
                            <select
                                value={selectedStatuses[order.id] || order.orderStatus}
                                onChange={(e) => handleChangeStatus(order.id, e)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderComponent;
