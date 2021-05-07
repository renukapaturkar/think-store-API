const express = require("express");
const mongoose = require("mongoose");
const { Product } = require("./product.models.js");
const { Schema } = mongoose;

const WishlistSchema = new Schema({
  wishlistArray: [
    { _id: String, productId: { type: Schema.Types.ObjectId, ref: "Product" } },
  ],
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = { Wishlist };
