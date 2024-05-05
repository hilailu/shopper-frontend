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
import OrderComponent from "./components/OrderComponent.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import ListSupplyComponent from "./components/ListSupplyComponent.jsx";
import ListVendorComponent from "./components/ListVendorComponent.jsx";
import UserComponent from "./components/UserComponent.jsx";
import VendorComponent from "./components/VendorComponent.jsx";
import ListCategoryComponent from "./components/ListCategoryComponent.jsx";
import CategoryComponent from "./components/CategoryComponent.jsx";
import SupplyComponent from "./components/SupplyComponent.jsx";

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

                <Route path='/admin/' element={<AdminPanel />} />

                <Route path='/admin/products' element={<ListProductComponent />} />
                <Route path='/admin/add_product' element={<ProductComponent />} />
                <Route path='/admin/edit_product/:id' element={<ProductComponent />} />

                <Route path='/admin/vendors' element={<ListVendorComponent />} />
                <Route path='/admin/add_vendor' element={<VendorComponent />} />
                <Route path='/admin/edit_vendor/:id' element={<VendorComponent />} />

                <Route path='/admin/categories' element={<ListCategoryComponent />} />
                <Route path='/admin/add_category' element={<CategoryComponent />} />
                <Route path='/admin/edit_category/:id' element={<CategoryComponent />} />

                <Route path='/admin/supplies' element={<ListSupplyComponent />} />
                <Route path='/admin/add_supply' element={<SupplyComponent />} />
                <Route path='/admin/edit_supply/:id' element={<SupplyComponent />} />

                <Route path='/admin/orders' element={<OrderComponent />} />
                <Route path='/admin/users' element={<UserComponent />} />
            </Routes>
        <FooterComponent></FooterComponent>
        </BrowserRouter>
        </CartProvider>
    </>
  )
}

export default App
