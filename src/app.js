import express from 'express';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express();
const port = 8080;

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Middleware para manejar rutas no válidas (404)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});