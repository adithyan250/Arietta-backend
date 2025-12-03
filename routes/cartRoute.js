import express from 'express';
import { addtoCart, getUserCart, updateCart } from '../controllers/cartController.js';
import authuser from '../middlewares/auth.js';



const cartRouter = express.Router()

cartRouter.post('/get', authuser, getUserCart);
cartRouter.post('/add', authuser, addtoCart);
cartRouter.post('/update', authuser, updateCart);


export default cartRouter;
