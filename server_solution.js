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

app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);