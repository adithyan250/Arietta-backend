import express from 'express';
import adminAuth from '../middlewares/adminAuth.js'
import { placeOrder, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, updateStatus, verifyStipe, verifyRazorpay } from '../controllers/orderController.js';
import authUser from '../middlewares/auth.js'


const orderRouter = express.Router()

// admin pages
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// payment Feature
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorPay);

// user Feature
orderRouter.post('/userorders', authUser, userOrders);

// verify payment
orderRouter.post('/verifyStripe', authUser, verifyStipe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default orderRouter
