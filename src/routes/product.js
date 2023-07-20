import { Router } from "express";
import ProductManager from '../productManager.js';
const productManager = new ProductManager();
const productRouter = Router();

productRouter.get("/", async (req, res) => {
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
  
  productRouter.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productManager.getProductById(id);
      res.send(product);
    } catch (e) {
      res.status(502).send({error: true});
    }
  
  })
  
  productRouter.post("/", async (req, res) => {
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
  
  productRouter.put("/:pid", async (req,res) => {
  
    try {
      const { pid } = req.params;
    
      const product = req.body;
      const result = await productManager.updateProduct(pid, product);
      res.send({ update: true });
    } catch (error) {
      res.status(502).send({error: true});
    }
  })
  
  productRouter.delete("/:pid", async (req,res)=>{
    try {
      const {pid} = req.params;
      await productManager.deleteProduct(pid);
      req.send({ delete : true});
    } catch (error) {
      res.status(502).send({ error: true});
    }
  })

  export default productRouter;