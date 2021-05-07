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

module.exports = router;
