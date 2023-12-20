import React, { useState, useContext } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './OrderConfirmation.css';
import Swal from 'sweetalert2';

const OrderConfirmation = () => {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [emailMismatch, setEmailMismatch] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');
    const [state, setState] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const navigate = useNavigate();
    const { totalPrice, clearCart, cartItems } = useContext(CartContext);

    const handleInputChange = (event, setValue, fieldType) => {
        const inputValue = event.target.value;
        let formattedValue = inputValue;

        if (fieldType === 'letters') {
            formattedValue = inputValue.replace(/[^a-zA-Z\s]/g, '');
        } else if (fieldType === 'numbers') {
            formattedValue = inputValue.replace(/\D/g, '');
        }

        setValue(formattedValue);
    };

    const handleConfirmEmailBlur = () => {
        setEmailMismatch(email !== confirmEmail);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const db = getFirestore();

        if (emailMismatch) {
            return;
        }

        if (email !== confirmEmail) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Los emails ingresados no coinciden. Por favor, verifica tu email.',
                confirmButtonColor: '#4A4848',
                iconColor: '#BD95B7',
            });
            return;
        }

        try {
            const docRef = await addDoc(collection(db, 'orders'), {
                email,
                cardNumber,
                expiration,
                cvv,
                cardHolder,
                country,
                zip,
                state,
                discountCode,
                products: cartItems,
                date: new Date(),
            });

            console.log('Orden creada con ID:', docRef.id);

            Swal.fire({
                icon: 'success',
                title: '¡Compra realizada!',
                text: `Tu orden con ID ${docRef.id} se ha completado correctamente.`,
                confirmButtonColor: '#4A4848',
                iconColor: '#BD95B7',
            }).then(() => {
                clearCart();
                navigate('/');
                window.scrollTo(0, 0);
            });

            setEmail('');
            setConfirmEmail('');
            setCardNumber('');
            setExpiration('');
            setCvv('');
            setCardHolder('');
            setCountry('');
            setZip('');
            setState('');
            setDiscountCode('');
        } catch (error) {
            console.error('Error al crear la orden:', error);
        }
    };

    const handleCardNumberChange = (event) => {
        const input = event.target.value;
        const formattedValue = input.replace(/\D/g, '').slice(0, 16);
        const groups = formattedValue.match(/.{1,4}/g);

        if (groups) {
            const formattedGroups = groups.join(' ');
            setCardNumber(formattedGroups);
        } else {
            setCardNumber(formattedValue);
        }
    };

    const handleExpirationChange = (event) => {
        const input = event.target.value;
        const formattedValue = input
            .replace(/\D/g, '')
            .slice(0, 4)
            .replace(/(\d{2})(\d{2})/, '$1/$2');

        setExpiration(formattedValue);
    };

    const validateCVV = (cvv) => {
        const cleanedValue = cvv.replace(/\D/g, '');
        const formattedValue = cleanedValue.slice(0, 3);
        return formattedValue;
    };

    return (
        <div className="container">
            <div className="card">
                <div className="payment-details">
                    <h3>Detalles del Pago</h3>
                    <p>Completa tu compra proporcionando los detalles de pago</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={`input-text ${emailMismatch ? 'mismatch' : ''}`}>
                        <input
                            type="text"
                            placeholder="luke@skywalker.com"
                            value={email}
                            onChange={(e) => handleInputChange(e, setEmail)}
                            required
                        />
                        <span>Email</span>
                    </div>
                    <div className={`input-text ${emailMismatch ? 'mismatch' : ''}`}>
                        <input
                            type="text"
                            placeholder="Confirmar Email"
                            value={confirmEmail}
                            onChange={(e) => handleInputChange(e, setConfirmEmail)}
                            onBlur={handleConfirmEmailBlur}
                            required
                        />
                        <span>Confirmar Email</span>
                        {emailMismatch && (
                            <div className="error-message">
                                Los correos no coinciden
                            </div>
                        )}
                    </div>
                    <div className="input-text">
                        <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            data-slots="0"
                            data-accept="\d"
                            required
                        />
                        <span>Número de tarjeta</span>
                    </div>
                    <div className="input-text-cvv">
                        <input
                            type="text"
                            placeholder="MM/AA"
                            value={expiration}
                            onChange={handleExpirationChange}
                            data-slots="my"
                            required
                        />
                    </div>
                    <div className="input-text-cvv cvv">
                        <input
                            type="text"
                            placeholder="000"
                            value={cvv}
                            onChange={(e) => handleInputChange(e, setCvv, 'numbers')}
                            data-slots="0"
                            data-accept="\d"
                            maxLength={3}
                            required
                        />
                    </div>
                    <div className="input-text">
                        <input
                            type="text"
                            placeholder="Nombre y Apellidos"
                            value={cardHolder}
                            onChange={(e) => handleInputChange(e, setCardHolder, 'letters')}
                            pattern="[a-zA-Z\s]+"
                            required
                        />
                        <span>Tarjetahabiente</span>
                    </div>
                    <div className="billing">
                        <span>Dirección de Pago</span>
                        <select
                            value={country}
                            onChange={(e) => handleInputChange(e, setCountry)}
                            required
                        >
                            <option>Seleccione País</option>
                            <option>United States</option>
                            <option>India</option>
                            <option>England</option>
                            <option>France</option>
                            <option>Germany</option>
                            <option>Japan</option>
                            <option>China</option>
                            <option>Italy</option>
                            <option>Russia</option>
                        </select>
                        <div className="zip-state">
                            <div className="zip">
                                <input
                                    type="text"
                                    placeholder="Código Postal"
                                    value={zip}
                                    onChange={(e) => handleInputChange(e, setZip, 'numbers')}
                                    pattern="\d+"
                                    required
                                />
                            </div>
                            <div className="state">
                                <select
                                    value={state}
                                    onChange={(e) => handleInputChange(e, setState)}
                                    required
                                >
                                    <option>Select State</option>
                                    <option>New York</option>
                                    <option>New Delhi</option>
                                    <option>London</option>
                                    <option>Paris</option>
                                    <option>Berlin</option>
                                    <option>Tokyo</option>
                                    <option>Bejing</option>
                                    <option>Rome</option>
                                    <option>Mosco</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="input-text">
                        <input
                            type="text"
                            placeholder="BLACKWEDNESDAY"
                            value={discountCode}
                            onChange={(e) => handleInputChange(e, setDiscountCode)}
                        />
                        <span>Código de descuento</span>
                    </div>
                    <div className="summary">
                        <div className="text-data">
                            <p>Subtotal</p>
                            <p>Descuento</p>
                            <h5>Total</h5>
                        </div>
                        <div className="numerical-data">
                            <p>$ {totalPrice.toFixed(2)}</p>
                            <p>$ 0.00</p>
                            <h5>$ {totalPrice.toFixed(2)}</h5>
                        </div>
                    </div>
                    <div className="pay">
                        <button type="submit">Pagar</button>
                    </div>
                </form>
                <div className="secure">
                    <i className="fa fa-lock"></i>
                    <p>Los pagos están seguros y encriptados. (test)</p>
                </div>
                <div className="last">
                    <a href="#">Términos y condiciones</a>
                    <a href="#">Privacidad</a>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
