import React, { useState } from 'react';
import './navbar.css';
import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';

const Navbar = ({ instagramUrl, facebookUrl, whatsappUrl, userUrl, magusLogo, user, onUserIconClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    return (
        <div>
            <header className="headerInfo">
                <nav className="navbarInfo">
                    <div className="container-fluid d-flex justify-content-around">
                        <a className="navbar-brand ms-5" href="https://www.instagram.com/magusbylili/" target="_blank" rel="noopener noreferrer">
                            <img className="logosNavbar" src={instagramUrl} alt="instagram" />
                        </a>
                        <a className="navbar-brand" href="https://www.facebook.com/magusbylili" target="_blank" rel="noopener noreferrer">
                            <img className="logosNavbar" src={facebookUrl} alt="facebook" />
                        </a>
                        <span className="headerInfo col-6 d-none d-sm-none d-md-block text-center">
                            Productos hechos a mano, no olvides consultar los tiempos de envío.
                        </span>
                        <a href="https://wa.me/573154299368" target="_blank" rel="noopener noreferrer">
                            <img className="logosNavbar me-3" src={whatsappUrl} alt="whatsapp" />
                        </a>
                        {user ? (
                            <Link to="" onClick={onUserIconClick} style={{ color: 'black', textDecoration: 'none' }}>
                                Hola, <strong>{user.first_name}</strong>
                            </Link>
                        ) : (
                            <Link to="" onClick={onUserIconClick}>
                                <img className="logosNavbar me-3" src={userUrl} alt="usuario" />
                            </Link>
                        )}
                        <CartWidget />
                    </div>
                </nav>
            </header>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link to="/" className="ms-lg-5">
                        <img className="maguslogo" src={magusLogo} alt="maguslogo" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-5 mb-lg-0 ms-lg-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Inicio
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/magusbylili">
                                    MagusbyLili
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/colecciones">
                                    Colecciones
                                </Link>
                            </li>
                            <li
                                className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link className="nav-link dropdown-toggle" to="/productos">
                                    Productos
                                </Link>
                                <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                    <li>
                                        <Link className="dropdown-item" to={`/categoria/aretes`}>
                                            Aretes
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/categoria/prendedores`}>
                                            Prendedores
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/categoria/pulseras`}>
                                            Pulseras
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/categoria/collares`}>
                                            Collares
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contacto">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex me-5" role="search">
                            <input className="form-control me-2" type="search" placeholder="¿Qué estás buscando?" aria-label="Search" id="searchInput" />
                            <button className="btn btn-outline-dark" type="submit" id="searchButton">
                                Buscar
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
