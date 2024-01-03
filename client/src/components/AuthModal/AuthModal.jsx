import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: '380px'
    }
};

Modal.setAppElement('#root');

const AuthModal = ({ onUserChange, onRequestClose, isOpen }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [cart, setCart] = useState([]);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/session/login", {
                email,
                password
            });
            onUserChange(response.data.user);
            const cart = response.data.user.cart;
            setCart(cart);
            localStorage.setItem('cartId', cart._id);
            onRequestClose();
        } catch (error) {
            setError('Error al iniciar sesión');
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/session/register", {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                age
            });
            onUserChange(response.data.user);
            const cart = response.data.user.cart;
            setCart(cart);
            localStorage.setItem('cartId', cart._id);
            onRequestClose();
        } catch (error) {
            setError('Error al registrarse');
        }
    };

    const handlePasswordRecovery = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/users/password_recovery", { email });
            setError('Correo de recuperación enviado con éxito');
            setForgotPassword(false);
        } catch (error) {
            setError('Error al enviar el correo de recuperación de contraseña');
        }
    };

    const renderLoginForm = () => (
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Contraseña</label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn mt-3" style={{ backgroundColor: '#BD95B7', color: 'white' }}>
                Iniciar Sesión
            </button>
        </form>
    );

    const renderRegisterForm = () => (
        <form onSubmit={handleRegister}>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Contraseña</label>
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Nombre</label>
                <input
                    type="text"
                    placeholder="Nombre"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Apellido</label>
                <input
                    type="text"
                    placeholder="Apellido"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Edad</label>
                <input
                    type="text"
                    placeholder="Edad"
                    className="form-control"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <button type="submit" className="btn mt-3" style={{ backgroundColor: '#BD95B7', color: 'white' }}>
                Registrarse
            </button>
        </form>
    );

    const renderPasswordRecoveryForm = () => (
        <form onSubmit={handlePasswordRecovery}>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit" className="btn mt-3" style={{ backgroundColor: '#BD95B7', color: 'white' }}>
                Enviar correo de recuperación
            </button>
        </form>
    );

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <h2 className="text-center">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
            {isLogin && !forgotPassword && renderLoginForm()}
            {!isLogin && !forgotPassword && renderRegisterForm()}
            {forgotPassword && renderPasswordRecoveryForm()}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {!forgotPassword && (
                <button onClick={() => setIsLogin(!isLogin)} className="btn btn-secondary mt-3">
                    {isLogin ? 'Ir a Registro' : 'Ir a inicio de sesión'}
                </button>
            )}
            {!forgotPassword && (
                <button onClick={() => setForgotPassword(true)} className="btn btn-link mt-3">
                    ¿Olvidaste tu contraseña?
                </button>
            )}
            {forgotPassword && (
                <button onClick={() => setForgotPassword(false)} className="btn btn-secondary mt-3">
                    Volver a inicio de sesión
                </button>
            )}
            <hr />
            <a href="/users/github" className="btn btn-dark mt-3">
                {isLogin ? 'Iniciar Sesión con GitHub' : 'Registrarse con GitHub'}
            </a>
        </Modal>
    );
};

export default AuthModal;
