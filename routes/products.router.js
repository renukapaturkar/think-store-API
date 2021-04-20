const express = require('express')
const router = express.Router()
const {Product} = require('../models/product.models')
const extend =  require('lodash')
const productsList = require('../data/productsList.data.js')



router.route('/')
.get(async(req, res)=>{
    
    try{
        const product = await Product.find({})
        res.json({success:true, product})
    }catch(error){
        res.json({success: false, errorMessage: "Cannot get the products, something went wrong!"})
    }
})

.post(async(req,res)=>{
    try{
        const product = req.body
        const NewProduct = new Product(product)
        // console.log(product)
        const savedProduct = await NewProduct.save()
        // console.log(savedProduct)

    }catch(error){
        res.json({success: false, errorMessage:"cannot save products to database, something went wrong!"})
    }
})

module.exports = router