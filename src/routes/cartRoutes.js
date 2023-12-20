import express from 'express';
import {
    getCarts,
    createCart,
    addProductToCart,
    getCartById,
    getProductsInCart,
    updateProductQuantityInCart,
    deleteProductFromCart,
    clearCart,
    updateCart,
    purchaseCart,
    deleteCart
} from '../controllers/cartController.js';
import { isAuthenticated } from '../controllers/authController.js';   

const router = express.Router();

router.get('/', getCarts);
router.post('/', createCart);
router.post('/:cid/product/:pid', isAuthenticated, addProductToCart);
router.get('/:cid', getCartById);
router.get('/:cid/products', getProductsInCart);
router.put('/:cid', isAuthenticated, updateCart);
router.put('/:cid/product/:pid', isAuthenticated, updateProductQuantityInCart);
router.delete('/:cid/product/:pid', isAuthenticated, deleteProductFromCart);
router.delete('/:cid', isAuthenticated, clearCart);
router.delete('/:cid/delete', isAuthenticated, deleteCart);
router.post('/:cid/purchase', isAuthenticated, purchaseCart);

export default router;


