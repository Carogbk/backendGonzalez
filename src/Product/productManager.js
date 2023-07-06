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

    async #saveEvent(events) {
        await fs.writeFile(this.path, JSON.stringify(events));
        this.events = events;
        return events;
      }

    getElement() {
        this.saveProductsToFile();
        return this.element;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        const data = await fs.readFile('./products.json', 'utf-8');
        this.element = JSON.parse(data);
        const product = {
            id: this.generateId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if (
            product.title !== undefined && product.description !== undefined &&
            product.price !== undefined && product.thumbnail !== undefined &&
            product.code !== undefined && product.stock !== undefined
        ) {
            if (this.element.some(x => x.code === product.code)) {
                console.log("Codigo existente, verificar codigo para agregar correctamente:", product);
            } else {
                this.element.push(product);
                await this.saveProductsToFile();
            }
        } else {
            console.log("Todos los campos son obligatorios, verificar campos:", product);
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

    async updateProduct(id, field, value) {
        const product = this.element.find(p => p.id === id);
        if (product) {
            product[field] = value;
            await this.saveProductsToFile();
            return product;
        } else {
            throw new Error('Producto no encontrado.');
        }
    }

    async deleteProduct(id) {
        const index = this.element.findIndex(p => p.id === id);
        if (index !== -1) {
            this.element.splice(index, 1);
            await this.saveProductsToFile();
        } else {
            throw new Error('Producto no encontrado.');
        }
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

// const product = new ProductManager();
// product.addProduct('Pelota 1', 'Futbol 11 Talleres', 7000, 
// 'Sin imagen', 'A0001', 10)
// product.addProduct('Pelota 2', 'Futbol 11 River', 7000, 
// 'Sin imagen', 'A0002', 20)
// product.addProduct('Pelota 3', 'Futbol 11 River', 7000, 
// 'Sin imagen', 'A0002', 20)
// product.addProduct('Pelota 4', 'Futbol 11 Independiente', 7000, 
// 'Sin imagen', 'A0004', 30)
// product.addProduct('Pelota 4', 'Futbol 11 Independiente', 
// 'Sin imagen', 'A0004', 30)
// product.addProduct('Pelota 4', 'Futbol 11 Independiente', 
// 'Sin imagen', 'A0004', 30)
// console.log('Productos Agregados: ',product.getElement())
// product.getProductById(2)
// product.getProductById(5)
// product.getProductById(1)

// const product = new ProductManager();
// await product.addProduct('Pelota 7', 'Futbol 11 sin motivo', 7000, 'Sin imagen', 'A0011', 20)
// console.log('Productos Agregados:', product.getElement());

// product.addProduct('Pelota 1', 'Futbol 11 Talleres', 7000, 'Sin imagen', 'A0001', 10)
//     .then(() => {
//         console.log('Productos Agregados:', product.getElement());
//         product.getProductById(1);
//         product.getProductById(5);
//     })
//     .catch(error => {
//         console.log(error.message);
//     });

// try {
//     product.updateProduct(2, 'price', 300)
//         .then(updatedProduct => {
//             console.log('Producto actualizado:', updatedProduct);
//         })
//         .catch(error => {
//             console.log(error.message);
//         });

//     product.deleteProduct(2)
//         .then(() => {
//             console.log('Producto eliminado.');
//         })
//         .catch(error => {
//             console.log(error.message);
//         });
// } catch (error) {
//     console.log(error.message);
// }
