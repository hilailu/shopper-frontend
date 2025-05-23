import React from 'react';
import { useCart } from '../CartContext';
import '../main.css'
import {useNavigate} from "react-router-dom";
import {orderProducts} from "../services/OrderService.js";

function CartComponent() {
    const { cartItems, removeFromCart, handleChangeAmount, clearCart } = useCart();

    const navigator = useNavigate();

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * item.amount);
        }, 0).toFixed(2);
    };

    const order = async () => {
        const orderRequest = {
            orderProducts: cartItems.map(item => ({
                productId: item.id,
                quantity: item.amount
            }))
        };

        orderProducts(orderRequest).then((response) => {
            clearCart();
            navigator("/orders");
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="catalog container">
            <br/>
            <div className="row">
            <div className="col-lg-8">
                <h2>Cart</h2>
                <ul className="list-group">
                    {cartItems.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <span>{item.productName}</span> &nbsp;
                                <input
                                        type="number"
                                        value={item.amount}
                                        min="1"
                                        max={item.quantity}
                                        onChange={(e) => handleChangeAmount(item.id, e.target.value)}
                                />
                            </div>
                            <div>
                                ${item.price} x {item.amount} &nbsp;
                                <button className="btn btn-danger ml-3"
                                        onClick={() => handleRemoveFromCart(item.id)}>Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Summary</h5>
                        <p>Total Price: ${calculateTotalPrice()}</p>
                        <button className="btn btn-primary" onClick={() => order()}>Order</button>
                    </div>
                </div>
            </div>
            </div>
        </div>

    );
}

export default CartComponent;
