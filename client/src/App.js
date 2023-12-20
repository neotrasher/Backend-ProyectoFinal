import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Footer/Footer';
import Homepage from './pages/Homepage';
import Creadora from './pages/Creadora';
import Contacto from './pages/Contacto';
import Colecciones from './pages/Colecciones';
import { CartProvider } from './context/CartContext'
import Cart from './components/Cart/Cart'
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';
import InstagramImage from './assets/img/instagram.png';
import FacebookImage from './assets/img/facebook.png';
import WhatsappImage from './assets/img/whatsapp.png';
import UserImage from './assets/img/cuenta.png';
import MagusLogoImage from './assets/img/maguslogo.png';
import AuthModal from './components/AuthModal/AuthModal';
import ProfileModal from './components/ProfileModal/ProfileModal';

function App() {
    const [user, setUser] = useState(null); 
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); 
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); 

    const handleUserIconClick = () => {
        if (user) {
            setIsProfileModalOpen(true);
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const handleUserChange = (userData) => {
        setUser(userData);
    };

    const handleAuthModalClose = () => {
        setIsAuthModalOpen(false);
    };

    const handleProfileModalClose = () => {
        setIsProfileModalOpen(false);
    };

    return (
        <BrowserRouter>
            <CartProvider>
                <NavBar
                    instagramUrl={InstagramImage}
                    facebookUrl={FacebookImage}
                    whatsappUrl={WhatsappImage}
                    userUrl={UserImage}
                    magusLogo={MagusLogoImage}
                    onUserIconClick={handleUserIconClick} 
                />
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/magusbylili' element={<Creadora />} />
                    <Route path='/productos' element={<ItemListContainer />} />
                    <Route path='/colecciones' element={<Colecciones />} />
                    <Route path='/contacto' element={<Contacto />} />
                    <Route path='/categoria/:productCat' element={<ItemListContainer />} />
                    <Route path='/item/:itemId' element={<ItemDetailContainer />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path="/orderconfirmation" element={<OrderConfirmation />} />
                    <Route path='*' element={<h1>404 Not Found</h1>} />
                    </Routes>
                <Footer />
                <AuthModal isOpen={isAuthModalOpen} onRequestClose={handleAuthModalClose} onUserChange={handleUserChange} />
                <ProfileModal user={user} isOpen={isProfileModalOpen} onRequestClose={handleProfileModalClose} />
            </CartProvider>
        </BrowserRouter>
        
    );
}

export default App;
