
import fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
export default class CartManager {
  constructor() {
    this.carts = [];
    this.path = `${__dirname}/db/carts.json`;
    this.loadCartsFromFile();
  }

  async loadCartsFromFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.carts = JSON.parse(data);
    } catch (err) {
      console.log("No se pudo cargar el archivo de carritos.");
      await this.saveCartsToFile();
    }
  }

  async saveCartsToFile() {
    await fs.writeFile(this.path, JSON.stringify(this.carts));
  }

  generateCartId() {
    const lastId = this.carts.length > 0 ? this.carts[this.carts.length - 1].id : 0;
    return lastId + 1;
  }

  createCart() {
    const cartId = this.generateCartId();
    const newCart = {
      id: cartId,
      products: [],
    };
    this.carts.push(newCart);
    this.saveCartsToFile();
    return newCart;
  }

  getCartById(cartId) {
    return this.carts.find((cart) => cart.id == cartId);
  }

  addProductToCart(cartId, productId, quantity = 1) {
    const cart = this.getCartById(cartId);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    const existingProduct = cart.products.find((product) => product.id == productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    this.saveCartsToFile();
    return cart;
  }
}