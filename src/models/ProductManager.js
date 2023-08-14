import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

class ProductManager {
    constructor(filePath) {
        const __filename = fileURLToPath(import.meta.url);
        this.path = path.join(path.dirname(__filename), '..', 'data', filePath);
        this.products = [];
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    async saveProducts() {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    async getProducts() {
        await this.loadProducts();
        return this.products;
    }

    async addProduct(productData) {
        await this.loadProducts();
        const product = {
            id: this.generateUniqueId(),
            ...productData,
        };

        this.products.push(product);
        await this.saveProducts();
        return product;
    }

    async getProductById(productId) {
        await this.loadProducts();
        const product = this.products.find((p) => p.id === productId);
        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        return product;
    }

    async updateProduct(productId, updatedFields) {
        await this.loadProducts();
        const productIndex = this.products.findIndex((p) => p.id === productId);
        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        await this.saveProducts();
        return this.products[productIndex];
    }

    async deleteProduct(productId) {
        await this.loadProducts();
        const productIndex = this.products.findIndex((p) => p.id === productId);
        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        this.products.splice(productIndex, 1);
        await this.saveProducts();

        return "Producto eliminado correctamente.";
    }

    isCodeUnique(code) {
        return !this.products.some((p) => p.code === code);
    }

    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }
}

export { ProductManager };
