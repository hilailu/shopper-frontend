import React from 'react';
import '../main.css'

const ErrorComponent = () => {
    return (
        <div className="main container">
            <h1>Error: Access Forbidden</h1>
            <p>You are not authorized to access this page.</p>
        </div>
    );
};

export default ErrorComponent;
