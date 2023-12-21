import React from "react";
import './Colecciones.css';
import { Link } from "react-router-dom";

function Colecciones() {
    const videoPrincesasUrl = 'https://firebasestorage.googleapis.com/v0/b/react-proyecto-final-360f7.appspot.com/o/videos%2Fprincesas.mp4?alt=media&token=6cc90705-dc9e-4e29-82c8-ac04755e0df6';
    const videoGeometriaUrl = 'https://firebasestorage.googleapis.com/v0/b/react-proyecto-final-360f7.appspot.com/o/videos%2Fgeometria.mp4?alt=media&token=31d7bb4b-cc82-4346-9a29-d688fd216434';
    const videoAretesUrl = 'https://firebasestorage.googleapis.com/v0/b/react-proyecto-final-360f7.appspot.com/o/videos%2Faretes.mp4?alt=media&token=733f6a58-c018-46ae-b2ac-eec47b98abc1';

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
                    <video onMouseEnter={event => event.target.play()} onMouseLeave={event => { event.target.pause(); event.target.currentTime = 0; }} className="videoColeccion1" src={videoPrincesasUrl} loop muted></video>
                        <div className="coleccion">
                            <Link to="/productos"><h3>Pequeñas Princesas</h3></Link>
                        </div>
                    </div>
                    <div className="video-card">
                    <video onMouseEnter={event => event.target.play()} onMouseLeave={event => { event.target.pause(); event.target.currentTime = 0; }} className="videoColeccion1" src={videoGeometriaUrl} loop muted></video>
                        <div className="coleccion1">
                            <Link to="/productos"><h3>Geometria Vibrante</h3></Link>
                        </div>
                    </div>
                    <div className="video-card">
                    <video onMouseEnter={event => event.target.play()} onMouseLeave={event => { event.target.pause(); event.target.currentTime = 0; }} className="videoColeccion1" src={videoAretesUrl} loop muted></video>
                        <div className="coleccion1">
                            <Link to="/productos"><h3>Boho-chic</h3></Link>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );

}

export default Colecciones

