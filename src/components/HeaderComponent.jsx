import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faCartShopping);

const HeaderComponent = () => {
    return (
        <div>
            <header className="header mt-auto py-3 bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <a href="">Shopper.</a>
                        </div>
                        <div className="col-md-6 text-right">
                            <button type="button" className="btn btn-dark">
                                <FontAwesomeIcon icon="cart-shopping" />
                            </button>
                            <button id="userButton" type="button" className="btn btn-dark">
                                <FontAwesomeIcon icon="user" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
export default HeaderComponent
