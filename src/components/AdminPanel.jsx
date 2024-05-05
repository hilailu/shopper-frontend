import React from 'react';
import { Link } from 'react-router-dom';
import '../main.css'

const AdminPanel = () => {
    return (
        <div className="main container">
            <h2>Admin Panel</h2>
            <div className="btn-group" role="group" aria-label="Admin Actions">
                <Link to="/admin/products" className="btn btn-primary">
                    Products
                </Link>
                <Link to="/admin/orders" className="btn btn-primary">
                    Orders
                </Link>
                <Link to="/admin/users" className="btn btn-primary">
                    Users
                </Link>
                <Link to="/admin/vendors" className="btn btn-primary">
                    Vendors
                </Link>
                <Link to="/admin/supplies" className="btn btn-primary">
                    Supplies
                </Link>
            </div>
            <br/>
            <Link to="/profile" className="btn btn-primary">
                Customer Profile
            </Link>
        </div>
    );
};

export default AdminPanel;
