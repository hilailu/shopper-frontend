import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const addToCart = (product) => {
        const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

        if (existingProductIndex !== -1) {
            const updatedCart = cartItems.map((item, index) => {
                if (index === existingProductIndex) {
                    return { ...item, amount: item.amount + 1 };
                }
                return item;
            });
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            const updatedCart = [...cartItems, { ...product, amount: 1 }];
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleChangeAmount = (productId, amount) => {
        const updatedCart = cartItems.map((item) => {
            if (item.id === productId) {
                return { ...item, amount: parseInt(amount, 10) };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, handleChangeAmount }}>
            {children}
        </CartContext.Provider>
    );
};
