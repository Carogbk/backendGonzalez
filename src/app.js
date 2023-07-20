import express from "express";
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";

import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';

const app = express();
app.use(express.static("public"));

app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

app.get('/index',(req, res)=>{
  let testUser = {
    name:'Hilda',
    last_name:'Martinez'
  }
  res.render('index',testUser);
})
const port = 8080;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});