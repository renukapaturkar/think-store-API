const express = require('express')
const router = express.Router()
const {Product} = require('../models/product.models')
const extend =  require('lodash')
const productsList = require('../data/productsList.data.js')

router.route('/')
.get(async(req, res)=>{
    try{
        const product = Product.find({})
        res.json({success:true, product})
    }catch(error){
        res.json({success: false, errorMessage: "Cannot get the products, something went wrong!"})
    }
})

.post(async(req,res)=>{
    try{
        const product = req.body
        const newProduct = new Product(product)
        const savedProduct = await newProduct.save()
    }catch(error){
        res.json({success: false, errorMessage:"cannot save products to database, something went wrong!"})
    }
})

module.exports = router