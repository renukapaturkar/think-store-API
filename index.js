const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express()
app.use(express.json())

app.use(cors())
const port = 3000;
const products = require('./routes/products.router.js')

const { initializeDBconnection } = require("./db/db.connect.js")

initializeDBconnection()

app.use('/products',products)

app.get('/', (req, res) => res.json({hello: "world"}))

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`))