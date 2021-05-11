const express = require("express");
const router = express.Router();
const { Wishlist } = require("../models/wishlist.models.js");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const data = await Wishlist.find({});
      if (!data) {
        res
          .status(500)
          .json({ success: false, message: "Wishlist data not found" });
      } else {
        res.json({ success: true, WishlistData: data });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "internal Server Error",
        errMessage: error.message,
      });
    }
  })

  .post(async (req, res) => {
    try {
      const wishlistProduct = req.body;
      const newItem = new Wishlist(wishlistProduct);
      const savedItem = await newItem.save();
      const data2 = await Wishlist.findById(savedItem._id).populate(
        "wishlistArray.productId"
      );

      res.json({ success: true, WishlistData: data2 });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to store data in database",
        errorMessage: error.message,
      });
    }
  });

router
  .route("/:wishlistId")
  .get(async (req, res) => {
    try {
      const { wishlistId } = req.params;
      const data = await (await Wishlist.findById(wishlistId)).populate(
        "wishlistArray.productId"
      );
      if (!data) {
        res
          .status(400)
          .json({
            success: false,
            message: "The wishlist data could not be found,",
          });
      }
      res.json({ success: true, WishlistData: data });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          errorMessage: error.message,
        });
    }
  })

  .post(async (req, res) => {
    try {
      const { wishlistArray } = req.body;
      const { wishlistId } = req.params;
      const data = await Wishlist.findById(wishlistId);
      console.log(data)
      await data.wishlistArray.push(wishlistArray);
      await data.save();

      const dataSaved = await Wishlist.findById(wishlistId).populate(
        "wishlistArray.productId"
      );
      res.json({ success: true, WishlistData: dataSaved });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          errorMessage: error.message,
        });
    }
  });
module.exports = router;
