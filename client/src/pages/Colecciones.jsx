import React from "react";
import './Colecciones.css';
import VideoPrincesas from '../assets/video/princesas.mp4';
import VideoGeometria from '../assets/video/geometria.mp4';
import VideoAretes from '../assets/video/aretes.mp4';
import { Link } from "react-router-dom";


function Colecciones() {
    return (
        <div>
            <section className="coleccionescards">
                <section className="navFiltro d-flex flex-row justify-content-left m-5">
                    <div aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Colecciones</li>
                        </ol>
                    </div>
                </section>
                <section className="video-container">
                    <div className="video-card">
                    <video onMouseEnter={event => event.target.play()} onMouseLeave={event => { event.target.pause(); event.target.currentTime = 0; }} className="videoColeccion1" src={VideoPrincesas} loop muted></video>
                        <div className="coleccion">
                            <Link to="/productos"><h3>Pequeñas Princesas</h3></Link>
                        </div>
                    </div>
                    <div className="video-card">
                    <video onMouseEnter={event => event.target.play()} onMouseLeave={event => { event.target.pause(); event.target.currentTime = 0; }} className="videoColeccion1" src={VideoGeometria} loop muted></video>
                        <div className="coleccion1">
                            <Link to="/productos"><h3>Geometria Vibrante</h3></Link>
                        </div>
                    </div>
                    <div className="video-card">
                    <video onMouseEnter={event => event.target.play()} onMouseLeave={event => { event.target.pause(); event.target.currentTime = 0; }} className="videoColeccion1" src={VideoAretes} loop muted></video>
                        <div className="coleccion1">
                            <Link to="/productos"><h3>Boho-chic</h3></Link>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )

}

export default Colecciones

