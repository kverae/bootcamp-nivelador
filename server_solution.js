const express = require('express');
const bodyParser = require('body-parser');

// Constants
const hostname = '0.0.0.0';
const port = 8080;

const url = process.env.MONGODB_URL
const dbName = 'my-test-db2'; 

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL+dbName,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// App
const app = express();
app.use(bodyParser.json()); // for parsing application/json

const User = require('./models/user')

/**
 * Crear una ruta que, mediante un GET, 
 * devuelva todos los documentos en una colección
 */
app.get('/all-users', async function (req, res) {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }  
});

app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);
