const express = require('express');

const app = express();
const port = 3000;

const { initializeDBconnection } = require("./db/db.connect.js")

initializeDBconnection();

app.get('/', (req, res) => res.json({hello: "world"}));

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));