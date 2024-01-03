import React from 'react';
import { Link } from 'react-router-dom';

function Item({ product }) {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="card m-3 align-items-center shadow p-3 mb-5 bg-body rounded" data-aos="fade-down" data-aos-duration="1000" style={{ width: '18rem' }}>
            <img className="card-img-top" src={product.thumbnails} alt={product.title} />
            <h5 className="card-title text-center mt-3">{product.title}</h5>
            <p>{product.description}</p>
            <h6 className="card-text text-center">$ {product.price}</h6>
            <Link to={`/item/${product._id}`} className="btn btn-dark text-center" onClick={scrollToTop}>Ver Detalles</Link>
        </div>
    );
}

export default Item;


