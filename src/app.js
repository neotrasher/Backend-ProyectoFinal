import express from 'express';
import { engine } from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProductManager } from './models/ProductManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

const productManager = new ProductManager('products.json');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('index', { products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realtimeproducts', { products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

const server = http.createServer(app);
const io = new Server(server, {
    path: '/socket.io'
});

io.on('connection', (socket) => {
    console.log('Cliente conectado');
    // Evento de creación de producto
    socket.on('createProduct', async (productData) => {
        try {
            const newProduct = await productManager.addProduct(productData);
            io.emit('productCreated', newProduct);
        } catch (error) {
            console.error("Error al crear el producto:", error);
        }
    });
    // Evento de eliminación de producto
    socket.on('deleteProduct', async (productId) => {
        console.log('Evento de eliminación recibido:', productId);
        try {
            await productManager.deleteProduct(productId);
            io.emit('productDeleted', productId);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    });
    // Evento de actualización de producto
    socket.on('updateProduct', async (updatedProductData) => {
        try {
            const updatedProduct = await productManager.updateProduct(updatedProductData.productId, updatedProductData.updatedFields);
            io.emit('productUpdated', updatedProduct);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    });
});

server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

export { io, productManager };
