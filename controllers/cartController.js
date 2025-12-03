import userModel from "../models/userModel.js";

// add products to user cart


const addtoCart = async (req, res) => {
    try {
        const {userId, itemId, color} = req.body;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if(cartData[itemId]){

            if(cartData[itemId][color]) {
                cartData[itemId][color] += 1;
            }else{
                cartData[itemId][color] = 1
            }

        }else{
            cartData[itemId] = {}
            cartData[itemId][color] = 1
        }

        const added = await userModel.findByIdAndUpdate(userId, {cartData})

        if(added){
            res.json({ success: true, message: "Added To Cart"})
            
        }
        res.json({ success: false, message: "Not Added To Cart"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// update products to user cart

const updateCart = async (req, res) => {
    try {
        const {userId, itemId, color, quantity} = req.body;
                
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][color] = quantity;
        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({ success: true, message: "Cart Updated"})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// get user cart data

const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        console.log("cartData: ", cartData);
        
        res.json({success: true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export {
    addtoCart,
    updateCart,
    getUserCart
}