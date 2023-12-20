import carrito from '../../assets/img/cart.png'
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom';


const CartWidget = () => {
    const { totalQuantity } = useContext(CartContext)
    return (
        <Link to='/cart'>
            <img className="logosNavbar me" src={carrito} alt="carrito" />
            <span className="badge rounded-pill bg-dark cart-badge" id="cart-count">{totalQuantity}</span>
        </Link>
    )
}

export default CartWidget;