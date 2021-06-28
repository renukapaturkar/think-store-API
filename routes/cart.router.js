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
      const user = req.user;
      const newItemInCart = new Cart({user: user._id, productsArray: [{_id: cartProduct.productsArray._id}]})
      const savedCartProduct = await newItemInCart.save();
      const data2 = await Cart.findById(savedCartProduct._id).populate(
        "productsArray._id"
      );
      res.json({ success: true, CartData: data2 });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Unable to store product in database",
        errorMessage: error.message,
      });
    }
  });

router
  .route("/:cartId")
  .get(async (req, res) => {
    try {
      const { cartId } = req.params;
      const user = req.user;

      const data = await Cart.findById(cartId).populate(
        "productsArray._id"
      );
      if (!data) {
        res
          .status(400)
          .json({ success: false, message: "product could not be found" });
      }
      res.json({ success: true, CartData: data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errorMessage: error.message,
      });
    }
  })

  .post(async (req, res) => {
    try {
      const {productsArray} = req.body;
      console.log(productsArray)
      const { cartId } = req.params;
      const user = req.user;
      const data = await Cart.findOneAndUpdate({user: user._id}, {$addToSet: {productsArray: productsArray}})
      console.log(data)
      const savedData = await Cart.findById(cartId).populate("productsArray._id")
      res.json({ success: true, CartData: savedData });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server error",
        errorMessage: error.message,
      });
    }
  });

router
  .route("/:cartId/:productId")
  .post(async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const quantity  = req.body;
      console.log(quantity)
      const user = req.user;
      await Cart.findOne({user: user._id}).updateOne(
        { "productsArray._id": productId },
        { $set: { "productsArray.$.quantity": quantity } }
      );
      const data2 = await Cart.findById(cartId).populate(
        "productsArray._id"
      );
      console.log("data2",data2);
      res.json({ success: true, CartData: data2 });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
        errorMessage: error.message,
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const user = req.user;
      const updatedCartData = await Cart.findOne({user: user._id}).updateOne(
        { "productsArray._id": productId },
        { $pull: { productsArray: { _id: productId } } }
      );
      const data2 = await Cart.findById(cartId).populate(
        "productsArray._id"
      );
      res.json({ success: true, CartData: data2 });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
        errorMessage: error.message,
      });
    }
  });

module.exports = router;
