import React, { createContext, useState } from "react";

export const CartContext = createContext({
    cart: {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
    },
});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ products: [] });

    const addItem = (productModel, quantity) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.products.findIndex(
                (item) => item.id_prod._id === productModel._id
            );

            if (existingProductIndex !== -1) {
                const updatedCart = { ...prevCart };
                updatedCart.products[existingProductIndex].quantity += quantity;

                return updatedCart;
            } else {
                const newProduct = {
                    id_prod: productModel,
                    quantity: quantity,
                };

                return { ...prevCart, products: [...prevCart.products, newProduct] };
            }
        });
    };

    const removeItem = (productId) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            updatedCart.products = prevCart.products.filter(
                (item) => item.id_prod._id !== productId
            );

            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart({ products: [] });
    };

    const isInCart = (productId) => {
        return cart.products.some((item) => item.id_prod._id === productId);
    };

    const totalQuantity = cart.products.reduce(
        (total, item) => total + item.quantity,
        0
    );
    const totalPrice = cart.products.reduce(
        (total, item) => total + item.id_prod.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
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
