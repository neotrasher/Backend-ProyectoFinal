import React from 'react';
import whatsappImage from '../../assets/img/whatsapp.png';
import instagramImage from '../../assets/img/instagram.png';
import facebookImage from '../../assets/img/facebook.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-datos d-flex row">
                <div className="footer-menu col-12 col-lg-2">
                    <h4>Menu</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/magusbylili">MagusbyLili</Link></li>
                        <li><Link to="/colecciones">Colecciones</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>
                <div className="footer-contacto col-12 col-lg-2 mt-3 mt-lg-0">
                    <h4>Contáctanos</h4>
                    <img className="logoWhatsappFooter ms-auto" src={whatsappImage} alt="whatsapp" />
                    <Link className="contactInfo col-10" to="https://wa.me/573154299368" target="_blank">573154299368</Link>
                </div>
                <div className="footer-rrss col-12 col-lg-4 mt-5 mt-lg-0">
                    <h4>Sigamos conectados</h4>
                    <Link to="https://www.instagram.com/magusbylili/" target="_blank"><img className="rrssIcons-footer ms-lg-5"
                        src={instagramImage} alt="instagram" /></Link>
                    <Link to="https://www.facebook.com/magusbylili" target="_blank"><img className="rrssIcons-footer ms-lg-3"
                        src={facebookImage} alt="facebook" /></Link>
                </div>
            </div>
            <div className="footer-legal">
                <h5>Copyright MagusbyLili - 2023. Todos los derechos reservados.</h5>
                <h6>creado por Diego Urdaneta</h6>
            </div>
        </footer>
    );
}

export default Footer;

