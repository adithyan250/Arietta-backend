import express from 'express';
import { loginUser, registeruser, loginAdmin } from '../controllers/userController.js';



const userRouter = express.Router();

userRouter.post('/register', registeruser);

userRouter.post('/login', loginUser);

userRouter.post('/admin', loginAdmin);

export default userRouter;


