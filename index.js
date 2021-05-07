const express = require('express')
const cors = require('cors')


const app = express()
app.use(express.json())

app.use(cors())
const port = 3000;
const products = require('./routes/products.router.js')
const carts = require('./routes/cart.router.js')
const wishlists = require('./routes/wishlist.router.js')

const { initializeDBconnection } = require("./db/db.connect.js")

initializeDBconnection()

app.use('/products',products)
app.use('/carts', carts)
app.use('/wishlists', wishlists)

app.get('/', (req, res) => res.json({hello: "world"}))

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`))