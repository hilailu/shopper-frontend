import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {redirect} from "../services/AuthService.js";

library.add(faUser, faCartShopping);

const HeaderComponent = () => {

    const navigator = useNavigate();

    const handleCartClick = () => {
        navigator('/cart');
    };

    const handleUserClick = async () => {
        await redirect()
            .then(response => {
                const redirectUrl = response.data;
                navigator(redirectUrl);
            })
            .catch(error => {
                console.error('Failed to determine redirection URL', error);
            });
    }

    return (
        <div>
            <header className="p-3 bg-dark text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/catalog" className="nav-link px-2 text-white">Shopper.</a></li>
                        </ul>

                        <div className="text-end">
                            <button type="button" className="btn btn-outline-light me-2" onClick={handleCartClick}>
                                <FontAwesomeIcon icon="cart-shopping"/></button>
                            <button type="button" className="btn btn-outline-light me-2" onClick={handleUserClick}>
                                <FontAwesomeIcon icon="user"/></button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default HeaderComponent
