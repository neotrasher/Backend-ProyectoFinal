import React from 'react';
import MagusbyLiliImagen from '../../assets/img/magusbylili.png';
import './AcercaDeMi.css';

function AcercaDeMi() {
    return (
        <section>
            <div className="accordion ms-5 me-5 d-md-none" id="accordionExample">
                <div className="accordion-item">
                    <h1 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Acerca de mí / Joyería Artesanal
                        </button>
                    </h1>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>Hola! Soy Liliana,</strong> la creadora detrás de Magus🥰. Hoy quiero primero que todo, darte las gracias 🤗❤️por tu apoyo, y por estar en esta pequeña pero linda comunidad. Y es por esto que deseo compartir contigo algunas cosas de mí, que quizás no sabes: Aquí Vamos! ⬇️
                            😱Soy fanática de las películas de terror, y las series criminalísticas. Pero me toca verlas sola, porque mi esposo no las disfruta tanto como yo😜.
                            👩‍👦‍👦Soy mamá de dos hermosos varones, de 5 y 3 años, que ponen mi mundo de cabezas🙃, pero a los que amo ❤️con todo mi ser.
                            ☺️Soy un poco tímida por lo que, muero de susto si tengo que hablar por el teléfono con personas extrañas😜.
                            👩🏻‍🔧Soy Ingeniera Mecánica de profesión, y trabajé durante ocho años en una empresa de Mantenimiento Aeronáutico✈️.
                            🇻🇪Soy Venezolana, y vivo desde hace dos años en Sabaneta, Colombia🇨🇴. Una pequeña ciudad en las afueras de Medellín, que nos ha brindado la oportunidad a mi familia y a mí, de seguir luchando por nuestros sueños🤗.
                            Y sí, aunque soy ingeniera y de adolescente, quería estudiar astronomía😜, un día conocí el arte de tejer accesorios y quedé adicta a esta bella labor🤩. ¿Quien dijo que el arte y la ciencia, no pueden convivir?
                            🤗Siempre me ha gustado enseñar, por eso lo poco que he aprendido de este mundo de la Bisuteria, lo he querido ir compartiendo con ustedes, porque también creo que esto no me quitara mi potencial.
                        </div>
                    </div>
                </div>
            </div>
            <div className="acercaDeMi ">
                <h1 className='mb-4 d-none d-sm-none d-md-block'>Acerca de mí / Magus Joyería Artesanal</h1>
                <img className="creadora rounded mx-auto d-lock shadow-lg p-2 mb-5 bg-body rounded" src={MagusbyLiliImagen} alt="creadora" />
                <div className="acercaDeMi-info d-none d-sm-none d-md-block">
                    <p className="textoAcercaDeMi"> <strong>Hola! Soy Liliana,</strong> la creadora detrás de Magus🥰. Hoy quiero primero que todo, darte las gracias 🤗❤️por tu apoyo, y por estar en esta pequeña pero linda comunidad. Y es por esto que deseo compartir contigo algunas cosas de mí, que quizás no sabes: Aquí Vamos! ⬇️
                        😱Soy fanática de las películas de terror, y las series criminalísticas. Pero me toca verlas sola, porque mi esposo no las disfruta tanto como yo😜.
                        👩‍👦‍👦Soy mamá de dos hermosos varones, de 5 y 3 años, que ponen mi mundo de cabezas🙃, pero a los que amo ❤️con todo mi ser.
                        ☺️Soy un poco tímida por lo que, muero de susto si tengo que hablar por el teléfono con personas extrañas😜.
                        👩🏻‍🔧Soy Ingeniera Mecánica de profesión, y trabajé durante ocho años en una empresa de Mantenimiento Aeronáutico✈️.
                        🇻🇪Soy Venezolana, y vivo desde hace dos años en Sabaneta, Colombia🇨🇴. Una pequeña ciudad en las afueras de Medellín, que nos ha brindado la oportunidad a mi familia y a mí, de seguir luchando por nuestros sueños🤗.
                        Y sí, aunque soy ingeniera y de adolescente, quería estudiar astronomía😜, un día conocí el arte de tejer accesorios y quedé adicta a esta bella labor🤩. ¿Quien dijo que el arte y la ciencia, no pueden convivir?
                        🤗Siempre me ha gustado enseñar, por eso lo poco que he aprendido de este mundo de la Bisuteria, lo he querido ir compartiendo con ustedes, porque también creo que esto no me quitara mi potencial.</p>
                </div>
            </div>
        </section>
    );
}

export default AcercaDeMi;