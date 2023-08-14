import { CartManager } from '../models/CartManager.js';
import { ProductManager } from '../models/ProductManager.js';

const cartManager = new CartManager('carts.json');
const productManager = new ProductManager('products.json');

export const createCart = async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const { productId, quantity } = req.body; 
        const updatedCart = await cartManager.addProductToCart(cartId, productId, quantity); 
        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const getCartById = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCartById(cartId);
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const getProductsInCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productsInCart = await cartManager.getProductsInCart(cartId);
        res.json(productsInCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const updateProductQuantityInCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const { productId, quantity } = req.body;
        const updatedCart = await cartManager.updateProductQuantityInCart(cartId, productId, quantity);
        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

