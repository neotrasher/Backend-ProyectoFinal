import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Cart = ({ product, user }) => {
    const { cart, clearCart, totalPrice, removeItem } = useContext(CartContext);
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleClearCart = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará todos los productos del carrito',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4A4848',
            iconColor: '#BD95B7',
            cancelButtonColor: '#BD95B7',
            confirmButtonText: 'Limpiar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            clearCart();
            await updateCart();
            await Swal.fire({
                title: 'Carrito limpiado',
                text: 'Todos los productos han sido eliminados del carrito',
                icon: 'success',
                confirmButtonColor: '#4A4848',
                iconColor: '#BD95B7',
            });
        }
    };

    const handleRemoveItem = async (itemId) => {
        console.log("itemId:", itemId);
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el producto del carrito',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4A4848',
            iconColor: '#BD95B7',
            cancelButtonColor: '#BD95B7',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            removeItem(itemId);
            await updateCart();
            await Swal.fire({
                title: 'Eliminado',
                text: 'El producto ha sido eliminado del carrito',
                icon: 'success',
                confirmButtonColor: '#4A4848',
                iconColor: '#BD95B7',
            });
        }
    };

    const handleCheckout = async () => {
        if (cart.products.length === 0) {
            await updateCart();
            await Swal.fire({
                title: 'Carrito vacío',
                text: 'No se puede procesar el pago porque el carrito está vacío',
                icon: 'error',
                confirmButtonColor: '#4A4848',
                iconColor: '#BD95B7',
            });
        } else {
            navigate('/orderconfirmation');
        }
    };

    const updateCart = async () => {
        const response = await fetch('/api/cart/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart),
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error('Hubo un error al actualizar el carrito.');
        }
    };

    return (
        <div className="cart_section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="cart_container">
                            <div className="cart_title">
                                Carrito de compras <small>({cart && cart.products ? `${cart.products.length} producto${cart.products.length !== 1 ? 's' : ''}` : '0 productos'} en tu carrito)</small>
                            </div>
                            <div className="cart_items">
                                <ul className="cart_list">
                                    {cart && cart.products && cart.products.map((product) => (
                                        <li className="cart_item clearfix" key={product.id_prod._id}>
                                            <div className="cart_item_image">
                                                <img src={product.id_prod.thumbnails} alt={product.id_prod.title} />
                                            </div>
                                            <div className="cart_item_info d-flex justify-content-between">
                                                <div className="cart_item_name cart_info_col">
                                                    <div className="cart_item_title">Producto</div>
                                                    <Link to={`/item/${product.id_prod._id}`} style={{ textDecoration: 'none' }}>
                                                        <div className="cart_item_text">{product.id_prod.title}</div>
                                                    </Link>
                                                </div>
                                                <div className="cart_item_quantity cart_info_col">
                                                    <div className="cart_item_title">Cantidad</div>
                                                    <div className="cart_item_text">{product.quantity}</div>
                                                </div>
                                                <div className="cart_item_price cart_info_col">
                                                    <div className="cart_item_title">Precio</div>
                                                    <div className="cart_item_text">${product.id_prod.price}</div>
                                                </div>
                                                <div className="cart_item_remove">
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        onClick={() => handleRemoveItem(product.id_prod._id)}
                                                        className="cart_item_remove_icon"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="order_total">
                                <div className="order_total_content text-md-right">
                                    <div className="order_total_title">Total :</div>
                                    <div className="order_total_amount">$ {totalPrice}</div>
                                </div>
                            </div>
                            <div className="cart_buttons">
                                <button type="button" className="button cart_button_clear" onClick={() => { handleClearCart(); scrollToTop(); }}>Vaciar Carrito</button>
                                <button type="button" className="button cart_button_checkout" onClick={() => { handleCheckout(); scrollToTop(); }}>Proceder con el pago</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

