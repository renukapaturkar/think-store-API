const express = require("express");
const router = express.Router();
const { Cart } = require("../models/cart.models.js");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const data = await Cart.find({});
      if (!data) {
        res
          .status(400)
          .json({ success: false, message: "Items were not found!" });
      } else {
        res.json({ success: true, CartData: data });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  })

  .post(async (req, res) => {
    try {
      const cartProduct = req.body;
      const newItemInCart = new Cart(cartProduct);
      const savedCartProduct = await newItemInCart.save();
      const data2 = await Cart.findById(savedCartProduct._id).populate("productsArray.productId")
      res.json({ success: true, CartData: data2 });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Unable to store product in database",
          errorMessage: error.message,
        });
    }
  });

router.route('/:cartId')
.get(async(req, res)=>{
    try{
     
        const {cartId} = req.params
        const data = await Cart.findById(cartId).populate("productsArray.productId")
        if(!data){

            res.status(400).json({success: false, message: "product could not be found"})
        }
        res.json({success: true, CartData: data})

    }catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", errorMessage: error.message})
    }

})

.post(async(req, res)=>{
    try{
        const {productsArray} = req.body;
        const {cartId} = req.params
        const data = await Cart.findById(cartId)
        await data.productsArray.push(productsArray)
        await data.save()
        const data2 = await Cart.findById(cartId).populate("productsArray.productId")
        
        
        res.json({success: true, CartData :data2})
    }catch(error){
        res.status(500).json({success:false, message: "Internal Server error", errorMessage: error.message})
    }
})


router.route('/:cartId/:productId')
.post(async(req, res)=>{
    try {
        const {cartId, productId} = req.params
        const { quantity } = req.body
        await Cart.findById(cartId).updateOne({'productsArray._id': productId}, {$set: {'productsArray.$.quantity': quantity}})
        const data2 = await Cart.findById(cartId).populate("productsArray.productId")
        console.log(data2)
        res.json({success: true, CartData: data2})
    }catch(error){
        res.status(500).json({success: false, error: "Internal Server Error", errorMessage: error.message})
    }
})
.delete(async(req, res)=>{
    try{
        const {cartId, productId} = req.params
        const updatedCartData = await Cart.findById(cartId).updateOne({'productsArray._id': productId}, {$pull:{ productsArray: {"productId": productId}}})
        const data2 = await Cart.findById(cartId).populate("productsArray.productId")
        res.json({success: true, CartData : data2})
    }catch(error){
        res.status(500).json({success: false,error: "Internal Server Error", errorMessage: error.message})
    }
})


module.exports = router;
