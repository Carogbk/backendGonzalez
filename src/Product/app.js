import express from "express";
const app = express();
import ProductManager from './productManager.js'
const productManager = new ProductManager();
// Configuração e rotas do Express

app.use(express.urlencoded({ extended: true }));

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
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});