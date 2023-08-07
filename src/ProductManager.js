import {promises as fs } from 'fs'

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
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

    getProducts() {
        return this.products;
    }

    async addProduct(productData) {
        const product = {
            id: this.generateUniqueId(),
            ...productData,
        };

        this.products.push(product);
        await this.saveProducts();
        return product;
    }

    getProductById(productId) {
        const product = this.products.find((p) => p.id === productId);
        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        return product;
    }

    async updateProduct(productId, updatedFields) {
        const productIndex = this.products.findIndex((p) => p.id === productId);
        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        await this.saveProducts();
        return this.products[productIndex];
    }

    async deleteProduct(productId) {
        const productIndex = this.products.findIndex((p) => p.id === productId);
        if (productIndex === -1) {
            throw new Error("Producto no encontrado.");
        }

        this.products.splice(productIndex, 1);
        await this.saveProducts();
    }

    isCodeUnique(code) {
        return !this.products.some((p) => p.code === code);
    }

    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }
}

const filePath = 'products.json';
const productManager = new ProductManager(filePath);

async function testProductManager() {
    try {
        await productManager.loadProducts();

        console.log('Productos iniciales:', productManager.getProducts());

        const newProductData = {
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200000,
            thumbnail: "Sin imagen",
            code: "codigoXX",
            stock: 8,
        };

        const newProduct = await productManager.addProduct(newProductData);
        console.log('Producto agregado:', newProduct);

        console.log('Productos actualizados:', productManager.getProducts());

        const productIdToFind = newProduct.id;
        console.log('Producto encontrado por ID:', productManager.getProductById(productIdToFind));

        const updatedFields = { title: "Producto actualizado", price: 55000 };
        const updatedProduct = await productManager.updateProduct(productIdToFind, updatedFields);
        console.log('Producto actualizado:', updatedProduct);

        await productManager.deleteProduct(productIdToFind);
        console.log('Productos después de eliminar el producto:', productManager.getProducts());

        try {
            console.log('Producto eliminado:', productManager.getProductById(productIdToFind));
        } catch (error) {
            console.error('Error al buscar producto eliminado:', error.message);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testProductManager();

export default ProductManager;