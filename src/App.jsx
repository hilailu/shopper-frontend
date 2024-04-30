import './App.css'
import ListProductComponent from "./components/ListProductComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductComponent from "./components/ProductComponent.jsx";
import {Login, Register} from "./components/AuthComponent.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
        <HeaderComponent></HeaderComponent>
            <Routes>
                <Route path='/' element={<ListProductComponent />} />
                <Route path='/products' element={<ListProductComponent />} />
                <Route path='/add_product' element={<ProductComponent />} />
                <Route path='/edit_product/:id' element={<ProductComponent />} />
                <Route path='/auth/login' element={<Login />} />
                <Route path='/auth/register' element={<Register />} />
            </Routes>
        <FooterComponent></FooterComponent>
        </BrowserRouter>
    </>
  )
}

export default App
