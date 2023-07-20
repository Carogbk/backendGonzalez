import { Router } from "express";
import CartManager from '../cartsManager.js';
const cartManager = new CartManager();
const cartRouter = Router();

cartRouter.post("/", (req, res) => {
    try {
      const newCart = cartManager.createCart();
      res.send(newCart);
    } catch (error) {
      res.status(500).send({ error: true, message: error.message });
    }
  });
  
  cartRouter.get("/:cid", (req, res) => {
    try {
      const { cid } = req.params;
      const cart = cartManager.getCartById(cid);
      if (cart) {
        res.send(cart.products);
      } else {
        res.status(404).send({ error: true, message: "Carrito no encontrado" });
      }
    } catch (error) {
      res.status(500).send({ error: true, message: error.message });
    }
  });
  
  cartRouter.post("/:cid/product/:pid", (req, res) => {
    try {
      const { cid, pid } = req.params;
      const quantity = req.body.quantity || 1;
      const cart = cartManager.addProductToCart(cid, pid, quantity);
      res.send(cart);
    } catch (error) {
      res.status(500).send({ error: true, message: error.message });
    }
  });

  export default cartRouter;