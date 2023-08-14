import express from 'express';
import { createCart, addProductToCart, getCartById, getProductsInCart, updateProductQuantityInCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.get('/:cid/products', getProductsInCart);
router.post('/:cid/product', addProductToCart);
router.put('/:cid/product', updateProductQuantityInCart);

export default router;

