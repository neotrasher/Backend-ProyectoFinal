import React from 'react';
import Modal from 'react-modal';

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

const ProfileModal = ({ isOpen, onRequestClose, user }) => {
    if (!user) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <div className="profile-card">
                <img src="https://i.pravatar.cc/150?img=67" className="rounded-circle w-50 mx-auto d-block" alt="user image"/>
                <h2 className="mt-4">Bienvenido {user.first_name} {user.last_name}</h2>
                <p className="lead">Tu edad es {user.age}</p>
            </div>
        </Modal>
    );
};
export default ProfileModal;
