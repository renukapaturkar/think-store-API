const mongoose = require("mongoose")

function initializeDBconnection() {
    mongoose.connect("mongodb+srv://renukapaturkar:Eloquence@3497@neog-cluster.fns0z.mongodb.net/inventory?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log("mongodb successfully connected"))
    .catch(error => console.error("mongodb connection failed... ", error))
}

module.exports = { initializeDBconnection }