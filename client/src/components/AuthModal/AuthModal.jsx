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
        position: 'absolute'
    }
};

Modal.setAppElement('#root');

const AuthModal = ({ isOpen, onRequestClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState(null);
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/session/login", {
                email,
                password
            });

            console.log(response.data);
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

            console.log(response.data);
            onRequestClose();
        } catch (error) {
            setError('Error al registrarse');
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <h2 className="text-center">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
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
                {!isLogin && (
                    <>
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
                    </>
                )}
                <button type="submit" className="btn btn-primary">
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <button onClick={() => setIsLogin(!isLogin)} className="btn btn-secondary mt-3">
                {isLogin ? 'Ir a registro' : 'Ir a inicio de sesión'}
            </button>
            <hr />
            <a href="/users/github" className="btn btn-dark mt-3">
                {isLogin ? 'Iniciar Sesión con GitHub' : 'Registrarse con GitHub'}
            </a>
        </Modal>
    );
};

export default AuthModal;

