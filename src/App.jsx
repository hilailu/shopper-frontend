import './App.css'
import ListProductComponent from "./components/ListProductComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductComponent from "./components/ProductComponent.jsx";
import {Login, Register} from "./components/AuthComponent.jsx";
import ProfileComponent from "./components/ProfileComponent.jsx";
import ErrorComponent from "./components/ErrorComponent.jsx";
import CatalogComponent from "./components/CatalogComponent.jsx";
import {CartProvider} from "./CartContext.jsx";
import CartComponent from "./components/CartComponent.jsx";
import CustomerOrderComponent from "./components/CustomerOrderComponent.jsx";

function App() {

  return (
    <>
        <CartProvider>
        <BrowserRouter>
        <HeaderComponent></HeaderComponent>
            <Routes>
                <Route path='/' element={<CatalogComponent />} />

                <Route path='/auth/login' element={<Login />} />
                <Route path='/auth/register' element={<Register />} />

                <Route path='/profile' element={<ProfileComponent />} />
                <Route path='/catalog' element={<CatalogComponent />} />
                <Route path='/cart' element={<CartComponent />} />
                <Route path='/orders' element={<CustomerOrderComponent />} />

                <Route path='/error' element={<ErrorComponent />} />

                <Route path='/admin/products' element={<ListProductComponent />} />
                <Route path='/admin/add_product' element={<ProductComponent />} />
                <Route path='/admin/edit_product/:id' element={<ProductComponent />} />
            </Routes>
        <FooterComponent></FooterComponent>
        </BrowserRouter>
        </CartProvider>
    </>
  )
}

export default App
