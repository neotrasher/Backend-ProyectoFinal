import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 8080;
const filePath = 'products.json';

const productManager = new ProductManager(filePath);

app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        await productManager.loadProducts();
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = productManager.getProducts();

        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        await productManager.loadProducts();
        const productId = req.params.pid;
        const product = productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

async function loadProducts() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
