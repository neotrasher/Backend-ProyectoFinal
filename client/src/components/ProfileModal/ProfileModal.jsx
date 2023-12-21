import React from 'react';
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

const ProfileModal = ({ isOpen, onRequestClose, user, setUser  }) => {
    if (!user) {
        return null;
    }

    const handleLogout = async () => {
        try {
            await axios.get('/api/users/logout');  
            setUser(null);  
        } catch (error) {
            console.error('Error al cerrar la sesión', error);
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <div className="profile-card">
                <img src="https://i.pravatar.cc/150?img=67" className="rounded-circle w-50 mx-auto d-block" alt="user image"/>
                <h2 className="mt-4">Bienvenid@ {user.first_name} {user.last_name}</h2>
                <p className="lead">Tu rol es {user.role}</p>
                <button className="btn btn-dark mt-3" onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </Modal>
    );
};
export default ProfileModal;
