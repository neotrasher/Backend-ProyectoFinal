import React, { createContext, useState } from "react";

export const CartContext = createContext({
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
});

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    console.log(cartItems)

    const addItem = (item, quantity) => {
        console.log(item);
        setCartItems((prevCartItems) => {
            const existingItemIndex = prevCartItems.findIndex((cartItem) => cartItem.id === item.id);

            if (existingItemIndex !== -1) {
                const updatedCartItems = [...prevCartItems];
                updatedCartItems[existingItemIndex].quantity += quantity;

                return updatedCartItems;
            } else {
                const newItem = {
                    ...item,
                    quantity: quantity,
                    precio: item.precio,
                    imagen: item.imagen,
                };

                return [...prevCartItems, newItem];
            }
        });
    };

    const removeItem = (itemId) => {
        setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.id !== itemId)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const isInCart = (itemId) => {
        return cartItems.some((item) => item.id === itemId);
    };

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);


    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                addItem,
                removeItem,
                clearCart,
                isInCart,
                totalQuantity,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

