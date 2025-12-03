import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// placing order using COD 
const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        const order =await newOrder.save();

        if(order){
            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            res.json({success: true, message: 'Order Placed'})
        }else{
            res.json({success: false, message: 'order is not placed'})
        }
        

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// placing order using Stripe Method 
const placeOrderStripe = async (req, res) => {
    
}

// placing order using RazorPay Method 
const placeOrderRazorPay = async (req, res) => {
    
}

// All orders data for Admin panel

const allOrders = async (req, res) => {

}

// User Order for Frontend 

const userOrders = async (req, res) => {
    try {
        const {userId } = req.body
        const orders = await orderModel.find({userId})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// update Order Status from Admin Panel

const updateStatus = (req, res) => {

}

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorPay,
    allOrders,
    userOrders,
    updateStatus
}