import React, { createContext, useState, useEffect } from "react";
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

    const totalQuantity = cart && cart.products ? cart.products.reduce(
        (total, item) => total + item.quantity,
        0
    ) : 0;
    
    const totalPrice = cart && cart.products ? cart.products.reduce(
        (total, item) => {
            if (typeof item.id_prod === 'object' && item.id_prod !== null) {
                return total + item.id_prod.price * item.quantity;
            } else {
                console.error('id_prod no es un objeto:', item);
                return total;
            }
        },
        0
    ) : 0;

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('cart', JSON.stringify(cart));
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [cart]);
    
    useEffect(() => {
        let savedCart = JSON.parse(localStorage.getItem('cart'));

        const loadCart = async () => {
            const cartId = localStorage.getItem('cartId');
            if (cartId) {
                try {
                    const response = await axios.get(`/api/carts/${cartId}`);
                    if (response.data && response.data.products.length > 0) {
                        savedCart = response.data;
                    }
                } catch (error) {
                    console.error('Error al cargar el carrito:', error);
                }
            }
        };

        loadCart().then(() => {
            if (savedCart) {
                setCart(savedCart);
            }
        });
    }, []);

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
