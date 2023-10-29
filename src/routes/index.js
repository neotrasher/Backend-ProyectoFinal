import express from 'express';
import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/api/products', productRoutes);
router.use('/api/carts', cartRoutes);
router.use('/users', userRoutes);

export default router;