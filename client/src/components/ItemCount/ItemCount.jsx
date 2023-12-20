import './ItemCount.css'
import React, { useState } from 'react';

const ItemCount = ({ stock, initial, onAddToCart }) => {
    const [count, setCount] = useState(initial);

    const handleIncrement = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };


    return (
        <div>
            <p className="card-title text-center ">Unidades: {count}</p>
            <button onClick={handleDecrement} className="btn btn-dark text-center btn-sm btn-lg mx-1">-</button>
            <button onClick={() => onAddToCart(count)} disabled={!stock} className="btn btn-dark text-center btn-sm btn-lg mx-1">Agregar al carrito</button>
            <button onClick={handleIncrement} className="btn btn-dark text-center  btn-sm btn-lg mx-1">+</button>
        </div>
    );
};

export default ItemCount;

