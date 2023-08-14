import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProductManager } from '../models/ProductManager.js';

class CartManager {
    constructor(filePath) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.path = path.join(__dirname, '..', 'data', filePath);
        this.carts = [];
        this.productManager = new ProductManager('products.json');
    }

    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    async saveCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf-8');
    }

    async createCart() {
        await this.loadCarts();
        const cart = {
            id: this.generateUniqueId(),
            products: [],
        };

        this.carts.push(cart);
        await this.saveCarts();
        return cart;
    }

    async getCartById(cartId) {
        await this.loadCarts();
        const cart = this.carts.find((c) => c.id === cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado.");
        }
        return cart;
    }

    async getProductsInCart(cartId) {
        const cart = await this.getCartById(cartId);
        return cart.products;
    }

    async addProductToCart(cartId, productId, quantity) {
        await this.loadCarts();
        const cartIndex = this.carts.findIndex((c) => c.id === cartId);
        if (cartIndex === -1) {
            throw new Error("Carrito no encontrado.");
        }
    
        const existingProductIndex = this.carts[cartIndex].products.findIndex((p) => p.productId.id === productId);
        if (existingProductIndex !== -1) {
            this.carts[cartIndex].products[existingProductIndex].quantity += quantity;
        } else {
            const product = await this.productManager.getProductById(productId);
            this.carts[cartIndex].products.push({ productId: product, quantity });
        }
    
        await this.saveCarts();
        return this.carts[cartIndex];
    }

    async updateProductQuantityInCart(cartId, productId, quantity) {
        await this.loadCarts();
        const cartIndex = this.carts.findIndex((c) => c.id === cartId);
        if (cartIndex === -1) {
            throw new Error("Carrito no encontrado.");
        }

        const productIndex = this.carts[cartIndex].products.findIndex((p) => p.productId === productId);
        if (productIndex === -1) {
            throw new Error("Producto no encontrado en el carrito.");
        }

        this.carts[cartIndex].products[productIndex].quantity = quantity;
        await this.saveCarts();
        return this.carts[cartIndex];
    }

    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }
}

export { CartManager };
