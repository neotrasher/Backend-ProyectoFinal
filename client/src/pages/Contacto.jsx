import React from "react";
import whatsappImage from '../assets/img/whatsapp.png';
import './Contacto.css'

function Contacto() {
    return (
        <div>
            <div className="contactoMain">
                <section className="contacto">
                    <div>
                        <h1 className="textContacto">Contacto</h1>
                        <img
                            className="logoWhatsappContacto"
                            src={whatsappImage}
                            alt="whatsapp"
                        />
                        <a
                            className="numeroTelefono"
                            href="https://wa.me/573154299368"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            +57 (315) 4299368
                        </a>
                    </div>
                    <form
                        className="formulario"
                        action="https://formsubmit.co/a19a87eb66e7f9abdf841de9aae687a6"
                        method="POST"
                        encType="application/x-www-form-urlencoded"
                    >
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">
                                Nombre
                            </label>
                            <br />
                            <input
                                className="form-input"
                                type="text"
                                id="name"
                                name="Nombre"
                                placeholder="Ingrese su nombre y apellido"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="mail">
                                Correo Electrónico
                            </label>
                            <br />
                            <input
                                className="form-input"
                                type="text"
                                id="mail"
                                name="mail"
                                placeholder="Ingrese su correo electrónico"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="tel">
                                Teléfono
                            </label>
                            <br />
                            <input
                                className="form-input"
                                type="number"
                                id="tel"
                                name="tel"
                                placeholder="Ingrese su número telefónico"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="mensaje">
                                Mensaje
                            </label>
                            <br />
                            <textarea
                                className="form-textarea"
                                name="mensaje"
                                id="mensaje"
                                rows="8"
                            ></textarea>
                        </div>
                        <div className="form-buttongroup">
                            <input className="form-button" type="submit" value="Enviar" target='Blank' />
                        </div>
                    </form>
                </section>
                <iframe
                    className="taggbox"
                    src="https://widget.taggbox.com/120180"
                    title="Taggbox Widget"
                ></iframe>
            </div>
        </div>
    );
}

export default Contacto;
