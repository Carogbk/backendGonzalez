import fs from "fs/promises";

export default class ProductManager {
    constructor() {
        this.element = [];
        this.path = `products.json`;
        this.loadProductsFromFile();
    }

    async loadProductsFromFile() {
        try {
            const data = await fs.readFile('products.json', 'utf-8');
            this.element = JSON.parse(data);
        } catch (err) {
            console.log('No se pudo cargar el archivo de productos.');
            this.#saveEvent([])
        }
    }

    async #saveEvent(prod) {
        await fs.writeFile(this.path, JSON.stringify(prod));
        this.element = prod;
        return prod;
      }

    getElement() {
        this.saveProductsToFile();
        return this.element;
    }

    async addProduct(product) {
        const data = await fs.readFile('./products.json', 'utf-8');
        this.element = JSON.parse(data);
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } = product;
        try {
            const products = {
                id: this.generateId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            if (this.element.some(x => x.code === products.code)) {
                console.log("Codigo existente, verificar codigo para agregar correctamente:", products);
            } else {
                this.element.push(products);
                await this.saveProductsToFile();
            }
        } catch (error) {
            console.log(error)
        }
     

        return product;
    }

    getProductById(id) {
        const item = this.element.find(x => x.id == id);
        if (item) {
            console.log("Producto existente:", item);
            return item
        } else {
            console.log("Not found");
            const mgs = [
                {
                    'Error': 'Producto No Existe.'
                }
            ]
            return mgs;
        }
    }

    async updateProduct(id, product) {
         const productIndex = this.element.findIndex(p => p.id == id);
        if(productIndex == -1) return false
        this.element[productIndex] = {
            ...this.element[productIndex],
            ...product
        }
        await this.#saveEvent(this.element)
       
    }

    async deleteProduct(id) {
        const index = this.element.findIndex(p => p.id == id);
        if(index == -1) return false
        this.element.splice(index, 1);
        await this.#saveEvent(this.element)
      
    }

    async saveProductsToFile() {
        try {
            const data = JSON.stringify(this.element);
            await fs.writeFile('products.json', data, 'utf-8');
        } catch (err) {
            console.log('No se pudo guardar el archivo de productos.');
        }
    }

    generateId() {
        const lastId = this.element.length > 0 ? this.element[this.element.length - 1].id : 0;
        return lastId + 1;
    }
}

