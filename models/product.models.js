const express = require('express')
const mongoose = require('mongoose')
const {Schema} = mongoose;

const ProductsSchema = new Schema({
    title: {type:String, required: "cannot enter details without field 'title', please enter details of product" },
    image_url: {type:String, required: "cannot enter details without field 'image_url', please enter details of product"},
    price: {type: Number, required: "cannot enter details without field 'price', please enter details of product"},
    book_format: {type: Array, required: "cannot enter details without field 'book_format', please enter details of product"},
    genre: {type:String, required : "cannot enter details without field 'genre', please enter details of product" },  
    author: {type:Array, required: "cannot enter details without field 'author', please enter details of product"},
    language: {type:Array, required: "cannot enter details without field 'language', please enter details of product."},
    delivery: {type: String, required: "cannot enter details without field 'delivery', please enter details of product."},
    description: {type: String, minLength: [20,"cannot enter details without field 'delivery', please enter details of product."]}

});

const Product = mongoose.model('product', ProductsSchema);


module.exports = {Product}