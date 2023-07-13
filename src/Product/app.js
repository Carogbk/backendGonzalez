import express from "express";
const app = express();
import ProductManager from './productManager.js'
import CartManager from './cartsManager.js';
const productManager = new ProductManager();
const cartManager = new CartManager();
// Configuração e rotas do Express

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Product
app.get("/products", async (req, res) => {
  try {
    const productsList = await productManager.getElement();
    const limit = parseInt(req.query.limit);
    if(limit){
      const limitedProducts = productsList.slice(0, limit); 
      res.json(limitedProducts);
    }else{
      res.send(productsList);
    }
  } catch (e) {
    res.status(502).send({error: true});
  }
})

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getProductById(id);
    res.send(product);
  } catch (e) {
    res.status(502).send({error: true});
  }

})

app.post("/products", async (req, res) => {
  const body = req.body;
  console.log(body)
  if(!body.title || !body.description || !body.price || !body.code || !body.stock){
    res.send({ error: true, msg: "Contenido faltante" });
  }else{
    try {
      const result = await productManager.addProduct(body);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(502).send({ error: true});
    }
  }
})

app.put("/products/:pid", async (req,res) => {

  try {
    const { pid } = req.params;
  
    const product = req.body;
    const result = await productManager.updateProduct(pid, product);
    res.send({ update: true });
  } catch (error) {
    res.status(502).send({error: true});
  }
})

app.delete("/products/:pid", async (req,res)=>{
  try {
    const {pid} = req.params;
    await productManager.deleteProduct(pid);
    req.send({ delete : true});
  } catch (error) {
    res.status(502).send({ error: true});
  }
})

// Carts
app.post("/api/carts", (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.send(newCart);
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
});

app.get("/api/carts/:cid", (req, res) => {
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

app.post("/api/carts/:cid/product/:pid", (req, res) => {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity || 1;
    const cart = cartManager.addProductToCart(cid, pid, quantity);
    res.send(cart);
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});