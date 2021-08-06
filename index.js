// import express, body-parser 
const express = require("express");
const bodyParser = require("body-parser");
const accountRoutes = require('./routes/accounts');
const bankRoutes = require('./routes/bank');

const mongoose = require('mongoose');

//create an instance of express
const server = express();

//middlewares
server.use(bodyParser.json());

// routes
server.use(accountRoutes);
server.use(bankRoutes);


//connect to database and start server
mongoose.connect("mongodb+srv://codetrainUser:Z16ipm5T9lSrBRSP@cluster0.vhqaz.mongodb.net/codetrain?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(result => {
        server.listen(3000, () => console.log("server is ready"))
    })
    .catch(err => console.log(err))
