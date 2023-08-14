import express from 'express';
import multer from 'multer';
import { ProductManager } from '../models/ProductManager.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productManager = new ProductManager('products.json');
const router = express.Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'public', 'thumbnails'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage });

router.post('/', upload.single('thumbnail'), async (req, res) => {
    try {
        const productData = req.body;
        const thumbnailPath = req.file ? req.file.path : '';        
        const thumbnails = productData.thumbnails || [];        
        const newProduct = await productManager.addProduct({ ...productData, thumbnails, thumbnail: thumbnailPath });
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const getProducts = async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productManager.addProduct(productData);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        const updatedFields = req.body;
        const updatedProduct = await productManager.updateProduct(productId, updatedFields);
        res.json(updatedProduct);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        await productManager.deleteProduct(productId);
        res.status(200).send("Producto eliminado correctamente.");
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export default router;