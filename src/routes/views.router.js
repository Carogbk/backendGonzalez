import express from 'express';

const viewsRouter = express();

viewsRouter.get('/',(req, res)=>{
    res.render('index',{});
})

export default viewsRouter;