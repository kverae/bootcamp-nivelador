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

/**
 * Definir una ruta que, mediante un GET, devuelva sólo los documentos
 * que cumplen la condición en base a un query sobre uno o varios campos 
 * de un documento.
 */
app.get('/filter-users', async function (req, res) {
    try {
        const users = await User.find(req.body);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }  
});

/**
 * Definir una ruta con método PUT que modifique alguno de los campos 
 * de un documento (el cual debe cumplir alguna condición o query). Los 
 * códigos 4xx se dejan a su elección. Los códigos 2xx deben ser, como 
 * mínimo, los siguientes: 
 * 
 * i. If not found, create a new document in the database. (return 201 Created)
 * ii. If found, target keyword(s) to be successfully modified (200 OK)
 */
app.put('/', async function (req, res) {
    console.log(req.body._id);
    try {
        let statusNumber = 200; // successfully modified
        let user = await User.findOne({_id: req.body._id});
        if(user != null) {
            user.overwrite(req.body);
            await user.save();
        } else {
            statusNumber = 201; // created
            user = new User(req.body);
            await user.save();
        }        
        res.status(statusNumber).send(user);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
    
});

/**
 * Definir una ruta con método DELETE que elimine el(los) documento(s) 
 * que cumplan alguna condición o query. Los códigos 4xx se dejan a su 
 * elección. Los códigos 2xx deben ser, como mínimo, los siguientes:
 * 
 * i. If not found, do nothing. (204 No Content)
 * ii. If found, document deleted (200 OK)
 */
app.delete('/', async function (req, res) {
    console.log(req.query.id);
    try {
        let statusNumber = 200;
        const user = await await User.findOneAndDelete({ _id: req.query.id });
        if(user === null){
            statusNumber = 204;
        }
        res.status(statusNumber).json(user);
    } catch (error) {
        res.status(500).send(error);
    }    
});

app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);
