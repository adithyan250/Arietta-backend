import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';

// Add product 

const addProduct = async (req, res) => {
    try {

    const {name, description, price, category, subcategory, color, bestseller} = req.body;

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter((item)=> item !== undefined)

    let imagesUrl = await Promise.all(
        images.map( async ( item) => {
            let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
            return result.secure_url
        })
    )

    const productData = {
        name,
        description,
        category,
        price,
        subcategory,
        bestseller:bestseller === 'true' ? true : false,
        color: JSON.parse(color),
        image:imagesUrl,
        date: Date.now()
    }

    console.log(productData);
    
    const product = new productModel(productData);
    const productSave = await product.save()

    if(!productSave){
        res.json({success:false, message: "product is not saved"})
    }

    res.json({success:true, message: "products added"})

    res.json({imagesUrl})
    
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// list product 

const listProduct = async (req, res) => {
    
}

// remove product 

const removeProduct = async (req, res) => {
    
}

// single product info 

const singleProduct = async (req, res) => {
    
}

export {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct

}
