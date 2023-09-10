import Cart from '../models/carts.models.js';


export const createCart = async (req, res) => {
    try {
        const newCart = await Cart.create({ products: [] });
        res.json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            {
                $push: {
                    products: {
                        id_prod: productId,
                        quantity: quantity,
                    },
                },
            },
            { new: true }
        );

        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const getCartById = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await Cart.findById(cartId).populate({
            path: 'products.id_prod',
            model: 'products'
        });

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductsInCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await Cart.findById(cartId).populate({
            path: 'products.id_prod',
            model: 'products'
        });

        if (!cart) {
            return res.status(404).json({ error: 'Carrito sin productos encontrados' });
        }

        res.json(cart.products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateProductQuantityInCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body;

        const updatedCart = await Cart.findOneAndUpdate(
            { _id: cartId, "products.id_prod": productId },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }

        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            {
                $pull: {
                    products: { id_prod: productId },
                },
            },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }

        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const cartId = req.params.cid;

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { products: [] },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
