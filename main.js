class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(productData) {
        if (!this.isCodeUnique(productData.code)) {
            throw new Error("El código del producto ya está en uso.");
        }

        const product = {
            id: this.generateUniqueId(),
            ...productData,
        };

        this.products.push(product);
        return product;
    }

    getProductById(productId) {
        const product = this.products.find((p) => p.id === productId);
        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        return product;
    }

    isCodeUnique(code) {
        return !this.products.some((p) => p.code === code);
    }

    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }
}

const productManager = new ProductManager();

const products = productManager.getProducts();
console.log(products);

const newProductData = {
    title: "Geometria Triangular",
    description: "Aretes Azules",
    price: 20000,
    thumbnail: "Sin imagen",
    code: "arete1",
    stock: 8,
};

const newProduct = productManager.addProduct(newProductData);
console.log(newProduct);

const updatedProducts = productManager.getProducts();
console.log(updatedProducts);

try {
    productManager.addProduct(newProductData);
} catch (error) {
    console.error(error.message);
}

try {
    const nonExistentProductId = "non-existent-id";
    const nonExistentProduct = productManager.getProductById(nonExistentProductId);
    console.log(nonExistentProduct);
} catch (error) {
    console.error(error.message);
}

try {
    const existingProductId = newProduct.id;
    const existingProduct = productManager.getProductById(existingProductId);
    console.log(existingProduct);
} catch (error) {
    console.error(error.message);
}
