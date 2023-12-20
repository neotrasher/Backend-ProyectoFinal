import React from 'react';
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

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <NavBar
                    instagramUrl="assets/img/instagram.png"
                    facebookUrl="assets/img/facebook.png"
                    whatsappUrl="assets/img/whatsapp.png"
                    userUrl="assets/img/cuenta.png"
                    magusLogo="assets/img/maguslogo.png"
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
            </CartProvider>
        </BrowserRouter>
        
    );
}

export default App;

