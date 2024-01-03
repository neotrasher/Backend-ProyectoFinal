import React, { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext({
    cart: {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
    },
});

export const CartProvider = ({ children }) => {
    const initialCartState = { products: [] };
    const [cart, setCart] = useState(initialCartState);

    const addItem = (updatedCart) => {
        setCart(updatedCart);
    };

    const removeItem = async (productId) => {
        if (cart._id && productId) {
            try {
                await axios.delete(`/api/carts/${cart._id}/product/${productId}`);
                setCart((prevCart) => {
                    const updatedCart = { ...prevCart };
                    updatedCart.products = prevCart.products.filter(
                        (item) => item.id_prod._id !== productId
                    );
        
                    return updatedCart;
                });
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.error("Error: ID del carrito o del producto es undefined");
        }
    };

    const clearCart = async () => {
        if (cart._id) {
            try {
                await axios.delete(`/api/carts/${cart._id}`);
                setCart(initialCartState);
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            console.error("Error: ID del carrito es undefined");
        }
    };


    const isInCart = (productId) => {
        return cart.products.some((item) => item.id_prod._id === productId);
    };

    const totalQuantity = cart.products.reduce(
        (total, item) => total + item.quantity,
        0
    );
    const totalPrice = cart.products.reduce(
        (total, item) => {
            if (typeof item.id_prod === 'object' && item.id_prod !== null) {
                return total + item.id_prod.price * item.quantity;
            } else {
                console.error('id_prod no es un objeto:', item);
                return total;
            }
        },
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
