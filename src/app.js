import express from "express";
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";

import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';
import viewsRouter from './routes/views.router.js';
import { Server } from "socket.io";

const app = express();

app.use(express.static("public"));

app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/",viewsRouter)

app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

// app.get('/index',(req, res)=>{
//   let testUser = {
//     name:'Hilda',
//     last_name:'Martinez'
//   }
//   res.render('index',testUser);
// })
// const port = 8080;
// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });
const httpServer = app.listen(8080, ()=> console.log("Listening music hevy metal for ever"));
const socketServer = new Server(httpServer);
socketServer.on('connection', socket=>{
  console.log("Nuevo cliente conectado");
  socket.on('mensage', data=>{
    console.log(data)
  })
  socket.emit('evento_para_socket_individual','Este mensaje solo lo debe recibir el socket');

  socket.broadcast.emit('evento_para_todos_menos_el_socket_actual', 'Este evento lo veran Todos los sockets conectados, Menos el socket actual desde el que se envio el mensaje');

  
socketServer.emit('ebento_para_todos', 'Este mensaje lo rebibe todos los sockets conectados');
})


