import productModel from './models/products.models.js';

const setupSockets = (io) => {
  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('createProduct', async (productData) => {
        try {
            const newProduct = await productModel.create(productData);
            io.emit('productCreated', newProduct);
        } catch (error) {
            console.error("Error al crear el producto:", error);
        }
    });

    socket.on('deleteProduct', async (productId) => {
        try {
            await productModel.findByIdAndDelete(productId);
            io.emit('productDeleted', productId);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    });

    socket.on('updateProduct', async (updatedProductData) => {
        try {
            const { productId, updatedFields } = updatedProductData;
            const updatedProduct = await productModel.findByIdAndUpdate(
                productId,
                updatedFields,
                { new: true }
            );
            io.emit('productUpdated', updatedProduct);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    });
  });
};

export default setupSockets;
