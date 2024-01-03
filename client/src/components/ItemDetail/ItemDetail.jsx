import { useState } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import axios from 'axios';

const ItemDetail = ({ _id, title, price, thumbnails, status, stock, user }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    const { addItem } = useContext(CartContext);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleOnAdd = async (quantity) => {
        setQuantityAdded(quantity);
        const product = { _id, title, price, thumbnails, quantity };
    
        console.log("Producto:", product);
        console.log("ID del Carrito:", user.cart);
    
        try {
            const response = await axios.post(`/api/carts/${user.cart}/product/${product._id}`, product);
            const updatedCart = response.data;
    
            console.log("Carrito actualizado:", updatedCart);
            console.log("Productos en el carrito:", updatedCart.products);
    
            addItem(updatedCart);
        } catch (error) {
            console.error('Error al agregar el producto al carrito', error);
        }
    };

    const showCheckoutButton = quantityAdded > 0;

    return (
        <div className="card mt-1 align-items-center shadow p-3 mb-5 bg-body rounded" data-aos="zoom-in-up" data-aos-duration="1000" style={{ width: '30rem' }}>
            <img className="card-img-top" src={thumbnails} alt={title} />
            <div className="card-body card-text text-center">
                <h5>{title}</h5>
                <h6>Precio: {price}</h6>
                <p>Disponible: {status ? 'Sí' : 'No'}</p>
                {!showCheckoutButton && (
                    <ItemCount initial={1} stock={stock} onAddToCart={handleOnAdd} />
                )}
                {showCheckoutButton && (
                    <div>
                        <div className="checkout-buttons">
                            <Link to="/cart" className="btn" onClick={scrollToTop}>Finalizar Compra</Link>
                        </div>
                        <div>
                            <Link to="/productos" className="btn mt-3">Continuar Comprando</Link>
                        </div>
                    </div>
                )}
                {!showCheckoutButton && (
                    <div className="continue-shopping">
                        <Link to="/productos" className="btn mt-3">Continuar Comprando</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemDetail;
